"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./ThemeToggle";
import {
  LayoutDashboard,
  Inbox,
  Tags,
  ListOrdered,
  Lightbulb,
  MessageSquare,
  Map,
  Bell,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Feedback inbox", href: "/inbox", icon: Inbox },
  { label: "Theme explorer", href: "/themes", icon: Tags },
  { label: "Prioritization", href: "/prioritization", icon: ListOrdered },
  { label: "Decision hub", href: "/decision-hub", icon: Lightbulb },
  { label: "AI copilot", href: "/copilot", icon: MessageSquare },
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "Alerts", href: "/alerts", icon: Bell },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-56 min-w-[14rem] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col h-screen sticky top-0">
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">PulseAI</span>
        </div>
        <ThemeToggle />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              path === href
                ? "bg-brand-50 dark:bg-brand-900 text-brand-700 dark:text-brand-300 font-medium"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </aside>
  );
}
