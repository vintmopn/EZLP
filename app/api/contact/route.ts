import { NextResponse } from "next/server";

function clean(value: unknown, max = 5000) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body.name, 100);
    const email = clean(body.email, 200);
    const orderNumber = clean(body.orderNumber, 100);
    const type = clean(body.type, 100);
    const message = clean(body.message, 5000);

    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "이메일 주소를 확인해주세요." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !to) {
      return NextResponse.json(
        {
          error:
            "고객센터 이메일 설정이 아직 완료되지 않았습니다.",
        },
        { status: 503 }
      );
    }

    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "EZLP Customer Care <onboarding@resend.dev>";

    const subject =
      `[EZLP 고객문의] ${type}` +
      (orderNumber ? ` · ${orderNumber}` : "");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#111">
        <div style="border-bottom:2px solid #111;padding:24px 0">
          <h1 style="margin:0;font-size:30px">EZLP CUSTOMER CARE</h1>
        </div>

        <div style="padding:30px 0">
          <p><strong>문의 유형</strong><br>${escapeHtml(type)}</p>
          <p><strong>이름</strong><br>${escapeHtml(name)}</p>
          <p><strong>이메일</strong><br>${escapeHtml(email)}</p>
          <p><strong>주문번호</strong><br>${
            orderNumber ? escapeHtml(orderNumber) : "-"
          }</p>

          <div style="margin-top:30px;padding-top:25px;border-top:1px solid #ddd">
            <strong>문의 내용</strong>
            <p style="white-space:pre-wrap;line-height:1.7">${escapeHtml(
              message
            )}</p>
          </div>
        </div>

        <div style="padding:20px 0;border-top:1px solid #ddd;color:#777;font-size:12px">
          EZLP · Founder & Creative Director 조창희
        </div>
      </div>
    `;

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject,
          html,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend error:", result);

      return NextResponse.json(
        { error: "문의 이메일 전송에 실패했습니다." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { error: "문의 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
