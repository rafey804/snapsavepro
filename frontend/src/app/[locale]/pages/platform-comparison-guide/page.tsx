import React from 'react';
import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import Link from 'next/link';
import {
  TrendingUp,
  Users,
  Video,
  DollarSign,
  Target,
  BarChart,
  Award,
  Zap,
  Globe,
  PlayCircle
} from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: 'Platform Comparison Guide - TikTok vs YouTube vs Instagram vs Facebook Video Downloads | SnapSavePro',
    description: 'Comprehensive comparison of TikTok, YouTube, Instagram, Facebook for video content. Learn which platform is best for your needs, quality differences, and download strategies.',
    keywords: 'platform comparison, tiktok vs youtube, instagram vs tiktok, facebook video vs youtube, social media comparison, best video platform, video quality comparison',
    path: '/pages/platform-comparison-guide',
    locale,
  });
}

export default function PlatformComparisonGuidePage() {
  const platformComparison = [
    {
      platform: 'TikTok',
      icon: <Video className="w-8 h-8 text-pink-500" />,
      color: 'pink',
      strengths: [
        'Highest viral potential for short-form content',
        'Algorithm favors new creators equally',
        '1 billion+ active users, mostly Gen Z',
        'Watermark removal available',
        'Best for entertainment and trends'
      ],
      weaknesses: [
        'Limited to 10-minute max duration',
        'Only 1080p max quality (no 4K)',
        'Older demographics underrepresented',
        'Content discovery can be unpredictable',
        'Platform stability concerns in some regions'
      ],
      bestFor: 'Viral short-form content, trending entertainment, Gen Z audiences',
      videoQuality: '1080p @ 2-5 Mbps',
      demographics: 'Ages 16-24 (60%), Heavy mobile usage',
      avgEngagement: '17.5% engagement rate',
      monetization: 'Creator Fund, Brand Partnerships, Live Gifts'
    },
    {
      platform: 'YouTube',
      icon: <PlayCircle className="w-8 h-8 text-red-500" />,
      color: 'red',
      strengths: [
        'Supports up to 8K video quality',
        'Unlimited video duration',
        'Best monetization opportunities',
        'Superior long-form content discovery',
        'Integrated with Google Search'
      ],
      weaknesses: [
        'Harder for new creators to gain traction',
        'Requires consistent upload schedule',
        'Algorithm favors watch time over virality',
        'Higher production quality expected',
        'Shorts compete with main channel content'
      ],
      bestFor: 'Educational content, tutorials, long-form entertainment, 4K quality',
      videoQuality: 'Up to 8K @ 50+ Mbps',
      demographics: 'Ages 25-44 (35%), Cross-device usage',
      avgEngagement: '4-6% engagement rate',
      monetization: 'AdSense, Memberships, Super Chat, Sponsorships'
    },
    {
      platform: 'Instagram',
      icon: <Users className="w-8 h-8 text-purple-500" />,
      color: 'purple',
      strengths: [
        'Best visual aesthetics and filters',
        'Strong influencer economy',
        'Multiple content formats (Reels, Stories, Posts)',
        'Integrated shopping features',
        'High-income demographic'
      ],
      weaknesses: [
        'Reels limited to 90 seconds',
        'Algorithm changes frequently',
        'Declining organic reach',
        'Watermarks reduce cross-platform sharing',
        'Strong competition for visibility'
      ],
      bestFor: 'Lifestyle content, fashion, photography, influencer marketing',
      videoQuality: '1080p @ 3-6 Mbps',
      demographics: 'Ages 25-34 (31%), Image-focused',
      avgEngagement: '1.22% engagement rate',
      monetization: 'Brand Deals, Instagram Shopping, Bonus Programs'
    },
    {
      platform: 'Facebook',
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      color: 'blue',
      strengths: [
        'Largest overall user base (3 billion)',
        'Best for 35+ demographic',
        'Superior ad targeting options',
        'Long-form content via Watch',
        'Strong community features (Groups)'
      ],
      weaknesses: [
        'Younger demographics leaving platform',
        'Lower organic reach than competitors',
        'Video content less prioritized than Meta prefers',
        'Interface complexity can be overwhelming',
        'Brand reputation challenges'
      ],
      bestFor: 'Business marketing, B2B content, community building, mature audiences',
      videoQuality: '1080p @ 10-15 Mbps',
      demographics: 'Ages 35-65 (60%), Desktop + Mobile',
      avgEngagement: '0.07% engagement rate',
      monetization: 'Ad Breaks, Stars, Brand Collabs Manager'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-blue-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6">
            Platform Comparison Guide 2025
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive analysis of TikTok, YouTube, Instagram, and Facebook for video content creation,
            audience reach, and download strategies. Make informed decisions about where to invest your creative energy.
          </p>
        </header>

        {/* Quick Comparison Table */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Quick Platform Comparison</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="text-left p-6 text-white font-semibold">Feature</th>
                  <th className="text-left p-6 text-pink-400 font-semibold">TikTok</th>
                  <th className="text-left p-6 text-red-400 font-semibold">YouTube</th>
                  <th className="text-left p-6 text-purple-400 font-semibold">Instagram</th>
                  <th className="text-left p-6 text-blue-400 font-semibold">Facebook</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-700/30">
                  <td className="p-6 text-gray-400">Max Video Length</td>
                  <td className="p-6 text-gray-300">10 minutes</td>
                  <td className="p-6 text-gray-300">12 hours</td>
                  <td className="p-6 text-gray-300">90 seconds (Reels)</td>
                  <td className="p-6 text-gray-300">240 minutes</td>
                </tr>
                <tr className="border-t border-slate-700/30">
                  <td className="p-6 text-gray-400">Max Quality</td>
                  <td className="p-6 text-gray-300">1080p</td>
                  <td className="p-6 text-gray-300">8K</td>
                  <td className="p-6 text-gray-300">1080p</td>
                  <td className="p-6 text-gray-300">1080p</td>
                </tr>
                <tr className="border-t border-slate-700/30">
                  <td className="p-6 text-gray-400">Primary Age Group</td>
                  <td className="p-6 text-gray-300">16-24</td>
                  <td className="p-6 text-gray-300">25-44</td>
                  <td className="p-6 text-gray-300">25-34</td>
                  <td className="p-6 text-gray-300">35-65</td>
                </tr>
                <tr className="border-t border-slate-700/30">
                  <td className="p-6 text-gray-400">Viral Potential</td>
                  <td className="p-6 text-emerald-400">Extremely High</td>
                  <td className="p-6 text-yellow-400">Moderate</td>
                  <td className="p-6 text-yellow-400">Moderate-High</td>
                  <td className="p-6 text-gray-400">Low</td>
                </tr>
                <tr className="border-t border-slate-700/30">
                  <td className="p-6 text-gray-400">Monetization</td>
                  <td className="p-6 text-yellow-400">Good</td>
                  <td className="p-6 text-emerald-400">Excellent</td>
                  <td className="p-6 text-yellow-400">Good</td>
                  <td className="p-6 text-yellow-400">Moderate</td>
                </tr>
                <tr className="border-t border-slate-700/30">
                  <td className="p-6 text-gray-400">Best Content Type</td>
                  <td className="p-6 text-gray-300">Trending, Entertainment</td>
                  <td className="p-6 text-gray-300">Educational, Long-form</td>
                  <td className="p-6 text-gray-300">Lifestyle, Visual</td>
                  <td className="p-6 text-gray-300">Community, Business</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed Platform Breakdowns */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">In-Depth Platform Analysis</h2>
          <div className="space-y-8">
            {platformComparison.map((platform, index) => (
              <article key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
                <div className="flex items-center gap-4 mb-6">
                  {platform.icon}
                  <h3 className="text-3xl font-bold text-white">{platform.platform}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Strengths */}
                  <div>
                    <h4 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {platform.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-emerald-400 mt-1">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div>
                    <h4 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Limitations
                    </h4>
                    <ul className="space-y-2">
                      {platform.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-red-400 mt-1">✗</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-slate-900/50 rounded-xl">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Video Quality</div>
                    <div className="text-white font-semibold">{platform.videoQuality}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Demographics</div>
                    <div className="text-white font-semibold text-sm">{platform.demographics}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Avg Engagement</div>
                    <div className="text-white font-semibold">{platform.avgEngagement}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Monetization</div>
                    <div className="text-white font-semibold text-sm">{platform.monetization}</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                  <div className="text-sm text-gray-400 mb-1">Best For:</div>
                  <div className="text-white">{platform.bestFor}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Use Case Scenarios */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Which Platform Should You Choose?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">If You're A Content Creator</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="font-semibold text-pink-400 mb-2">Choose TikTok if:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• You create short, engaging, trendy content</li>
                    <li>• You want the highest viral potential</li>
                    <li>• Your target audience is Gen Z (16-24)</li>
                    <li>• You can post daily and keep up with trends</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-400 mb-2">Choose YouTube if:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• You create in-depth tutorials or educational content</li>
                    <li>• You prioritize maximum monetization</li>
                    <li>• You want 4K+ quality and long-form options</li>
                    <li>• You can maintain consistent upload schedule</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">If You're A Business</h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <p className="font-semibold text-purple-400 mb-2">Choose Instagram if:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• You have visually appealing products</li>
                    <li>• Your target market is millennials with high income</li>
                    <li>• You want influencer partnership opportunities</li>
                    <li>• You sell fashion, lifestyle, or visual products</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-blue-400 mb-2">Choose Facebook if:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• You target 35+ demographics</li>
                    <li>• You need advanced ad targeting</li>
                    <li>• You build community-based marketing</li>
                    <li>• You operate B2B or local business</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Strategy Comparison */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Download Strategy by Platform</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-pink-400 mb-4">TikTok Downloads</h3>
                <p className="text-gray-300 mb-4">
                  TikTok videos should be downloaded with watermark removal for cross-platform repurposing. Priority: viral content
                  within 48 hours of posting, as creators often delete trending videos after peak engagement. Save trending sounds
                  separately for future creative use.
                </p>
                <div className="flex items-start gap-2 text-sm text-emerald-400">
                  <Zap className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Pro Tip: Download TikToks at 1080p for highest quality before platform compression reduces bitrate</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-red-400 mb-4">YouTube Downloads</h3>
                <p className="text-gray-300 mb-4">
                  Download YouTube educational content for offline learning. Choose 1080p for most use cases, 4K only when necessary
                  due to large file sizes (400-800MB per 10 minutes). For music, extract MP3 at 320kbps. Download playlists for
                  comprehensive course archives.
                </p>
                <div className="flex items-start gap-2 text-sm text-emerald-400">
                  <Zap className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Pro Tip: YouTube Shorts download separately from regular videos for different repurposing strategies</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Instagram Downloads</h3>
                <p className="text-gray-300 mb-4">
                  Download Instagram content for portfolio building and content repurposing. Save Reels, carousel posts, and Stories
                  before 24-hour expiration. Priority: high-engagement posts for case studies, brand partnership content for documentation,
                  and aesthetic grid posts for creative inspiration.
                </p>
                <div className="flex items-start gap-2 text-sm text-emerald-400">
                  <Zap className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Pro Tip: Download Stories within 24 hours, especially brand campaigns and time-sensitive announcements</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Facebook Downloads</h3>
                <p className="text-gray-300 mb-4">
                  Download Facebook videos for business documentation and customer testimonial archives. Priority: user-generated content,
                  Live video recordings, and group discussions. Facebook Watch content often includes long-form webinars and educational
                  sessions valuable for training materials.
                </p>
                <div className="flex items-start gap-2 text-sm text-emerald-400">
                  <Zap className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>Pro Tip: Download Facebook ads from Ad Library for competitor analysis and marketing research</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-purple-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Download From All Platforms
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Use SnapSavePro to download videos from TikTok, YouTube, Instagram, Facebook, and more.
              Free, fast, and supports all quality options.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Start Downloading Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
