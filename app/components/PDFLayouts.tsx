"use client";

import type { AuditResult } from "../api/audit/types";

const CALENDAR_URL =
  process.env.NEXT_PUBLIC_HUBSPOT_CALENDAR_URL ||
  "https://meetings.hubspot.com/your-link";

const NAVY = "#192845";
const BLUE = "#bce1eb";
const LIGHT = "#f0f8fb";

interface Props {
  result: AuditResult;
}

const CATEGORIES = [
  { key: "content", title: "Content Quality", weight: "30%" },
  { key: "ux", title: "UX & Patient Conversion", weight: "25%" },
  { key: "design", title: "Design Quality", weight: "20%" },
  { key: "technical", title: "Technical & SEO", weight: "15%" },
  { key: "ai", title: "AI Search Readiness", weight: "10%" },
] as const;

function scoreColour(score: number, max = 100) {
  const pct = (score / max) * 100;
  return pct >= 70 ? "#16a34a" : pct >= 50 ? "#d97706" : "#dc2626";
}

function ScoreBar({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  const colour = scoreColour(score, max);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          flex: 1,
          height: 7,
          background: "#e5e7eb",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: colour,
            borderRadius: 4,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: colour,
          minWidth: 36,
          textAlign: "right",
        }}
      >
        {score}/{max}
      </span>
    </div>
  );
}

/** White wordmark — inline so it renders correctly in both screen and print */
function TioLogoWhite() {
  return (
    <svg
      width="120"
      height="36"
      viewBox="0 0 420 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="52"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="600"
        fontSize="56"
        fill="#ffffff"
      >
        the
      </text>
      <text
        x="0"
        y="120"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="600"
        fontSize="56"
        fill="#ffffff"
      >
        invisible
      </text>
      <text
        x="0"
        y="188"
        fontFamily="Inter, Arial, sans-serif"
        fontWeight="600"
        fontSize="56"
        fill="#ffffff"
      >
        orthodontist
      </text>
    </svg>
  );
}

/**
 * Header and footer are rendered once but marked with className="pdf-header" /
 * "pdf-footer" so that pdf/layout.tsx's CSS pins them to every physical page
 * edge via position:fixed in @media print.
 *
 * @page { margin: 62px 0 36px 0 } in pdf/layout.tsx reserves exactly that
 * space on each page so content never slides under them.
 */
function PdfHeader({ subtitle }: { subtitle: string }) {
  return (
    <div
      className="pdf-header"
      style={{
        background: NAVY,
        padding: "12px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "210mm",
      }}
    >
      <TioLogoWhite />
      <span
        style={{
          color: BLUE,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

function PdfFooter() {
  return (
    <div
      className="pdf-footer"
      style={{
        background: NAVY,
        padding: "9px 40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "210mm",
      }}
    >
      <span style={{ color: BLUE, fontSize: 9, letterSpacing: 0.3 }}>
        the invisible orthodontist - Digital Audit Report&nbsp;&nbsp;Internal use only
      </span>
    </div>
  );
}

// Shared page-section style — each one breaks onto its own printed page
const section: React.CSSProperties = {
  padding: "24px 40px",
  pageBreakAfter: "always",
  breakAfter: "page",
};

const sectionLast: React.CSSProperties = {
  padding: "24px 40px",
};

// ─── FULL REPORT ─────────────────────────────────────────────────────────────

export function FullReportLayout({ result }: Props) {
  const overall = result.overall_score;
  const overallColour = scoreColour(overall);
  const scoreLabel =
    overall >= 70 ? "Good" : overall >= 50 ? "Needs Work" : "Weak";

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", width: "210mm" }}>
      <PdfHeader subtitle="Digital Audit Report" />

      {/* ── PAGE 1: Practice overview + screenshot + category grid ── */}
      <div style={section}>
        {/* Practice name + overall score */}
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "flex-start",
            marginBottom: 22,
            paddingBottom: 22,
            borderBottom: `2px solid ${BLUE}`,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 5,
              }}
            >
              Website Audit
            </div>
            <div
              style={{ fontSize: 26, fontWeight: 800, color: NAVY, marginBottom: 4 }}
            >
              {result.practice_name}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 12 }}>
              {result.url}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#374151",
                lineHeight: 1.7,
                maxWidth: 390,
              }}
            >
              {result.summary}
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
              background: LIGHT,
              borderRadius: 14,
              padding: "18px 26px",
              border: `2px solid ${BLUE}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              Overall Score
            </div>
            <div
              style={{ fontSize: 52, fontWeight: 900, color: overallColour, lineHeight: 1 }}
            >
              {overall}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>out of 100</div>
            <div
              style={{
                marginTop: 8,
                background: overallColour,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 99,
                display: "inline-block",
              }}
            >
              {scoreLabel}
            </div>
          </div>
        </div>

        {/* Homepage screenshot */}
        {result.screenshots?.desktop && (
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Homepage Screenshot
            </div>
            <img
              src={`data:image/png;base64,${result.screenshots.desktop}`}
              alt="Homepage screenshot"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Category score overview */}
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Category Scores
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}
          >
            {CATEGORIES.map((cat) => {
              const s = result.scores[cat.key];
              const c = scoreColour(s);
              return (
                <div
                  key={cat.key}
                  style={{
                    background: LIGHT,
                    borderRadius: 10,
                    padding: "12px 8px",
                    textAlign: "center",
                    border: `1px solid ${BLUE}`,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 800, color: c }}>{s}</div>
                  <div
                    style={{
                      fontSize: 9,
                      color: NAVY,
                      fontWeight: 600,
                      marginTop: 3,
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.title}
                  </div>
                  <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2 }}>
                    {cat.weight}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── PAGE 2: Site structure + top opportunities ── */}
      <div style={section}>
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 14,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Site Structure
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}
          >
            {[
              {
                label: "Pages found",
                value: String(result.site_structure.total_pages),
                danger: false,
              },
              {
                label: "Platform",
                value: result.site_structure.platform,
                danger: false,
              },
              {
                label: "Online booking",
                value: result.site_structure.has_booking ? "Found" : "Not detected",
                danger: !result.site_structure.has_booking,
              },
              {
                label: "Social presence",
                value:
                  [
                    result.site_structure.social_links.facebook && "Facebook",
                    result.site_structure.social_links.instagram && "Instagram",
                    result.site_structure.social_links.tiktok && "TikTok",
                  ]
                    .filter(Boolean)
                    .join(", ") || "None detected",
                danger: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#f9fafb",
                  borderRadius: 8,
                  padding: "12px 16px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: "#9ca3af",
                    marginBottom: 4,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: item.danger ? "#dc2626" : NAVY,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 14,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Top Opportunities
          </div>
          {result.top_opportunities.map((opp, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                marginBottom: 12,
                alignItems: "flex-start",
                pageBreakInside: "avoid",
                breakInside: "avoid",
              }}
            >
              <div
                style={{
                  minWidth: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: NAVY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div
                style={{
                  flex: 1,
                  background: LIGHT,
                  borderRadius: 8,
                  padding: "10px 14px",
                  border: `1px solid ${BLUE}`,
                }}
              >
                <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
                  {opp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAGES 3–7: One category per page ── */}
      {CATEGORIES.map((cat) => {
        const category = result.categories[cat.key];
        const s = result.scores[cat.key];
        const c = scoreColour(s);
        return (
          <div key={cat.key} style={section}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 800, color: NAVY }}>
                {cat.title}
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: c, lineHeight: 1 }}>
                  {s}
                </span>
                <span style={{ fontSize: 13, color: "#9ca3af" }}>/100</span>
              </div>
            </div>
            <div
              style={{ height: 4, background: BLUE, borderRadius: 2, marginBottom: 14 }}
            />
            <p
              style={{ margin: "0 0 18px", fontSize: 12, color: "#374151", lineHeight: 1.7 }}
            >
              {category.description}
            </p>

            {category.subcategories.map((sub, idx) => (
              <div
                key={sub.name}
                style={{
                  marginBottom: 14,
                  paddingBottom: 14,
                  borderBottom:
                    idx < category.subcategories.length - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: NAVY }}>
                    {sub.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#6b7280",
                      background: "#f3f4f6",
                      padding: "2px 8px",
                      borderRadius: 99,
                    }}
                  >
                    {sub.score}/{sub.max}
                  </span>
                </div>
                <ScoreBar score={sub.score} max={sub.max} />
                <div
                  style={{
                    marginTop: 8,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      background: "#fffbeb",
                      borderRadius: 6,
                      padding: "8px 12px",
                      border: "1px solid #fde68a",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#92400e",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      Finding
                    </div>
                    <p style={{ margin: 0, fontSize: 11, color: "#78350f", lineHeight: 1.5 }}>
                      {sub.finding}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#f0fdf4",
                      borderRadius: 6,
                      padding: "8px 12px",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#14532d",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        marginBottom: 4,
                      }}
                    >
                      Recommendation
                    </div>
                    <p style={{ margin: 0, fontSize: 11, color: "#166534", lineHeight: 1.5 }}>
                      {sub.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {/* ── FINAL PAGE: PageSpeed + AI citations + methodology ── */}
      <div style={sectionLast}>
        {result.pagespeed?.available && (
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 14,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              PageSpeed Insights
            </div>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}
            >
              {[
                { label: "Mobile Score", value: result.pagespeed.performanceMobile },
                { label: "Desktop Score", value: result.pagespeed.performanceDesktop },
                { label: "LCP", value: result.pagespeed.lcp },
                { label: "SEO Score", value: result.pagespeed.seoScore },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: LIGHT,
                    borderRadius: 10,
                    padding: "14px 10px",
                    textAlign: "center",
                    border: `1px solid ${BLUE}`,
                  }}
                >
                  <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: NAVY }}>
                    {item.value ?? "-"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {result.ai_citations?.available && (
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: NAVY,
                marginBottom: 6,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              AI Citation Check
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>
              How often this practice appeared when patients asked AI assistants for
              recommendations ({result.ai_citations.mentionedCount}/
              {result.ai_citations.totalQueries} queries).
            </p>
            {result.ai_citations.queriesRun.map((q, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 10,
                  alignItems: "flex-start",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: q.mentioned ? "#dcfce7" : "#fee2e2",
                    color: q.mentioned ? "#16a34a" : "#dc2626",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {q.mentioned ? "Y" : "N"}
                </span>
                <div
                  style={{
                    flex: 1,
                    background: "#f9fafb",
                    borderRadius: 6,
                    padding: "8px 12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <p
                    style={{ margin: "0 0 4px", fontSize: 11, fontStyle: "italic", color: NAVY }}
                  >
                    "{q.query}"
                  </p>
                  <p style={{ margin: 0, fontSize: 10, color: "#6b7280", lineHeight: 1.5 }}>
                    {q.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            background: LIGHT,
            borderRadius: 8,
            padding: 16,
            border: `1px solid ${BLUE}`,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Methodology Notes
          </div>
          <p style={{ margin: "0 0 6px", fontSize: 10, color: "#6b7280", lineHeight: 1.6 }}>
            {result.lighthouse_note}
          </p>
          <p style={{ margin: 0, fontSize: 10, color: "#6b7280", lineHeight: 1.6 }}>
            {result.ai_citation_note}
          </p>
        </div>
      </div>

      <PdfFooter />
    </div>
  );
}

// ─── TEASER REPORT ───────────────────────────────────────────────────────────

export function TeaserReportLayout({ result }: Props) {
  const overall = result.overall_score;
  const overallColour = scoreColour(overall);
  const scoreLabel =
    overall >= 70 ? "Good" : overall >= 50 ? "Needs Work" : "Weak";

  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", width: "210mm" }}>
      <PdfHeader subtitle="Digital Audit Report - Preview" />

      <div style={{ padding: "24px 40px" }}>
        {/* Practice + score */}
        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
            marginBottom: 22,
            paddingBottom: 22,
            borderBottom: `2px solid ${BLUE}`,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              Website Audit for
            </div>
            <div
              style={{ fontSize: 28, fontWeight: 800, color: NAVY, marginBottom: 4 }}
            >
              {result.practice_name}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 14 }}>
              {result.url}
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#374151",
                lineHeight: 1.6,
                maxWidth: 380,
              }}
            >
              We audited your website across five key areas that directly impact how many
              new patients find you, trust you, and book with you.
            </p>
          </div>
          <div
            style={{
              textAlign: "center",
              background: LIGHT,
              borderRadius: 16,
              padding: "20px 28px",
              border: `2px solid ${BLUE}`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: "#9ca3af",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              Overall Score
            </div>
            <div
              style={{ fontSize: 56, fontWeight: 900, color: overallColour, lineHeight: 1 }}
            >
              {overall}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>out of 100</div>
            <div
              style={{
                marginTop: 8,
                background: overallColour,
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 14px",
                borderRadius: 99,
                display: "inline-block",
              }}
            >
              {scoreLabel}
            </div>
          </div>
        </div>

        {/* Screenshot */}
        {result.screenshots?.desktop && (
          <div style={{ marginBottom: 18 }}>
            <div
              style={{ fontSize: 11, color: "#6b7280", marginBottom: 6, fontStyle: "italic" }}
            >
              Your current homepage
            </div>
            <img
              src={`data:image/png;base64,${result.screenshots.desktop}`}
              alt="Homepage screenshot"
              style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                display: "block",
                maxHeight: 160,
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        )}

        {/* Category score bars */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 10,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            How You Scored
          </div>
          {CATEGORIES.map((cat) => {
            const s = result.scores[cat.key];
            return (
              <div
                key={cat.key}
                style={{ display: "flex", alignItems: "center", marginBottom: 9, gap: 10 }}
              >
                <div
                  style={{
                    width: 168,
                    fontSize: 11,
                    fontWeight: 600,
                    color: NAVY,
                    flexShrink: 0,
                  }}
                >
                  {cat.title}
                </div>
                <div style={{ flex: 1 }}>
                  <ScoreBar score={s} max={100} />
                </div>
                <div
                  style={{
                    width: 34,
                    fontSize: 10,
                    color: "#9ca3af",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {cat.weight}
                </div>
              </div>
            );
          })}
        </div>

        {/* Top opportunities */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: NAVY,
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Your Top Website Gaps
          </div>
          <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 10px" }}>
            We identified {result.top_opportunities.length} priority improvements. Here are
            the first two:
          </p>

          {result.top_opportunities.slice(0, 2).map((opp, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}
            >
              <div
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: BLUE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: NAVY,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>
                {opp}
              </p>
            </div>
          ))}

          {result.top_opportunities.slice(2).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 8,
                alignItems: "center",
                opacity: 0.35,
              }}
            >
              <div
                style={{
                  minWidth: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: NAVY,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#fff",
                  flexShrink: 0,
                }}
              >
                {i + 3}
              </div>
              <div
                style={{ flex: 1, height: 10, background: "#d1d5db", borderRadius: 4 }}
              />
              <div style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap" }}>
                Full report only
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            background: NAVY,
            borderRadius: 12,
            padding: "26px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: BLUE,
              textTransform: "uppercase",
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            Want the full picture?
          </div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "#fff",
              marginBottom: 10,
              lineHeight: 1.3,
            }}
          >
            Book a free 30-minute call to review
            <br />
            your complete audit results
          </div>
          <p
            style={{ fontSize: 11, color: "#9db8d4", margin: "0 0 18px", lineHeight: 1.6 }}
          >
            We'll walk through your detailed scores, identify your biggest opportunities,
            and show you exactly what needs to change to attract more patients online.
          </p>
          <a
            href={CALENDAR_URL}
            style={{
              display: "inline-block",
              background: BLUE,
              color: NAVY,
              fontSize: 13,
              fontWeight: 700,
              padding: "12px 28px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Book Your Review Call
          </a>
          <div style={{ marginTop: 10, fontSize: 10, color: "#6b8ab0" }}>{CALENDAR_URL}</div>
        </div>
      </div>

      <PdfFooter />
    </div>
  );
}
