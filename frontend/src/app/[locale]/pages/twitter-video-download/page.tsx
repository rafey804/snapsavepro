import TwitterDownloader from '@/components/home/TwitterDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import { twitterFAQs, twitterReviews } from "@/data/twitterSEOData";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/pages/twitter-video-download`,
      siteName: 'Snap Save Pro',
      images: [{ url: 'https://snapsavepro.com/og-twitter.png', width: 1200, height: 630, alt: 'Twitter/X Video Downloader' }],
      locale: localeToOGLocale[locale] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://snapsavepro.com/og-twitter.png'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/pages/twitter-video-download`,
      languages: {
        'en': `${baseUrl}/en/pages/twitter-video-download`,
        'hi': `${baseUrl}/hi/pages/twitter-video-download`,
        'zh': `${baseUrl}/zh/pages/twitter-video-download`,
        'ur': `${baseUrl}/ur/pages/twitter-video-download`,
        'x-default': `${baseUrl}/en/pages/twitter-video-download`,
      },
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
      <InfoSection platform="Twitter/X" platformColor="blue" />
      <PlatformContentSection platform="twitter" platformColor="blue" />
      <FAQSection faqs={twitterFAQs} platform="Twitter/X" />
      <ReviewsSection reviews={twitterReviews} />
    </>
  )
}

export default TwitterPage
