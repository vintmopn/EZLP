import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { findMusicColor } from '@/lib/music-colors';

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = getSupabase();

  if (!supabase) notFound();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .maybeSingle();

  if (!product) notFound();

  const [{ data: meta }, { data: images }] = await Promise.all([
    supabase
      .from('vinyl_metadata')
      .select('*')
      .eq('product_id', product.id)
      .maybeSingle(),
    supabase
      .from('product_images')
      .select('*')
      .eq('product_id', product.id)
      .order('sort_order', { ascending: true }),
  ]);

  const tags =
    meta?.color_tags?.length
      ? meta.color_tags
      : meta?.vinyl_color
        ? [String(meta.vinyl_color).toLowerCase()]
        : ['black'];

  const palette = findMusicColor(tags[0]);

  const accent =
    meta?.theme_color_hex ||
    (palette.hex.startsWith('#') ? palette.hex : '#111111');

  const cover = images?.find((x: any) => x.is_cover)?.url || images?.[0]?.url;

  return (
    <main
      className="product-detail-page"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <Link href={product.product_type === 'CD' ? '/cd' : '/vinyl'} className="back-link">
        ← BACK
      </Link>

      <div className="product-detail-grid">
        <div
          className="detail-art"
          style={{
            background: cover
              ? `url("${cover}") center/cover`
              : palette.hex,
          }}
        >
          {!cover && <span>{meta?.album_title || product.title}</span>}
        </div>

        <div className="detail-info">
          <p className="eyebrow">
            {product.product_type} · {product.is_rare ? 'RARE' : 'EZLP ARCHIVE'}
          </p>

          <h1>{meta?.album_title || product.title}</h1>
          <h2>{meta?.artist || product.subtitle}</h2>

          <div className="detail-color-tags">
            {tags.map((tag: string) => {
              const c = findMusicColor(tag);
              return (
                <span
                  key={tag}
                  style={{ background: c.hex, color: c.text }}
                >
                  {c.label}
                </span>
              );
            })}
          </div>

          <div className="detail-specs">
            {meta?.edition && <p><span>EDITION</span>{meta.edition}</p>}
            {meta?.pressing_country && <p><span>PRESSING</span>{meta.pressing_country}</p>}
            {meta?.release_year && <p><span>YEAR</span>{meta.release_year}</p>}
            {meta?.media_condition && <p><span>CONDITION</span>{meta.media_condition}</p>}
          </div>

          <div className="detail-buy">
            <strong>₩{Number(product.retail_price).toLocaleString()}</strong>
            <p>
              {product.stock_quantity > 0
                ? `재고 ${product.stock_quantity}개`
                : '재고 및 배송 가능 여부 확인'}
            </p>

            <button className="accent-button">장바구니 담기</button>
            <button className="outline-buy-button">바로 구매</button>
            <button className="wishlist-button">♡ 찜하기</button>
          </div>
        </div>
      </div>
    </main>
  );
}
