import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import LinkedInDownloader from '@/components/home/LinkedInDownloader';
import HowToDownload from '@/components/SEO/HowToDownload';
import InfoSection from '@/components/SEO/InfoSection';
import PlatformContentSection from '@/components/SEO/PlatformContentSection';
import LinkedInUniqueContent from '@/components/SEO/LinkedInUniqueContent';
import FAQSection from '@/components/SEO/FAQSection';
import RelatedTools from '@/components/common/RelatedTools';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { linkedinFAQs, linkedinFeatures, linkedinSEOContent, linkedinInfo } from '@/data/linkedinSEOData';

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
    title: 'LinkedIn Video Downloader - Download LinkedIn Videos in HD 1080p Quality | Free',
    description: 'Best free LinkedIn video downloader online. Download LinkedIn videos in HD 1080p, 720p, 480p quality. Save professional videos, webinars, and educational content from LinkedIn. Fast, secure, and no registration required.',
    keywords: 'linkedin video downloader, download linkedin video, linkedin downloader, linkedin video download free, save linkedin videos, linkedin video saver, download linkedin posts, linkedin HD download 1080p, linkedin video tool, linkedin video downloader online, linkedin video to mp4, linkedin video converter, download linkedin content, linkedin professional video download, linkedin webinar download, linkedin educational video download, free linkedin downloader, best linkedin video downloader, linkedin video extractor, linkedin media downloader',
    path: '/pages/linkedin-video-downloader',
    locale,
    image: '/linkedin-downloader-og.jpg',
  });
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LinkedIn Video Downloader - SnapSavePro',
  applicationCategory: 'MultimediaApplication',
  url: 'https://snapsavepro.com/pages/linkedin-video-downloader',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '3847',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Windows, MacOS, Linux, Android, iOS',
  browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
  softwareVersion: '2.0',
  datePublished: '2024-01-15',
  dateModified: '2025-10-28',
  author: {
    '@type': 'Organization',
    name: 'SnapSavePro',
    url: 'https://snapsavepro.com',
  },
  description: 'Best free LinkedIn video downloader online. Download LinkedIn professional videos, webinars, and educational content in HD 1080p, 720p, 480p quality. Fast, secure, and no registration required.',
  featureList: [
    'Download LinkedIn videos in HD 1080p, 720p, 480p quality',
    'Multiple video and audio format options (MP4, WebM, MP3, M4A)',
    'Lightning-fast download speed',
    'Completely free to use with no hidden charges',
    'No registration or login required',
    'Professional and secure downloads',
    'Extract audio from LinkedIn videos',
    'Works on all devices - desktop, mobile, tablet',
    'Download professional videos and webinars',
    'Save educational content for offline viewing',
  ],
  screenshot: 'https://snapsavepro.com/linkedin-downloader-screenshot.jpg',
  applicationSubCategory: 'Video Downloader',
  keywords: 'linkedin video downloader, download linkedin video, linkedin downloader, save linkedin videos, linkedin video to mp4, linkedin video converter, free linkedin downloader',
};

export default function LinkedInDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "LinkedIn Video Downloader" }]} />

        {/* Main Downloader Component */}
        <LinkedInDownloader />

        {/* How to Download Section with Step Images */}
        <HowToDownload platform="LinkedIn" platformColor="blue" />

        {/* Info Section with Features */}
        <InfoSection
          platform="LinkedIn"
          platformColor="blue"
          customTitle={linkedinInfo?.title}
          customDescription={linkedinInfo?.description}
          customFeatures={linkedinInfo?.features}
          featureImage="/images/linkedin-features.png"
        />

        {/* LinkedIn Unique Content with Images */}
        <LinkedInUniqueContent />

        {/* FAQ Section */}
        <FAQSection faqs={linkedinFAQs} platform="LinkedIn" />

        <RelatedTools exclude="linkedin" />
      </main>
    </>
  );
}
