/**
 * Ranks subcategory opportunities by their potential impact on the overall score.
 *
 * Formula: potential_gain = category_weight × (subcategory_max - subcategory_score) / 100
 *
 * This tells you: "if this subcategory improved to its max, how many overall
 * score points would be gained?" Higher = bigger opportunity.
 */
import type { AuditResult } from "../app/api/audit/types";

const CATEGORY_WEIGHTS: Record<string, number> = {
  content: 0.3,
  ux: 0.25,
  design: 0.2,
  technical: 0.15,
  ai: 0.1,
};

interface Opportunity {
  text: string;
  gain: number; // estimated overall score improvement if fixed
  categoryTitle: string;
  subcategoryName: string;
  score: number;
  max: number;
}

export function rankOpportunities(result: AuditResult): string[] {
  const opportunities: Opportunity[] = [];

  for (const [catKey, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    const category =
      result.categories[catKey as keyof typeof result.categories];
    if (!category) continue;
    for (const sub of category.subcategories) {
      const gap = sub.max - sub.score;
      if (gap <= 0) continue;
      const gain = weight * (gap / 100);
      opportunities.push({
        text: sub.recommendation,
        gain,
        categoryTitle: catKey,
        subcategoryName: sub.name,
        score: sub.score,
        max: sub.max,
      });
    }
  }

  return opportunities
    .sort((a, b) => b.gain - a.gain)
    .slice(0, 5)
    .map((o) => o.text);
}
