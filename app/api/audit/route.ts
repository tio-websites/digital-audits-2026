import { NextRequest, NextResponse } from "next/server";
import { crawlSite } from "./crawler";
import { scoreAudit } from "./scorer";
import { takeScreenshots } from "./screenshot";
import { getPageSpeed } from "./pagespeed";
import { checkAICitations } from "./aicitation";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  let url: string;
  try {
    const body = await request.json();
    url = body.url?.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!url) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }

  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
  }

  try {
    // Crawl first — we need the data to extract practice name / suburb for citation check
    const crawlData = await crawlSite(url);

    const practiceName = crawlData.title
      .replace(/\|.*$/, "")
      .replace(/-.*$/, "")
      .replace(/orthodontist.*$/i, "")
      .trim() || new URL(url).hostname.replace("www.", "");

    // Run screenshots, pagespeed, and AI citations in parallel with scoring
    const [result, screenshotData, pagespeedData, citationData] = await Promise.allSettled([
      Promise.resolve(scoreAudit(crawlData)),
      takeScreenshots(url).catch(() => null),
      getPageSpeed(url),
      checkAICitations(practiceName, crawlData.locationMentioned || "the area", new URL(url).hostname),
    ]);

    const auditResult = result.status === "fulfilled" ? result.value : null;
    if (!auditResult) {
      return NextResponse.json({ error: "Scoring failed." }, { status: 500 });
    }

    const screenshots = screenshotData.status === "fulfilled" ? screenshotData.value : null;
    const pagespeed = pagespeedData.status === "fulfilled" ? pagespeedData.value : null;
    const citations = citationData.status === "fulfilled" ? citationData.value : null;

    // Patch in real pagespeed scores where available
    if (pagespeed?.available) {
      // D2 real score replaces estimate — recalculate technical category score
      const d2Real = pagespeed.performanceMobile >= 80 ? 16
        : pagespeed.performanceMobile >= 50 ? 12
        : 6;
      const d3Real = pagespeed.seoScore >= 90 ? 18
        : pagespeed.seoScore >= 70 ? 12
        : 6;

      const technical = auditResult.categories.technical;
      const d2Sub = technical.subcategories.find((s) => s.name === "Page Speed & Performance");
      const d3Sub = technical.subcategories.find((s) => s.name === "Technical SEO");

      if (d2Sub) {
        d2Sub.score = d2Real;
        d2Sub.finding = `Mobile Lighthouse score: ${pagespeed.performanceMobile}. Desktop: ${pagespeed.performanceDesktop}. LCP: ${pagespeed.lcp}, CLS: ${pagespeed.cls}, TBT: ${pagespeed.tbt}.`;
      }
      if (d3Sub) {
        d3Sub.score = d3Real;
      }

      // Recalculate technical total
      const newTechnical = technical.subcategories.reduce((sum, s) => sum + s.score, 0);
      auditResult.categories.technical.score = newTechnical;
      auditResult.scores.technical = newTechnical;
      auditResult.lighthouse_note = `Real PageSpeed Insights data. Mobile performance: ${pagespeed.performanceMobile}/100, Desktop: ${pagespeed.performanceDesktop}/100.`;
    }

    // Patch in real AI citation score where available
    if (citations?.available) {
      const { min, max } = citations.suggestedScoreRange;
      const e2Real = Math.round((min + max) / 2);
      const ai = auditResult.categories.ai;
      const e2Sub = ai.subcategories.find((s) => s.name === "Entity Clarity");
      if (e2Sub) {
        e2Sub.score = e2Real;
        e2Sub.finding = `ChatGPT mentioned this practice in ${citations.mentionedCount} of ${citations.totalQueries} patient-style queries. ${
          citations.mentionedCount === 0
            ? "The practice does not appear in AI training data for patient search queries in this area."
            : citations.mentionedCount >= 3
            ? "Strong AI visibility — the practice is well-known in its area."
            : "Moderate AI visibility — known but not consistently surfaced."
        }`;
      }
      const newAI = ai.subcategories.reduce((sum, s) => sum + s.score, 0);
      auditResult.categories.ai.score = newAI;
      auditResult.scores.ai = newAI;
      auditResult.ai_citation_note =
        `AI citation check run via ChatGPT (GPT-4o mini) across ${citations.totalQueries} patient-style queries. ` +
        `Practice mentioned in ${citations.mentionedCount}/${citations.totalQueries} responses. ` +
        "Note: ChatGPT uses training data, not live web search — treat as directional indicator of AI brand presence.";
    }

    // Recalculate overall score with any patched values
    auditResult.overall_score = Math.round(
      auditResult.scores.content * 0.30 +
      auditResult.scores.ux * 0.25 +
      auditResult.scores.design * 0.20 +
      auditResult.scores.technical * 0.15 +
      auditResult.scores.ai * 0.10
    );

    return NextResponse.json({
      ...auditResult,
      screenshots: {
        desktop: screenshots?.desktop ?? null,
        mobile: screenshots?.mobile ?? null,
      },
      pagespeed: pagespeed ?? null,
      ai_citations: citations ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Audit failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
