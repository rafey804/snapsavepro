import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import TwitchDownloader from '@/components/home/TwitchDownloader';
import HowToDownload from '@/components/SEO/HowToDownload';
import InfoSection from '@/components/SEO/InfoSection';
import TwitchContentSection from '@/components/SEO/TwitchContentSection';
import FAQSection from '@/components/SEO/FAQSection';

import Breadcrumb from '@/components/layout/Breadcrumb';
import { twitchFAQs, twitchReviews, twitchInfo } from '@/data/twitchSEOData';
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

        {/* Info Section - Features Overview */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose Our Twitch Clip Downloader?
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Experience the fastest and most reliable way to download Twitch clips with premium features, all completely free.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Downloads</h3>
                <p className="text-slate-300">Get your Twitch clips in seconds with our lightning-fast processing system. No waiting, no delays.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Safe & Secure</h3>
                <p className="text-slate-300">Your privacy is protected. We don't store clips or track your activity. All downloads are encrypted.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">HD Quality</h3>
                <p className="text-slate-300">Download in original quality up to 1080p60fps. No compression, no quality loss, just pure excellence.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Registration</h3>
                <p className="text-slate-300">Start downloading immediately. No accounts, no sign-ups, no email required. Completely anonymous.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Download Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How to Download Twitch Clips
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Follow these simple steps to download your favorite Twitch clips in seconds
            </p>
            <HowToDownload
              platform="Twitch"
              platformColor="purple"
            />
          </div>
        </section>

        {/* Info Section with Unique Content */}
        <InfoSection
          platform="Twitch"
          platformColor="purple"
          customTitle={twitchInfo.title}
          customDescription={twitchInfo.description}
          customFeatures={twitchInfo.features}
        />

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">500K+</div>
                <div className="text-slate-300">Happy Users</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
                <Download className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
                <div className="text-slate-300">Clips Downloaded</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <Star className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-slate-300">User Rating</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 hover:scale-105">
                <Zap className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">&lt;10s</div>
                <div className="text-slate-300">Avg. Speed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive Content Section */}
        <section className="py-12">
          <TwitchContentSection />
        </section>

        {/* Reviews Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust our Twitch clip downloader
            </p>
              reviews={twitchReviews}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12">
              Everything you need to know about downloading Twitch clips
            </p>
            <FAQSection
              faqs={twitchFAQs}
              platform="Twitch"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Downloading Twitch Clips Now
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join the community of gamers and content creators who trust our platform for fast, reliable, and high-quality Twitch clip downloads. 100% free, forever.
              </p>
              <a
                href="#"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 inline-flex items-center gap-3"
              >
                <Download className="w-6 h-6" />
                Download Your First Clip
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content Footer */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">About Twitch Clip Downloading</h2>
              <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Supported Platforms & Devices</h3>
                  <p className="leading-relaxed mb-4">
                    Our Twitch clip downloader works seamlessly across all platforms including Windows, macOS, Linux, iOS, Android, and any device with a modern web browser. Whether you're using Chrome, Firefox, Safari, Edge, or any other browser, you'll enjoy the same fast and reliable download experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-400 mb-3">Quality & Format Options</h3>
                  <p className="leading-relaxed mb-4">
                    We support all Twitch streaming qualities from source/1080p60fps down to 360p, giving you complete control over file size and quality. Choose from MP4, WebM, and FLV video formats, or extract audio-only files in MP3 and AAC formats for maximum flexibility.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Privacy & Security</h3>
                  <p className="leading-relaxed mb-4">
                    We prioritize your privacy with no data collection, no user tracking, and no stored downloads. All connections are encrypted, and we never ask for personal information. Your download history stays private, and we don't use invasive cookies or analytics.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-pink-400 mb-3">For Content Creators</h3>
                  <p className="leading-relaxed mb-4">
                    Perfect for streamers building highlight reels, esports teams creating promotional content, video editors compiling montages, and content creators repurposing clips for YouTube, TikTok, Instagram, and other platforms. Professional quality downloads for professional results.
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
