export default function Page() {
  return <main className="wrap">
    <div className="pageTitle">
      <h1>EZLP 관리자</h1>
      <p className="muted">상품 · 주문 · 재고 관리</p>
    </div>
    <div className="adminGrid">
      <div className="stat">오늘 주문<b>0</b></div>
      <div className="stat">오늘 매출<b>₩0</b></div>
      <div className="stat">신규 소싱 요청<b>0</b></div>
    </div>
    <section>
      <div className="banner">
        <div>
          <h2>관리자 시스템</h2>
          <p className="muted">다음 단계에서 관리자 로그인과 상품 등록 기능을 연결합니다.</p>
        </div>
      </div>
    </section>
  </main>;
}
