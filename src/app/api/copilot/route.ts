import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { copilotChat, AIHighDemandError } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { userId, question } = await req.json();
    if (!userId || !question) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const [{ data: feedback }, { data: themes }] = await Promise.all([
      supabaseAdmin.from("feedback").select("id, sentiment, revenue_impact").eq("user_id", userId),
      supabaseAdmin.from("themes").select("name, mention_count, sentiment").eq("user_id", userId).order("mention_count", { ascending: false }),
    ]);

    const { data: priorities } = await supabaseAdmin
      .from("priority_items")
      .select("title, level")
      .eq("user_id", userId)
      .order("score", { ascending: false })
      .limit(5);

    const revenueAtRisk = (feedback || []).reduce((sum, f) => sum + (f.revenue_impact || 0), 0);
    const topIssues = (priorities || []).map((p) => p.title);

    const answer = await copilotChat(question, {
      totalFeedback: feedback?.length || 0,
      themes: (themes || []).map((t: any) => ({ name: t.name, mentions: t.mention_count, sentiment: t.sentiment })),
      topIssues,
      revenueAtRisk,
    });

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Copilot error:", err);
    if (err instanceof AIHighDemandError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Copilot failed" }, { status: 500 });
  }
}
