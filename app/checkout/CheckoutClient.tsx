"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type CartRow = {
  id: string;
  quantity: number;
  price_snapshot: number;
  product: {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
  } | null;
};

type Address = {
  id: string;
  recipient_name: string;
  phone: string;
  postal_code: string;
  address_line1: string;
  address_line2: string | null;
  delivery_note: string | null;
  is_default: boolean;
};

const paymentMethods = [
  ["CARD", "신용/체크카드"],
  ["KAKAOPAY", "카카오페이"],
  ["NAVERPAY", "네이버페이"],
  ["TOSSPAY", "토스페이"],
  ["TRANSFER", "계좌이체"],
  ["VIRTUAL_ACCOUNT", "가상계좌"],
];

export default function CheckoutClient({
  rows,
  addresses,
}: {
  rows: CartRow[];
  addresses: Address[];
}) {
  const firstAddress =
    addresses.find((a) => a.is_default)?.id ||
    addresses[0]?.id ||
    "";

  const [addressId, setAddressId] = useState(firstAddress);
  const [paymentMethod, setPaymentMethod] = useState("CARD");

  const subtotal = useMemo(() => {
    return rows.reduce(
      (sum, row) =>
        sum +
        Number(row.price_snapshot) *
          Number(row.quantity),
      0
    );
  }, [rows]);

  const shippingFee = subtotal >= 100000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const selectedAddress = addresses.find(
    (address) => address.id === addressId
  );

  return (
    <div className="checkout-grid">
      <section>
        <div className="checkout-block">
          <div className="checkout-title-row">
            <h2>주문 상품</h2>
            <span>{rows.length} ITEMS</span>
          </div>

          {rows.map((row) => (
            <Link
              href={`/product/${row.product?.slug}`}
              key={row.id}
              className="checkout-product"
            >
              <div>
                <p>{row.product?.subtitle}</p>
                <h3>{row.product?.title}</h3>
                <span>수량 {row.quantity}</span>
              </div>

              <strong>
                ₩
                {(
                  Number(row.price_snapshot) *
                  Number(row.quantity)
                ).toLocaleString()}
              </strong>
            </Link>
          ))}
        </div>

        <div className="checkout-block">
          <div className="checkout-title-row">
            <h2>배송지</h2>

            <Link href="/mypage/addresses">
              + 새 배송지 입력
            </Link>
          </div>

          {addresses.length === 0 ? (
            <div className="checkout-empty-address">
              <p>저장된 배송지가 없습니다.</p>

              <Link
                href="/mypage/addresses"
                className="dark-button"
              >
                배송지 등록하기
              </Link>
            </div>
          ) : (
            <div className="address-choice-list">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={`address-choice ${
                    addressId === address.id
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={addressId === address.id}
                    onChange={() =>
                      setAddressId(address.id)
                    }
                  />

                  <div>
                    <div className="address-choice-head">
                      <strong>
                        {address.recipient_name}
                      </strong>

                      {address.is_default && (
                        <span>기본 배송지</span>
                      )}
                    </div>

                    <p>{address.phone}</p>

                    <p>
                      [{address.postal_code}]{" "}
                      {address.address_line1}
                      {address.address_line2
                        ? ` ${address.address_line2}`
                        : ""}
                    </p>

                    {address.delivery_note && (
                      <small>
                        배송 요청:{" "}
                        {address.delivery_note}
                      </small>
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="checkout-block">
          <h2>결제수단</h2>

          <div className="payment-method-grid">
            {paymentMethods.map(([id, label]) => (
              <button
                type="button"
                key={id}
                onClick={() => setPaymentMethod(id)}
                className={
                  paymentMethod === id ? "selected" : ""
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <aside className="checkout-summary">
        <p className="eyebrow">ORDER SUMMARY</p>
        <h2>결제 금액</h2>

        <div className="summary-line">
          <span>상품금액</span>
          <strong>
            ₩{subtotal.toLocaleString()}
          </strong>
        </div>

        <div className="summary-line">
          <span>배송비</span>
          <strong>
            {shippingFee === 0
              ? "무료"
              : `₩${shippingFee.toLocaleString()}`}
          </strong>
        </div>

        <div className="summary-total">
          <span>최종 결제금액</span>
          <strong>
            ₩{total.toLocaleString()}
          </strong>
        </div>

        <button
          type="button"
          className="checkout-pay-button"
          disabled={!selectedAddress}
          onClick={() =>
            alert("다음 단계에서 토스페이먼츠 테스트 결제를 연결합니다.")
          }
        >
          ₩{total.toLocaleString()} 결제하기
        </button>

        {!selectedAddress && (
          <p className="checkout-warning">
            배송지를 먼저 등록해주세요.
          </p>
        )}
      </aside>
    </div>
  );
}
