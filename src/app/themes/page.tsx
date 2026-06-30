"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase, type Theme } from "@/lib/supabase";
import { Card, Badge, Button, sentimentVariant } from "@/components/ui";
import { Sparkles, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function ThemesPage() {
  const { user } = useUser();
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("themes").select("*").eq("user_id", user.id).order("mention_count", { ascending: false }).then(({ data }) => {
      setThemes(data || []);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">Theme explorer</h1>
          <Button variant="primary"><Sparkles size={14} />Re-cluster themes</Button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">Loading themes...</div>
          ) : themes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-gray-400 mb-2">No themes yet.</p>
              <p className="text-xs text-gray-400">Import feedback and run AI analysis to extract themes automatically.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {themes.map((t) => (
                <Card key={t.id} className="cursor-pointer hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">{t.name}</h3>
                    <Badge variant={sentimentVariant(t.sentiment)}>{t.sentiment || "—"}</Badge>
                  </div>
                  <div className="text-3xl font-semibold text-gray-900 mb-1">{t.mention_count}</div>
                  <div className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    mentions
                    {t.trend === "up" && <span className="text-red-500 flex items-center gap-0.5"><TrendingUp size={11} />trending up</span>}
                  </div>
                  {t.summary && <p className="text-xs text-gray-500 leading-relaxed">{t.summary}</p>}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
