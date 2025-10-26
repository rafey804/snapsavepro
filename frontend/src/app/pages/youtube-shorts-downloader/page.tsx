import React from 'react';
import type { Metadata } from 'next';
import ShortsDownloader from '@/components/home/ShortsDownloader';

export const metadata: Metadata = {
  title: 'YouTube Shorts Downloader - Download YouTube Shorts Videos in HD Quality',
  description: 'Download YouTube Shorts videos in high quality for free. Fast, easy-to-use YouTube Shorts downloader. Save YouTube Shorts to your device instantly without watermark.',
  keywords: 'youtube shorts downloader, download youtube shorts, youtube shorts download, save youtube shorts, youtube shorts video downloader, youtube shorts saver, download shorts, youtube shorts HD download, youtube shorts no watermark',
  authors: [{ name: 'SnapSavePro' }],
  openGraph: {
    title: 'YouTube Shorts Downloader - Download YouTube Shorts Videos Free',
    description: 'Download YouTube Shorts videos in high quality. Fast, free, and easy. The best YouTube Shorts video downloader online.',
    type: 'website',
    url: 'https://snapsavepro.com/pages/youtube-shorts-downloader',
    images: [
      {
        url: '/youtube-shorts-downloader-og.jpg',
        width: 1200,
        height: 630,
        alt: 'YouTube Shorts Downloader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Shorts Downloader - Save YouTube Shorts in HD',
    description: 'Download YouTube Shorts videos without watermark. Fast, free, and high quality downloads.',
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/youtube-shorts-downloader',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YouTube Shorts Downloader',
  applicationCategory: 'MultimediaApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '5428',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Any',
  description: 'Free online YouTube Shorts video downloader. Download YouTube Shorts in high quality without watermark.',
  featureList: [
    'High quality video downloads',
    'No watermark',
    'Multiple format options',
    'Fast download speed',
    'Free to use',
    'No registration required',
  ],
};

export default function ShortsDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        {/* Main Downloader Component */}
        <ShortsDownloader />

        {/* SEO Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-violet-500 bg-clip-text text-transparent">
              YouTube Shorts Downloader - Save YouTube Shorts Videos Easily
            </h2>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Our <strong className="text-violet-400">YouTube Shorts Downloader</strong> is the best free tool to download YouTube Shorts videos
                in high quality without any watermark. Save your favorite YouTube Shorts directly to your device with just a few clicks.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">How to Download YouTube Shorts</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li><strong className="text-white">Copy the YouTube Shorts link:</strong> Open YouTube app or website, find the Short you want to download, and copy its URL</li>
                <li><strong className="text-white">Paste the URL:</strong> Paste the YouTube Shorts link in the input box above</li>
                <li><strong className="text-white">Click "Get Video":</strong> Our tool will analyze the video and fetch all available formats</li>
                <li><strong className="text-white">Choose quality:</strong> Select your preferred video quality or audio format</li>
                <li><strong className="text-white">Download:</strong> Click the download button and save the file to your device</li>
              </ol>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-violet-400">High Quality Downloads:</strong> Download YouTube Shorts in the best available quality including HD and Full HD</li>
                <li><strong className="text-violet-400">No Watermark:</strong> All downloads are watermark-free, giving you clean videos</li>
                <li><strong className="text-violet-400">Multiple Formats:</strong> Choose from various video formats (MP4, WebM) and audio formats (MP3, M4A)</li>
                <li><strong className="text-violet-400">Fast & Secure:</strong> Lightning-fast downloads with secure connections</li>
                <li><strong className="text-violet-400">Free Forever:</strong> Completely free to use with no hidden charges or subscriptions</li>
                <li><strong className="text-violet-400">No Registration:</strong> Download without creating an account or logging in</li>
                <li><strong className="text-violet-400">All Devices:</strong> Works on desktop, mobile, and tablet devices</li>
                <li><strong className="text-violet-400">Audio Extraction:</strong> Extract and download audio from YouTube Shorts in high quality</li>
              </ul>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Choose Our YouTube Shorts Downloader?</h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike other YouTube Shorts downloaders, our tool offers the <strong className="text-white">highest quality downloads</strong> without
                any watermarks or branding. Our advanced technology ensures fast processing and downloading, making it the most efficient
                YouTube Shorts video downloader available online.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-xl p-5 border border-violet-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Is it legal to download YouTube Shorts?</h4>
                  <p className="text-gray-300">
                    Downloading YouTube Shorts for personal use is generally acceptable, but you should respect copyright laws and
                    the content creator's rights. Always obtain permission before reposting or using someone else's content commercially.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-purple-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Can I download private YouTube Shorts?</h4>
                  <p className="text-gray-300">
                    No, our tool only works with publicly accessible YouTube content. Private videos and age-restricted content
                    cannot be downloaded to protect user privacy.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-indigo-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Do I need to install any software?</h4>
                  <p className="text-gray-300">
                    No installation required! Our YouTube Shorts downloader is entirely web-based. Just paste the link and download -
                    it works directly in your browser on any device.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-violet-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">What video quality can I download?</h4>
                  <p className="text-gray-300">
                    We provide the highest quality available from YouTube, typically up to 1080p Full HD. The available qualities
                    depend on how the original video was uploaded.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-purple-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Is there a download limit?</h4>
                  <p className="text-gray-300">
                    No, there are no limits! You can download as many YouTube Shorts as you want, completely free.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-indigo-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Does it work on mobile devices?</h4>
                  <p className="text-gray-300">
                    Yes! Our YouTube Shorts downloader is fully responsive and works perfectly on all devices including smartphones,
                    tablets, and desktop computers.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl p-6 border border-violet-500/30 mt-8">
                <h4 className="text-xl font-bold text-white mb-3">Pro Tip:</h4>
                <p className="text-gray-300">
                  For the best experience, always copy the full YouTube URL including "https://". You can get the link by clicking
                  the Share button on any YouTube Short and copying the URL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
