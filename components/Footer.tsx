import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            EZLP
          </Link>

          <p>
            Finding what others can't.
            <br />
            Vinyl · CD · Archive · Fashion
          </p>
        </div>

        <div className={styles.column}>
          <span className={styles.label}>CUSTOMER CARE</span>

          <Link href="/contact">고객센터 문의</Link>
          <Link href="/mypage">MY EZLP</Link>
          <Link href="/request">음반 구해주세요</Link>
        </div>

        <div className={styles.column}>
          <span className={styles.label}>SHOP</span>

          <Link href="/vinyl">VINYL</Link>
          <Link href="/cd">CD</Link>
          <Link href="/fashion">FASHION</Link>
          <Link href="/rare">RARE</Link>
        </div>

        <div className={styles.director}>
          <span className={styles.label}>FOUNDER & CREATIVE DIRECTOR</span>
          <strong>조창희</strong>
          <small>CHANG HEE CHO</small>
        </div>
      </div>

      <div className={styles.contactBanner}>
        <div>
          <span className={styles.label}>NEED HELP?</span>
          <strong>무엇이든 문의해주세요.</strong>
          <p>상품 · 주문 · 배송 · 교환 · 환불 · 기타 문의</p>
        </div>

        <Link href="/contact" className={styles.contactButton}>
          고객센터 문의하기 →
        </Link>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 EZLP. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED & DIRECTED BY CHANG HEE CHO.</span>
      </div>
    </footer>
  );
}
