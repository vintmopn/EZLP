import Link from 'next/link';
import { MUSIC_COLORS } from '@/lib/music-colors';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const showcase = MUSIC_COLORS.filter(c =>
    ['clear','gold','burgundy','green','mint','navy','lavender','pink'].includes(c.id)
  );

  const menuItems = [
    ['VINYL', '/vinyl', '컬러와 아티스트로 찾는 레코드'],
    ['CD', '/cd', '한정판과 해외 에디션'],
    ['FASHION', '/fashion', '아카이브 패션'],
    ['RARE', '/rare', '쉽게 만나기 어려운 아이템'],
    ['NEW', '/new', '새로 들어온 상품'],
  ];

  return (
    <main>

      {/* 첫 화면 */}
      <section
        style={{
          minHeight: 'calc(100vh - 76px)',
          padding: '7vw 8vw',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, .9fr) minmax(500px, 1.1fr)',
          gap: '7vw',
          alignItems: 'center',
        }}
      >
        <div>
          <p className="eyebrow">EZLP · GLOBAL ARCHIVE STORE</p>

          <h1
            style={{
              fontSize: 'clamp(54px, 6vw, 96px)',
              lineHeight: '.95',
              letterSpacing: '-.065em',
              margin: '18px 0 30px',
            }}
          >
            찾기 어려운 취향을,<br />
            더 가까이.
          </h1>

          <p
            style={{
              color: '#666',
              fontSize: '15px',
              lineHeight: '1.8',
            }}
          >
            해외 한정 바이닐과 아카이브 패션부터<br />
            국내에서 쉽게 구할 수 없는 아이템까지.<br />
            <strong style={{ color: '#111' }}>
              EZLP가 전 세계에서 찾아 연결합니다.
            </strong>
          </p>

          <div
            style={{
              marginTop: '48px',
              paddingTop: '20px',
              borderTop: '1px solid #111',
              fontSize: '21px',
              fontWeight: 900,
            }}
          >
            세상에 못 찾는 음반은 없다!
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderTop: '1px solid #111',
            borderLeft: '1px solid #ddd',
          }}
        >
          {menuItems.map(([title, href, description]) => (
            <Link
              href={href}
              key={title}
              style={{
                minHeight: '170px',
                padding: '24px',
                borderRight: '1px solid #ddd',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#fff',
              }}
            >
              <span
                style={{
                  fontSize: '10px',
                  color: '#777',
                }}
              >
                {description}
              </span>

              <strong
                style={{
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  letterSpacing: '-.045em',
                }}
              >
                {title}
              </strong>

              <span style={{ alignSelf: 'flex-end' }}>→</span>
            </Link>
          ))}

          <Link
            href="/request"
            style={{
              minHeight: '170px',
              padding: '24px',
              borderRight: '1px solid #6E0F2A',
              borderBottom: '1px solid #6E0F2A',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: '#6E0F2A',
              color: '#fff',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                color: '#e7bcc8',
              }}
            >
              원하는 LP와 CD를 대신 찾아드립니다
            </span>

            <strong
              style={{
                fontSize: 'clamp(25px, 2.6vw, 40px)',
                letterSpacing: '-.045em',
              }}
            >
              음반 구해주세요
            </strong>

            <span style={{ alignSelf: 'flex-end' }}>→</span>
          </Link>
        </div>
      </section>


      {/* 기존 색깔로 찾아내기 화면 유지 */}
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

          <h3>세상에 못 찾는 음반은 없다!</h3>

          <div className="hero-buttons">
            <Link href="/vinyl" className="dark-button">
              색깔로 찾기
            </Link>

            <Link href="/request" className="light-button">
              음반 구해주세요
            </Link>
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


      {/* 기존 EXPLORE EZLP 유지 */}
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


      {/* 기존 검은 화면 유지 */}
      <section className="request-banner">
        <p className="eyebrow">CAN'T FIND IT?</p>

        <h2>원하는 음반, 구해드릴게요.</h2>

        <p>
          국내에서 찾기 어렵거나 해외에만 있는 LP와 CD를 알려주세요.<br />
          EZLP가 전 세계에서 찾아 구매 가능 여부를 안내합니다.
        </p>

        <h3
          style={{
            fontSize: '28px',
            margin: '35px 0',
          }}
        >
          세상에 못 찾는 음반은 없다!
        </h3>

        <Link href="/request" className="white-button">
          음반 구해주세요 →
        </Link>
      </section>

    </main>
  );
}
