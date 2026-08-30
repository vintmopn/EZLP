import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import AddressManager from "./AddressManager";

export const dynamic = "force-dynamic";

export default async function AddressesPage() {
  const supabase = await getServerSupabase();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", data.user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: "7vw", minHeight: "100vh" }}>
      <Link href="/mypage">← MY</Link>

      <p className="eyebrow" style={{ marginTop: 50 }}>MY EZLP</p>

      <h1
        style={{
          fontSize: "clamp(55px,8vw,100px)",
          letterSpacing: "-.07em",
          margin: "10px 0",
        }}
      >
        배송지 관리
      </h1>

      <p style={{ color: "#777", marginBottom: 60 }}>
        도로명주소를 검색하면 우편번호와 기본주소가 자동으로 입력됩니다.
      </p>

      <AddressManager
        userId={data.user.id}
        initialAddresses={addresses || []}
      />
    </main>
  );
}
