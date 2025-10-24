// components/DetailedInstructionsSection.jsx
'use client';

import React from 'react';
import { 
  Copy, Link, Download, Smartphone, Monitor, Globe, Shield, Zap, Crown, 
  Star, CheckCircle, Users, BookOpen, Calendar, Share2, Lightbulb, Film, 
  Megaphone, MessageCircle, Tv, Heart, Newspaper, Video, Music, Gift, 
  Clock, Wifi, WifiOff, Cloud, Database, SmartphoneIcon, Laptop, Tablet,
  Award, ThumbsUp, Eye, TrendingUp, Lock, Unlock, RefreshCw, HelpCircle,
  FileText, Play, Pause, SkipForward, Volume2, Image, Hash, MessageSquare,
  Bookmark, ExternalLink, ArrowRight, ChevronRight, Info, AlertTriangle,
  Battery, BatteryCharging, Cpu, HardDrive, Server
} from 'lucide-react';

export default function DetailedInstructionsSection() {
  return (
    <div className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="container mx-auto px-4">
        
        {/* Comprehensive Introduction */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              The Ultimate X (Twitter) Video Downloader Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover how to download any video from X (formerly Twitter) in maximum quality, 
              without watermarks, and completely free. Our comprehensive guide covers everything 
              from basic downloads to advanced tips for power users.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { number: "100k+", label: "Downloads Served" },
              { number: "99.9%", label: "Success Rate" },
              { number: "4.8/5", label: "User Rating" },
              { number: "0", label: "Cost Forever" }
            ].map((stat, index) => (
              <div key={index} className="text-center bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Step-by-Step Guide */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Complete Step-by-Step Download Guide
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Follow these detailed instructions to download X videos on any device with perfect results every time.
            </p>
          </div>

          {/* Enhanced Steps with Sub-steps */}
          <div className="space-y-8">
            {/* Step 1 - Enhanced */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Copy the Video Link Correctly</h3>
                  <p className="text-gray-400">Learn the professional way to extract X video URLs</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Correct Methods:
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span><strong>Mobile App:</strong> Tap share icon → "Copy Link"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span><strong>Desktop Browser:</strong> Right-click video → "Copy Video URL"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                      <span><strong>Alternative:</strong> Copy from browser address bar</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    Common Mistakes to Avoid:
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-1 flex-shrink-0" />
                      <span>Don't copy shortened t.co links directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-1 flex-shrink-0" />
                      <span>Ensure the link contains "/status/" in URL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-400 mt-1 flex-shrink-0" />
                      <span>Check if video is from public account (private videos won't work)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 - Enhanced */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-sky-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Paste & Process with SnapSavePro</h3>
                  <p className="text-gray-400">Advanced processing for best quality downloads</p>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-6 mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">What Happens During Processing:</h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { step: "URL Validation", desc: "Verify X link authenticity" },
                    { step: "Server Connection", desc: "Connect to X servers securely" },
                    { step: "Quality Analysis", desc: "Detect available resolutions" },
                    { step: "Format Preparation", desc: "Prepare download options" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Server className="h-6 w-6 text-sky-400" />
                      </div>
                      <div className="text-sm font-semibold text-white">{item.step}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3 - Enhanced */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Download & Save Strategically</h3>
                  <p className="text-gray-400">Smart downloading techniques for different needs</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "For Quality",
                    tips: ["Choose highest available resolution", "MP4 for video, MP3 for audio", "Check file size before downloading"]
                  },
                  {
                    title: "For Storage",
                    tips: ["Lower resolution saves space", "720p for mobile viewing", "Consider audio-only for podcasts"]
                  },
                  {
                    title: "For Speed",
                    tips: ["Smaller files download faster", "Use MP3 for quick audio saves", "480p for instant sharing"]
                  }
                ].map((strategy, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">{strategy.title}</h4>
                    <ul className="space-y-2">
                      {strategy.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-300">
                          <ChevronRight className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Device-Specific Master Guide */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Device-Specific Master Guide
            </h2>
            <p className="text-lg text-gray-300">
              Optimized instructions for every device and operating system
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Android Comprehensive Guide */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <SmartphoneIcon className="h-8 w-8 text-green-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">Android Devices</h3>
                  <p className="text-green-400 text-sm">Full compatibility</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Supported Browsers:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Chrome', 'Firefox', 'Edge', 'Opera', 'Samsung Internet'].map((browser, idx) => (
                      <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                        {browser}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Storage Locations:</h4>
                  {[
                    "Downloads folder (accessible via Files app)",
                    "DCIM folder for gallery integration",
                    "Custom folder selection supported"
                  ].map((location, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Folder className="h-4 w-4 text-green-400" />
                      {location}
                    </div>
                  ))}
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Pro Tips:
                  </h4>
                  <ul className="text-sm text-amber-200 space-y-1">
                    <li>• Enable "Unknown sources" if download blocked</li>
                    <li>• Use download manager apps for batch downloads</li>
                    <li>• Clear browser cache if downloads fail</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* iOS Comprehensive Guide */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">iOS Devices</h3>
                  <p className="text-blue-400 text-sm">Safari required</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">iOS Version Support:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['iOS 14+', 'iOS 15+', 'iOS 16+', 'iOS 17+'].map((version, idx) => (
                      <div key={idx} className="text-center py-1 bg-blue-500/20 text-blue-300 rounded">
                        {version}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Save to Locations:</h4>
                  {[
                    "Photos app (automatic)",
                    "Files app with manual selection",
                    "Third-party cloud storage apps"
                  ].map((location, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <HardDrive className="h-4 w-4 text-blue-400" />
                      {location}
                    </div>
                  ))}
                </div>

                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-2">iOS Specific Steps:</h4>
                  <ol className="text-sm text-purple-200 space-y-2">
                    <li>1. Must use Safari browser only</li>
                    <li>2. Tap share button after download</li>
                    <li>3. Select "Save to Files" or "Save Video"</li>
                    <li>4. Wait for completion notification</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Desktop Comprehensive Guide */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Laptop className="h-8 w-8 text-purple-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">Desktop Computers</h3>
                  <p className="text-purple-400 text-sm">All major OS supported</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Operating Systems:</h4>
                  <div className="flex flex-wrap gap-1">
                    {['Windows 10/11', 'macOS', 'Linux', 'Chrome OS'].map((os, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                        {os}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">Browser Compatibility:</h4>
                  {[
                    "Chrome - Full support",
                    "Firefox - Full support", 
                    "Edge - Full support",
                    "Safari - Full support",
                    "Opera - Full support"
                  ].map((browser, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Globe className="h-4 w-4 text-purple-400" />
                      {browser}
                    </div>
                  ))}
                </div>

                <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4">
                  <h4 className="font-semibold text-sky-300 mb-2">Desktop Advantages:</h4>
                  <ul className="text-sm text-sky-200 space-y-1">
                    <li>• Faster download speeds</li>
                    <li>• Better file management</li>
                    <li>• Multiple simultaneous downloads</li>
                    <li>• Direct folder selection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Features Deep Dive */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Advanced Features & Capabilities
            </h2>
            <p className="text-lg text-gray-300">
              Unleash the full power of SnapSavePro with these professional features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Video Features */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Video className="h-8 w-8 text-blue-400" />
                Video Download Features
              </h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Quality Options",
                    features: ["4K Ultra HD (when available)", "1080p Full HD", "720p HD", "480p Standard", "360p Mobile"]
                  },
                  {
                    title: "Format Support", 
                    features: ["MP4 (Recommended)", "WEBM", "3GP (Legacy)", "All modern codecs"]
                  },
                  {
                    title: "Advanced Options",
                    features: ["No watermark guarantee", "Original audio preservation", "Metadata inclusion", "Fast streaming"]
                  }
                ].map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold text-white mb-3">{section.title}</h4>
                    <div className="grid gap-2">
                      {section.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio & Additional Features */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Music className="h-8 w-8 text-green-400" />
                Audio & Extra Features
              </h3>

              <div className="space-y-6">
                {[
                  {
                    title: "Audio Extraction",
                    features: ["MP3 High Quality (320kbps)", "MP3 Standard (192kbps)", "AAC Format", "M4A Container", "Original audio track"]
                  },
                  {
                    title: "GIF Creation",
                    features: ["Convert videos to GIF", "Custom duration selection", "Quality optimization", "No size limits"]
                  },
                  {
                    title: "Batch Processing",
                    features: ["Multiple video queues", "Background processing", "Download history", "Resume capability"]
                  }
                ].map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-semibold text-white mb-3">{section.title}</h4>
                    <div className="grid gap-2">
                      {section.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 text-gray-300">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Expansion */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Professional Use Cases & Applications
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover how different professionals and enthusiasts use SnapSavePro for their specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Education & Research",
                description: "Students and researchers download educational content, lectures, and tutorials for offline study and reference.",
                features: ["Course materials", "Research videos", "Tutorial series", "Academic references"]
              },
              {
                icon: TrendingUp,
                title: "Content Creators",
                description: "YouTubers, influencers, and social media managers download content for inspiration and repurposing.",
                features: ["Content inspiration", "Reaction videos", "Compilation content", "Trend analysis"]
              },
              {
                icon: MessageCircle,
                title: "Journalism & Media",
                description: "Journalists save news clips, interviews, and important statements for reporting and archival purposes.",
                features: ["News archives", "Interview clips", "Breaking news", "Fact-checking"]
              },
              {
                icon: Users,
                title: "Social Media Managers",
                description: "Professional social media teams download viral content for analysis and strategic planning.",
                features: ["Competitor analysis", "Trend monitoring", "Campaign research", "Performance study"]
              },
              {
                icon: Film,
                title: "Entertainment Industry",
                description: "Film professionals and entertainment enthusiasts download trailers, teasers, and promotional content.",
                features: ["Trailer collection", "Promotional material", "Industry trends", "Fan content"]
              },
              {
                icon: Heart,
                title: "Personal Archives",
                description: "Individuals save personal memories, family videos, and important moments shared on social media.",
                features: ["Family memories", "Personal moments", "Event recordings", "Sentimental value"]
              }
            ].map((usecase, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 hover:border-sky-500/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <usecase.icon className="h-6 w-6 text-sky-400" />
                  <h3 className="text-lg font-semibold text-white">{usecase.title}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{usecase.description}</p>
                <div className="space-y-2">
                  {usecase.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-xs text-gray-400">
                      <ChevronRight className="h-3 w-3 text-sky-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-amber-500/20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Technical Specifications & Requirements
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">System Requirements</h3>
                <div className="space-y-4">
                  {[
                    { requirement: "Internet Connection", details: "Minimum 2Mbps, Recommended 10Mbps+" },
                    { requirement: "Browser Version", details: "Chrome 80+, Firefox 75+, Safari 13+, Edge 80+" },
                    { requirement: "JavaScript", details: "Must be enabled for processing" },
                    { requirement: "Storage Space", details: "Varies by video quality (10MB - 2GB typical)" },
                    { requirement: "RAM", details: "Minimum 2GB, Recommended 4GB+" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-gray-300">{item.requirement}</span>
                      <span className="text-amber-300 text-sm font-medium">{item.details}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Supported Content</h3>
                <div className="space-y-4">
                  {[
                    { type: "Video Length", support: "Up to 2 hours (platform dependent)" },
                    { type: "File Size Limit", support: "Up to 2GB per download" },
                    { type: "Video Formats", support: "MP4, WEBM, 3GP, MOV" },
                    { type: "Audio Formats", support: "MP3, M4A, AAC, OGG" },
                    { type: "Resolution Support", support: "Up to 4K (source dependent)" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-700/50">
                      <span className="text-gray-300">{item.type}</span>
                      <span className="text-green-300 text-sm font-medium">{item.support}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Comprehensive CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-12 border border-blue-500/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Master X Video Downloads?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join millions of users who trust SnapSavePro for their video downloading needs. 
              Experience the difference of a professional-grade downloader that puts quality, 
              speed, and reliability first.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { label: "No Registration", icon: Users },
                { label: "Instant Processing", icon: Zap },
                { label: "HD Quality", icon: Award }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-2 text-white">
                  <feature.icon className="h-5 w-5" />
                  <span className="font-semibold">{feature.label}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-black/30 rounded-xl p-6 border border-white/10">
              <p className="text-white font-bold text-lg mb-2">
                Start Downloading in Seconds!
              </p>
              <p className="text-gray-300">
                Paste your X video link at the top of this page and experience the fastest, 
                most reliable video download service available.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Helper component for folder icon
function Folder(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  );
}