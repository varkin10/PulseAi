"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui";
import { Send, Sparkles } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

type Message = { role: "user" | "ai"; text: string };

const suggested = [
  "What are the top complaints from enterprise customers?",
  "What product area is driving churn risk?",
  "Which issues should be prioritized next sprint?",
  "Summarize this week's customer feedback",
];

export default function CopilotPage() {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (q?: string) => {
    const question = q || input.trim();
    if (!question || !user) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, question }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.answer || "Sorry, I could not get an answer right now." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Something went wrong. Check your API connection." }]);
    }
    setLoading(false);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main flex flex-col h-screen">
        <div className="px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">AI copilot</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles size={20} className="text-white" />
              </div>
              <h2 className="text-base font-medium text-gray-900 mb-2">Ask anything about your feedback</h2>
              <p className="text-sm text-gray-500 mb-6">I have full context on your customer feedback, themes, and priority scores.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggested.map((q) => (
                  <button key={q} onClick={() => send(q)} className="text-sm px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium shrink-0 ${
                    m.role === "user" ? "bg-blue-50 text-blue-700" : "bg-blue-600 text-white"
                  }`}>
                    {m.role === "user" ? user?.firstName?.[0] || "U" : <Sparkles size={14} />}
                  </div>
                  <div className={`px-4 py-3 rounded-xl text-sm leading-relaxed max-w-prose whitespace-pre-wrap ${
                    m.role === "user" ? "bg-blue-50 text-blue-900" : "bg-white border border-gray-200 text-gray-800"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-400">Thinking...</div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-2xl mx-auto flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask about your feedback data..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 bg-white"
            />
            <Button variant="primary" onClick={() => send()} disabled={loading || !input.trim()}>
              <Send size={14} />Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
