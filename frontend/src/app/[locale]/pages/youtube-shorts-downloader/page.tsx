import React from 'react';
import type { Metadata } from 'next';
import ShortsDownloader from '@/components/home/ShortsDownloader';
import PlatformContentSection from '@/components/SEO/PlatformContentSection';
import { getTranslations } from 'next-intl/server';

// Locale to OG locale mapping
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// Dynamic SEO Metadata for YouTube Shorts Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.youtubeShorts' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'SnapSavePro' }],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url: `${baseUrl}/${locale}/pages/youtube-shorts-downloader`,
      siteName: 'SnapSavePro',
      locale: localeToOGLocale[locale] || 'en_US',
      images: [
        {
          url: '/youtube-shorts-downloader-og.jpg',
          width: 1200,
          height: 630,
          alt: 'YouTube Shorts Downloader - Download HD Videos Without Watermark',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      site: '@SnapSavePro',
      creator: '@SnapSavePro',
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
    alternates: {
      canonical: `${baseUrl}/${locale}/pages/youtube-shorts-downloader`,
      languages: {
        'en': `${baseUrl}/en/pages/youtube-shorts-downloader`,
        'hi': `${baseUrl}/hi/pages/youtube-shorts-downloader`,
        'zh': `${baseUrl}/zh/pages/youtube-shorts-downloader`,
        'ur': `${baseUrl}/ur/pages/youtube-shorts-downloader`,
        'x-default': `${baseUrl}/en/pages/youtube-shorts-downloader`,
      },
    },
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YouTube Shorts Downloader - SnapSavePro',
  applicationCategory: 'MultimediaApplication',
  url: 'https://snapsavepro.com/pages/youtube-shorts-downloader',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '5428',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Windows, MacOS, Linux, Android, iOS',
  browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
  softwareVersion: '2.0',
  datePublished: '2023-11-15',
  dateModified: '2025-10-28',
  author: {
    '@type': 'Organization',
    name: 'SnapSavePro',
    url: 'https://snapsavepro.com',
  },
  description: 'Best free YouTube Shorts downloader online. Download YouTube Shorts videos in HD 1080p, 4K, 720p quality without watermark. Fast, secure, and no registration required. Save Shorts to MP4, MP3 format instantly.',
  featureList: [
    'Download YouTube Shorts in HD 1080p, 4K, 720p quality',
    'No watermark on downloaded videos',
    'Multiple video and audio format options (MP4, WebM, MP3, M4A)',
    'Lightning-fast download speed',
    'Completely free to use with no hidden charges',
    'No registration or login required',
    'Works on all devices - desktop, mobile, tablet',
    'Extract audio from YouTube Shorts',
    'Unlimited downloads',
    'Safe and secure downloads',
  ],
  screenshot: 'https://snapsavepro.com/youtube-shorts-downloader-screenshot.jpg',
  applicationSubCategory: 'Video Downloader',
  keywords: 'youtube shorts downloader, download youtube shorts, youtube shorts download, youtube shorts no watermark, youtube shorts to mp4, youtube shorts converter',
};

export default function ShortsDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        {/* Main Downloader Component */}
        <ShortsDownloader />

        {/* SEO Content Section */}
        <PlatformContentSection platform="youtube" platformColor="purple" />
      </main>
    </>
  );
}
