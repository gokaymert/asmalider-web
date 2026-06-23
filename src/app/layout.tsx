import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = rawUrl && rawUrl.startsWith("http")
  ? rawUrl
  : "https://asmalider.org.tr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Asmalı Derneği",
    template: "%s | Asmalı Derneği"
  },
  description: "Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği resmi web sitesidir. Köyümüzle ilgili güncel haberleri ve etkinlikleri buradan takip edebilirsiniz.",
  authors: [{ name: 'Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği' }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği",
    images: [{ url: "/images/logo2.jpg", width: 800, height: 600, alt: "Logo" }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/logo2.jpg"]
  },
  verification: {
    google: 'MrpGTKHNF9PGYmT5AuYVtQDQXUJgtd55fcOtTMHelhk',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Marmara Adası Asmalı Köyü Kültür ve Dayanışma Derneği",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="light" style={{ colorScheme: "light" }}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
