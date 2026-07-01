"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { Card, Button } from "@/components/ui";
import { Sparkles } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

type RoadmapItem = {
  title: string;
  impact: string;
  confidence: number;
  effort: string;
  quarter: string;
  priority_level: string;
};

export default function RoadmapPage() {
  const { user } = useUser();
  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!user) return;
    setLoading(true);
    setError("");
    const { data: themes } = await supabase.from("themes").select("*").eq("user_id", user.id);
    if (!themes || themes.length === 0) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ themes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Roadmap generation failed. Please try again.");
      } else {
        setItems(data.roadmap || []);
        setGenerated(true);
      }
    } catch {
      setError("Roadmap generation failed. Please try again.");
    }
    setLoading(false);
  };

  const levelColor = (level: string) => {
    if (level === "P0") return "bg-red-50 text-red-700";
    if (level === "P1") return "bg-amber-50 text-amber-700";
    return "bg-blue-50 text-blue-700";
  };

  const impactColor = (impact: string) => {
    if (impact === "High") return "text-red-600";
    if (impact === "Medium") return "text-amber-600";
    return "text-gray-500";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">Roadmap recommendations</h1>
          <Button variant="primary" onClick={generate} disabled={loading}>
            <Sparkles size={14} />{loading ? "Generating..." : "Generate roadmap"}
          </Button>
        </div>
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-800 mb-4">{error}</div>
          )}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800 mb-6 flex gap-2">
            <Sparkles size={16} className="text-blue-500 shrink-0 mt-0.5" />
            AI-generated roadmap based on your customer feedback themes.
          </div>
          {!generated && !loading && (
            <div className="text-center py-20">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles size={20} className="text-blue-600" />
              </div>
              <h2 className="text-sm font-medium text-gray-900 mb-2">Generate your AI roadmap</h2>
              <p className="text-xs text-gray-400 mb-6">Requires themes to be extracted first. Run AI analysis from the Feedback inbox.</p>
              <Button variant="primary" onClick={generate}><Sparkles size={14} />Generate roadmap</Button>
            </div>
          )}
          {loading && <div className="text-center py-12 text-sm text-gray-400">Generating roadmap recommendations...</div>}
          {items.length > 0 && (
            <Card className="p-0">
              {items.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 px-5 py-4 ${i < items.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className={`px-2 py-1 rounded text-xs font-semibold shrink-0 ${levelColor(item.priority_level)}`}>{item.priority_level}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      Impact: <span className={impactColor(item.impact)}>{item.impact}</span>
                      {" · "}Effort: {item.effort}
                      {" · "}{item.confidence}% confidence
                    </p>
                  </div>
                  <div className="text-xs border border-gray-200 rounded px-2 py-1 text-gray-500 shrink-0">{item.quarter}</div>
                </div>
            ))}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
