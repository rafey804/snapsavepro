'use client';

import React, { useState } from 'react';
import { Search, Download, Play, Clock, Eye, User, FileVideo, Music, Loader, CheckCircle, AlertTriangle, Heart, MessageCircle, Share2, Star } from 'lucide-react';

interface VideoFormat {
  quality: string;
  type: 'video' | 'audio';
  format_id: string;
  ext: string;
  filesize: number;
  fps?: number;
  vcodec?: string;
  acodec?: string;
  width?: number;
  height?: number;
  abr?: number;
  description?: string;
  has_audio?: boolean;
  watermark_free?: boolean;
  protocol?: string;
  duration?: number;
}

interface VideoInfo {
  title: string;
  duration: number;
  view_count: number;
  uploader: string;
  thumbnail: string;
  description: string;
  upload_date: string;
  like_count: number;
  comment_count: number;
  formats: {
    video_formats: VideoFormat[];
    audio_formats: VideoFormat[];
  };
}

interface DownloadProgress {
  status: string;
  percent: number;
  speed?: string;
  eta?: string;
  error?: string;
  filename?: string;
}

interface ProcessingStatus {
  stage: string;
  message: string;
  percent: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: DownloadProgress}>({});
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [downloadMode, setDownloadMode] = useState<'video' | 'audio'>('video');

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return 'N/A';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const formatLikeCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  const simulateProcessingStages = () => {
    const stages = [
      { stage: 'validating', message: 'Validating TikTok URL...', percent: 15 },
      { stage: 'connecting', message: 'Connecting to TikTok servers...', percent: 35 },
      { stage: 'extracting', message: 'Extracting video information...', percent: 60 },
      { stage: 'analyzing', message: 'Finding watermark-free version...', percent: 80 },
      { stage: 'finalizing', message: 'Preparing download options...', percent: 95 },
      { stage: 'complete', message: 'Ready to download!', percent: 100 }
    ];

    let currentStage = 0;
    
    const updateStage = () => {
      if (currentStage < stages.length) {
        setProcessingStatus(stages[currentStage]);
        currentStage++;
        
        if (currentStage < stages.length) {
          const delay = currentStage === 2 ? 1000 : currentStage === 3 ? 1200 : 700;
          setTimeout(updateStage, delay);
        }
      }
    };

    updateStage();
  };

  const validateTikTokURL = (url: string): boolean => {
    const tiktokPatterns = [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
      /(?:https?:\/\/)?(?:vm|vt)\.tiktok\.com\/[\w.-]+/,
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/t\/[\w.-]+/,
      /(?:https?:\/\/)?m\.tiktok\.com\/v\/\d+/,
    ];
    
    return tiktokPatterns.some(pattern => pattern.test(url.toLowerCase()));
  };

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!validateTikTokURL(url.trim())) {
      setError('Please provide a valid TikTok URL');
      return;
    }

    setLoading(true);
    setError('');
    setVideoInfo(null);
    setProcessingStatus(null);

    setTimeout(() => {
      if (loading) {
        simulateProcessingStages();
      }
    }, 300);

    try {
      const response = await fetch(`${API_BASE_URL}/video-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video information');
      }

      setVideoInfo(data);
      setProcessingStatus({ stage: 'complete', message: 'TikTok video ready!', percent: 100 });
      
      setTimeout(() => {
        setProcessingStatus(null);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProcessingStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: VideoFormat) => {
    const downloadKey = `${format.format_id}_${Date.now()}`;
    
    try {
      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: { status: 'initializing', percent: 0 }
      }));

      const response = await fetch(`${API_BASE_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          format_id: format.format_id,
          type: format.type,
          ext: format.ext,
          duration: videoInfo?.duration || 0,
          platform: 'tiktok',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start download');
      }

      const downloadId = data.download_id;

      const pollProgress = async () => {
        try {
          const progressResponse = await fetch(`${API_BASE_URL}/progress/${downloadId}`);
          const progressData = await progressResponse.json();

          setDownloadProgress(prev => ({
            ...prev,
            [downloadKey]: progressData
          }));

          if (progressData.status === 'completed') {
            setTimeout(() => {
              try {
                const downloadUrl = `${API_BASE_URL}/download-direct/${downloadId}`;
                
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = '';
                link.style.display = 'none';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                setDownloadProgress(prev => ({
                  ...prev,
                  [downloadKey]: { ...progressData, status: 'downloaded' }
                }));
                
              } catch (downloadError) {
                console.error('Download error:', downloadError);
                try {
                  window.open(`${API_BASE_URL}/download-direct/${downloadId}`, '_blank');
                } catch (fallbackError) {
                  setDownloadProgress(prev => ({
                    ...prev,
                    [downloadKey]: { 
                      ...progressData, 
                      status: 'error', 
                      error: 'Failed to download file. Please try again.' 
                    }
                  }));
                }
              }
            }, 1000);
            
            setTimeout(() => {
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[downloadKey];
                return newProgress;
              });
            }, 8000);
          } else if (progressData.status === 'downloading' || progressData.status === 'processing' || progressData.status === 'finalizing' || progressData.status.includes('retrying')) {
            setTimeout(pollProgress, 1500);
          } else if (progressData.status === 'error') {
            setTimeout(() => {
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[downloadKey];
                return newProgress;
              });
            }, 8000);
          } else {
            setTimeout(pollProgress, 2000);
          }
        } catch (error) {
          setDownloadProgress(prev => ({
            ...prev,
            [downloadKey]: { status: 'error', percent: 0, error: 'Progress check failed' }
          }));
        }
      };

      pollProgress();

    } catch (err) {
      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: { 
          status: 'error', 
          percent: 0, 
          error: err instanceof Error ? err.message : 'Download failed' 
        }
      }));
    }
  };

  const getButtonText = (progress: DownloadProgress | null): string => {
    if (!progress) return 'Download';
    
    switch (progress.status) {
      case 'downloaded': return 'Downloaded';
      case 'completed': return 'Starting Download...';
      case 'downloading': return 'Downloading...';
      case 'processing': return 'Processing...';
      case 'finalizing': return 'Finalizing...';
      case 'initializing': return 'Initializing...';
      default:
        if (progress.status.includes('retrying')) return 'Retrying...';
        return 'Download';
    }
  };

  const ProgressBar = ({ progress }: { progress: DownloadProgress }) => (
    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          progress.status === 'error' ? 'bg-red-500' : 
          progress.status === 'completed' || progress.status === 'downloaded' ? 'bg-emerald-500' : 
          progress.status.includes('retrying') ? 'bg-amber-500' : 'bg-pink-500'
        }`}
        style={{ width: `${progress.percent}%` }}
      />
    </div>
  );

  const ProcessingIndicator = ({ status }: { status: ProcessingStatus }) => (
    <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
      <div className="bg-slate-800/80 border border-pink-400/30 rounded-xl p-4 sm:p-6 text-center backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {status.stage === 'complete' ? (
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          ) : (
            <Loader className="h-5 w-5 sm:h-6 sm:w-6 text-pink-400 animate-spin" />
          )}
          <span className="text-base sm:text-lg font-medium text-white">{status.message}</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mb-2">
          <div
            className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
              status.stage === 'complete' ? 'bg-emerald-500' : 'bg-gradient-to-r from-pink-500 to-purple-500'
            }`}
            style={{ width: `${status.percent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm text-gray-300">
          <span>Processing TikTok video...</span>
          <span>{status.percent}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-4 sm:pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-purple-600/5 to-blue-600/10" />
      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        
        {/* Mobile Responsive Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            TikTok Downloader
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Download TikTok videos without watermark in HD quality
          </p>
          <div className="flex justify-center items-center gap-1 sm:gap-2 mt-3 sm:mt-4">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
            <span className="text-pink-300 font-semibold text-sm sm:text-base">Watermark-Free Downloads</span>
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
          </div>
        </div>

        {/* MOBILE RESPONSIVE INPUT SECTION */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            
            {/* Mobile Layout - Input with Paste button inside, Get Video button below */}
            <div className="block md:hidden">
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                <div className="p-3 sm:p-4">
                  <div className="relative">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste TikTok URL here..."
                      className="w-full px-4 py-3 sm:py-4 bg-slate-700/50 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none rounded-xl border border-slate-600/50 focus:border-pink-500/50 pr-16 sm:pr-20"
                      disabled={loading}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && url.trim()) {
                          handleSubmit(e);
                        }
                      }}
                    />
                    {/* Transparent Paste Button Inside Input */}
                    <button
                      onClick={() => {
                        navigator.clipboard.readText().then(text => {
                          setUrl(text);
                        }).catch(err => {
                          console.log('Failed to read clipboard');
                        });
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 sm:py-2 text-pink-400 hover:text-pink-300 transition-colors text-xs sm:text-sm font-medium bg-transparent hover:bg-slate-600/20 rounded-lg border border-pink-500/30 backdrop-blur-sm"
                      disabled={loading}
                    >
                      Paste
                    </button>
                  </div>
                  
                  {/* Get Video Button Below Input - Mobile Only */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !url.trim()}
                    className="w-full mt-3 sm:mt-4 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 rounded-xl text-sm sm:text-base"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    {loading ? 'Processing...' : 'Get Video'}
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout - Original Side by Side Design */}
            <div className="hidden md:flex rounded-2xl overflow-hidden shadow-2xl bg-slate-800/80 backdrop-blur-lg border border-slate-700/50">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste TikTok URL here... (e.g., https://www.tiktok.com/@user/video/123)"
                className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && url.trim()) {
                    handleSubmit(e);
                  }
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !url.trim()}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                {loading ? 'Processing...' : 'Get Video'}
              </button>
            </div>
          </div>
        </div>

        {processingStatus && <ProcessingIndicator status={processingStatus} />}

        {/* Mobile Responsive Download Mode Selector */}
        {videoInfo && (
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            <div className="flex justify-center">
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-1 sm:p-2 flex gap-1 sm:gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setDownloadMode('video')}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-base flex-1 sm:flex-none justify-center ${
                    downloadMode === 'video'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <FileVideo className="h-3 w-3 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Video Downloads</span>
                  <span className="sm:hidden">Video</span>
                </button>
                <button
                  onClick={() => setDownloadMode('audio')}
                  className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-base flex-1 sm:flex-none justify-center ${
                    downloadMode === 'audio'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Music className="h-3 w-3 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Audio Only (MP3)</span>
                  <span className="sm:hidden">Audio</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 sm:p-4 text-red-200 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 flex-shrink-0" />
                <p className="font-medium text-sm sm:text-base">Error: {error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Info and Download Section - Mobile Responsive */}
        {videoInfo && (
          <div className="max-w-6xl mx-auto px-4 sm:px-0">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 md:p-8">
                
                {/* Mobile Responsive Video Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="md:col-span-1">
                    <div className="relative">
                      <img
                        src={videoInfo.thumbnail}
                        alt={videoInfo.title}
                        className="w-full rounded-xl shadow-lg aspect-[9/16] object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs sm:text-sm">
                        {formatDuration(videoInfo.duration)}
                      </div>
                      <div className="absolute bottom-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        NO WATERMARK
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      {videoInfo.title}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">@{videoInfo.uploader}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{formatViewCount(videoInfo.view_count)} views</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300 col-span-2 sm:col-span-1">
                        <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{formatLikeCount(videoInfo.like_count)} likes</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{formatLikeCount(videoInfo.comment_count)} comments</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{formatDuration(videoInfo.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-emerald-300 col-span-2 sm:col-span-1">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold">Ready to download</span>
                      </div>
                    </div>
                    {videoInfo.description && (
                      <div className="bg-slate-700/30 rounded-lg p-2 sm:p-3">
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {videoInfo.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Download Options - Mobile Responsive */}
                <div className="space-y-4 sm:space-y-6">
                  {downloadMode === 'video' ? (
                    <div>
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <FileVideo className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white">Video Downloads</h3>
                        <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full text-xs font-semibold">
                          Watermark-Free
                        </span>
                      </div>
                      {videoInfo.formats?.video_formats && videoInfo.formats.video_formats.length > 0 ? (
                        <div className="grid gap-3 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                          {videoInfo.formats.video_formats.map((format, index) => {
                            const downloadKey = Object.keys(downloadProgress).find(key => 
                              key.startsWith(format.format_id)
                            );
                            const progress = downloadKey ? downloadProgress[downloadKey] : null;

                            return (
                              <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-pink-500/20">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <span className="text-white font-medium text-sm sm:text-base">
                                      {format.quality} ({format.ext.toUpperCase()})
                                    </span>
                                    <div className="text-xs text-pink-400 mt-1 flex items-center gap-1 flex-wrap">
                                      {format.has_audio ? '🎵 Video + Audio' : '📹 Video Only'}
                                      {format.watermark_free && (
                                        <span className="bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded text-xs">
                                          No Watermark
                                        </span>
                                      )}
                                    </div>
                                    {format.width && format.height && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {format.width} x {format.height} • {format.fps || 30}fps
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                    {formatFileSize(format.filesize)}
                                  </span>
                                </div>
                                
                                {progress && (
                                  <div className="mb-3">
                                    <ProgressBar progress={progress} />
                                    <div className="flex justify-between text-xs text-gray-400">
                                      <span>
                                        {progress.status.includes('retrying') ? 'Retrying...' : progress.status}
                                      </span>
                                      {progress.speed && <span>{progress.speed}</span>}
                                    </div>
                                    {progress.error && (
                                      <p className="text-red-400 text-xs mt-1">{progress.error}</p>
                                    )}
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => handleDownload(format)}
                                  disabled={!!progress && !['error', 'downloaded'].includes(progress.status)}
                                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-2 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                  {getButtonText(progress)}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 sm:py-8">
                          <p className="text-gray-400 text-base sm:text-lg">No video formats available for this TikTok.</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Music className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                        <h3 className="text-lg sm:text-xl font-semibold text-white">Audio Downloads (MP3)</h3>
                        <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                          Audio Only
                        </span>
                      </div>
                      {videoInfo.formats?.audio_formats && videoInfo.formats.audio_formats.length > 0 ? (
                        <div className="grid gap-3 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                          {videoInfo.formats.audio_formats.map((format, index) => {
                            const downloadKey = Object.keys(downloadProgress).find(key => 
                              key.startsWith(format.format_id)
                            );
                            const progress = downloadKey ? downloadProgress[downloadKey] : null;

                            return (
                              <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-purple-500/20">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1">
                                    <span className="text-white font-medium text-sm sm:text-base">
                                      {format.quality} (MP3)
                                    </span>
                                    <div className="text-xs text-purple-400 mt-1">
                                      🎵 {format.description || 'Audio Track'}
                                    </div>
                                    {format.abr && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        Bitrate: {format.abr}kbps
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                    {formatFileSize(format.filesize)}
                                  </span>
                                </div>
                                
                                {progress && (
                                  <div className="mb-3">
                                    <ProgressBar progress={progress} />
                                    <div className="flex justify-between text-xs text-gray-400">
                                      <span>
                                        {progress.status.includes('retrying') ? 'Retrying...' : progress.status}
                                      </span>
                                      {progress.speed && <span>{progress.speed}</span>}
                                    </div>
                                    {progress.error && (
                                      <p className="text-red-400 text-xs mt-1">{progress.error}</p>
                                    )}
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => handleDownload(format)}
                                  disabled={!!progress && !['error', 'downloaded'].includes(progress.status)}
                                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                  {getButtonText(progress)}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 sm:py-8">
                          <p className="text-gray-400 text-base sm:text-lg">No audio formats available for this TikTok.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Responsive Footer */}
        <div className="text-center mt-8 sm:mt-12 text-gray-400 px-4 sm:px-0">
          <p className="text-sm sm:text-base">© 2025 TikTok Downloader. Download videos without watermark in HD quality.</p>
          <p className="text-xs sm:text-sm mt-2">Supports all TikTok video formats • Fast downloads • No registration required</p>
        </div>
      </div>
    </div>
  );
}