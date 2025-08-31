import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from './../components/layout/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free TikTok Video Downloader - Download TikTok Without Watermark HD Quality",
  description: "Download TikTok videos without watermark in HD quality for FREE! Save TikTok videos to MP4, extract MP3 audio from TikTok. Fast, secure, no registration required. Remove TikTok watermarks instantly.",
  keywords: [
    "tiktok downloader",
    "download tiktok videos", 
    "tiktok without watermark",
    "tiktok to mp4",
    "tiktok mp3 converter",
    "free tiktok downloader",
    "remove tiktok watermark",
    "tiktok video download",
    "tiktok converter",
    "save tiktok videos",
    "tiktok audio download",
    "online tiktok downloader",
    "tiktok to mp3",
    "tiktok video saver",
    "tiktok downloader free",
    "download tiktok hd",
    "tiktok mp4 download",
    "tiktok music download",
    "tiktok video downloader online",
    "no watermark tiktok",
    "tiktok downloader without watermark",
    "sssTikTok alternative",
    "SnapTik alternative",
    "tikmate alternative",
    "musicallydown alternative",
    "tiktok video grabber",
    "tiktok content saver",
    "download tiktok reels"
  ],
  authors: [{ name: "Snap Save Pro Team" }],
  creator: "Snap Save Pro",
  publisher: "Snap Save Pro",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snapsavepro.com',
    siteName: 'Snap Save Pro - TikTok Downloader',
    title: 'Free TikTok Video Downloader - Download Without Watermark',
    description: 'Download TikTok videos without watermark in HD quality. Free online TikTok downloader - no registration required. Save TikTok videos to MP4 and extract MP3 audio.',
    images: [
      {
        url: '/og-tiktok-downloader.png',
        width: 1200,
        height: 630,
        alt: 'TikTok Video Downloader - Download Without Watermark',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free TikTok Video Downloader - No Watermark',
    description: 'Download TikTok videos without watermark in HD quality. Free, fast, and secure TikTok downloader.',
    images: ['/twitter-tiktok-downloader.png'],
    creator: '@snapsavepro',
    site: '@snapsavepro',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  alternates: {
    canonical: 'https://snapsavepro.com',
    languages: {
      'en-US': 'https://snapsavepro.com',
      'es-ES': 'https://snapsavepro.com/es',
      'fr-FR': 'https://snapsavepro.com/fr',
      'de-DE': 'https://snapsavepro.com/de',
      'pt-BR': 'https://snapsavepro.com/pt',
      'ja-JP': 'https://snapsavepro.com/ja',
      'ko-KR': 'https://snapsavepro.com/ko',
      'zh-CN': 'https://snapsavepro.com/zh',
      'ar-SA': 'https://snapsavepro.com/ar',
      'hi-IN': 'https://snapsavepro.com/hi',
    },
  },
  category: 'technology',
  classification: 'Video Downloader Tool',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snapsavepro.com'),
  applicationName: 'Snap Save Pro - TikTok Downloader',
};

// Enhanced structured data for TikTok downloader
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://snapsavepro.com/#webapp",
      "name": "Snap Save Pro - TikTok Video Downloader",
      "description": "Free online TikTok video downloader that removes watermarks and downloads TikTok videos in HD quality.",
      "url": "https://snapsavepro.com",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Download TikTok videos without watermark",
        "HD quality TikTok video downloads",
        "TikTok to MP3 audio extraction",
        "No registration required",
        "Works on all devices",
        "Fast download speeds"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://snapsavepro.com/#organization",
      "name": "Snap Save Pro",
      "url": "https://snapsavepro.com",
      "description": "Leading provider of free online video downloading tools for TikTok and social media platforms.",
      "sameAs": [
        "https://twitter.com/snapsavepro",
        "https://facebook.com/snapsavepro"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://snapsavepro.com/#website",
      "name": "Snap Save Pro - TikTok Downloader",
      "url": "https://snapsavepro.com",
      "description": "Free TikTok video downloader without watermark. Download TikTok videos in HD quality and extract MP3 audio.",
      "publisher": {
        "@id": "https://snapsavepro.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://snapsavepro.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://snapsavepro.com/#software",
      "name": "TikTok Video Downloader",
      "description": "Free online tool to download TikTok videos without watermark in HD quality",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser",
      "downloadUrl": "https://snapsavepro.com",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2547",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "HowTo",
      "@id": "https://snapsavepro.com/#howto",
      "name": "How to Download TikTok Videos Without Watermark",
      "description": "Step-by-step guide to download TikTok videos without watermarks using our free online tool",
      "image": "https://snapsavepro.com/tiktok-download-guide.jpg",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Copy TikTok Video URL",
          "text": "Open TikTok and copy the video URL you want to download",
          "image": "https://snapsavepro.com/step1-copy-url.jpg"
        },
        {
          "@type": "HowToStep", 
          "name": "Paste URL in Downloader",
          "text": "Paste the TikTok URL into our downloader tool",
          "image": "https://snapsavepro.com/step2-paste-url.jpg"
        },
        {
          "@type": "HowToStep",
          "name": "Choose Quality",
          "text": "Select your preferred video quality and format",
          "image": "https://snapsavepro.com/step3-choose-quality.jpg"
        },
        {
          "@type": "HowToStep",
          "name": "Download Video",
          "text": "Click download to save the watermark-free TikTok video",
          "image": "https://snapsavepro.com/step4-download.jpg"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://snapsavepro.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is it legal to download TikTok videos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Downloading TikTok videos for personal use is generally acceptable, but you should respect copyright laws and creators' rights. Only download videos you have permission to use or for educational purposes."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download TikTok videos without watermark?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our TikTok downloader automatically removes watermarks from downloaded videos. You'll get clean, watermark-free TikTok videos in their original quality."
          }
        },
        {
          "@type": "Question",
          "name": "What video qualities can I download from TikTok?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our TikTok downloader supports HD quality downloads up to 1080p. TikTok videos maintain their original vertical format and quality while removing watermarks."
          }
        },
        {
          "@type": "Question",
          "name": "Can I extract audio from TikTok videos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can download TikTok audio as MP3 files. This is perfect for saving TikTok sounds, music, or audio content with high quality audio extraction."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Enhanced SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="color-scheme" content="dark light" />
        
        {/* TikTok-specific meta tags */}
        <meta name="application-name" content="Snap Save Pro TikTok Downloader" />
        <meta name="apple-mobile-web-app-title" content="TikTok Downloader" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Geo targeting */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="ICBM" content="39.78373,-100.445882" />
        
        {/* Content classification */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="language" content="English" />
        <meta name="category" content="Video Downloader, Social Media Tools, TikTok Tools" />
        
        {/* Additional SEO tags */}
        <meta name="revisit-after" content="1 day" />
        <meta name="expires" content="never" />
        <meta name="cache-control" content="public, max-age=31536000" />
        
        {/* Alternative titles for different searches */}
        <meta name="alternative-title" content="TikTok Downloader Without Watermark" />
        <meta name="alternative-title" content="Download TikTok Videos HD" />
        <meta name="alternative-title" content="TikTok to MP4 Converter" />
        <meta name="alternative-title" content="Free TikTok Video Saver" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Additional structured data for breadcrumbs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://snapsavepro.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "TikTok Downloader",
                  "item": "https://snapsavepro.com"
                }
              ]
            })
          }}
        />
        
        {/* Preconnect to TikTok domains for performance */}
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="preconnect" href="https://vm.tiktok.com" />
        <link rel="preconnect" href="https://vt.tiktok.com" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/geist-sans.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://snapsavepro.com" />
        
        {/* Alternative language versions */}
        <link rel="alternate" hrefLang="en" href="https://snapsavepro.com" />
        <link rel="alternate" hrefLang="es" href="https://snapsavepro.com/es" />
        <link rel="alternate" hrefLang="fr" href="https://snapsavepro.com/fr" />
        <link rel="alternate" hrefLang="de" href="https://snapsavepro.com/de" />
        <link rel="alternate" hrefLang="pt" href="https://snapsavepro.com/pt" />
        <link rel="alternate" hrefLang="ja" href="https://snapsavepro.com/ja" />
        <link rel="alternate" hrefLang="ko" href="https://snapsavepro.com/ko" />
        <link rel="alternate" hrefLang="zh" href="https://snapsavepro.com/zh" />
        <link rel="alternate" hrefLang="ar" href="https://snapsavepro.com/ar" />
        <link rel="alternate" hrefLang="hi" href="https://snapsavepro.com/hi" />
        <link rel="alternate" hrefLang="x-default" href="https://snapsavepro.com" />
        
        {/* Favicons and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional meta for mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* Additional SEO signals */}
        <meta name="google-site-verification" content="your-google-site-verification" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification" />
        
        {/* Rich snippets hints */}
        <meta name="article:author" content="Snap Save Pro Team" />
        <meta name="article:publisher" content="https://snapsavepro.com" />
        <meta name="article:section" content="Technology" />
        <meta name="article:tag" content="TikTok, Video Downloader, Social Media, Watermark Removal" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-pink-500 text-white p-2 z-50"
        >
          Skip to main content
        </a>
        
        <Header/>
        
        <main id="main-content" itemProp="mainContentOfPage">
          {children}
        </main>
        
        <Footer/>
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('performance' in window && 'getEntriesByType' in performance) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
                  }, 0);
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}