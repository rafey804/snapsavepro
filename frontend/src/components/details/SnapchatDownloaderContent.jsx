'use client';
import React from 'react';
import { CheckCircle, Zap, Shield, Smartphone, Download, Video, Globe } from 'lucide-react';
import Image from 'next/image';

export default function SnapchatDownloaderContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12"
      style={{ backgroundColor: '#101828' }}
    >

      {/* Features Banner - NEW IMAGE */}
      <section className="rounded-2xl overflow-hidden border border-slate-700/50">
        <div className="overflow-hidden" style={{ marginBottom: '-20px' }}>
          <Image
            src="/images/snapchat-features.png"
            alt="Snapchat Video Downloader Features - HD Quality, Fast Download, No Watermark, 100% Free"
            width={900}
            height={400}
            className="w-full h-auto"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* Content Types - NEW IMAGE */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
          Download All Snapchat Content Types
        </h2>
        <p className="text-gray-300 text-center mb-6 max-w-2xl mx-auto">
          Save Stories, Spotlight videos, Snap videos, and Discover content in HD quality.
        </p>
        <div className="rounded-xl overflow-hidden max-w-3xl mx-auto" style={{ marginBottom: '-15px' }}>
          <Image
            src="/images/snapchat-content-types.png"
            alt="Snapchat Content Types - Stories, Spotlight, Snap Videos, Discover"
            width={900}
            height={350}
            className="w-full h-auto"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* Introduction Section - Shortened */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Video className="h-7 w-7 text-yellow-400" />
          What is SnapSavePro Snapchat Downloader?
        </h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg">
            SnapSavePro is a powerful, free online tool that allows you to download Snapchat videos, stories, and Spotlight content directly to your device without any watermarks.
          </p>
          <p className="text-base sm:text-lg">
            Whether you want to preserve memorable moments, save educational content, or keep entertaining videos for offline viewing, SnapSavePro delivers high-quality downloads in HD and SD formats.
          </p>
        </div>
      </section>

      {/* Features Grid - Compact */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Why Choose SnapSavePro?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: <Zap className="h-6 w-6 text-yellow-400" />,
              title: "Lightning Fast",
              description: "Download Snapchat videos in seconds with our optimized servers."
            },
            {
              icon: <Shield className="h-6 w-6 text-emerald-400" />,
              title: "100% Safe & Secure",
              description: "We don't store your data. Your privacy is our top priority."
            },
            {
              icon: <Video className="h-6 w-6 text-blue-400" />,
              title: "HD Quality Support",
              description: "Download videos in crisp HD quality up to 1080p."
            },
            {
              icon: <Smartphone className="h-6 w-6 text-purple-400" />,
              title: "All Devices",
              description: "Works on Android, iOS, Windows, Mac, and Linux."
            },
            {
              icon: <Download className="h-6 w-6 text-amber-400" />,
              title: "No Watermarks",
              description: "Get clean, watermark-free videos exactly as they appear."
            },
            {
              icon: <Globe className="h-6 w-6 text-cyan-400" />,
              title: "No Registration",
              description: "Start downloading immediately without creating an account."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Devices - NEW IMAGE */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
          Works on All Devices
        </h2>
        <p className="text-gray-300 text-center mb-6 max-w-2xl mx-auto">
          Download Snapchat videos on iPhone, Android, Windows PC, Mac, or tablet. No app installation required.
        </p>
        <div className="rounded-xl overflow-hidden max-w-3xl mx-auto" style={{ marginBottom: '-15px' }}>
          <Image
            src="/images/snapchat-devices.png"
            alt="Download Snapchat on any device - iOS, Android, Mac, PC"
            width={800}
            height={500}
            className="w-full h-auto"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* Security Section - NEW IMAGE */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center flex items-center justify-center gap-3">
          <Shield className="h-8 h-8 text-yellow-400" />
          100% Safe & Secure
        </h2>
        <p className="text-gray-300 text-center mb-6 max-w-2xl mx-auto">
          Your privacy is our priority. No login required, no data stored, SSL encrypted connections.
        </p>
        <div className="rounded-xl overflow-hidden max-w-2xl mx-auto" style={{ marginBottom: '-15px' }}>
          <Image
            src="/images/snapchat-security.png"
            alt="Snapchat Downloader Security - 100% Secure, No Login, Privacy Protected, SSL Encrypted"
            width={700}
            height={400}
            className="w-full h-auto"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* How to Download Snapchat Videos - 5 Steps Visual Guide */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-6 text-center">
          How to Download Snapchat Videos
        </h2>
        <p className="text-gray-300 leading-relaxed text-lg mb-8 text-center max-w-2xl mx-auto">
          Download any Snapchat video in just 5 simple steps. No app needed!
        </p>

        {/* Steps 1-3: From Snapchat App */}
        <h3 className="text-lg font-semibold text-yellow-400 mb-4 text-center">📱 On Snapchat App</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Step 1 */}
          <div className="text-center">
            <div className="rounded-xl overflow-hidden mb-4 max-w-[240px] mx-auto bg-slate-900/50">
              <Image
                src="/images/snapchat-step1.png"
                alt="Step 1: Open Snapchat video and tap menu icon"
                width={240}
                height={350}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
            <h3 className="text-lg font-semibold text-white mb-1">Open Video & Tap Menu</h3>
            <p className="text-gray-400 text-sm">Find the video and tap the 3-dot menu</p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="rounded-xl overflow-hidden mb-4 max-w-[240px] mx-auto bg-slate-900/50">
              <Image
                src="/images/snapchat-step2.png"
                alt="Step 2: Tap Copy Link from menu"
                width={240}
                height={350}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">2</div>
            <h3 className="text-lg font-semibold text-white mb-1">Tap "Copy Link"</h3>
            <p className="text-gray-400 text-sm">Select Copy Link from the menu</p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="rounded-xl overflow-hidden mb-4 max-w-[240px] mx-auto bg-slate-900/50">
              <Image
                src="/images/snapchat-step3.png"
                alt="Step 3: Link copied confirmation"
                width={240}
                height={350}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
            <h3 className="text-lg font-semibold text-white mb-1">Link Copied!</h3>
            <p className="text-gray-400 text-sm">You'll see the confirmation message</p>
          </div>
        </div>

        {/* Steps 4-5: On Our Website */}
        <h3 className="text-lg font-semibold text-amber-400 mb-4 text-center">💻 On Our Website</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Step 4 */}
          <div className="text-center">
            <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-slate-600/50">
              <Image
                src="/images/snapchat-step4-website.png"
                alt="Step 4: Paste link on website and click Get Video"
                width={500}
                height={350}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">4</div>
            <h3 className="text-lg font-semibold text-white mb-1">Paste Link & Click "Get Video"</h3>
            <p className="text-gray-400 text-sm">Paste the copied link and click the orange button</p>
          </div>

          {/* Step 5 */}
          <div className="text-center">
            <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-slate-600/50">
              <Image
                src="/images/snapchat-step5-download.png"
                alt="Step 5: Select format and download video"
                width={500}
                height={350}
                className="w-full h-auto"
              />
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">5</div>
            <h3 className="text-lg font-semibold text-white mb-1">Select Quality & Download</h3>
            <p className="text-gray-400 text-sm">Choose HD or SD quality and click Download</p>
          </div>
        </div>
      </section>


      {/* Use Cases - Compact Grid */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Popular Use Cases
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "📚", title: "Educational Content" },
            { icon: "💝", title: "Preserve Memories" },
            { icon: "📱", title: "Content Creation" },
            { icon: "😂", title: "Entertainment" },
            { icon: "🎵", title: "Music & Audio" },
            { icon: "📰", title: "News & Events" }
          ].map((useCase, index) => (
            <div key={index} className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50 hover:border-yellow-500/30 transition-all">
              <div className="text-3xl mb-2">{useCase.icon}</div>
              <h3 className="text-white font-medium text-sm">{useCase.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section - Top 5 Only */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "Is SnapSavePro completely free to use?",
              answer: "Yes! SnapSavePro is 100% free with no hidden charges, subscriptions, or premium tiers."
            },
            {
              question: "Do I need to install any software or app?",
              answer: "No installation required! SnapSavePro works directly in your browser on any device."
            },
            {
              question: "Can I download private Snapchat videos?",
              answer: "No, SnapSavePro can only download publicly available Snapchat content like Stories, Spotlight, and Discover."
            },
            {
              question: "What video quality options are available?",
              answer: "We offer HD (1080p/720p), SD (480p/360p), and audio-only (MP3) formats."
            },
            {
              question: "Is my data safe when using SnapSavePro?",
              answer: "Absolutely! We don't store any personal data or download history. All connections are encrypted."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-5 border border-slate-600/30">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                {faq.question}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm pl-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Final CTA */}
      <section className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-2xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Start Downloading Snapchat Videos Now! 🚀
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of users who trust SnapSavePro for fast, safe, and watermark-free downloads.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Try SnapSavePro Now
        </button>
      </section>
    </div>
  );
}