import type { CrawlData, AuditResult, CategoryResult, SubcategoryScore } from "./types";

// ─── Updated weightings per feedback ────────────────────────────────────────
// A4 Booking: 15 → 20 pts (A2 Before/After: 20 → 15 to compensate)
// B3 Social:  20 → 10 pts (B1 CTA: 40 → 45, B2 USP: 40 → 45)
// C2 Photo:   focus sharpened to authentic vs stock (no point change)
// E2:         directional snapshot caveat added to output
// ─────────────────────────────────────────────────────────────────────────────

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function scoreContent(data: CrawlData): CategoryResult {
  // A1: Treatment Descriptions (30 pts)
  let a1 = 0;
  if (data.treatmentPages.length >= 4) a1 = clamp(24 + data.treatmentPages.length, 24, 30);
  else if (data.hasTreatmentPages) a1 = 16;
  else if (data.text.includes("invisalign") || data.text.includes("braces")) a1 = 8;

  // A2: Before/After Gallery (15 pts — reduced from 20 to accommodate A4 increase)
  let a2 = 0;
  if (data.hasGallery && data.galleryCount >= 10) a2 = clamp(12 + Math.floor(data.galleryCount / 5), 12, 15);
  else if (data.hasGallery && data.galleryCount >= 3) a2 = 8;
  else if (data.hasGallery) a2 = 4;

  // A3: Pricing & Payment Information (20 pts)
  let a3 = 0;
  if (data.hasPricingPage) {
    const hasPaymentDetail =
      data.text.includes("payment plan") ||
      data.text.includes("interest free") ||
      data.text.includes("denticare") ||
      data.text.includes("afterpay");
    const hasInclusion =
      data.text.includes("included") ||
      data.text.includes("retainer") ||
      data.text.includes("what's included");
    if (hasPaymentDetail && hasInclusion) a3 = 17;
    else if (hasPaymentDetail) a3 = 13;
    else a3 = 7;
  } else if (data.text.includes("payment") || data.text.includes("affordable")) {
    a3 = 4;
  }

  // A4: Booking / Webform (20 pts — increased from 15)
  let a4 = 0;
  if (data.hasBookingForm) {
    const isEasyToFind = data.ctaCount >= 3;
    a4 = isEasyToFind ? 17 : 10;
  }

  // A5: Doctor Credentials (10 pts)
  let a5 = 0;
  if (data.hasDoctorProfile) a5 = 8;
  else if (data.text.includes("dr.") || data.text.includes("orthodontist")) a5 = 4;

  // A6: Dental Referrals (5 pts)
  const a6 = data.hasReferralPage ? 4 : (data.text.includes("refer") ? 2 : 0);

  const total = a1 + a2 + a3 + a4 + a5 + a6;

  return {
    score: total,
    description: buildContentDescription(data, { a1, a2, a3, a4, a5, a6, total }),
    talking_points: buildContentTalkingPoints(data, { a1, a3, a4 }),
    subcategories: [
      {
        name: "Treatment Descriptions",
        score: a1,
        max: 30,
        finding: data.hasTreatmentPages
          ? `${data.treatmentPages.length} treatment pages found. ${data.treatmentPages.slice(0, 3).join(", ")}`
          : "Treatments mentioned on site but no individual dedicated pages found.",
        recommendation:
          "Create individual pages per treatment (Invisalign, braces, teen orthodontics, early treatment). Each page should answer: what's involved, how long it takes, who it suits, and cost range.",
      },
      {
        name: "Before/After Gallery",
        score: a2,
        max: 15,
        finding: data.hasGallery
          ? `Gallery found with approximately ${data.galleryCount} case${data.galleryCount !== 1 ? "s" : ""}.`
          : "No before/after gallery found on the site.",
        recommendation:
          "A gallery of 10+ real patient cases builds social proof at a critical decision stage. Include a variety of treatments (Invisalign, braces, teens, adults) and obtain patient consent for online use.",
      },
      {
        name: "Pricing & Payment Information",
        score: a3,
        max: 20,
        finding: data.hasPricingPage
          ? "Pricing or finance page exists."
          : "No dedicated pricing or finance page found. Patients cannot easily understand the cost.",
        recommendation:
          "A finance page doesn't need to show exact prices. It should explain what's included in treatment, available payment plans, financing partners (e.g. DentiCare), and how to get a personalised quote.",
      },
      {
        name: "Booking / Webform",
        score: a4,
        max: 20,
        finding: data.hasBookingForm
          ? `Online booking or appointment form found${data.bookingUrl ? ` at ${data.bookingUrl}` : " on the site"}.`
          : "No online booking system or appointment request form found. Contact is limited to phone or email.",
        recommendation:
          "Add a short appointment request form (name, phone, treatment interest, preferred time) accessible directly from the homepage and all treatment pages. Third-party booking tools should open inline or in a simple modal — avoid redirecting patients to external booking portals without context.",
      },
      {
        name: "Doctor Credentials",
        score: a5,
        max: 10,
        finding: data.hasDoctorProfile
          ? "Doctor profile with credentials found."
          : "No clear doctor credentials page found. The specialist(s) are not introduced with qualifications.",
        recommendation:
          "Patients choose orthodontists based heavily on trust. Name the orthodontist(s), show professional headshots, list their qualifications (BDS, MOrth, Fellowship), and highlight any specialisms or Invisalign tier.",
      },
      {
        name: "Dental Referrals",
        score: a6,
        max: 5,
        finding: data.hasReferralPage
          ? "Referral pathway found."
          : "No referral page or pathway for dentists/GPs found.",
        recommendation:
          'A "Refer a Patient" page with an online referral form can be a significant source of new patients. Label it clearly in the nav under "For Dentists" or "Refer a Patient".',
      },
    ],
  };
}

function buildContentDescription(data: CrawlData, s: Record<string, number>): string {
  const lines: string[] = [];
  lines.push(
    `Content Quality assesses whether this website gives patients enough information to understand treatments, feel confident about costs, and take the next step. The site scored ${s.total}/100.`
  );
  if (s.a1 < 15) lines.push("Treatment information is sparse — patients have to work hard to understand what's on offer.");
  else if (s.a1 >= 24) lines.push("Treatment pages are a strength, with dedicated content for individual treatment types.");
  if (!data.hasBookingForm) lines.push("There is no online booking or appointment request form, which is a significant conversion barrier.");
  if (!data.hasPricingPage) lines.push("The absence of a pricing or finance page means prospective patients have no way to gauge affordability before calling.");
  return lines.join(" ");
}

function buildContentTalkingPoints(data: CrawlData, s: Record<string, number>): string {
  const points: string[] = [];
  if (!data.hasBookingForm) points.push("No online booking — every interested patient has to pick up the phone, which loses the 40%+ who prefer digital booking.");
  if (!data.hasPricingPage) points.push("No finance page — cost is the #1 reason patients don't book. A finance page removes that barrier.");
  if (s.a1 < 15) points.push("Thin treatment pages — when patients Google a specific treatment, there's nothing to land on.");
  return points.length ? points.join("\n") : "Content is generally solid; conversation can focus on refinements.";
}

function scoreUX(data: CrawlData): CategoryResult {
  // B1: CTA Placement & Clarity (45 pts — increased from 40)
  let b1 = 0;
  if (data.ctaCount >= 5) b1 = 36 + clamp(data.ctaCount - 5, 0, 9);
  else if (data.ctaCount >= 3) b1 = 22;
  else if (data.ctaCount >= 1) b1 = 12;

  // B2: Value Proposition / USPs (45 pts — increased from 40)
  let b2 = 0;
  if (data.hasWhyChooseUs) {
    const hasSpecifics =
      data.text.includes("years experience") ||
      data.text.includes("invisalign provider") ||
      data.text.includes("platinum") ||
      data.text.includes("gold") ||
      data.text.includes("specialist") ||
      data.text.includes("interest free");
    b2 = hasSpecifics ? 36 : 22;
  } else {
    b2 = data.text.includes("caring") || data.text.includes("modern") ? 10 : 5;
  }

  // B3: Social Proof & Trust Signals (10 pts — reduced from 20)
  let b3 = 0;
  const { facebook, instagram, tiktok } = data.socialLinks;
  if (facebook && instagram) b3 += 5;
  else if (facebook || instagram) b3 += 3;
  if (tiktok) b3 += 1;
  const hasTrustBadge =
    data.text.includes("invisalign provider") ||
    data.text.includes("aso member") ||
    data.text.includes("platinum elite") ||
    data.text.includes("diamond") ||
    data.html.includes("invisalign") && (data.html.includes("badge") || data.html.includes("logo"));
  if (hasTrustBadge) b3 += 4;

  const total = b1 + b2 + b3;

  return {
    score: total,
    description: buildUXDescription(data, { b1, b2, b3, total }),
    talking_points: buildUXTalkingPoints(data, { b1, b2 }),
    subcategories: [
      {
        name: "Call-to-Action Placement & Clarity",
        score: b1,
        max: 45,
        finding: `${data.ctaCount} CTA element${data.ctaCount !== 1 ? "s" : ""} found. ${
          data.ctaCount < 3
            ? "CTAs are sparse and patients may not know how to take the next step."
            : "CTAs are present but quality and placement varies."
        }`,
        recommendation:
          'The strongest orthodontic sites use a specific, confident CTA above the fold ("Book Your Free Consultation") and repeat it after every key section. Add a sticky header button and multiple contact options (online booking + call + callback request).',
      },
      {
        name: "Value Proposition / USPs",
        score: b2,
        max: 45,
        finding: data.hasWhyChooseUs
          ? 'A "Why Choose Us" or similar section exists on the homepage.'
          : 'No clear "Why Choose Us" section found. The homepage does not answer why a patient should choose this practice over a competitor.',
        recommendation:
          "Patients compare 3-5 practices before booking. A prominent USP section with 4+ specific differentiators (e.g. Platinum Invisalign provider, specialist orthodontist only, 0% finance, free consultations) dramatically increases conversion.",
      },
      {
        name: "Social Proof & Trust Signals",
        score: b3,
        max: 10,
        finding: [
          facebook ? "Facebook linked." : "Facebook not linked.",
          instagram ? "Instagram linked." : "Instagram not linked.",
          tiktok ? "TikTok linked." : "TikTok not linked.",
        ].join(" "),
        recommendation:
          "Link to Facebook and Instagram as a minimum. More important than linking is maintaining an active presence — consider displaying an embedded Instagram feed. Invisalign provider tier badges and professional membership logos placed near CTAs significantly increase conversion.",
      },
    ],
  };
}

function buildUXDescription(data: CrawlData, s: Record<string, number>): string {
  const lines: string[] = [
    `UX & Conversion measures how effectively the site drives patients to take action. The site scored ${s.total}/100.`,
  ];
  if (s.b2 < 18) lines.push("The homepage lacks a compelling value proposition — there is no clear reason why a patient should choose this practice over a competitor.");
  if (s.b1 < 22) lines.push("Calls-to-action are weak or infrequent, leaving patients without a clear next step.");
  return lines.join(" ");
}

function buildUXTalkingPoints(data: CrawlData, s: Record<string, number>): string {
  const points: string[] = [];
  if (!data.hasWhyChooseUs) points.push("No USP section — practices with a strong 'Why Choose Us' block convert at 2-3x the rate of those without.");
  if (s.b1 < 22) points.push("Weak CTAs — a patient who can't immediately see how to book will leave.");
  return points.length ? points.join("\n") : "UX fundamentals are in place; conversation can focus on CTA optimisation.";
}

function scoreDesign(data: CrawlData): CategoryResult {
  const hasModernFramework =
    data.html.includes("tailwind") ||
    data.html.includes("bootstrap") ||
    data.html.includes("next") ||
    data.html.includes("react") ||
    data.html.includes("vue") ||
    data.html.includes("nuxt");

  const hasDatedSignals =
    data.html.toLowerCase().includes("jquery") ||
    data.html.includes("welcome to") ||
    data.html.includes("table") ||
    data.html.includes("marquee");

  // C1: Visual Modernity (60 pts) — estimated from signals
  let c1 = 36;
  if (hasModernFramework && !hasDatedSignals) c1 = 48;
  if (hasDatedSignals) c1 = 22;

  // C2: Photography Quality (25 pts) — sharpened to authentic vs stock
  // We can't visually verify without a screenshot, so we score conservatively
  // and flag for manual review
  let c2 = 12; // Default: unable to verify without screenshot
  const hasTeamPhotos =
    data.text.includes("our team") ||
    data.text.includes("meet the team") ||
    data.text.includes("dr.") && data.imagesTotal > 3;
  if (hasTeamPhotos) c2 = 16;

  // C3: Whitespace & Readability (15 pts)
  let c3 = 0;
  if (data.hasViewportMeta) c3 += 2;
  if (!hasDatedSignals) c3 += 4;
  if (data.html.includes("line-height") || hasModernFramework) c3 += 3;
  if (data.html.includes("max-width") || data.html.includes("container")) c3 += 3;
  c3 = clamp(c3, 0, 15);

  const total = c1 + c2 + c3;

  return {
    score: total,
    description: buildDesignDescription(data, { c1, c2, c3, total }),
    talking_points: buildDesignTalkingPoints(hasDatedSignals, c1),
    subcategories: [
      {
        name: "Visual Modernity & Brand Identity",
        score: c1,
        max: 60,
        finding: hasDatedSignals
          ? "The site shows dated design signals (jQuery effects, table layouts, or older styling patterns) that may undermine patient trust."
          : hasModernFramework
          ? "The site uses a modern development framework, suggesting a contemporary build."
          : "Design signals are mixed — the site appears functional but may lack a distinctive brand identity.",
        recommendation:
          "A modern homepage should make an immediate impact: strong hero image or video, bold typography, clear brand colours, and smooth interactions. If the last redesign was more than 4 years ago, a refresh is likely overdue.",
      },
      {
        name: "Photography Quality",
        score: c2,
        max: 25,
        finding: hasTeamPhotos
          ? "Team or practice imagery appears to be present, which is a positive signal."
          : "It was not possible to confirm whether real practice photography is in use without a visual review.",
        recommendation:
          "Authentic practice photography — real team headshots, actual treatment rooms, genuine patient journey images (with consent) — creates a far stronger connection than stock imagery. Stock photos are often recognisable and create a disconnect between the website and the in-practice experience. A professional photography session typically pays for itself within one new patient.",
      },
      {
        name: "Whitespace & Readability",
        score: c3,
        max: 15,
        finding: data.hasViewportMeta
          ? "Viewport meta tag is present. Framework signals suggest reasonable spacing and readability."
          : "Viewport meta tag missing — a basic mobile readability requirement.",
        recommendation:
          "Ensure body text is 16px or larger, paragraphs are short (3-5 sentences), and sections have clear visual breaks. Dense walls of text on treatment pages drive patients away.",
      },
    ],
  };
}

function buildDesignDescription(data: CrawlData, s: Record<string, number>): string {
  return [
    `Design Quality assesses first impressions — the visual experience that determines whether a patient stays or leaves within the first few seconds. The site scored ${s.total}/100.`,
    s.c1 < 36
      ? "The design shows dated signals that are likely to undermine confidence at first glance."
      : "The design appears broadly modern, though a full visual review is recommended before the sales conversation.",
    "Note: photography scoring is based on HTML signals only — a visual review of the site is recommended to fully assess photo quality and authenticity.",
  ].join(" ");
}

function buildDesignTalkingPoints(hasDatedSignals: boolean, c1: number): string {
  if (c1 < 36) return "Dated design — patients browsing 3-4 competitor sites will notice this immediately. A redesign conversation is warranted.";
  return "Design is functional; talk about photography and brand consistency as refinement opportunities.";
}

function scoreTechnical(data: CrawlData): CategoryResult {
  // D1: Mobile Responsiveness (20 pts)
  let d1 = 0;
  if (data.hasViewportMeta) d1 += 8;
  if (data.html.includes("hamburger") || data.html.includes("mobile-menu") || data.html.includes("nav-toggle")) d1 += 4;
  if (data.hasWebpImages) d1 += 3;
  if (data.hasLazyLoading) d1 += 3;
  if (!data.isHttps) d1 = Math.max(0, d1 - 4);
  d1 = clamp(d1, 0, 20);

  // D2: Page Speed (20 pts) — estimated from signals
  let d2 = 12;
  if (data.hasLazyLoading && data.hasWebpImages) d2 = 16;
  if (!data.hasLazyLoading && !data.hasWebpImages) d2 = 8;

  // D3: Technical SEO (20 pts)
  let d3 = 0;
  if (data.title) d3 += 4;
  if (data.metaDescription) d3 += 4;
  if (data.h1s.length === 1) d3 += 4;
  if (data.hasSitemap) d3 += 4;
  if (data.hasRobots) d3 += 4;

  // D4: Local SEO (20 pts)
  let d4 = 0;
  if (data.hasNap) d4 += 5;
  if (data.hasLocalKeywords) d4 += 5;
  if (data.hasLocalSchema) d4 += 5;
  const hasLocationInTitle = data.locationMentioned.length > 0;
  if (hasLocationInTitle) d4 += 5;

  // D5: Content SEO (20 pts)
  let d5 = 0;
  if (data.hasBlogOrResources) d5 += 8;
  if (data.hasLocalKeywords) d5 += 6;
  if (data.hasTreatmentPages && data.treatmentPages.length >= 3) d5 += 6;

  const total = d1 + d2 + d3 + d4 + d5;

  return {
    score: total,
    description: buildTechnicalDescription(data, { d1, d2, d3, d4, d5, total }),
    talking_points: buildTechnicalTalkingPoints(data, { d3, d4, d5 }),
    subcategories: [
      {
        name: "Mobile Responsiveness",
        score: d1,
        max: 20,
        finding: data.hasViewportMeta
          ? `Viewport meta tag present. ${data.hasLazyLoading ? "Lazy loading detected." : "No lazy loading detected."}`
          : "Viewport meta tag missing — a basic mobile responsiveness requirement.",
        recommendation:
          "Over 70% of orthodontic website traffic is on mobile. Run a Google Mobile-Friendly Test to confirm the layout renders correctly at 375px width. Ensure tap targets are at least 44x44px and forms work without zooming.",
      },
      {
        name: "Page Speed & Performance",
        score: d2,
        max: 20,
        finding: `Image optimisation: ${data.hasWebpImages ? "WebP images detected" : "WebP images not detected"}. Lazy loading: ${data.hasLazyLoading ? "present" : "not detected"}. Note: a full Lighthouse audit is recommended for accurate performance scores.`,
        recommendation:
          "Run PageSpeed Insights on the homepage. The biggest wins are usually: compress images to WebP, enable lazy loading, remove render-blocking JavaScript, and use a CDN. Aim for a desktop Lighthouse score of 80+.",
      },
      {
        name: "Technical SEO",
        score: d3,
        max: 20,
        finding: [
          data.title ? `Title tag: "${data.title.slice(0, 60)}${data.title.length > 60 ? "…" : ""}"` : "No title tag found.",
          data.metaDescription ? "Meta description: present." : "Meta description: missing.",
          `H1 tags: ${data.h1s.length} found${data.h1s.length > 0 ? ` ("${data.h1s[0]?.slice(0, 50)}")` : ""}.`,
          data.hasSitemap ? "Sitemap: found." : "Sitemap: not found.",
          data.hasRobots ? "robots.txt: found." : "robots.txt: not found.",
        ].join(" "),
        recommendation:
          "Each key page needs a unique, descriptive title (60 chars) and meta description (155 chars). Every page should have exactly one H1. Submit a sitemap to Google Search Console.",
      },
      {
        name: "Local SEO",
        score: d4,
        max: 20,
        finding: [
          data.hasNap ? "NAP (name, address, phone) appears present." : "NAP consistency could not be confirmed.",
          data.hasLocalSchema ? "LocalBusiness schema detected." : "No LocalBusiness schema detected.",
          data.locationMentioned ? `Location keyword detected: "${data.locationMentioned}".` : "Location keywords not found in title/H1.",
        ].join(" "),
        recommendation:
          "Add LocalBusiness JSON-LD schema with full address, phone, opening hours, and geo coordinates. Include the suburb and city name in homepage title tags, H1s, and treatment page headings (e.g. 'Invisalign in Norwood').",
      },
      {
        name: "Content SEO",
        score: d5,
        max: 20,
        finding: data.hasBlogOrResources
          ? "Blog or resources section detected — good foundation for content SEO."
          : "No blog or resources section found. The site has limited content for search engine indexing.",
        recommendation:
          "Create a blog targeting patient questions ('How long does Invisalign take?', 'Braces vs aligners for adults'). 10-15 targeted blog posts can significantly increase organic search traffic within 6 months.",
      },
    ],
  };
}

function buildTechnicalDescription(data: CrawlData, s: Record<string, number>): string {
  return [
    `Technical & SEO assesses how well the site is built and optimised for search engine visibility. The site scored ${s.total}/100.`,
    s.d3 < 10 ? "Basic technical SEO elements (title tags, meta descriptions, sitemap) are missing or incomplete." : "",
    s.d4 < 10 ? "Local SEO signals are weak — the practice is likely underperforming in location-based searches." : "",
    !data.hasBlogOrResources ? "The absence of blog or educational content limits long-term organic search growth." : "",
  ].filter(Boolean).join(" ");
}

function buildTechnicalTalkingPoints(data: CrawlData, s: Record<string, number>): string {
  const points: string[] = [];
  if (!data.hasLocalSchema) points.push("No LocalBusiness schema — Google doesn't have structured data to confirm the practice's location and services.");
  if (!data.hasBlogOrResources) points.push("No blog — competitors publishing patient-focused content will overtake them in search rankings within 12 months.");
  if (s.d3 < 12) points.push("Meta tags incomplete — a quick win that most practices can implement in a day.");
  return points.length ? points.join("\n") : "Technical foundations are largely in place; conversation should focus on local SEO and content strategy.";
}

function scoreAI(data: CrawlData): CategoryResult {
  // E1: Question-Based Content (35 pts)
  let e1 = 0;
  if (data.hasFaqPage) e1 += 15;
  if (data.hasBlogOrResources) e1 += 10;
  const hasPatientAnswers =
    data.text.includes("how long") ||
    data.text.includes("how much") ||
    data.text.includes("does it hurt") ||
    data.text.includes("am i a candidate");
  if (hasPatientAnswers) e1 += 10;
  e1 = clamp(e1, 0, 35);

  // E2: Entity Clarity (30 pts) — note: AI citation check is directional only
  let e2 = 15; // Default mid-range — actual Perplexity check not run in this version
  const hasEntityInfo =
    data.title.length > 10 &&
    data.text.includes("orthodontist") &&
    data.locationMentioned.length > 0;
  if (hasEntityInfo) e2 = 20;
  if (data.hasLocalSchema && hasEntityInfo) e2 = 25;

  // E3: Topical Depth (35 pts)
  let e3 = 0;
  if (data.pageCount >= 20) e3 = 28;
  else if (data.pageCount >= 10) e3 = 18;
  else e3 = 8;
  if (data.hasBlogOrResources) e3 = clamp(e3 + 7, 0, 35);

  const total = e1 + e2 + e3;

  return {
    score: total,
    description: buildAIDescription(data, { e1, e2, e3, total }),
    talking_points: buildAITalkingPoints(data, { e1, e2 }),
    subcategories: [
      {
        name: "Question-Based Content",
        score: e1,
        max: 35,
        finding: [
          data.hasFaqPage ? "FAQ page or section found." : "No FAQ page found.",
          data.hasBlogOrResources ? "Blog or resource content present." : "No blog or educational content.",
          hasPatientAnswers ? "Some patient questions answered within page content." : "Patient questions not directly answered on key pages.",
        ].join(" "),
        recommendation:
          "AI search tools (ChatGPT, Perplexity, Google AI Overviews) cite sites that directly answer patient questions. Create FAQ sections on every treatment page answering: how long, how much, does it hurt, who is it for, and what's the process.",
      },
      {
        name: "Entity Clarity",
        score: e2,
        max: 30,
        finding: `Practice name, location, and service information ${hasEntityInfo ? "appear clearly stated" : "are not consistently surfaced"} in the site content. Note: AI citation data is a directional snapshot based on HTML analysis — a live Perplexity check is recommended for a full picture.`,
        recommendation:
          "AI tools need to quickly extract: practice name, specialist name, location, and core services. Ensure this information is clearly stated in natural language on the homepage and about page — not just in schema markup.",
      },
      {
        name: "Topical Depth",
        score: e3,
        max: 35,
        finding: `Approximately ${data.pageCount} pages discovered during the crawl. ${
          data.hasBlogOrResources
            ? "Blog or resource content adds to topical authority."
            : "No blog or educational resource section detected."
        }`,
        recommendation:
          "AI tools favour sources with genuine depth. A site with 5 pages will not be cited as an authority. Building 20+ pages of quality, specific orthodontic content — especially treatment guides, FAQs, and local resources — positions the practice as an expert source.",
      },
    ],
  };
}

function buildAIDescription(data: CrawlData, s: Record<string, number>): string {
  return [
    `AI Search Readiness measures how likely this site is to be cited by AI tools like ChatGPT, Perplexity, and Google AI Overviews. The site scored ${s.total}/100.`,
    "Most orthodontic practices have not yet optimised for AI search — this is an emerging and significant opportunity.",
    s.e1 < 16 ? "The absence of FAQ and question-based content means AI tools have little to cite when patients ask about this practice's treatments." : "",
    "Note: AI citation scores in this report are based on website content analysis. A live AI citation check (using Perplexity or similar) is recommended as a complement — treat this as a directional snapshot rather than a definitive AI visibility audit.",
  ].filter(Boolean).join(" ");
}

function buildAITalkingPoints(data: CrawlData, s: Record<string, number>): string {
  return [
    "AI search is where the next wave of patients will come from — most practices haven't even started thinking about this.",
    !data.hasFaqPage ? "No FAQ content means nothing to cite when a patient asks ChatGPT about orthodontists in this area." : "",
    !data.hasBlogOrResources ? "No blog means no topical authority in AI tools' knowledge base." : "",
    "Important: AI citation data in this report is indicative. For a definitive picture, run a live Perplexity check on the call.",
  ].filter(Boolean).join("\n");
}

export function scoreAudit(data: CrawlData): AuditResult {
  const content = scoreContent(data);
  const ux = scoreUX(data);
  const design = scoreDesign(data);
  const technical = scoreTechnical(data);
  const ai = scoreAI(data);

  const overall = Math.round(
    content.score * 0.30 +
    ux.score * 0.25 +
    design.score * 0.20 +
    technical.score * 0.15 +
    ai.score * 0.10
  );

  const allOpportunities: { label: string; impact: number }[] = [];

  if (!data.hasBookingForm) allOpportunities.push({ label: "Add an online booking or appointment request form — the single highest-impact conversion change for most orthodontic sites.", impact: 10 });
  if (!data.hasPricingPage) allOpportunities.push({ label: "Create a dedicated pricing and finance page explaining payment options, what's included, and how to get a quote.", impact: 9 });
  if (!data.hasWhyChooseUs) allOpportunities.push({ label: "Add a compelling 'Why Choose Us' section to the homepage with 4+ specific, credible differentiators.", impact: 9 });
  if (!data.hasBlogOrResources) allOpportunities.push({ label: "Launch a patient-focused blog targeting common questions — builds SEO, content depth, and AI search visibility simultaneously.", impact: 8 });
  if (!data.hasLocalSchema) allOpportunities.push({ label: "Implement LocalBusiness JSON-LD schema with full address, phone, hours, and geo coordinates.", impact: 7 });
  if (!data.hasGallery) allOpportunities.push({ label: "Build a before/after gallery with 10+ real patient cases to build social proof at the critical decision stage.", impact: 7 });
  if (!data.hasTreatmentPages) allOpportunities.push({ label: "Create dedicated pages for each treatment type (Invisalign, braces, teen treatment) with full patient-facing copy.", impact: 7 });
  if (!data.hasFaqPage) allOpportunities.push({ label: "Add FAQ sections to treatment pages answering: cost, duration, candidacy, and process — critical for AI search visibility.", impact: 6 });

  allOpportunities.sort((a, b) => b.impact - a.impact);
  const top_opportunities = allOpportunities.slice(0, 5).map((o) => o.label);

  const practiceName = data.title
    .replace(/\|.*$/, "")
    .replace(/-.*$/, "")
    .replace(/orthodontist.*$/i, "")
    .trim() || new URL(data.url).hostname.replace("www.", "");

  const overallVerdict =
    overall >= 70
      ? "This site is performing well overall but has targeted areas for improvement."
      : overall >= 50
      ? "The site has a functional foundation but clear weaknesses across multiple areas that are holding back new patient acquisition."
      : "Significant weaknesses across multiple categories are likely costing this practice a meaningful number of new patients each month.";

  const summary = `${overallVerdict} The highest-impact changes are: ${top_opportunities.slice(0, 2).join("; and ")}.`;

  return {
    practice_name: practiceName,
    url: data.url,
    date: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }),
    overall_score: overall,
    scores: {
      content: content.score,
      ux: ux.score,
      design: design.score,
      technical: technical.score,
      ai: ai.score,
    },
    summary,
    top_opportunities,
    site_structure: {
      platform: data.platform,
      total_pages: data.pageCount,
      has_booking: data.hasBookingForm,
      booking_url: data.bookingUrl,
      social_links: data.socialLinks,
      missing_pages: data.hasMissingPages,
    },
    categories: { content, ux, design, technical, ai },
    screenshots: { desktop: null, mobile: null },
    pagespeed: null,
    ai_citations: null,
    lighthouse_note:
      "Page speed scores in this report are estimated from HTML signals. Run with GOOGLE_PAGESPEED_API_KEY set to get real Lighthouse data.",
    ai_citation_note:
      "AI citation check requires OPENAI_API_KEY to be set. This report uses content-based scoring only.",
  };
}
