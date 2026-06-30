import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Feedback = {
  id: string;
  user_id: string;
  source: string;
  date: string;
  customer_name: string | null;
  customer_segment: string | null;
  feedback_text: string;
  product_area: string | null;
  revenue_impact: number | null;
  priority: "critical" | "high" | "medium" | "low" | null;
  status: string;
  sentiment: "positive" | "neutral" | "negative" | null;
  theme: string | null;
  created_at: string;
};

export type Theme = {
  id: string;
  user_id: string;
  name: string;
  mention_count: number;
  sentiment: string | null;
  trend: string | null;
  summary: string | null;
  created_at: string;
};

export type PriorityItem = {
  id: string;
  user_id: string;
  title: string;
  score: number;
  level: "critical" | "high" | "medium" | "low";
  reasoning: string | null;
  mention_count: number | null;
  arr_affected: number | null;
  theme: string | null;
  created_at: string;
};

export type Alert = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info";
  read: boolean;
  created_at: string;
};
