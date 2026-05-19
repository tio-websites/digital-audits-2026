"use client";

import Image from "next/image";
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-tio-navy px-8 py-5 flex items-center justify-between">
        <Image
          src="/tio-logo.svg"
          alt="the invisible orthodontist"
          width={160}
          height={62}
          className="brightness-0 invert"
          priority
        />
        <span className="text-white/40 text-xs font-medium tracking-wide uppercase">
          Digital Audit Tool
        </span>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center space-y-7">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-tio-light border border-tio-blue text-tio-navy text-xs font-semibold px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-tio-blue-dark rounded-full" />
            Orthodontic Website Audit
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-tio-navy leading-[1.1] tracking-tight">
            Audit any practice website
            <br />
            <span className="text-tio-blue-dark">in seconds.</span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed max-w-lg mx-auto">
            Score orthodontic websites across content, conversion, design, SEO,
            and AI search readiness. Built for TIO sales conversations.
          </p>

          {/* Weighting pills */}
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
                className="bg-tio-light border border-tio-blue text-gray-600 px-3 py-1 rounded-full"
              >
                {c.label}{" "}
                <strong className="text-tio-navy">{c.weight}</strong>
              </span>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. smileorthodontics.com.au"
                disabled={state.status === "loading"}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-tio-navy/30 focus:border-tio-navy text-sm disabled:opacity-50 transition-colors"
              />
              <button
                type="submit"
                disabled={state.status === "loading" || !url.trim()}
                className="px-6 py-3 bg-tio-navy text-white font-semibold rounded-xl shadow-sm hover:bg-tio-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              >
                {state.status === "loading" ? "Auditing…" : "Run Audit"}
              </button>
            </div>
          </form>

          {/* Loading */}
          {state.status === "loading" && (
            <div className="bg-tio-light border border-tio-blue rounded-2xl p-6 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-5 border-2 border-tio-navy border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium text-tio-navy">Auditing site…</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Crawling pages, checking content, analysing SEO signals, and scoring
                across all five categories. This typically takes 15–30 seconds.
              </p>
              <div className="mt-3 text-xs text-gray-400 font-mono truncate">{state.url}</div>
            </div>
          )}

          {/* Error */}
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
      <footer className="px-8 py-5 border-t border-gray-100 flex items-center justify-between">
        <Image
          src="/tio-logo.svg"
          alt="the invisible orthodontist"
          width={80}
          height={31}
          className="opacity-20"
        />
        <p className="text-xs text-gray-400">Internal use only</p>
      </footer>
    </div>
  );
}
