import TikTokDownloader from '@/components/home/TiktokDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import RelatedTools from "@/components/common/RelatedTools";
import TikTokContentSection from "@/components/SEO/TikTokContentSection";
import TikTokUniqueContent from "@/components/SEO/TikTokUniqueContent";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { tiktokFAQs, tiktokReviews, tiktokInfo } from "@/data/tiktokSEOData";
import { homePageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

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

  return constructMetadata({
    title: homePageSEO.title,
    description: homePageSEO.description,
    keywords: homePageSEO.keywords,
    path: '/pages/tiktok-video-download-without-watermark',
    locale,
    image: homePageSEO.ogImage,
  });
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

      <TikTokDownloader />
      <HowToDownload platform="TikTok" platformColor="pink" />

      <InfoSection
        platform="TikTok"
        platformColor="pink"
        customTitle={tiktokInfo.title}
        customDescription={tiktokInfo.description}
        customFeatures={tiktokInfo.features}
        featureImage="/images/tiktok-features.png"
      />

      <TikTokContentSection />
      <TikTokUniqueContent />
      <FAQSection faqs={tiktokFAQs} platform="TikTok" />
      <RelatedTools exclude="tiktok" />
    </>
  )
}

export default TikTokPage