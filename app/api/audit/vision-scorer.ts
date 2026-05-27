/**
 * Claude Vision scoring for C2 – Photography Quality (25 pts).
 *
 * Replaces the hardcoded default of 12/25. Requires a desktop screenshot
 * (base64 PNG) and ANTHROPIC_API_KEY to be set.
 *
 * Gracefully returns null if either is missing.
 */
import Anthropic from "@anthropic-ai/sdk";

const RUBRIC = `You are an expert in orthodontic practice website quality assessment.

Analyse this screenshot of an orthodontic practice website homepage and score the photography quality.

Score the photography on a scale of 0–25 using these guidelines:

- **20–25 (Excellent)**: Professional, authentic photography. Genuine team headshots, real patient smiles, treatment room photos. No generic stock imagery. Photos feel personal and trustworthy.
- **13–19 (Good)**: Mix of authentic and stock imagery, or authentic but low-resolution/amateurish. Some real photos but not a complete picture of the practice.
- **7–12 (Average)**: Primarily stock imagery (generic smiling faces, teeth close-ups that could be from any practice). Limited authentic photography.
- **0–6 (Poor)**: No meaningful photography, clipart, very generic or low-quality visuals, or photography that actively undermines trust.

Return ONLY a valid JSON object with exactly these two fields:
{"score": <integer 0-25>, "finding": "<one concise sentence describing what you observed>"}

Do not include any other text, markdown, or explanation.`;

export interface VisionScore {
  score: number;
  finding: string;
}

export async function scorePhotographyWithVision(
  desktopBase64: string | null
): Promise<VisionScore | null> {
  if (!desktopBase64 || !process.env.ANTHROPIC_API_KEY) return null;

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/png",
                data: desktopBase64,
              },
            },
            { type: "text", text: RUBRIC },
          ],
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Extract JSON from response (handle potential markdown wrapping)
    const jsonMatch = text.match(/\{[^}]+\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]) as Partial<VisionScore>;
    if (typeof parsed.score !== "number" || typeof parsed.finding !== "string")
      return null;

    return {
      score: Math.min(25, Math.max(0, Math.round(parsed.score))),
      finding: parsed.finding,
    };
  } catch {
    // Vision scoring is best-effort — fall back to HTML-signal estimate
    return null;
  }
}
