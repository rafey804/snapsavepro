import TikTokDownloader from '@/components/home/TikTokDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import { tiktokFAQs, tiktokReviews } from "@/data/tiktokSEOData";
import { homePageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";
import NativeBanner from '@/components/ads/NativeBanner';
import SmallBanner from '@/components/ads/SmallBanner';

// SEO Metadata for Home Page
export const metadata: Metadata = {
  title: homePageSEO.title,
  description: homePageSEO.description,
  keywords: homePageSEO.keywords,
  openGraph: {
    title: homePageSEO.title,
    description: homePageSEO.description,
    url: homePageSEO.canonicalUrl,
    siteName: 'Snap Save Pro',
    images: [
      {
        url: homePageSEO.ogImage,
        width: 1200,
        height: 630,
        alt: 'TikTok Video Downloader Without Watermark',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: homePageSEO.title,
    description: homePageSEO.description,
    images: [homePageSEO.ogImage],
  },
  alternates: {
    canonical: homePageSEO.canonicalUrl,
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

const HomePage = () => {
  return (
    <>
      {/* Schema.org structured data for TikTok Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": homePageSEO.h1,
            "description": homePageSEO.description,
            "url": homePageSEO.canonicalUrl,
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "TikTok Video Downloader Without Watermark",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "8547"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>{homePageSEO.h1}</h1>
      </header>

      <TikTokDownloader/>
       {/* ✅ Native Banner Ad #1 */}
      <NativeBanner />
      <HowToDownload platform="TikTok" platformColor="pink" />
       {/* ✅ Small Banner Ad */}
      <SmallBanner />
      <InfoSection platform="TikTok" platformColor="pink" />
      <FAQSection faqs={tiktokFAQs} platform="TikTok" />
      <ReviewsSection reviews={tiktokReviews} />
    </>
  );
}

export default HomePage
