import TwitterDownloader from '@/components/home/TwitterDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import TwitterContentSection from "@/components/SEO/TwitterContentSection";
import { twitterFAQs, twitterReviews } from "@/data/twitterSEOData";
import type { Metadata } from "next";
import DetailedInstructionsSection from './../../../components/details/DetailedInstructionsSection';

// SEO Metadata for Twitter/X Downloader Page
export const metadata: Metadata = {
  title: "Twitter Video Downloader - Download X Videos Without Watermark | Snap Save Pro",
  description: "Download Twitter and X videos in HD quality without watermark. Fast, free, and easy Twitter video downloader. Supports all video formats from Twitter/X posts.",
  keywords: [
    'twitter video downloader',
    'x video downloader',
    'download twitter videos',
    'x video download',
    'twitter video download without watermark',
    'twitter downloader',
    'x downloader',
    'save twitter videos',
    'twitter video saver',
    'x video saver',
    'download x videos',
    'twitter video download hd',
    'x video download hd',
    'twitter video downloader online',
    'free twitter downloader'
  ],
  openGraph: {
    title: "Twitter/X Video Downloader - Download Videos Without Watermark",
    description: "Download Twitter and X videos in HD quality without watermark. Fast, free, and easy video downloader.",
    url: "https://snapsavepro.com/pages/twitter-video-download",
    siteName: 'Snap Save Pro',
    images: [
      {
        url: 'https://snapsavepro.com/og-twitter.png',
        width: 1200,
        height: 630,
        alt: 'Twitter/X Video Downloader',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Twitter/X Video Downloader - Download Videos Without Watermark",
    description: "Download Twitter and X videos in HD quality without watermark. Fast, free, and easy video downloader.",
    images: ['https://snapsavepro.com/og-twitter.png'],
  },
  alternates: {
    canonical: "https://snapsavepro.com/pages/twitter-video-download",
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

const TwitterPage = () => {
  return (
    <>
      {/* Schema.org structured data for Twitter/X Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Twitter/X Video Downloader Without Watermark",
            "description": "Download Twitter and X videos in HD quality without watermark. Fast, free, and easy video downloader.",
            "url": "https://snapsavepro.com/pages/twitter-video-download",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Twitter/X Video Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "5432"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>Twitter/X Video Downloader - Download Videos Without Watermark in HD Quality</h1>
      </header>

      <TwitterDownloader/>
      <HowToDownload platform="Twitter/X" platformColor="blue" />
      <DetailedInstructionsSection />
      <InfoSection platform="Twitter/X" platformColor="blue" />
      <TwitterContentSection />
      <FAQSection faqs={twitterFAQs} platform="Twitter/X" />
      <ReviewsSection reviews={twitterReviews} />
    </>
  )
}

export default TwitterPage
