"use client";

import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function LogoutCustomer() {
  async function logout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return <button onClick={logout} className="logout-link">로그아웃</button>;
}
