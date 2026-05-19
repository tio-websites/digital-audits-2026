"use client";

import { useState } from "react";
import { createRoot } from "react-dom/client";
import type { AuditResult } from "../api/audit/types";
import { FullReportLayout, TeaserReportLayout } from "./PDFLayouts";

interface Props {
  result: AuditResult;
}

type DownloadState = "idle" | "loading-full" | "loading-teaser" | "error";

async function renderAndExport(
  Layout: React.ComponentType<{ result: AuditResult }>,
  result: AuditResult,
  filename: string
) {
  // 1. Mount layout into a fresh off-screen div
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;top:0;left:-9999px;width:794px;background:#fff;z-index:-1;";
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<Layout result={result} />);

  // 2. Give React a tick to paint, then wait for any images
  await new Promise((r) => setTimeout(r, 600));

  // Wait for all images inside the container to load
  const imgs = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    imgs.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.onload = r;
              img.onerror = r;
            })
    )
  );

  try {
    // 3. Capture
    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      windowWidth: 794,
    });

    // 4. Build PDF (A4 in mm)
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = 210;
    const pageH = 297;
    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const imgH = (canvas.height * pageW) / canvas.width;

    let remaining = imgH;
    let yOffset = 0;

    pdf.addImage(imgData, "JPEG", 0, yOffset, pageW, imgH);
    remaining -= pageH;

    while (remaining > 0) {
      yOffset -= pageH;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, yOffset, pageW, imgH);
      remaining -= pageH;
    }

    pdf.save(filename);
  } finally {
    root.unmount();
    document.body.removeChild(container);
  }
}

export default function DownloadButtons({ result }: Props) {
  const [state, setState] = useState<DownloadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const slug = result.practice_name.replace(/\s+/g, "-").toLowerCase();

  async function handleDownload(type: "full" | "teaser") {
    setState(type === "full" ? "loading-full" : "loading-teaser");
    setErrorMsg("");
    try {
      if (type === "full") {
        await renderAndExport(FullReportLayout, result, `audit-full-${slug}.pdf`);
      } else {
        await renderAndExport(TeaserReportLayout, result, `audit-preview-${slug}.pdf`);
      }
      setState("idle");
    } catch (err) {
      console.error("PDF export failed:", err);
      setErrorMsg(err instanceof Error ? err.message : "PDF generation failed.");
      setState("error");
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Full report */}
        <button
          onClick={() => handleDownload("full")}
          disabled={state !== "idle" && state !== "error"}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-navy text-white text-sm font-semibold rounded-xl hover:bg-tio-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "loading-full" ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating full report...
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

        {/* Teaser */}
        <button
          onClick={() => handleDownload("teaser")}
          disabled={state !== "idle" && state !== "error"}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-blue border-2 border-tio-blue-dark text-tio-navy text-sm font-semibold rounded-xl hover:bg-tio-blue/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state === "loading-teaser" ? (
            <>
              <span className="w-4 h-4 border-2 border-tio-navy border-t-transparent rounded-full animate-spin" />
              Generating teaser...
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

      {state === "error" && errorMsg && (
        <p className="text-xs text-red-600">{errorMsg}</p>
      )}
    </div>
  );
}
