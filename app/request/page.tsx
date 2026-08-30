export default function Page() {
  return <main className="wrap">
    <div className="pageTitle">
      <h1>상품 찾아주세요</h1>
      <p className="muted">상품명, 사진 또는 링크를 보내주세요. 해외 판매처에서 찾아 견적을 보내드립니다.</p>
    </div>
    <form className="form">
      <label className="field">카테고리
        <select><option>LP / 바이닐</option><option>패션</option><option>기타</option></select>
      </label>
      <label className="field">상품명<input placeholder="찾고 있는 상품명"/></label>
      <label className="field">아티스트 / 브랜드<input/></label>
      <label className="field">상품 링크<input placeholder="https://"/></label>
      <label className="field">희망 예산<input inputMode="numeric" placeholder="예: 100000"/></label>
      <label className="field">추가 요청사항<textarea rows={5}/></label>
      <button className="btn primary" type="button">요청 보내기</button>
    </form>
    <section/>
  </main>;
}
