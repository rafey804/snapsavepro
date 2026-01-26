import RedditDownloader from '@/components/home/RedditDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import RelatedTools from "@/components/common/RelatedTools";
import RedditUniqueContent from "@/components/SEO/RedditUniqueContent";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { redditSEOContent, redditFAQs, redditInfo } from "@/data/redditSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

import { redditPageSEO } from "@/data/comprehensiveSEOData";

const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: redditPageSEO.title,
    description: redditPageSEO.description,
    keywords: redditPageSEO.keywords,
    path: '/pages/reddit-video-download',
    locale,
    image: redditPageSEO.ogImage,
  });
}

const RedditPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": redditPageSEO.h1,
            "description": redditPageSEO.description,
            "url": redditPageSEO.canonicalUrl,
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Reddit Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "3890"
              }
            }
          })
        }}
      />

      <header className="sr-only">
        <h1>{redditPageSEO.h1}</h1>
      </header>

      <Breadcrumb items={[{ label: "Reddit Video Downloader" }]} />

      <RedditDownloader />
      <HowToDownload platform="Reddit" platformColor="orange" />

      <InfoSection
        platform="Reddit"
        platformColor="orange"
        customTitle={redditInfo?.title}
        customDescription={redditInfo?.description}
        customFeatures={redditInfo?.features}
        featureImage="/images/reddit-features.png"
      />

      <RedditUniqueContent />
      <FAQSection faqs={redditFAQs || []} platform="Reddit" />
      <RelatedTools exclude="reddit" />
    </>
  )
}

export default RedditPage

