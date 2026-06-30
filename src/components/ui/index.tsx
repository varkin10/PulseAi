"use client";
import { clsx } from "clsx";

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "red" | "green" | "amber" | "blue" | "purple";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
        {
          "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300": variant === "default",
          "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300": variant === "red",
          "bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200": variant === "green",
          "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300": variant === "amber",
          "bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-300": variant === "blue",
          "bg-purple-50 text-purple-800 dark:bg-purple-950 dark:text-purple-300": variant === "purple",
        }
      )}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  deltaType = "neutral",
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaType?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {icon && (
          <div className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-900 flex items-center justify-center text-brand-700 dark:text-brand-300">
            {icon}
          </div>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      </div>
      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
      {delta && (
        <p className={clsx("text-xs mt-1 flex items-center gap-1", {
          "text-brand-600 dark:text-brand-400": deltaType === "up",
          "text-red-600 dark:text-red-400": deltaType === "down",
          "text-gray-500 dark:text-gray-400": deltaType === "neutral",
        })}>
          {delta}
        </p>
      )}
    </div>
  );
}

export function InsightCard({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "warning" | "danger";
}) {
  return (
    <div
      className={clsx("rounded-lg p-3 mb-3 flex gap-3 text-sm", {
        "bg-brand-50 dark:bg-brand-950 border border-brand-100 dark:border-brand-900": variant === "info",
        "bg-amber-50 dark:bg-amber-950 border border-amber-100 dark:border-amber-900": variant === "warning",
        "bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900": variant === "danger",
      })}
    >
      {children}
    </div>
  );
}

export function Button({
  children,
  onClick,
  variant = "secondary",
  disabled = false,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-brand-600 text-white hover:bg-brand-700": variant === "primary",
          "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800":
            variant === "secondary",
        },
        className
      )}
    >
      {children}
    </button>
  );
}

export function sentimentVariant(
  s: string | null
): "red" | "green" | "amber" | "default" {
  if (s === "positive") return "green";
  if (s === "negative") return "red";
  if (s === "mixed") return "amber";
  return "default";
}

export function priorityVariant(
  p: string | null
): "red" | "amber" | "blue" | "default" {
  if (p === "critical") return "red";
  if (p === "high") return "amber";
  if (p === "medium") return "blue";
  return "default";
}
