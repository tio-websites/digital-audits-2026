"use client";

import { useState } from "react";
import type { AuditResult } from "../api/audit/types";
import ScoreRing from "./ScoreRing";
import CategoryCard from "./CategoryCard";

interface AuditResultsProps {
  result: AuditResult;
  onReset: () => void;
}

const CATEGORIES = [
  { key: "content", title: "Content Quality", icon: "📝", weight: "30%" },
  { key: "ux", title: "UX & Patient Conversion", icon: "🎯", weight: "25%" },
  { key: "design", title: "Design Quality", icon: "🎨", weight: "20%" },
  { key: "technical", title: "Technical & SEO", icon: "⚙️", weight: "15%" },
  { key: "ai", title: "AI Search Readiness", icon: "🤖", weight: "10%" },
] as const;

function scoreLabel(score: number): { label: string; colour: string } {
  if (score >= 70) return { label: "Good", colour: "text-green-600" };
  if (score >= 50) return { label: "Needs Work", colour: "text-amber-600" };
  return { label: "Weak", colour: "text-red-600" };
}

function downloadJSON(result: AuditResult) {
  // Strip base64 screenshots from export to keep file manageable
  const exportData = {
    ...result,
    screenshots: {
      desktop: result.screenshots.desktop ? "[base64 screenshot — stripped for JSON export]" : null,
      mobile: result.screenshots.mobile ? "[base64 screenshot — stripped for JSON export]" : null,
    },
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit_${result.practice_name.replace(/\s+/g, "_").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function psiColour(score: number): string {
  if (score >= 90) return "text-green-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

export default function AuditResults({ result, onReset }: AuditResultsProps) {
  const [screenshotView, setScreenshotView] = useState<"desktop" | "mobile">("desktop");
  const { label, colour } = scoreLabel(result.overall_score);
  const hasScreenshots = result.screenshots.desktop || result.screenshots.mobile;
  const hasPagespeed = result.pagespeed?.available;
  const hasCitations = result.ai_citations?.available;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-tio-navy transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          New audit
        </button>
        <button
          onClick={() => downloadJSON(result)}
          className="flex items-center gap-2 text-sm font-medium text-tio-teal hover:opacity-80 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export JSON
        </button>
      </div>

      {/* Hero score card */}
      <div className="bg-tio-navy rounded-2xl p-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <ScoreRing score={result.overall_score} size={120} strokeWidth={10} large />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{result.practice_name}</h1>
              <span className={`text-sm font-semibold ${colour} bg-white px-2 py-0.5 rounded-full`}>
                {label}
              </span>
            </div>
            <p className="text-white/60 text-sm mb-3">{result.url} · Audited {result.date}</p>
            <p className="text-white/80 text-sm leading-relaxed max-w-xl">{result.summary}</p>
          </div>
        </div>

        {/* Category scores row */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <ScoreRing
              key={cat.key}
              score={result.scores[cat.key]}
              size={72}
              strokeWidth={6}
              label={cat.title.split(" ")[0]}
              sublabel={cat.weight}
            />
          ))}
        </div>
      </div>

      {/* Screenshots */}
      {hasScreenshots && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <span>📸</span> Homepage Screenshots
            </h2>
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {(["desktop", "mobile"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setScreenshotView(view)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    screenshotView === view
                      ? "bg-white text-tio-navy shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
            {screenshotView === "desktop" && result.screenshots.desktop && (
              <img
                src={`data:image/png;base64,${result.screenshots.desktop}`}
                alt="Desktop homepage screenshot"
                className="w-full object-cover"
              />
            )}
            {screenshotView === "mobile" && result.screenshots.mobile && (
              <div className="flex justify-center py-4">
                <img
                  src={`data:image/png;base64,${result.screenshots.mobile}`}
                  alt="Mobile homepage screenshot"
                  className="w-[375px] rounded-lg shadow"
                  style={{ maxHeight: 600, objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* PageSpeed panel */}
      {hasPagespeed && result.pagespeed && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>⚡</span> Real PageSpeed Insights
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { label: "Mobile speed", value: result.pagespeed.performanceMobile, isScore: true },
              { label: "Desktop speed", value: result.pagespeed.performanceDesktop, isScore: true },
              { label: "LCP", value: result.pagespeed.lcp, isScore: false },
              { label: "CLS", value: result.pagespeed.cls, isScore: false },
              { label: "TBT", value: result.pagespeed.tbt, isScore: false },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div
                  className={`text-xl font-bold ${
                    item.isScore && typeof item.value === "number"
                      ? psiColour(item.value)
                      : "text-gray-800"
                  }`}
                >
                  {item.value}
                  {item.isScore ? "/100" : ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Citation results */}
      {hasCitations && result.ai_citations && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <span>🤖</span> AI Citation Check
            <span className="text-xs font-normal text-gray-400">via ChatGPT</span>
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Mentioned in {result.ai_citations.mentionedCount} of {result.ai_citations.totalQueries} patient-style queries
          </p>
          <div className="space-y-3">
            {result.ai_citations.queriesRun.map((q, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      q.mentioned
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {q.mentioned ? "✓" : "✗"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 mb-1 italic">"{q.query}"</p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{q.excerpt}…</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Site structure snapshot */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🗂️</span> Site Structure
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Pages found", value: result.site_structure.total_pages },
            { label: "Platform", value: result.site_structure.platform },
            {
              label: "Online booking",
              value: result.site_structure.has_booking ? "✓ Found" : "✗ Missing",
              danger: !result.site_structure.has_booking,
            },
            {
              label: "Social links",
              value:
                [
                  result.site_structure.social_links.facebook && "FB",
                  result.site_structure.social_links.instagram && "IG",
                  result.site_structure.social_links.tiktok && "TikTok",
                ]
                  .filter(Boolean)
                  .join(", ") || "None found",
            },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div
                className={`text-sm font-semibold ${
                  "danger" in item && item.danger ? "text-red-600" : "text-gray-900"
                }`}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
        {result.site_structure.missing_pages.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-700 mb-2">
              Missing key pages ({result.site_structure.missing_pages.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {result.site_structure.missing_pages.map((p) => (
                <span key={p} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Top opportunities */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>🚀</span> Top Opportunities
        </h2>
        <ol className="space-y-3">
          {result.top_opportunities.map((opp, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-tio-teal/10 text-tio-teal text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">{opp}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Category cards */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900 text-lg">Category Breakdown</h2>
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.key}
            title={cat.title}
            icon={cat.icon}
            result={result.categories[cat.key]}
            weight={cat.weight}
          />
        ))}
      </div>

      {/* Caveats */}
      <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Methodology notes</h3>
        <p className="text-xs text-gray-500 leading-relaxed">{result.lighthouse_note}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{result.ai_citation_note}</p>
      </div>
    </div>
  );
}
