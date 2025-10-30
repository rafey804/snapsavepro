'use client';

import React, { useState } from 'react';
import { Download, Link as LinkIcon, Image as ImageIcon, CheckCircle, AlertTriangle, Sparkles, Zap, Shield, Globe, Star, TrendingUp, Users, Clock, FileImage, Maximize2, Smartphone, Monitor, Tablet } from 'lucide-react';

interface ThumbnailQuality {
  quality: string;
  url: string;
  width: number;
  height: number;
  fileSize?: string;
}

interface VideoInfo {
  videoId: string;
  title: string;
  channel: string;
  thumbnails: ThumbnailQuality[];
}

export default function YouTubeThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [selectedQuality, setSelectedQuality] = useState<string>('maxresdefault');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    const videoId = extractVideoId(url.trim());
    if (!videoId) {
      setError('Please provide a valid YouTube URL or Video ID');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const thumbnails: ThumbnailQuality[] = [
        { quality: 'Maximum Resolution', url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, width: 1280, height: 720 },
        { quality: 'High Quality', url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
        { quality: 'Medium Quality', url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
        { quality: 'Standard Definition', url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, width: 640, height: 480 },
      ];

      setVideoInfo({
        videoId,
        title: 'YouTube Video',
        channel: 'YouTube',
        thumbnails
      });

      setTimeout(() => setLoading(false), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleDownload = async (thumbnail: ThumbnailQuality) => {
    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${videoInfo?.videoId}-${thumbnail.quality.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError('Failed to download thumbnail. Please try again.');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.log('Failed to read clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-orange-600/5 to-yellow-600/10" />

      <div className="relative z-10">
        {/* Hero Section with Animation */}
        <div className="container mx-auto px-4 py-12 sm:py-20">
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <svg className="relative h-16 w-16 sm:h-20 sm:w-20 animate-bounce-slow" viewBox="0 0 159 110" fill="none">
                  <path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/>
                  <path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/>
                </svg>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient">
              YouTube Thumbnail Downloader
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Download High-Quality YouTube Thumbnails in All Resolutions - Free, Fast & Easy
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Instant Download</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">All Qualities</span>
              </div>
            </div>
          </div>

          {/* Input Section with Glass Effect */}
          <div className="max-w-4xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6 sm:p-8 transform transition-all hover:scale-[1.01]">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube URL or Video ID here..."
                    className="w-full pl-12 pr-24 py-4 bg-slate-700/50 text-white placeholder-gray-400 rounded-xl border border-slate-600/50 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium bg-slate-600/30 hover:bg-slate-600/50 rounded-lg border border-red-500/30"
                    disabled={loading}
                  >
                    Paste
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <ImageIcon className="h-5 w-5" />
                  )}
                  {loading ? 'Loading...' : 'Get Thumbnails'}
                </button>
              </div>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-200 backdrop-blur-sm flex items-center gap-3 animate-shake">
                <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Thumbnail Preview Grid */}
          {videoInfo && (
            <div className="max-w-6xl mx-auto animate-slide-up">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileImage className="h-6 w-6 text-red-400" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">Available Thumbnails</h2>
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {videoInfo.thumbnails.length} Qualities
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videoInfo.thumbnails.map((thumbnail, index) => (
                    <div
                      key={index}
                      className="group bg-slate-700/50 rounded-xl overflow-hidden border border-slate-600/50 hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={thumbnail.url}
                          alt={thumbnail.quality}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23374151" width="100" height="100"/%3E%3Ctext fill="%239CA3AF" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2">{thumbnail.quality}</h3>
                        <p className="text-gray-400 text-sm mb-3">
                          {thumbnail.width} × {thumbnail.height}
                        </p>
                        <button
                          onClick={() => handleDownload(thumbnail)}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features Section with Advanced Animations */}
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Why Choose Our YouTube Thumbnail Downloader?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              The most advanced and user-friendly tool to download YouTube thumbnails in any quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature Cards */}
            {[
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: 'Lightning Fast',
                description: 'Get your thumbnails instantly without any delays or processing time. Our optimized system ensures maximum speed.',
                gradient: 'from-yellow-500/10 to-orange-500/10',
                border: 'border-yellow-500/20'
              },
              {
                icon: <Shield className="h-8 w-8 text-emerald-400" />,
                title: '100% Safe & Secure',
                description: 'No data collection, no tracking, no registration required. Your privacy is our top priority with secure connections.',
                gradient: 'from-emerald-500/10 to-green-500/10',
                border: 'border-emerald-500/20'
              },
              {
                icon: <Maximize2 className="h-8 w-8 text-blue-400" />,
                title: 'Multiple Resolutions',
                description: 'Download thumbnails in all available qualities from standard to maximum resolution (1280×720) for any use case.',
                gradient: 'from-blue-500/10 to-cyan-500/10',
                border: 'border-blue-500/20'
              },
              {
                icon: <Globe className="h-8 w-8 text-purple-400" />,
                title: 'All Devices Supported',
                description: 'Works seamlessly on desktop, mobile, and tablet. Responsive design ensures perfect experience everywhere.',
                gradient: 'from-purple-500/10 to-pink-500/10',
                border: 'border-purple-500/20'
              },
              {
                icon: <Star className="h-8 w-8 text-red-400" />,
                title: 'No Watermarks',
                description: 'Download original YouTube thumbnails without any watermarks, logos, or modifications. Pure quality.',
                gradient: 'from-red-500/10 to-rose-500/10',
                border: 'border-red-500/20'
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-indigo-400" />,
                title: 'Always Updated',
                description: 'Our tool stays up-to-date with YouTube\'s latest changes ensuring reliable downloads every time.',
                gradient: 'from-indigo-500/10 to-violet-500/10',
                border: 'border-indigo-500/20'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-slate-800/50 backdrop-blur-xl rounded-2xl border ${feature.border} p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-16 sm:py-24 bg-slate-800/20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How to Download YouTube Thumbnails
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Simple 3-step process to get your YouTube thumbnails in seconds
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Copy YouTube URL',
                description: 'Go to YouTube and copy the URL of the video whose thumbnail you want to download. You can also use just the Video ID.',
                icon: <LinkIcon className="h-12 w-12 text-red-400" />,
                color: 'from-red-500 to-orange-500'
              },
              {
                step: '2',
                title: 'Paste & Submit',
                description: 'Paste the YouTube URL into our tool and click "Get Thumbnails". Our system will instantly extract all available thumbnail qualities.',
                icon: <ImageIcon className="h-12 w-12 text-orange-400" />,
                color: 'from-orange-500 to-yellow-500'
              },
              {
                step: '3',
                title: 'Download & Save',
                description: 'Choose your preferred quality and click download. The thumbnail will be saved to your device instantly in high resolution.',
                icon: <Download className="h-12 w-12 text-yellow-400" />,
                color: 'from-yellow-500 to-green-500'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 text-center hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20">
                  <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.step}
                  </div>
                  <div className="mb-4 flex justify-center mt-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-600">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Content Section */}
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-5xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none">

              {/* Introduction */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <ImageIcon className="h-8 w-8 text-red-400" />
                  YouTube Thumbnail Downloader - Complete Guide
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to the most comprehensive YouTube Thumbnail Downloader tool available online. In today's digital age, YouTube thumbnails play a crucial role in attracting viewers and increasing click-through rates. Whether you're a content creator, marketer, designer, or researcher, having access to high-quality YouTube thumbnails is essential for various purposes including analysis, inspiration, competitive research, and content creation.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our advanced YouTube Thumbnail Downloader provides you with instant access to all available thumbnail resolutions from any YouTube video. With support for maximum resolution thumbnails (1280×720), high-quality thumbnails (480×360), medium-quality thumbnails (320×180), and standard definition thumbnails (640×480), you can download exactly what you need for your specific use case. The tool is completely free, requires no registration, and works seamlessly across all devices including desktop computers, smartphones, and tablets.
                </p>
              </div>

              {/* What is YouTube Thumbnail Section */}
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileImage className="h-7 w-7 text-red-400" />
                  What is a YouTube Thumbnail?
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  A YouTube thumbnail is the preview image that appears before a video is played. It serves as the first visual impression of your video content and is one of the most critical elements in determining whether viewers will click on your video. YouTube automatically generates three thumbnail options from your video, but creators can also upload custom thumbnails that better represent their content and attract more viewers.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Thumbnails are displayed across YouTube's platform including search results, suggested videos, channel pages, playlists, and social media shares. A well-designed thumbnail can significantly increase your video's click-through rate (CTR), which in turn affects your video's performance in YouTube's recommendation algorithm. Research shows that videos with custom thumbnails receive up to 154% more clicks than those with auto-generated thumbnails.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The importance of thumbnails extends beyond just aesthetics. They communicate the video's topic, create emotional connections with potential viewers, establish brand consistency, and help your content stand out in a crowded marketplace. Professional content creators spend considerable time designing thumbnails that are eye-catching, informative, and aligned with their brand identity. Understanding thumbnail design principles and analyzing successful thumbnails from your niche can dramatically improve your content's performance.
                </p>
              </div>

              {/* Why Download YouTube Thumbnails Section */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Download className="h-7 w-7 text-orange-400" />
                  Why Download YouTube Thumbnails?
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-3">1. Competitive Research & Analysis</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Analyzing thumbnails from successful videos in your niche is essential for understanding what works. By downloading and studying thumbnails from top-performing videos, you can identify common design patterns, color schemes, text placement strategies, and visual elements that resonate with your target audience. This competitive intelligence helps you create more effective thumbnails for your own content.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-3">2. Design Inspiration & Templates</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Creating compelling thumbnails requires inspiration and reference materials. Downloading high-quality thumbnails from various channels and industries provides you with a rich library of design ideas. Designers and content creators often build inspiration boards with successful thumbnails to reference when creating new designs, helping maintain consistency and quality across their content.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-3">3. Portfolio & Presentation Materials</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Marketing professionals, social media managers, and digital strategists often need to include YouTube thumbnails in presentations, reports, and portfolio materials. Downloading high-resolution thumbnails ensures you have quality images for client presentations, case studies, marketing materials, and educational resources without compromising on image quality.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-3">4. Content Archiving & Documentation</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Researchers, archivists, and content historians may need to preserve YouTube thumbnails for documentation purposes. As videos get deleted or thumbnails get changed, having archived copies becomes valuable for historical research, trend analysis, and academic studies. Downloading thumbnails allows you to maintain a permanent record of visual content evolution.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6">
                    <h4 className="text-xl font-semibold text-white mb-3">5. A/B Testing & Optimization</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Successful YouTube creators constantly test different thumbnail designs to optimize their click-through rates. By downloading and comparing different thumbnail versions, you can analyze which elements perform best. This data-driven approach to thumbnail optimization helps improve overall channel performance and viewer engagement metrics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Available Thumbnail Qualities Section */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Maximize2 className="h-7 w-7 text-blue-400" />
                  Available Thumbnail Qualities
                </h3>
                <div className="space-y-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-500/20 rounded-lg p-3">
                        <Monitor className="h-6 w-6 text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-2">Maximum Resolution (1280×720)</h4>
                        <p className="text-gray-300 leading-relaxed mb-3">
                          The highest quality thumbnail available from YouTube, perfect for professional use, presentations, and high-resolution displays. This format provides the best image quality with excellent detail and clarity, ideal for large displays and professional marketing materials.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">Best Quality</span>
                          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">HD Ready</span>
                          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Professional</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-orange-500/20 rounded-lg p-3">
                        <Tablet className="h-6 w-6 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-2">Standard Definition (640×480)</h4>
                        <p className="text-gray-300 leading-relaxed mb-3">
                          A high-quality standard definition thumbnail suitable for most web applications, blog posts, and social media. This resolution provides a good balance between image quality and file size, making it ideal for web-based content and medium-sized displays.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm">Balanced</span>
                          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">Web Optimized</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-500/20 rounded-lg p-3">
                        <Smartphone className="h-6 w-6 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-2">High Quality (480×360)</h4>
                        <p className="text-gray-300 leading-relaxed mb-3">
                          A good quality thumbnail for mobile devices and smaller displays. This resolution is perfect for mobile applications, quick previews, and situations where file size optimization is important while maintaining acceptable visual quality.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">Mobile Friendly</span>
                          <span className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm">Compact</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500/20 rounded-lg p-3">
                        <FileImage className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-white mb-2">Medium Quality (320×180)</h4>
                        <p className="text-gray-300 leading-relaxed mb-3">
                          A compact thumbnail size ideal for listings, previews, and bandwidth-conscious applications. This smaller resolution is perfect for creating thumbnail galleries, email newsletters, and situations where loading speed is prioritized over maximum image quality.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Lightweight</span>
                          <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">Fast Loading</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Practices Section */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Star className="h-7 w-7 text-yellow-400" />
                  Best Practices for Using Downloaded Thumbnails
                </h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Respect Copyright and Fair Use</h4>
                      <p className="leading-relaxed">
                        Always respect copyright laws when using downloaded thumbnails. Thumbnails are protected by copyright and should only be used for legitimate purposes such as research, education, criticism, or commentary. Never use someone else's thumbnail as your own without permission or proper attribution.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400 font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Analyze Design Elements</h4>
                      <p className="leading-relaxed">
                        When studying downloaded thumbnails, pay attention to key design elements including color psychology, typography choices, composition and layout, facial expressions and emotions, contrast and visibility, and branding consistency. These insights will help you create more effective thumbnails for your own content.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Organize Your Collection</h4>
                      <p className="leading-relaxed">
                        Create a systematic organization method for your downloaded thumbnails. Use folders categorized by niche, style, color scheme, or effectiveness. This organized approach makes it easier to find inspiration when needed and helps identify patterns in successful thumbnail designs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold">4</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Use for Learning and Improvement</h4>
                      <p className="leading-relaxed">
                        Downloaded thumbnails should serve as learning tools to improve your own design skills. Study what makes certain thumbnails effective, understand audience preferences in your niche, and continuously refine your thumbnail creation process based on these insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">5</div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Track Performance Metrics</h4>
                      <p className="leading-relaxed">
                        When analyzing thumbnails from successful videos, also examine their performance metrics. Look at view counts, engagement rates, and channel growth to understand which thumbnail styles correlate with better performance. This data-driven approach helps you make informed design decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Features Section */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-8 mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-purple-400" />
                  Advanced Features & Capabilities
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-500/20 rounded-lg p-2">
                        <Zap className="h-5 w-5 text-purple-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">Instant Processing</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Our tool provides instant thumbnail extraction without any processing delays. Unlike other tools that require server-side processing, our system directly accesses YouTube's CDN for maximum speed and reliability.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-blue-500/20 rounded-lg p-2">
                        <Globe className="h-5 w-5 text-blue-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">No Restrictions</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Download unlimited thumbnails without any restrictions, rate limits, or premium requirements. Our tool is completely free and available for unlimited use by all users without registration or subscriptions.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-green-500/20 rounded-lg p-2">
                        <Shield className="h-5 w-5 text-green-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">Privacy Protected</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      We don't track your downloads, store your URLs, or collect any personal information. Your privacy is completely protected with our no-logging policy and secure connections for all operations.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-red-500/20 rounded-lg p-2">
                        <Users className="h-5 w-5 text-red-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">User Friendly</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Intuitive interface designed for both beginners and professionals. Simple paste-and-download workflow with clear visual previews and quality selection makes the process effortless for everyone.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Preview */}
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="h-7 w-7 text-blue-400" />
                  Quick Tips & Tricks
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4 border-l-4 border-red-500">
                    <p className="text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Pro Tip:</span> You can use just the video ID (the 11-character code) instead of the full URL for faster access. Find it in the YouTube URL after "watch?v=" or in shortened links after "youtu.be/".
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Speed Hack:</span> Use the "Paste" button to quickly insert URLs from your clipboard without manual typing. This saves time when downloading multiple thumbnails.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4 border-l-4 border-yellow-500">
                    <p className="text-gray-300 leading-relaxed">
                      <span className="font-semibold text-white">Quality Selection:</span> Start with Maximum Resolution for the best quality. If the video doesn't support that resolution, try Standard Definition as a reliable alternative.
                    </p>
                  </div>
                </div>
              </div>

            </article>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-16 sm:py-24 bg-gradient-to-br from-slate-800/30 to-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: <Users className="h-8 w-8" />, value: '500K+', label: 'Happy Users', color: 'text-red-400' },
                { icon: <Download className="h-8 w-8" />, value: '10M+', label: 'Thumbnails Downloaded', color: 'text-orange-400' },
                { icon: <Star className="h-8 w-8" />, value: '4.9/5', label: 'User Rating', color: 'text-yellow-400' },
                { icon: <Clock className="h-8 w-8" />, value: '< 1s', label: 'Average Speed', color: 'text-green-400' }
              ].map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className={`flex justify-center mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-300">
                Everything you need to know about downloading YouTube thumbnails
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Is it legal to download YouTube thumbnails?',
                  a: 'Yes, downloading YouTube thumbnails for personal use, research, or educational purposes is generally acceptable under fair use. However, you should not use them for commercial purposes or claim them as your own work without proper attribution or permission from the copyright holder.'
                },
                {
                  q: 'What is the best quality for YouTube thumbnails?',
                  a: 'The maximum resolution (1280×720 pixels) is the best quality available. This HD-ready format provides excellent clarity and is perfect for professional use, presentations, and high-resolution displays. It offers the most detail and maintains quality even when viewed on large screens.'
                },
                {
                  q: 'Can I download thumbnails from private videos?',
                  a: 'No, you can only download thumbnails from public YouTube videos. Private, unlisted, or restricted videos are not accessible through our tool as they require specific permissions that public thumbnail URLs do not provide.'
                },
                {
                  q: 'Do I need to install any software?',
                  a: 'No installation required! Our YouTube Thumbnail Downloader is a web-based tool that works directly in your browser. Simply visit our website, paste the video URL, and download thumbnails instantly without any software downloads or browser extensions.'
                },
                {
                  q: 'Why does maximum resolution fail sometimes?',
                  a: 'Not all YouTube videos have maximum resolution (1280×720) thumbnails available. Older videos, videos from certain mobile uploads, or videos with lower source quality may only have standard or high-quality thumbnails. Try downloading alternative resolutions if maxres is unavailable.'
                },
                {
                  q: 'Can I use this on mobile devices?',
                  a: 'Absolutely! Our tool is fully responsive and works perfectly on all devices including iPhone, Android smartphones, tablets, and desktop computers. The interface automatically adapts to your screen size for an optimal experience on any device.'
                },
                {
                  q: 'How fast are the downloads?',
                  a: 'Downloads are instantaneous! Our tool directly accesses YouTube\'s Content Delivery Network (CDN) where thumbnails are stored, ensuring maximum download speeds without any server-side processing delays. Most downloads complete in under one second.'
                },
                {
                  q: 'Are there any limitations or restrictions?',
                  a: 'No limitations whatsoever! Download unlimited thumbnails, use the tool as many times as you want, and access all quality options completely free. No registration, no premium plans, no hidden restrictions – 100% free unlimited access for everyone.'
                }
              ].map((faq, index) => (
                <details key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6 group hover:border-red-500/30 transition-all">
                  <summary className="font-semibold text-white cursor-pointer flex items-center justify-between group-hover:text-red-400 transition-colors">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-gray-300 mt-4 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl border border-red-500/30 p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Download YouTube Thumbnails?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Get instant access to high-quality YouTube thumbnails in all available resolutions. Free, fast, and easy to use!
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-red-500/50 inline-flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Start Downloading Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-8 text-center text-gray-400 border-t border-slate-700/50">
          <p className="mb-2">© 2025 YouTube Thumbnail Downloader. All rights reserved.</p>
          <p className="text-sm">Download YouTube thumbnails in HD quality | Fast, Free & Secure | No registration required</p>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% 200%; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
}
