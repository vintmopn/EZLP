import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getPublishedProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getPublishedProducts(12);

  return <main>
    <div className="hero">
      <div className="wrap">
        <div className="eyebrow">VINYL · ARCHIVE · GLOBAL SOURCING</div>
        <h1>찾기 어려운 것들을,<br/>전 세계에서.</h1>
        <p>해외 한정 LP부터 아카이브 패션까지. 한국에서 구하기 어려운 상품을 더 쉽고 정확하게 만나보세요.</p>
        <div className="btns">
          <Link className="btn primary" href="/vinyl">신상품 보기</Link>
          <Link className="btn" href="/request">상품 찾아주세요</Link>
        </div>
      </div>
    </div>

    <section>
      <div className="wrap">
        <div className="sectionTitle">
          <h2>새로 들어왔어요</h2>
          <span className="muted">실시간 상품</span>
        </div>

        {products.length ? (
          <div className="grid">
            {products.map(product =>
              <ProductCard key={product.id} product={product} />
            )}
          </div>
        ) : (
          <div className="emptyBox">
            <b>아직 등록된 상품이 없습니다.</b>
            <span>관리자에서 상품을 게시하면 여기에 자동으로 표시됩니다.</span>
          </div>
        )}
      </div>
    </section>

    <section className="softSection">
      <div className="wrap">
        <div className="banner">
          <div>
            <div className="eyebrow">FIND IT FOR ME</div>
            <h2>한국에서 찾기 힘든 상품인가요?</h2>
            <p className="muted">사진이나 링크를 보내주세요. 해외 판매처에서 대신 찾아드립니다.</p>
          </div>
          <Link className="btn primary" href="/request">상품 찾아주세요</Link>
        </div>
      </div>
    </section>
  </main>;
}
