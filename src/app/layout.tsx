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
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: siteConfig.url,
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
  const isAdsenseEnabled = adsenseId && adsenseId !== "여기에-입력";

  const gaId = process.env.NEXT_PUBLIC_GA_ID || siteConfig.gaId;
  const isGaEnabled = gaId && gaId !== "여기에-입력" && gaId !== "나중에_입력";

  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-site-verification" content="W52msq-ecdWlgVyvAoZHm45aFZcssKcAuVxPCUxiEQk" />
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: siteConfig.name,
                url: siteConfig.url,
                description: siteConfig.description,
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
            ]),
          }}
        />
      </body>
    </html>
  );
}
