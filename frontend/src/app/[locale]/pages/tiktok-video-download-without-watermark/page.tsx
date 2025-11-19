import TikTokDownloader from '@/components/home/TiktokDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import TikTokContentSection from "@/components/SEO/TikTokContentSection";
import TikTokUniqueContent from "@/components/SEO/TikTokUniqueContent";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { tiktokFAQs, tiktokReviews } from "@/data/tiktokSEOData";
import { homePageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";

// Locale to OG locale mapping
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// SEO Metadata for TikTok Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
    title: homePageSEO.title,
    description: homePageSEO.description,
    keywords: homePageSEO.keywords,
    openGraph: {
      title: homePageSEO.title,
      description: homePageSEO.description,
      url: `${baseUrl}/${locale}/pages/tiktok-video-download-without-watermark`,
      siteName: 'Snap Save Pro',
      images: [
        {
          url: homePageSEO.ogImage,
          width: 1200,
          height: 630,
          alt: 'TikTok Video Downloader Without Watermark',
        }
      ],
      locale: localeToOGLocale[locale] || 'en_US',
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
      canonical: `${baseUrl}/en/pages/tiktok-video-download-without-watermark`,
      languages: {
        'en': `${baseUrl}/en/pages/tiktok-video-download-without-watermark`,
        'hi': `${baseUrl}/hi/pages/tiktok-video-download-without-watermark`,
        'zh': `${baseUrl}/zh/pages/tiktok-video-download-without-watermark`,
        'ur': `${baseUrl}/ur/pages/tiktok-video-download-without-watermark`,
        'x-default': `${baseUrl}/en/pages/tiktok-video-download-without-watermark`,
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
      <TikTokUniqueContent />
      <FAQSection faqs={tiktokFAQs} platform="TikTok" />
      <ReviewsSection reviews={tiktokReviews} />
    </>
  )
}

export default TikTokPage