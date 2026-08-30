"use client";

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function RequestPage() {
  const [form, setForm] = useState({
    artist: '',
    album: '',
    format: 'LP',
    edition: '상관없음',
    condition: '상관없음',
    budget: '',
    link: '',
    note: '',
    name: '',
    email: '',
    phone: '',
  });

  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = getBrowserSupabase();
      const { data: authData } = await supabase.auth.getUser();

      const { error } = await supabase
        .from('sourcing_requests')
        .insert({
          user_id: authData.user?.id || null,
          category: 'MUSIC',
          product_name: form.album,
          artist_or_brand: form.artist,
          product_url: form.link || null,
          desired_condition: form.condition,
          desired_budget: form.budget ? Number(form.budget) : null,
          additional_request: form.note || null,
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          desired_format: form.format,
          desired_edition: form.edition,
          status: 'NEW',
        });

      if (error) {
        setError('요청을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <main className="request-success">
        <p className="eyebrow">REQUEST RECEIVED</p>
        <h1>요청이 접수되었습니다.</h1>
        <p>
          EZLP가 전 세계에서 매물을 찾아<br />
          구매 가능 여부와 견적을 안내해드릴게요.
        </p>
        <strong>세상에 못 찾는 명반은 없다.</strong>
        <a href="/" className="dark-button">홈으로 돌아가기</a>
      </main>
    );
  }

  return (
    <main className="request-page">
      <section className="request-intro">
        <p className="eyebrow">EZLP SOURCING SERVICE</p>
        <h1>명반 구해주기</h1>
        <p>
          국내에서 찾기 어렵거나 해외에만 있는 LP와 CD.<br />
          원하는 음반을 알려주시면 EZLP가 대신 찾아드립니다.
        </p>
      </section>

      <form className="request-form" onSubmit={submit}>
        <div className="request-form-grid">
          <label>
            아티스트 *
            <input
              required
              value={form.artist}
              onChange={e => set('artist', e.target.value)}
              placeholder="예: Frank Ocean"
            />
          </label>

          <label>
            앨범명 *
            <input
              required
              value={form.album}
              onChange={e => set('album', e.target.value)}
              placeholder="예: Blonde"
            />
          </label>
        </div>

        <div className="request-form-grid">
          <label>
            형식 *
            <select
              value={form.format}
              onChange={e => set('format', e.target.value)}
            >
              <option>LP</option>
              <option>CD</option>
            </select>
          </label>

          <label>
            원하는 버전
            <select
              value={form.edition}
              onChange={e => set('edition', e.target.value)}
            >
              <option>상관없음</option>
              <option>일반판</option>
              <option>초판</option>
              <option>컬러 바이닐</option>
              <option>한정판</option>
              <option>특정 국가 프레싱</option>
            </select>
          </label>
        </div>

        <div className="request-form-grid">
          <label>
            상품 상태
            <select
              value={form.condition}
              onChange={e => set('condition', e.target.value)}
            >
              <option>상관없음</option>
              <option>새상품</option>
              <option>중고 가능</option>
            </select>
          </label>

          <label>
            최대 예산
            <input
              type="number"
              value={form.budget}
              onChange={e => set('budget', e.target.value)}
              placeholder="예: 150000"
            />
          </label>
        </div>

        <label>
          참고 링크
          <input
            value={form.link}
            onChange={e => set('link', e.target.value)}
            placeholder="Discogs, eBay, Instagram 등"
          />
        </label>

        <label>
          추가 요청사항
          <textarea
            rows={5}
            value={form.note}
            onChange={e => set('note', e.target.value)}
            placeholder="기억나는 커버나 바이닐 색상, 꼭 원하는 버전 등을 적어주세요."
          />
        </label>

        <div className="request-contact">
          <h3>연락 받을 정보</h3>

          <div className="request-form-grid three">
            <label>
              이름 *
              <input
                required
                value={form.name}
                onChange={e => set('name', e.target.value)}
              />
            </label>

            <label>
              이메일 *
              <input
                required
                type="email"
                value={form.email}
                onChange={e => set('email', e.target.value)}
              />
            </label>

            <label>
              연락처 *
              <input
                required
                value={form.phone}
                onChange={e => set('phone', e.target.value)}
              />
            </label>
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="request-submit" disabled={loading}>
          {loading ? '접수 중...' : '명반 요청하기'}
        </button>
      </form>
    </main>
  );
}
