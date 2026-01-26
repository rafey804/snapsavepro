'use client';
import React from 'react';
import Image from 'next/image';
import {
  Facebook,
  Users,
  VideoIcon,
  ShoppingBag,
  TrendingUp,
  Globe,
  Target,
  BarChart
} from 'lucide-react';

export default function FacebookUniqueContent() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Hero Section with Image */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <Image
            src="/images/facebook-hero.png"
            alt="Facebook Video Downloader - Download HD Videos Free"
            width={1200}
            height={400}
            className="w-full h-auto object-cover rounded-2xl"
            priority
          />
        </div>

        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
            Facebook Video Download Guide
          </h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Facebook is the world's largest social network with 3 billion monthly active users. Our Facebook Video Downloader helps you save Facebook Watch videos, Reels, Stories, and Live streams in HD quality - completely free.
            </p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Facebook Video Types We Support</h3>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/facebook-watch.png"
                    alt="Facebook Watch"
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <h3 className="text-xl font-semibold text-white">Facebook Watch</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Long-form videos up to 240 minutes in 1080p HD quality. Perfect for product demos, tutorials, and webinars.
                </p>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-12 h-12 text-cyan-500" />
                  <h3 className="text-xl font-semibold text-white">Facebook Reels</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  60-second vertical videos. Reach older demographics than Instagram or TikTok - 45% of viewers are 35+.
                </p>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-12 h-12 text-blue-500" />
                  <h3 className="text-xl font-semibold text-white">Facebook Live</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Live streams up to 8 hours in 1080p. Download completed live videos for repurposing into highlights.
                </p>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-12 h-12 text-cyan-500" />
                  <h3 className="text-xl font-semibold text-white">Feed & Stories</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Traditional feed videos and 24-hour Stories. 500 million daily users watch Facebook Stories.
                </p>
              </div>
            </div>

            {/* Features Banner */}
            <div className="my-8 rounded-xl overflow-hidden">
              <Image
                src="/images/facebook-features.png"
                alt="Facebook Video Downloader Features - HD Quality, Fast Speed, Secure, No Watermark"
                width={1200}
                height={300}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Download Facebook Videos?</h3>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-500/20 my-6">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <ShoppingBag className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Save Customer Testimonials:</strong> Archive video reviews before they're deleted.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Ad Analysis:</strong> Download competitor video ads from Facebook Ad Library.</span>
                </li>
                <li className="flex items-start gap-3">
                  <BarChart className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Market Research:</strong> Study successful videos to improve your content strategy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <VideoIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Repurpose Content:</strong> Use Facebook videos on YouTube, Instagram, and email campaigns.</span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Facebook Demographics</h3>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              Facebook's mature user base (65% are 35+) has 3.5x higher purchasing power than Gen Z platforms. Ideal for B2B, real estate, financial services, and family-focused products.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-800">
                    <th className="text-left p-4 text-white font-semibold">Age Group</th>
                    <th className="text-left p-4 text-white font-semibold">Users</th>
                    <th className="text-left p-4 text-white font-semibold">Best Content</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 text-blue-400 font-medium">25-34</td>
                    <td className="p-4 text-gray-300">26%</td>
                    <td className="p-4 text-emerald-400">Lifestyle, how-to</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 text-blue-400 font-medium">35-44</td>
                    <td className="p-4 text-gray-300">24%</td>
                    <td className="p-4 text-emerald-400">Educational, DIY</td>
                  </tr>
                  <tr className="border-t border-slate-700">
                    <td className="p-4 text-blue-400 font-medium">45+</td>
                    <td className="p-4 text-gray-300">38%</td>
                    <td className="p-4 text-emerald-400">News, health, finance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg mt-6">
              Start downloading Facebook videos now with our fast, free, and secure tool. Save content in HD quality for offline viewing, marketing analysis, or content repurposing.
            </p>
          </div>
        </article>

      </div>
    </div>
  );
}
