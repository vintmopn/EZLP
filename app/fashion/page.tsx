import ProductCard from '@/components/ProductCard';
import { getPublishedProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const products = (await getPublishedProducts(50)).filter(p => p.product_type === 'FASHION');

  return <main className="wrap">
    <div className="pageTitle">
      <div className="eyebrow">SHOP</div>
      <h1>아카이브 패션</h1>
      <p className="muted">선별된 빈티지와 아카이브 제품.</p>
    </div>
    {products.length
      ? <div className="grid">{products.map(product => <ProductCard key={product.id} product={product}/>)}</div>
      : <div className="emptyBox">등록된 패션 상품이 없습니다.</div>}
    <section/>
  </main>;
}
