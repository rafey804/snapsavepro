import React from 'react';
import type { Metadata } from 'next';
import InstagramDownloader from '@/components/home/InstagramDownloader';
import InfoSection from '@/components/SEO/InfoSection';
import InstagramUniqueContent from '@/components/SEO/InstagramUniqueContent';
import { getTranslations } from 'next-intl/server';
import { constructMetadata } from '@/utils/seo';
import { instagramInfo } from '@/data/instagramSEOData';

// Locale to OG locale mapping
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// Dynamic SEO Metadata for Instagram Reels Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.instagramReels' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    path: '/pages/instagram-reels-downloader',
    locale,
    image: '/instagram-downloader-og.jpg',
  });
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Instagram Reels Downloader - SnapSavePro',
  applicationCategory: 'MultimediaApplication',
  url: 'https://snapsavepro.com/pages/instagram-reels-downloader',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '6234',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Windows, MacOS, Linux, Android, iOS',
  browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
  softwareVersion: '2.0',
  datePublished: '2023-09-20',
  dateModified: '2025-10-28',
  author: {
    '@type': 'Organization',
    name: 'SnapSavePro',
    url: 'https://snapsavepro.com',
  },
  description: 'Best free Instagram Reels downloader online. Download Instagram Reels, Posts, IGTV, Stories in HD 1080p, 720p quality without watermark. Fast, secure, and no registration required. Save to MP4, MP3 format instantly.',
  featureList: [
    'Download Instagram Reels in HD 1080p, 720p quality',
    'No watermark on downloaded videos',
    'Download Instagram Posts, IGTV, and Stories',
    'Multiple video and audio format options (MP4, WebM, MP3, M4A)',
    'Lightning-fast download speed',
    'Completely free to use with no hidden charges',
    'No registration or login required',
    'Works on all devices - desktop, mobile, tablet',
    'Extract audio from Instagram Reels and videos',
    'Unlimited downloads',
    'Safe and secure downloads',
  ],
  screenshot: 'https://snapsavepro.com/instagram-reels-downloader-screenshot.jpg',
  applicationSubCategory: 'Video Downloader',
  keywords: 'instagram reels downloader, download instagram reels, instagram downloader, instagram no watermark, instagram reels to mp4, save instagram videos',
};

export default function InstagramDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Downloader Component */}
      <InstagramDownloader />

      {/* Info Section with Unique Content */}
      <InfoSection
        platform="Instagram"
        platformColor="purple"
        customTitle={instagramInfo.title}
        customDescription={instagramInfo.description}
        customFeatures={instagramInfo.features}
      />

      <InstagramUniqueContent />
    </>
  );
}
