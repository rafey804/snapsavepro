'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, Download, Shield, Zap, Globe, CheckCircle, AlertCircle, Monitor, Smartphone, Music, Video, Star, Heart, Camera, Film, Users, Clock } from 'lucide-react';

export default function InstagramDownloadGuide() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index:any) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      title: "Lightning Fast Downloads",
      description: "Download Instagram reels, posts, stories & IGTV at maximum speed in HD quality"
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-400" />,
      title: "100% Safe & Secure",
      description: "No malware, no ads, completely secure Instagram video downloading"
    },
    {
      icon: <Star className="h-6 w-6 text-pink-400" />,
      title: "All Instagram Content",
      description: "Download Instagram reels, posts, stories, IGTV videos and photos"
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
      title: "Copy Instagram URL",
      description: "Open Instagram app or website and find the reel, post, story, or IGTV video you want to download. Tap the three dots menu and select 'Copy Link' to copy the Instagram URL to your clipboard.",
      tips: ["Works with Instagram reels URLs", "Supports Instagram posts and IGTV", "Works with Instagram stories", "Compatible with all Instagram content types"]
    },
    {
      step: "2", 
      title: "Paste URL in Instagram Downloader",
      description: "Return to our Instagram downloader tool above. Paste the copied URL into the input field and click 'Get Content'. Our system will instantly analyze the Instagram content and extract video information.",
      tips: ["Automatically detects content type", "Extracts Instagram video information", "Shows creator details and post stats", "Supports reels, posts, stories, IGTV"]
    },
    {
      step: "3",
      title: "Choose Download Quality & Format",
      description: "Select your preferred video quality and format. Choose from HD video with audio, or extract audio as MP3. All Instagram content downloads preserve original quality with audio included.",
      tips: ["HD quality up to 1080p", "Audio included in video downloads", "MP3 audio extraction available", "Multiple quality options"]
    },
    {
      step: "4",
      title: "Download Instagram Content",
      description: "Click the download button for your chosen format. The Instagram video or audio will download automatically to your device's download folder with full quality preserved.",
      tips: ["Downloads with original quality", "Progress tracking available", "Multiple downloads supported", "Works for all Instagram content"]
    }
  ];

  const faqs = [
    {
      question: "Is it legal to download Instagram videos and reels?",
      answer: "Downloading Instagram content for personal use is generally acceptable, but you should respect copyright laws and creators' rights. Only download content you have permission to use or for educational/research purposes."
    },
    {
      question: "Can I download Instagram reels with audio?",
      answer: "Yes! Our Instagram downloader preserves the original audio in Instagram reels and videos. You'll get high-quality video downloads with the original soundtrack, music, and audio effects included."
    },
    {
      question: "What Instagram content can I download?",
      answer: "Our downloader supports all Instagram content types: Instagram reels, regular posts with videos, Instagram stories, IGTV videos, and even carousel posts with multiple videos or photos."
    },
    {
      question: "Can I extract audio from Instagram reels and videos?",
      answer: "Absolutely! You can download Instagram audio as MP3 files. This is perfect for saving Instagram reel sounds, music, or audio content from posts and IGTV videos for personal use."
    },
    {
      question: "How long does it take to download Instagram content?",
      answer: "Instagram downloads are very fast. Instagram reels (15-90 seconds) typically download in 10-30 seconds, while longer IGTV videos may take 30-60 seconds depending on length and quality."
    },
    {
      question: "Can I download Instagram videos on mobile devices?",
      answer: "Yes! Our Instagram video downloader works perfectly on all mobile devices including Android phones, iPhones, and tablets. Simply use your mobile browser - no app installation required."
    },
    {
      question: "Do I need to log in to Instagram to download videos?",
      answer: "No login required! Our Instagram downloader works with public Instagram content without requiring you to log in to your Instagram account. Just paste the URL and download."
    },
    {
      question: "What is Instagram and why download content?",
      answer: "Instagram is a popular photo and video sharing social media platform owned by Meta. Users download Instagram content to save favorites offline, create compilations, share content, or use for educational and creative purposes."
    }
  ];

  const instagramInfo = [
    { 
      title: "What is Instagram?", 
      content: "Instagram is a photo and video sharing social media platform owned by Meta (Facebook). Launched in 2010, Instagram has evolved from a simple photo-sharing app to a comprehensive social media platform with over 2 billion monthly active users worldwide." 
    },
    { 
      title: "Instagram Content Types", 
      content: "Instagram supports various content formats: regular posts (photos/videos up to 60 seconds), Instagram reels (15-90 seconds), Instagram stories (24-hour temporary content), IGTV (long-form videos up to 60 minutes), and live streaming." 
    },
    { 
      title: "Instagram Algorithm", 
      content: "Instagram's algorithm uses machine learning to curate personalized content feeds. It analyzes user engagement, content type, posting time, relationship with creator, and user behavior to determine what content appears in feeds and explore pages." 
    },
    { 
      title: "Instagram Features", 
      content: "Instagram offers extensive creative tools including filters, effects, music library, AR effects, shopping features, direct messaging, stories highlights, reels editing tools, and business analytics for creators and brands." 
    }
  ];

  const qualityGuide = [
    { quality: "HD (1080p)", fileSize: "~10-50MB", description: "High Definition video with audio - Best quality for Instagram content", recommended: "Best overall quality" },
    { quality: "Standard (720p)", fileSize: "~5-25MB", description: "Good quality for most viewing needs with faster downloads", recommended: "Balanced quality and size" },
    { quality: "Mobile (480p)", fileSize: "~3-15MB", description: "Optimized for mobile viewing with smaller file sizes", recommended: "Mobile devices, limited storage" },
    { quality: "Audio (MP3)", fileSize: "~1-5MB", description: "Extract audio/music from Instagram videos in MP3 format", recommended: "Music and sounds only" }
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16 lg:py-24" itemScope itemType="https://schema.org/Article">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-orange-600/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" itemProp="headline">
            How to Download Instagram Videos, Reels & Stories: Complete Guide 2025
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed" itemProp="description">
            Learn how to download Instagram reels, posts, stories, and IGTV videos with our free online Instagram downloader. 
            Save Instagram content in HD quality with audio, extract MP3 audio, and download all Instagram content types - no app installation required.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Instagram Information Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need to Know About Instagram
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {instagramInfo.map((info, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
                <h4 className="text-xl font-semibold text-purple-400 mb-4">{info.title}</h4>
                <p className="text-gray-300 leading-relaxed">{info.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-16" itemScope itemType="https://schema.org/HowTo">
          <h3 className="text-3xl font-bold text-white text-center mb-12" itemProp="name">
            How to Download Instagram Videos, Reels & Stories in 4 Easy Steps
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50" itemScope itemType="https://schema.org/HowToStep">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
            Instagram Video Quality Guide: Choose the Right Format
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
                      <td className="p-6 text-purple-400 font-medium">{item.quality}</td>
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

        {/* Instagram Statistics */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Instagram Platform Statistics & Facts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">2B+</div>
              <div className="text-gray-300">Monthly Active Users</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">500M+</div>
              <div className="text-gray-300">Daily Instagram Stories</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">95B+</div>
              <div className="text-gray-300">Photos & Videos Shared</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/30 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">53 min</div>
              <div className="text-gray-300">Daily Average Usage</div>
            </div>
          </div>
        </div>

        {/* Instagram Content Types */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Instagram Content Types You Can Download
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
              <Camera className="h-8 w-8 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Instagram Posts</h4>
              <p className="text-gray-300 text-sm">Regular Instagram posts with photos and videos up to 60 seconds long. Single posts and carousel posts supported.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
              <Play className="h-8 w-8 text-pink-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Instagram Reels</h4>
              <p className="text-gray-300 text-sm">Short-form vertical videos (15-90 seconds) with music, effects, and editing features. Instagram's answer to TikTok.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
              <Clock className="h-8 w-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Instagram Stories</h4>
              <p className="text-gray-300 text-sm">24-hour temporary content including photos, videos, boomerangs, and live videos shared in stories format.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
              <Film className="h-8 w-8 text-blue-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">IGTV Videos</h4>
              <p className="text-gray-300 text-sm">Long-form vertical videos up to 60 minutes for regular users and longer for verified accounts and larger creators.</p>
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
                  <p><strong className="text-amber-400">Copyright Compliance:</strong> Only download Instagram content that you have permission to use, are in the public domain, or fall under fair use guidelines.</p>
                  <p><strong className="text-amber-400">Personal Use:</strong> Downloads should primarily be for personal, educational, or research purposes in compliance with copyright laws.</p>
                  <p><strong className="text-amber-400">Respect Creators:</strong> Consider supporting Instagram creators through official channels, following their accounts, or engaging with their content on the platform.</p>
                  <p><strong className="text-amber-400">Privacy Respect:</strong> Only download public Instagram content. Private account content requires permission from the account owner.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16" itemScope itemType="https://schema.org/FAQPage">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions About Instagram Downloads
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
                    <ChevronUp className="h-5 w-5 text-purple-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-400 flex-shrink-0" />
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

        {/* Instagram Tips Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Pro Tips for Using Instagram Downloader
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
              <Video className="h-8 w-8 text-purple-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Video Quality</h4>
              <p className="text-gray-300 text-sm">Always choose the highest quality available for best results. HD downloads preserve the original Instagram video quality with audio.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
              <Music className="h-8 w-8 text-pink-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">Audio Extraction</h4>
              <p className="text-gray-300 text-sm">Use MP3 extraction for Instagram reel sounds and music. Perfect for creating your own content or saving trending audio clips.</p>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/30">
              <Users className="h-8 w-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-3">All Content Types</h4>
              <p className="text-gray-300 text-sm">Download any Instagram content: reels, posts, stories, IGTV videos. All formats supported with original quality preserved.</p>
            </div>
          </div>
        </div>

        {/* SEO Keywords Section */}
        <div className="text-center">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">
              Free Instagram Video Downloader - Reels, Posts, Stories & IGTV
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Our free Instagram video downloader supports downloading Instagram reels, posts, stories, and IGTV videos in HD quality with audio. 
              Download Instagram content for offline viewing, extract Instagram audio as MP3, and save Instagram videos from all content types. 
              Fast, secure, and completely free Instagram to MP4 converter with no registration required. Compatible with all devices 
              and browsers for the best Instagram video download experience.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                'Instagram Downloader', 
                'Instagram Video Download', 
                'Download Instagram Reels', 
                'Instagram to MP4', 
                'Instagram MP3 Converter', 
                'Free Instagram Downloader', 
                'Save Instagram Videos', 
                'Instagram Downloader Online',
                'Download Instagram Stories',
                'Instagram Video Saver',
                'Download Instagram HD',
                'Instagram Audio Extractor',
                'Instagram Reel Downloader',
                'Download IGTV Videos',
                'Instagram Post Downloader',
                'Save Instagram Content'
              ].map((keyword, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-xs text-purple-300 border border-purple-500/20">
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
          "headline": "How to Download Instagram Videos, Reels & Stories: Complete Guide 2025",
          "description": "Learn how to download Instagram reels, posts, stories, and IGTV videos with our free online Instagram downloader. Save Instagram content in HD quality with audio, extract MP3 audio, and download all Instagram content types.",
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
          "keywords": "Instagram downloader, download Instagram videos, Instagram reels download, Instagram to MP4, Instagram MP3 converter, download Instagram stories, IGTV downloader",
          "about": {
            "@type": "Thing",
            "name": "Instagram Video Downloading",
            "description": "Methods and tools for downloading Instagram videos, reels, stories, and IGTV content"
          }
        })
      }} />
    </section>
  );
}