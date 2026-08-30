"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import ColorFilter from '@/components/ColorFilter';
import { findMusicColor } from '@/lib/music-colors';

type ProductRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  retail_price: number;
  is_rare: boolean;
  is_limited: boolean;
  created_at: string;
  artist?: string;
  album_title?: string;
  color_tags: string[];
  vinyl_color?: string | null;
  theme_color_hex?: string | null;
  image?: string | null;
};

export default function MusicCatalog({ type }: { type: 'VINYL' | 'CD' }) {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState<'artist' | 'album'>('artist');
  const [query, setQuery] = useState('');
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const supabase = getBrowserSupabase();

      const { data: productRows } = await supabase
        .from('products')
        .select('id,slug,title,subtitle,retail_price,is_rare,is_limited,created_at')
        .eq('status', 'PUBLISHED')
        .ilike('product_type', type)
        .order('created_at', { ascending: false });

      const base = productRows || [];
      const ids = base.map(x => x.id);

      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const [{ data: metaRows }, { data: imageRows }] = await Promise.all([
        supabase
          .from('vinyl_metadata')
          .select('product_id,artist,album_title,vinyl_color,color_tags,theme_color_hex,format')
          .in('product_id', ids),
        supabase
          .from('product_images')
          .select('product_id,url,is_cover,sort_order')
          .in('product_id', ids)
          .order('sort_order', { ascending: true }),
      ]);

      const metaMap = new Map((metaRows || []).map((x: any) => [x.product_id, x]));
      const imageMap = new Map<string, string>();

      for (const img of imageRows || []) {
        if (!imageMap.has(img.product_id) || img.is_cover) {
          imageMap.set(img.product_id, img.url);
        }
      }

      setProducts(
        base.map((p: any) => {
          const meta: any = metaMap.get(p.id) || {};
          const fallbackColors = meta.vinyl_color
            ? [String(meta.vinyl_color).toLowerCase().trim()]
            : [];

          return {
            ...p,
            artist: meta.artist || '',
            album_title: meta.album_title || p.title,
            vinyl_color: meta.vinyl_color || null,
            color_tags:
              Array.isArray(meta.color_tags) && meta.color_tags.length
                ? meta.color_tags.map((x: string) => x.toLowerCase())
                : fallbackColors,
            theme_color_hex: meta.theme_color_hex || null,
            image: imageMap.get(p.id) || null,
          };
        })
      );

      setLoading(false);
    }

    load();
  }, [type]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter(product => {
      const searchTarget =
        searchType === 'artist'
          ? product.artist || ''
          : product.album_title || product.title || '';

      const matchesSearch =
        !q || searchTarget.toLowerCase().includes(q);

      const matchesColor =
        colors.length === 0 ||
        colors.some(selected =>
          (product.color_tags || []).some(tag =>
            tag === selected ||
            tag.includes(selected) ||
            selected.includes(tag)
          )
        );

      return matchesSearch && matchesColor;
    });
  }, [products, query, searchType, colors]);

  return (
    <>
      <section className="catalog-search">
        <div className="search-mode">
          <button
            className={searchType === 'artist' ? 'selected' : ''}
            onClick={() => setSearchType('artist')}
          >
            아티스트
          </button>
          <button
            className={searchType === 'album' ? 'selected' : ''}
            onClick={() => setSearchType('album')}
          >
            앨범명
          </button>
        </div>

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={
            searchType === 'artist'
              ? '아티스트를 검색하세요'
              : '앨범명을 검색하세요'
          }
        />
      </section>

      <ColorFilter selected={colors} onChange={setColors} />

      <div className="result-count">
        {loading ? '불러오는 중...' : `${filtered.length} ITEMS`}
      </div>

      {!loading && filtered.length === 0 ? (
        <div className="empty-state">
          <h3>찾는 음반이 아직 없어요.</h3>
          <p>원하는 음반을 알려주시면 EZLP가 대신 찾아드립니다.</p>
          <Link href="/request" className="dark-button">
            명반 구해주기
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(product => {
            const color = findMusicColor(product.color_tags?.[0]);

            return (
              <Link
                href={`/product/${product.slug}`}
                className="product-card"
                key={product.id}
              >
                <div
                  className="product-image"
                  style={{
                    background: product.image
                      ? `url("${product.image}") center/cover`
                      : `linear-gradient(135deg,#f4f4f4,${color.hex})`,
                  }}
                >
                  <div className="card-badges">
                    {product.is_rare && <span>RARE</span>}
                    {product.is_limited && <span>LIMITED</span>}
                  </div>
                </div>

                <div className="product-card-info">
                  <div>
                    <p>{product.artist || product.subtitle}</p>
                    <h3>{product.album_title || product.title}</h3>
                  </div>
                  <strong>₩{Number(product.retail_price).toLocaleString()}</strong>
                </div>

                {product.color_tags?.length > 0 && (
                  <div className="mini-colors">
                    {product.color_tags.slice(0, 5).map(tag => {
                      const c = findMusicColor(tag);
                      return (
                        <span
                          key={tag}
                          title={c.label}
                          style={{ background: c.hex }}
                        />
                      );
                    })}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
