'use client';

import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function LogoutButton() {
  async function logout() {
    const supabase = getBrowserSupabase();
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  }

  return (
    <button
      onClick={logout}
      style={{
        border: '1px solid #bbb',
        background: '#fff',
        padding: '10px 14px',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      로그아웃
    </button>
  );
}
