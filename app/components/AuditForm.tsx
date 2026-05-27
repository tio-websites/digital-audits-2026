"use client";

import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import type { AuditResult } from "../api/audit/types";
import AuditResults from "./AuditResults";
import { supabaseBrowser } from "../../lib/supabase-browser";

interface RevenueImpact {
  missed_patients: number;
  missed_revenue: number;
  current_cvr_pct: number;
  benchmark_cvr_pct: number;
  monthly_traffic: number;
}

type State =
  | { status: "idle" }
  | { status: "streaming"; url: string; step: string; pct: number; message: string }
  | { status: "done"; result: AuditResult; revenueImpact: RevenueImpact; auditId: string | null }
  | { status: "error"; message: string };

const STEPS: { key: string; label: string }[] = [
  { key: "crawl", label: "Crawling website" },
  { key: "score", label: "Calculating scores" },
  { key: "screenshots", label: "Running PageSpeed, screenshots & AI checks" },
  { key: "pagespeed", label: "Running PageSpeed, screenshots & AI checks" },
  { key: "ai_check", label: "Running PageSpeed, screenshots & AI checks" },
  { key: "patch", label: "Finalising scores" },
];

const STEP_ORDER = ["crawl", "score", "screenshots", "pagespeed", "ai_check", "patch"];

function getStepLabel(step: string): string {
  return STEPS.find((s) => s.key === step)?.label ?? "Processing…";
}

function getStepIndex(step: string): number {
  const idx = STEP_ORDER.indexOf(step);
  return idx === -1 ? 0 : idx;
}

export default function AuditForm() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<State>({ status: "idle" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    supabaseBrowser.auth.getUser().then(({ data }: { data: { user: unknown } }) => {
      setIsLoggedIn(!!data.user);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    setState({ status: "streaming", url: trimmed, step: "crawl", pct: 5, message: "Starting audit…" });

    const res = await fetch("/api/audit/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: trimmed }),
    });

    if (!res.ok || !res.body) {
      const data = await res.json().catch(() => ({}));
      setState({ status: "error", message: data.error ?? "Audit failed." });
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const data = JSON.parse(line.slice(6));
          if (data.step === "error") {
            setState({ status: "error", message: data.message });
            return;
          }
          if (data.step === "complete") {
            // Store in localStorage for PDF pages
            localStorage.setItem("pdf-audit-data", JSON.stringify(data.result));
            if (data.auditId) {
              localStorage.setItem("pdf-audit-id", data.auditId);
            }
            setState({
              status: "done",
              result: data.result,
              revenueImpact: data.revenueImpact,
              auditId: data.auditId ?? null,
            });
            return;
          }
          // Progress update
          setState((prev) =>
            prev.status === "streaming"
              ? { ...prev, step: data.step, pct: data.pct, message: data.message }
              : prev
          );
        } catch {}
      }
    }
  }

  if (state.status === "done") {
    return (
      <AuditResults
        result={state.result}
        revenueImpact={state.revenueImpact}
        auditId={state.auditId}
        onReset={() => setState({ status: "idle" })}
      />
    );
  }

  const currentStepIndex =
    state.status === "streaming" ? getStepIndex(state.step) : -1;

  // Deduplicated checklist steps (collapse the three parallel steps into one)
  const checklistSteps = [
    { key: "crawl", label: "Crawling website" },
    { key: "score", label: "Calculating scores" },
    { key: "pagespeed", label: "Running PageSpeed, screenshots & AI checks" },
    { key: "patch", label: "Finalising scores" },
  ];

  function checklistStatus(key: string): "done" | "active" | "pending" {
    if (state.status !== "streaming") return "pending";
    const checklistOrder = ["crawl", "score", "pagespeed", "patch"];
    const currentNormalized =
      state.step === "screenshots" || state.step === "ai_check"
        ? "pagespeed"
        : state.step;
    const myIdx = checklistOrder.indexOf(key);
    const currentIdx = checklistOrder.indexOf(currentNormalized);
    if (myIdx < currentIdx) return "done";
    if (myIdx === currentIdx) return "active";
    return "pending";
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
                disabled={state.status === "streaming"}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-tio-navy/30 focus:border-tio-navy text-sm disabled:opacity-50 transition-colors"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={state.status === "streaming" || !url.trim()}
                  className="px-6 py-3 bg-tio-navy text-white font-semibold rounded-xl shadow-sm hover:bg-tio-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                >
                  {state.status === "streaming" ? "Auditing…" : "Run Audit"}
                </button>
                {isLoggedIn && (
                  <a
                    href="/dashboard"
                    className="text-xs font-medium text-tio-blue-dark hover:text-tio-navy whitespace-nowrap transition-colors"
                  >
                    View in dashboard →
                  </a>
                )}
              </div>
            </div>
          </form>

          {/* Streaming progress */}
          {state.status === "streaming" && (
            <div className="bg-tio-light border border-tio-blue rounded-2xl p-6 max-w-sm mx-auto text-left">
              {/* URL being audited */}
              <p className="text-xs text-gray-400 font-mono truncate mb-4">{state.url}</p>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-tio-navy">{state.message}</span>
                  <span className="text-xs font-semibold text-tio-navy tabular-nums">{state.pct}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-tio-blue">
                  <div
                    className="h-full bg-tio-navy rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${state.pct}%` }}
                  />
                </div>
              </div>

              {/* Step checklist */}
              <ol className="space-y-2">
                {checklistSteps.map((s) => {
                  const status = checklistStatus(s.key);
                  return (
                    <li key={s.key} className="flex items-center gap-2.5">
                      {status === "done" && (
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      {status === "active" && (
                        <span className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-tio-navy border-t-transparent animate-spin" />
                      )}
                      {status === "pending" && (
                        <span className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span
                        className={`text-xs ${
                          status === "active"
                            ? "text-tio-navy font-semibold"
                            : status === "done"
                            ? "text-gray-400 line-through"
                            : "text-gray-400"
                        }`}
                      >
                        {s.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
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
