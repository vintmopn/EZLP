import Link from 'next/link';
import { MUSIC_COLORS } from '@/lib/music-colors';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const showcase = MUSIC_COLORS.filter(c =>
    ['burgundy','navy','mint','pink','clear','gold','lavender','green'].includes(c.id)
  );

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">EZLP · GLOBAL ARCHIVE STORE</p>
        <h1>찾기 어려운 취향을,<br />더 가까이.</h1>

        <p className="hero-copy">
          해외 한정 바이닐과 아카이브 패션부터<br />
          국내에서 쉽게 구할 수 없는 아이템까지.<br />
          <strong>EZLP가 전 세계에서 찾아 연결합니다.</strong>
        </p>

        <div className="hero-buttons">
          <Link href="/new" className="dark-button">NEW ARRIVALS</Link>
          <Link href="/request" className="light-button">명반 구해주기</Link>
        </div>
      </section>

      <section className="home-color-section">
        <div className="home-color-copy">
          <p className="eyebrow">FIND BY COLOR</p>
          <h2>
            앨범명이 기억이 안 나면,<br />
            <span>색깔로 찾아내기.</span>
          </h2>

          <p>
            레드, 버건디, 네이비, 민트, 클리어부터<br />
            스플래터와 멀티 컬러까지.
            기억나는 색만으로 원하는 음반을 찾아보세요.
          </p>

          <h3>세상에 못 찾는 명반은 없다.</h3>

          <div className="hero-buttons">
            <Link href="/vinyl" className="dark-button">색깔로 찾기</Link>
            <Link href="/request" className="light-button">명반 구해주기</Link>
          </div>
        </div>

        <div className="home-color-preview">
          {showcase.map(color => (
            <Link
              key={color.id}
              href="/vinyl"
              className="home-color-chip"
              style={{
                background: color.hex,
                color: color.text,
              }}
            >
              {color.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="category-section">
        <p className="eyebrow">EXPLORE EZLP</p>
        <div className="category-grid">
          <Link href="/vinyl" className="category-card">
            <span>01</span>
            <h2>VINYL</h2>
            <p>컬러와 아티스트로 찾는 레코드</p>
          </Link>

          <Link href="/cd" className="category-card">
            <span>02</span>
            <h2>CD</h2>
            <p>한정판과 해외 에디션</p>
          </Link>

          <Link href="/fashion" className="category-card">
            <span>03</span>
            <h2>FASHION</h2>
            <p>아카이브 패션과 희귀 아이템</p>
          </Link>
        </div>
      </section>

      <section className="request-banner">
        <p className="eyebrow">CAN'T FIND IT?</p>
        <h2>원하는 명반, 대신 찾아드립니다.</h2>
        <p>
          원하는 LP나 CD가 없다면 요청해주세요.<br />
          EZLP가 전 세계 매물을 찾아 구매 가능 여부를 안내합니다.
        </p>
        <Link href="/request" className="white-button">명반 구해주기 →</Link>
      </section>
    </main>
  );
}
