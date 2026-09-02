"use client";

import { useEffect, useState } from "react";

type Person = {
  src: string;
  speech: string;
};

type Layout = {
  left: string;
  top: string;
  size: number;
  rotate: number;
  bubbleSide?: "left" | "right";
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


function shuffleIndexes(length: number) {
  const result = Array.from({ length }, (_, i) => i);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/*
  스크롤 위치별 PC 빈 공간.
  사람은 한 명만 나오고, 위치만 섹션에 맞춰 변경.
*/
const LAYOUTS: Layout[] = [
  {
    left: "40%",
    top: "49%",
    size: 330,
    rotate: -2,
  },
  {
    left: "42%",
    top: "31%",
    size: 420,
    rotate: 2,
    bubbleSide: "right",
  },
  {
    left: "83%",
    top: "66%",
    size: 420,
    rotate: -2,
    bubbleSide: "left",
  },
  {
    left: "23%",
    top: "67%",
    size: 440,
    rotate: 2,
    bubbleSide: "right",
  },
  {
    left: "80%",
    top: "31%",
    size: 425,
    rotate: -2,
    bubbleSide: "left",
  },
  {
    left: "25%",
    top: "68%",
    size: 425,
    rotate: 2,
    bubbleSide: "right",
  },
];

export default function FunnyPeople() {
  const [personIndex, setPersonIndex] = useState(0);
  const [randomOrder, setRandomOrder] = useState<number[]>(
    PEOPLE.map((_, i) => i)
  );
  const [sectionIndex, setSectionIndex] = useState(0);

  // PC: 12명을 랜덤 순서로 한 번씩 보여준 뒤 다시 섞음
  useEffect(() => {
    setRandomOrder(shuffleIndexes(PEOPLE.length));

    const timer = window.setInterval(() => {
      setPersonIndex((current) => {
        const next = current + 1;

        if (next >= PEOPLE.length) {
          setRandomOrder(shuffleIndexes(PEOPLE.length));
          return 0;
        }

        return next;
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  // 스크롤 위치에 따라 빈 공간 위치 변경
  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setSectionIndex(0);
        return;
      }

      const progress = Math.min(
        0.999,
        Math.max(0, window.scrollY / maxScroll)
      );

      setSectionIndex(
        Math.min(
          LAYOUTS.length - 1,
          Math.floor(progress * LAYOUTS.length)
        )
      );
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const person = PEOPLE[randomOrder[personIndex] ?? personIndex];
  const layout = LAYOUTS[sectionIndex];
  const bubbleRight = layout.bubbleSide === "right";

  return (
    <div
      className="ezlp-pc-character-layer"
      aria-hidden="true"
    >
      <div
        key={`${personIndex}-${sectionIndex}`}
        className="ezlp-pc-character"
        style={{
          left: layout.left,
          top: layout.top,
          width: layout.size,
          transform: `translate(-50%, -50%) rotate(${layout.rotate}deg)`,
        }}
      >
        <div className="ezlp-pc-character-inner">
          <img src={person.src} alt="" />

          {layout.bubbleSide && (
            <div
              className="ezlp-pc-bubble"
              style={
                bubbleRight
                  ? { left: "calc(100% + 26px)" }
                  : { right: "calc(100% + 26px)" }
              }
            >
              {person.speech}

              <span
                className={
                  bubbleRight
                    ? "ezlp-tail-right"
                    : "ezlp-tail-left"
                }
              />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ezlp-pc-character-layer {
          position: fixed;
          inset: 70px 0 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .ezlp-pc-character {
          position: absolute;
          animation: ezlpCharacterIn 0.45s ease both;
        }

        .ezlp-pc-character-inner {
          position: relative;
          width: 100%;
          overflow: visible;
        }

        .ezlp-pc-character img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(
            0 18px 28px rgba(0, 0, 0, 0.13)
          );
        }

        .ezlp-pc-bubble {
          position: absolute;
          top: 42px;

          min-width: 170px;
          max-width: 280px;
          padding: 15px 21px;

          background: #fff;
          color: #111;

          border: 2px solid #111;
          border-radius: 999px;

          font-size: 15px;
          font-weight: 800;
          line-height: 1.35;
          text-align: center;
          white-space: nowrap;

          box-shadow:
            0 10px 28px rgba(0, 0, 0, 0.10);
        }

        .ezlp-pc-bubble span {
          position: absolute;
          top: 23px;

          width: 18px;
          height: 18px;

          background: #fff;
          transform: rotate(45deg);
        }

        .ezlp-tail-right {
          left: -10px;

          border-left: 2px solid #111;
          border-bottom: 2px solid #111;
        }

        .ezlp-tail-left {
          right: -10px;

          border-right: 2px solid #111;
          border-top: 2px solid #111;
        }

        @keyframes ezlpCharacterIn {
          from {
            opacity: 0;
            transform:
              translate(-50%, calc(-50% + 10px))
              rotate(0deg);
          }

          to {
            opacity: 1;
          }
        }

        /* 모바일은 지금 완성된 MobileHome 그대로 사용 */
        @media (max-width: 768px) {
          .ezlp-pc-character-layer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
