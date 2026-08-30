import { createBrowserClient } from '@supabase/ssr';

export function getBrowserSupabase() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !key) {
    throw new Error('Supabase 환경변수가 없습니다.');
  }

  const url = new URL(rawUrl.trim()).origin;
  return createBrowserClient(url, key);
}
