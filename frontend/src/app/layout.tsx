import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from '../components/layout/Footer';
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Video Downloader - TikTok, Instagram, Facebook | Download HD Videos & Audio",
  description: "Download videos from TikTok, Instagram, Facebook without watermark in HD quality for FREE! Convert videos to MP4, extract MP3 audio. Fast, secure, no registration required.",
  keywords: [
    // TikTok Keywords
    "tiktok downloader", "download tiktok videos", "tiktok without watermark", "tiktok to mp4", "tiktok mp3 converter",
    "free tiktok downloader", "remove tiktok watermark", "tiktok video download", "tiktok converter", "save tiktok videos",
    
    // Instagram Keywords
    "instagram downloader", "download instagram videos", "instagram reels downloader", "instagram story downloader",
    "instagram post downloader", "save instagram videos", "instagram video download", "instagram to mp4",
    "download instagram photos", "instagram content saver", "instagram media downloader", "insta video downloader",
    
    // Facebook Keywords
    "facebook video downloader", "download facebook videos", "facebook video download", "save facebook videos",
    "facebook video saver", "fb video downloader", "facebook to mp4", "download facebook posts",
    "facebook video converter", "facebook media downloader", "save fb videos", "facebook content downloader",
    
    // Audio Keywords
    "video to mp3 converter", "extract audio from video", "download audio", "mp3 converter", "audio extractor",
    "video audio converter", "save audio from video", "audio downloader", "music extractor", "sound downloader",
    
    // General Keywords
    "social media downloader", "video downloader", "free video download", "online video downloader",
    "video converter", "media downloader", "content saver", "video grabber", "multi platform downloader",
    
    // Alternative Tools
    "sssTikTok alternative", "SnapTik alternative", "tikmate alternative", "musicallydown alternative",
    "savefrom alternative", "y2mate alternative", "fbdown alternative", "getfvid alternative"
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
    siteName: 'Snap Save Pro - Multi-Platform Video Downloader',
    title: 'Free Video Downloader - TikTok, Instagram, Facebook HD Downloads',
    description: 'Download videos from TikTok, Instagram, Facebook without watermark in HD quality. Free multi-platform video downloader with audio extraction.',
    images: [
      {
        url: '/og-multi-platform-downloader.png',
        width: 1200,
        height: 630,
        alt: 'Multi-Platform Video Downloader - TikTok, Instagram, Facebook',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Multi-Platform Video Downloader - TikTok, Instagram, Facebook',
    description: 'Download videos from TikTok, Instagram, Facebook without watermark. Free, fast, and secure video downloader.',
    images: ['/twitter-multi-platform-downloader.png'],
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
  classification: 'Multi-Platform Video Downloader Tool',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snapsavepro.com'),
  applicationName: 'Snap Save Pro - Multi-Platform Video Downloader',
};

// Enhanced structured data for multi-platform downloader
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://snapsavepro.com/#webapp",
      "name": "Snap Save Pro - Multi-Platform Video Downloader",
      "description": "Free online video downloader for TikTok, Instagram, Facebook that removes watermarks and downloads videos in HD quality with audio extraction.",
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
        "Download Instagram posts, reels, and stories",
        "Download Facebook videos in HD",
        "Extract MP3 audio from videos",
        "HD quality video downloads",
        "No registration required",
        "Works on all devices",
        "Fast download speeds",
        "Multi-platform support"
      ],
      "supportedContentFormat": [
        "MP4",
        "MP3",
        "WEBM",
        "M4A"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://snapsavepro.com/#organization",
      "name": "Snap Save Pro",
      "url": "https://snapsavepro.com",
      "description": "Leading provider of free online video downloading tools for TikTok, Instagram, Facebook and other social media platforms.",
      "sameAs": [
        "https://twitter.com/snapsavepro",
        "https://facebook.com/snapsavepro"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://snapsavepro.com/#website",
      "name": "Snap Save Pro - Multi-Platform Video Downloader",
      "url": "https://snapsavepro.com",
      "description": "Free multi-platform video downloader for TikTok, Instagram, Facebook without watermark. Download videos in HD quality and extract MP3 audio.",
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
      "name": "Multi-Platform Video Downloader",
      "description": "Free online tool to download videos from TikTok, Instagram, Facebook without watermark in HD quality with audio extraction",
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
        "ratingValue": "4.9",
        "reviewCount": "5247",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "HowTo",
      "@id": "https://snapsavepro.com/#howto-tiktok",
      "name": "How to Download TikTok Videos Without Watermark",
      "description": "Step-by-step guide to download TikTok videos without watermarks",
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
          "text": "Open TikTok and copy the video URL you want to download"
        },
        {
          "@type": "HowToStep", 
          "name": "Paste URL in Downloader",
          "text": "Paste the TikTok URL into our downloader tool"
        },
        {
          "@type": "HowToStep",
          "name": "Choose Quality",
          "text": "Select your preferred video quality and format"
        },
        {
          "@type": "HowToStep",
          "name": "Download Video",
          "text": "Click download to save the watermark-free TikTok video"
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://snapsavepro.com/#howto-instagram",
      "name": "How to Download Instagram Videos, Reels, and Stories",
      "description": "Complete guide to download Instagram content including posts, reels, and stories",
      "image": "https://snapsavepro.com/instagram-download-guide.jpg",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Copy Instagram URL",
          "text": "Copy the Instagram post, reel, or story URL"
        },
        {
          "@type": "HowToStep",
          "name": "Paste in Downloader",
          "text": "Paste the Instagram URL into our tool"
        },
        {
          "@type": "HowToStep",
          "name": "Select Format",
          "text": "Choose video or audio format for download"
        },
        {
          "@type": "HowToStep",
          "name": "Download Content",
          "text": "Download your Instagram content in high quality"
        }
      ]
    },
    {
      "@type": "HowTo",
      "@id": "https://snapsavepro.com/#howto-facebook",
      "name": "How to Download Facebook Videos",
      "description": "Easy guide to download Facebook videos in HD quality",
      "image": "https://snapsavepro.com/facebook-download-guide.jpg",
      "totalTime": "PT2M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "step": [
        {
          "@type": "HowToStep",
          "name": "Copy Facebook Video URL",
          "text": "Copy the Facebook video URL from your browser"
        },
        {
          "@type": "HowToStep",
          "name": "Paste URL",
          "text": "Paste the Facebook URL into our downloader"
        },
        {
          "@type": "HowToStep",
          "name": "Choose Quality",
          "text": "Select your preferred video quality"
        },
        {
          "@type": "HowToStep",
          "name": "Download Video",
          "text": "Download the Facebook video to your device"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://snapsavepro.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I download videos from TikTok, Instagram, and Facebook for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our multi-platform video downloader is completely free. You can download videos from TikTok, Instagram, Facebook, and other platforms without any cost or registration."
          }
        },
        {
          "@type": "Question",
          "name": "Do downloaded videos have watermarks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No! Our downloader automatically removes watermarks from TikTok videos and downloads clean, watermark-free content from all supported platforms."
          }
        },
        {
          "@type": "Question",
          "name": "Can I extract audio from videos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can extract high-quality MP3 audio from any video. This works for TikTok sounds, Instagram reels audio, Facebook video audio, and more."
          }
        },
        {
          "@type": "Question",
          "name": "What video qualities are available for download?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support HD quality downloads up to 1080p for most platforms. Video quality depends on the original content uploaded to each platform."
          }
        },
        {
          "@type": "Question",
          "name": "Is it safe to use this video downloader?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our video downloader is safe and secure. We don't store your downloads or personal information. All processing happens securely in your browser."
          }
        },
        {
          "@type": "Question",
          "name": "Can I download Instagram stories and reels?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our Instagram downloader supports posts, reels, stories, and IGTV videos. You can download any public Instagram content in high quality."
          }
        },
        {
          "@type": "Question",
          "name": "Does the Facebook video downloader work with private videos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our downloader only works with public Facebook videos that are accessible without login. Private videos require authentication and cannot be downloaded."
          }
        },
        {
          "@type": "Question",
          "name": "What audio formats can I download?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We support MP3 audio downloads in various bitrates (128kbps, 192kbps, 320kbps) to ensure high-quality audio extraction from any video."
          }
        }
      ]
    }
  ]
};

// Google Analytics tracking ID
const GA_TRACKING_ID = 'G-HSRYPTLJHH';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Enhanced SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Multi-platform specific meta tags */}
        <meta name="application-name" content="Snap Save Pro Multi-Platform Video Downloader" />
        <meta name="apple-mobile-web-app-title" content="Video Downloader" />
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
        <meta name="category" content="Video Downloader, Social Media Tools, TikTok Tools, Instagram Tools, Facebook Tools, Audio Converter" />
        
        {/* Additional SEO tags */}
        <meta name="revisit-after" content="1 day" />
        <meta name="expires" content="never" />
        <meta name="cache-control" content="public, max-age=31536000" />
        
        {/* Platform-specific alternative titles */}
        <meta name="alternative-title" content="TikTok Downloader Without Watermark" />
        <meta name="alternative-title" content="Instagram Video Downloader" />
        <meta name="alternative-title" content="Facebook Video Download" />
        <meta name="alternative-title" content="Multi-Platform Video Converter" />
        <meta name="alternative-title" content="Social Media Video Saver" />
        <meta name="alternative-title" content="Video to MP3 Converter" />
        <meta name="alternative-title" content="Audio Extractor from Video" />
        
        {/* Enhanced structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Breadcrumb structured data */}
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
                  "item": "https://snapsavepro.com/tiktok-video-download-without-watermark"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Instagram Downloader",
                  "item": "https://snapsavepro.com/instagram-video-download"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Facebook Downloader",
                  "item": "https://snapsavepro.com/facebook-video-download"
                }
              ]
            })
          }}
        />
        
        {/* Platform preconnects for performance */}
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="preconnect" href="https://vm.tiktok.com" />
        <link rel="preconnect" href="https://www.instagram.com" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
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
        
        {/* Platform-specific verification codes */}
        <meta name="google-site-verification" content="your-google-site-verification" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification" />
        <meta name="facebook-domain-verification" content="your-facebook-verification" />
        
        {/* Enhanced rich snippets */}
        <meta name="article:author" content="Snap Save Pro Team" />
        <meta name="article:publisher" content="https://snapsavepro.com" />
        <meta name="article:section" content="Technology" />
        <meta name="article:tag" content="TikTok, Instagram, Facebook, Video Downloader, Social Media, Audio Converter, MP3 Extractor" />
        
        {/* Additional social media meta */}
        <meta property="og:video" content="https://snapsavepro.com/demo-video.mp4" />
        <meta property="og:audio" content="https://snapsavepro.com/demo-audio.mp3" />
        <meta name="twitter:player" content="https://snapsavepro.com/embed" />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Analytics - GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              content_group1: 'Video Downloader',
              content_group2: 'Multi-Platform',
              custom_map: {
                custom_parameter_1: 'platform_used',
                custom_parameter_2: 'download_format'
              }
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `}
        </Script>

        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-pink-500 text-white p-2 z-50"
        >
          Skip to main content
        </a>
        
        <Header/>
        
        <main id="main-content">
          {children}
        </main>
        
        <Footer/>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=G-HSRYPTLJHH"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        
        {/* Enhanced performance monitoring with user engagement tracking */}
        <Script id="performance-analytics" strategy="afterInteractive">
          {`
            // Performance monitoring with analytics
            if ('performance' in window && 'getEntriesByType' in performance) {
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                  
                  // Send performance data to Google Analytics
                  if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                      'event_category': 'Performance',
                      'event_label': 'Page Load',
                      'value': Math.round(loadTime)
                    });
                  }
                  
                  console.log('Page load time:', loadTime);
                }, 0);
              });
            }

            // Track user engagement events
            function trackDownloadEvent(platform, format) {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'download_start', {
                  'event_category': 'Video Download',
                  'event_label': platform,
                  'custom_parameter_1': platform,
                  'custom_parameter_2': format
                });
              }
            }

            function trackConversionEvent(platform, format) {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'download_complete', {
                  'event_category': 'Conversion',
                  'event_label': platform + '_' + format,
                  'custom_parameter_1': platform,
                  'custom_parameter_2': format
                });
              }
            }

            function trackErrorEvent(platform, error) {
              if (typeof gtag !== 'undefined') {
                gtag('event', 'download_error', {
                  'event_category': 'Error',
                  'event_label': platform,
                  'custom_parameter_1': platform,
                  'custom_parameter_2': error
                });
              }
            }

            // Make functions globally available
            window.trackDownloadEvent = trackDownloadEvent;
            window.trackConversionEvent = trackConversionEvent;
            window.trackErrorEvent = trackErrorEvent;
          `}
        </Script>

        {/* Schema.org additional structured data for enhanced SEO */}
        <Script id="additional-schema" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Video Downloader Features",
              "description": "Complete list of supported platforms and features",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "TikTok Video Downloader",
                  "description": "Download TikTok videos without watermark in HD quality"
                },
                {
                  "@type": "ListItem", 
                  "position": 2,
                  "name": "Instagram Downloader",
                  "description": "Download Instagram posts, reels, stories, and IGTV"
                },
                {
                  "@type": "ListItem",
                  "position": 3, 
                  "name": "Facebook Video Downloader",
                  "description": "Download Facebook videos in high quality"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Audio Extractor",
                  "description": "Extract MP3 audio from any video"
                }
              ]
            }
          `}
        </Script>
      </body>
    </html>
  );
}