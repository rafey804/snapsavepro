'use client';
import React from 'react';
import { CheckCircle, Zap, Shield, Smartphone, Download, Video, Music, Globe, Star, Clock, HardDrive, Users, Image } from 'lucide-react';

export default function PinterestDownloaderContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12"
    style={{ backgroundColor: '#101828' }}
    >

      {/* Introduction Section */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Video className="h-7 w-7 text-red-400" />
          What is SnapSavePro Pinterest Downloader?
        </h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p className="text-base sm:text-lg">
            SnapSavePro is a powerful, free online tool that allows you to download Pinterest videos and images directly to your device without any watermarks. Unlike the official Pinterest app, which makes it challenging to save content for offline viewing, SnapSavePro makes it possible to download your favorite pins in just a few clicks.
          </p>
          <p className="text-base sm:text-lg">
            Whether you want to preserve recipe videos, save DIY tutorials, keep inspirational images, or download creative content for offline viewing, SnapSavePro delivers high-quality downloads in original resolution. Our tool works seamlessly across all devices including Android smartphones, iPhones, tablets, and desktop computers without requiring any app installation or account registration.
          </p>
          <p className="text-base sm:text-lg">
            With SnapSavePro, you can download Pinterest content in multiple formats including MP4 for videos, JPG/PNG for images, and MP3 for audio extraction from videos. The tool supports various quality options, allowing you to choose between high-definition downloads for the best viewing experience or smaller file sizes for quick sharing and storage efficiency.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Why Choose SnapSavePro for Pinterest?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: <Zap className="h-6 w-6 text-red-400" />,
              title: "Lightning Fast",
              description: "Download Pinterest videos and images in seconds with our optimized servers and fast processing technology."
            },
            {
              icon: <Shield className="h-6 w-6 text-emerald-400" />,
              title: "100% Safe & Secure",
              description: "We don't store your data or pin links. Your privacy is our top priority with encrypted connections."
            },
            {
              icon: <Image className="h-6 w-6 text-pink-400" />,
              title: "HD Quality Support",
              description: "Download images and videos in crisp high-definition quality in original resolution from Pinterest."
            },
            {
              icon: <Smartphone className="h-6 w-6 text-purple-400" />,
              title: "All Devices Supported",
              description: "Works perfectly on Android, iOS, Windows, Mac, and Linux without any compatibility issues."
            },
            {
              icon: <Download className="h-6 w-6 text-amber-400" />,
              title: "No Watermarks",
              description: "Get clean, watermark-free content exactly as it appears on Pinterest without any branding."
            },
            {
              icon: <Globe className="h-6 w-6 text-cyan-400" />,
              title: "No Registration Required",
              description: "Start downloading immediately without creating an account or providing any personal information."
            },
            {
              icon: <Music className="h-6 w-6 text-blue-400" />,
              title: "Audio Extraction",
              description: "Extract and download audio from Pinterest videos in high-quality MP3 format."
            },
            {
              icon: <HardDrive className="h-6 w-6 text-indigo-400" />,
              title: "Unlimited Downloads",
              description: "Download as many Pinterest pins as you want with no daily limits or restrictions on usage."
            },
            {
              icon: <Clock className="h-6 w-6 text-orange-400" />,
              title: "24/7 Availability",
              description: "Access our service anytime, anywhere with 99.9% uptime and reliable performance worldwide."
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 text-base sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          How to Download Pinterest Videos & Images
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Copy Pinterest URL",
              description: "Open Pinterest and find the video or image you want to download. Copy the pin URL from your browser's address bar or use the share button to copy the link."
            },
            {
              step: "2",
              title: "Paste URL",
              description: "Paste the copied Pinterest URL into the input box above and click the 'Get Content' button. Our system will analyze and fetch all available download options."
            },
            {
              step: "3",
              title: "Download",
              description: "Choose your preferred quality and format from the available options, then click the download button. Your content will be saved to your device instantly."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-xl p-6 border border-red-500/20 text-center hover:border-red-500/50 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                {item.step}
              </div>
              <h3 className="text-white font-semibold mb-3 text-lg sm:text-xl">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Formats */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Supported Pinterest Content Types
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: <Video className="h-6 w-6 text-red-400" />,
              title: "Pinterest Videos",
              description: "Download any Pinterest video including idea pins, recipe videos, DIY tutorials, and more in MP4 format."
            },
            {
              icon: <Image className="h-6 w-6 text-pink-400" />,
              title: "Pinterest Images",
              description: "Save high-resolution Pinterest images in original quality as JPG or PNG files."
            },
            {
              icon: <Music className="h-6 w-6 text-blue-400" />,
              title: "Audio Extraction",
              description: "Extract audio from Pinterest videos and save as MP3 files for music or voiceovers."
            },
            {
              icon: <Star className="h-6 w-6 text-amber-400" />,
              title: "All Pin Types",
              description: "Works with regular pins, idea pins, story pins, and all other Pinterest content formats."
            }
          ].map((format, index) => (
            <div
              key={index}
              className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30 hover:border-red-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-3">
                {format.icon}
                <h3 className="text-white font-semibold text-base sm:text-lg">
                  {format.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {format.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Preview */}
      <section className="rounded-2xl p-6 sm:p-8 border border-slate-700/50" style={{ backgroundColor: '#1e293b' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Common Questions About Pinterest Downloader
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "Is it legal to download Pinterest content?",
              answer: "Downloading Pinterest content for personal use is generally acceptable, but you should respect copyright laws and creator rights. Only download content you have permission to use, and don't redistribute copyrighted material without authorization."
            },
            {
              question: "Can I download private Pinterest boards?",
              answer: "No, our tool can only download content from public Pinterest pins. Private boards and pins that require login cannot be downloaded to protect user privacy and respect Pinterest's security settings."
            },
            {
              question: "What quality options are available?",
              answer: "We provide the highest quality available from Pinterest, typically in original resolution for images and HD quality for videos. You can choose from multiple quality options depending on the source content."
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-slate-700/30 rounded-xl p-5 border border-slate-600/30"
            >
              <h3 className="text-white font-semibold mb-2 text-base sm:text-lg flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                {faq.question}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed ml-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="rounded-2xl p-6 sm:p-8 border border-red-500/20 bg-gradient-to-br from-red-900/20 to-pink-900/20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          Perfect for Content Creators & Enthusiasts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-red-400" />
              For Personal Use
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Save recipes and cooking tutorials for offline access</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Download DIY and craft project ideas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Keep workout and fitness inspiration videos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Archive home decor and design ideas</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="h-6 w-6 text-pink-400" />
              For Professionals
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Create inspiration boards for client presentations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Save educational content for reference</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Download marketing and social media examples</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Archive design trends and visual inspiration</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
