"use client";

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
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit_${result.practice_name.replace(/\s+/g, "_").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AuditResults({ result, onReset }: AuditResultsProps) {
  const { label, colour } = scoreLabel(result.overall_score);

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
              value: [
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
