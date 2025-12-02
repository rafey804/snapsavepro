import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import HowItWorksPage from '@/components/pages/HowItWorksPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'How It Works - Free YouTube Video Downloader Guide | Step by Step',
    description: 'Learn how to download YouTube videos in 4 easy steps. Complete guide for downloading HD, 4K videos and MP3 audio. Free, fast, and secure process.',
    keywords: 'how to download youtube videos, youtube downloader guide, download youtube step by step, youtube to mp4 tutorial, youtube mp3 converter guide',
    path: '/pages/how-it-works',
    locale,
  });
}

export default function Page() {
  return <HowItWorksPage />;
}