import TwitterDownloader from '@/components/home/TwitterDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import { twitterFAQs, twitterReviews } from "@/data/twitterSEOData";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

// Locale to OG locale mapping
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// Dynamic SEO Metadata for Twitter/X Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.twitter' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    path: '/pages/twitter-video-download',
    locale,
    image: 'https://snapsavepro.com/og-twitter.png',
  });
}

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
            "name": "Twitter/X Video Downloader",
            "description": "Download Twitter and X videos in HD quality. Fast, free, and easy video downloader.",
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
        <h1>Twitter/X Video Downloader - Download Videos in HD Quality</h1>
      </header>

      <TwitterDownloader />
      <HowToDownload platform="Twitter/X" platformColor="blue" />
      <InfoSection platform="Twitter/X" platformColor="blue" />
      <PlatformContentSection platform="twitter" platformColor="blue" />
      <FAQSection faqs={twitterFAQs} platform="Twitter/X" />
      <ReviewsSection reviews={twitterReviews} />
    </>
  )
}

export default TwitterPage
