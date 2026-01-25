import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import TwitchDownloader from '@/components/home/TwitchDownloader';
import PlatformContentSection from '@/components/SEO/PlatformContentSection';
import RelatedTools from '@/components/common/RelatedTools';
import ReviewsSection from '@/components/SEO/ReviewsSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { twitchReviews, twitchSEOContent } from '@/data/twitchSEOData';
import { Download, Users, Star, Zap, Shield, Sparkles, Globe } from 'lucide-react';

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
    title: 'Twitch Clip Downloader - Download Twitch Clips in HD Quality Free',
    description: 'Download Twitch clips in HD quality for free. Fast, safe, and easy Twitch clip downloader. No watermark, no registration required. Save your favorite gaming moments instantly.',
    keywords: 'twitch clip downloader, download twitch clips, twitch video downloader, save twitch clips, twitch clip download, twitch downloader, download twitch videos, twitch clip saver',
    path: '/pages/twitch-clip-downloader',
    locale,
  });
}

export default function TwitchClipDownloaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/pages' },
            { label: 'Twitch Clip Downloader', href: '/pages/twitch-clip-downloader' },
          ]}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Downloader Component */}
        <section className="py-8">
          <TwitchDownloader />
        </section>

        <PlatformContentSection
          platform="Twitch"
          platformColor="purple"
          content={twitchSEOContent}
        />

        {/* Reviews Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust our Twitch clip downloader
            </p>
            <ReviewsSection reviews={twitchReviews} />
          </div>
        </section>

        <RelatedTools exclude="twitch" />

      </div>

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Twitch Clip Downloader",
            "description": "Download Twitch clips in HD quality for free. Fast, safe, and easy Twitch clip downloader without watermarks.",
            "url": "https://snapsavepro.com/pages/twitch-clip-downloader",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "12847",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </div>
  );
}
