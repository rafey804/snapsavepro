import RedditDownloader from '@/components/home/RedditDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import { redditFAQs, redditReviews, redditInfo } from "@/data/redditSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

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
    title: "Reddit Video & Image Downloader - Download Reddit Posts | Snap Save Pro",
    description: "Download Reddit videos and images in HD quality. Fast, free Reddit downloader. Supports v.redd.it, i.redd.it and all Reddit post formats.",
    keywords: "reddit video downloader, reddit image downloader, download reddit videos, v.redd.it downloader, reddit downloader, save reddit videos, reddit post downloader, reddit video saver, i.redd.it downloader, download reddit posts, reddit video download hd, reddit gif downloader, reddit media downloader, free reddit downloader, reddit content downloader",
    path: '/pages/reddit-video-download',
    locale,
    image: 'https://snapsavepro.com/og-reddit.png',
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
            "name": "Reddit Video & Image Downloader",
            "description": "Download Reddit videos and images in HD quality.",
            "url": "https://snapsavepro.com/pages/reddit-video-download",
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
        <h1>Reddit Video & Image Downloader - Download Reddit Posts in HD Quality</h1>
      </header>

      <RedditDownloader />
      <HowToDownload platform="Reddit" platformColor="orange" />

      <InfoSection
        platform="Reddit"
        platformColor="orange"
        customTitle={redditInfo.title}
        customDescription={redditInfo.description}
        customFeatures={redditInfo.features}
      />

      <PlatformContentSection platform="reddit" platformColor="orange" />
      <FAQSection faqs={redditFAQs} platform="Reddit" />
      <ReviewsSection reviews={redditReviews} />
    </>
  )
}

export default RedditPage
