import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSupabase } from '@/lib/supabase-server';
import LogoutButton from './LogoutButton';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await getServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, email')
    .eq('id', user.id)
    .single();

  if (!profile || !['STAFF', 'ADMIN', 'OWNER'].includes(profile.role)) {
    redirect('/admin/login');
  }

  const [products, published, orders, requests] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'PUBLISHED'),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('sourcing_requests').select('*', { count: 'exact', head: true }),
  ]);

  const cards = [
    ['전체 상품', products.count ?? 0],
    ['판매중 상품', published.count ?? 0],
    ['전체 주문', orders.count ?? 0],
    ['소싱 요청', requests.count ?? 0],
  ];

  return (
    <main style={{ padding: '52px 20px 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 20,
            alignItems: 'flex-start',
            marginBottom: 44,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5 }}>
              EZLP OWNER / ADMIN
            </div>

            <h1 style={{ fontSize: 40, margin: '10px 0 8px' }}>
              관리자 홈
            </h1>

            <div style={{ color: '#777' }}>
              {profile.email || user.email} · {profile.role}
            </div>
          </div>

          <LogoutButton />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 12,
            marginBottom: 44,
          }}
        >
          {cards.map(([label, value]) => (
            <div
              key={String(label)}
              style={{
                background: '#f5f5f2',
                padding: 24,
                minHeight: 100,
              }}
            >
              <div style={{ fontSize: 13, marginBottom: 16 }}>{label}</div>
              <strong style={{ fontSize: 30 }}>{value}</strong>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #222', paddingTop: 24 }}>
          <h2 style={{ marginTop: 0 }}>관리 메뉴</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Link
              href="/"
              style={{
                padding: '12px 16px',
                background: '#111',
                color: '#fff',
                textDecoration: 'none',
              }}
            >
              구매자 사이트 보기
            </Link>

            <span
              style={{
                padding: '12px 16px',
                border: '1px solid #ccc',
                color: '#777',
              }}
            >
              상품 관리 — 다음 단계
            </span>

            <span
              style={{
                padding: '12px 16px',
                border: '1px solid #ccc',
                color: '#777',
              }}
            >
              주문 관리 — 다음 단계
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
