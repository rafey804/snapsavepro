import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import InfoSection from "@/components/SEO/InfoSection";
import SnapchatDownloader from '@/components/home/SnapchatDownloader';
import SnapchatDownloaderContent from '@/components/details/SnapchatDownloaderContent';
import FAQSection from "@/components/SEO/FAQSection";

import { snapchatInfo, snapchatFAQs, snapchatReviews } from '@/data/snapchatSEOData';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Snapchat Video Downloader - Download Snapchat Stories & Spotlight | Free',
    description: 'Download Snapchat videos, stories, and spotlight in HD quality. Fast, free, and anonymous Snapchat downloader. No watermark, no registration required.',
    keywords: 'snapchat downloader, download snapchat videos, save snapchat stories, snapchat spotlight download, snapchat video saver, download snaps, snapchat to mp4, anonymous snapchat viewer, snapchat story saver, free snapchat downloader',
    path: '/pages/snapchat-video-download',
    locale,
    image: '/snapchat-downloader-og.jpg',
  });
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Snapchat Video Downloader - SnapSavePro',
  applicationCategory: 'MultimediaApplication',
  url: 'https://snapsavepro.com/pages/snapchat-video-download',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Windows, MacOS, Linux, Android, iOS',
  browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
  softwareVersion: '1.0',
  description: 'Download Snapchat videos, stories, and spotlight in HD quality. Fast, free, and anonymous Snapchat downloader.',
  featureList: [
    'Download Snapchat Stories anonymously',
    'Save Spotlight videos in HD',
    'No watermark on downloads',
    'Works on all devices',
    'Free and unlimited'
  ],
  applicationSubCategory: 'Video Downloader',
};

export default function SnapchatDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        <SnapchatDownloader />

        {/* New Visual Content Sections with Images */}
        <SnapchatDownloaderContent />

        <InfoSection
          platform="Snapchat"
          platformColor="yellow"
          customTitle={snapchatInfo.title}
          customDescription={snapchatInfo.description}
          customFeatures={snapchatInfo.features}
        />

        <FAQSection faqs={snapchatFAQs} platform="Snapchat" />
      </main>
    </>
  );
}
