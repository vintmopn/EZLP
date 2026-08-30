import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const supabase = await getServerSupabase();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  return (
    <main
      style={{
        width: "min(1180px, calc(100% - 48px))",
        margin: "0 auto",
        padding: "80px 0 120px",
      }}
    >
      <Link href="/cart" style={{ fontSize: 12 }}>
        ← 장바구니
      </Link>

      <p className="eyebrow" style={{ marginTop: 50 }}>
        EZLP CHECKOUT
      </p>

      <h1
        style={{
          fontSize: "clamp(55px,8vw,100px)",
          letterSpacing: "-.07em",
          margin: "10px 0 50px",
        }}
      >
        주문서
      </h1>

      <div
        style={{
          borderTop: "1px solid #111",
          padding: "60px 0",
        }}
      >
        <h2>결제 준비 중</h2>

        <p style={{ color: "#777", lineHeight: 1.7 }}>
          다음 단계에서 주문 상품, 배송지 선택, 주소 검색,
          결제수단과 최종 결제금액을 이 화면에 연결합니다.
        </p>
      </div>
    </main>
  );
}
