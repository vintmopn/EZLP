import Link from 'next/link';

export default function RarePage() {
  return (
    <main className="simple-feature-page">
      <p className="eyebrow">EZLP SELECTED</p>
      <h1>RARE</h1>
      <p>VINYL, CD, FASHION을 가리지 않고 쉽게 만나기 어려운 아이템만 모읍니다.</p>
      <div className="hero-buttons">
        <Link href="/vinyl" className="dark-button">VINYL 보기</Link>
        <Link href="/fashion" className="light-button">FASHION 보기</Link>
      </div>
    </main>
  );
}
