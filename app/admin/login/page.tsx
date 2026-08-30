'use client';

import { FormEvent, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

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

      window.location.href = '/admin';
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '75vh', display: 'grid', placeItems: 'center', padding: '40px 20px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, marginBottom: 14 }}>
          EZLP OWNER / ADMIN
        </div>

        <h1 style={{ fontSize: 38, margin: '0 0 10px' }}>관리자 로그인</h1>

        <p style={{ color: '#777', marginBottom: 32 }}>
          EZLP 운영 계정으로 로그인하세요.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            이메일
          </label>

          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '14px 15px',
              border: '1px solid #ccc',
              marginBottom: 18,
              fontSize: 15,
            }}
          />

          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
            비밀번호
          </label>

          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '14px 15px',
              border: '1px solid #ccc',
              marginBottom: 16,
              fontSize: 15,
            }}
          />

          {error && (
            <div style={{ color: '#b42318', fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 15,
              border: 0,
              background: '#111',
              color: '#fff',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {loading ? '로그인 중...' : '관리자 로그인'}
          </button>
        </form>
      </div>
    </main>
  );
}
