"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

interface Props {
  auditId: string | null;
  overallScore: number;
  onUnlock: () => void;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LeadCaptureModal({ auditId, overallScore, onUnlock }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, auditId, overallScore }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      // Mark as captured so the gate doesn't reappear
      localStorage.setItem("lead-captured", "true");
      onUnlock();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-tio-navy/70 backdrop-blur-sm" />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-tio-navy via-tio-blue-dark to-tio-blue" />

        <div className="px-8 py-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/tio-logo.svg"
              alt="the invisible orthodontist"
              width={120}
              height={47}
              className="opacity-80"
            />
          </div>

          {/* Score badge */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-2 bg-tio-light border border-tio-blue text-tio-navy text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-tio-blue-dark" />
              Your overall score: {overallScore}/100
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-semibold text-tio-navy text-center leading-snug mb-2">
            Get your full audit report
          </h2>
          <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
            Enter your email to get the complete breakdown with all 25+ recommendations.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                placeholder="you@yourpractice.com.au"
                disabled={status === "loading"}
                autoFocus
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-tio-navy/30 focus:border-tio-navy text-sm disabled:opacity-50 transition-colors"
              />
              {status === "error" && errorMessage && (
                <p className="mt-1.5 text-xs text-red-600">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-tio-navy text-white font-semibold rounded-xl shadow-sm hover:bg-tio-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send me the full report →
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
            No spam. We&apos;ll only send you your audit report and occasional tips for practice growth.
          </p>
        </div>
      </div>
    </div>
  );
}
