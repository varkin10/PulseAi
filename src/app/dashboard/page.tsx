"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase, type Feedback, type Theme, type PriorityItem } from "@/lib/supabase";
import { MetricCard, Card, Badge, InsightCard, Button, sentimentVariant, priorityVariant } from "@/components/ui";
import { Sparkles, Upload, TrendingUp, AlertCircle, Lightbulb, MessageSquare, DollarSign, Tags } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [priorities, setPriorities] = useState<PriorityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;
    Promise.all([
      supabase.from("feedback").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("themes").select("*").eq("user_id", user.id).order("mention_count", { ascending: false }),
      supabase.from("priority_items").select("*").eq("user_id", user.id).order("score", { ascending: false }).limit(5),
    ]).then(([f, t, p]) => {
      setFeedback(f.data || []);
      setThemes(t.data || []);
      setPriorities(p.data || []);
      setLoading(false);
    });
  }, [user, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-sm text-gray-400">Loading...</div>
      </div>
    );
  }

  const totalFeedback = feedback.length;
  const negativeCount = feedback.filter((f) => f.sentiment === "negative").length;
  const sentimentScore = totalFeedback > 0 ? Math.round(((totalFeedback - negativeCount) / totalFeedback) * 100) : 0;
  const revenueAtRisk = feedback.reduce((sum, f) => sum + (f.revenue_impact || 0), 0);
  const criticalCount = priorities.filter((p) => p.level === "critical").length;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const firstName = user?.firstName || "there";

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <div>
          <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">{greeting}, {firstName}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Here is what is happening with your customers today</p>
        </div>
        <div className="flex gap-2">
          <Link href="/inbox">
            <Button variant="secondary"><Upload size={14} />Import feedback</Button>
          </Link>
          <Link href="/inbox">
            <Button variant="primary"><Sparkles size={14} />Run analysis</Button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        {totalFeedback === 0 ? (
          <div className="text-center py-24">
            <div className="w-12 h-12 bg-brand-50 dark:bg-brand-900 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Upload size={20} className="text-brand-600 dark:text-brand-300" />
            </div>
            <h2 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">Start by importing feedback</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Upload a CSV, paste text, or add items manually. PulseAI will extract themes and prioritize issues automatically.</p>
            <Link href="/inbox">
              <Button variant="primary"><Upload size={14} />Import feedback</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-3 mb-6">
              <MetricCard icon={<MessageSquare size={14} />} label="Total feedback" value={totalFeedback.toLocaleString()} delta={`${themes.length} active themes`} deltaType="neutral" />
              <MetricCard icon={<TrendingUp size={14} />} label="Sentiment score" value={`${sentimentScore}/100`} delta={sentimentScore < 60 ? "Needs attention" : "Healthy"} deltaType={sentimentScore < 60 ? "down" : "up"} />
              <MetricCard icon={<DollarSign size={14} />} label="Revenue at risk" value={`$${(revenueAtRisk / 1000).toFixed(0)}K`} delta={`${criticalCount} critical issues`} deltaType={criticalCount > 0 ? "down" : "neutral"} />
              <MetricCard icon={<Tags size={14} />} label="Active themes" value={themes.length.toString()} delta={`${priorities.filter(p => p.level === "critical" || p.level === "high").length} high priority`} deltaType="neutral" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card>
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-between">
                  AI insights
                  <Badge variant="blue">{criticalCount > 0 ? `${criticalCount} critical` : "Up to date"}</Badge>
                </h2>
                {priorities.slice(0, 3).map((p) => (
                  <InsightCard key={p.id} variant={p.level === "critical" ? "danger" : p.level === "high" ? "warning" : "info"}>
                    <div className="flex gap-2">
                      {p.level === "critical" ? <AlertCircle size={16} className="text-red-600 mt-0.5 shrink-0" /> : p.level === "high" ? <TrendingUp size={16} className="text-amber-600 mt-0.5 shrink-0" /> : <Lightbulb size={16} className="text-brand-600 mt-0.5 shrink-0" />}
                      <p className="text-sm text-gray-800 dark:text-gray-200">{p.reasoning || p.title}</p>
                    </div>
                  </InsightCard>
                ))}
                {priorities.length === 0 && <p className="text-sm text-gray-400">No insights yet. Run analysis after importing feedback.</p>}
              </Card>

              <Card>
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Top themes by mentions</h2>
                {themes.slice(0, 5).map((t) => (
                  <div key={t.id} className="flex items-center gap-3 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                    <span className="flex-1 text-sm text-gray-800 dark:text-gray-200">{t.name}</span>
                    <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-1.5 bg-brand-500 rounded-full" style={{ width: `${Math.min(100, (t.mention_count / (themes[0]?.mention_count || 1)) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{t.mention_count}</span>
                    <Badge variant={sentimentVariant(t.sentiment)}>{t.sentiment || "—"}</Badge>
                  </div>
                ))}
                {themes.length === 0 && <p className="text-sm text-gray-400">No themes extracted yet.</p>}
              </Card>
            </div>

            <Card>
              <h2 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Top priority items</h2>
              {priorities.map((p) => (
                <div key={p.id} className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 ${
                    p.level === "critical" ? "bg-red-50 text-red-700" : p.level === "high" ? "bg-amber-50 text-amber-700" : "bg-brand-50 text-brand-700"
                  }`}>{p.score}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{p.reasoning}</p>
                  </div>
                  <Badge variant={priorityVariant(p.level)}>{p.level}</Badge>
                </div>
              ))}
              {priorities.length === 0 && <p className="text-sm text-gray-400">No priority items yet. Run analysis to generate scores.</p>}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
