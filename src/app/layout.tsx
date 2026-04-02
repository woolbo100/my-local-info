import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { siteConfig } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "성남시 생활 정보 | 행사·혜택·지원금 안내",
  description: "성남시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보를 매일 업데이트합니다.",
  openGraph: {
    title: "성남시 생활 정보 | 행사·혜택·지원금 안내",
    description: "성남시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보를 매일 업데이트합니다.",
    url: siteConfig.url,
    siteName: "성남시 생활 정보",
    locale: "ko_KR",
    type: "website",
  },
  verification: {
    google: "W52msq-ecdWlgVyvAoZHm45aFZcssKcAuVxPCUxiEQk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const isAdsenseEnabled = adsenseId && adsenseId !== "나중에_입력";

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const isGaEnabled = gaId && gaId !== "나중에_입력";

  return (
    <html
      lang="ko"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {isAdsenseEnabled && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        {isGaEnabled && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white border-none shadow-none">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "성남시 생활 정보",
                "url": siteConfig.url,
                "description": "성남시 주민을 위한 지역 행사, 축제, 지원금, 혜택 정보"
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "홈",
                    "item": siteConfig.url
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "블로그",
                    "item": `${siteConfig.url}/blog`
                  }
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
