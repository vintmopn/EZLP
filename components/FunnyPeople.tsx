"use client";

import { useEffect, useState } from "react";

type Bubble = {
  text: string;
  side: "left" | "right";
  y?: number;
};

type Person = {
  src: string;
  left: string;
  top: string;
  size: number;
  rotate: number;
  bubble?: Bubble;
};

type Stage = {
  people: Person[];
};

const stages: Stage[] = [
  // 1. 첫 화면
  {
    people: [
      {
        src: "/people/01.png",
        left: "45%",
        top: "19%",
        size: 390,
        rotate: -3,
        bubble: {
          text: "세상에 나쁜 음반은 없다..",
          side: "right",
          y: 18,
        },
      },
      {
        src: "/people/02.png",
        left: "93%",
        top: "82%",
        size: 350,
        rotate: 3,
        bubble: {
          text: "없으면 찾아달라고 하면 되지.",
          side: "left",
          y: 24,
        },
      },
    ],
  },

  // 2. 색깔로 찾아내기
  {
    people: [
      {
        src: "/people/03.png",
        left: "39%",
        top: "22%",
        size: 390,
        rotate: -3,
        bubble: {
          text: "이 색이었는데… 무슨 앨범이더라?",
          side: "left",
          y: 15,
        },
      },
      {
        src: "/people/04.png",
        left: "35%",
        top: "80%",
        size: 370,
        rotate: 3,
        bubble: {
          text: "색만 기억나도 찾을 수 있지.",
          side: "right",
          y: 30,
        },
      },
    ],
  },

  // 3. 다음 섹션
  {
    people: [
      {
        src: "/people/05.png",
        left: "14%",
        top: "24%",
        size: 370,
        rotate: -3,
        bubble: {
          text: "이건 좀 탐난다.",
          side: "right",
          y: 20,
        },
      },
      {
        src: "/people/06.png",
        left: "91%",
        top: "77%",
        size: 350,
        rotate: 3,
      },
    ],
  },

  // 4. EXPLORE 근처
  {
    people: [
      {
        src: "/people/07.png",
        left: "18%",
        top: "76%",
        size: 400,
        rotate: -3,
      },
      {
        src: "/people/08.png",
        left: "88%",
        top: "22%",
        size: 370,
        rotate: 3,
        bubble: {
          text: "LP도 취향대로.",
          side: "left",
          y: 25,
        },
      },
    ],
  },

  // 5
  {
    people: [
      {
        src: "/people/09.png",
        left: "14%",
        top: "22%",
        size: 370,
        rotate: -3,
        bubble: {
          text: "못 찾겠으면 EZLP.",
          side: "right",
          y: 18,
        },
      },
      {
        src: "/people/10.png",
        left: "90%",
        top: "78%",
        size: 380,
        rotate: 3,
      },
    ],
  },

  // 6. 마지막
  {
    people: [
      {
        src: "/people/11.png",
        left: "16%",
        top: "78%",
        size: 370,
        rotate: -3,
      },
      {
        src: "/people/12.png",
        left: "87%",
        top: "23%",
        size: 380,
        rotate: 3,
        bubble: {
          text: "결국 찾았네.",
          side: "left",
          y: 20,
        },
      },
    ],
  },
];

function PersonBubble({ bubble }: { bubble: Bubble }) {
  const right = bubble.side === "right";

  return (
    <div
      style={{
        position: "absolute",
        top: bubble.y ?? 20,
        ...(right
          ? { left: "calc(100% + 18px)" }
          : { right: "calc(100% + 18px)" }),
        padding: "14px 18px",
        background: "#fff",
        color: "#111",
        border: "2px solid #111",
        borderRadius: "999px",
        fontSize: 15,
        fontWeight: 800,
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        boxShadow: "0 9px 24px rgba(0,0,0,.12)",
      }}
    >
      {bubble.text}

      <span
        style={{
          position: "absolute",
          top: 18,
          width: 14,
          height: 14,
          background: "#fff",
          transform: "rotate(45deg)",
          ...(right
            ? {
                left: -8,
                borderLeft: "2px solid #111",
                borderBottom: "2px solid #111",
              }
            : {
                right: -8,
                borderRight: "2px solid #111",
                borderTop: "2px solid #111",
              }),
        }}
      />
    </div>
  );
}

export default function FunnyPeople() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) {
        setStage(0);
        return;
      }

      const progress = Math.min(
        0.999,
        Math.max(0, window.scrollY / maxScroll)
      );

      setStage(Math.floor(progress * stages.length));
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      key={stage}
      style={{
        position: "fixed",
        top: 70,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
        animation: "ezlpFade .28s ease",
      }}
    >
      {stages[stage].people.map((person) => (
        <div
          key={person.src}
          style={{
            position: "absolute",
            top: person.top,
            left: person.left,
            width: person.size,
            transform: `translate(-50%, -50%) rotate(${person.rotate}deg)`,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "visible",
            }}
          >
            <img
              src={person.src}
              alt=""
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 16px 25px rgba(0,0,0,.15))",
              }}
            />

            {person.bubble && <PersonBubble bubble={person.bubble} />}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes ezlpFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 1150px) {
          div > div {
            max-width: 300px;
          }
        }

        @media (max-width: 800px) {
          div > div:nth-child(2) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
