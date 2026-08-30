import Link from 'next/link';

export default function NewPage() {
  return (
    <main className="simple-feature-page">
      <p className="eyebrow">JUST ARRIVED</p>
      <h1>NEW</h1>
      <p>EZLP에 새로 들어온 아이템을 가장 먼저 만나보세요.</p>
      <div className="hero-buttons">
        <Link href="/vinyl" className="dark-button">VINYL</Link>
        <Link href="/cd" className="light-button">CD</Link>
      </div>
    </main>
  );
}
