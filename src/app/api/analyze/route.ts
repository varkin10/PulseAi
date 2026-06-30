import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { extractThemes, generatePriorityScore } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const { data: feedbackItems } = await supabaseAdmin
      .from("feedback")
      .select("*")
      .eq("user_id", userId);

    if (!feedbackItems || feedbackItems.length === 0) {
      return NextResponse.json({ error: "No feedback to analyze" }, { status: 400 });
    }

    const texts = feedbackItems.map((f) => f.feedback_text);
    const { themes } = await extractThemes(texts.slice(0, 100));

    await supabaseAdmin.from("themes").delete().eq("user_id", userId);
    const themeInserts = themes.map((t) => ({
      user_id: userId,
      name: t.name,
      mention_count: t.mentions,
      sentiment: t.sentiment,
      summary: t.summary,
      trend: t.mentions > 10 ? "up" : "stable",
    }));
    await supabaseAdmin.from("themes").insert(themeInserts);

    for (const theme of themes) {
      const derivedSentiment =
        theme.sentiment === "positive" ? "positive" :
        theme.sentiment === "negative" ? "negative" :
        theme.sentiment === "mixed" ? "neutral" : "neutral";

      for (const idx of theme.feedback_indices) {
        const item = feedbackItems[idx];
        if (item) {
          await supabaseAdmin
            .from("feedback")
            .update({ theme: theme.name, sentiment: derivedSentiment })
            .eq("id", item.id);
        }
      }
    }

    await supabaseAdmin.from("priority_items").delete().eq("user_id", userId);
    const priorityInserts = [];
    for (const theme of themes) {
      try {
        const themeItems = theme.feedback_indices.map((i) => feedbackItems[i]).filter(Boolean);
        const arrAffected = themeItems.reduce((sum, f) => sum + (f.revenue_impact || 0), 0);
        const churnSignals = theme.sentiment === "negative" ? theme.mentions : Math.floor(theme.mentions * 0.3);
        const tierCounts = themeItems.reduce((acc, f) => {
          const tier = f.customer_segment || "SMB";
          acc[tier] = (acc[tier] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const topTier = Object.entries(tierCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Mixed";

        const result = await generatePriorityScore({
          theme: theme.name,
          mention_count: theme.mentions,
          arr_affected: arrAffected || theme.mentions * 5000,
          customer_tier: topTier,
          sentiment: theme.sentiment,
          churn_signals: churnSignals,
        });

        priorityInserts.push({
          user_id: userId,
          title: "Improve " + theme.name.toLowerCase(),
          score: result.score,
          level: result.level,
          reasoning: result.reasoning,
          mention_count: theme.mentions,
          arr_affected: arrAffected || null,
          theme: theme.name,
        });

        await new Promise((resolve) => setTimeout(resolve, 4000));
      } catch (err) {
        console.error("Priority scoring failed for theme:", theme.name, err);
      }
    }

    if (priorityInserts.length > 0) {
      await supabaseAdmin.from("priority_items").insert(priorityInserts);
    }

    const criticalItems = priorityInserts.filter((p) => p.level === "critical");
    if (criticalItems.length > 0) {
      await supabaseAdmin.from("alerts").delete().eq("user_id", userId);
      await supabaseAdmin.from("alerts").insert(
        criticalItems.map((item) => ({
          user_id: userId,
          type: "priority_spike",
          title: "Critical issue detected: " + item.theme,
          message: item.reasoning || (item.mention_count + " mentions. Immediate action recommended."),
          severity: "critical",
          read: false,
        }))
      );
    }

    return NextResponse.json({
      themes: themes.length,
      priorities: priorityInserts.length,
      critical: criticalItems.length,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json({ error: "Analysis failed", detail: String(err) }, { status: 500 });
  }
}
