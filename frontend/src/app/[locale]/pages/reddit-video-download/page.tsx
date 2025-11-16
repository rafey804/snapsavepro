import RedditDownloader from '@/components/home/RedditDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import RedditContentSection from "@/components/SEO/RedditContentSection";
import { redditFAQs, redditReviews } from "@/data/redditSEOData";
import type { Metadata } from "next";

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
    title: "Reddit Video & Image Downloader - Download Reddit Posts | Snap Save Pro",
    description: "Download Reddit videos and images in HD quality. Fast, free Reddit downloader. Supports v.redd.it, i.redd.it and all Reddit post formats.",
    keywords: "reddit video downloader, reddit image downloader, download reddit videos, v.redd.it downloader, reddit downloader, save reddit videos, reddit post downloader, reddit video saver, i.redd.it downloader, download reddit posts, reddit video download hd, reddit gif downloader, reddit media downloader, free reddit downloader, reddit content downloader",
    openGraph: {
      title: "Reddit Video & Image Downloader - Download Reddit Posts",
      description: "Download Reddit videos and images in HD quality. Fast, free and easy Reddit downloader.",
      url: `${baseUrl}/${locale}/pages/reddit-video-download`,
      siteName: 'Snap Save Pro',
      images: [{
        url: 'https://snapsavepro.com/og-reddit.png',
        width: 1200,
        height: 630,
        alt: 'Reddit Video & Image Downloader',
      }],
      locale: localeToOGLocale[locale] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Reddit Video & Image Downloader",
      description: "Download Reddit videos and images in HD quality.",
      images: ['https://snapsavepro.com/og-reddit.png'],
      creator: '@snapsavepro',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/pages/reddit-video-download`,
      languages: {
        'en': `${baseUrl}/en/pages/reddit-video-download`,
        'hi': `${baseUrl}/hi/pages/reddit-video-download`,
        'zh': `${baseUrl}/zh/pages/reddit-video-download`,
        'ur': `${baseUrl}/ur/pages/reddit-video-download`,
        'x-default': `${baseUrl}/en/pages/reddit-video-download`,
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

      <RedditDownloader/>
      <HowToDownload platform="Reddit" platformColor="orange" />
      <InfoSection platform="Reddit" platformColor="orange" />
      <RedditContentSection />
      <FAQSection faqs={redditFAQs} platform="Reddit" />
      <ReviewsSection reviews={redditReviews} />
    </>
  )
}

export default RedditPage
