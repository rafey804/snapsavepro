'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Download, Shield, Zap, Globe, CheckCircle, AlertCircle, Monitor, Smartphone, Music, Video, Star, Heart } from 'lucide-react';

export default function TikTokDownloadGuide() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index:any) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-pink-400" />,
      title: "Lightning Fast Downloads",
      description: "Download TikTok videos at maximum speed without watermarks"
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: "100% Safe & Secure",
      description: "No malware, no ads, completely secure TikTok video downloading"
    },
    {
      icon: <Star className="h-6 w-6 text-purple-400" />,
      title: "Watermark-Free Downloads",
      description: "Remove TikTok watermarks automatically for clean video downloads"
    },
    {
      icon: <Monitor className="h-6 w-6 text-blue-400" />,
      title: "Works on All Devices",
      description: "Compatible with Windows, Mac, Android, iOS, and all web browsers"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Copy TikTok Video URL",
      description: "Open TikTok app or website and find the video you want to download. Tap the 'Share' button and select 'Copy Link' to copy the TikTok video URL to your clipboard.",
      tips: ["Works with all TikTok video URLs", "Supports @username/video/ID format", "Works with vm.tiktok.com short links"]
    },
    {
      step: "2", 
      title: "Paste URL in TikTok Downloader",
      description: "Return to our TikTok downloader tool above. Paste the copied URL into the input field and click 'Get Video'. Our system will instantly analyze the TikTok video and remove watermarks.",
      tips: ["Automatically removes TikTok watermarks", "Extracts video information instantly", "Shows creator details and video stats"]
    },
    {
      step: "3",
      title: "Choose Download Quality",
      description: "Select your preferred video quality and format. Choose from HD video without watermark, or extract audio as MP3. All downloads are completely watermark-free.",
      tips: ["HD quality up to 1080p", "Watermark-free downloads", "MP3 audio extraction available"]
    },
    {
      step: "4",
      title: "Download TikTok Video",
      description: "Click the download button for your chosen format. The watermark-free TikTok video will download automatically to your device's download folder.",
      tips: ["Downloads save without watermarks", "Progress tracking available", "Multiple downloads supported"]
    }
  ];

  const faqs = [
    {
      question: "Is it legal to download TikTok videos?",
      answer: "Downloading TikTok videos for personal use is generally acceptable, but you should respect copyright laws and creators' rights. Only download videos you have permission to use or for educational/research purposes."
    },
    {
      question: "Can I download TikTok videos without watermark?",
      answer: "Yes! Our TikTok downloader automatically removes watermarks from downloaded videos. You'll get clean, watermark-free TikTok videos in their original quality without the TikTok logo overlay."
    },
    {
      question: "What video qualities can I download from TikTok?",
      answer: "Our TikTok downloader supports HD quality downloads up to 1080p. TikTok videos are typically uploaded in vertical format (9:16 aspect ratio) and we preserve the original quality while removing watermarks."
    },
    {
      question: "Can I extract audio from TikTok videos?",
      answer: "Absolutely! You can download TikTok audio as MP3 files. This is perfect for saving TikTok sounds, music, or audio content for personal use. The audio extraction maintains high quality."
    },
    {
      question: "How long does it take to download a TikTok video?",
      answer: "TikTok video downloads are very fast since most TikTok videos are 15-60 seconds long. Typical download time is 10-30 seconds, including watermark removal processing."
    },
    {
      question: "Can I download TikTok videos on mobile devices?",
      answer: "Yes! Our TikTok video downloader works perfectly on all mobile devices including Android phones, iPhones, and tablets. Simply use your mobile browser - no app installation required."
    },
    {
      question: "Do downloaded TikTok videos have watermarks?",
      answer: "No! All TikTok videos downloaded through our service are completely watermark-free. We automatically remove the TikTok logo and username watermarks that appear on the original videos."
    },
    {
      question: "What is TikTok and why download videos?",
      answer: "TikTok is a popular social media platform for short-form videos. Users download TikTok videos to save favorites offline, share without watermarks, create compilations, or use content for educational purposes."
    }
  ];

  const tiktokInfo = [
    { 
      title: "What is TikTok?", 
      content: "TikTok is a social media platform owned by ByteDance that allows users to create and share short-form videos. Launched globally in 2018, TikTok has become one of the most popular apps worldwide with over 1 billion active users." 
    },
    { 
      title: "TikTok Video Formats", 
      content: "TikTok videos are typically 15-60 seconds long in vertical format (9:16 aspect ratio). Videos can be up to 10 minutes long for some creators. The platform supports HD quality up to 1080p resolution." 
    },
    { 
      title: "TikTok Algorithm", 
      content: "TikTok's algorithm uses machine learning to curate personalized content feeds. It analyzes user interactions, video completion rates, likes, shares, and comments to determine what content to show each user." 
    },
    { 
      title: "TikTok Features", 
      content: "TikTok offers various creative tools including filters, effects, music library, duets, stitches, live streaming, and editing features. The platform is known for its extensive collection of trending sounds and music." 
    }
  ];

  const qualityGuide = [
    { quality: "HD (1080p)", fileSize: "~5-20MB", description: "High Definition vertical video - Best quality for TikTok content", recommended: "Best overall quality" },
    { quality: "Standard (720p)", fileSize: "~3-10MB", description: "Good quality for most viewing needs and faster downloads", recommended: "Balanced quality and size" },
    { quality: "Mobile (480p)", fileSize: "~1-5MB", description: "Optimized for mobile viewing with smaller file sizes", recommended: "Mobile devices, limited storage" },
    { quality: "Audio (MP3)", fileSize: "~1-3MB", description: "Extract audio/music from TikTok videos in MP3 format", recommended: "Music and sounds only" }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16 lg:py-24" itemScope itemType="https://schema.org/Article">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 via-purple-600/5 to-blue-600/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" itemProp="headline">
            How to Download TikTok Videos Without Watermark: Complete Guide 2025
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed" itemProp="description">
            Learn how to download TikTok videos without watermarks using our free online TikTok downloader. 
            Save TikTok videos in HD quality, extract MP3 audio, and remove watermarks automatically - no app installation required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-pink-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* TikTok Information Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Know About TikTok
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tiktokInfo.map((info, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
                <h4 className="text-xl font-semibold text-pink-400 mb-4">{info.title}</h4>
                <p className="text-gray-300 leading-relaxed">{info.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-16" itemScope itemType="https://schema.org/HowTo">
          <h3 className="text-3xl font-bold text-white text-center mb-12" itemProp="name">
            How to Download TikTok Videos Without Watermark in 4 Easy Steps
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50" itemScope itemType="https://schema.org/HowToStep">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4" itemProp="name">{step.title}</h4>
                    <p className="text-gray-300 leading-relaxed mb-4" itemProp="text">{step.description}</p>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center gap-2 text-sm text-emerald-400">
                          <CheckCircle className="h-4 w-4 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Guide */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            TikTok Video Quality Guide: Choose the Right Format
          </h3>
          
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="text-left p-6 text-white font-semibold">Video Quality</th>
                    <th className="text-left p-6 text-white font-semibold">Typical File Size</th>
                    <th className="text-left p-6 text-white font-semibold">Description</th>
                    <th className="text-left p-6 text-white font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityGuide.map((item, index) => (
                    <tr key={index} className="border-t border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                      <td className="p-6 text-pink-400 font-medium">{item.quality}</td>
                      <td className="p-6 text-gray-300">{item.fileSize}</td>
                      <td className="p-6 text-gray-300">{item.description}</td>
                      <td className="p-6 text-emerald-400">{item.recommended}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TikTok Statistics */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            TikTok Platform Statistics & Facts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">1B+</div>
              <div className="text-gray-300">Monthly Active Users</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">150+</div>
              <div className="text-gray-300">Countries Available</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-gray-300">Mobile Usage</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/30 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">60 min</div>
              <div className="text-gray-300">Daily Average Usage</div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-16">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Important Legal and Usage Information</h4>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-amber-400">Copyright Compliance:</strong> Only download TikTok videos that you have permission to use, are in the public domain, or fall under fair use guidelines.</p>
                  <p><strong className="text-amber-400">Personal Use:</strong> Downloads should primarily be for personal, educational, or research purposes in compliance with copyright laws.</p>
                  <p><strong className="text-amber-400">Respect Creators:</strong> Consider supporting TikTok creators through official channels, following their accounts, or engaging with their content on the platform.</p>
                  <p><strong className="text-amber-400">Watermark Removal:</strong> While we remove watermarks for clean viewing, always credit original creators when sharing or reusing content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16" itemScope itemType="https://schema.org/FAQPage">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions About TikTok Video Downloads
          </h3>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden" itemScope itemType="https://schema.org/Question">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-white pr-4" itemProp="name">{faq.question}</h4>
                  {activeAccordion === index ? (
                    <ChevronUp className="h-5 w-5 text-pink-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-pink-400 flex-shrink-0" />
                  )}
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-6" itemScope itemType="https://schema.org/Answer">
                    <p className="text-gray-300 leading-relaxed" itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TikTok Tips Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Pro Tips for Using TikTok Downloader
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
              <Video className="h-8 w-8 text-pink-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Video Quality</h4>
              <p className="text-gray-300 text-sm">Always choose the highest quality available for best results. HD downloads preserve the original TikTok video quality without compression.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
              <Music className="h-8 w-8 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Audio Extraction</h4>
              <p className="text-gray-300 text-sm">Use MP3 extraction for TikTok sounds and music. Perfect for creating your own content or saving trending audio clips.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
              <Star className="h-8 w-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Watermark-Free</h4>
              <p className="text-gray-300 text-sm">All our downloads automatically remove TikTok watermarks, giving you clean videos perfect for repurposing or offline viewing.</p>
            </div>
          </div>
        </div>

        {/* SEO Keywords Section */}
        <div className="text-center">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">
              Free TikTok Video Downloader - No Watermark, HD Quality
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Our free TikTok video downloader removes watermarks and supports downloading TikTok videos in HD quality. 
              Download TikTok videos without watermark, extract TikTok audio as MP3, and save TikTok content for offline viewing. 
              Fast, secure, and completely free TikTok to MP4 converter with no registration required. Compatible with all devices 
              and browsers for the best TikTok video download experience.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                'TikTok Downloader', 
                'TikTok Video Download', 
                'Download TikTok Without Watermark', 
                'TikTok to MP4', 
                'TikTok MP3 Converter', 
                'Free TikTok Downloader', 
                'Save TikTok Videos', 
                'TikTok Downloader Online',
                'Remove TikTok Watermark',
                'TikTok Video Saver',
                'Download TikTok HD',
                'TikTok Audio Extractor'
              ].map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full text-xs text-pink-300 border border-pink-500/20">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "How to Download TikTok Videos Without Watermark: Complete Guide 2025",
          "description": "Learn how to download TikTok videos without watermarks using our free online TikTok downloader. Save TikTok videos in HD quality, extract MP3 audio, and remove watermarks automatically.",
          "author": {
            "@type": "Organization",
            "name": "Snap Save Pro"
          },
          "publisher": {
            "@type": "Organization", 
            "name": "Snap Save Pro"
          },
          "datePublished": "2025-01-01",
          "dateModified": "2025-01-01",
          "keywords": "TikTok downloader, download TikTok videos, TikTok without watermark, TikTok to MP4, TikTok MP3 converter",
          "about": {
            "@type": "Thing",
            "name": "TikTok Video Downloading",
            "description": "Methods and tools for downloading TikTok videos without watermarks"
          }
        })
      }} />
    </section>
  );
}