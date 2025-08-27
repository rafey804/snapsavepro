'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Download, Shield, Zap, Globe, CheckCircle, AlertCircle, Monitor, Smartphone } from 'lucide-react';

export default function YouTubeDownloadGuide() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index:any) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-cyan-400" />,
      title: "Lightning Fast Downloads",
      description: "Download YouTube videos at maximum speed with our optimized servers"
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: "100% Safe & Secure",
      description: "No malware, no ads, completely secure YouTube video downloading"
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-400" />,
      title: "All Quality Options",
      description: "Download in 4K, 1080p, 720p, 480p, or extract MP3 audio files"
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
      title: "Copy YouTube Video URL",
      description: "Navigate to YouTube.com and find the video you want to download. Copy the video URL from your browser's address bar or click the 'Share' button under the video and copy the link.",
      tips: ["Works with any YouTube video URL format", "Supports both youtube.com and youtu.be links", "No account registration required"]
    },
    {
      step: "2", 
      title: "Paste URL in Downloader",
      description: "Return to our YouTube downloader tool above. Paste the copied URL into the input field and click the 'Search' button. Our system will instantly analyze the video and extract all available formats.",
      tips: ["Supports videos up to 2+ hours long", "Automatically detects video information", "Shows thumbnail and video details"]
    },
    {
      step: "3",
      title: "Choose Download Quality",
      description: "Select your preferred video quality and format. Choose from HD video with audio, video-only files, or extract audio as MP3. Higher quality files will be larger in size.",
      tips: ["4K and 1080p for best quality", "720p for balanced size and quality", "MP3 audio extraction available"]
    },
    {
      step: "4",
      title: "Download YouTube Video",
      description: "Click the download button for your chosen format. The download will start automatically and save to your device's default download folder. Large files may take a few minutes to process.",
      tips: ["Downloads save to your default folder", "Progress tracking available", "Multiple simultaneous downloads supported"]
    }
  ];

  const faqs = [
    {
      question: "Is it legal to download YouTube videos?",
      answer: "Downloading YouTube videos for personal use is generally acceptable, but you should respect copyright laws and YouTube's terms of service. Only download videos you have permission to use or that are in the public domain."
    },
    {
      question: "What video qualities can I download from YouTube?",
      answer: "Our YouTube downloader supports all available qualities including 4K (2160p), Full HD (1080p), HD (720p), and standard definition (480p, 360p). We also offer audio-only downloads in MP3 format with various bitrates."
    },
    {
      question: "How long does it take to download a YouTube video?",
      answer: "Download speed depends on video length, quality, and your internet connection. Most videos under 10 minutes download within 1-2 minutes. Longer videos (1-2 hours) may take 5-15 minutes to process and download."
    },
    {
      question: "Can I download YouTube videos on mobile devices?",
      answer: "Yes! Our YouTube video downloader works perfectly on all mobile devices including Android phones, iPhones, and tablets. Simply use your mobile browser to access our downloader - no app installation required."
    },
    {
      question: "Is there a limit on how many YouTube videos I can download?",
      answer: "There are no daily limits on downloads. You can download as many YouTube videos as you need. However, we recommend being respectful of bandwidth and only downloading videos you actually need."
    },
    {
      question: "What file formats are supported for YouTube downloads?",
      answer: "We support MP4 for videos (most compatible format), WEBM for high-efficiency downloads, and MP3 for audio extraction. MP4 is recommended for maximum compatibility across all devices and players."
    }
  ];

  const qualityGuide = [
    { quality: "4K (2160p)", fileSize: "~200-800MB", description: "Ultra High Definition - Best quality for large screens and professional use", recommended: "Large displays, editing" },
    { quality: "1080p Full HD", fileSize: "~100-300MB", description: "High Definition - Perfect balance of quality and file size", recommended: "Most users, general viewing" },
    { quality: "720p HD", fileSize: "~50-150MB", description: "Standard HD quality - Good for mobile devices and moderate file sizes", recommended: "Mobile devices, limited storage" },
    { quality: "480p", fileSize: "~25-75MB", description: "Standard Definition - Smaller files, suitable for basic viewing needs", recommended: "Slow internet, basic quality needs" }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16 lg:py-24" itemScope itemType="https://schema.org/Article">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-emerald-600/5 to-purple-600/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" itemProp="headline">
            How to Download YouTube Videos: Complete Step-by-Step Guide 2025
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed" itemProp="description">
            Learn how to download YouTube videos in HD quality using our free online YouTube downloader. 
            Download any YouTube video in MP4, extract MP3 audio, or save in multiple formats - no software installation required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-16" itemScope itemType="https://schema.org/HowTo">
          <h3 className="text-3xl font-bold text-white text-center mb-12" itemProp="name">
            How to Download YouTube Videos in 4 Easy Steps
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50" itemScope itemType="https://schema.org/HowToStep">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
            YouTube Video Quality Guide: Choose the Right Format
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
                      <td className="p-6 text-cyan-400 font-medium">{item.quality}</td>
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

        {/* Important Notes */}
        <div className="mb-16">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Important Legal and Usage Information</h4>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-amber-400">Copyright Compliance:</strong> Only download YouTube videos that you have permission to use, are in the public domain, or fall under fair use guidelines.</p>
                  <p><strong className="text-amber-400">Personal Use:</strong> Downloads should primarily be for personal, educational, or research purposes in compliance with copyright laws.</p>
                  <p><strong className="text-amber-400">Respect Creators:</strong> Consider supporting content creators through official channels, subscriptions, or purchasing their content when available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16" itemScope itemType="https://schema.org/FAQPage">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions About YouTube Video Downloads
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
                    <ChevronUp className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-cyan-400 flex-shrink-0" />
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

        {/* SEO Keywords Section */}
        <div className="text-center">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">
              Free YouTube Video Downloader - All Formats Supported
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Our free YouTube video downloader supports downloading YouTube videos in MP4, WEBM, and MP3 formats. 
              Download YouTube videos in 4K, 1080p, 720p quality for offline viewing. Fast, secure, and completely free 
              YouTube to MP4 converter with no registration required. Compatible with all devices and browsers for the 
              best YouTube video download experience.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['YouTube Downloader', 'YouTube to MP4', 'Download YouTube Videos', 'YouTube MP3 Converter', 'Free YouTube Downloader', 'YouTube Video Download', 'Save YouTube Videos', 'YouTube Downloader Online'].map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full text-xs text-cyan-300 border border-cyan-500/20">
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
          "headline": "How to Download YouTube Videos: Complete Step-by-Step Guide 2025",
          "description": "Learn how to download YouTube videos in HD quality using our free online YouTube downloader. Download any YouTube video in MP4, extract MP3 audio, or save in multiple formats.",
          "author": {
            "@type": "Organization",
            "name": "Downloader Pro"
          },
          "publisher": {
            "@type": "Organization", 
            "name": "Downloader Pro"
          },
          "datePublished": "2025-01-01",
          "dateModified": "2025-01-01"
        })
      }} />
    </section>
  );
}