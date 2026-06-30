"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase, type Alert } from "@/lib/supabase";
import { Card } from "@/components/ui";
import { AlertCircle, TrendingUp, Info } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

export default function AlertsPage() {
  const { user } = useUser();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("alerts").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
      setAlerts(data || []);
      setLoading(false);
    });
  }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from("alerts").update({ read: true }).eq("user_id", user.id);
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const icon = (severity: string) => {
    if (severity === "critical") return <AlertCircle size={16} className="text-red-600 shrink-0" />;
    if (severity === "warning") return <TrendingUp size={16} className="text-amber-600 shrink-0" />;
    return <Info size={16} className="text-blue-600 shrink-0" />;
  };

  const bg = (severity: string) => {
    if (severity === "critical") return "bg-red-50 border-red-100";
    if (severity === "warning") return "bg-amber-50 border-amber-100";
    return "bg-blue-50 border-blue-100";
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">
            Alerts
            {alerts.filter((a) => !a.read).length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{alerts.filter((a) => !a.read).length}</span>
            )}
          </h1>
          <button onClick={markAllRead} className="text-sm text-gray-500 hover:text-gray-900">Mark all read</button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-16 text-sm text-gray-400">Loading alerts...</div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-sm text-gray-400 mb-2">No alerts yet.</p>
              <p className="text-xs text-gray-400">Alerts are generated automatically when AI analysis detects critical issues.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((a) => (
                <div key={a.id} className={`flex items-start gap-3 p-4 rounded-lg border ${bg(a.severity)} ${a.read ? "opacity-60" : ""}`}>
                  {icon(a.severity)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{a.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{a.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{new Date(a.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
