type DemoFeedbackSeed = {
  source: string;
  daysAgo: number;
  customer_name: string;
  customer_segment: string;
  feedback_text: string;
  product_area: string;
  revenue_impact: number;
};

const DEMO_FEEDBACK_SEEDS: DemoFeedbackSeed[] = [
  {
    source: "support_ticket",
    daysAgo: 0,
    customer_name: "Priya Nair",
    customer_segment: "Enterprise",
    feedback_text:
      "Our Black Friday sale starts in 6 hours and checkout is throwing a 500 error for roughly 1 in 5 customers right after they enter their card. We've already lost at least $18K in abandoned carts since this morning. Reproduced on both Chrome and Safari, only on orders with a discount code applied — please escalate immediately.",
    product_area: "Checkout",
    revenue_impact: 180000,
  },
  {
    source: "email",
    daysAgo: 4,
    customer_name: "Marcus Webb",
    customer_segment: "Mid-Market",
    feedback_text:
      "Third week in a row we've had customers report the 'Complete Purchase' button just spins and never completes on mobile Safari. Support ticket volume is up 40% because of this. We're a $46K ARR account and honestly considering pausing our renewal conversation until this is fixed.",
    product_area: "Checkout",
    revenue_impact: 46000,
  },
  {
    source: "support_ticket",
    daysAgo: 1,
    customer_name: "Devon Ashworth",
    customer_segment: "Enterprise",
    feedback_text:
      "Our entire finance team (12 seats) got locked out this morning after our Okta SSO integration started throwing 'invalid_grant' errors. This is blocking end-of-quarter reporting due to our board tomorrow. Please treat as P1 — we need someone on a call within the hour.",
    product_area: "Authentication",
    revenue_impact: 198000,
  },
  {
    source: "slack_channel",
    daysAgo: 9,
    customer_name: "Lena Fischer",
    customer_segment: "Enterprise",
    feedback_text:
      "SAML login redirects to a blank white screen about 1 in 4 times for our team. We've had to tell people to just keep refreshing, which is not something I can explain to our security team during our SOC2 audit next week.",
    product_area: "Authentication",
    revenue_impact: 95000,
  },
  {
    source: "csat_survey",
    daysAgo: 6,
    customer_name: "Anthony Ruiz",
    customer_segment: "Mid-Market",
    feedback_text:
      "Our weekly ops dashboard used to load in under 5 seconds. For the last two weeks it's been taking 45-90 seconds, and sometimes it times out entirely. Our regional managers are giving up on it during Monday standups, which defeats the purpose of paying for it.",
    product_area: "Reporting",
    revenue_impact: 34000,
  },
  {
    source: "support_ticket",
    daysAgo: 12,
    customer_name: "Grace Kim",
    customer_segment: "Enterprise",
    feedback_text:
      "The revenue-by-region report has been stuck on 'Generating...' for over 20 minutes on three separate attempts today. We report actuals to our CFO every Friday at 3pm and I'm now doing it manually in a spreadsheet as a backup — exactly the workflow we bought this tool to eliminate.",
    product_area: "Reporting",
    revenue_impact: 145000,
  },
  {
    source: "app_store",
    daysAgo: 3,
    customer_name: "Sam Okonkwo",
    customer_segment: "SMB",
    feedback_text:
      "The mobile app crashes every single time I try to approve a purchase order from my phone. I'm on the road 3 days a week and this is the primary reason I have the app installed. Right now it's completely unusable for its core purpose. One star until this is fixed.",
    product_area: "Mobile App",
    revenue_impact: 11000,
  },
  {
    source: "in_app",
    daysAgo: 15,
    customer_name: "Renee Castillo",
    customer_segment: "Mid-Market",
    feedback_text:
      "Filters and search on the iOS app reset every time you background the app, even for two seconds to check a text message. Our warehouse leads live on their phones and this makes the app borderline unusable in the field.",
    product_area: "Mobile App",
    revenue_impact: 38000,
  },
  {
    source: "sales_call",
    daysAgo: 8,
    customer_name: "Jordan Pham",
    customer_segment: "Enterprise",
    feedback_text:
      "We're being asked to move from the Growth to the Enterprise plan for a 60% price increase just to get API access we were told was included when we signed our original contract. This feels like a bait and switch and our procurement team is not going to be happy.",
    product_area: "Billing",
    revenue_impact: 185000,
  },
  {
    source: "email",
    daysAgo: 18,
    customer_name: "Elena Popescu",
    customer_segment: "Mid-Market",
    feedback_text:
      "The per-seat pricing model doesn't work for us — we have 200 occasional users who log in once a month and 15 power users, but we're charged the same for all 215. We're actively evaluating a competitor with usage-based pricing because of this.",
    product_area: "Billing",
    revenue_impact: 44000,
  },
  {
    source: "support_ticket",
    daysAgo: 2,
    customer_name: "Tariq Hassan",
    customer_segment: "Enterprise",
    feedback_text:
      "We're hitting 429 rate limit errors on the /inventory endpoint constantly during our nightly sync job, even though we're well under the documented 1000 req/min limit. This is dropping about 8% of our sync records every night and nobody on our side can explain the discrepancy without support's help.",
    product_area: "API",
    revenue_impact: 156000,
  },
  {
    source: "email",
    daysAgo: 20,
    customer_name: "Nadia Volkov",
    customer_segment: "Enterprise",
    feedback_text:
      "Our integration with your webhook API silently drops events when we exceed 50 concurrent connections with zero error response — we only discovered this because a customer complained about a missing order. We need either a documented backoff strategy or a higher limit for accounts at our tier.",
    product_area: "API",
    revenue_impact: 190000,
  },
  {
    source: "support_ticket",
    daysAgo: 9,
    customer_name: "Wesley Green",
    customer_segment: "Enterprise",
    feedback_text:
      "I've had an open P1 ticket (#48213) for 9 days now with no update beyond the auto-reply. We are paying for the Enterprise support SLA, which promises a 4-hour response time on critical issues. This is a trust problem, not just a support problem.",
    product_area: "Support",
    revenue_impact: 122000,
  },
  {
    source: "csat_survey",
    daysAgo: 5,
    customer_name: "Yuki Tanaka",
    customer_segment: "Enterprise",
    feedback_text:
      "Every time I get a support response it's from a different agent who asks me to re-explain the entire issue from scratch. There's clearly no shared ticket history on your end. For a $95K/year account, this is not the experience we were promised during the sales process.",
    product_area: "Support",
    revenue_impact: 95000,
  },
  {
    source: "support_ticket",
    daysAgo: 1,
    customer_name: "Camille Laurent",
    customer_segment: "Mid-Market",
    feedback_text:
      "Stock counts between the platform and our Shopify store have been out of sync for 4 days — we oversold 60 units of our best-selling SKU because the dashboard showed 200 units in stock when we actually had 12. This directly cost us in refunds and a bad review cycle.",
    product_area: "Inventory",
    revenue_impact: 37000,
  },
  {
    source: "slack_channel",
    daysAgo: 14,
    customer_name: "Ben Whitfield",
    customer_segment: "Mid-Market",
    feedback_text:
      "The inventory sync job silently fails about twice a week with no alert or notification to us — we only find out when a warehouse manager notices the numbers don't match a physical count. We need proactive alerting on sync failures, not just a green checkmark that lies to us.",
    product_area: "Inventory",
    revenue_impact: 28000,
  },
  {
    source: "email",
    daysAgo: 7,
    customer_name: "Aisha Bello",
    customer_segment: "Enterprise",
    feedback_text:
      "We're three weeks into onboarding and still haven't been able to get our historical data imported — every CSV upload fails with a generic 'formatting error' and no line number or field reference. Our internal champion is starting to get pressure from leadership asking why we're not live yet.",
    product_area: "Onboarding",
    revenue_impact: 165000,
  },
  {
    source: "sales_call",
    daysAgo: 11,
    customer_name: "Oliver Brandt",
    customer_segment: "Mid-Market",
    feedback_text:
      "The onboarding checklist references features and settings pages that don't seem to exist in our account, like 'Advanced Routing Rules.' Our implementation lead has spent hours looking for something that apparently isn't available on our plan, and nobody told us that upfront.",
    product_area: "Onboarding",
    revenue_impact: 47000,
  },
  {
    source: "in_app",
    daysAgo: 16,
    customer_name: "Hannah Reyes",
    customer_segment: "Mid-Market",
    feedback_text:
      "We'd love the ability to set custom approval thresholds per department instead of one global rule — right now every purchase over $500 requires the same two approvers regardless of whether it's marketing or engineering, which is slowing down teams that don't need that level of control.",
    product_area: "Product",
    revenue_impact: 41000,
  },
  {
    source: "email",
    daysAgo: 19,
    customer_name: "Felix Adeyemi",
    customer_segment: "Enterprise",
    feedback_text:
      "Native Slack notifications for priority-flagged feedback would save us from checking the dashboard manually every morning. Right now our team finds out about critical issues a day late because nobody remembers to log in and check.",
    product_area: "Product",
    revenue_impact: 78000,
  },
];

export function getDemoFeedback(userId: string) {
  const now = Date.now();
  return DEMO_FEEDBACK_SEEDS.map((seed) => ({
    user_id: userId,
    source: seed.source,
    date: new Date(now - seed.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
    customer_name: seed.customer_name,
    customer_segment: seed.customer_segment,
    feedback_text: seed.feedback_text,
    product_area: seed.product_area,
    revenue_impact: seed.revenue_impact,
    status: "new",
  }));
}
