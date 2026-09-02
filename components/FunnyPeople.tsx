"use client";

const people = [
  { src: "/people/01.png", top: "66%", left: "13%", size: 180, rotate: -8 },
  { src: "/people/02.png", top: "83%", left: "10%", size: 190, rotate: -6 },
  { src: "/people/03.png", top: "84%", left: "86%", size: 205, rotate: 8 },
  { src: "/people/04.png", top: "58%", left: "82%", size: 195, rotate: -7 },
  { src: "/people/05.png", top: "18%", left: "78%", size: 175, rotate: 7 },
  { src: "/people/06.png", top: "26%", left: "86%", size: 175, rotate: -5 },
  { src: "/people/07.png", top: "22%", left: "18%", size: 190, rotate: -6 },
  { src: "/people/08.png", top: "86%", left: "56%", size: 195, rotate: 6 },
  { src: "/people/09.png", top: "18%", left: "57%", size: 180, rotate: -8 },
  { src: "/people/10.png", top: "34%", left: "10%", size: 185, rotate: 6 },
  { src: "/people/11.png", top: "41%", left: "88%", size: 180, rotate: -6 },
  { src: "/people/12.png", top: "12%", left: "35%", size: 180, rotate: 5 },
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
              filter: "drop-shadow(0 12px 20px rgba(0,0,0,.14))",
            }}
          />
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          top: "76%",
          left: "28%",
          transform: "translate(-50%, -50%) rotate(-5deg)",
          background: "#fff",
          color: "#111",
          border: "2px solid #111",
          borderRadius: "999px",
          padding: "14px 20px",
          fontSize: 16,
          fontWeight: 800,
          boxShadow: "0 8px 20px rgba(0,0,0,.12)",
          whiteSpace: "nowrap",
        }}
      >
        세상에 못 찾는 음반은 없다..
      </div>
    </div>
  );
}
