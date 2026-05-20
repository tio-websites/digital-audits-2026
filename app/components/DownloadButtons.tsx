"use client";

import type { AuditResult } from "../api/audit/types";

interface Props {
  result: AuditResult;
}

export default function DownloadButtons({ result }: Props) {
  function handleDownload(type: "full" | "teaser") {
    localStorage.setItem("pdf-audit-data", JSON.stringify(result));
    window.open(`/pdf/${type}`, "_blank");
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => handleDownload("full")}
        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-navy text-white text-sm font-semibold rounded-xl hover:bg-tio-navy/90 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Full Report
      </button>

      <button
        onClick={() => handleDownload("teaser")}
        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-blue border-2 border-tio-blue-dark text-tio-navy text-sm font-semibold rounded-xl hover:bg-tio-blue/80 transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Download Teaser PDF
      </button>
    </div>
  );
}
