"use client";

import { useEffect, useState } from "react";
import { TeaserReportLayout } from "../../components/PDFLayouts";
import type { AuditResult } from "../../api/audit/types";

export default function TeaserPDFPage() {
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("pdf-audit-data");
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {
        document.body.innerText = "Failed to load audit data.";
      }
    } else {
      document.body.innerText = "No audit data found. Please run an audit first.";
    }
  }, []);

  useEffect(() => {
    if (!result) return;
    const timer = setTimeout(() => window.print(), 800);
    return () => clearTimeout(timer);
  }, [result]);

  if (!result) return <p style={{ padding: 40, fontFamily: "sans-serif" }}>Loading...</p>;
  return <TeaserReportLayout result={result} />;
}
