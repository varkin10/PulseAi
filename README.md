# PulseAI

**AI-powered Decision Intelligence for Product Managers.**

PulseAI turns scattered customer feedback into a prioritized, revenue-aware product roadmap — automatically.

🔗 **Live app:** [pulse-ai-varun-s-project3.vercel.app](https://pulse-ai-varun-s-project3.vercel.app)

---

## The problem

Product teams already collect plenty of feedback — support tickets, sales call notes, app reviews, survey responses, Slack threads. What they don't have is time. PMs spend hours every week manually re-reading the same complaints across a dozen disconnected tools, with no reliable way to tell which issues are actually costing revenue versus which are just loud.

The result: roadmap debates driven by whoever complained most recently, not by what's actually at stake.

## What PulseAI does

PulseAI ingests raw customer feedback from any source, uses AI to cluster it into clear themes, scores each theme against real business impact (ARR at risk, customer tier, churn signals), and tells you exactly what to build next — with the reasoning to back it up.

## Key features

- **AI Theme Extraction** — Automatically clusters raw feedback (tickets, reviews, call notes, survey responses) into recurring themes, with sentiment and mention counts, no manual tagging required.
- **Priority Scoring** — Every theme is scored 0–100 against ARR impact, customer tier, mention volume, and churn signals, so the roadmap reflects revenue risk, not just noise.
- **AI Copilot** — Ask questions about your feedback in plain English ("What's driving churn risk this month?") and get sourced, data-grounded answers instantly.
- **Feedback Inbox** — Import feedback via CSV upload, paste, or manual entry, then run AI analysis on demand.
- **Theme Explorer** — Browse and drill into every extracted theme with sentiment and trend context.
- **Prioritization Board** — A ranked view of every open issue by priority score and level (critical/high/medium/low).
- **Decision Hub** — Centralized reasoning behind each priority call, so roadmap decisions are traceable.
- **AI Roadmap Generation** — Turns prioritized themes into a quarter-by-quarter roadmap with impact, effort, and confidence estimates.
- **Alerts** — Proactive notifications when a critical issue spikes in mention volume or revenue exposure.
- **Demo Data** — Load a realistic 20-item SaaS feedback dataset with one click to explore PulseAI before connecting real sources.
- **Integrations (coming soon)** — Zendesk, Intercom, Slack, Gong, HubSpot, Salesforce, Typeform, Mixpanel, App Store, Google Play, Notion, and Jira.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) + TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Auth | [Clerk](https://clerk.com/) |
| Database | [Supabase](https://supabase.com/) (Postgres) |
| AI | [Google Gemini](https://ai.google.dev/) (`@google/generative-ai`) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide](https://lucide.dev/) |
| CSV parsing | [PapaParse](https://www.papaparse.com/) |
| Deployment | [Vercel](https://vercel.com/) |

## Getting started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com/) account and application
- A [Supabase](https://supabase.com/) project
- A [Google Gemini API key](https://ai.google.dev/)

### Installation

```bash
git clone <repository-url>
cd pulseai
npm install
```

### Environment variables

Create a `.env.local` file in the project root with the following:

```bash
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Gemini
GEMINI_API_KEY=
```

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the codebase
```

## Screenshots

> _Coming soon — screenshots of the dashboard, feedback inbox, theme explorer, and AI copilot will go here._

## Built by

**Varun Kinkhede**
