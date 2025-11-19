import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Video,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart,
  Lightbulb,
  Shield,
  Award,
  Briefcase
} from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

export const metadata: Metadata = {
  title: 'Content Creator\'s Download Handbook - Professional Video Management Guide | SnapSavePro',
  description: 'Complete guide for content creators: backup strategies, cross-platform repurposing, portfolio building, analytics, and professional video management across TikTok, YouTube, Instagram.',
  keywords: 'content creator guide, video backup, content repurposing, portfolio building, creator tools, cross-platform strategy, video archival',
  alternates: {
    canonical: `${baseUrl}/en/pages/content-creator-handbook`,
    languages: {
      'en': `${baseUrl}/en/pages/content-creator-handbook`,
      'hi': `${baseUrl}/hi/pages/content-creator-handbook`,
      'zh': `${baseUrl}/zh/pages/content-creator-handbook`,
      'ur': `${baseUrl}/ur/pages/content-creator-handbook`,
      'x-default': `${baseUrl}/en/pages/content-creator-handbook`,
    },
  },
};

export default function ContentCreatorHandbookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-blue-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Video className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Content Creator's Handbook
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Professional strategies for managing, archiving, and repurposing your video content across TikTok, YouTube,
            Instagram, and Facebook. Protect your work and maximize your creative ROI.
          </p>
        </header>

        {/* Why Creators Download Their Content */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              Why Professional Creators Download Their Content
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                In 2024, 73% of professional content creators (100K+ followers) maintain offline backups of all published content.
                Platform volatility, algorithm changes, and account security issues make content archival essential for career
                protection. Your content is your business asset—treat it accordingly.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-6 rounded-xl border border-red-500/30">
                  <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Platform Risk Protection
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span><strong>Account Bans:</strong> 15% of creators experience temporary or permanent bans. Downloaded content survives account suspensions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span><strong>Content Removal:</strong> Platforms remove content for guideline violations (sometimes incorrectly). Backups ensure nothing is permanently lost.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span><strong>Algorithm Suppression:</strong> Viral content can be retrospectively suppressed. Archive proves historical performance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span><strong>Platform Shutdown:</strong> Vine, Mixer, and others shut down. Your content shouldn't depend on platform longevity.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    Business & Career Benefits
                  </h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Portfolio Building:</strong> Compile best work for brand pitches, media kits, and sponsor negotiations without platform dependency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Cross-Platform Repurposing:</strong> Download once, publish everywhere. Maximize content ROI across TikTok, YouTube, Instagram, Facebook.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Legal Protection:</strong> Proof of original creation dates, performance metrics, and content ownership in disputes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span><strong>Analytics & Learning:</strong> Study successful content offline, analyze what works, refine strategy without relying on platform analytics retention.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 rounded-xl border border-yellow-500/20">
                <h4 className="text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Real Creator Stories: Why Backups Saved Their Careers
                </h4>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <p className="font-semibold text-white mb-1">TikTok Creator @ 2.5M Followers:</p>
                    <p className="text-sm">"My account was hacked and all videos deleted. Because I downloaded everything monthly, I restored my entire page in 48 hours instead of losing years of work."</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">YouTube Educator @ 500K Subscribers:</p>
                    <p className="text-sm">"Copyright strike took down 50 videos (later reversed). During the appeal process, I uploaded them to Vimeo using my downloads, keeping my course business running."</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Instagram Influencer @ 1M Followers:</p>
                    <p className="text-sm">"When a brand wanted to license my top 20 Reels for their campaign, having high-quality watermark-free downloads meant I could deliver immediately and close a $50K deal."</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Backup Strategy */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-cyan-400" />
              Professional Backup Strategy
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Strategic backups go beyond simple downloads. Professional creators implement systematic archival processes
                that protect content while enabling efficient discovery and reuse.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">The 3-2-1 Backup Rule for Creators</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-xl border border-cyan-500/30">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">3</div>
                  <h4 className="text-lg font-semibold text-white mb-3">Copies of Content</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Original on platform (TikTok/YouTube/etc.)</li>
                    <li>• Local copy on computer/external drive</li>
                    <li>• Cloud backup (Google Drive/Dropbox)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-xl border border-blue-500/30">
                  <div className="text-4xl font-bold text-blue-400 mb-2">2</div>
                  <h4 className="text-lg font-semibold text-white mb-3">Different Media Types</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• One on SSD/hard drive (fast access)</li>
                    <li>• One on cloud storage (disaster recovery)</li>
                    <li>• Optional: External USB drive offsite</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                  <div className="text-4xl font-bold text-purple-400 mb-2">1</div>
                  <h4 className="text-lg font-semibold text-white mb-3">Off-Site Backup</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Cloud service (auto-syncing)</li>
                    <li>• Protects against hardware failure</li>
                    <li>• Accessible anywhere for repurposing</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Backup Schedule Recommendations</h3>

              <div className="space-y-4 mb-8">
                <div className="bg-slate-700/30 p-6 rounded-xl border border-green-500/20">
                  <h4 className="text-xl font-semibold text-green-400 mb-3">Daily Backup (Active Creators)</h4>
                  <p className="text-gray-300 mb-3">For creators posting daily (TikTokers, daily vloggers):</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Download every new upload immediately after posting</li>
                    <li>• Save to "Daily Posts" folder with date naming (e.g., "2025-01-15_dancing_trend.mp4")</li>
                    <li>• Auto-sync to cloud storage overnight</li>
                    <li>• Weekly consolidation into monthly archives</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-blue-400 mb-3">Weekly Backup (Regular Creators)</h4>
                  <p className="text-gray-300 mb-3">For creators posting 2-5 times per week:</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Set Sunday evening as backup time</li>
                    <li>• Download all posts from the past week</li>
                    <li>• Organize by performance tier (viral/good/average)</li>
                    <li>• Update portfolio with top performers</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-purple-500/20">
                  <h4 className="text-xl font-semibold text-purple-400 mb-3">Monthly Backup (Occasional Creators)</h4>
                  <p className="text-gray-300 mb-3">For creators posting less frequently or managing multiple clients:</p>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• First of each month, download all content from previous month</li>
                    <li>• Create monthly summary document with analytics</li>
                    <li>• Archive to external drive and cloud simultaneously</li>
                    <li>• Review and tag content for easy searching</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-6 rounded-xl border border-cyan-500/20">
                <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  Pro Organization Tips
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong>Naming Convention:</strong> Use YYYY-MM-DD_platform_description format (e.g., "2025-01-15_tiktok_cooking_tutorial.mp4")</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong>Folder Structure:</strong> Organize by Year → Month → Platform → Performance Tier for easy navigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong>Metadata Tracking:</strong> Keep spreadsheet with views, likes, comments, posting date for each video</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span><strong>Tag System:</strong> Use tags like #viral #sponsored #tutorial #seasonal for searchability</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        {/* Cross-Platform Strategy */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-pink-400" />
              Cross-Platform Repurposing Strategy
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Smart creators create once and publish everywhere. Strategic repurposing multiplies content ROI, reaching different
                demographics and platform algorithms. Download management is crucial for efficient cross-posting workflows.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">The Content Multiplication Matrix</h3>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left p-4 text-white font-semibold">Original Platform</th>
                      <th className="text-left p-4 text-white font-semibold">Repurpose To</th>
                      <th className="text-left p-4 text-white font-semibold">Format Adjustments</th>
                      <th className="text-left p-4 text-white font-semibold">ROI Multiplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">TikTok Video</td>
                      <td className="p-4 text-gray-300">YouTube Shorts, Instagram Reels, Pinterest</td>
                      <td className="p-4 text-gray-300 text-sm">Remove watermark, adjust captions</td>
                      <td className="p-4 text-emerald-400">3-4x reach</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-red-400 font-medium">YouTube Long-Form</td>
                      <td className="p-4 text-gray-300">TikTok (clips), Instagram (highlights), Blog</td>
                      <td className="p-4 text-gray-300 text-sm">Extract 60s clips, create thread</td>
                      <td className="p-4 text-emerald-400">5-8x reach</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">Instagram Reel</td>
                      <td className="p-4 text-gray-300">TikTok, YouTube Shorts, Facebook</td>
                      <td className="p-4 text-gray-300 text-sm">Remove Instagram branding</td>
                      <td className="p-4 text-emerald-400">3x reach</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-blue-400 font-medium">Facebook Live</td>
                      <td className="p-4 text-gray-300">YouTube, IGTV, Podcast (audio), Blog</td>
                      <td className="p-4 text-gray-300 text-sm">Edit highlights, extract audio</td>
                      <td className="p-4 text-emerald-400">4-6x reach</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Platform-Specific Repurposing Playbook</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-slate-700/30 p-6 rounded-xl border border-pink-500/20">
                  <h4 className="text-xl font-semibold text-pink-400 mb-4">From TikTok to Everything</h4>
                  <ol className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 font-bold">1.</span>
                      <span>Download TikTok without watermark (critical for other platforms)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 font-bold">2.</span>
                      <span>Post to YouTube Shorts within 24 hours (while content is fresh)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 font-bold">3.</span>
                      <span>Upload to Instagram Reels with platform-specific hashtags</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 font-bold">4.</span>
                      <span>Share to Facebook Reels (targets different age demographic)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 font-bold">5.</span>
                      <span>Pin to Pinterest (evergreen traffic source)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-pink-400 font-bold">6.</span>
                      <span>Embed in blog post with tutorial/explanation</span>
                    </li>
                  </ol>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-red-500/20">
                  <h4 className="text-xl font-semibold text-red-400 mb-4">From YouTube Long-Form</h4>
                  <ol className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">1.</span>
                      <span>Download full video in highest quality available</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">2.</span>
                      <span>Extract 3-5 best 60-second clips for TikTok/Reels</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">3.</span>
                      <span>Create Twitter thread with video snippets</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">4.</span>
                      <span>Extract audio for podcast episode or Spotify</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">5.</span>
                      <span>Transcribe and publish as blog post with embedded video</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">6.</span>
                      <span>Create LinkedIn post with key insights + 30s teaser</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
                <h4 className="text-xl font-semibold text-white mb-3">Repurposing Workflow Automation</h4>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Step 1:</strong> Create content in highest quality format (4K YouTube video or 1080p TikTok)</p>
                  <p><strong className="text-white">Step 2:</strong> Download immediately after publishing in all available qualities</p>
                  <p><strong className="text-white">Step 3:</strong> Use editing tool (CapCut, Adobe Premiere, DaVinci Resolve) to create platform-specific versions</p>
                  <p><strong className="text-white">Step 4:</strong> Schedule posts across all platforms using tools like Buffer, Hootsuite, or Later</p>
                  <p><strong className="text-white">Step 5:</strong> Track performance across platforms to identify which repurposing strategies work best</p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Portfolio Building */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              Building a Professional Portfolio
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                A professional portfolio is essential for landing brand deals, sponsorships, and partnerships. Downloaded content
                allows you to create polished portfolios independent of platform availability and algorithm changes.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">What to Include in Your Creator Portfolio</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-xl border border-yellow-500/30">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Viral Content Showcase</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Top 10 most-viewed videos</li>
                    <li>• Include engagement metrics</li>
                    <li>• Show growth trajectory</li>
                    <li>• Highlight unique content style</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6 rounded-xl border border-orange-500/30">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Brand Work Examples</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Sponsored content (with permission)</li>
                    <li>• Campaign performance data</li>
                    <li>• Testimonials from brands</li>
                    <li>• Demonstrate brand safety</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 p-6 rounded-xl border border-pink-500/30">
                  <h4 className="text-lg font-semibold text-red-400 mb-3">Diverse Content Range</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Different content formats</li>
                    <li>• Various topics/niches</li>
                    <li>• Technical capabilities</li>
                    <li>• Editing skill demonstration</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20 mb-6">
                <h4 className="text-xl font-semibold text-blue-400 mb-4">Portfolio Platform Recommendations</h4>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <p className="font-semibold text-white mb-1">Option 1: Personal Website (Recommended)</p>
                    <p className="text-sm">Full control, professional presentation. Use platforms like Wix, Squarespace, WordPress. Include downloaded videos embedded or hosted.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Option 2: PDF Media Kit</p>
                    <p className="text-sm">Easy to email, works offline. Include screenshots, QR codes to videos, analytics snapshots. Update quarterly.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Option 3: Vimeo/YouTube Unlisted Playlist</p>
                    <p className="text-sm">Private link for brands. Upload downloaded best work. Keep separate from main channel. Professional presentation.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Analytics and Performance Tracking */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BarChart className="w-8 h-8 text-green-400" />
              Performance Tracking & Analytics
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Downloaded content paired with performance data creates a valuable learning archive. Platforms delete old analytics,
                but your personal database grows more valuable over time, revealing patterns in what works for your specific audience.
              </p>

              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-500/20">
                <h4 className="text-xl font-semibold text-white mb-4">Essential Metrics to Track With Each Download</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-green-400 mb-2">Basic Metrics</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Views (24hr, 7-day, final)</li>
                      <li>• Likes, comments, shares</li>
                      <li>• Watch time / completion rate</li>
                      <li>• Click-through rate (CTR)</li>
                      <li>• Follower growth from post</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-400 mb-2">Advanced Metrics</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Peak viewing time of day</li>
                      <li>• Audience demographics reached</li>
                      <li>• Traffic sources (FYP vs profile)</li>
                      <li>• Save/share ratio</li>
                      <li>• Revenue generated (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-purple-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Building Your Content Archive Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Professional creators protect their work. Download, organize, and repurpose your content across all platforms.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Start Downloading Your Content
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
