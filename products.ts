import { getSupabase } from './supabase';

export type StoreProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  retail_price: number;
  product_type: string;
  fulfillment_mode: string;
  is_rare: boolean;
  is_limited: boolean;
  is_preorder: boolean;
  source_country: string | null;
  estimated_shipping_days: string | null;
  vinyl?: {
    artist: string;
    album_title: string;
    label: string | null;
    format: string | null;
    disc_count: number | null;
    vinyl_color: string | null;
    release_year: number | null;
    pressing_country: string | null;
    edition: string | null;
    genre: string | null;
    media_condition: string | null;
    sleeve_condition: string | null;
    tracklist: unknown;
  } | null;
};

export function themeFromColor(color?: string | null) {
  const value = (color || '').toLowerCase();
  if (value.includes('red')) return { accent: '#E5483F', soft: '#FFF0EE', dark: '#781D18' };
  if (value.includes('blue')) return { accent: '#436DE1', soft: '#EEF3FF', dark: '#17327F' };
  if (value.includes('green')) return { accent: '#657A4F', soft: '#F0F4EA', dark: '#2F3B25' };
  if (value.includes('yellow') || value.includes('gold')) return { accent: '#D6A62E', soft: '#FFF8E4', dark: '#725817' };
  if (value.includes('purple') || value.includes('violet')) return { accent: '#7E59B6', soft: '#F6F0FF', dark: '#3D275D' };
  if (value.includes('pink')) return { accent: '#D96C8A', soft: '#FFF0F5', dark: '#73384A' };
  if (value.includes('orange')) return { accent: '#D97835', soft: '#FFF3EA', dark: '#75401D' };
  if (value.includes('white') || value.includes('clear')) return { accent: '#A8A8A0', soft: '#F6F6F2', dark: '#4A4A45' };
  return { accent: '#111111', soft: '#F4F4F1', dark: '#111111' };
}

function normalizeProduct(row: any, vinyl: any): StoreProduct {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle || '',
    description: row.description || '',
    retail_price: Number(row.retail_price || 0),
    product_type: row.product_type,
    fulfillment_mode: row.fulfillment_mode,
    is_rare: !!row.is_rare,
    is_limited: !!row.is_limited,
    is_preorder: !!row.is_preorder,
    source_country: row.source_country,
    estimated_shipping_days: row.estimated_shipping_days,
    vinyl: vinyl || null
  };
}

export async function getPublishedProducts(limit = 12): Promise<StoreProduct[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data: products, error } = await supabase
    .from('products')
    .select('id,slug,title,subtitle,description,retail_price,product_type,fulfillment_mode,is_rare,is_limited,is_preorder,source_country,estimated_shipping_days,published_at')
    .eq('status', 'PUBLISHED')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error || !products?.length) return [];

  const ids = products.map((p: any) => p.id);
  const { data: vinylRows } = await supabase
    .from('vinyl_metadata')
    .select('product_id,artist,album_title,label,format,disc_count,vinyl_color,release_year,pressing_country,edition,genre,media_condition,sleeve_condition,tracklist')
    .in('product_id', ids);

  const vinylById = new Map((vinylRows || []).map((v: any) => [v.product_id, v]));
  return products.map((p: any) => normalizeProduct(p, vinylById.get(p.id)));
}

export async function getProductBySlug(slug: string): Promise<StoreProduct | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: product, error } = await supabase
    .from('products')
    .select('id,slug,title,subtitle,description,retail_price,product_type,fulfillment_mode,is_rare,is_limited,is_preorder,source_country,estimated_shipping_days')
    .eq('status', 'PUBLISHED')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !product) return null;

  const { data: vinyl } = await supabase
    .from('vinyl_metadata')
    .select('product_id,artist,album_title,label,format,disc_count,vinyl_color,release_year,pressing_country,edition,genre,media_condition,sleeve_condition,tracklist')
    .eq('product_id', product.id)
    .maybeSingle();

  return normalizeProduct(product, vinyl);
}

export function formatKRW(value: number) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 }).format(value);
}
