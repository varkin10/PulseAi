import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function ask(prompt: string): Promise<string> {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function extractThemes(feedbackItems: string[]): Promise<{
  themes: Array<{
    name: string;
    mentions: number;
    sentiment: string;
    summary: string;
    feedback_indices: number[];
  }>;
}> {
  const feedbackText = feedbackItems.map((f, i) => `[${i}] ${f}`).join("\n");
  const text = await ask(`You are a product analytics AI. Analyze these customer feedback items and cluster them into themes.

Feedback items:
${feedbackText}

Return ONLY valid JSON in this exact format with no markdown:
{
  "themes": [
    {
      "name": "Theme name (2-4 words)",
      "mentions": <count>,
      "sentiment": "positive" or "neutral" or "negative" or "mixed",
      "summary": "One sentence describing the key pattern",
      "feedback_indices": [<array of indices>]
    }
  ]
}

Rules: Create 3-8 themes. Every feedback item must belong to exactly one theme.`);

  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

export async function analyzeSentiment(feedbackText: string): Promise<{
  sentiment: "positive" | "neutral" | "negative";
}> {
  const text = await ask(`Classify the sentiment of this customer feedback. Return ONLY JSON with no markdown: {"sentiment": "positive" or "neutral" or "negative"}

Feedback: ${feedbackText}`);
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export async function generatePriorityScore(item: {
  theme: string;
  mention_count: number;
  arr_affected: number;
  customer_tier: string;
  sentiment: string;
  churn_signals: number;
}): Promise<{ score: number; level: string; reasoning: string }> {
  const text = await ask(`You are a product prioritization engine. Score this issue from 0-100.

Issue: ${item.theme}
Mention count: ${item.mention_count}
ARR affected: $${item.arr_affected}
Customer tier: ${item.customer_tier}
Sentiment: ${item.sentiment}
Churn signals: ${item.churn_signals}

Return ONLY JSON with no markdown: {"score": <0-100>, "level": "critical" or "high" or "medium" or "low", "reasoning": "<one sentence>"}`);
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

export async function copilotChat(
  question: string,
  context: {
    totalFeedback: number;
    themes: Array<{ name: string; mentions: number; sentiment: string }>;
    topIssues: string[];
    revenueAtRisk: number;
  }
): Promise<string> {
  const text = await ask(`You are PulseAI's copilot — a sharp, direct product intelligence assistant. Be concise and actionable.

Current data:
- Total feedback: ${context.totalFeedback}
- Themes: ${context.themes.map((t) => `${t.name} (${t.mention_count} mentions, ${t.sentiment})`).join(", ")}
- Top issues: ${context.topIssues.join(", ")}
- Revenue at risk: $${context.revenueAtRisk}

Question: ${question}`);
  return text;
}

export async function generateRoadmap(themes: Array<{
  name: string;
  mentions: number;
  sentiment: string;
  arr_affected?: number;
}>): Promise<Array<{
  title: string;
  impact: string;
  confidence: number;
  effort: string;
  quarter: string;
  priority_level: string;
}>> {
  const text = await ask(`Based on these customer feedback themes, generate a prioritized roadmap.

Themes:
${themes.map((t) => `- ${t.name}: ${t.mention_count} mentions, sentiment: ${t.sentiment}`).join("\n")}

Return ONLY a valid JSON array with no markdown:
[
  {
    "title": "Actionable roadmap item",
    "impact": "High" or "Medium" or "Low",
    "confidence": <50-99>,
    "effort": "High" or "Medium" or "Low",
    "quarter": "Q3 2025" or "Q4 2025" or "Q1 2026",
    "priority_level": "P0" or "P1" or "P2" or "P3"
  }
]

Generate 5-7 items.`);
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}
