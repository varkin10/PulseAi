"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase, type PriorityItem } from "@/lib/supabase";
import { Card, Badge, Button, priorityVariant } from "@/components/ui";
import { Sparkles } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function PrioritizationPage() {
  const { user } = useUser();
  const [items, setItems] = useState<PriorityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("priority_items").select("*").eq("user_id", user.id).order("score", { ascending: false }).then(({ data }) => {
      setItems(data || []);
      setLoading(false);
    });
  }, [user]);

  const scoreColor = (level: string) => {
    if (level === "critical") return "bg-red-50 text-red-700";
    if (level === "high") return "bg-amber-50 text-amber-700";
    return "bg-blue-50 text-blue-700";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">Prioritization board</h1>
          <Button variant="primary"><Sparkles size={14} />Recalculate scores</Button>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-sm text-blue-800 mb-6 flex gap-2">
            <Sparkles size={16} className="text-blue-500 shrink-0 mt-0.5" />
            AI scoring weights: ARR impact 35% · Mention count 25% · Customer tier 20% · Churn risk 20%
          </div>
          <Card className="p-0">
            {loading ? (
              <div className="py-12 text-center text-sm text-gray-400">Loading...</div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center text-sm texray-400">No priority items yet. Run AI analysis from the Feedback inbox.</div>
            ) : (
              items.map((item, i) => (
                <div key={item.id} className={`flex items-center gap-4 px-5 py-4 ${i < items.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-sm font-semibold shrink-0 ${scoreColor(item.level)}`}>
                    {item.score}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.reasoning}</p>
                  </div>
                  {item.arr_affected && (
                    <span className="text-xs text-gray-400">${(item.arr_affected / 1000).toFixed(0)}K ARR</span>
                  )}
                  <Badge variant={priorityVariant(item.level)}>{item.level}</Badge>
                </div>
              ))
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
