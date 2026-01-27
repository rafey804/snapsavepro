import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import YouTubeThumbnailDownloader from '@/components/home/YouTubeThumbnailDownloader';
import YouTubeThumbnailContent from '@/components/details/YouTubeThumbnailContent';
import FAQSection from '@/components/SEO/FAQSection';
import { youtubeThumbnailFAQs } from '@/data/youtubeThumbnailSEOData';
import Breadcrumb from '@/components/layout/Breadcrumb';

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube Thumbnail Downloader",
    "description": "Download YouTube thumbnails in all qualities (HD, 4K, 1080p, 720p). Free YouTube thumbnail grabber tool.",
    "url": "https://snapsavepro.com/pages/youtube-thumbnail-downloader",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250"
    },
    "operatingSystem": "Windows, MacOS, Linux, Android, iOS"
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": youtubeThumbnailFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqLd]) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/pages' },
            { label: 'YouTube Thumbnail Downloader', href: '/pages/youtube-thumbnail-downloader' },
          ]}
        />
      </div>

      <YouTubeThumbnailDownloader />

      <YouTubeThumbnailContent />

      <FAQSection faqs={youtubeThumbnailFAQs} platform="YouTube Thumbnail" />
    </div>
  );
}
