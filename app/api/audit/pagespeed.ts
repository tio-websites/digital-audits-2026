export interface PageSpeedResult {
  performanceMobile: number;
  performanceDesktop: number;
  lcp: string;
  cls: string;
  tbt: string;
  seoScore: number;
  available: boolean;
}

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

async function runPSI(url: string, strategy: "mobile" | "desktop"): Promise<Record<string, unknown> | null> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  const params = new URLSearchParams({ url, strategy, ...(apiKey ? { key: apiKey } : {}) });

  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params}`, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) return null;
    return await res.json() as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getScore(data: Record<string, unknown>, path: string[]): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let node: any = data;
  for (const key of path) {
    if (node == null || typeof node !== "object") return 0;
    node = node[key];
  }
  return typeof node === "number" ? Math.round(node * 100) : 0;
}

function getDisplayValue(data: Record<string, unknown>, auditId: string): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const audits = (data as any)?.lighthouseResult?.audits;
  return audits?.[auditId]?.displayValue ?? "-";
}

export async function getPageSpeed(url: string): Promise<PageSpeedResult> {
  const [mobile, desktop] = await Promise.all([
    runPSI(url, "mobile"),
    runPSI(url, "desktop"),
  ]);

  if (!mobile && !desktop) {
    return { performanceMobile: 0, performanceDesktop: 0, lcp: "-", cls: "-", tbt: "-", seoScore: 0, available: false };
  }

  const source = mobile ?? desktop!;

  return {
    performanceMobile: getScore(mobile ?? {}, ["lighthouseResult", "categories", "performance", "score"]),
    performanceDesktop: getScore(desktop ?? {}, ["lighthouseResult", "categories", "performance", "score"]),
    lcp: getDisplayValue(source, "largest-contentful-paint"),
    cls: getDisplayValue(source, "cumulative-layout-shift"),
    tbt: getDisplayValue(source, "total-blocking-time"),
    seoScore: getScore(mobile ?? {}, ["lighthouseResult", "categories", "seo", "score"]),
    available: true,
  };
}
