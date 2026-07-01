"use client";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase, type Feedback } from "@/lib/supabase";
import { Card, Badge, Button, sentimentVariant, priorityVariant } from "@/components/ui";
import { Upload, Plus, Sparkles, Search, Trash2 } from "lucide-react";
import Papa from "papaparse";
import { Sidebar } from "@/components/Sidebar";

export default function InboxPage() {
  const { user } = useUser();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [pasteText, setPasteText] = useState("");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("table");
  const [status, setStatus] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadFeedback = async () => {
    if (!user) return;
    const { data } = await supabase.from("feedback").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    if (data && data.length > 0) {
      setFeedback(data);
    }
    setLoading(false);
  };

  useEffect(() => { 
    if (user) loadFeedback(); 
}, [user]);

  const handleCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const rows = results.data as Record<string, string>[];
        const items = rows.filter((r) => r.feedback_text || r.text || r.feedback || r.comment).map((r) => ({
          user_id: user!.id,
          source: "csv",
          date: r.date || new Date().toISOString(),
          customer_name: r.customer_name || r.name || null,
          customer_segment: r.segment || r.customer_segment || null,
          feedback_text: r.feedback_text || r.text || r.feedback || r.comment || "",
          product_area: r.product_area || r.area || null,
          revenue_impact: parseFloat(r.revenue_impact || "0") || null,
          status: "new",
        }));
        if (items.length > 0) {
          await supabase.from("feedback").insert(items);
          setStatus("Imported " + items.length + " items from CSV");
          loadFeedback();
        }
      },
    });
  };

  const handlePaste = async () => {
    if (!pasteText.trim() || !user) return;
    const lines = pasteText.split("\n").filter((l) => l.trim().length > 10);
    const items = lines.map((line) => ({
      user_id: user.id,
      source: "paste",
      date: new Date().toISOString(),
      feedback_text: line.trim(),
      status: "new",
    }));
    const { data } = await supabase.from("feedback").insert(items).select();
    setPasteText("");
    setFeedback((prev) => [...prev, ...(data || [])]);
    setStatus("Added " + items.length + " feedback items");
    setMode("table");
  };

  const runAnalysis = async () => {
    if (!user || feedback.length === 0) return;
    setAnalyzing(true);
    setStatus("Running AI analysis...");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || "Analysis failed. Check your API key.");
      } else {
        setStatus("Analysis complete — " + data.themes + " themes extracted, " + data.priorities + " items scored");
        loadFeedback();
      }
    } catch {
      setStatus("Analysis failed. Check your API key.");
    }
    setAnalyzing(false);
  };

  const deleteFeedback = async (id: string) => {
    await supabase.from("feedback").delete().eq("id", id);
    setFeedback((prev) => prev.filter((f) => f.id !== id));
  };

  const filtered = feedback.filter((f) =>
    !search || f.feedback_text.toLowerCase().includes(search.toLowerCase()) || (f.customer_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">Feedback inbox</h1>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setMode(mode === "import" ? "table" : "import")}>
              <Plus size={14} />Add feedback
            </Button>
            <Button variant="primary" onClick={runAnalysis} disabled={analyzing || feedback.length === 0}>
              <Sparkles size={14} />{analyzing ? "Analyzing..." : "Run AI analysis"}
            </Button>
          </div>
        </div>
        <div className="p-6">
          {status && (
            <div className="mb-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">{status}</div>
          )}
          {mode === "import" && (
            <Card className="mb-4">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Import feedback</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Upload CSV file</p>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-blue-300 transition-colors" onClick={() => fileRef.current?.click()}>
                    <Upload size={20} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload CSV</p>
                    <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && handleCSV(e.target.files[0])} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Paste feedback (one per line)</p>
                  <textarea value={pasteText} onChange={(e) => setPasteText(e.target.value)} className="w-full h-28 text-sm border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-400" placeholder="Checkout keeps failing on mobile..." />
                  <Button variant="primary" onClick={handlePaste} className="mt-2 w-full justify-center">
                    Add {pasteText.split("\n").filter((l) => l.trim().length > 10).length} items
                  </Button>
                </div>
              </div>
            </Card>
          )}
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white mb-4">
            <Search size={14} className="text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search feedback..." className="flex-1 text-sm outline-none bg-transparent" />
          </div>
          <Card className="p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-medium uppercase tracking-wide">Source</th>
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-medium uppercase tracking-wide">Customer</th>
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-medium uppercase tracking-wide w-80">Feedback</th>
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-medium uppercase tracking-wide">Sentiment</th>
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-medium uppercase tracking-wide">Theme</th>
                  <th className="text-left px-4 py-2.5 text-xs text-gray-400 font-medium uppercase tracking-wide">Priority</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} className="text-center py-12 text-sm text-gray-400">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-16 text-sm text-gray-400">No feedback yet. Import some to get started.</td></tr>
                ) : (
                  filtered.map((f) => (
                    <tr key={f.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3"><Badge variant="purple">{f.source}</Badge></td>
                      <td className="px-4 py-3 text-gray-700">{f.customer_name || "—"}<div className="text-xs text-gray-400">{f.customer_segment}</div></td>
                      <td className="px-4 py-3 text-gray-600 max-w-xs"><p className="line-clamp-2 text-xs">{f.feedback_text}</p></td>
                      <td className="px-4 py-3"><Badge variant={sentimentVariant(f.sentiment)}>{f.sentiment || "—"}</Badge></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{f.theme || "—"}</td>
                      <td className="px-4 py-3"><Badge variant={priorityVariant(f.priority)}>{f.priority || "—"}</Badge></td>
                      <td className="px-4 py-3"><button onClick={() => deleteFeedback(f.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </Card>
          <p className="text-xs text-gray-400 mt-3">{filtered.length} items</p>
        </div>
      </main>
    </div>
  );
}