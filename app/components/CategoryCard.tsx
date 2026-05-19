"use client";

import { useState } from "react";
import type { CategoryResult } from "../api/audit/types";

interface CategoryCardProps {
  title: string;
  icon: string;
  result: CategoryResult;
  weight: string;
}

function scoreColour(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return "bg-green-500";
  if (pct >= 50) return "bg-amber-400";
  return "bg-red-400";
}

function scoreBadge(score: number, max: number): string {
  const pct = (score / max) * 100;
  if (pct >= 70) return "bg-green-50 text-green-700 border border-green-200";
  if (pct >= 50) return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-red-50 text-red-700 border border-red-200";
}

export default function CategoryCard({ title, icon, result, weight }: CategoryCardProps) {
  const [open, setOpen] = useState(false);
  const pct = Math.round((result.score / 100) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <h3 className="font-semibold text-gray-900 text-base leading-tight">{title}</h3>
              <span className="text-xs text-gray-400">{weight} of overall score</span>
            </div>
          </div>
          <div
            className={`text-sm font-bold px-3 py-1 rounded-full ${scoreBadge(result.score, 100)}`}
          >
            {result.score}/100
          </div>
        </div>

        {/* Score bar */}
        <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreColour(result.score, 100)}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{result.description}</p>
      </div>

      {/* Subcategories toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-3 border-t border-gray-100 text-sm font-medium text-tio-navy flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span>View subcategory breakdown</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
          {result.subcategories.map((sub) => (
            <div key={sub.name} className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800">{sub.name}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${scoreBadge(sub.score, sub.max)}`}
                >
                  {sub.score}/{sub.max}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                <div
                  className={`h-full rounded-full ${scoreColour(sub.score, sub.max)}`}
                  style={{ width: `${(sub.score / sub.max) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mb-1.5">
                <span className="font-medium text-gray-700">Finding: </span>
                {sub.finding}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-tio-teal">Recommendation: </span>
                {sub.recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
