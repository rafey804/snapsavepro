import type { Metadata } from 'next';
import ProfilePictureDownloader from '@/components/home/ProfilePictureDownloader';
import HowToDownload from '@/components/SEO/HowToDownload';
import ProfilePicContentSection from '@/components/SEO/ProfilePicContentSection';
import FAQSection from '@/components/SEO/FAQSection';
import ReviewsSection from '@/components/SEO/ReviewsSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { profilePicFAQs, profilePicReviews } from '@/data/profilePicSEOData';
import { Download, Users, Star, Zap, Shield, Sparkles, Globe, Image } from 'lucide-react';

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
  title: 'Profile Picture Downloader - Instagram, FB, Twitter DP Viewer | SnapSavePro',
  description: 'Download any profile picture in full HD from Instagram, Facebook, Twitter, TikTok. Free online DP viewer - no app, no login required. Get HD quality DPs instantly.',
  keywords: 'profile picture downloader, instagram dp viewer full size, facebook profile pic in hd, profile picture zoom, dp viewer online, instagram profile viewer, insta dp download, fb dp downloader, twitter dp saver, how to download instagram profile picture, how to see full size dp on instagram, can i download someone\'s profile picture, how to save facebook dp in hd',
  openGraph: {
    title: 'Profile Picture Downloader - Instagram, FB, Twitter DP Viewer | SnapSavePro',
    description: 'Download any profile picture in full HD from Instagram, Facebook, Twitter, TikTok. Free online DP viewer - no app, no login required.',
    type: 'website',
    url: `${baseUrl}/${locale}/pages/profile-picture-downloader`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profile Picture Downloader - Instagram, FB, Twitter DP Viewer | SnapSavePro',
    description: 'Download any profile picture in full HD from Instagram, Facebook, Twitter, TikTok. Free online DP viewer.',
  },
  alternates: {
    canonical: `${baseUrl}/en/pages/profile-picture-downloader`,
      languages: {
        'en': `${baseUrl}/en/pages/profile-picture-downloader`,
        'hi': `${baseUrl}/hi/pages/profile-picture-downloader`,
        'zh': `${baseUrl}/zh/pages/profile-picture-downloader`,
        'ur': `${baseUrl}/ur/pages/profile-picture-downloader`,
        'x-default': `${baseUrl}/en/pages/profile-picture-downloader`,
      },
  },
  };
}

export default function ProfilePictureDownloaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-cyan-900/20 to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/pages' },
            { label: 'Profile Picture Downloader', href: '/pages/profile-picture-downloader' },
          ]}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Downloader Component */}
        <section className="py-8">
          <ProfilePictureDownloader />
        </section>

        {/* Info Section - Features Overview */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose Our Profile Picture Downloader?
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Download profile pictures from all major social media platforms in full HD quality. Fast, secure, and completely free.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">All Platforms</h3>
                <p className="text-slate-300">Support for Instagram, Facebook, Twitter, TikTok, YouTube, LinkedIn, and more. All in one place.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Full HD Quality</h3>
                <p className="text-slate-300">Download profile pictures in original quality. No compression, no watermarks, crystal clear images.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Preview</h3>
                <p className="text-slate-300">View full-size profile pictures instantly with our zoom feature before downloading.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Login Required</h3>
                <p className="text-slate-300">Download any profile picture without logging in. Safe, secure, and completely anonymous.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Download Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              How to Download Profile Pictures
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Follow these simple steps to download any profile picture in seconds
            </p>
            <HowToDownload
              platform="Profile Picture"
              platformColor="cyan"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">800K+</div>
                <div className="text-slate-300">Happy Users</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <Download className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">15M+</div>
                <div className="text-slate-300">DPs Downloaded</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
                <Star className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.8/5</div>
                <div className="text-slate-300">User Rating</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <Globe className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">8+</div>
                <div className="text-slate-300">Platforms</div>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Platforms Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Supported Social Media Platforms
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Download profile pictures from all major social networks
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Instagram', desc: 'Download Instagram DPs in full HD quality' },
                { name: 'Facebook', desc: 'Get Facebook profile pictures in original size' },
                { name: 'Twitter/X', desc: 'Save Twitter profile images in high quality' },
                { name: 'TikTok', desc: 'Download TikTok profile pictures easily' },
                { name: 'YouTube', desc: 'Get YouTube channel profile pictures' },
                { name: 'LinkedIn', desc: 'Download LinkedIn profile photos' },
                { name: 'WhatsApp', desc: 'Save WhatsApp profile pictures' },
                { name: 'Telegram', desc: 'Download Telegram profile photos' },
              ].map((platform, index) => (
                <div key={index} className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">{platform.name}</h3>
                  <p className="text-slate-400 text-sm">{platform.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Content Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <ProfilePicContentSection />
        </section>

        {/* Reviews Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust our profile picture downloader
            </p>
            <ReviewsSection
              reviews={profilePicReviews}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12">
              Everything you need to know about downloading profile pictures
            </p>
            <FAQSection
              faqs={profilePicFAQs}
              platform="Profile Picture"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-2 border-cyan-500/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Downloading Profile Pictures Now
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Access profile pictures from all major social media platforms in full HD quality. Fast, secure, and completely free. No login required.
              </p>
              <a
                href="#"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 inline-flex items-center gap-3"
              >
                <Download className="w-6 h-6" />
                Download Your First DP
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content Footer */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">About Profile Picture Downloading</h2>
              <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">All Platforms Supported</h3>
                  <p className="leading-relaxed mb-4">
                    Our universal profile picture downloader supports Instagram, Facebook, Twitter/X, TikTok, YouTube, LinkedIn, WhatsApp, Telegram, and more. Download any profile picture in full HD quality with just a username or profile URL. Works across all devices and platforms.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Full HD Quality & Multiple Formats</h3>
                  <p className="leading-relaxed mb-4">
                    Download profile pictures in original quality up to 4K resolution. We support JPG, PNG, and WebP formats. Get the highest quality profile pictures with no compression or watermarks. Perfect for personal use or professional purposes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Privacy & Security</h3>
                  <p className="leading-relaxed mb-4">
                    Your privacy is our priority. We don't store any images or profile data. No login required, no registration needed. All downloads are processed securely with encrypted connections. Completely anonymous and safe to use.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">For Everyone</h3>
                  <p className="leading-relaxed mb-4">
                    Perfect for designers, content creators, marketers, and anyone who needs high-quality profile pictures. Use for contact lists, presentations, social media management, or personal collections. Fast, reliable, and easy to use.
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
            "name": "Profile Picture Downloader",
            "description": "Download profile pictures in full HD from Instagram, Facebook, Twitter, TikTok, and more. Free online DP viewer and downloader.",
            "url": "https://snapsavepro.com/pages/profile-picture-downloader",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "15823",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </div>
  );
}
