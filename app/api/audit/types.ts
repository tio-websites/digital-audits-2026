export interface SubcategoryScore {
  name: string;
  score: number;
  max: number;
  finding: string;
  recommendation: string;
}

export interface CategoryResult {
  score: number;
  description: string;
  talking_points: string;
  subcategories: SubcategoryScore[];
}

export interface PageSpeedData {
  performanceMobile: number;
  performanceDesktop: number;
  lcp: string;
  cls: string;
  tbt: string;
  seoScore: number;
  available: boolean;
}

export interface AICitationData {
  mentionedCount: number;
  citedCount: number;
  totalQueries: number;
  queriesRun: { query: string; mentioned: boolean; excerpt: string }[];
  suggestedScoreRange: { min: number; max: number };
  available: boolean;
}

export interface AuditResult {
  practice_name: string;
  url: string;
  date: string;
  overall_score: number;
  scores: {
    content: number;
    ux: number;
    design: number;
    technical: number;
    ai: number;
  };
  summary: string;
  top_opportunities: string[];
  site_structure: {
    platform: string;
    total_pages: number;
    has_booking: boolean;
    booking_url: string | null;
    social_links: {
      facebook: string | null;
      instagram: string | null;
      tiktok: string | null;
    };
    missing_pages: string[];
  };
  screenshots: {
    desktop: string | null;
    mobile: string | null;
  };
  pagespeed: PageSpeedData | null;
  ai_citations: AICitationData | null;
  categories: {
    content: CategoryResult;
    ux: CategoryResult;
    design: CategoryResult;
    technical: CategoryResult;
    ai: CategoryResult;
  };
  lighthouse_note: string;
  ai_citation_note: string;
  revenue_impact?: {
    missed_patients: number;
    missed_revenue: number;
    current_cvr_pct: number;
    benchmark_cvr_pct: number;
    monthly_traffic: number;
  };
}

export interface CrawlData {
  url: string;
  html: string;
  text: string;
  title: string;
  metaDescription: string;
  h1s: string[];
  h2s: string[];
  links: string[];
  hasSchema: boolean;
  schemaTypes: string[];
  hasSitemap: boolean;
  hasRobots: boolean;
  hasViewportMeta: boolean;
  socialLinks: { facebook: string | null; instagram: string | null; tiktok: string | null };
  hasBookingForm: boolean;
  bookingUrl: string | null;
  hasGallery: boolean;
  galleryCount: number;
  hasPricingPage: boolean;
  hasFaqPage: boolean;
  hasBlogOrResources: boolean;
  hasDoctorProfile: boolean;
  hasReferralPage: boolean;
  hasTreatmentPages: boolean;
  treatmentPages: string[];
  hasWhyChooseUs: boolean;
  ctaCount: number;
  pageCount: number;
  platform: string;
  navPages: string[];
  hasLocalKeywords: boolean;
  locationMentioned: string;
  hasNap: boolean;
  hasLocalSchema: boolean;
  hasImageAlt: boolean;
  imagesTotal: number;
  imagesWithAlt: number;
  hasLazyLoading: boolean;
  hasWebpImages: boolean;
  isHttps: boolean;
  hasMissingPages: string[];
}
