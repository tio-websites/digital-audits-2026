"use client";

import { useRef, useState } from "react";
import type { AuditResult } from "../api/audit/types";
import { FullReportContainer, TeaserReportContainer } from "./PDFLayouts";

interface Props {
  result: AuditResult;
}

type DownloadState = "idle" | "loading-full" | "loading-teaser";

async function exportToPDF(element: HTMLElement, filename: string) {
  const { default: jsPDF } = await import("jspdf");
  const { default: html2canvas } = await import("html2canvas");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF({ unit: "px", format: "a4", orientation: "portrait" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}

export default function DownloadButtons({ result }: Props) {
  const fullRef = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<DownloadState>("idle");

  const practiceName = result.practice_name.replace(/\s+/g, "-").toLowerCase();

  async function downloadFull() {
    if (!fullRef.current) return;
    setState("loading-full");
    try {
      await exportToPDF(fullRef.current, `audit-full-${practiceName}.pdf`);
    } finally {
      setState("idle");
    }
  }

  async function downloadTeaser() {
    if (!teaserRef.current) return;
    setState("loading-teaser");
    try {
      await exportToPDF(teaserRef.current, `audit-preview-${practiceName}.pdf`);
    } finally {
      setState("idle");
    }
  }

  return (
    <>
      {/* Hidden PDF layouts — rendered off-screen for capture */}
      <FullReportContainer result={result} containerRef={fullRef} />
      <TeaserReportContainer result={result} containerRef={teaserRef} />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={downloadFull}
          disabled={state !== "idle"}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-navy text-white text-sm font-semibold rounded-xl hover:bg-tio-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "loading-full" ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Full Report
            </>
          )}
        </button>

        <button
          onClick={downloadTeaser}
          disabled={state !== "idle"}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-blue border-2 border-tio-blue-dark text-tio-navy text-sm font-semibold rounded-xl hover:bg-tio-blue/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "loading-teaser" ? (
            <>
              <span className="w-4 h-4 border-2 border-tio-navy border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Teaser PDF
            </>
          )}
        </button>
      </div>
    </>
  );
}
