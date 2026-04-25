import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || siteConfig.gaId;
  const isGaEnabled = gaId && gaId !== "?ш린???낅젰" && gaId !== "?섏쨷???낅젰";

  return (
    <html lang="ko" className={`${inter.variable} h-full antialiased`}>
      <head>
        <meta name="google-site-verification" content="W52msq-ecdWlgVyvAoZHm45aFZcssKcAuVxPCUxiEQk" />
        <meta name="agd-partner-manual-verification" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6109659306037375"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
