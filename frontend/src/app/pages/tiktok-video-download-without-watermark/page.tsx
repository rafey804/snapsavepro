import TikTokDownloader from '@/components/home/TiktokDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import TikTokContentSection from "@/components/SEO/TikTokContentSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { tiktokFAQs, tiktokReviews } from "@/data/tiktokSEOData";
import { homePageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";

// SEO Metadata for TikTok Downloader Page
export const metadata: Metadata = {
  title: homePageSEO.title,
  description: homePageSEO.description,
  keywords: homePageSEO.keywords,
  openGraph: {
    title: homePageSEO.title,
    description: homePageSEO.description,
    url: "https://snapsavepro.com/pages/tiktok-video-download-without-watermark",
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
    creator: '@snapsavepro',
  },
  alternates: {
    canonical: "https://snapsavepro.com/pages/tiktok-video-download-without-watermark",
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

const TikTokPage = () => {
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
            "url": "https://snapsavepro.com/pages/tiktok-video-download-without-watermark",
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

      <Breadcrumb items={[
        { label: "TikTok Video Downloader" }
      ]} />

      <TikTokDownloader/>
      <HowToDownload platform="TikTok" platformColor="pink" />
      <InfoSection platform="TikTok" platformColor="pink" />
      <TikTokContentSection />
      <FAQSection faqs={tiktokFAQs} platform="TikTok" />
      <ReviewsSection reviews={tiktokReviews} />
    </>
  )
}

export default TikTokPage