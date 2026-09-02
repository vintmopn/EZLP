"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./contact.module.css";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          orderNumber: data.get("orderNumber"),
          type: data.get("type"),
          message: data.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "문의 전송에 실패했습니다.");
      }

      form.reset();
      setStatus("success");
      setMessage("문의가 접수되었습니다. 확인 후 연락드리겠습니다.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "문의 전송 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <span>CUSTOMER CARE</span>

        <h1>
          무엇이든
          <br />
          문의해주세요.
        </h1>

        <p>
          상품, 주문, 배송, 교환 및 환불 등
          <br />
          EZLP 이용 중 궁금한 점을 남겨주세요.
        </p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.info}>
          <div>
            <span>RESPONSE</span>
            <strong>고객센터 문의</strong>
            <p>
              보내주신 문의는 EZLP 운영자에게
              <br />
              이메일로 직접 전달됩니다.
            </p>
          </div>

          <div>
            <span>DIRECTOR</span>
            <strong>조창희</strong>
            <p>Founder & Creative Director</p>
          </div>

          <Link href="/">← 쇼핑 계속하기</Link>
        </aside>

        <form className={styles.form} onSubmit={submit}>
          <label>
            <span>이름 *</span>
            <input
              name="name"
              type="text"
              required
              placeholder="이름"
            />
          </label>

          <label>
            <span>이메일 *</span>
            <input
              name="email"
              type="email"
              required
              placeholder="example@email.com"
            />
          </label>

          <label>
            <span>주문번호</span>
            <input
              name="orderNumber"
              type="text"
              placeholder="주문 관련 문의인 경우"
            />
          </label>

          <label>
            <span>문의 유형 *</span>

            <select name="type" required defaultValue="">
              <option value="" disabled>
                문의 유형을 선택해주세요
              </option>
              <option value="상품 문의">상품 문의</option>
              <option value="주문/결제">주문 / 결제</option>
              <option value="배송">배송</option>
              <option value="교환/환불">교환 / 환불</option>
              <option value="음반 소싱">음반 소싱</option>
              <option value="기타">기타</option>
            </select>
          </label>

          <label>
            <span>문의 내용 *</span>
            <textarea
              name="message"
              required
              rows={8}
              placeholder="문의 내용을 자세히 적어주세요."
            />
          </label>

          {status !== "idle" && (
            <p
              className={
                status === "success"
                  ? styles.success
                  : styles.error
              }
            >
              {message}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "전송 중..." : "문의 보내기 →"}
          </button>
        </form>
      </div>
    </main>
  );
}
