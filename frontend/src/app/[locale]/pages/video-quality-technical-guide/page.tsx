import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MonitorPlay,
  Settings,
  Zap,
  HardDrive,
  Wifi,
  Film,
  Music,
  Image,
  TrendingUp
} from 'lucide-react';

import { constructMetadata } from '@/utils/seo';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // We might not have translations for this guide yet, so we can use hardcoded strings or fetch if available.
  // For now, I will use the existing hardcoded strings but wrapped in constructMetadata to fix the canonicals.

  return constructMetadata({
    title: 'Video Quality Technical Guide - Codecs, Bitrates, Resolutions Explained | SnapSavePro',
    description: 'Complete technical guide to video quality: understanding codecs (H.264, VP9, AV1), bitrates, resolutions (4K, 1080p, 720p), file formats, and optimal download settings.',
    keywords: 'video quality, codecs, bitrate, resolution, h264, vp9, av1, 4k video, 1080p, 720p, mp4, webm, video formats, compression',
    path: '/pages/video-quality-technical-guide',
    locale,
    image: '/og-multi-platform-downloader.png', // Using default or specific if available
  });
}

export default function VideoQualityTechnicalGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-blue-600/5 to-purple-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <MonitorPlay className="w-12 h-12 text-cyan-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Video Quality Technical Guide
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Master the technical aspects of video quality. Understand codecs, bitrates, resolutions, and compression
            to make informed decisions about video downloads and achieve optimal quality for your needs.
          </p>
        </header>

        {/* Understanding Resolution */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Image className="w-8 h-8 text-cyan-400" />
              Understanding Video Resolution
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Video resolution refers to the number of pixels displayed in each dimension. Higher resolution means more detail
                and sharper images, but also significantly larger file sizes. Understanding resolution helps you choose the right
                quality for your device, bandwidth, and storage constraints.
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left p-4 text-white font-semibold">Resolution Name</th>
                      <th className="text-left p-4 text-white font-semibold">Pixels</th>
                      <th className="text-left p-4 text-white font-semibold">Total Pixels</th>
                      <th className="text-left p-4 text-white font-semibold">File Size (10 min)</th>
                      <th className="text-left p-4 text-white font-semibold">Best Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">8K UHD</td>
                      <td className="p-4 text-gray-300">7680x4320</td>
                      <td className="p-4 text-gray-300">33.2 megapixels</td>
                      <td className="p-4 text-gray-300">2-4 GB</td>
                      <td className="p-4 text-emerald-400">Professional editing, future-proofing</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">4K UHD</td>
                      <td className="p-4 text-gray-300">3840x2160</td>
                      <td className="p-4 text-gray-300">8.3 megapixels</td>
                      <td className="p-4 text-gray-300">800 MB - 1.5 GB</td>
                      <td className="p-4 text-emerald-400">Large screens, video editing, archival</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">1440p QHD</td>
                      <td className="p-4 text-gray-300">2560x1440</td>
                      <td className="p-4 text-gray-300">3.7 megapixels</td>
                      <td className="p-4 text-gray-300">400-600 MB</td>
                      <td className="p-4 text-emerald-400">Gaming, high-quality desktop viewing</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">1080p Full HD</td>
                      <td className="p-4 text-gray-300">1920x1080</td>
                      <td className="p-4 text-gray-300">2.1 megapixels</td>
                      <td className="p-4 text-gray-300">200-400 MB</td>
                      <td className="p-4 text-emerald-400">Most users, laptops, TVs, general use</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">720p HD</td>
                      <td className="p-4 text-gray-300">1280x720</td>
                      <td className="p-4 text-gray-300">0.9 megapixels</td>
                      <td className="p-4 text-gray-300">100-200 MB</td>
                      <td className="p-4 text-emerald-400">Mobile devices, limited bandwidth</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">480p SD</td>
                      <td className="p-4 text-gray-300">854x480</td>
                      <td className="p-4 text-gray-300">0.4 megapixels</td>
                      <td className="p-4 text-gray-300">50-100 MB</td>
                      <td className="p-4 text-emerald-400">Slow connections, storage-limited</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-cyan-400 font-medium">360p</td>
                      <td className="p-4 text-gray-300">640x360</td>
                      <td className="p-4 text-gray-300">0.2 megapixels</td>
                      <td className="p-4 text-gray-300">25-50 MB</td>
                      <td className="p-4 text-emerald-400">Preview, very slow connections</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Choosing the Right Resolution</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">When to Choose 4K (3840x2160)</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>You have a 4K TV or monitor (55"+ screen size)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>You plan to edit the video professionally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>You want to crop or zoom without quality loss</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>Archiving important content for long-term preservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400">✓</span>
                      <span>You have fast internet (25+ Mbps) and ample storage</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-xl border border-blue-500/30">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3">When to Choose 1080p (1920x1080)</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Standard laptop or desktop viewing (recommended for 95% of users)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Balanced quality and file size for most use cases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>TVs up to 50 inches viewing distance 6-10 feet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Uploading to social media or sharing with others</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">✓</span>
                      <span>Internet speed 5-15 Mbps with reasonable storage</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-semibold text-purple-400 mb-3">When to Choose 720p (1280x720)</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✓</span>
                      <span>Mobile phone or tablet viewing primarily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✓</span>
                      <span>Limited storage space (saves 50% vs 1080p)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✓</span>
                      <span>Slower internet connection (under 5 Mbps)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✓</span>
                      <span>Quick downloads needed (2-3x faster than 1080p)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">✓</span>
                      <span>Still looks sharp on screens under 24 inches</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 p-6 rounded-xl border border-pink-500/30">
                  <h4 className="text-xl font-semibold text-pink-400 mb-3">When to Choose 480p or Lower</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">✓</span>
                      <span>Very limited data plan or metered connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">✓</span>
                      <span>Extremely slow internet (under 2 Mbps)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">✓</span>
                      <span>Only need audio with basic visual reference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">✓</span>
                      <span>Downloading hundreds of videos for archival purposes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">✓</span>
                      <span>Preview before downloading higher quality</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Understanding Codecs */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Settings className="w-8 h-8 text-blue-400" />
              Video Codecs Explained
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                A codec (coder-decoder) is the algorithm used to compress and decompress video. Different codecs offer different
                trade-offs between file size, quality, encoding time, and compatibility. Understanding codecs helps you choose
                the best format for your needs.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Major Video Codecs Comparison</h3>

              <div className="space-y-6 mb-8">
                <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Film className="w-8 h-8 text-blue-400" />
                    <h4 className="text-2xl font-semibold text-blue-400">H.264 (AVC) - Industry Standard</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        The most widely used codec, H.264 offers excellent quality-to-file-size ratio and universal compatibility.
                        Supported by virtually every device, browser, and platform. This is the codec used by YouTube (default),
                        TikTok, Instagram, and most social media platforms.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Universal compatibility (99.9% of devices)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Hardware acceleration on all modern devices</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Excellent quality at moderate bitrates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Mature, well-optimized, reliable</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-slate-900/50 p-4 rounded-lg">
                        <h5 className="text-white font-semibold mb-2">Technical Specs:</h5>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• <strong>Released:</strong> 2003</li>
                          <li>• <strong>Max Resolution:</strong> 8K</li>
                          <li>• <strong>Typical Bitrate (1080p):</strong> 5-10 Mbps</li>
                          <li>• <strong>File Format:</strong> Usually MP4, MOV</li>
                          <li>• <strong>Best For:</strong> Universal compatibility, social media</li>
                          <li>• <strong>Used By:</strong> YouTube, TikTok, Instagram, Facebook</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-purple-400" />
                    <h4 className="text-2xl font-semibold text-purple-400">H.265 (HEVC) - High Efficiency</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        H.265 provides 40-50% better compression than H.264 at the same quality, making it ideal for 4K and 8K content.
                        However, it requires more processing power and has limited compatibility compared to H.264. Patent licensing
                        issues have slowed adoption.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">50% smaller files than H.264 (same quality)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Excellent for 4K/8K content</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">✗</span>
                          <span className="text-gray-300 text-sm">Limited browser support (Safari only)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">✗</span>
                          <span className="text-gray-300 text-sm">Requires more processing power</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-slate-900/50 p-4 rounded-lg">
                        <h5 className="text-white font-semibold mb-2">Technical Specs:</h5>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• <strong>Released:</strong> 2013</li>
                          <li>• <strong>Max Resolution:</strong> 8K</li>
                          <li>• <strong>Typical Bitrate (1080p):</strong> 2-5 Mbps</li>
                          <li>• <strong>File Format:</strong> MP4, MOV, MKV</li>
                          <li>• <strong>Best For:</strong> 4K content, storage efficiency</li>
                          <li>• <strong>Used By:</strong> Apple devices, some streaming services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-cyan-400" />
                    <h4 className="text-2xl font-semibold text-cyan-400">VP9 - Google's Open Alternative</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        Developed by Google as a royalty-free alternative to H.265. VP9 offers similar compression efficiency to HEVC
                        and is used extensively by YouTube for higher quality streams. Supported by modern browsers but limited hardware
                        acceleration compared to H.264.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Royalty-free, open source</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">45% better compression than H.264</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">YouTube's default for 4K content</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">~</span>
                          <span className="text-gray-300 text-sm">Growing hardware support</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-slate-900/50 p-4 rounded-lg">
                        <h5 className="text-white font-semibold mb-2">Technical Specs:</h5>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• <strong>Released:</strong> 2013</li>
                          <li>• <strong>Max Resolution:</strong> 8K</li>
                          <li>• <strong>Typical Bitrate (1080p):</strong> 2-5 Mbps</li>
                          <li>• <strong>File Format:</strong> WebM, MP4</li>
                          <li>• <strong>Best For:</strong> YouTube, web streaming</li>
                          <li>• <strong>Used By:</strong> YouTube (primary), Chrome, Firefox</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-green-400" />
                    <h4 className="text-2xl font-semibold text-green-400">AV1 - Next Generation Codec</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-4">
                        AV1 is the newest codec, offering 30% better compression than VP9 and 50% better than H.264. Royalty-free and
                        backed by major tech companies (Google, Netflix, Amazon, Apple). Still gaining adoption but represents the future
                        of video compression.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Best compression efficiency available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-gray-300 text-sm">Royalty-free, open source</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">✗</span>
                          <span className="text-gray-300 text-sm">Slow encoding (improving)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400">✗</span>
                          <span className="text-gray-300 text-sm">Limited hardware support (growing)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-slate-900/50 p-4 rounded-lg">
                        <h5 className="text-white font-semibold mb-2">Technical Specs:</h5>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• <strong>Released:</strong> 2018</li>
                          <li>• <strong>Max Resolution:</strong> 8K+</li>
                          <li>• <strong>Typical Bitrate (1080p):</strong> 1.5-3 Mbps</li>
                          <li>• <strong>File Format:</strong> WebM, MP4</li>
                          <li>• <strong>Best For:</strong> Future-proofing, streaming services</li>
                          <li>• <strong>Used By:</strong> YouTube (growing), Netflix, Chrome</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-cyan-400" />
                  Which Codec Should You Download?
                </h4>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">For maximum compatibility:</strong> Choose H.264 (MP4 format). Works on every device, browser, and platform.</p>
                  <p><strong className="text-white">For smallest file size (4K content):</strong> Choose VP9 or H.265 if your device supports it. Files will be 40-50% smaller than H.264.</p>
                  <p><strong className="text-white">For future-proofing:</strong> AV1 offers best quality and smallest files, but requires modern hardware for smooth playback.</p>
                  <p className="text-sm text-yellow-400">💡 Pro Tip: When in doubt, stick with H.264 MP4. It's the safest choice for compatibility and will work on any device you own now or in the future.</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Understanding Bitrate */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Wifi className="w-8 h-8 text-purple-400" />
              Bitrate: The Quality Dial
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Bitrate measures how much data is used per second of video, measured in Mbps (megabits per second) or Kbps (kilobits
                per second). Higher bitrate means better quality but larger files. Understanding bitrate helps you balance quality
                against file size and download speed.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Recommended Bitrates by Resolution</h3>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left p-4 text-white font-semibold">Resolution</th>
                      <th className="text-left p-4 text-white font-semibold">Minimum Bitrate</th>
                      <th className="text-left p-4 text-white font-semibold">Recommended</th>
                      <th className="text-left p-4 text-white font-semibold">High Quality</th>
                      <th className="text-left p-4 text-white font-semibold">What You Get</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">4K (3840x2160)</td>
                      <td className="p-4 text-gray-300">20 Mbps</td>
                      <td className="p-4 text-emerald-400">35-45 Mbps</td>
                      <td className="p-4 text-cyan-400">60-100 Mbps</td>
                      <td className="p-4 text-gray-300 text-sm">Professional quality, fine details preserved</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">1440p (2560x1440)</td>
                      <td className="p-4 text-gray-300">10 Mbps</td>
                      <td className="p-4 text-emerald-400">16-20 Mbps</td>
                      <td className="p-4 text-cyan-400">30-40 Mbps</td>
                      <td className="p-4 text-gray-300 text-sm">Sharp details, minimal compression artifacts</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">1080p (1920x1080)</td>
                      <td className="p-4 text-gray-300">3 Mbps</td>
                      <td className="p-4 text-emerald-400">5-8 Mbps</td>
                      <td className="p-4 text-cyan-400">10-15 Mbps</td>
                      <td className="p-4 text-gray-300 text-sm">Clear, crisp, perfect for most viewing</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">720p (1280x720)</td>
                      <td className="p-4 text-gray-300">1.5 Mbps</td>
                      <td className="p-4 text-emerald-400">2.5-4 Mbps</td>
                      <td className="p-4 text-cyan-400">5-7 Mbps</td>
                      <td className="p-4 text-gray-300 text-sm">Good quality for mobile, minor softness</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">480p (854x480)</td>
                      <td className="p-4 text-gray-300">0.5 Mbps</td>
                      <td className="p-4 text-emerald-400">1-1.5 Mbps</td>
                      <td className="p-4 text-cyan-400">2-3 Mbps</td>
                      <td className="p-4 text-gray-300 text-sm">Watchable, visible compression</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                  <h4 className="text-xl font-semibold text-purple-400 mb-3">Constant Bitrate (CBR)</h4>
                  <p className="text-gray-300 mb-3">
                    CBR maintains the same bitrate throughout the entire video. Simple scenes and complex scenes use identical data rates.
                    Predictable file sizes but inefficient use of data.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300">Predictable file size</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300">Smooth streaming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      <span className="text-gray-300">Wastes data on simple scenes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      <span className="text-gray-300">May struggle with complex scenes</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 p-6 rounded-xl border border-pink-500/30">
                  <h4 className="text-xl font-semibold text-pink-400 mb-3">Variable Bitrate (VBR)</h4>
                  <p className="text-gray-300 mb-3">
                    VBR adjusts bitrate dynamically. Complex scenes get more data, simple scenes use less. Better overall quality
                    for the same average file size. Used by most modern platforms.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300">Better quality per MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300">Efficient data usage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">~</span>
                      <span className="text-gray-300">Less predictable file size</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span className="text-gray-300">Industry standard</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                <h4 className="text-xl font-semibold text-white mb-3">How Platform Bitrates Compare</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-pink-400 font-semibold">TikTok:</span>
                    <span>1080p at 2-5 Mbps (VBR) - Optimized for mobile, aggressive compression</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-red-400 font-semibold">YouTube:</span>
                    <span>1080p at 5-10 Mbps (VBR), 4K at 35-45 Mbps - Highest quality among social platforms</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-semibold">Instagram:</span>
                    <span>1080p Reels at 3-6 Mbps (VBR) - Mid-range compression, balanced approach</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 font-semibold">Facebook:</span>
                    <span>1080p at 5-10 Mbps (VBR) for regular posts, Watch videos can go higher</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Audio Quality */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Music className="w-8 h-8 text-pink-400" />
              Audio Quality and Formats
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Audio quality is equally important as video quality. Poor audio ruins even the best visuals. Understanding audio
                bitrates, codecs, and formats ensures your downloads sound as good as they look.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Audio Bitrate Recommendations</h3>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left p-4 text-white font-semibold">Bitrate</th>
                      <th className="text-left p-4 text-white font-semibold">Quality Level</th>
                      <th className="text-left p-4 text-white font-semibold">Best Use Case</th>
                      <th className="text-left p-4 text-white font-semibold">File Size (5 min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">320 kbps</td>
                      <td className="p-4 text-emerald-400">Excellent (Near CD Quality)</td>
                      <td className="p-4 text-gray-300">Music, audiophile content</td>
                      <td className="p-4 text-gray-300">~12 MB</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">256 kbps</td>
                      <td className="p-4 text-emerald-400">Very Good</td>
                      <td className="p-4 text-gray-300">Music videos, concerts</td>
                      <td className="p-4 text-gray-300">~10 MB</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">192 kbps</td>
                      <td className="p-4 text-emerald-400">Good</td>
                      <td className="p-4 text-gray-300">Podcasts, most content</td>
                      <td className="p-4 text-gray-300">~7.5 MB</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">128 kbps</td>
                      <td className="p-4 text-yellow-400">Acceptable</td>
                      <td className="p-4 text-gray-300">Voice content, casual listening</td>
                      <td className="p-4 text-gray-300">~5 MB</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">96 kbps</td>
                      <td className="p-4 text-red-400">Low Quality</td>
                      <td className="p-4 text-gray-300">Voice only, minimal storage</td>
                      <td className="p-4 text-gray-300">~3.75 MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
                <h4 className="text-xl font-semibold text-white mb-3">Audio Codec Comparison</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-pink-400 font-semibold mb-2">MP3 (MPEG-1 Audio Layer 3)</p>
                    <p className="text-gray-300 text-sm">Universal compatibility, good quality at 192kbps+. Best for maximum device support.</p>
                  </div>
                  <div>
                    <p className="text-purple-400 font-semibold mb-2">AAC (Advanced Audio Coding)</p>
                    <p className="text-gray-300 text-sm">Better quality than MP3 at same bitrate. Used by YouTube, iTunes, most modern platforms. Slight compatibility limitations on very old devices.</p>
                  </div>
                  <div>
                    <p className="text-blue-400 font-semibold mb-2">Opus</p>
                    <p className="text-gray-300 text-sm">Best quality-to-size ratio, especially for voice. Used by Discord, WhatsApp. Growing support but not universal yet.</p>
                  </div>
                  <div>
                    <p className="text-cyan-400 font-semibold mb-2">FLAC (Lossless)</p>
                    <p className="text-gray-300 text-sm">Perfect quality, no compression loss. Very large files (30-40 MB per 5 minutes). Only for audiophiles with ample storage.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* File Size Calculator */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <HardDrive className="w-8 h-8 text-green-400" />
              File Size Estimation Guide
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Understanding file sizes helps you manage storage and download times. Use this guide to estimate how much space
                your downloads will require.
              </p>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20 mb-6">
                <h4 className="text-xl font-semibold text-white mb-4">Quick File Size Formula</h4>
                <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-emerald-400 text-center text-lg mb-4">
                  File Size (MB) = (Bitrate in Mbps × Duration in seconds) ÷ 8
                </div>
                <p className="text-gray-300 text-sm">Example: 1080p video at 8 Mbps for 10 minutes (600 seconds) = (8 × 600) ÷ 8 = 600 MB</p>
              </div>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Typical File Sizes by Duration</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-700/30 p-6 rounded-xl border border-green-500/20">
                  <h4 className="text-lg font-semibold text-green-400 mb-4">1-Minute Video</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• 4K (45 Mbps): ~340 MB</li>
                    <li>• 1080p (8 Mbps): ~60 MB</li>
                    <li>• 720p (4 Mbps): ~30 MB</li>
                    <li>• 480p (1.5 Mbps): ~11 MB</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-green-500/20">
                  <h4 className="text-lg font-semibold text-green-400 mb-4">10-Minute Video</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• 4K (45 Mbps): ~3.4 GB</li>
                    <li>• 1080p (8 Mbps): ~600 MB</li>
                    <li>• 720p (4 Mbps): ~300 MB</li>
                    <li>• 480p (1.5 Mbps): ~110 MB</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-green-500/20">
                  <h4 className="text-lg font-semibold text-green-400 mb-4">1-Hour Video</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• 4K (45 Mbps): ~20 GB</li>
                    <li>• 1080p (8 Mbps): ~3.6 GB</li>
                    <li>• 720p (4 Mbps): ~1.8 GB</li>
                    <li>• 480p (1.5 Mbps): ~675 MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl p-12 border border-cyan-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Download in Your Preferred Quality
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Now that you understand video quality, download from any platform with the settings that work best for you.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Start Downloading Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
