import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com'),
  title: 'TikTok Video Downloader Without Watermark - Free & Fast | Snap Save Pro',
  description: 'Download TikTok videos without watermark in HD quality. Fast, free, and easy to use. Support for TikTok, YouTube, Facebook, Instagram, and more.',
  keywords: [
    'video downloader',
    'tiktok downloader',
    'youtube downloader',
    'facebook video download',
    'instagram downloader',
    'download videos online',
    'free video downloader',
    'no watermark',
    'hd video download',
    'snap save pro'
  ],
  authors: [{ name: 'Rafey Ul Fin' }],
  creator: 'Rafey Ul Fin',
  publisher: 'Snap Save Pro',
  verification: {
    google: 'xjiCGcMml5ZC_vYg9emsUrFfDQ4gyKb7ErLdYcVv4gs',
    other: {
      'msvalidate.01': 'DD2808B3DE3ED9BBDE14483A464278E2',
    },
  },
  themeColor: '#ec4899',
  appleWebApp: {
    capable: true,
    title: 'Snap Save Pro',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snapsavepro.com',
    siteName: 'Snap Save Pro',
    title: 'TikTok Video Downloader Without Watermark - Free & Fast | Snap Save Pro',
    description: 'Download TikTok videos without watermark in HD quality. Fast, free, and easy to use.',
    images: [
      {
        url: '/og-multi-platform-downloader.png',
        width: 1200,
        height: 630,
        alt: 'Snap Save Pro - Multi-Platform Video Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TikTok Video Downloader Without Watermark - Free & Fast',
    description: 'Download TikTok videos without watermark in HD quality. Fast, free, and easy to use.',
    images: ['/twitter-multi-platform-downloader.png'],
    creator: '@snapsavepro',
  },
  alternates: {
    canonical: 'https://snapsavepro.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-593VWXRV');`,
          }}
        />

        {/* Google Analytics GA4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HSRYPTLJHH"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HSRYPTLJHH', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-593VWXRV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
