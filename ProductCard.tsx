import Link from 'next/link';
import type { StoreProduct } from '@/lib/products';
import { formatKRW, themeFromColor } from '@/lib/products';

export default function ProductCard({ product }: { product: StoreProduct }) {
  const theme = themeFromColor(product.vinyl?.vinyl_color);
  const artist = product.vinyl?.artist;
  const title = artist ? `${artist} — ${product.title}` : product.title;
  const subtitle = product.subtitle || [product.vinyl?.pressing_country, product.vinyl?.format, product.vinyl?.vinyl_color].filter(Boolean).join(' · ');
  const badge = product.is_rare ? '희귀' : product.is_preorder ? '예약판매' : product.is_limited ? '한정판' : '신상품';

  return (
    <Link className="card" href={`/product/${product.slug}`}>
      <div className={`art ${product.product_type === 'FASHION' ? 'fashion' : ''}`} style={{ '--cover-accent': theme.accent } as React.CSSProperties}>
        {product.product_type === 'VINYL' && <div className="coverDisc" />}
        <span className="badge">{badge}</span>
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <p className="price">{formatKRW(product.retail_price)}</p>
    </Link>
  );
}
