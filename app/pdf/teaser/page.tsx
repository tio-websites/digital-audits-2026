"use client";

import { useEffect, useState } from "react";
import { TeaserReportLayout } from "../../components/PDFLayouts";
import LeadCaptureModal from "../../components/LeadCaptureModal";
import type { AuditResult } from "../../api/audit/types";

export default function TeaserPDFPage() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load audit data from localStorage
    const raw = localStorage.getItem("pdf-audit-data");
    if (raw) {
      try {
        const parsed: AuditResult = JSON.parse(raw);
        setResult(parsed);
      } catch {
        document.body.innerText = "Failed to load audit data.";
        return;
      }
    } else {
      document.body.innerText = "No audit data found. Please run an audit first.";
      return;
    }

    // Load auditId — prefer the dedicated key, fall back to the result object
    const storedId = localStorage.getItem("pdf-audit-id");
    if (storedId) {
      setAuditId(storedId);
    } else {
      try {
        const parsed = JSON.parse(raw ?? "{}");
        setAuditId(parsed?.audit_id ?? null);
      } catch {}
    }

    // Check if lead already captured this session
    const captured = localStorage.getItem("lead-captured") === "true";
    setLeadCaptured(captured);

    setReady(true);
  }, []);

  // Auto-print only after lead is captured
  useEffect(() => {
    if (!result || !leadCaptured) return;
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, [result, leadCaptured]);

  function handleUnlock() {
    localStorage.setItem("lead-captured", "true");
    setLeadCaptured(true);
  }

  if (!ready || !result) {
    return <p style={{ padding: 40, fontFamily: "sans-serif" }}>Loading...</p>;
  }

  return (
    <>
      {/* Teaser layout — always rendered so the PDF is ready when printing */}
      <TeaserReportLayout result={result} />

      {/* Lead capture gate — overlays the layout until captured */}
      {!leadCaptured && (
        <LeadCaptureModal
          auditId={auditId}
          overallScore={result.overall_score}
          onUnlock={handleUnlock}
        />
      )}
    </>
  );
}
