'use client';
import React from 'react';
import {
  TrendingUp,
  Video,
  Users,
  Smartphone,
  Clock,
  Zap,
  Award,
  Download,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';

export default function TikTokUniqueContent() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* TikTok Download Benefits */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
            Why Download TikTok Videos?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-xl border border-pink-500/30">
              <Video className="w-10 h-10 text-pink-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Save Favorite Videos</h3>
              <p className="text-gray-300 text-sm">
                Keep your favorite TikTok videos forever. Watch them offline anytime, even if they get deleted.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
              <TrendingUp className="w-10 h-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Content Creation</h3>
              <p className="text-gray-300 text-sm">
                Use TikTok clips for compilations, reactions, or educational content. Perfect for YouTubers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-xl border border-pink-500/30">
              <Users className="w-10 h-10 text-pink-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Share Everywhere</h3>
              <p className="text-gray-300 text-sm">
                Share TikToks on WhatsApp, Facebook, or any platform without the watermark.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
              <Smartphone className="w-10 h-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Backup Your Content</h3>
              <p className="text-gray-300 text-sm">
                Creators can backup their own TikToks. Never lose your hard work.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 p-6 rounded-xl border border-pink-500/30">
              <Clock className="w-10 h-10 text-pink-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">Watch Offline</h3>
              <p className="text-gray-300 text-sm">
                Download and watch TikToks when you don't have internet access.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
              <Award className="w-10 h-10 text-purple-400 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">HD Quality</h3>
              <p className="text-gray-300 text-sm">
                Get the best quality available - up to 1080p Full HD without compression.
              </p>
            </div>
          </div>
        </article>

        {/* Platform Comparison */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            TikTok vs Other Platforms
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-800">
                  <th className="text-left p-4 text-white font-semibold">Platform</th>
                  <th className="text-left p-4 text-white font-semibold">Max Quality</th>
                  <th className="text-left p-4 text-white font-semibold">Max Length</th>
                  <th className="text-left p-4 text-white font-semibold">Watermark</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-700">
                  <td className="p-4 text-pink-400 font-medium">TikTok</td>
                  <td className="p-4 text-gray-300">1080p HD</td>
                  <td className="p-4 text-gray-300">10 minutes</td>
                  <td className="p-4 text-gray-300">
                    <span className="text-red-400">Yes</span> → <span className="text-green-400">Removed by us!</span>
                  </td>
                </tr>
                <tr className="border-t border-slate-700">
                  <td className="p-4 text-purple-400 font-medium">Instagram Reels</td>
                  <td className="p-4 text-gray-300">1080p HD</td>
                  <td className="p-4 text-gray-300">90 seconds</td>
                  <td className="p-4 text-gray-300">No</td>
                </tr>
                <tr className="border-t border-slate-700">
                  <td className="p-4 text-red-400 font-medium">YouTube Shorts</td>
                  <td className="p-4 text-gray-300">1080p HD</td>
                  <td className="p-4 text-gray-300">60 seconds</td>
                  <td className="p-4 text-gray-300">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        {/* Quick Tips */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            Pro Tips for TikTok Downloads
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Always choose 1080p for best quality when available</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Use WiFi for faster downloads on longer videos</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Copy the video link directly from TikTok app or website</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">Download MP3 to save just the audio/music</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
