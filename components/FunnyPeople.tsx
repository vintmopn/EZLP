"use client";

import { useEffect, useState } from "react";

type Bubble = {
  text: string;
  side: "left" | "right";
};

type Person = {
  src: string;
  left: string;
  top: string;
  size: number;
  rotate: number;
  bubble?: Bubble;
};

const desktopStages: Person[][] = [
  [
    {
      src: "/people/01.png",
      left: "45%",
      top: "19%",
      size: 390,
      rotate: -3,
      bubble: { text: "세상에 나쁜 음반은 없다..", side: "right" },
    },
    {
      src: "/people/02.png",
      left: "93%",
      top: "82%",
      size: 350,
      rotate: 3,
    },
  ],
  [
    {
      src: "/people/03.png",
      left: "39%",
      top: "22%",
      size: 390,
      rotate: -3,
      bubble: { text: "이 색이었는데… 무슨 앨범이더라?", side: "left" },
    },
    {
      src: "/people/04.png",
      left: "35%",
      top: "80%",
      size: 370,
      rotate: 3,
    },
  ],
  [
    {
      src: "/people/05.png",
      left: "14%",
      top: "24%",
      size: 370,
      rotate: -3,
      bubble: { text: "이건 좀 탐난다.", side: "right" },
    },
    {
      src: "/people/06.png",
      left: "91%",
      top: "77%",
      size: 350,
      rotate: 3,
    },
  ],
  [
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
      bubble: { text: "LP도 취향대로.", side: "left" },
    },
  ],
  [
    {
      src: "/people/09.png",
      left: "14%",
      top: "22%",
      size: 370,
      rotate: -3,
      bubble: { text: "못 찾겠으면 EZLP.", side: "right" },
    },
    {
      src: "/people/10.png",
      left: "90%",
      top: "78%",
      size: 380,
      rotate: 3,
    },
  ],
  [
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
      bubble: { text: "결국 찾았네.", side: "left" },
    },
  ],
];

/*
  모바일은 PC랑 완전히 별도 배치.
  한 화면에 한 명만 보여서 본문을 방해하지 않게 함.
*/
const mobileStages: Person[][] = [
  [
    {
      src: "/people/01.png",
      left: "76%",
      top: "70%",
      size: 190,
      rotate: 3,
      bubble: { text: "세상에 나쁜 음반은 없다..", side: "left" },
    },
  ],
  [
    {
      src: "/people/03.png",
      left: "77%",
      top: "73%",
      size: 195,
      rotate: -3,
      bubble: { text: "색으로도 찾아보자.", side: "left" },
    },
  ],
  [
    {
      src: "/people/05.png",
      left: "76%",
      top: "72%",
      size: 180,
      rotate: 3,
      bubble: { text: "이건 좀 탐난다.", side: "left" },
    },
  ],
  [
    {
      src: "/people/07.png",
      left: "77%",
      top: "74%",
      size: 190,
      rotate: -3,
    },
  ],
  [
    {
      src: "/people/09.png",
      left: "76%",
      top: "73%",
      size: 185,
      rotate: 3,
      bubble: { text: "못 찾겠으면 EZLP.", side: "left" },
    },
  ],
  [
    {
      src: "/people/12.png",
      left: "76%",
      top: "72%",
      size: 185,
      rotate: -3,
      bubble: { text: "결국 찾았네.", side: "left" },
    },
  ],
];

function PersonBubble({
  bubble,
  mobile,
}: {
  bubble: Bubble;
  mobile: boolean;
}) {
  const right = bubble.side === "right";

  return (
    <div
      className="ezlp-person-speech"
      style={{
        ...(right
          ? { left: "calc(100% + 14px)" }
          : { right: "calc(100% + 14px)" }),
        top: mobile ? 8 : 18,
      }}
    >
      {bubble.text}
      <span
        className={right ? "speech-tail-right" : "speech-tail-left"}
      />
    </div>
  );
}

export default function FunnyPeople() {
  const [stage, setStage] = useState(0);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth <= 768;
      setMobile(isMobile);

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

      setStage(Math.floor(progress * 6));
    };

    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const current = mobile
    ? mobileStages[stage]
    : desktopStages[stage];

  return (
    <div className={`ezlp-floating-layer ${mobile ? "mobile" : "desktop"}`}>
      {current.map((person) => (
        <div
          key={person.src}
          className="ezlp-floating-person"
          style={{
            top: person.top,
            left: person.left,
            width: person.size,
            transform: `translate(-50%, -50%) rotate(${person.rotate}deg)`,
          }}
        >
          <div className="ezlp-person-inner">
            <img src={person.src} alt="" />

            {person.bubble && (
              <PersonBubble bubble={person.bubble} mobile={mobile} />
            )}
          </div>
        </div>
      ))}

      <style jsx>{`
        .ezlp-floating-layer {
          position: fixed;
          top: 72px;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .ezlp-floating-person {
          position: absolute;
        }

        .ezlp-person-inner {
          position: relative;
          width: 100%;
          overflow: visible;
        }

        .ezlp-person-inner img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 13px 22px rgba(0,0,0,.14));
        }

        .ezlp-person-speech {
          position: absolute;
          padding: 11px 14px;
          background: #fff;
          color: #111;
          border: 2px solid #111;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.3;
          white-space: nowrap;
          box-shadow: 0 8px 20px rgba(0,0,0,.1);
        }

        .ezlp-person-speech span {
          position: absolute;
          top: 17px;
          width: 12px;
          height: 12px;
          background: #fff;
          transform: rotate(45deg);
        }

        .speech-tail-right {
          left: -7px;
          border-left: 2px solid #111;
          border-bottom: 2px solid #111;
        }

        .speech-tail-left {
          right: -7px;
          border-right: 2px solid #111;
          border-top: 2px solid #111;
        }

        @media (max-width: 768px) {
          .ezlp-floating-layer {
            top: 86px;
          }

          .ezlp-person-speech {
            max-width: 150px;
            white-space: normal;
            text-align: center;
            font-size: 11px;
            padding: 8px 11px;
          }
        }
      `}</style>
    </div>
  );
}
