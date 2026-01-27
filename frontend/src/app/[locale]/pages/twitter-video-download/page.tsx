import TwitterDownloader from '@/components/home/TwitterDownloader'
import XDownloaderContent from '@/components/details/XDownloaderContent';
import PlatformContentSection from '@/components/SEO/PlatformContentSection';
import RelatedTools from '@/components/common/RelatedTools';
import { twitterSEOContent } from "@/data/twitterSEOData";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

// Dynamic SEO Metadata for X Video Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'X Video Downloader - Download Twitter/X Videos in HD | Free Online',
    description: 'Download X (Twitter) videos, GIFs, and Spaces in HD quality. Fast, free X video downloader. No watermark, no login required. Save tweets instantly.',
    keywords: 'x video downloader, twitter video download, download x videos, save twitter videos, x gif downloader, twitter to mp4, x spaces download, download tweets, twitter video saver, x downloader free',
    path: '/pages/twitter-video-download',
    locale,
    image: 'https://snapsavepro.com/og-twitter.png',
  });
}

const XVideoDownloaderPage = () => {
  return (
    <>
      {/* Schema.org structured data for X Video Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "X Video Downloader - Download Twitter Videos in HD",
            "description": "Download X (Twitter) videos, GIFs, and Spaces in HD quality. Fast, free, and easy-to-use X video downloader.",
            "url": "https://snapsavepro.com/pages/twitter-video-download",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "X Video Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "8721"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>X Video Downloader - Download Twitter/X Videos in HD Quality Free</h1>
      </header>

      <TwitterDownloader />

      <XDownloaderContent />

      <PlatformContentSection
        platform="X"
        platformColor="blue"
        content={twitterSEOContent}
      />

      <RelatedTools exclude="twitter" />
    </>
  )
}

export default XVideoDownloaderPage

