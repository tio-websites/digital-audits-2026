"use client";

import { useRef } from "react";
import type { AuditResult } from "../api/audit/types";

// HubSpot calendar URL - set NEXT_PUBLIC_HUBSPOT_CALENDAR_URL in Vercel env vars
const CALENDAR_URL =
  process.env.NEXT_PUBLIC_HUBSPOT_CALENDAR_URL || "https://meetings.hubspot.com/your-link";

interface Props {
  result: AuditResult;
}

function ScoreBar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  const colour = pct >= 70 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: colour, borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: colour, minWidth: 40, textAlign: "right" }}>
        {score}/{max}
      </span>
    </div>
  );
}

// ─── FULL REPORT ────────────────────────────────────────────────────────────

export function FullReportLayout({ result }: Props) {
  const CATEGORIES = [
    { key: "content", title: "Content Quality", weight: "30%" },
    { key: "ux", title: "UX & Patient Conversion", weight: "25%" },
    { key: "design", title: "Design Quality", weight: "20%" },
    { key: "technical", title: "Technical & SEO", weight: "15%" },
    { key: "ai", title: "AI Search Readiness", weight: "10%" },
  ] as const;

  const scoreLabel = result.overall_score >= 70 ? "Good" : result.overall_score >= 50 ? "Needs Work" : "Weak";
  const scoreLabelColour = result.overall_score >= 70 ? "#16a34a" : result.overall_score >= 50 ? "#d97706" : "#dc2626";

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: "#1a1a1a", background: "#fff", width: 794 }}>

      {/* Header */}
      <div style={{ background: "#192845", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: -0.5 }}>the invisible orthodontist</div>
          <div style={{ color: "#bce1eb", fontSize: 11, marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>Digital Audit Report</div>
        </div>
        <div style={{ color: "#bce1eb", fontSize: 11 }}>{result.date}</div>
      </div>

      {/* Practice hero */}
      <div style={{ padding: "32px 40px 24px", borderBottom: "2px solid #bce1eb", display: "flex", gap: 32 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#192845", marginBottom: 4 }}>{result.practice_name}</div>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 12 }}>{result.url}</div>
          <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>{result.summary}</p>
        </div>
        <div style={{ textAlign: "center", minWidth: 110 }}>
          <div style={{ fontSize: 52, fontWeight: 800, color: scoreLabelColour, lineHeight: 1 }}>{result.overall_score}</div>
          <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>out of 100</div>
          <div style={{ marginTop: 6, background: scoreLabelColour, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, display: "inline-block" }}>{scoreLabel}</div>
        </div>
      </div>

      {/* Screenshot */}
      {result.screenshots.desktop && (
        <div style={{ padding: "24px 40px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#192845", marginBottom: 8 }}>Homepage Screenshot</div>
          <img
            src={`data:image/png;base64,${result.screenshots.desktop}`}
            alt="Homepage"
            style={{ width: "100%", borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
        </div>
      )}

      {/* Category scores overview */}
      <div style={{ padding: "24px 40px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#192845", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>Category Scores</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 12 }}>
          {CATEGORIES.map((cat) => {
            const score = result.scores[cat.key];
            const colour = score >= 70 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
            return (
              <div key={cat.key} style={{ background: "#f0f8fb", borderRadius: 10, padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: colour }}>{score}</div>
                <div style={{ fontSize: 10, color: "#192845", fontWeight: 600, marginTop: 2, lineHeight: 1.3 }}>{cat.title}</div>
                <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>{cat.weight}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Site structure */}
      <div style={{ padding: "0 40px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#192845", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Site Structure</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Pages found", value: String(result.site_structure.total_pages) },
            { label: "Platform", value: result.site_structure.platform },
            { label: "Online booking", value: result.site_structure.has_booking ? "Found" : "Missing", danger: !result.site_structure.has_booking },
            { label: "Social links", value: [result.site_structure.social_links.facebook && "Facebook", result.site_structure.social_links.instagram && "Instagram", result.site_structure.social_links.tiktok && "TikTok"].filter(Boolean).join(", ") || "None found" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#f9fafb", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "danger" in item && item.danger ? "#dc2626" : "#192845" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top opportunities */}
      <div style={{ padding: "0 40px 24px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#192845", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Top Opportunities</div>
        {result.top_opportunities.map((opp, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
            <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "#bce1eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#192845", flexShrink: 0 }}>{i + 1}</div>
            <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{opp}</p>
          </div>
        ))}
      </div>

      {/* Category details */}
      {CATEGORIES.map((cat) => {
        const category = result.categories[cat.key];
        return (
          <div key={cat.key} style={{ padding: "0 40px 28px" }}>
            <div style={{ background: "#192845", borderRadius: "8px 8px 0 0", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{cat.title}</span>
              <span style={{ color: "#bce1eb", fontSize: 13, fontWeight: 700 }}>{category.score}/100</span>
            </div>
            <div style={{ border: "1px solid #e5e7eb", borderTop: "none", borderRadius: "0 0 8px 8px", padding: 16 }}>
              <p style={{ margin: "0 0 14px", fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{category.description}</p>
              {category.subcategories.map((sub) => (
                <div key={sub.name} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#192845" }}>{sub.name}</span>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{sub.score}/{sub.max}</span>
                  </div>
                  <ScoreBar score={sub.score} max={sub.max} />
                  <p style={{ margin: "6px 0 3px", fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>
                    <strong style={{ color: "#192845" }}>Finding: </strong>{sub.finding}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: "#374151", lineHeight: 1.5 }}>
                    <strong style={{ color: "#192845" }}>Recommendation: </strong>{sub.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* AI citations */}
      {result.ai_citations?.available && (
        <div style={{ padding: "0 40px 28px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#192845", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>AI Citation Check</div>
          {result.ai_citations.queriesRun.map((q, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: q.mentioned ? "#dcfce7" : "#fee2e2", color: q.mentioned ? "#16a34a" : "#dc2626", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{q.mentioned ? "Y" : "N"}</span>
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 11, fontStyle: "italic", color: "#192845" }}>"{q.query}"</p>
                <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{q.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Methodology notes */}
      <div style={{ margin: "0 40px 40px", background: "#f0f8fb", borderRadius: 8, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#192845", marginBottom: 8 }}>Methodology Notes</div>
        <p style={{ margin: "0 0 6px", fontSize: 10, color: "#6b7280", lineHeight: 1.5 }}>{result.lighthouse_note}</p>
        <p style={{ margin: 0, fontSize: 10, color: "#6b7280", lineHeight: 1.5 }}>{result.ai_citation_note}</p>
      </div>

      {/* Footer */}
      <div style={{ background: "#192845", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#bce1eb", fontSize: 11 }}>the invisible orthodontist - Digital Audit Report</span>
        <span style={{ color: "#6b8ab0", fontSize: 10 }}>Internal use only</span>
      </div>
    </div>
  );
}

// ─── TEASER REPORT ───────────────────────────────────────────────────────────

export function TeaserReportLayout({ result }: Props) {
  const scoreLabel = result.overall_score >= 70 ? "Good" : result.overall_score >= 50 ? "Needs Work" : "Weak";
  const scoreLabelColour = result.overall_score >= 70 ? "#16a34a" : result.overall_score >= 50 ? "#d97706" : "#dc2626";

  const CATEGORIES = [
    { key: "content", title: "Content Quality", weight: "30%" },
    { key: "ux", title: "UX & Patient Conversion", weight: "25%" },
    { key: "design", title: "Design Quality", weight: "20%" },
    { key: "technical", title: "Technical & SEO", weight: "15%" },
    { key: "ai", title: "AI Search Readiness", weight: "10%" },
  ] as const;

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", color: "#1a1a1a", background: "#fff", width: 794 }}>

      {/* Header */}
      <div style={{ background: "#192845", padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>the invisible orthodontist</div>
          <div style={{ color: "#bce1eb", fontSize: 11, marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>Digital Audit Report - Preview</div>
        </div>
        <div style={{ background: "#bce1eb", color: "#192845", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", letterSpacing: 1 }}>Confidential</div>
      </div>

      {/* Practice + score */}
      <div style={{ padding: "36px 40px 28px", borderBottom: "2px solid #bce1eb", display: "flex", gap: 32, alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Website Audit for</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#192845", marginBottom: 6 }}>{result.practice_name}</div>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>{result.url}</div>
          <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6, maxWidth: 420 }}>
            We audited your website across five key areas that directly impact how many new patients find you, trust you, and book with you.
          </p>
        </div>
        <div style={{ textAlign: "center", background: "#f0f8fb", borderRadius: 16, padding: "24px 32px", border: "2px solid #bce1eb" }}>
          <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Overall Score</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: scoreLabelColour, lineHeight: 1 }}>{result.overall_score}</div>
          <div style={{ fontSize: 13, color: "#9ca3af" }}>out of 100</div>
          <div style={{ marginTop: 8, background: scoreLabelColour, color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 99, display: "inline-block" }}>{scoreLabel}</div>
        </div>
      </div>

      {/* Screenshot */}
      {result.screenshots.desktop && (
        <div style={{ padding: "24px 40px 0" }}>
          <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 8, fontStyle: "italic" }}>Your current homepage</div>
          <img
            src={`data:image/png;base64,${result.screenshots.desktop}`}
            alt="Homepage"
            style={{ width: "100%", borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
        </div>
      )}

      {/* Category scores */}
      <div style={{ padding: "28px 40px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#192845", marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>How You Scored</div>
        {CATEGORIES.map((cat) => {
          const score = result.scores[cat.key];
          const colour = score >= 70 ? "#16a34a" : score >= 50 ? "#d97706" : "#dc2626";
          return (
            <div key={cat.key} style={{ display: "flex", alignItems: "center", marginBottom: 12, gap: 12 }}>
              <div style={{ width: 180, fontSize: 12, fontWeight: 600, color: "#192845" }}>{cat.title}</div>
              <div style={{ flex: 1 }}><ScoreBar score={score} max={100} /></div>
              <div style={{ width: 36, fontSize: 11, color: "#6b7280", textAlign: "right" }}>{cat.weight}</div>
            </div>
          );
        })}
      </div>

      {/* Top opportunities - show 2, lock rest */}
      <div style={{ padding: "0 40px 28px" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#192845", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>Your Top Website Gaps</div>
        <p style={{ fontSize: 12, color: "#6b7280", marginTop: 0, marginBottom: 16 }}>
          We identified {result.top_opportunities.length} priority improvements. Here are the first two:
        </p>

        {result.top_opportunities.slice(0, 2).map((opp, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
            <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "#bce1eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#192845", flexShrink: 0 }}>{i + 1}</div>
            <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{opp}</p>
          </div>
        ))}

        {/* Locked items */}
        {result.top_opportunities.slice(2).map((_, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center", opacity: 0.4 }}>
            <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "#192845", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{i + 3}</div>
            <div style={{ flex: 1, height: 10, background: "#d1d5db", borderRadius: 4 }} />
            <div style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap" }}>Full report only</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ margin: "0 40px 40px", background: "#192845", borderRadius: 12, padding: "32px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#bce1eb", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Want the full picture?</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>
          Book a free 30-minute call to review<br />your complete audit results
        </div>
        <p style={{ fontSize: 12, color: "#9db8d4", margin: "0 0 24px", lineHeight: 1.6 }}>
          We'll walk through your detailed scores, identify your biggest opportunities,
          and show you exactly what needs to change to attract more patients online.
        </p>
        <a
          href={CALENDAR_URL}
          style={{ display: "inline-block", background: "#bce1eb", color: "#192845", fontSize: 14, fontWeight: 700, padding: "14px 32px", borderRadius: 8, textDecoration: "none" }}
        >
          Book Your Review Call
        </a>
        <div style={{ marginTop: 12, fontSize: 11, color: "#6b8ab0" }}>{CALENDAR_URL}</div>
      </div>

      {/* Footer */}
      <div style={{ background: "#192845", padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#bce1eb", fontSize: 11 }}>the invisible orthodontist - Digital Audit Report</span>
        <span style={{ color: "#6b8ab0", fontSize: 10 }}>{result.date}</span>
      </div>
    </div>
  );
}

// ─── REF CONTAINERS ──────────────────────────────────────────────────────────

export function FullReportContainer({ result, containerRef }: Props & { containerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", left: -9999, top: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <FullReportLayout result={result} />
    </div>
  );
}

export function TeaserReportContainer({ result, containerRef }: Props & { containerRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", left: -9999, top: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <TeaserReportLayout result={result} />
    </div>
  );
}
