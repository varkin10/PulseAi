"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  Sparkles,
  Tags,
  ListOrdered,
  MessageSquare,
  ArrowRight,
  Clock,
  Shuffle,
  HelpCircle,
} from "lucide-react";

const features = [
  {
    icon: Tags,
    title: "AI Theme Extraction",
    description:
      "PulseAI reads every ticket, review, and call transcript and automatically clusters them into clear, recurring themes — no manual tagging required.",
  },
  {
    icon: ListOrdered,
    title: "Priority Scoring",
    description:
      "Every theme is scored against ARR impact, customer count, and urgency, so you know exactly which fixes move the revenue needle.",
  },
  {
    icon: MessageSquare,
    title: "AI Copilot",
    description:
      "Ask questions about your feedback in plain English and get instant, sourced answers — like having a research analyst on call 24/7.",
  },
];

const pains = [
  {
    icon: Clock,
    title: "Hours lost every week",
    description:
      "PMs spend entire afternoons scrolling through support tickets, app reviews, and call notes just to find the same five complaints again.",
  },
  {
    icon: Shuffle,
    title: "Feedback scattered everywhere",
    description:
      "Zendesk, Slack, sales calls, App Store reviews — signal is split across a dozen tools with no single place to see what matters.",
  },
  {
    icon: HelpCircle,
    title: "No clear answer on what's next",
    description:
      "Without a link between feedback and revenue, every roadmap debate turns into a guessing game about what to build next.",
  },
];

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-cream-50 text-gray-900">
      <header className="sticky top-0 z-20 bg-cream-50/80 backdrop-blur border-b border-cream-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className="font-semibold text-gray-900">PulseAI</span>
          </div>
          <div className="flex items-center gap-3">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Get started free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-200 rounded-full opacity-40 blur-3xl" />
        <div className="absolute -top-16 -right-24 w-96 h-96 bg-brand-300 rounded-full opacity-25 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-100 rounded-full opacity-50 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-1.5 bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
            <Sparkles size={12} />
            AI-powered feedback intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-5">
            Turn customer feedback into product decisions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            PulseAI uses AI to cluster feedback into themes, score priorities by ARR impact, and
            tell you exactly what to build next.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors shadow-sm"
            >
              Get started free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-5 py-3 rounded-lg transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-cream-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
              Feedback synthesis shouldn&apos;t eat your whole week
            </h2>
            <p className="text-gray-500">
              Most product teams already collect plenty of feedback. The hard part is turning it
              into a decision before the next planning cycle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {pains.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center px-2">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-red-500" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-16">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
            How PulseAI gets you there
          </h2>
          <p className="text-gray-500">
            Three steps between raw feedback and a roadmap your whole team trusts.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
                <Icon size={20} className="text-brand-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-700">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
            Ready to turn feedback into decisions?
          </h2>
          <p className="text-brand-100 mb-8">
            Connect your feedback sources and see your first AI-generated roadmap in minutes.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 bg-white hover:bg-cream-50 text-brand-700 text-sm font-medium px-5 py-3 rounded-lg transition-colors"
          >
            Get started free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-cream-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span>PulseAI</span>
          </div>
          <span>&copy; {new Date().getFullYear()} PulseAI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
