"use client";
import { Card, Badge } from "@/components/ui";
import { Sidebar } from "@/components/Sidebar";
import {
  LifeBuoy,
  MessageCircle,
  Mic,
  Building2,
  Cloud,
  ClipboardList,
  BarChart3,
  Apple,
  Play,
  NotebookText,
  KanbanSquare,
} from "lucide-react";

const integrations = [
  { name: "Zendesk", description: "Sync support tickets as feedback", icon: LifeBuoy },
  { name: "Intercom", description: "Pull conversations into your inbox", icon: MessageCircle },
  { name: "Slack", description: "Capture customer chatter from channels", icon: MessageCircle },
  { name: "Gong", description: "Surface feedback from sales calls", icon: Mic },
  { name: "HubSpot", description: "Connect CRM notes and deals", icon: Building2 },
  { name: "Salesforce", description: "Sync cases and account context", icon: Cloud },
  { name: "Typeform", description: "Import survey responses", icon: ClipboardList },
  { name: "Mixpanel", description: "Correlate feedback with product usage", icon: BarChart3 },
  { name: "App Store", description: "Pull in iOS app reviews", icon: Apple },
  { name: "Google Play", description: "Pull in Android app reviews", icon: Play },
  { name: "Notion", description: "Push roadmap items to your docs", icon: NotebookText },
  { name: "Jira", description: "Turn decisions into tracked issues", icon: KanbanSquare },
];

export default function IntegrationsPage() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h1 className="text-base font-semibold text-gray-900">Integrations</h1>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-6">
            Connect the tools your team already uses to bring feedback into PulseAI automatically.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map(({ name, description, icon: Icon }) => (
              <Card key={name} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0">
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
                    <Badge variant="default">Coming soon</Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
