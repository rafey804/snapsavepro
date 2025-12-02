import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import YouTubeThumbnailDownloader from '@/components/home/YouTubeThumbnailDownloader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'YouTube Thumbnail Downloader - Download HD Thumbnails (4K, 1080p)',
    description: 'Download YouTube thumbnails in all qualities (HD, 4K, 1080p, 720p). Free YouTube thumbnail grabber. Save thumbnails from any YouTube video instantly.',
    keywords: 'youtube thumbnail downloader, download youtube thumbnail, save youtube thumbnail, youtube thumbnail grabber, get youtube thumbnail, youtube thumbnail image, hd thumbnail downloader, 4k thumbnail downloader',
    path: '/pages/youtube-thumbnail-downloader',
    locale,
  });
}

export default function YouTubeThumbnailDownloaderPage() {
  return <YouTubeThumbnailDownloader />;
}
