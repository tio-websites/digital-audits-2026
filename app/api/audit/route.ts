import { NextRequest, NextResponse } from "next/server";
import { crawlSite } from "./crawler";
import { scoreAudit } from "./scorer";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  let url: string;
  try {
    const body = await request.json();
    url = body.url?.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!url) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }

  // Normalise URL
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
  }

  try {
    const crawlData = await crawlSite(url);
    const result = scoreAudit(crawlData);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Audit failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
