import React from 'react';
import type { Metadata } from 'next';
import LinkedInDownloader from '@/components/home/LinkedInDownloader';

export const metadata: Metadata = {
  title: 'LinkedIn Video Downloader - Download LinkedIn Videos in HD 1080p Quality | Free',
  description: 'Best free LinkedIn video downloader online. Download LinkedIn videos in HD 1080p, 720p, 480p quality. Save professional videos, webinars, and educational content from LinkedIn. Fast, secure, and no registration required.',
  keywords: 'linkedin video downloader, download linkedin video, linkedin downloader, linkedin video download free, save linkedin videos, linkedin video saver, download linkedin posts, linkedin HD download 1080p, linkedin video tool, linkedin video downloader online, linkedin video to mp4, linkedin video converter, download linkedin content, linkedin professional video download, linkedin webinar download, linkedin educational video download, free linkedin downloader, best linkedin video downloader, linkedin video extractor, linkedin media downloader',
  authors: [{ name: 'SnapSavePro' }],
  openGraph: {
    title: 'LinkedIn Video Downloader - Download Videos in HD 1080p Quality | Free',
    description: 'Best free LinkedIn video downloader. Download professional videos, webinars & educational content in HD 1080p, 720p. Fast, secure, no registration required.',
    type: 'website',
    url: 'https://snapsavepro.com/pages/linkedin-video-downloader',
    siteName: 'SnapSavePro',
    locale: 'en_US',
    images: [
      {
        url: '/linkedin-downloader-og.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Video Downloader - Download HD Videos Free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Video Downloader - Save Videos in HD 1080p Quality',
    description: 'Download LinkedIn videos in HD quality. Free, fast, and secure. No registration required.',
    site: '@SnapSavePro',
    creator: '@SnapSavePro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/linkedin-video-downloader',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'LinkedIn Video Downloader - SnapSavePro',
  applicationCategory: 'MultimediaApplication',
  url: 'https://snapsavepro.com/pages/linkedin-video-downloader',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '3847',
    bestRating: '5',
    worstRating: '1',
  },
  operatingSystem: 'Windows, MacOS, Linux, Android, iOS',
  browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
  softwareVersion: '2.0',
  datePublished: '2024-01-15',
  dateModified: '2025-10-28',
  author: {
    '@type': 'Organization',
    name: 'SnapSavePro',
    url: 'https://snapsavepro.com',
  },
  description: 'Best free LinkedIn video downloader online. Download LinkedIn professional videos, webinars, and educational content in HD 1080p, 720p, 480p quality. Fast, secure, and no registration required.',
  featureList: [
    'Download LinkedIn videos in HD 1080p, 720p, 480p quality',
    'Multiple video and audio format options (MP4, WebM, MP3, M4A)',
    'Lightning-fast download speed',
    'Completely free to use with no hidden charges',
    'No registration or login required',
    'Professional and secure downloads',
    'Extract audio from LinkedIn videos',
    'Works on all devices - desktop, mobile, tablet',
    'Download professional videos and webinars',
    'Save educational content for offline viewing',
  ],
  screenshot: 'https://snapsavepro.com/linkedin-downloader-screenshot.jpg',
  applicationSubCategory: 'Video Downloader',
  keywords: 'linkedin video downloader, download linkedin video, linkedin downloader, save linkedin videos, linkedin video to mp4, linkedin video converter, free linkedin downloader',
};

export default function LinkedInDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900">
        {/* Main Downloader Component */}
        <LinkedInDownloader />

        {/* SEO Content Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              LinkedIn Video Downloader - Save LinkedIn Videos Professionally
            </h2>

            <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
              <p className="text-lg leading-relaxed">
                Our <strong className="text-blue-400">LinkedIn Video Downloader</strong> is the best free tool to download LinkedIn videos
                in high quality. Save professional content, educational videos, and inspiring posts directly to your device
                with just a few clicks.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">How to Download LinkedIn Videos</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li><strong className="text-white">Copy the LinkedIn link:</strong> Open LinkedIn, find the video post you want to download, and copy its URL</li>
                <li><strong className="text-white">Paste the URL:</strong> Paste the LinkedIn link in the input box above</li>
                <li><strong className="text-white">Click "Get Video Info":</strong> Our tool will analyze the video and fetch all available formats</li>
                <li><strong className="text-white">Choose quality:</strong> Select your preferred video quality or audio format</li>
                <li><strong className="text-white">Download:</strong> Click the download button and save the file to your device</li>
              </ol>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-blue-400">High Quality Downloads:</strong> Download LinkedIn videos in the best available quality including HD and Full HD</li>
                <li><strong className="text-blue-400">Multiple Formats:</strong> Choose from various video formats (MP4, WebM) and audio formats (MP3, M4A)</li>
                <li><strong className="text-blue-400">Fast & Secure:</strong> Lightning-fast downloads with secure connections</li>
                <li><strong className="text-blue-400">Free Forever:</strong> Completely free to use with no hidden charges or subscriptions</li>
                <li><strong className="text-blue-400">No Registration:</strong> Download without creating an account or logging in</li>
                <li><strong className="text-blue-400">All Devices:</strong> Works on desktop, mobile, and tablet devices</li>
                <li><strong className="text-blue-400">Audio Extraction:</strong> Extract and download audio from LinkedIn videos in high quality</li>
                <li><strong className="text-blue-400">Professional Grade:</strong> Perfect for saving educational content, webinars, and professional presentations</li>
              </ul>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Choose Our LinkedIn Downloader?</h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike other LinkedIn downloaders, our tool offers the <strong className="text-white">highest quality downloads</strong> with
                a professional and user-friendly interface. We support all types of LinkedIn video content including professional posts,
                educational videos, webinars, and more. Our advanced technology ensures fast processing and downloading, making it the most
                efficient LinkedIn video downloader available online.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Perfect For</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li><strong className="text-white">Professional Development:</strong> Save educational videos and training content for offline viewing</li>
                <li><strong className="text-white">Research & Learning:</strong> Download industry insights and expert presentations</li>
                <li><strong className="text-white">Content Creators:</strong> Reference and study successful LinkedIn video content</li>
                <li><strong className="text-white">Marketing Teams:</strong> Analyze competitor videos and industry trends</li>
                <li><strong className="text-white">Business Professionals:</strong> Keep important webinars and conference videos</li>
              </ul>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Frequently Asked Questions</h3>

              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Is it legal to download LinkedIn videos?</h4>
                  <p className="text-gray-300">
                    Downloading LinkedIn videos for personal use is generally acceptable, but you should respect copyright laws and
                    the content creator's rights. Always obtain permission before reposting or using someone else's content commercially.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Can I download private LinkedIn videos?</h4>
                  <p className="text-gray-300">
                    No, our tool only works with publicly accessible LinkedIn content. Private posts and restricted content
                    cannot be downloaded to protect user privacy and maintain professional standards.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Do I need to install any software?</h4>
                  <p className="text-gray-300">
                    No installation required! Our LinkedIn downloader is entirely web-based. Just paste the link and download -
                    it works directly in your browser on any device.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">What video quality can I download?</h4>
                  <p className="text-gray-300">
                    We provide the highest quality available from LinkedIn, typically up to 1080p Full HD. The available qualities
                    depend on how the original video was uploaded.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Is there a download limit?</h4>
                  <p className="text-gray-300">
                    No, there are no limits! You can download as many LinkedIn videos as you want, completely free.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Does it work on mobile devices?</h4>
                  <p className="text-gray-300">
                    Yes! Our LinkedIn downloader is fully responsive and works perfectly on all devices including smartphones,
                    tablets, and desktop computers.
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-5 border border-blue-500/20">
                  <h4 className="text-lg font-bold text-white mb-2">Can I download audio only from LinkedIn videos?</h4>
                  <p className="text-gray-300">
                    Yes! Our tool supports audio extraction. Simply switch to "Audio" mode after fetching the video information,
                    and you can download the audio in MP3 format.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl p-6 border border-blue-500/30 mt-8">
                <h4 className="text-xl font-bold text-white mb-3">Pro Tip:</h4>
                <p className="text-gray-300">
                  To get the best link from LinkedIn, click on the post's timestamp or the three dots menu and select "Copy link to post".
                  This ensures you get the full URL for optimal downloading. LinkedIn video URLs typically start with
                  "https://www.linkedin.com/posts/" or "https://www.linkedin.com/feed/update/".
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20 mt-6">
                <h4 className="text-xl font-bold text-white mb-3">Privacy & Security</h4>
                <p className="text-gray-300">
                  We take your privacy seriously. Our LinkedIn video downloader doesn't store any of your data, video files, or
                  LinkedIn information. All downloads are processed securely, and no personal information is collected or shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
