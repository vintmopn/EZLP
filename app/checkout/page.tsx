import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const supabase = await getServerSupabase();

  const { data: auth } = await supabase.auth.getUser();

  if (!auth.user) redirect("/login");

  const { data: carts } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", auth.user.id)
    .eq("status", "ACTIVE")
    .order("created_at", { ascending: false })
    .limit(1);

  const cart = carts?.[0];

  if (!cart) redirect("/cart");

  const { data: items } = await supabase
    .from("cart_items")
    .select("id,product_id,quantity,price_snapshot")
    .eq("cart_id", cart.id);

  const ids = (items || []).map(
    (item: any) => item.product_id
  );

  let products: any[] = [];

  if (ids.length) {
    const { data } = await supabase
      .from("products")
      .select("id,slug,title,subtitle")
      .in("id", ids);

    products = data || [];
  }

  const rows = (items || []).map((item: any) => ({
    ...item,
    product:
      products.find(
        (p: any) => p.id === item.product_id
      ) || null,
  }));

  if (!rows.length) redirect("/cart");

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main className="checkout-page">
      <Link href="/cart" className="back-link">
        ← 장바구니
      </Link>

      <p className="eyebrow">EZLP CHECKOUT</p>

      <h1>주문서</h1>

      <CheckoutClient
        rows={rows}
        addresses={addresses || []}
      />
    </main>
  );
}
