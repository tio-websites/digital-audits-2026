"use client";

import { useState, FormEvent } from "react";
import type { AuditResult } from "../api/audit/types";
import AuditResults from "./AuditResults";

type State =
  | { status: "idle" }
  | { status: "loading"; url: string }
  | { status: "done"; result: AuditResult }
  | { status: "error"; message: string };

export default function AuditForm() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    setState({ status: "loading", url: trimmed });
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Audit failed." });
        return;
      }
      setState({ status: "done", result: data });
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  }

  if (state.status === "done") {
    return (
      <AuditResults
        result={state.result}
        onReset={() => setState({ status: "idle" })}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-tio-navy px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-tio-teal rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TIO</span>
          </div>
          <span className="text-white font-semibold text-sm">Digital Audit Tool</span>
        </div>
        <span className="text-white/40 text-xs">TIO International</span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-tio-navy/5 to-white">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-tio-teal/10 text-tio-teal text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-tio-teal rounded-full animate-pulse" />
            Orthodontic Website Audit
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-tio-navy leading-tight">
            Audit any practice website
            <span className="text-tio-teal"> in seconds.</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-lg mx-auto">
            Score orthodontic websites across content, conversion, design, SEO, and AI
            search readiness. Built for TIO sales conversations.
          </p>

          {/* Scoring framework callout */}
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {[
              { label: "Content Quality", weight: "30%" },
              { label: "UX & Conversion", weight: "25%" },
              { label: "Design", weight: "20%" },
              { label: "Technical & SEO", weight: "15%" },
              { label: "AI Readiness", weight: "10%" },
            ].map((c) => (
              <span
                key={c.label}
                className="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-full shadow-sm"
              >
                {c.label} <strong className="text-tio-navy">{c.weight}</strong>
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. smileorthodontics.com.au"
                disabled={state.status === "loading"}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-tio-teal focus:border-transparent text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={state.status === "loading" || !url.trim()}
                className="px-6 py-3 bg-tio-teal text-white font-semibold rounded-xl shadow-sm hover:bg-tio-teal/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              >
                {state.status === "loading" ? "Auditing…" : "Run Audit"}
              </button>
            </div>
          </form>

          {/* Loading state */}
          {state.status === "loading" && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 border-2 border-tio-teal border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium text-gray-700">Auditing site…</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Crawling pages, checking content, analysing SEO signals, and scoring
                across all five categories. This typically takes 15–30 seconds.
              </p>
              <div className="mt-3 text-xs text-gray-400 font-mono truncate">{state.url}</div>
            </div>
          )}

          {/* Error state */}
          {state.status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 max-w-sm mx-auto">
              <p className="text-sm font-medium text-red-700 mb-1">Audit failed</p>
              <p className="text-xs text-red-600">{state.message}</p>
              <button
                onClick={() => setState({ status: "idle" })}
                className="mt-3 text-xs font-medium text-red-700 hover:underline"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-400">
          TIO International · Digital Audit Tool · Internal use only
        </p>
      </footer>
    </div>
  );
}
