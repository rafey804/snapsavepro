import YtDownloader from "@/components/home/YtDownloader";
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import { youtubeFAQs, youtubeReviews } from "@/data/pageSEOData";
import { youtubePageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";

// SEO Metadata for YouTube Downloader Page
export const metadata: Metadata = {
  title: youtubePageSEO.title,
  description: youtubePageSEO.description,
  keywords: youtubePageSEO.keywords,
  openGraph: {
    title: youtubePageSEO.title,
    description: youtubePageSEO.description,
    url: youtubePageSEO.canonicalUrl,
    siteName: 'Snap Save Pro',
    images: [
      {
        url: youtubePageSEO.ogImage,
        width: 1200,
        height: 630,
        alt: 'YouTube Video Downloader - Download HD Videos & MP3',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: youtubePageSEO.title,
    description: youtubePageSEO.description,
    images: [youtubePageSEO.ogImage],
  },
  alternates: {
    canonical: youtubePageSEO.canonicalUrl,
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

export default function YouTubeDownloaderPage() {
  return (
    <>
      {/* Schema.org structured data for YouTube Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": youtubePageSEO.h1,
            "description": youtubePageSEO.description,
            "url": youtubePageSEO.canonicalUrl,
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "YouTube Video Downloader HD",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "6234"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>{youtubePageSEO.h1}</h1>
      </header>

      <YtDownloader />
      <HowToDownload platform="YouTube" platformColor="red" />
      <InfoSection platform="YouTube" platformColor="red" />
      <FAQSection faqs={youtubeFAQs} platform="YouTube" />
      <ReviewsSection reviews={youtubeReviews} />
    </>
  );
}
