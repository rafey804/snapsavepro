import TelegramDownloader from '@/components/home/TelegramDownloader'
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import FAQSection from "@/components/SEO/FAQSection";
import RelatedTools from '@/components/common/RelatedTools';

import Breadcrumb from "@/components/layout/Breadcrumb";
import { telegramInfo, telegramFAQs, telegramReviews } from "@/data/telegramSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// SEO Metadata for Telegram Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: "Telegram Video Downloader - Download Telegram Videos & Photos Free",
    description: "Download videos, photos, and media from Telegram channels for free. Fast and easy Telegram media downloader with no watermark. Works with public Telegram channels.",
    keywords: "telegram downloader, telegram video download, download telegram media, telegram channel downloader, save telegram videos, telegram photo download",
    path: '/pages/telegram-video-download',
    locale,
    image: '/og-telegram.jpg',
  });
}

const TelegramPage = () => {
  return (
    <>
      {/* Schema.org structured data for Telegram Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Telegram Video Downloader",
            "description": "Download videos and media from Telegram channels for free",
            "url": "https://snapsavepro.com/pages/telegram-video-download",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Telegram Video Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1247"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>Telegram Video Downloader - Download Telegram Media Free</h1>
      </header>

      <Breadcrumb items={[
        { label: "Telegram Video Downloader" }
      ]} />

      <TelegramDownloader />

      <PlatformContentSection
        platform="Telegram"
        platformColor="blue"
        content={{
          mainTitle: telegramInfo.title,
          intro: Array.isArray(telegramInfo.description) ? telegramInfo.description.join('\n\n') : telegramInfo.description,
          features: {
            title: "Key Features",
            list: Object.values(telegramInfo.features).map(f => `${f.title}: ${f.description}`)
          },
          faqs: {
            title: "Frequently Asked Questions",
            items: telegramFAQs
          }
        }}
      />

      <RelatedTools exclude="telegram" />

      <FAQSection faqs={telegramFAQs} platform="Telegram" />
    </>
  );
};

export default TelegramPage;
