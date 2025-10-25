import React from 'react';
import type { Metadata } from 'next';
import InstagramDownloader from '@/components/home/InstagramDownloader';

export const metadata: Metadata = {
  title: 'Instagram Reels Downloader - Download Instagram Videos & Reels in HD Quality',
  description: 'Download Instagram Reels, Posts, and IGTV videos in high quality without watermark. Fast, free, and easy-to-use Instagram video downloader. Save Instagram videos to your device instantly.',
  keywords: 'instagram downloader, instagram reels downloader, download instagram video, instagram video download, save instagram reels, instagram video saver, download reels, instagram no watermark, instagram HD download, download instagram posts, IGTV downloader',
  authors: [{ name: 'SnapSavePro' }],
  openGraph: {
    title: 'Instagram Reels Downloader - Download Instagram Videos Without Watermark',
    description: 'Download Instagram Reels, Posts, and IGTV videos in high quality. Fast, free, and no watermark. The best Instagram video downloader online.',
    type: 'website',
    url: 'https://snapsavepro.com/pages/instagram-reels-downloader',
    images: [
      {
        url: '/instagram-downloader-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Instagram Reels Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Reels Downloader - Save Instagram Videos in HD',
    description: 'Download Instagram Reels and videos without watermark. Fast, free, and high quality downloads.',
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/instagram-reels-downloader',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Instagram Reels Downloader',
  applicationCategory: 'MultimediaApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '6234',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Any',
  description: 'Free online Instagram Reels and video downloader. Download Instagram content in high quality without watermark.',
  featureList: [
    'High quality video downloads',
    'No watermark',
    'Multiple format options',
    'Fast download speed',
    'Free to use',
    'No registration required',
  ],
};

export default function InstagramDownloaderPage() {
  return (
    <>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        {/* Main Downloader Component */}
        <InstagramDownloader />

        {/* SEO Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Instagram Reels Downloader - Save Instagram Videos Easily
            </h2>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Our <strong className="text-teal-400">Instagram Reels Downloader</strong> is the best free tool to download Instagram Reels,
                Posts, and IGTV videos in high quality without any watermark. Save your favorite Instagram content directly to your device
                with just a few clicks.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">How to Download Instagram Reels</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li><strong className="text-white">Copy the Instagram link:</strong> Open Instagram app or website, find the Reel or video you want to download, and copy its URL</li>
                <li><strong className="text-white">Paste the URL:</strong> Paste the Instagram link in the input box above</li>
                <li><strong className="text-white">Click "Get Video":</strong> Our tool will analyze the video and fetch all available formats</li>
                <li><strong className="text-white">Choose quality:</strong> Select your preferred video quality or audio format</li>
                <li><strong className="text-white">Download:</strong> Click the download button and save the file to your device</li>
              </ol>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-teal-400">High Quality Downloads:</strong> Download Instagram Reels in the best available quality including HD and Full HD</li>
                <li><strong className="text-teal-400">No Watermark:</strong> All downloads are watermark-free, giving you clean videos</li>
                <li><strong className="text-teal-400">Multiple Formats:</strong> Choose from various video formats (MP4, WebM) and audio formats (MP3, M4A)</li>
                <li><strong className="text-teal-400">Fast & Secure:</strong> Lightning-fast downloads with secure connections</li>
                <li><strong className="text-teal-400">Free Forever:</strong> Completely free to use with no hidden charges or subscriptions</li>
                <li><strong className="text-teal-400">No Registration:</strong> Download without creating an account or logging in</li>
                <li><strong className="text-teal-400">All Devices:</strong> Works on desktop, mobile, and tablet devices</li>
                <li><strong className="text-teal-400">Audio Extraction:</strong> Extract and download audio from Instagram videos in high quality</li>
              </ul>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Choose Our Instagram Downloader?</h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike other Instagram downloaders, our tool offers the <strong className="text-white">highest quality downloads</strong> without
                any watermarks or branding. We support all types of Instagram content including Reels, regular posts, IGTV videos, and more.
                Our advanced technology ensures fast processing and downloading, making it the most efficient Instagram video downloader available online.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Supported Instagram Content Types</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Instagram Reels:</strong> Download trending Reels in HD quality</li>
                <li><strong className="text-white">Instagram Posts:</strong> Save video posts from any public account</li>
                <li><strong className="text-white">IGTV Videos:</strong> Download long-form IGTV content</li>
                <li><strong className="text-white">Instagram Stories:</strong> Save stories before they disappear (if shared as posts)</li>
              </ul>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Is it legal to download Instagram videos?</h4>
                  <p className="text-gray-300">
                    Downloading Instagram videos for personal use is generally acceptable, but you should respect copyright laws and
                    the content creator's rights. Always obtain permission before reposting or using someone else's content commercially.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Can I download private Instagram videos?</h4>
                  <p className="text-gray-300">
                    No, our tool only works with publicly accessible Instagram content. Private accounts and age-restricted content
                    cannot be downloaded to protect user privacy.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-cyan-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Do I need to install any software?</h4>
                  <p className="text-gray-300">
                    No installation required! Our Instagram downloader is entirely web-based. Just paste the link and download -
                    it works directly in your browser on any device.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-teal-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">What video quality can I download?</h4>
                  <p className="text-gray-300">
                    We provide the highest quality available from Instagram, typically up to 1080p Full HD. The available qualities
                    depend on how the original video was uploaded.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Is there a download limit?</h4>
                  <p className="text-gray-300">
                    No, there are no limits! You can download as many Instagram videos and Reels as you want, completely free.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-cyan-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Does it work on mobile devices?</h4>
                  <p className="text-gray-300">
                    Yes! Our Instagram downloader is fully responsive and works perfectly on all devices including smartphones,
                    tablets, and desktop computers.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl p-6 border border-teal-500/30 mt-8">
                <h4 className="text-xl font-bold text-white mb-3">Pro Tip:</h4>
                <p className="text-gray-300">
                  For the best experience, always copy the full Instagram URL including "https://". You can get the link by clicking
                  the three dots menu on any Instagram post and selecting "Copy Link" or "Share to..." and then copying the URL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
