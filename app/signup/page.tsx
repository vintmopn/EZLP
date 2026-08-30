"use client";

import Link from 'next/link';
import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (password.length < 6) {
        setError('비밀번호는 6자 이상 입력해주세요.');
        return;
      }

      const supabase = getBrowserSupabase();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session) {
        window.location.href = '/mypage';
      } else {
        setMessage('가입 완료! 이메일 인증 메일을 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-box">
        <p className="eyebrow">JOIN EZLP</p>
        <h1>회원가입</h1>

        <form onSubmit={submit}>
          <label>
            NAME
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="이름"
            />
          </label>

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
              placeholder="6자 이상"
            />
          </label>

          {error && <p className="form-error">{error}</p>}
          {message && <p className="form-success">{message}</p>}

          <button className="auth-submit" disabled={loading}>
            {loading ? '가입 중...' : 'EZLP 가입하기'}
          </button>
        </form>

        <p className="auth-bottom">
          이미 회원이신가요? <Link href="/login">로그인</Link>
        </p>
      </div>
    </main>
  );
}
