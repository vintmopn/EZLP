import { createClient } from '@supabase/supabase-js';

export function getSupabase() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !key) return null;

  let url: string;

  try {
    url = new URL(rawUrl.trim()).origin;
  } catch {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
