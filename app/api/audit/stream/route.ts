import { type NextRequest } from "next/server";
import { crawlSite } from "../crawler";
import { scoreAudit } from "../scorer";
import { getPageSpeed } from "../pagespeed";
import { checkAICitations } from "../aicitation";
import { scorePhotographyWithVision } from "../vision-scorer";
import { isRateLimited, getClientIp } from "../../../../lib/rate-limit";
import { isBlockedUrl } from "../../../../lib/ssrf";
import { rankOpportunities } from "../../../../lib/opportunity-rank";
import { calcRevenueImpact } from "../../../../lib/revenue-impact";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { createClient } from "../../../../lib/supabase-server";

export const maxDuration = 60;

async function tryScreenshots(url: string) {
  try {
    const { takeScreenshots } = await import("../screenshot");
    return await takeScreenshots(url);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let url: string;
  try {
    const body = await request.json();
    url = (body.url as string)?.trim();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!url) {
    return new Response(
      JSON.stringify({ error: "URL is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;

  try {
    new URL(url);
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid URL format." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── SSRF protection ──────────────────────────────────────────────────────────
  if (isBlockedUrl(url)) {
    return new Response(
      JSON.stringify({ error: "That URL is not allowed." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Rate limiting ────────────────────────────────────────────────────────────
  const clientIp = getClientIp(request.headers);
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many audits — please wait an hour and try again." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Get current user (optional — anonymous audits are allowed) ───────────────
  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    // Auth not configured yet — continue without user_id
  }

  // ── Stream the audit ─────────────────────────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(data: Record<string, unknown>) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      }

      try {
        // Step 1 — Crawl
        send({ step: "crawl", pct: 5, message: "Crawling your website…" });

        let crawlData;
        try {
          crawlData = await crawlSite(url);
        } catch (crawlErr) {
          const msg = crawlErr instanceof Error ? crawlErr.message : String(crawlErr);
          // Surface specific errors to the user
          if (msg.includes("403") || msg.toLowerCase().includes("forbidden")) {
            send({ step: "error", message: "This site is blocking automated access (403). Try running the audit from a different network or check that the URL is correct." });
          } else if (msg.includes("timeout") || msg.includes("ETIMEDOUT")) {
            send({ step: "error", message: "The site timed out — it may be very slow or temporarily offline. Please try again." });
          } else if (msg.includes("404") || msg.includes("ENOTFOUND")) {
            send({ step: "error", message: "That URL doesn't appear to exist. Please double-check the address." });
          } else {
            send({ step: "error", message: `Couldn't reach the site: ${msg}` });
          }
          controller.close();
          return;
        }

        send({ step: "crawl", pct: 28, message: "Site crawled — calculating scores…" });

        // Step 2 — Score (synchronous)
        const auditResult = scoreAudit(crawlData);
        const practiceName =
          crawlData.title
            .replace(/\|.*$/, "")
            .replace(/-.*$/, "")
            .replace(/orthodontist.*$/i, "")
            .trim() || new URL(url).hostname.replace("www.", "");

        send({ step: "score", pct: 35, message: "Running PageSpeed, screenshots & AI checks…" });

        // Step 3 — Screenshots, PageSpeed, Citations in parallel.
        //           Vision starts as soon as screenshots are ready.
        const screenshotPromise = tryScreenshots(url);

        const visionPromise = screenshotPromise.then((shots) =>
          shots?.desktop
            ? scorePhotographyWithVision(shots.desktop)
            : Promise.resolve(null)
        );

        const [screenshotData, pagespeedData, citationData, visionData] =
          await Promise.allSettled([
            screenshotPromise,
            getPageSpeed(url),
            checkAICitations(
              practiceName,
              crawlData.locationMentioned || "the area",
              new URL(url).hostname
            ),
            visionPromise,
          ]);

        const screenshots =
          screenshotData.status === "fulfilled" ? screenshotData.value : null;
        const pagespeed =
          pagespeedData.status === "fulfilled" ? pagespeedData.value : null;
        const citations =
          citationData.status === "fulfilled" ? citationData.value : null;
        const visionScore =
          visionData.status === "fulfilled" ? visionData.value : null;

        send({ step: "patch", pct: 88, message: "Finalising scores…" });

        // Step 4 — Patch C2 with real vision score
        if (visionScore) {
          const c2Sub = auditResult.categories.design.subcategories.find(
            (s) => s.name === "Photography Quality"
          );
          if (c2Sub) {
            c2Sub.score = visionScore.score;
            c2Sub.finding = visionScore.finding;
            const newDesign = auditResult.categories.design.subcategories.reduce(
              (sum, s) => sum + s.score,
              0
            );
            auditResult.categories.design.score = newDesign;
            auditResult.scores.design = newDesign;
          }
        }

        // Step 5 — Patch PageSpeed into D2 + D3
        if (pagespeed?.available) {
          const d2Real =
            pagespeed.performanceMobile >= 80
              ? 16
              : pagespeed.performanceMobile >= 50
              ? 12
              : 6;
          const d3Real =
            pagespeed.seoScore >= 90
              ? 18
              : pagespeed.seoScore >= 70
              ? 12
              : 6;

          const tech = auditResult.categories.technical;
          const d2Sub = tech.subcategories.find(
            (s) => s.name === "Page Speed & Performance"
          );
          const d3Sub = tech.subcategories.find(
            (s) => s.name === "Technical SEO"
          );

          if (d2Sub) {
            d2Sub.score = d2Real;
            d2Sub.finding = `Mobile Lighthouse: ${pagespeed.performanceMobile}/100. Desktop: ${pagespeed.performanceDesktop}/100. LCP: ${pagespeed.lcp}, CLS: ${pagespeed.cls}, TBT: ${pagespeed.tbt}.`;
          }
          if (d3Sub) d3Sub.score = d3Real;

          const newTech = tech.subcategories.reduce((s, c) => s + c.score, 0);
          auditResult.categories.technical.score = newTech;
          auditResult.scores.technical = newTech;
          auditResult.lighthouse_note = `Real PageSpeed Insights data. Mobile: ${pagespeed.performanceMobile}/100, Desktop: ${pagespeed.performanceDesktop}/100.`;
        }

        // Step 6 — Patch AI citations into E2
        if (citations?.available) {
          const { min, max } = citations.suggestedScoreRange;
          const e2Real = Math.round((min + max) / 2);
          const ai = auditResult.categories.ai;
          const e2Sub = ai.subcategories.find((s) => s.name === "Entity Clarity");
          if (e2Sub) {
            e2Sub.score = e2Real;
            e2Sub.finding = `ChatGPT mentioned this practice in ${citations.mentionedCount}/${citations.totalQueries} patient-style queries. ${
              citations.mentionedCount === 0
                ? "Not appearing in AI recommendations for this area."
                : citations.mentionedCount >= 3
                ? "Strong AI visibility."
                : "Moderate AI visibility."
            }`;
          }
          const newAI = ai.subcategories.reduce((s, c) => s + c.score, 0);
          auditResult.categories.ai.score = newAI;
          auditResult.scores.ai = newAI;
          auditResult.ai_citation_note = `AI citation check via ChatGPT (GPT-4o mini) across ${citations.totalQueries} queries. Mentioned in ${citations.mentionedCount}/${citations.totalQueries} responses.`;
        }

        // Step 7 — Recalculate overall score
        auditResult.overall_score = Math.round(
          auditResult.scores.content * 0.3 +
            auditResult.scores.ux * 0.25 +
            auditResult.scores.design * 0.2 +
            auditResult.scores.technical * 0.15 +
            auditResult.scores.ai * 0.1
        );

        // Step 8 — Re-rank opportunities by weighted impact
        const finalResult = {
          ...auditResult,
          screenshots: {
            desktop: screenshots?.desktop ?? null,
            mobile: screenshots?.mobile ?? null,
          },
          pagespeed: pagespeed ?? null,
          ai_citations: citations ?? null,
        };
        finalResult.top_opportunities = rankOpportunities(finalResult);

        // Step 9 — Revenue impact
        const revenueImpact = calcRevenueImpact(finalResult.overall_score);

        // Step 10 — Save to Supabase (best effort)
        let auditId: string | null = null;
        try {
          const { data: saved } = await supabaseAdmin
            .from("audits")
            .insert({
              url,
              practice_name: practiceName,
              overall_score: finalResult.overall_score,
              result: finalResult,
              user_id: userId,
            })
            .select("id")
            .single();
          auditId = saved?.id ?? null;
        } catch {
          // Non-fatal — audit proceeds even if DB save fails
        }

        send({
          step: "complete",
          pct: 100,
          result: finalResult,
          revenueImpact,
          auditId,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Audit failed.";
        send({ step: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
