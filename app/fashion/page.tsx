import Link from 'next/link';

const categories = [
  ['SHOES', '신발'],
  ['ACCESSORIES', '액세서리'],
  ['TOPS', '상의'],
  ['BOTTOMS', '하의'],
  ['RARE', '레어'],
];

export default function FashionPage() {
  return (
    <main className="catalog-page">
      <section className="page-intro">
        <p className="eyebrow">EZLP ARCHIVE FASHION</p>
        <h1>FASHION</h1>
        <p>전 세계에서 발견한 아카이브 패션과 희귀 아이템.</p>
      </section>

      <div className="fashion-category-grid">
        {categories.map(([en, ko]) => (
          <Link
            key={en}
            href={`/fashion?category=${en.toLowerCase()}`}
            className="fashion-category"
          >
            <span>{ko}</span>
            <strong>{en}</strong>
            <b>→</b>
          </Link>
        ))}
      </div>
    </main>
  );
}
