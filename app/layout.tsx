import './globals.css';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';

import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: 'EZLP',
  description: '찾기 어려운 취향을, 더 가까이.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
