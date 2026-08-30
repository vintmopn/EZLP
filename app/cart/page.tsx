import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const supabase = await getServerSupabase();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) redirect("/login");

  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", auth.user.id)
    .eq("status", "ACTIVE")
    .maybeSingle();

  let rows: any[] = [];

  if (cart) {
    const { data: items } = await supabase
      .from("cart_items")
      .select("id,product_id,quantity,price_snapshot")
      .eq("cart_id", cart.id);

    const ids = (items || []).map((x: any) => x.product_id);

    if (ids.length) {
      const { data: products } = await supabase
        .from("products")
        .select("id,slug,title,subtitle,retail_price")
        .in("id", ids);

      rows = (items || []).map((item: any) => ({
        ...item,
        product: (products || []).find(
          (p: any) => p.id === item.product_id
        ),
      }));
    }
  }

  const total = rows.reduce(
    (sum, row) =>
      sum + Number(row.price_snapshot || 0) * Number(row.quantity || 1),
    0
  );

  return (
    <main className="utility-page">
      <p className="eyebrow">EZLP CART</p>
      <h1>장바구니</h1>

      {rows.length === 0 ? (
        <div className="utility-empty">
          <h2>장바구니가 비어 있어요.</h2>

          <p>
            원하는 바이닐, CD 또는 패션 아이템을<br />
            장바구니에 담아보세요.
          </p>

          <Link href="/new" className="dark-button">
            신상품 보기
          </Link>
        </div>
      ) : (
        <>
          <div style={{ borderTop: "1px solid #111" }}>
            {rows.map(row => (
              <Link
                key={row.id}
                href={`/product/${row.product?.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  padding: "28px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div>
                  <p style={{ color: "#777", margin: 0 }}>
                    {row.product?.subtitle}
                  </p>

                  <h3>{row.product?.title}</h3>

                  <span>수량 {row.quantity}</span>
                </div>

                <strong>
                  ₩{(
                    Number(row.price_snapshot) *
                    Number(row.quantity)
                  ).toLocaleString()}
                </strong>
              </Link>
            ))}
          </div>

          <div
            style={{
              marginTop: 45,
              borderTop: "1px solid #111",
              paddingTop: 25,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>총 상품금액</strong>

            <strong style={{ fontSize: 30 }}>
              ₩{total.toLocaleString()}
            </strong>
          </div>

          <Link
            href="/checkout"
            style={{
              width: "100%",
              height: 60,
              border: 0,
              background: "#111",
              color: "#fff",
              fontWeight: 900,
              marginTop: 25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            주문하기
          </Link>
        </>
      )}
    </main>
  );
}
