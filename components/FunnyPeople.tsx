const people = [
  { src: "/people/01.png", top: "7%", left: "2%", size: 115, rotate: -7 },
  { src: "/people/02.png", top: "8%", right: "3%", size: 120, rotate: 6 },
  { src: "/people/03.png", top: "28%", left: "1%", size: 108, rotate: -5 },
  { src: "/people/04.png", top: "25%", right: "2%", size: 112, rotate: 7 },
  { src: "/people/05.png", top: "47%", left: "3%", size: 120, rotate: 5 },
  { src: "/people/06.png", top: "51%", right: "4%", size: 125, rotate: -6 },
  { src: "/people/07.png", top: "66%", left: "2%", size: 110, rotate: -4 },
  { src: "/people/08.png", top: "69%", right: "2%", size: 112, rotate: 7 },
  { src: "/people/09.png", top: "82%", left: "9%", size: 118, rotate: -7 },
  { src: "/people/10.png", top: "83%", right: "10%", size: 112, rotate: 5 },
  { src: "/people/11.png", top: "39%", left: "12%", size: 95, rotate: 4 },
  { src: "/people/12.png", top: "38%", right: "13%", size: 98, rotate: -5 },
];

export default function FunnyPeople() {
  return (
    <div className="funny-people-layer">
      {people.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt=""
          className={`funny-person funny-person-${i + 1}`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}

      <div className="funny-speech">
        세상에 나쁜 음반은 없다..
      </div>
    </div>
  );
}
