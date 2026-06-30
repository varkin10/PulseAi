"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase, type PriorityItem, type Feedback } from "@/lib/supabase";
import { Card, MetricCard, InsightCard, Button } from "@/components/ui";
import { Download, AlertCircle, TrendingUp, CheckCircle } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function DecisionHubPage() {
  const { user } = useUser();
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("priority_items").select("*").eq("user_id", user.id).order("score", { ascending: false }),
      supabase.from("feedback").select("*").eq("user_id", user.id),
    ]).then(([p, f]) => {
      setPriorities(p.data || []);
      setFeedback(f.data || []);
      setLoading(false);
    });
  }, [user]);

  const revenueAtRisk = feedback.reduce((sum, f) => sum + (f.revenue_impact || 0), 0);
  const criticals = priorities.filter((p) => p.level === "critical");
  const highs = priorities.filter((p) => p.level === "high");
  const negCount = feedback.filter((f) => f.sentiment === "negative").length;
  const healthScore = feedback.length > 0 ? Math.round(((feedback.length - negCount) / feedback.length) * 100) : 0;

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">Decision hub</h1>
          <Button variant="secondary"><Download size={14} />Export report</Button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <MetricCard label="Revenue at risk" value={`$${(revenueAtRisk / 1000).toFixed(0)}K`} delta={`${criticals.length} critical issues`} deltaType={criticals.length > 0 ? "down" : "neutral"} />
            <MetricCard label="Churn risk" value={criticals.length > 0 ? "High" : "Low"} delta={`${criticals.length} accounts flagged`} deltaType={criticals.length > 0 ? "down" : "up"} />
            <MetricCard label="Product health" value={`${healthScore}/100`} delta={healthScore < 60 ? "Needs attention" : "Healthy"} deltaType={healthScore < 60 ? "down" : "up"} />
          </div>
          <Card className="mb-4">
            <h2 className="text-sm font-medium text-gray-900 mb-4">Executive summary</h2>
            {criticals.length > 0 ? criticals.map((p) => (
              <InsightCard key={p.id} variant="danger">
                <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                <div><strong>Critical:</strong> {p.reasoning}</div>
              </InsightCard>
            )) : (
              <InsightCard variant="info">
                <CheckCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>No critical issues detected. Keep monitoring.</div>
              </InsightCard>
            )}
            {highs.slice(0, 2).map((p) => (
              <InsightCard key={p.id} variant="warning">
                <TrendingUp size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <div><strong>Emerging risk:</strong> {p.reasoning}</div>
              </InsightCard>
            ))}
          </Card>
          <Card>
            <h2 className="text-sm font-medium text-gray-900 mb-4">Recommended actions for leadership</h2>
            {priorities.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2 last:mb-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                  i === 0 ? "bg-red-100 text-red-700" : i === 1 ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                }`}>{i + 1}</div>
                <p className="flex-1 text-sm text-gray-800">{p.title}</p>
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  i === 0 ? "bg-red-50 text-red-700" : i <= 1 ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                }`}>{i === 0 ? "This week" : i <= 1 ? "This week" : "This month"}</span>
              </div>
            ))}
            {priorities.length === 0 && <p className="text-sm text-gray-400">Run AI analysis to generate recommended actions.</p>}
          </Card>
        </div>
      </main>
    </div>
  );
}
