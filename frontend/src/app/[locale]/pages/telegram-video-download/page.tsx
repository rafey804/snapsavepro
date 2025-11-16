import TelegramDownloader from '@/components/home/TelegramDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import type { Metadata } from "next";

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
  title: "Telegram Video Downloader - Download Telegram Videos & Photos Free",
  description: "Download videos, photos, and media from Telegram channels for free. Fast and easy Telegram media downloader with no watermark. Works with public Telegram channels.",
  keywords: "telegram downloader, telegram video download, download telegram media, telegram channel downloader, save telegram videos, telegram photo download",
  openGraph: {
    title: "Telegram Video Downloader - Free Telegram Media Download",
    description: "Download videos, photos, and media from Telegram channels for free. Fast and easy Telegram media downloader.",
    url: `${baseUrl}/${locale}/pages/telegram-video-download`,
    siteName: 'Snap Save Pro',
    images: [
      {
        url: '/og-telegram.jpg',
        width: 1200,
        height: 630,
        alt: 'Telegram Video Downloader',
      }
    ],
    locale: localeToOGLocale[locale] || 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Telegram Video Downloader - Free Download",
    description: "Download videos and media from Telegram channels for free",
    images: ['/og-telegram.jpg'],
    creator: '@snapsavepro',
  },
  alternates: {
    canonical: `${baseUrl}/${locale}/pages/telegram-video-download`,
      languages: {
        'en': `${baseUrl}/en/pages/telegram-video-download`,
        'hi': `${baseUrl}/hi/pages/telegram-video-download`,
        'zh': `${baseUrl}/zh/pages/telegram-video-download`,
        'ur': `${baseUrl}/ur/pages/telegram-video-download`,
        'x-default': `${baseUrl}/en/pages/telegram-video-download`,
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

const telegramFAQs = [
  {
    question: "How to download videos from Telegram?",
    answer: "Paste the Telegram channel message link into our downloader, select your preferred format, and click download. Our tool will fetch the media from the public Telegram channel instantly."
  },
  {
    question: "Can I download from private Telegram channels?",
    answer: "Currently, our tool supports downloading from public Telegram channels only. Private channels and secret chats are not accessible without login."
  },
  {
    question: "Is it free to download Telegram videos?",
    answer: "Yes! Our Telegram downloader is completely free with no registration required. Download unlimited videos and photos from public Telegram channels."
  },
  {
    question: "What formats can I download from Telegram?",
    answer: "You can download videos (MP4), photos (JPG), and documents from Telegram in their original quality. The format depends on what was shared in the channel."
  },
  {
    question: "Do I need to install any software?",
    answer: "No installation needed! Our Telegram downloader is completely web-based. Just paste the link and download directly from your browser."
  }
];

const telegramReviews = [
  {
    name: "Ahmed K.",
    rating: 5,
    comment: "Finally a working Telegram downloader! Downloaded videos from my favorite channels easily.",
    date: "2 days ago"
  },
  {
    name: "Maria S.",
    rating: 5,
    comment: "Super fast and works perfectly for public channels. No login required!",
    date: "1 week ago"
  },
  {
    name: "Carlos R.",
    rating: 4,
    comment: "Good tool for Telegram downloads. Would love to see support for private channels in the future.",
    date: "3 weeks ago"
  }
];

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

      <TelegramDownloader/>
      <HowToDownload platform="Telegram" platformColor="blue" />
      <InfoSection platform="Telegram" platformColor="blue" />
      <FAQSection faqs={telegramFAQs} platform="Telegram" />
      <ReviewsSection reviews={telegramReviews} />
    </>
  );
};

export default TelegramPage;
