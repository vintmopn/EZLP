"use client";

import { useEffect, useState } from "react";

type Person = {
  src: string;
  speech: string;
};

type Slot = {
  left: string;
  top: string;
  size: number;
  rotate: number;
  bubble?: "left" | "right";
};

const PEOPLE: Person[] = [
  { src: "/people/01.png", speech: "세상에 나쁜 음반은 없다.." },
  { src: "/people/02.png", speech: "이건 좀 탐난다." },
  { src: "/people/03.png", speech: "색만 기억나는데.." },
  { src: "/people/04.png", speech: "이건 어디서 구하지?" },
  { src: "/people/05.png", speech: "희귀반이면 더 좋고." },
  { src: "/people/06.png", speech: "취향은 못 참지." },
  { src: "/people/07.png", speech: "이건 저장해둬야겠다." },
  { src: "/people/08.png", speech: "장바구니 각." },
  { src: "/people/09.png", speech: "좋은 음반은 못 지나치지." },
  { src: "/people/10.png", speech: "못 찾겠으면 EZLP." },
  { src: "/people/11.png", speech: "한 번 찾아볼까?" },
  { src: "/people/12.png", speech: "결국 찾았네." },
];

/*
  PC 스크롤 구간별 '빈 공간' 위치.
  사진은 시간마다 바뀌고 위치는 섹션에 맞게 유지.
*/
const LAYOUTS: Slot[][] = [
  [
    { left: "45%", top: "24%", size: 390, rotate: -3, bubble: "right" },
    { left: "90%", top: "77%", size: 345, rotate: 3 },
  ],
  [
    { left: "40%", top: "22%", size: 380, rotate: -3, bubble: "right" },
    { left: "36%", top: "79%", size: 355, rotate: 3 },
  ],
  [
    { left: "14%", top: "25%", size: 355, rotate: -3, bubble: "right" },
    { left: "90%", top: "76%", size: 345, rotate: 3 },
  ],
  [
    { left: "18%", top: "76%", size: 385, rotate: -3 },
    { left: "88%", top: "23%", size: 360, rotate: 3, bubble: "left" },
  ],
  [
    { left: "14%", top: "23%", size: 360, rotate: -3, bubble: "right" },
    { left: "90%", top: "78%", size: 370, rotate: 3 },
  ],
  [
    { left: "17%", top: "77%", size: 360, rotate: -3 },
    { left: "87%", top: "24%", size: 370, rotate: 3, bubble: "left" },
  ],
];

function Bubble({
  text,
  side,
}: {
  text: string;
  side: "left" | "right";
}) {
  const toRight = side === "right";

  return (
    <div
      className="pc-person-bubble"
      style={
        toRight
          ? { left: "calc(100% + 18px)" }
          : { right: "calc(100% + 18px)" }
      }
    >
      {text}
      <span className={toRight ? "tail-right" : "tail-left"} />
    </div>
  );
}

export default function FunnyPeople() {
  const [pairIndex, setPairIndex] = useState(0);
  const [scrollStage, setScrollStage] = useState(0);

  /* 5초마다 다음 두 명 */
  useEffect(() => {
    const timer = window.setInterval(() => {
      setPairIndex((current) => (current + 1) % 6);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  /* 스크롤 위치에 따라 사람 배치 위치만 변경 */
  useEffect(() => {
    const updateStage = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setScrollStage(0);
        return;
      }

      const progress = Math.min(
        0.999,
        Math.max(0, window.scrollY / maxScroll)
      );

      setScrollStage(
        Math.min(
          LAYOUTS.length - 1,
          Math.floor(progress * LAYOUTS.length)
        )
      );
    };

    updateStage();

    window.addEventListener("scroll", updateStage, { passive: true });
    window.addEventListener("resize", updateStage);

    return () => {
      window.removeEventListener("scroll", updateStage);
      window.removeEventListener("resize", updateStage);
    };
  }, []);

  const firstPerson = PEOPLE[pairIndex * 2];
  const secondPerson = PEOPLE[pairIndex * 2 + 1];
  const slots = LAYOUTS[scrollStage];

  return (
    <div
      className="ezlp-desktop-people"
      key={`${pairIndex}-${scrollStage}`}
      aria-hidden="true"
    >
      {[firstPerson, secondPerson].map((person, i) => {
        const slot = slots[i];

        return (
          <div
            key={person.src}
            className="pc-floating-person"
            style={{
              left: slot.left,
              top: slot.top,
              width: slot.size,
              transform: `translate(-50%, -50%) rotate(${slot.rotate}deg)`,
            }}
          >
            <div className="pc-person-inner">
              <img src={person.src} alt="" />

              {slot.bubble && (
                <Bubble
                  text={person.speech}
                  side={slot.bubble}
                />
              )}
            </div>
          </div>
        );
      })}

      <div className="pc-rotation-indicator">
        <b>{pairIndex + 1}</b>
        <span>/ 6</span>

        <div>
          {Array.from({ length: 6 }).map((_, i) => (
            <i
              key={i}
              className={i === pairIndex ? "active" : ""}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .ezlp-desktop-people {
          position: fixed;
          inset: 70px 0 0 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
          animation: pcPeopleFade 0.48s ease both;
        }

        .pc-floating-person {
          position: absolute;
          transform-origin: center;
        }

        .pc-person-inner {
          position: relative;
          width: 100%;
          overflow: visible;
        }

        .pc-person-inner img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(
            0 17px 28px rgba(0, 0, 0, 0.14)
          );
        }

        .pc-person-bubble {
          position: absolute;
          top: 24px;
          padding: 13px 18px;

          background: #fff;
          color: #111;

          border: 1.7px solid #111;
          border-radius: 999px;

          font-size: 14px;
          font-weight: 800;
          line-height: 1.3;
          white-space: nowrap;

          box-shadow: 0 9px 24px rgba(0, 0, 0, 0.1);
        }

        .pc-person-bubble span {
          position: absolute;
          top: 17px;
          width: 13px;
          height: 13px;
          background: #fff;
          transform: rotate(45deg);
        }

        .tail-right {
          left: -7px;
          border-left: 1.7px solid #111;
          border-bottom: 1.7px solid #111;
        }

        .tail-left {
          right: -7px;
          border-top: 1.7px solid #111;
          border-right: 1.7px solid #111;
        }

        .pc-rotation-indicator {
          position: absolute;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%);

          display: flex;
          align-items: center;
          gap: 5px;

          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.78);
          backdrop-filter: blur(8px);

          font-size: 12px;
        }

        .pc-rotation-indicator > div {
          display: flex;
          gap: 5px;
          margin-left: 8px;
        }

        .pc-rotation-indicator i {
          display: block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #cfcfcf;
        }

        .pc-rotation-indicator i.active {
          width: 7px;
          height: 7px;
          background: #111;
        }

        @keyframes pcPeopleFade {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 모바일은 MobileHome만 사용.
           이 컴포넌트는 아예 숨김. */
        @media (max-width: 768px) {
          .ezlp-desktop-people {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
