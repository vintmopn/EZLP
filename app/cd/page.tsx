import MusicCatalog from '@/components/MusicCatalog';

export default function CdPage() {
  return (
    <main className="catalog-page">
      <section className="page-intro">
        <p className="eyebrow">EZLP CD ARCHIVE</p>
        <h1>CD</h1>
        <p>해외판, 한정판, 특별 패키지 CD를 찾아보세요.</p>
      </section>
      <MusicCatalog type="CD" />
    </main>
  );
}
