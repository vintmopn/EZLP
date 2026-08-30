import Link from 'next/link';
import { getServerSupabase } from '@/lib/supabase-server';

export default async function SiteHeader() {
  let user = null;

  try {
    const supabase = await getServerSupabase();
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch {}

  return (
    <header className="site-header">
      <Link href="/" className="brand">EZLP</Link>

      <nav className="desktop-nav">
        <Link href="/vinyl">VINYL</Link>
        <Link href="/cd">CD</Link>
        <Link href="/fashion">FASHION</Link>
        <Link href="/rare">RARE</Link>
        <Link href="/new">NEW</Link>
        <Link href="/request" className="request-link">
          음반 구해주세요
        </Link>
      </nav>

      <div className="header-actions">
        {user ? (
          <Link href="/mypage">MY</Link>
        ) : (
          <Link href="/login">로그인</Link>
        )}

        <Link href="/wishlist" aria-label="찜한 상품">
          ♡
        </Link>

        <Link href="/cart">
          장바구니
        </Link>
      </div>
    </header>
  );
}
