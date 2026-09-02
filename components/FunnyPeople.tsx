"use client";

const people = [
  /* 1번째 스크롤 */
  { src: "/people/01.png", top: "18vh", left: "58%", size: 300, rotate: 4 },
  { src: "/people/02.png", top: "72vh", left: "84%", size: 280, rotate: -4 },

  /* 2번째 스크롤 */
  { src: "/people/03.png", top: "118vh", left: "51%", size: 310, rotate: -3 },
  { src: "/people/04.png", top: "165vh", left: "81%", size: 275, rotate: 4 },

  /* 3번째 스크롤 */
  { src: "/people/05.png", top: "215vh", left: "45%", size: 305, rotate: -4 },
  { src: "/people/06.png", top: "264vh", left: "82%", size: 285, rotate: 3 },

  /* 4번째 스크롤 */
  { src: "/people/07.png", top: "318vh", left: "56%", size: 330, rotate: 3 },
  { src: "/people/08.png", top: "365vh", left: "20%", size: 300, rotate: -4 },

  /* 5번째 스크롤 */
  { src: "/people/09.png", top: "414vh", left: "75%", size: 300, rotate: 4 },
  { src: "/people/10.png", top: "465vh", left: "39%", size: 315, rotate: -4 },

  /* 6번째 스크롤 */
  { src: "/people/11.png", top: "515vh", left: "79%", size: 295, rotate: 3 },
  { src: "/people/12.png", top: "565vh", left: "23%", size: 305, rotate: -4 },
];

const bubbles = [
  {
    text: "세상에 나쁜 음반은 없다..",
    top: "43vh",
    left: "68%",
    rotate: -4,
  },
  {
    text: "이 색이었는데… 무슨 앨범이더라?",
    top: "230vh",
    left: "62%",
    rotate: 3,
  },
  {
    text: "못 찾겠으면 EZLP한테 구해달라고 하자.",
    top: "430vh",
    left: "49%",
    rotate: -3,
  },
];

export default function FunnyPeople() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {people.map((person, i) => (
        <div
          key={person.src}
          className="ezlp-person-cutout"
          style={{
            position: "absolute",
            top: person.top,
            left: person.left,
            width: person.size,
            transform: `translate(-50%, -50%) rotate(${person.rotate}deg)`,
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
              filter:
                "drop-shadow(0 15px 18px rgba(0,0,0,.13))",
            }}
          />
        </div>
      ))}

      {bubbles.map((bubble, i) => (
        <div
          key={i}
          className="ezlp-person-bubble"
          style={{
            position: "absolute",
            top: bubble.top,
            left: bubble.left,
            transform: `translate(-50%, -50%) rotate(${bubble.rotate}deg)`,
          }}
        >
          {bubble.text}

          <span
            style={{
              position: "absolute",
              left: 34,
              bottom: -14,
              width: 25,
              height: 25,
              background: "#fff",
              borderRight: "2px solid #111",
              borderBottom: "2px solid #111",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      ))}

      <style jsx>{`
        .ezlp-person-cutout {
          transition: transform 0.25s ease;
        }

        .ezlp-person-bubble {
          max-width: 310px;
          padding: 18px 24px;
          background: #fff;
          color: #111;
          border: 2px solid #111;
          border-radius: 999px;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.45;
          text-align: center;
          white-space: nowrap;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 1100px) {
          .ezlp-person-cutout {
            width: 210px !important;
          }

          .ezlp-person-bubble {
            font-size: 14px;
            padding: 13px 17px;
          }
        }

        @media (max-width: 700px) {
          .ezlp-person-cutout {
            width: 145px !important;
          }

          .ezlp-person-cutout:nth-of-type(even) {
            display: none;
          }

          .ezlp-person-bubble {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
