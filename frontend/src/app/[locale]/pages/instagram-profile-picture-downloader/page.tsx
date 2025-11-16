import type { Metadata } from 'next';
import InstagramProfilePicDownloader from '@/components/home/InstagramProfilePicDownloader';
import HowToDownload from '@/components/SEO/HowToDownload';
import InstagramProfileContentSection from '@/components/SEO/InstagramProfileContentSection';
import FAQSection from '@/components/SEO/FAQSection';
import ReviewsSection from '@/components/SEO/ReviewsSection';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { instagramProfileFAQs, instagramProfileReviews } from '@/data/instagramProfileSEOData';
import { Download, Users, Star, Zap, Shield, Sparkles, Image, Eye } from 'lucide-react';

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
  title: 'Instagram Profile Picture Downloader - View & Download HD DP Free',
  description: 'Download Instagram profile pictures in full HD quality. View and save any Instagram DP without login. Free, fast, and easy-to-use IG profile viewer.',
  keywords: 'instagram profile picture downloader, instagram dp viewer full size, insta dp download, instagram profile viewer, ig dp downloader, instagram dp zoom, profile picture zoom, how to download instagram profile picture, how to see full size dp on instagram, instagram dp saver, insta profile pic download',
  openGraph: {
    title: 'Instagram Profile Picture Downloader - View & Download HD DP Free',
    description: 'Download Instagram profile pictures in full HD quality. View and save any Instagram DP without login. Free, fast, and easy-to-use IG profile viewer.',
    type: 'website',
    url: `${baseUrl}/${locale}/pages/instagram-profile-picture-downloader`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Profile Picture Downloader - View & Download HD DP Free',
    description: 'Download Instagram profile pictures in full HD quality. View and save any Instagram DP without login.',
  },
  alternates: {
    canonical: `${baseUrl}/${locale}/pages/instagram-profile-picture-downloader`,
      languages: {
        'en': `${baseUrl}/en/pages/instagram-profile-picture-downloader`,
        'hi': `${baseUrl}/hi/pages/instagram-profile-picture-downloader`,
        'zh': `${baseUrl}/zh/pages/instagram-profile-picture-downloader`,
        'ur': `${baseUrl}/ur/pages/instagram-profile-picture-downloader`,
        'x-default': `${baseUrl}/en/pages/instagram-profile-picture-downloader`,
      },
  },
  };
}

export default function InstagramProfilePictureDownloaderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Tools', href: '/pages' },
            { label: 'Instagram Profile Picture Downloader', href: '/pages/instagram-profile-picture-downloader' },
          ]}
        />
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Main Downloader Component */}
        <section className="py-8">
          <InstagramProfilePicDownloader />
        </section>

        {/* Info Section - Features Overview */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Why Choose Our Instagram DP Downloader?
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              The best way to view and download Instagram profile pictures in full HD quality. Fast, secure, and completely free.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Full HD Quality</h3>
                <p className="text-slate-300">Download Instagram profile pictures in original quality. Get the highest resolution available.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Zoom & Preview</h3>
                <p className="text-slate-300">View full-size Instagram DPs with our zoom feature. Preview before downloading.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Username Only</h3>
                <p className="text-slate-300">Just enter the Instagram username. No need for URLs or complex steps.</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Login Required</h3>
                <p className="text-slate-300">Download Instagram DPs without logging in. Safe, secure, and anonymous.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Download Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              How to Download Instagram Profile Pictures
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Follow these simple steps to download any Instagram DP in seconds
            </p>
            <HowToDownload
              platform="Instagram DP"
              platformColor="blue"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1M+</div>
                <div className="text-slate-300">Happy Users</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                <Download className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">25M+</div>
                <div className="text-slate-300">DPs Downloaded</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <Star className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-slate-300">User Rating</div>
              </div>
              <div className="text-center p-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:scale-105">
                <Zap className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">&lt;5s</div>
                <div className="text-slate-300">Avg. Speed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Instagram DP Downloader Features
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Everything you need to view and download Instagram profile pictures
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Username Input', desc: 'No URL needed - just enter the Instagram username' },
                { name: 'Full HD Download', desc: 'Get original quality profile pictures up to 4K' },
                { name: 'Thumbnail Preview', desc: 'See the profile picture before downloading' },
                { name: 'Quick Download', desc: 'One-click download in seconds' },
                { name: 'Multiple Formats', desc: 'Download as JPG or PNG format' },
                { name: 'Zoom Feature', desc: 'View full-size profile pictures with zoom' },
                { name: 'No Login Required', desc: 'Download without Instagram login' },
                { name: 'Works on Private', desc: 'Download public DPs from private accounts' },
                { name: 'Mobile Friendly', desc: 'Works perfectly on all devices' },
              ].map((feature, index) => (
                <div key={index} className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-2">✅ {feature.name}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comprehensive Content Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <InstagramProfileContentSection />
        </section>

        {/* Reviews Section */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12 max-w-3xl mx-auto">
              Join millions of satisfied users who trust our Instagram DP downloader
            </p>
            <ReviewsSection
              reviews={instagramProfileReviews}
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-center text-lg mb-12">
              Everything you need to know about downloading Instagram profile pictures
            </p>
            <FAQSection
              faqs={instagramProfileFAQs}
              platform="Instagram Profile Picture"
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-2 border-blue-500/30 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Downloading Instagram DPs Now
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                View and download Instagram profile pictures in full HD quality. Fast, secure, and completely free. No login, no app, no hassle.
              </p>
              <a
                href="#"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 inline-flex items-center gap-3"
              >
                <Download className="w-6 h-6" />
                Download Instagram DP
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content Footer */}
        <section className="py-12 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="prose prose-invert prose-sm max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">About Instagram Profile Picture Downloading</h2>
              <div className="grid md:grid-cols-2 gap-8 text-slate-300">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">How to Download Instagram Profile Pictures</h3>
                  <p className="leading-relaxed mb-4">
                    Our Instagram profile picture downloader is the easiest way to view and save Instagram DPs in full HD quality. Simply enter the Instagram username (no @ symbol needed), and our tool will fetch the profile picture in its original quality. No need to login to Instagram or download any app. Works with all Instagram accounts - personal, business, and creator accounts.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">Full HD Quality & Format Options</h3>
                  <p className="leading-relaxed mb-4">
                    Download Instagram profile pictures in original quality up to 4K resolution. We support JPG and PNG formats for maximum compatibility. Our tool fetches the highest quality version available from Instagram servers. No compression, no watermarks, no quality loss. Perfect for contact lists, presentations, or personal collections.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Zoom & View Full Size Instagram DPs</h3>
                  <p className="leading-relaxed mb-4">
                    Instagram doesn't allow you to see profile pictures in full size on their app or website. Our Instagram DP viewer solves this problem. View any Instagram profile picture in full size with our zoom feature. Preview the high-resolution image before downloading. Works on both mobile and desktop devices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">Privacy & Security</h3>
                  <p className="leading-relaxed mb-4">
                    Your privacy is our top priority. We don't store any Instagram profile pictures or user data. No login required, no registration needed. All downloads are processed securely with encrypted connections. Completely anonymous and safe to use. We respect Instagram's terms of service and only access publicly available profile pictures.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Works on Private Accounts (Public DPs)</h3>
                  <p className="leading-relaxed mb-4">
                    Our tool can download profile pictures from private Instagram accounts if the DP is set to public. Instagram profile pictures are usually visible even for private accounts. If you can see the profile picture on Instagram, you can download it with our tool. Perfect for saving contact photos or profile pictures of friends and family.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">For Everyone</h3>
                  <p className="leading-relaxed mb-4">
                    Perfect for social media managers, content creators, designers, marketers, and anyone who needs high-quality Instagram profile pictures. Use for contact lists, team directories, presentations, social media management, or personal photo collections. Fast, reliable, and easy to use on any device.
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
            "name": "Instagram Profile Picture Downloader",
            "description": "Download Instagram profile pictures in full HD quality. View and save any Instagram DP without login. Free, fast, and easy-to-use IG profile viewer.",
            "url": "https://snapsavepro.com/pages/instagram-profile-picture-downloader",
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
              "ratingCount": "28456",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
    </div>
  );
}
