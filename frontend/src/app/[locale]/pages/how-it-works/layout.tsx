import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works - Snap Save Pro Video Downloader Guide',
  description: 'Learn how to download videos from TikTok, YouTube, Facebook in 3 easy steps. Simple guide to using Snap Save Pro multi-platform video downloader without watermark.',
  keywords: "how to download videos, video downloader guide, download tiktok tutorial, youtube download guide, facebook video download steps, how it works, download instructions, video download tutorial, step by step guide, download process, how to use downloader, video download how to, tiktok download tutorial, youtube downloader guide, download without watermark, easy video download, simple downloader, download guide, video saver tutorial, downloader instructions",
  openGraph: {
    title: 'How It Works - Download Videos in 3 Simple Steps',
    description: 'Easy guide to download videos from TikTok, YouTube, Facebook. Learn how to use Snap Save Pro in 3 simple steps.',
    url: 'https://snapsavepro.com/pages/how-it-works',
    siteName: 'Snap Save Pro',
    type: 'website',
    images: [
      {
        url: '/og-how-it-works.png',
        width: 1200,
        height: 630,
        alt: 'How to Download Videos - Step by Step Guide',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Download Videos - Simple Guide',
    description: 'Download videos from TikTok, YouTube, Facebook in 3 easy steps.',
    images: ['/og-how-it-works.png'],
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/how-it-works',
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

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
