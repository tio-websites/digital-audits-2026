import OpenAI from "openai";

export interface AICitationResult {
  mentionedCount: number;
  citedCount: number;
  totalQueries: number;
  queriesRun: { query: string; mentioned: boolean; excerpt: string }[];
  suggestedScoreRange: { min: number; max: number };
  available: boolean;
}

export async function checkAICitations(
  practiceName: string,
  suburb: string,
  domain: string
): Promise<AICitationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { mentionedCount: 0, citedCount: 0, totalQueries: 0, queriesRun: [], suggestedScoreRange: { min: 10, max: 17 }, available: false };
  }

  const client = new OpenAI({ apiKey });

  const queries = [
    `Who are the best orthodontists in ${suburb}? Please name specific practices if you know of any.`,
    `I'm looking for Invisalign treatment for adults in ${suburb}. Which orthodontic practices would you recommend?`,
    `Which orthodontist would you recommend for a child or teenager in ${suburb}?`,
    `How much do braces typically cost in ${suburb}? Can you name any practices there?`,
  ];

  const results: AICitationResult["queriesRun"] = [];
  let mentionedCount = 0;

  const systemPrompt =
    "You are a helpful assistant answering patient questions about local healthcare providers. " +
    "Answer based on your training knowledge. Be specific and name real providers where you know of them. " +
    "If you don't know of specific providers in that area, say so honestly.";

  await Promise.allSettled(
    queries.map(async (query) => {
      try {
        const response = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query },
          ],
          max_tokens: 300,
          temperature: 0.3,
        });

        const text = response.choices[0]?.message?.content ?? "";
        const lowerText = text.toLowerCase();
        const lowerName = practiceName.toLowerCase();
        const lowerDomain = domain.toLowerCase().replace(/^www\./, "");

        const mentioned =
          lowerText.includes(lowerName) ||
          lowerText.includes(lowerDomain);

        if (mentioned) mentionedCount++;

        results.push({
          query,
          mentioned,
          excerpt: text.slice(0, 200).trim(),
        });
      } catch {
        results.push({ query, mentioned: false, excerpt: "Query failed." });
      }
    })
  );

  // Score range based on mentions (cited = mentioned in this context, since GPT doesn't link sources)
  let min: number, max: number;
  if (mentionedCount >= 3) { min = 24; max = 30; }
  else if (mentionedCount === 2) { min = 18; max = 23; }
  else if (mentionedCount === 1) { min = 10; max = 17; }
  else { min = 0; max = 9; }

  return {
    mentionedCount,
    citedCount: mentionedCount, // GPT doesn't cite URLs; treat mention as citation signal
    totalQueries: queries.length,
    queriesRun: results,
    suggestedScoreRange: { min, max },
    available: true,
  };
}
