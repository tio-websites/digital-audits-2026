import * as cheerio from "cheerio";
import type { CrawlData } from "./types";

const TREATMENT_KEYWORDS = [
  "invisalign",
  "braces",
  "retainer",
  "aligners",
  "orthodont",
  "teeth straightening",
  "clear braces",
  "ceramic braces",
  "lingual braces",
  "early treatment",
  "children",
  "kids",
  "teens",
  "adults",
];

const BOOKING_KEYWORDS = [
  "book",
  "appointment",
  "consult",
  "schedule",
  "reserve",
  "request",
];

const PRICING_KEYWORDS = ["cost", "price", "pricing", "finance", "payment", "fee", "afford"];

const FAQ_KEYWORDS = ["faq", "question", "help", "guide"];

const BLOG_KEYWORDS = ["blog", "news", "article", "resource", "education", "learn"];

const REFERRAL_KEYWORDS = ["referral", "refer", "dentist", "gp", "for dentist", "professional"];

const GALLERY_KEYWORDS = ["gallery", "before", "after", "smile", "transform", "result", "case"];

const WHY_KEYWORDS = ["why choose", "why us", "our difference", "what makes", "unique", "benefit"];

const DOCTOR_KEYWORDS = ["dr.", "doctor", "orthodontist", "specialist", "qualification", "member of"];

function detectPlatform(html: string): string {
  if (html.includes("wp-content") || html.includes("wordpress")) return "WordPress";
  if (html.includes("squarespace.com") || html.includes("sqsp")) return "Squarespace";
  if (html.includes("wix.com") || html.includes("_wix")) return "Wix";
  if (html.includes("webflow.io") || html.includes("webflow")) return "Webflow";
  if (html.includes("shopify")) return "Shopify";
  if (html.includes("concrete5") || html.includes("ccm_")) return "Concrete5";
  if (html.includes("drupal")) return "Drupal";
  if (html.includes("joomla")) return "Joomla";
  return "Unknown";
}

function extractSocialLinks(html: string): { facebook: string | null; instagram: string | null; tiktok: string | null } {
  const facebookMatch = html.match(/href="(https?:\/\/(?:www\.)?facebook\.com\/[^"]+)"/i);
  const instagramMatch = html.match(/href="(https?:\/\/(?:www\.)?instagram\.com\/[^"]+)"/i);
  const tiktokMatch = html.match(/href="(https?:\/\/(?:www\.)?tiktok\.com\/[^"]+)"/i);
  return {
    facebook: facebookMatch?.[1] ?? null,
    instagram: instagramMatch?.[1] ?? null,
    tiktok: tiktokMatch?.[1] ?? null,
  };
}

function containsAny(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((k) => lower.includes(k));
}

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-AU,en-GB;q=0.9,en;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Connection": "keep-alive",
  "Upgrade-Insecure-Requests": "1",
};

async function fetchWithTimeout(url: string, timeoutMs = 15000): Promise<string | null> {
  for (const headers of [BROWSER_HEADERS, { "User-Agent": BROWSER_HEADERS["User-Agent"] }]) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, {
        signal: controller.signal,
        headers,
        redirect: "follow",
      });
      clearTimeout(timer);
      if (!res.ok) continue;
      const text = await res.text();
      // If Cloudflare challenge page, treat as failure
      if (text.includes("cf-browser-verification") || text.includes("cf_clearance") || text.includes("jschl-answer")) continue;
      return text;
    } catch {
      continue;
    }
  }
  return null;
}

async function checkExists(url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": BROWSER_HEADERS["User-Agent"] },
      redirect: "follow",
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

function normaliseUrl(href: string, base: string): string | null {
  try {
    const url = new URL(href, base);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    url.hash = "";
    return url.toString();
  } catch {
    return null;
  }
}

function isSameDomain(url: string, base: string): boolean {
  try {
    const u = new URL(url);
    const b = new URL(base);
    return u.hostname === b.hostname;
  } catch {
    return false;
  }
}

function shouldSkip(url: string): boolean {
  const lower = url.toLowerCase();
  return (
    lower.includes("?") ||
    lower.includes("#") ||
    lower.endsWith(".pdf") ||
    lower.endsWith(".jpg") ||
    lower.endsWith(".png") ||
    lower.endsWith(".css") ||
    lower.endsWith(".js") ||
    lower.includes("/tag/") ||
    lower.includes("/category/") ||
    lower.includes("/page/") ||
    lower.includes("/feed/") ||
    lower.includes("/wp-json/") ||
    lower.includes("print=") ||
    lower.includes("replytocom=")
  );
}

export async function crawlSite(inputUrl: string): Promise<CrawlData> {
  const baseUrl = inputUrl.endsWith("/") ? inputUrl.slice(0, -1) : inputUrl;
  const isHttps = baseUrl.startsWith("https://");

  // Fetch homepage
  const homepageHtml = await fetchWithTimeout(baseUrl);
  if (!homepageHtml) {
    throw new Error(`Could not fetch ${baseUrl}. The site may be down or blocking automated requests.`);
  }

  const $ = cheerio.load(homepageHtml);
  const homepageText = $("body").text().toLowerCase();

  // Collect level-1 links from homepage nav
  const level1Links = new Set<string>();
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (!href) return;
    const full = normaliseUrl(href, baseUrl);
    if (full && isSameDomain(full, baseUrl) && !shouldSkip(full) && full !== baseUrl) {
      level1Links.add(full);
    }
  });

  // Sample up to 10 linked pages for deeper analysis (keep total crawl under ~20s)
  const pagesToCrawl = Array.from(level1Links).slice(0, 10);
  const crawledPages: { url: string; html: string; text: string }[] = [];

  await Promise.allSettled(
    pagesToCrawl.map(async (url) => {
      const html = await fetchWithTimeout(url, 4000);
      if (html) {
        const p$ = cheerio.load(html);
        crawledPages.push({ url, html, text: p$("body").text().toLowerCase() });
      }
    })
  );

  const allText = [homepageText, ...crawledPages.map((p) => p.text)].join(" ");
  const allHtml = [homepageHtml, ...crawledPages.map((p) => p.html)].join(" ");

  // Extract key data
  const title = $("title").first().text().trim();
  const metaDescription = $('meta[name="description"]').attr("content") ?? "";
  const hasViewportMeta = !!$('meta[name="viewport"]').attr("content");

  const h1s: string[] = [];
  $("h1").each((_, el) => { h1s.push($(el).text().trim()); });

  const h2s: string[] = [];
  $("h2").each((_, el) => { h2s.push($(el).text().trim()); });

  // Schema detection
  const schemaBlocks: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => { schemaBlocks.push($(el).html() ?? ""); });
  const schemaTypes = schemaBlocks
    .join(" ")
    .match(/"@type"\s*:\s*"([^"]+)"/g)
    ?.map((m) => m.replace(/"@type"\s*:\s*"([^"]+)"/, "$1")) ?? [];
  const hasSchema = schemaBlocks.length > 0;

  // Technical checks
  const [hasSitemap, hasRobots] = await Promise.all([
    checkExists(`${baseUrl}/sitemap.xml`),
    checkExists(`${baseUrl}/robots.txt`),
  ]);

  // Social links
  const socialLinks = extractSocialLinks(allHtml);

  // Platform detection
  const platform = detectPlatform(allHtml);

  // Booking form detection
  let hasBookingForm = false;
  let bookingUrl: string | null = null;
  for (const page of [{ url: baseUrl, text: homepageText }, ...crawledPages]) {
    if (containsAny(page.url + " " + page.text, BOOKING_KEYWORDS)) {
      const hasForm = allHtml.includes("<form") || allHtml.includes("input type");
      if (hasForm || containsAny(page.text, ["book online", "book appointment", "request appointment", "schedule"])) {
        hasBookingForm = true;
        bookingUrl = page.url !== baseUrl ? page.url : null;
        break;
      }
    }
  }

  // Gallery detection
  const galleryPages = crawledPages.filter((p) => containsAny(p.url + " " + p.text, GALLERY_KEYWORDS));
  const hasGallery = galleryPages.length > 0 || containsAny(homepageText, GALLERY_KEYWORDS);
  const galleryCount = hasGallery ? (galleryPages.length > 0 ? galleryPages.length * 3 : 2) : 0;

  // Pricing page
  const hasPricingPage = crawledPages.some((p) => containsAny(p.url, PRICING_KEYWORDS)) ||
    containsAny(allText, ["payment plan", "finance option", "interest free", "denticare", "afterpay", "payment options"]);

  // FAQ
  const hasFaqPage = crawledPages.some((p) => containsAny(p.url + " " + p.text.slice(0, 200), FAQ_KEYWORDS)) ||
    $("h2, h3").text().toLowerCase().includes("faq") ||
    $("h2, h3").text().toLowerCase().includes("frequently asked");

  // Blog/resources
  const hasBlogOrResources = crawledPages.some((p) => containsAny(p.url, BLOG_KEYWORDS)) ||
    level1Links.size > 0 && Array.from(level1Links).some((l) => containsAny(l, BLOG_KEYWORDS));

  // Doctor profile
  const hasDoctorProfile = containsAny(allText, DOCTOR_KEYWORDS) &&
    (allText.includes("bds") || allText.includes("mds") || allText.includes("orthodontic specialist") ||
      allText.includes("morth") || allText.includes("fellowship") || containsAny(allText, ["qualification", "trained at", "graduated"]));

  // Referral page
  const hasReferralPage = crawledPages.some((p) => containsAny(p.url + " " + p.text.slice(0, 300), REFERRAL_KEYWORDS)) ||
    containsAny(homepageText, ["refer a patient", "dental referral", "for dentists"]);

  // Treatment pages
  const treatmentPagesList = crawledPages
    .filter((p) => containsAny(p.url + " " + p.text.slice(0, 200), TREATMENT_KEYWORDS))
    .map((p) => p.url);
  const hasTreatmentPages = treatmentPagesList.length >= 2;

  // Why choose us / USPs
  const hasWhyChooseUs = containsAny(homepageText, WHY_KEYWORDS) ||
    $("h2, h3, h4").text().toLowerCase().includes("why choose");

  // CTA count
  let ctaCount = 0;
  $("a, button").each((_, el) => {
    const text = $(el).text().toLowerCase();
    if (containsAny(text, ["book", "consult", "appointment", "contact", "get started", "call us", "free"])) {
      ctaCount++;
    }
  });

  // Image analysis
  let imagesTotal = 0;
  let imagesWithAlt = 0;
  $("img").each((_, el) => {
    imagesTotal++;
    const alt = $(el).attr("alt");
    if (alt && alt.trim().length > 0) imagesWithAlt++;
  });
  const hasImageAlt = imagesTotal > 0 && imagesWithAlt / imagesTotal > 0.7;
  const hasLazyLoading = allHtml.includes('loading="lazy"') || allHtml.includes("loading='lazy'");
  const hasWebpImages = allHtml.includes(".webp") || allHtml.includes("image/webp");

  // Local SEO
  const hasLocalKeywords = containsAny(title + " " + allText.slice(0, 5000), ["orthodontist in", "braces in", "invisalign in"]);
  const locationMatch = (title + " " + (h1s[0] ?? "")).match(/in ([A-Z][a-zA-Z\s]+)/);
  const locationMentioned = locationMatch?.[1]?.trim() ?? "";
  const hasNap = containsAny(allText, ["phone", "tel:", "address", "street", "suburb"]);
  const hasLocalSchema = schemaTypes.some((t) =>
    ["LocalBusiness", "MedicalBusiness", "MedicalOrganization", "Dentist"].includes(t)
  );

  // Missing pages checklist
  const mustHavePages = [
    { label: "Invisalign page", keywords: ["invisalign"] },
    { label: "Braces page", keywords: ["braces"] },
    { label: "Pricing / finance page", keywords: PRICING_KEYWORDS },
    { label: "FAQs page", keywords: FAQ_KEYWORDS },
    { label: "About / meet the team page", keywords: ["about", "team", "meet"] },
    { label: "Booking / consultation page", keywords: BOOKING_KEYWORDS },
    { label: "Contact page", keywords: ["contact", "find us", "location"] },
    { label: "Dental referral page", keywords: REFERRAL_KEYWORDS },
  ];

  const hasMissingPages: string[] = [];
  for (const page of mustHavePages) {
    const found =
      Array.from(level1Links).some((l) => containsAny(l, page.keywords)) ||
      crawledPages.some((p) => containsAny(p.url, page.keywords));
    if (!found) hasMissingPages.push(page.label);
  }

  const navPages = Array.from(level1Links).slice(0, 30);

  return {
    url: baseUrl,
    html: homepageHtml,
    text: homepageText,
    title,
    metaDescription,
    h1s,
    h2s,
    links: navPages,
    hasSchema,
    schemaTypes,
    hasSitemap,
    hasRobots,
    hasViewportMeta,
    socialLinks,
    hasBookingForm,
    bookingUrl,
    hasGallery,
    galleryCount,
    hasPricingPage,
    hasFaqPage,
    hasBlogOrResources,
    hasDoctorProfile,
    hasReferralPage,
    hasTreatmentPages,
    treatmentPages: treatmentPagesList,
    hasWhyChooseUs,
    ctaCount,
    pageCount: 1 + crawledPages.length,
    platform,
    navPages,
    hasLocalKeywords,
    locationMentioned,
    hasNap,
    hasLocalSchema,
    hasImageAlt,
    imagesTotal,
    imagesWithAlt,
    hasLazyLoading,
    hasWebpImages,
    isHttps,
    hasMissingPages,
  };
}
