import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatKRW, getProductBySlug, themeFromColor } from '@/lib/products';

export const dynamic = 'force-dynamic';

function tracklistText(tracklist: unknown) {
  if (!Array.isArray(tracklist)) return null;

  return tracklist.map((side: any) => (
    <div key={side.side} className="trackSide">
      <b>SIDE {side.side}</b>
      {(side.tracks || []).map((track: string) =>
        <span key={track}>{track}</span>
      )}
    </div>
  ));
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);

  if (!p) notFound();

  const vinyl = p.vinyl;
  const theme = themeFromColor(vinyl?.vinyl_color);

  const style = {
    '--product-accent': theme.accent,
    '--product-soft': theme.soft,
    '--product-dark': theme.dark
  } as React.CSSProperties;

  const badge = p.is_rare
    ? '희귀'
    : p.is_preorder
    ? '예약판매'
    : p.is_limited
    ? '한정판'
    : 'EZLP SELECTED';

  const edition =
    p.subtitle ||
    [vinyl?.pressing_country, vinyl?.format, vinyl?.vinyl_color]
      .filter(Boolean)
      .join(' · ');

  const fulfillment =
    p.fulfillment_mode === 'IN_STOCK'
      ? '국내 재고'
      : p.fulfillment_mode === 'PREORDER'
      ? '예약판매'
      : p.fulfillment_mode === 'BACKORDER'
      ? '해외 재고 확보 후 배송'
      : '해외 주문 상품';

  return <main className="productTheme" style={style}>
    <div className="productTopBar">
      <div className="wrap productTopBarIn">
        <Link href="/vinyl">← LP / 바이닐</Link>
        <span>{badge}</span>
      </div>
    </div>

    <section className="productHero">
      <div className="wrap productLayout">

        <div className="productVisual">
          <div className="productCover">
            <div className="productCoverType">
              <small>EZLP SELECTED</small>
              <b>{vinyl?.artist || 'EZLP'}</b>
              <span>{p.title}</span>
            </div>
            {p.product_type === 'VINYL' && <div className="vinylDisc"/>}
          </div>
        </div>

        <div className="productInfo">
          <div className="productBadge">{badge}</div>
          <p className="artistName">{vinyl?.artist || 'EZLP'}</p>
          <h1>{p.title}</h1>
          <p className="edition">{edition}</p>

          <div className="productPrice">{formatKRW(p.retail_price)}</div>

          <div className="fulfillmentBox">
            <b>{fulfillment}</b>
            <span>
              {p.fulfillment_mode === 'IN_STOCK'
                ? '국내 보유 재고에서 출고됩니다.'
                : '주문 후 해외 판매처에서 상품을 확보합니다.'}
            </span>
            <span>
              예상 배송 {p.estimated_shipping_days || '상품별 안내'}
              {p.source_country ? ` · 소싱 국가 ${p.source_country}` : ''}
            </span>
          </div>

          <div className="buyActions">
            <button className="buy secondary">♡ 찜하기</button>
            <button className="buy secondary">장바구니</button>
            <button className="buy primary">구매하기</button>
          </div>
        </div>
      </div>
    </section>

    <section className="productDetails">
      <div className="wrap detailGrid">
        <div>
          <div className="detailLabel">PRESSING INFORMATION</div>
          <h2>판본 정보</h2>
          <p>
            {[vinyl?.release_year, vinyl?.pressing_country, vinyl?.edition,
              vinyl?.format, vinyl?.vinyl_color]
              .filter(Boolean)
              .join(' · ') || '상품별 판본 정보를 확인해주세요.'}
          </p>
          <p>
            미디어 상태 {vinyl?.media_condition || '-'}
            {' · '}
            슬리브 상태 {vinyl?.sleeve_condition || '-'}
          </p>
        </div>

        <div>
          <div className="detailLabel">TRACKLIST</div>
          <h2>트랙리스트</h2>
          <div className="tracklist">
            {tracklistText(vinyl?.tracklist) ||
              <p>트랙리스트 준비 중입니다.</p>}
          </div>
        </div>
      </div>
    </section>
  </main>;
}
