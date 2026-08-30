import MusicCatalog from '@/components/MusicCatalog';

export default function VinylPage() {
  return (
    <main className="catalog-page">
      <section className="page-intro">
        <p className="eyebrow">EZLP VINYL ARCHIVE</p>
        <h1>VINYL</h1>
        <p>아티스트, 앨범명, 그리고 기억나는 색으로 찾아보세요.</p>
      </section>
      <MusicCatalog type="VINYL" />
    </main>
  );
}
