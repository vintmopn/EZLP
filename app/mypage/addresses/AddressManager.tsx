"use client";

import { useEffect, useState } from "react";
import { getBrowserSupabase } from "@/lib/supabase-browser";

declare global {
  interface Window {
    daum?: any;
  }
}

export default function AddressManager({
  userId,
  initialAddresses,
}: {
  userId: string;
  initialAddresses: any[];
}) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    recipient_name: "",
    phone: "",
    postal_code: "",
    address_line1: "",
    address_line2: "",
    delivery_note: "",
    is_default: initialAddresses.length === 0,
  });

  useEffect(() => {
    if (document.getElementById("daum-postcode")) return;

    const script = document.createElement("script");
    script.id = "daum-postcode";
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function change(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function searchAddress() {
    if (!window.daum?.Postcode) {
      setMessage("주소 검색 기능을 불러오는 중입니다. 잠시 후 다시 눌러주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete(data: any) {
        let address = data.roadAddress || data.jibunAddress;

        setForm((prev) => ({
          ...prev,
          postal_code: data.zonecode,
          address_line1: address,
        }));

        setTimeout(() => {
          document.getElementById("detail-address")?.focus();
        }, 100);
      },
    }).open();
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!form.postal_code || !form.address_line1) {
      setMessage("도로명주소 검색을 먼저 해주세요.");
      return;
    }

    setSaving(true);

    const supabase = getBrowserSupabase();

    if (form.is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", userId);
    }

    const { data, error } = await supabase
      .from("addresses")
      .insert({
        user_id: userId,
        recipient_name: form.recipient_name,
        phone: form.phone,
        postal_code: form.postal_code,
        address_line1: form.address_line1,
        address_line2: form.address_line2,
        delivery_note: form.delivery_note || null,
        is_default: form.is_default,
      })
      .select()
      .single();

    setSaving(false);

    if (error) {
      setMessage("배송지를 저장하지 못했습니다.");
      return;
    }

    setAddresses((prev) => [
      ...prev.map((a) =>
        form.is_default ? { ...a, is_default: false } : a
      ),
      data,
    ]);

    setForm({
      recipient_name: "",
      phone: "",
      postal_code: "",
      address_line1: "",
      address_line2: "",
      delivery_note: "",
      is_default: false,
    });

    setMessage("배송지가 저장되었습니다.");
  }

  async function remove(id: string) {
    if (!confirm("이 배송지를 삭제할까요?")) return;

    const supabase = getBrowserSupabase();

    const { error } = await supabase
      .from("addresses")
      .delete()
      .eq("id", id);

    if (!error) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
      <form onSubmit={save} style={{ display: "grid", gap: 18 }}>
        <h2>새 배송지</h2>

        <input
          required
          placeholder="받는 분"
          value={form.recipient_name}
          onChange={(e) => change("recipient_name", e.target.value)}
          style={{ padding: 16, border: "1px solid #ddd" }}
        />

        <input
          required
          placeholder="연락처 010-0000-0000"
          value={form.phone}
          onChange={(e) => change("phone", e.target.value)}
          style={{ padding: 16, border: "1px solid #ddd" }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 150px", gap: 8 }}>
          <input
            readOnly
            placeholder="우편번호"
            value={form.postal_code}
            style={{ padding: 16, border: "1px solid #ddd" }}
          />

          <button
            type="button"
            onClick={searchAddress}
            style={{
              border: 0,
              background: "#111",
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            도로명주소 검색
          </button>
        </div>

        <input
          readOnly
          placeholder="기본주소"
          value={form.address_line1}
          style={{
            padding: 16,
            border: "1px solid #ddd",
            background: "#f5f5f5",
          }}
        />

        <input
          id="detail-address"
          required
          placeholder="상세주소 (동, 호수, 건물명)"
          value={form.address_line2}
          onChange={(e) => change("address_line2", e.target.value)}
          style={{ padding: 16, border: "1px solid #ddd" }}
        />

        <select
          value={form.delivery_note}
          onChange={(e) => change("delivery_note", e.target.value)}
          style={{ padding: 16, border: "1px solid #ddd", background: "#fff" }}
        >
          <option value="">배송 요청사항</option>
          <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
          <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
          <option value="배송 전 연락 부탁드립니다">
            배송 전 연락 부탁드립니다
          </option>
          <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={form.is_default}
            onChange={(e) => change("is_default", e.target.checked)}
          />{" "}
          기본 배송지로 저장
        </label>

        {message && <p>{message}</p>}

        <button
          disabled={saving}
          style={{
            minHeight: 56,
            border: 0,
            background: "#111",
            color: "#fff",
            fontWeight: 900,
            cursor: "pointer",
          }}
        >
          {saving ? "저장 중..." : "배송지 저장"}
        </button>
      </form>

      <section>
        <h2>저장된 배송지</h2>

        {addresses.length === 0 ? (
          <p style={{ color: "#777" }}>아직 저장된 배송지가 없습니다.</p>
        ) : (
          addresses.map((a) => (
            <div
              key={a.id}
              style={{
                borderTop: "1px solid #111",
                padding: "22px 0",
                position: "relative",
              }}
            >
              <strong>{a.recipient_name}</strong>
              {a.is_default && (
                <span
                  style={{
                    marginLeft: 10,
                    background: "#6E0F2A",
                    color: "#fff",
                    padding: "4px 7px",
                    fontSize: 10,
                  }}
                >
                  기본 배송지
                </span>
              )}

              <p>{a.phone}</p>
              <p>
                [{a.postal_code}]<br />
                {a.address_line1}<br />
                {a.address_line2}
              </p>

              <button
                type="button"
                onClick={() => remove(a.id)}
                style={{
                  border: 0,
                  background: "none",
                  padding: 0,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
