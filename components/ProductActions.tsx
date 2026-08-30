"use client";

import { useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase-browser";

export default function ProductActions({
  productId,
  price,
}: {
  productId: string;
  price: number;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  async function getUser() {
    const supabase = getBrowserSupabase();
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login";
      return null;
    }

    return { supabase, user: data.user };
  }

  async function addWishlist() {
    setLoading("wishlist");
    setMessage("");

    const auth = await getUser();
    if (!auth) return;

    const { supabase, user } = auth;

    let { data: wishlist } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!wishlist) {
      const created = await supabase
        .from("wishlists")
        .insert({ user_id: user.id })
        .select("id")
        .single();

      wishlist = created.data;
    }

    if (!wishlist) {
      setMessage("찜 목록을 만들지 못했습니다.");
      setLoading("");
      return;
    }

    const { data: existing } = await supabase
      .from("wishlist_items")
      .select("id")
      .eq("wishlist_id", wishlist.id)
      .eq("product_id", productId)
      .maybeSingle();

    if (existing) {
      setMessage("이미 찜한 상품이에요. ♡");
      setLoading("");
      return;
    }

    const { error } = await supabase
      .from("wishlist_items")
      .insert({
        wishlist_id: wishlist.id,
        product_id: productId,
      });

    setMessage(
      error ? "찜하기에 실패했습니다." : "찜한 상품에 저장했어요. ♡"
    );
    setLoading("");
  }

  async function addCart(goToCart = false) {
    setLoading(goToCart ? "buy" : "cart");
    setMessage("");

    const auth = await getUser();
    if (!auth) return;

    const { supabase, user } = auth;

    const { data: carts } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "ACTIVE")
      .order("created_at", { ascending: false })
      .limit(1);

    let cart = carts?.[0] || null;

    if (!cart) {
      const created = await supabase
        .from("carts")
        .insert({
          user_id: user.id,
          status: "ACTIVE",
        })
        .select("id")
        .single();

      cart = created.data;
    }

    if (!cart) {
      setMessage("장바구니를 만들지 못했습니다.");
      setLoading("");
      return;
    }

    const { data: existing } = await supabase
      .from("cart_items")
      .select("id,quantity")
      .eq("cart_id", cart.id)
      .eq("product_id", productId)
      .is("variant_id", null)
      .limit(1)
      .maybeSingle();

    let error = null;

    if (existing) {
      const result = await supabase
        .from("cart_items")
        .update({
          quantity: Number(existing.quantity) + 1,
          price_snapshot: price,
        })
        .eq("id", existing.id);

      error = result.error;
    } else {
      const result = await supabase
        .from("cart_items")
        .insert({
          cart_id: cart.id,
          product_id: productId,
          quantity: 1,
          price_snapshot: price,
        });

      error = result.error;
    }

    if (error) {
      setMessage("장바구니 담기에 실패했습니다.");
      setLoading("");
      return;
    }

    if (goToCart) {
      window.location.href = "/cart";
      return;
    }

    setMessage("장바구니에 담았어요.");
    setLoading("");
  }

  return (
    <>
      <button
        className="accent-button"
        onClick={() => addCart(false)}
        disabled={!!loading}
      >
        {loading === "cart" ? "담는 중..." : "장바구니 담기"}
      </button>

      <button
        className="outline-buy-button"
        onClick={() => addCart(true)}
        disabled={!!loading}
      >
        {loading === "buy" ? "이동 중..." : "바로 구매"}
      </button>

      <button
        className="wishlist-button"
        onClick={addWishlist}
        disabled={!!loading}
      >
        {loading === "wishlist" ? "저장 중..." : "♡ 찜하기"}
      </button>

      {message && (
        <p style={{ marginTop: 12, fontSize: 12, fontWeight: 700 }}>
          {message}
        </p>
      )}
    </>
  );
}
