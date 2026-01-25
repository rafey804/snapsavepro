import TikTokDownloader from '@/components/home/TiktokDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";

import { tiktokFAQs, tiktokReviews } from "@/data/tiktokSEOData";
import { homePageSEO } from "@/data/comprehensiveSEOData";
import TikTokContentSection from '@/components/SEO/TikTokContentSection';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { constructMetadata } from '@/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    path: '/',
    locale,
    image: '/og-multi-platform-downloader.png',
  });
}

export default function HomePage() {
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
            "url": homePageSEO.canonicalUrl,
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

      <TikTokDownloader />

      <HowToDownload platform="TikTok" platformColor="pink" />
      <InfoSection platform="TikTok" platformColor="pink" />
      <TikTokContentSection />
      <FAQSection faqs={tiktokFAQs} platform="TikTok" />
    </>
  );
}
