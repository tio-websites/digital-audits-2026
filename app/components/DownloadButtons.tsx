"use client";

import { useState } from "react";
import { createRoot } from "react-dom/client";
import type { AuditResult } from "../api/audit/types";
import { FullReportLayout, TeaserReportLayout } from "./PDFLayouts";

interface Props {
  result: AuditResult;
}

type State = "idle" | "printing-full" | "printing-teaser";

function getPrintRoot(): HTMLElement {
  let el = document.getElementById("pdf-print-root");
  if (!el) {
    el = document.createElement("div");
    el.id = "pdf-print-root";
    document.body.appendChild(el);
  }
  return el;
}

async function printLayout(
  Layout: React.ComponentType<{ result: AuditResult }>,
  result: AuditResult
) {
  const container = getPrintRoot();

  // Render the layout into the print root
  const root = createRoot(container);
  root.render(<Layout result={result} />);

  // Wait for React to paint and images to load
  await new Promise((r) => setTimeout(r, 400));
  const imgs = Array.from(container.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) =>
      img.complete ? Promise.resolve() : new Promise((r) => { img.onload = r; img.onerror = r; })
    )
  );

  window.print();

  // Clean up after print dialog closes
  setTimeout(() => {
    root.unmount();
    container.innerHTML = "";
  }, 1000);
}

export default function DownloadButtons({ result }: Props) {
  const [state, setState] = useState<State>("idle");

  async function handlePrint(type: "full" | "teaser") {
    setState(type === "full" ? "printing-full" : "printing-teaser");
    try {
      await printLayout(
        type === "full" ? FullReportLayout : TeaserReportLayout,
        result
      );
    } finally {
      setState("idle");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => handlePrint("full")}
        disabled={state !== "idle"}
        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-navy text-white text-sm font-semibold rounded-xl hover:bg-tio-navy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "printing-full" ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Preparing...
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
        onClick={() => handlePrint("teaser")}
        disabled={state !== "idle"}
        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-tio-blue border-2 border-tio-blue-dark text-tio-navy text-sm font-semibold rounded-xl hover:bg-tio-blue/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "printing-teaser" ? (
          <>
            <span className="w-4 h-4 border-2 border-tio-navy border-t-transparent rounded-full animate-spin" />
            Preparing...
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
  );
}
