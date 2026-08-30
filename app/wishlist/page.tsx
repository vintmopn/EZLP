import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const supabase = await getServerSupabase();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) redirect("/login");

  const { data: wishlist } = await supabase
    .from("wishlists")
    .select("id")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  let products: any[] = [];

  if (wishlist) {
    const { data: items } = await supabase
      .from("wishlist_items")
      .select("product_id")
      .eq("wishlist_id", wishlist.id);

    const ids = (items || []).map((x: any) => x.product_id);

    if (ids.length) {
      const { data } = await supabase
        .from("products")
        .select("id,slug,title,subtitle,retail_price")
        .in("id", ids)
        .eq("status", "PUBLISHED");

      products = data || [];
    }
  }

  return (
    <main className="utility-page">
      <p className="eyebrow">MY EZLP</p>
      <h1>찜한 상품</h1>

      {products.length === 0 ? (
        <div className="utility-empty">
          <div className="utility-big-icon">♡</div>
          <h2>아직 찜한 상품이 없어요.</h2>
          <p>
            마음에 드는 상품의 하트를 누르면<br />
            이곳에 저장됩니다.
          </p>

          <div className="hero-buttons">
            <Link href="/vinyl" className="dark-button">VINYL 둘러보기</Link>
            <Link href="/cd" className="light-button">CD 둘러보기</Link>
          </div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="product-card"
            >
              <div className="product-image" />

              <div className="product-card-info">
                <div>
                  <p>{product.subtitle}</p>
                  <h3>{product.title}</h3>
                </div>

                <strong>
                  ₩{Number(product.retail_price).toLocaleString()}
                </strong>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
