import { NextRequest, NextResponse } from "next/server";
import { generateRoadmap, AIHighDemandError } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { themes } = await req.json();
    if (!themes || themes.length === 0) {
      return NextResponse.json({ error: "No themes provided" }, { status: 400 });
    }
    const roadmap = await generateRoadmap(themes);
    return NextResponse.json({ roadmap });
  } catch (err) {
    console.error("Roadmap error:", err);
    if (err instanceof AIHighDemandError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Roadmap generation failed" }, { status: 500 });
  }
}
