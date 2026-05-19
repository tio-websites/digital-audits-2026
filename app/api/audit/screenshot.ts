import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";

export interface Screenshots {
  desktop: string; // base64 PNG
  mobile: string;  // base64 PNG
}

export async function takeScreenshots(url: string): Promise<Screenshots> {
  const executablePath = await chromium.executablePath();

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath,
    headless: true,
  });

  try {
    // Desktop
    const desktopPage = await browser.newPage();
    await desktopPage.setViewportSize({ width: 1440, height: 900 });
    await desktopPage.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    await desktopPage.waitForTimeout(2000);
    const desktopBuffer = await desktopPage.screenshot({ type: "png", fullPage: false });
    await desktopPage.close();

    // Mobile
    const mobilePage = await browser.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 812 });
    await mobilePage.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    await mobilePage.waitForTimeout(1500);
    const mobileBuffer = await mobilePage.screenshot({ type: "png", fullPage: false });
    await mobilePage.close();

    return {
      desktop: desktopBuffer.toString("base64"),
      mobile: mobileBuffer.toString("base64"),
    };
  } finally {
    await browser.close();
  }
}
