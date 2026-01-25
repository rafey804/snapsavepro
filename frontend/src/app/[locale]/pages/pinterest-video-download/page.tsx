import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import PinterestDownloader from '@/components/home/PinterestDownloader';
import PinterestDownloaderContent from '@/components/details/PinterestDownloaderContent';
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import { pinterestFAQs, pinterestInfo } from '@/data/pinterestSEOData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Pinterest Video Downloader - Download Pinterest Videos & Images Free HD | SnapSavePro',
    description: 'Free Pinterest video and image downloader. Download Pinterest Video Pins, Image Pins, Story Pins & GIFs in HD quality. Fast, easy, no registration required.',
    keywords: "pinterest video downloader, download pinterest videos, pinterest image downloader, save pinterest pins, pinterest downloader free, download from pinterest, pinterest video saver, pinterest image saver, pinterest pin downloader, pinterest media downloader, pinterest video download hd, pinterest gif downloader, free pinterest downloader, pinterest content downloader, save pinterest images",
    path: '/pages/pinterest-video-download',
    locale,
    image: 'https://snapsavepro.com/og-pinterest.jpg',
  });
}

export default function PinterestDownloadPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Pinterest Video & Image Downloader - SnapSavePro',
    description: 'Free online Pinterest video and image downloader. Download Pinterest pins in HD quality without watermark.',
    url: 'https://snapsavepro.com/pages/pinterest-video-download',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser, Android, iOS, Windows, Mac',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '7823',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sr-only">
        <h1>Pinterest Video & Image Downloader - Download Pinterest Pins in HD Quality Free</h1>
      </header>

      <PinterestDownloader />

      {/* New Visual Content with Images & Animations */}
      <PinterestDownloaderContent />

      <InfoSection
        platform="Pinterest"
        platformColor="red"
        customTitle={pinterestInfo.title}
        customDescription={pinterestInfo.description}
        customFeatures={pinterestInfo.features}
        featureImage="/images/pinterest-features.png"
      />

      <FAQSection faqs={pinterestFAQs} platform="Pinterest" />
    </>
  );
}

