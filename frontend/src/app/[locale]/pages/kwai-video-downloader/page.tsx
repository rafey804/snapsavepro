import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import KwaiDownloader from '@/components/home/KwaiDownloader';
import HowToDownload from '@/components/SEO/HowToDownload';
import FAQSection from '@/components/SEO/FAQSection';
import ReviewsSection from '@/components/SEO/ReviewsSection';
import PlatformContentSection from '@/components/SEO/PlatformContentSection';
import RelatedTools from '@/components/common/RelatedTools';

import Breadcrumb from '@/components/layout/Breadcrumb';
import { kwaiFAQs, kwaiReviews, kwaiStats, kwaiFeatures, kwaiSEOContent, kwaiHowToSteps } from '@/data/kwaiSEOData';
import { Download, Users, Star, Zap, Shield, Sparkles, Globe, CheckCircle, Video } from 'lucide-react';

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
    title: 'Kwai Video Downloader - Download Kwai Videos in HD Quality Free | Short & Long Videos',
    description: 'Download Kwai videos in HD quality for free. Fast, safe, and easy Kwai video downloader. Supports both short and long videos. No watermark, no registration required.',
    keywords: 'kwai video downloader, download kwai videos, kwai downloader, save kwai videos, kwai video download, kwai video saver, download kwai, kwai downloader online, free kwai downloader, kwai video download hd, download kwai short videos, download kwai long videos',
    path: '/pages/kwai-video-downloader',
    locale,
  });
}

export default function KwaiVideoDownloaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-900/20 to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/pages' },
            { label: 'Kwai Video Downloader', href: '/pages/kwai-video-downloader' },
          ]}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Downloader Component */}
        <section className="py-8">
          <KwaiDownloader />
        </section>

        {/* Info Section - Features Overview */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Why Choose Our Kwai Video Downloader?
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Experience the fastest and most reliable way to download Kwai videos with premium features, all completely free.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kwaiFeatures.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                    {feature.icon === 'Zap' && <Zap className="w-6 h-6 text-white" />}
                    {feature.icon === 'Shield' && <Shield className="w-6 h-6 text-white" />}
                    {feature.icon === 'Sparkles' && <Sparkles className="w-6 h-6 text-white" />}
                    {feature.icon === 'Globe' && <Globe className="w-6 h-6 text-white" />}
                    {feature.icon === 'Video' && <Video className="w-6 h-6 text-white" />}
                    {feature.icon === 'CheckCircle' && <CheckCircle className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Download Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              How to Download Kwai Videos
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Follow these simple steps to download your favorite Kwai videos in seconds
            </p>
            <HowToDownload
              platform="Kwai"
              platformColor="orange"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-orange-900/20 to-yellow-900/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {kwaiStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-105">
                  {stat.icon === 'Users' && <Users className="w-12 h-12 mx-auto mb-4 text-orange-400" />}
                  {stat.icon === 'Download' && <Download className="w-12 h-12 mx-auto mb-4 text-yellow-400" />}
                  {stat.icon === 'Star' && <Star className="w-12 h-12 mx-auto mb-4 text-orange-400" />}
                  {stat.icon === 'Zap' && <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />}
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Standardized Content Section */}
        <PlatformContentSection
          platform="Kwai"
          platformColor="orange"
          content={{
            mainTitle: kwaiSEOContent.whatIsKwai.title,
            intro: kwaiSEOContent.whatIsKwai?.content || '',
            howItWorks: {
              title: kwaiHowToSteps.length > 0 ? "How to Download Kwai Videos" : "",
              content: kwaiSEOContent.howItWorks.content
            },
            benefits: {
              title: kwaiSEOContent.benefits.title,
              content: kwaiSEOContent.benefits.content
            },
            safety: {
              title: kwaiSEOContent.safety.title,
              content: kwaiSEOContent.safety.content
            },
            features: {
              title: "Key Features",
              list: kwaiFeatures.map(f => `${f.title}: ${f.description}`)
            },
            faqs: {
              title: "Frequently Asked Questions",
              items: kwaiFAQs
            }
          }}
        />

        {/* Reviews Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <ReviewsSection reviews={kwaiReviews} />
          </div>
        </section>



        {/* SEO Content Footer */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">About Kwai Video Downloading</h2>
              <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Supported Platforms & Devices</h3>
                  <p className="leading-relaxed mb-4">
                    Our Kwai video downloader works seamlessly across all platforms including Windows, macOS, Linux, iOS, Android, and any device with a modern web browser. Whether you're using Chrome, Firefox, Safari, Edge, or any other browser, you'll enjoy the same fast and reliable download experience on desktop, mobile, and tablet devices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">Short & Long Video Support</h3>
                  <p className="leading-relaxed mb-4">
                    Unlike many downloaders, we support both Kwai's short-form content (15-60 seconds) and long-form videos (several minutes). Download quick comedy clips, extended tutorials, vlogs, music videos, and everything in between with the same high quality and speed.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400 mb-3">Privacy & Security</h3>
                  <p className="leading-relaxed mb-4">
                    We prioritize your privacy with no data collection, no user tracking, and no stored downloads. All connections are encrypted using HTTPS, and we never ask for personal information. Your download history stays completely private, and we don't use invasive cookies or analytics trackers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3">For Content Creators</h3>
                  <p className="leading-relaxed mb-4">
                    Perfect for social media managers building content libraries, video editors creating compilations, marketers analyzing trending content, and creators repurposing videos for Instagram Reels, TikTok, YouTube Shorts, and other platforms. Professional quality downloads for professional results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Kwai Video Downloader",
            "description": "Download Kwai videos in HD quality for free. Fast, safe, and easy Kwai video downloader. Supports both short and long videos.",
            "url": "https://snapsavepro.com/pages/kwai-video-downloader",
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
              "ratingCount": "8543",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </div >
  );
}
