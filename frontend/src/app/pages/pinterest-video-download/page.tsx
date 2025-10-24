import type { Metadata } from 'next';
import PinterestDownloader from '@/components/home/PinterestDownloader';
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PinterestContentSection from "@/components/SEO/PinterestContentSection";
import { pinterestFAQs, pinterestReviews } from '@/data/pinterestSEOData';

export const metadata: Metadata = {
  title: 'Pinterest Video Downloader - Download Pinterest Videos & Images Free Online | SnapSavePro',
  description: 'Free Pinterest video and image downloader. Download Pinterest pins in HD quality without watermarks. Fast, easy, and free - no registration required.',
  keywords: [
    'pinterest video downloader',
    'download pinterest videos',
    'pinterest image downloader',
    'save pinterest pins',
    'pinterest downloader free',
    'download from pinterest',
    'pinterest video saver',
    'pinterest image saver',
    'pinterest pin downloader',
    'pinterest media downloader',
    'pinterest video download hd',
    'pinterest gif downloader',
    'free pinterest downloader',
    'pinterest content downloader',
    'save pinterest images'
  ],
  authors: [{ name: 'SnapSavePro' }],
  creator: 'SnapSavePro',
  publisher: 'SnapSavePro',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://snapsavepro.com/pages/pinterest-video-download',
    siteName: 'SnapSavePro',
    title: 'Pinterest Video Downloader - Download Pinterest Videos & Images Free',
    description: 'Download Pinterest videos and images in HD quality. Fast, free, and easy to use Pinterest downloader. No watermarks, no registration required.',
    images: [
      {
        url: 'https://snapsavepro.com/og-pinterest.jpg',
        width: 1200,
        height: 630,
        alt: 'Pinterest Video Downloader - SnapSavePro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pinterest Video Downloader - Download Pinterest Videos & Images Free',
    description: 'Download Pinterest videos and images in HD quality. Fast, free, and easy to use.',
    images: ['https://snapsavepro.com/og-pinterest.jpg'],
    creator: '@snapsavepro',
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/pinterest-video-download',
  },
  other: {
    'pinterest:card': 'summary',
    'pinterest:title': 'Pinterest Video Downloader',
    'pinterest:description': 'Download Pinterest videos and images for free',
  },
};

export default function PinterestDownloadPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Pinterest Video Downloader - SnapSavePro',
    description: 'Free online Pinterest video and image downloader. Download Pinterest pins in HD quality without watermarks.',
    url: 'https://snapsavepro.com/pages/pinterest-video-download',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2547',
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
        <h1>Pinterest Video & Image Downloader - Download Pinterest Pins in HD Quality</h1>
      </header>

      <PinterestDownloader />
      <HowToDownload platform="Pinterest" platformColor="red" />
      <InfoSection platform="Pinterest" platformColor="red" />
      <PinterestContentSection />
      <FAQSection faqs={pinterestFAQs} platform="Pinterest" />
      <ReviewsSection reviews={pinterestReviews} />
    </>
  );
}
