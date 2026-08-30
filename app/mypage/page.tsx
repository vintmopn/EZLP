import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSupabase } from '@/lib/supabase-server';
import LogoutCustomer from './LogoutCustomer';

export const dynamic = 'force-dynamic';

export default async function MyPage() {
  const supabase = await getServerSupabase();
  const { data: authData } = await supabase.auth.getUser();

  if (!authData.user) redirect('/login');

  const user = authData.user;

  const [{ data: profile }, { data: orders }, { data: requests }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('full_name,email,phone,role')
        .eq('id', user.id)
        .maybeSingle(),
      supabase
        .from('orders')
        .select('id,status,total_amount,created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('sourcing_requests')
        .select('id,artist_or_brand,product_name,desired_format,status,created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
    ]);

  return (
    <main className="mypage">
      <section className="mypage-heading">
        <p className="eyebrow">MY EZLP</p>
        <h1>{profile?.full_name || '회원'}님</h1>
        <p>{profile?.email || user.email}</p>
        <LogoutCustomer />
      </section>

      <div className="mypage-menu">
        <Link href="/mypage/orders">
          <span>ORDERS</span>
          <strong>{orders?.length || 0}</strong>
          <p>주문 내역과 배송 상태</p>
        </Link>

        <Link href="/wishlist">
          <span>WISHLIST</span>
          <strong>♡</strong>
          <p>찜한 상품</p>
        </Link>

        <Link href="/mypage/requests">
          <span>REQUESTS</span>
          <strong>{requests?.length || 0}</strong>
          <p>음반 구해주세요 진행 현황</p>
        </Link>

        <Link href="/mypage/addresses">
          <span>ADDRESS</span>
          <strong>→</strong>
          <p>배송지 관리</p>
        </Link>
      </div>

      <section className="my-section">
        <div className="section-title-row">
          <h2>명반 요청 현황</h2>
          <Link href="/request">새 요청하기 →</Link>
        </div>

        {!requests?.length ? (
          <div className="empty-inline">
            아직 요청한 음반이 없습니다.
          </div>
        ) : (
          <div className="request-list">
            {requests.map((request: any) => (
              <div key={request.id} className="request-row">
                <div>
                  <span>{request.desired_format || 'MUSIC'}</span>
                  <h3>{request.product_name}</h3>
                  <p>{request.artist_or_brand}</p>
                </div>
                <strong>{request.status}</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
