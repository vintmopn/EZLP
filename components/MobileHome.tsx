"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const PEOPLE = [
  { src: "/people/01.png", speech: "세상에 나쁜 음반은 없다.." },
  { src: "/people/02.png", speech: "이건 좀 탐난다." },
  { src: "/people/03.png", speech: "색만 기억나는데.." },
  { src: "/people/04.png", speech: "이건 어디서 구하지?" },
  { src: "/people/05.png", speech: "희귀반이면 더 좋고." },
  { src: "/people/06.png", speech: "취향은 못 참지." },
  { src: "/people/07.png", speech: "이거 저장해둬야겠다." },
  { src: "/people/08.png", speech: "이건 바로 장바구니." },
  { src: "/people/09.png", speech: "좋은 음반은 못 지나치지." },
  { src: "/people/10.png", speech: "못 찾겠으면 EZLP." },
  { src: "/people/11.png", speech: "한 번 찾아볼까?" },
  { src: "/people/12.png", speech: "결국 찾았네." },
];

const COLORS = [
  { name: "CLEAR", ko: "클리어 / 투명", bg: "#f4f5f5", fg: "#111" },
  { name: "GOLD", ko: "골드 / 금색", bg: "#dcb52d", fg: "#111" },
  { name: "BURGUNDY", ko: "버건디 / 와인", bg: "#9d001f", fg: "#fff" },
  { name: "GREEN", ko: "그린 / 초록", bg: "#2f8739", fg: "#fff" },
  { name: "MINT", ko: "민트 / 연두", bg: "#8aff8b", fg: "#111" },
  { name: "NAVY", ko: "네이비 / 남색", bg: "#00294d", fg: "#fff" },
  { name: "LAVENDER", ko: "라벤더 / 보라", bg: "#c59dca", fg: "#111" },
  { name: "PINK", ko: "핑크 / 분홍", bg: "#f39abb", fg: "#111" },
];

const CATEGORIES = [
  ["VINYL", "컬러와 아티스트로 찾는 레코드", "/vinyl"],
  ["CD", "한정판과 해외 에디션", "/cd"],
  ["FASHION", "아카이브 패션", "/fashion"],
  ["RARE", "쉽게 만나기 어려운 아이템", "/rare"],
  ["NEW", "새로 들어온 상품", "/new"],
  ["음반 구해주세요", "원하는 LP와 CD를 대신 찾아드려요", "/request"],
];

export default function MobileHome() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((v) => (v + 1) % PEOPLE.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const hero = PEOPLE[index];
  const colorPerson = PEOPLE[(index + 3) % PEOPLE.length];

  return (
    <>
      <div className="ezlp-mobile-home">

        {/* HERO */}
        <section className="ezm-hero">
          <div className="ezm-eyebrow">
            컬러로 찾는 당신의 음악 취향
          </div>

          <div className="ezm-short-line" />

          <h1 className="ezm-hero-title">
            찾기 어려운
            <br />
            취향을, 더 가까이.
          </h1>

          <p className="ezm-description">
            레드, 버건디, 네이비, 민트, 클리어까지.
            <br />
            스플래터와 멀티 컬러로 기억나는
            <br />
            색감의 음반을 찾아보세요.
          </p>

          <strong className="ezm-slogan">
            세상에 못 찾는 음반은 없다!
          </strong>

          <div className="ezm-actions">
            <a href="#mobile-color" className="ezm-button ezm-black">
              색깔로 찾기
            </a>

            <Link href="/request" className="ezm-button ezm-white">
              음반 구해주세요
            </Link>
          </div>

          <div className="ezm-hero-art">
            <div key={hero.src} className="ezm-person ezm-person-in">
              <img src={hero.src} alt="" />
            </div>

            <div className="ezm-bubble">
              {hero.speech}
              <i />
            </div>

            <div className="ezm-counter">
              <b>{index + 1}</b>
              <span>/ 12</span>

              <div className="ezm-dots">
                {Array.from({ length: 6 }).map((_, i) => (
                  <em
                    key={i}
                    className={i === index % 6 ? "active" : ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COLOR */}
        <section id="mobile-color" className="ezm-color">
          <p className="ezm-color-kicker">
            컬러로 찾는 음반
          </p>

          <h2 className="ezm-color-title">
            기억이 안 나면,
            <br />
            <span>색깔로 찾아내기.</span>
          </h2>

          <p className="ezm-color-description">
            레드, 버건디, 네이비, 민트, 클리어부터
            <br />
            스플래터와 멀티 컬러까지. 기억나는 색만으로
            <br />
            원하는 음반을 찾아보세요.
          </p>

          <div className="ezm-color-heading">
            <strong>색깔로 찾아보기</strong>
            <span>{((index + 3) % 12) + 1} / 12　‹　›</span>
          </div>

          <div className="ezm-color-grid">
            {COLORS.map((color) => (
              <Link
                href="/vinyl"
                key={color.name}
                className="ezm-color-card"
                style={{
                  background: color.bg,
                  color: color.fg,
                }}
              >
                <strong>{color.name}</strong>
                <small>{color.ko}</small>
              </Link>
            ))}
          </div>

          <div className="ezm-color-story">
            <div className="ezm-story-copy">
              <strong>✳　색으로도, 취향은 선명해진다.</strong>
              <p>
                기억나는 색, 좋아하는 색으로
                <br />
                당신의 다음 음반을 만나보세요.
              </p>
            </div>

            <div className="ezm-story-person">
              <div
                key={colorPerson.src}
                className="ezm-person ezm-person-in"
              >
                <img src={colorPerson.src} alt="" />
              </div>

              <div className="ezm-story-bubble">
                {colorPerson.speech}
              </div>
            </div>
          </div>

          <Link href="/vinyl" className="ezm-more-colors">
            <span>→　더 많은 컬러 보기</span>
            <span>전체 컬러보기　▦</span>
          </Link>
        </section>

        {/* CATEGORY */}
        <section className="ezm-explore">
          <p className="ezm-section-label">EXPLORE EZLP</p>

          <div className="ezm-category-grid">
            {CATEGORIES.map(([title, description, href], i) => (
              <Link
                href={href}
                key={title}
                className={`ezm-category ${
                  i === CATEGORIES.length - 1 ? "request" : ""
                }`}
              >
                <small>{description}</small>
                <strong>{title}</strong>
                <span>→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="ezm-request">
          <small>CAN'T FIND IT?</small>
          <h2>원하는 명반,<br />대신 찾아드립니다.</h2>
          <p>
            원하는 LP나 CD가 없다면 요청해주세요.
            <br />
            EZLP가 전 세계 매물을 찾아봅니다.
          </p>
          <Link href="/request">
            음반 구해주세요 →
          </Link>
        </section>
      </div>

      <style jsx global>{`
        .ezlp-mobile-home {
          display: none;
        }

        @media (max-width: 768px) {
          html,
          body {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }

          main {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }

          main > :not(.ezlp-mobile-home) {
            display: none !important;
          }

          .ezlp-floating-layer {
            display: none !important;
          }

          .ezlp-mobile-home {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden;
            background: #fff;
            color: #111;
          }

          .ezlp-mobile-home *,
          .ezlp-mobile-home *::before,
          .ezlp-mobile-home *::after {
            box-sizing: border-box;
          }

          .ezlp-mobile-home h1,
          .ezlp-mobile-home h2,
          .ezlp-mobile-home h3,
          .ezlp-mobile-home p,
          .ezlp-mobile-home a,
          .ezlp-mobile-home span,
          .ezlp-mobile-home strong,
          .ezlp-mobile-home small {
            writing-mode: horizontal-tb !important;
            text-orientation: mixed !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
          }

          /* HERO */

          .ezm-hero {
            position: relative;
            min-height: 860px;
            padding: 58px 28px 28px;
          }

          .ezm-eyebrow {
            margin-top: 6px;
            font-size: 13px;
            color: #555;
          }

          .ezm-short-line {
            width: 34px;
            height: 1px;
            margin: 18px 0 33px;
            background: #111;
          }

          .ezm-hero-title {
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;

            font-size: clamp(45px, 13vw, 57px) !important;
            line-height: .98 !important;
            letter-spacing: -.065em !important;

            white-space: normal !important;
          }

          .ezm-description {
            margin: 28px 0 0 !important;
            font-size: 15px !important;
            line-height: 1.75 !important;
            color: #5e5e5e;
          }

          .ezm-slogan {
            display: block;
            margin-top: 28px;
            font-size: 17px;
          }

          .ezm-actions {
            display: flex;
            gap: 10px;
            margin-top: 17px;
          }

          .ezm-button {
            min-height: 48px;
            padding: 0 18px;

            display: inline-flex;
            align-items: center;
            justify-content: center;

            border: 1.5px solid #111;
            text-decoration: none;
            font-size: 14px;
            font-weight: 800;
          }

          .ezm-black {
            background: #111;
            color: #fff;
          }

          .ezm-white {
            background: #fff;
            color: #111;
          }

          .ezm-hero-art {
            position: relative;
            height: 410px;
            margin-top: 5px;
          }

          .ezm-person {
            position: absolute;
          }

          .ezm-person img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: contain;
            filter: drop-shadow(0 13px 24px rgba(0,0,0,.12));
          }

          .ezm-person-in {
            animation: ezmFade .45s ease both;
          }

          .ezm-hero-art > .ezm-person {
            width: 285px;
            right: -36px;
            bottom: -15px;
          }

          .ezm-bubble {
            position: absolute;
            z-index: 2;
            left: 27px;
            bottom: 157px;

            max-width: 205px;
            padding: 12px 16px;

            border-radius: 13px;
            background: #fff;
            box-shadow: 0 8px 30px rgba(0,0,0,.10);

            font-size: 13px;
            font-weight: 700;
            white-space: nowrap;
          }

          .ezm-bubble i {
            position: absolute;
            right: -16px;
            top: 17px;

            width: 0;
            height: 0;

            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-left: 17px solid #fff;
          }

          .ezm-counter {
            position: absolute;
            left: 0;
            bottom: 22px;

            display: flex;
            align-items: center;
            gap: 6px;

            font-size: 18px;
          }

          .ezm-counter span {
            font-size: 13px;
          }

          .ezm-dots {
            display: flex;
            gap: 7px;
            margin-left: 20px;
          }

          .ezm-dots em {
            display: block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #d7d7d7;
          }

          .ezm-dots em.active {
            width: 9px;
            height: 9px;
            background: #111;
          }

          /* COLOR */

          .ezm-color {
            padding: 64px 20px 42px;
          }

          .ezm-color-kicker {
            margin: 0 0 4px !important;
            font-size: 15px !important;
            font-weight: 900;
          }

          .ezm-color-title {
            margin: 0 !important;
            width: 100% !important;

            font-size: clamp(38px, 10.8vw, 48px) !important;
            line-height: 1.04 !important;
            letter-spacing: -.055em !important;
          }

          .ezm-color-title span {
            color: #858585;
          }

          .ezm-color-description {
            margin: 28px 0 42px !important;
            font-size: 12.5px !important;
            line-height: 1.75 !important;
            color: #666;
          }

          .ezm-color-heading {
            display: flex;
            justify-content: space-between;
            align-items: center;

            margin-bottom: 15px;
          }

          .ezm-color-heading strong {
            font-size: 17px;
          }

          .ezm-color-heading span {
            font-size: 13px;
          }

          .ezm-color-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 5px;

            width: 100%;
          }

          .ezm-color-card {
            min-width: 0;
            min-height: 145px;

            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            padding: 15px;

            text-decoration: none;
            border-radius: 2px;
          }

          .ezm-color-card strong {
            font-size: 16px;
            letter-spacing: .02em;
          }

          .ezm-color-card small {
            margin-top: 3px;
            font-size: 12px;
          }

          .ezm-color-story {
            position: relative;
            min-height: 325px;
            margin-top: 35px;
          }

          .ezm-story-copy {
            position: relative;
            z-index: 2;
            padding-top: 13px;
          }

          .ezm-story-copy strong {
            font-size: 15px;
          }

          .ezm-story-copy p {
            margin: 18px 0 0 !important;
            font-size: 13px !important;
            line-height: 1.75 !important;
            color: #666;
          }

          .ezm-story-person {
            position: absolute;
            right: -20px;
            bottom: 0;
            width: 225px;
            height: 285px;
          }

          .ezm-story-person .ezm-person {
            width: 225px;
            right: 0;
            bottom: 0;
          }

          .ezm-story-bubble {
            position: absolute;
            z-index: 3;
            left: -105px;
            top: 105px;

            max-width: 150px;
            padding: 9px 13px;

            border: 1.5px solid #111;
            border-radius: 999px;
            background: #fff;

            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
          }

          .ezm-more-colors {
            min-height: 76px;
            padding: 0 20px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            border-radius: 18px;
            background: #f5f5f3;

            text-decoration: none;
            color: #111;
            font-size: 13px;
            font-weight: 800;
          }

          /* CATEGORY */

          .ezm-explore {
            padding: 70px 20px 80px;
          }

          .ezm-section-label {
            margin: 0 0 16px !important;
            font-size: 10px !important;
            letter-spacing: .15em;
          }

          .ezm-category-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
          }

          .ezm-category {
            position: relative;

            min-width: 0;
            min-height: 155px;
            padding: 17px;

            display: flex;
            flex-direction: column;

            border: 1px solid #e2e2e2;
            text-decoration: none;
            color: #111;
            overflow: hidden;
          }

          .ezm-category small {
            min-height: 38px;
            font-size: 10px;
            line-height: 1.45;
            color: #777;
          }

          .ezm-category strong {
            margin-top: 20px;
            font-size: 24px;
            line-height: 1.04;
          }

          .ezm-category > span {
            position: absolute;
            right: 15px;
            bottom: 14px;
          }

          .ezm-category.request {
            background: #850b29;
            color: #fff;
          }

          .ezm-category.request small {
            color: rgba(255,255,255,.75);
          }

          .ezm-request {
            margin: 0 20px 80px;
            padding: 55px 25px;

            background: #111;
            color: #fff;
          }

          .ezm-request small {
            font-size: 9px;
            letter-spacing: .12em;
          }

          .ezm-request h2 {
            margin: 20px 0 15px !important;
            font-size: 34px !important;
            line-height: 1.04 !important;
          }

          .ezm-request p {
            font-size: 12px !important;
            line-height: 1.7 !important;
            color: #aaa;
          }

          .ezm-request a {
            margin-top: 22px;
            min-height: 44px;
            padding: 0 15px;

            display: inline-flex;
            align-items: center;

            background: #fff;
            color: #111;
            text-decoration: none;

            font-size: 12px;
            font-weight: 800;
          }

          @keyframes ezmFade {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </>
  );
}
