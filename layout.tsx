import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata={title:'EZLP — Vinyl & Archive',description:'한국에서 찾기 어려운 LP와 아카이브 상품을 전 세계에서.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><Header/>{children}<Footer/></body></html>}
