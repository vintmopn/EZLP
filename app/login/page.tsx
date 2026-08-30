"use client";

import Link from 'next/link';
import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = getBrowserSupabase();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError('이메일 또는 비밀번호를 확인해주세요.');
        return;
      }

      window.location.href = '/mypage';
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <p className="eyebrow">EZLP ACCOUNT</p>
        <h1>로그인</h1>
        <p className="auth-description">
          주문과 배송, 찜 목록, 명반 요청 현황을 한곳에서 확인하세요.
        </p>

        <form onSubmit={submit}>
          <label>
            EMAIL
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </label>

          <label>
            PASSWORD
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button className="auth-submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="auth-bottom">
          아직 회원이 아니신가요? <Link href="/signup">회원가입</Link>
        </p>

        <Link href="/admin/login" className="admin-small-link">
          관리자 로그인
        </Link>
      </div>
    </main>
  );
}
