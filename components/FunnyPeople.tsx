"use client";

import { useEffect, useState } from "react";

type Person = {
  src: string;
  left: string;
  top: string;
  size: number;
  rotate: number;
};

type Stage = {
  people: Person[];
  bubble?: {
    text: string;
    left: string;
    top: string;
    rotate: number;
  };
};

const stages: Stage[] = [
  // 1 — 첫 화면
  {
    people: [
      {
        src: "/people/01.png",
        left: "47%",
        top: "31%",
        size: 500,
        rotate: -4,
      },
      {
        src: "/people/02.png",
        left: "82%",
        top: "72%",
        size: 430,
        rotate: 4,
      },
    ],
    bubble: {
      text: "세상에 나쁜 음반은 없다..",
      left: "67%",
      top: "22%",
      rotate: -4,
    },
  },

  // 2 — 색깔로 찾아내기
  {
    people: [
      {
        src: "/people/03.png",
        left: "41%",
        top: "24%",
        size: 500,
        rotate: -3,
      },
      {
        src: "/people/04.png",
        left: "41%",
        top: "79%",
        size: 470,
        rotate: 4,
      },
    ],
    bubble: {
      text: "이 색이었는데… 무슨 앨범이더라?",
      left: "68%",
      top: "76%",
      rotate: 3,
    },
  },

  // 3
  {
    people: [
      {
        src: "/people/05.png",
        left: "17%",
        top: "25%",
        size: 430,
        rotate: -5,
      },
      {
        src: "/people/06.png",
        left: "82%",
        top: "73%",
        size: 440,
        rotate: 4,
      },
    ],
  },

  // 4
  {
    people: [
      {
        src: "/people/07.png",
        left: "70%",
        top: "32%",
        size: 520,
        rotate: -3,
      },
      {
        src: "/people/08.png",
        left: "87%",
        top: "76%",
        size: 470,
        rotate: 4,
      },
    ],
    bubble: {
      text: "없으면 EZLP가 찾아주면 되지.",
      left: "48%",
      top: "67%",
      rotate: -3,
    },
  },

  // 5
  {
    people: [
      {
        src: "/people/09.png",
        left: "21%",
        top: "30%",
        size: 460,
        rotate: -4,
      },
      {
        src: "/people/10.png",
        left: "77%",
        top: "70%",
        size: 500,
        rotate: 4,
      },
    ],
  },

  // 6 — 마지막
  {
    people: [
      {
        src: "/people/11.png",
        left: "73%",
        top: "30%",
        size: 470,
        rotate: -4,
      },
      {
        src: "/people/12.png",
        left: "27%",
        top: "73%",
        size: 480,
        rotate: 4,
      },
    ],
    bubble: {
      text: "결국 찾았네.",
      left: "54%",
      top: "34%",
      rotate: 3,
    },
  },
];

export default function FunnyPeople() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const updateStage = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setStage(0);
        return;
      }

      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / maxScroll)
      );

      const nextStage = Math.min(
        stages.length - 1,
        Math.floor(progress * stages.length)
      );

      setStage(nextStage);
    };

    updateStage();

    window.addEventListener("scroll", updateStage, { passive: true });
    window.addEventListener("resize", updateStage);

    return () => {
      window.removeEventListener("scroll", updateStage);
      window.removeEventListener("resize", updateStage);
    };
  }, []);

  const current = stages[stage];

  return (
    <>
      <div className="ezlp-floating-people" key={stage}>
        {current.people.map((person) => (
          <div
            key={person.src}
            className="ezlp-floating-person"
            style={{
              left: person.left,
              top: person.top,
              width: person.size,
              transform: `translate(-50%, -50%) rotate(${person.rotate}deg)`,
            }}
          >
            <img src={person.src} alt="" />
          </div>
        ))}

        {current.bubble && (
          <div
            className="ezlp-floating-bubble"
            style={{
              left: current.bubble.left,
              top: current.bubble.top,
              transform: `translate(-50%, -50%) rotate(${current.bubble.rotate}deg)`,
            }}
          >
            {current.bubble.text}
            <span />
          </div>
        )}
      </div>

      <style jsx>{`
        .ezlp-floating-people {
          position: fixed;
          left: 0;
          right: 0;
          top: 70px;
          bottom: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
          animation: stageIn 0.4s ease both;
        }

        .ezlp-floating-person {
          position: absolute;
          transform-origin: center center;
        }

        .ezlp-floating-person img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(
            0 18px 25px rgba(0, 0, 0, 0.15)
          );
        }

        .ezlp-floating-person:nth-child(1) {
          animation: floatOne 5s ease-in-out infinite;
        }

        .ezlp-floating-person:nth-child(2) {
          animation: floatTwo 5.8s ease-in-out infinite;
        }

        .ezlp-floating-bubble {
          position: absolute;
          padding: 18px 25px;
          background: white;
          color: #111;
          border: 2px solid #111;
          border-radius: 999px;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.3;
          white-space: nowrap;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.11);
        }

        .ezlp-floating-bubble span {
          position: absolute;
          width: 23px;
          height: 23px;
          left: 34px;
          bottom: -13px;
          background: white;
          border-right: 2px solid #111;
          border-bottom: 2px solid #111;
          transform: rotate(45deg);
        }

        @keyframes stageIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes floatOne {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: -9px;
          }
        }

        @keyframes floatTwo {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: 8px;
          }
        }

        @media (max-width: 1200px) {
          .ezlp-floating-person {
            width: 330px !important;
          }

          .ezlp-floating-bubble {
            font-size: 15px;
          }
        }

        @media (max-width: 800px) {
          .ezlp-floating-person {
            width: 210px !important;
          }

          .ezlp-floating-person:nth-child(2) {
            display: none;
          }

          .ezlp-floating-bubble {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
