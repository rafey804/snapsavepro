'use client';
import React from 'react';
import {
  Instagram,
  Camera,
  Heart,
  Users,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Download,
  Shield
} from 'lucide-react';
import Image from 'next/image';

export default function InstagramUniqueContent() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16">
      <div className="max-w-6xl mx-auto px-4">

        {/* Content Types Section - New Image */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
            Download All Instagram Content Types
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Save Reels, Stories, Feed Posts, and IGTV videos in HD quality. Our tool supports all Instagram content formats.
          </p>

          {/* Content Types Image - cropped to hide watermark */}
          <div className="rounded-xl overflow-hidden max-w-3xl mx-auto relative">
            <div className="overflow-hidden" style={{ marginBottom: '-20px' }}>
              <Image
                src="/images/instagram-content-types.png"
                alt="Instagram Content Types - Reels, Stories, Feed Posts, IGTV"
                width={900}
                height={400}
                className="w-full h-auto"
                style={{ marginBottom: '-5%' }}
              />
            </div>
          </div>
        </article>

        {/* How to Download Instagram Reels - 5 Steps */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-6 text-center">
            How to Download Instagram Reels
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-8 text-center max-w-2xl mx-auto">
            Download any Instagram Reel in just 5 simple steps. No app needed!
          </p>

          {/* Steps 1-3: From Instagram App */}
          <h3 className="text-lg font-semibold text-purple-400 mb-4 text-center">📱 On Instagram App</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {/* Step 1 */}
            <div className="text-center">
              <div className="rounded-xl overflow-hidden mb-4 max-w-[240px] mx-auto bg-slate-900/50">
                <Image
                  src="/images/instagram-step1.png"
                  alt="Step 1: Tap the menu icon on Instagram Reel"
                  width={240}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
              <h3 className="text-lg font-semibold text-white mb-1">Open Reel & Tap Menu</h3>
              <p className="text-gray-400 text-sm">Find the Reel and tap 3-dot menu</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="rounded-xl overflow-hidden mb-4 max-w-[240px] mx-auto bg-slate-900/50">
                <Image
                  src="/images/instagram-step2.png"
                  alt="Step 2: Select Copy Link from menu"
                  width={240}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">2</div>
              <h3 className="text-lg font-semibold text-white mb-1">Copy the Link</h3>
              <p className="text-gray-400 text-sm">Tap "Copy Link" option</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="rounded-xl overflow-hidden mb-4 max-w-[240px] mx-auto bg-slate-900/50">
                <Image
                  src="/images/instagram-step3.png"
                  alt="Step 3: Link copied confirmation"
                  width={240}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
              <h3 className="text-lg font-semibold text-white mb-1">Link Copied!</h3>
              <p className="text-gray-400 text-sm">You'll see confirmation message</p>
            </div>
          </div>

          {/* Steps 4-5: On Our Website */}
          <h3 className="text-lg font-semibold text-pink-400 mb-4 text-center">💻 On Our Website</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Step 4 */}
            <div className="text-center">
              <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-slate-600/50">
                <Image
                  src="/images/instagram-step4-website.png"
                  alt="Step 4: Paste link on website and click Get Video"
                  width={500}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">4</div>
              <h3 className="text-lg font-semibold text-white mb-1">Paste Link & Click "Get Video"</h3>
              <p className="text-gray-400 text-sm">Paste the copied link in the box above and click the green button</p>
            </div>

            {/* Step 5 */}
            <div className="text-center">
              <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-slate-600/50">
                <Image
                  src="/images/instagram-step5-download.png"
                  alt="Step 5: Select format and download video"
                  width={500}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">5</div>
              <h3 className="text-lg font-semibold text-white mb-1">Select Quality & Download</h3>
              <p className="text-gray-400 text-sm">Choose your preferred format and click Download</p>
            </div>
          </div>
        </article>


        {/* Cross-Platform Sharing Section */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Share Instagram Content Everywhere
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Download Instagram Reels and share on TikTok, YouTube Shorts, Pinterest, WhatsApp and more.
            Create professional content without the Instagram watermark.
          </p>

          {/* Repurpose Graphic */}
          <div className="rounded-xl overflow-hidden max-w-xl mx-auto">
            <Image
              src="/images/instagram-repurpose.png"
              alt="Share Instagram Reels on TikTok, YouTube Shorts, Pinterest, WhatsApp"
              width={800}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </article>

        {/* Works on All Devices - New Image */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Works on All Devices
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Download Instagram videos on iPhone, Android, Windows PC, Mac, or tablet.
            No app installation required - works directly in your browser.
          </p>

          {/* Devices Image - cropped to hide watermark */}
          <div className="rounded-xl overflow-hidden max-w-3xl mx-auto">
            <div className="overflow-hidden" style={{ marginBottom: '-20px' }}>
              <Image
                src="/images/instagram-devices.png"
                alt="Download Instagram on any device - iOS, Android, Mac, iPad, PC"
                width={800}
                height={500}
                className="w-full h-auto"
                style={{ marginBottom: '-5%' }}
              />
            </div>
          </div>
        </article>

        {/* Security Section - New Image */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-500" />
            100% Safe & Secure
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Your privacy is our priority. No login required, no data stored, SSL encrypted connections.
          </p>

          {/* Security Image - cropped to hide watermark */}
          <div className="rounded-xl overflow-hidden max-w-2xl mx-auto">
            <div className="overflow-hidden" style={{ marginBottom: '-20px' }}>
              <Image
                src="/images/instagram-security.png"
                alt="100% Secure, No Login Required, Privacy Protected, SSL Encrypted"
                width={700}
                height={400}
                className="w-full h-auto"
                style={{ marginBottom: '-5%' }}
              />
            </div>
          </div>
        </article>

        {/* Why Download & Pro Tips - Compact */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why Download */}
            <div>
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-pink-500" />
                Why Download Instagram Videos?
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-gray-300">
                  <Download className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Save Favorites:</strong> Keep Reels forever, even if deleted</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <Users className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Share Anywhere:</strong> WhatsApp, email, any platform</span>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  <Camera className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                  <span><strong className="text-white">Backup Content:</strong> Protect your creative work</span>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-500" />
                Pro Tips
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-500 font-bold">1.</span>
                  <span>Copy link directly from Instagram app</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-500 font-bold">2.</span>
                  <span>Choose 1080p for best quality</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-500 font-bold">3.</span>
                  <span>Use WiFi for faster downloads</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-500 font-bold">4.</span>
                  <span>Works with public accounts only</span>
                </li>
              </ul>
            </div>
          </div>
        </article>

      </div>
    </div>
  );
}
