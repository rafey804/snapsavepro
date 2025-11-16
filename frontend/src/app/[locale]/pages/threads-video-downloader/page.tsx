import type { Metadata } from 'next';
import ThreadsDownloader from '@/components/home/ThreadsDownloader';
import HowToDownload from '@/components/SEO/HowToDownload';
import FAQSection from '@/components/SEO/FAQSection';
import ReviewsSection from '@/components/SEO/ReviewsSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { threadsFAQs, threadsReviews, threadsStats, threadsFeatures, threadsSEOContent } from '@/data/threadsSEOData';
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
  title: 'Threads Video Downloader - Download Threads Videos in HD Quality Free | Short & Long Videos',
  description: 'Download Threads videos in HD quality for free. Fast, safe, and easy Threads video downloader. Supports both short and long videos. No watermark, no registration required.',
  keywords: 'threads video downloader, download threads videos, threads downloader, save threads videos, threads video download, threads video saver, download threads, threads downloader online, free threads downloader, threads video download hd, download threads short videos, download threads long videos',
  openGraph: {
    title: 'Threads Video Downloader - Download Threads Videos in HD Quality Free',
    description: 'Download Threads videos in HD quality for free. Fast, safe, and easy. Supports both short and long videos.',
    type: 'website',
    url: `${baseUrl}/${locale}/pages/threads-video-downloader`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Threads Video Downloader - Download Threads Videos in HD Quality Free',
    description: 'Download Threads videos in HD quality for free. Fast, safe, and easy.',
  },
  alternates: {
    canonical: `${baseUrl}/${locale}/pages/threads-video-downloader`,
      languages: {
        'en': `${baseUrl}/en/pages/threads-video-downloader`,
        'hi': `${baseUrl}/hi/pages/threads-video-downloader`,
        'zh': `${baseUrl}/zh/pages/threads-video-downloader`,
        'ur': `${baseUrl}/ur/pages/threads-video-downloader`,
        'x-default': `${baseUrl}/en/pages/threads-video-downloader`,
      },
  },
  };
}

export default function ThreadsVideoDownloaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-green-900/20 to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/pages' },
            { label: 'Threads Video Downloader', href: '/pages/threads-video-downloader' },
          ]}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Downloader Component */}
        <section className="py-8">
          <ThreadsDownloader />
        </section>

        {/* Info Section - Features Overview */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Why Choose Our Threads Video Downloader?
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Experience the fastest and most reliable way to download Threads videos with premium features, all completely free.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {threadsFeatures.map((feature, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-4">
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              How to Download Threads Videos
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Follow these simple steps to download your favorite Threads videos in seconds
            </p>
            <HowToDownload
              platform="Threads"
              platformColor="green"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-green-900/20 to-teal-900/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {threadsStats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                  {stat.icon === 'Users' && <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />}
                  {stat.icon === 'Download' && <Download className="w-12 h-12 mx-auto mb-4 text-teal-400" />}
                  {stat.icon === 'Star' && <Star className="w-12 h-12 mx-auto mb-4 text-green-400" />}
                  {stat.icon === 'Zap' && <Zap className="w-12 h-12 mx-auto mb-4 text-teal-400" />}
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Content Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="prose prose-invert prose-lg max-w-none">
              {/* What is Threads Section */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {threadsSEOContent.whatIsThreads.title}
                </h2>
                <div className="text-slate-300 leading-relaxed space-y-4">
                  {threadsSEOContent.whatIsThreads.content.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* How It Works Section */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {threadsSEOContent.howItWorks.title}
                </h2>
                <div className="text-slate-300 leading-relaxed space-y-4">
                  {threadsSEOContent.howItWorks.content.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Benefits Section */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {threadsSEOContent.benefits.title}
                </h2>
                <div className="text-slate-300 leading-relaxed space-y-4">
                  {threadsSEOContent.benefits.content.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Safety Section */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {threadsSEOContent.safety.title}
                </h2>
                <div className="text-slate-300 leading-relaxed space-y-4">
                  {threadsSEOContent.safety.content.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust our Threads video downloader
            </p>
            <ReviewsSection
              reviews={threadsReviews}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12">
              Everything you need to know about downloading Threads videos
            </p>
            <FAQSection
              faqs={threadsFAQs}
              platform="Threads"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-green-600/20 to-teal-600/20 border-2 border-green-500/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Downloading Threads Videos Now
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join the community of content creators who trust our platform for fast, reliable, and high-quality Threads video downloads. 100% free, forever.
              </p>
              <a
                href="#"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 inline-flex items-center gap-3"
              >
                <Download className="w-6 h-6" />
                Download Your First Video
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content Footer */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">About Threads Video Downloading</h2>
              <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Supported Platforms & Devices</h3>
                  <p className="leading-relaxed mb-4">
                    Our Threads video downloader works seamlessly across all platforms including Windows, macOS, Linux, iOS, Android, and any device with a modern web browser. Whether you're using Chrome, Firefox, Safari, Edge, or any other browser, you'll enjoy the same fast and reliable download experience on desktop, mobile, and tablet devices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-teal-400 mb-3">Short & Long Video Support</h3>
                  <p className="leading-relaxed mb-4">
                    Unlike many downloaders, we support both Threads's short-form content (15-60 seconds) and long-form videos (several minutes). Download quick comedy clips, extended tutorials, vlogs, music videos, and everything in between with the same high quality and speed.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">Privacy & Security</h3>
                  <p className="leading-relaxed mb-4">
                    We prioritize your privacy with no data collection, no user tracking, and no stored downloads. All connections are encrypted using HTTPS, and we never ask for personal information. Your download history stays completely private, and we don't use invasive cookies or analytics trackers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-teal-400 mb-3">For Content Creators</h3>
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
            "name": "Threads Video Downloader",
            "description": "Download Threads videos in HD quality for free. Fast, safe, and easy Threads video downloader. Supports both short and long videos.",
            "url": "https://snapsavepro.com/pages/threads-video-downloader",
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
    </div>
  );
}
