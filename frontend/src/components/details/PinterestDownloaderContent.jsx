'use client';
import React from 'react';
import { CheckCircle, Zap, Shield, Smartphone, Download, Image as ImageIcon, Globe, Heart } from 'lucide-react';
import Image from 'next/image';

export default function PinterestDownloaderContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12"
      style={{ backgroundColor: '#0a0a0a' }}
    >

      {/* How to Download Pinterest Content - 5 Steps Visual Guide */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-6 text-center">
          How to Download Pinterest Videos & Images
        </h2>
        <p className="text-gray-400 leading-relaxed text-lg mb-8 text-center max-w-2xl mx-auto">
          Save any Pinterest pin in just 5 simple steps. Works for videos, images, GIFs & Story Pins!
        </p>

        {/* Steps 1-3: From Pinterest App */}
        <h3 className="text-lg font-semibold text-red-400 mb-4 text-center">📱 On Pinterest App</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Step 1 */}
          <div className="text-center group">
            <div className="rounded-xl overflow-hidden mb-4 max-w-[260px] mx-auto bg-white/5 border border-gray-700 group-hover:border-red-500/50 transition-all duration-300" style={{ marginBottom: '-10px' }}>
              <Image
                src="/images/pinterest-step1.png"
                alt="Step 1: Tap Share Icon on Pinterest pin"
                width={260}
                height={340}
                className="w-full h-auto max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-300"
                style={{ marginBottom: '-5%' }}
              />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 mt-6 font-bold">1</div>
            <h3 className="text-lg font-semibold text-white mb-1">Tap Share Icon</h3>
            <p className="text-gray-400 text-sm">Open the pin and tap the share button</p>
          </div>

          {/* Step 2 */}
          <div className="text-center group">
            <div className="rounded-xl overflow-hidden mb-4 max-w-[260px] mx-auto bg-white/5 border border-gray-700 group-hover:border-red-500/50 transition-all duration-300" style={{ marginBottom: '-10px' }}>
              <Image
                src="/images/pinterest-step2.png"
                alt="Step 2: Tap Copy Link from Pinterest share menu"
                width={260}
                height={340}
                className="w-full h-auto max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-300"
                style={{ marginBottom: '-5%' }}
              />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 mt-6 font-bold">2</div>
            <h3 className="text-lg font-semibold text-white mb-1">Tap "Copy Link"</h3>
            <p className="text-gray-400 text-sm">Select Copy Link from share menu</p>
          </div>

          {/* Step 3 */}
          <div className="text-center group">
            <div className="rounded-xl overflow-hidden mb-4 max-w-[260px] mx-auto bg-white/5 border border-gray-700 group-hover:border-red-500/50 transition-all duration-300" style={{ marginBottom: '-10px' }}>
              <Image
                src="/images/pinterest-step3.png"
                alt="Step 3: Link copied confirmation on Pinterest"
                width={260}
                height={340}
                className="w-full h-auto max-h-[300px] object-contain group-hover:scale-105 transition-transform duration-300"
                style={{ marginBottom: '-5%' }}
              />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 mt-6 font-bold">3</div>
            <h3 className="text-lg font-semibold text-white mb-1">Link Copied!</h3>
            <p className="text-gray-400 text-sm">You'll see the confirmation message</p>
          </div>
        </div>

        {/* Steps 4-5: On Website */}
        <h3 className="text-lg font-semibold text-pink-400 mb-4 text-center">💻 On SnapSavePro Website</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Step 4 */}
          <div className="text-center group">
            <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-gray-700 group-hover:border-red-500/50 transition-all duration-300 bg-gray-900/30">
              <Image
                src="/images/pinterest-step4-website.png"
                alt="Step 4: Paste Pinterest link on SnapSavePro website"
                width={450}
                height={280}
                className="w-full h-auto max-h-[220px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">4</div>
            <h3 className="text-lg font-semibold text-white mb-1">Paste Pinterest Link</h3>
            <p className="text-gray-400 text-sm">Paste the link and click Get Content</p>
          </div>

          {/* Step 5 */}
          <div className="text-center group">
            <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-gray-700 group-hover:border-red-500/50 transition-all duration-300 bg-gray-900/30">
              <Image
                src="/images/pinterest-step5-download.png"
                alt="Step 5: Download Pinterest video or image"
                width={450}
                height={280}
                className="w-full h-auto max-h-[220px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">5</div>
            <h3 className="text-lg font-semibold text-white mb-1">Download Content</h3>
            <p className="text-gray-400 text-sm">Click Download to save video or image</p>
          </div>
        </div>
      </section>

      {/* Features Banner - WATERMARK HIDDEN */}
      <section className="rounded-2xl overflow-hidden border border-gray-800 hover:border-red-500/50 transition-all duration-500 group" style={{ marginBottom: '-15px' }}>
        <div className="overflow-hidden">
          <Image
            src="/images/pinterest-features.png"
            alt="Pinterest Video Downloader Features - HD Quality, Fast Download, No Watermark, 100% Free"
            width={900}
            height={350}
            className="w-full h-auto max-h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ marginBottom: '-6%' }}
          />
        </div>
      </section>

      {/* Content Types - WATERMARK HIDDEN */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-red-500/30 transition-all duration-300 mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
          Download All Pinterest Content Types
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
          Save Video Pins, Image Pins, Story Pins, and animated GIFs in original quality.
        </p>
        <div className="rounded-xl overflow-hidden max-w-3xl mx-auto group" style={{ marginBottom: '-15px' }}>
          <Image
            src="/images/pinterest-content-types.png"
            alt="Pinterest Content Types - Video Pins, Image Pins, Story Pins, GIF Pins"
            width={850}
            height={320}
            className="w-full h-auto max-h-[280px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Heart className="h-7 w-7 text-red-500" />
          What is SnapSavePro Pinterest Downloader?
        </h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg">
            <strong>SnapSavePro Pinterest Video & Image Downloader</strong> is a free online tool that allows you to download videos, images, GIFs, and Story Pins from Pinterest directly to your device in HD quality. No watermarks, no registration required.
          </p>
          <p className="text-base sm:text-lg">
            Whether you want to save inspiring DIY tutorials, stunning photography, recipe videos, or creative content for offline viewing - our Pinterest downloader makes it simple and fast. Works on all devices including iPhone, Android, Windows, and Mac.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Why Choose Our Pinterest Downloader?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: <Zap className="h-6 w-6 text-red-400" />,
              title: "Lightning Fast",
              description: "Download Pinterest pins in seconds with our optimized servers."
            },
            {
              icon: <Shield className="h-6 w-6 text-green-400" />,
              title: "100% Safe & Secure",
              description: "No data stored. Your privacy is always protected."
            },
            {
              icon: <ImageIcon className="h-6 w-6 text-purple-400" />,
              title: "HD Quality",
              description: "Download images and videos in original high resolution."
            },
            {
              icon: <Smartphone className="h-6 w-6 text-orange-400" />,
              title: "All Devices",
              description: "Works on Android, iOS, Windows, Mac & Linux."
            },
            {
              icon: <Download className="h-6 w-6 text-cyan-400" />,
              title: "No Watermarks",
              description: "Clean downloads without any added watermarks."
            },
            {
              icon: <Globe className="h-6 w-6 text-pink-400" />,
              title: "No Registration",
              description: "Start downloading instantly. No sign-up needed."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1"
            >
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

      {/* All Devices - WATERMARK HIDDEN */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
          Download Pinterest Pins on Any Device
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
          Access our Pinterest downloader from iPhone, Android, MacBook, Windows PC, or iPad. No app installation required.
        </p>
        <div className="rounded-xl overflow-hidden max-w-2xl mx-auto group" style={{ marginBottom: '-15px' }}>
          <Image
            src="/images/pinterest-devices.png"
            alt="Download Pinterest videos on any device - iOS, Android, Mac, Windows PC, iPad"
            width={800}
            height={450}
            className="w-full h-auto max-h-[350px] object-contain group-hover:scale-[1.03] transition-transform duration-500"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* Security Section - WATERMARK HIDDEN */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 opacity-50"></div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center flex items-center justify-center gap-3 relative z-10">
          <Shield className="h-8 w-8 text-red-400" />
          Your Privacy is Protected
        </h2>
        <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto relative z-10">
          100% secure downloads. No login required, no data stored, SSL encrypted connection.
        </p>
        <div className="rounded-xl overflow-hidden max-w-2xl mx-auto relative z-10 group" style={{ marginBottom: '-15px' }}>
          <Image
            src="/images/pinterest-security.png"
            alt="Pinterest Downloader Security - 100% Secure, No Login Required, Privacy Protected, SSL Encrypted"
            width={700}
            height={400}
            className="w-full h-auto max-h-[320px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
            style={{ marginBottom: '-5%' }}
          />
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          What Can You Download from Pinterest?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🍳", title: "Recipe Videos" },
            { icon: "🎨", title: "DIY Tutorials" },
            { icon: "🏠", title: "Home Decor" },
            { icon: "👗", title: "Fashion Ideas" },
            { icon: "💄", title: "Beauty Tips" },
            { icon: "🏋️", title: "Workout Pins" },
            { icon: "✈️", title: "Travel Photos" },
            { icon: "📷", title: "Photography" }
          ].map((useCase, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-3xl mb-2 hover:scale-110 transition-transform duration-200">{useCase.icon}</div>
              <h3 className="text-white font-medium text-sm">{useCase.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "Is SnapSavePro Pinterest Downloader free?",
              answer: "Yes! It's 100% free with no hidden charges or premium subscriptions."
            },
            {
              question: "Can I download both videos and images?",
              answer: "Absolutely! Our tool supports Video Pins, Image Pins, Story Pins, and GIFs."
            },
            {
              question: "Do I need to create an account?",
              answer: "No registration needed. Just paste the Pinterest link and download instantly."
            },
            {
              question: "What quality are the downloads?",
              answer: "We provide original HD quality - the same resolution as on Pinterest."
            },
            {
              question: "Is it safe to use?",
              answer: "Yes! We don't store any data. Fully encrypted, privacy-protected downloads."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/30 hover:border-red-500/30 transition-all duration-200">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                {faq.question}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm pl-7">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 animate-pulse"></div>
        <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
          Start Saving Pinterest Pins Now! 📌
        </h2>
        <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto relative z-10">
          Join millions of users who use SnapSavePro to download their favorite Pinterest content.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative z-10"
        >
          Try Pinterest Downloader Now
        </button>
      </section>
    </div>
  );
}
