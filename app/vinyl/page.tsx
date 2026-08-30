import ProductCard from '@/components/ProductCard';
import { getPublishedProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const products = (await getPublishedProducts(50)).filter(p => p.product_type === 'VINYL');

  return <main className="wrap">
    <div className="pageTitle">
      <div className="eyebrow">SHOP</div>
      <h1>LP / 바이닐</h1>
      <p className="muted">판본과 컨디션을 정확하게 확인하세요.</p>
    </div>
    <div className="filters">
      <span className="chip">장르</span><span className="chip">포맷</span>
      <span className="chip">상태</span><span className="chip">프레싱 국가</span>
      <span className="chip">컬러 바이닐</span><span className="chip">예약판매</span>
    </div>
    {products.length
      ? <div className="grid">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>
      : <div className="emptyBox">등록된 LP가 없습니다.</div>}
    <section/>
  </main>;
}
