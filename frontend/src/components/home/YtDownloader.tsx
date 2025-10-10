'use client';

import React, { useState } from 'react';
import { Search, Download, Play, Clock, Eye, User, FileVideo, Music, Loader, CheckCircle, AlertTriangle, Star, Clipboard } from 'lucide-react';

interface VideoFormat {
  quality: string;
  type: 'video' | 'audio';
  format_id: string;
  ext: string;
  filesize: number;
  fps?: number;
  vcodec?: string;
  acodec?: string;
  has_audio?: boolean;
  has_builtin_audio?: boolean;
  combined_with_audio?: boolean;
  protocol?: string;
  duration?: number;
  platform?: string;
  abr?: number;
  description?: string;
}

interface VideoInfo {
  title: string;
  duration: number;
  view_count: number;
  uploader: string;
  thumbnail: string;
  description: string;
  upload_date: string;
  platform: string;
  formats: {
    video_with_audio: VideoFormat[];
    video_only: VideoFormat[];
    audio_only: VideoFormat[];
  };
}

interface DownloadProgress {
  status: string;
  percent: number;
  speed?: string;
  eta?: string;
  error?: string;
  filename?: string;
  platform?: string;
}

interface ProcessingStatus {
  stage: string;
  message: string;
  percent: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

export default function YouTubeDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: DownloadProgress}>({});
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [downloadMode, setDownloadMode] = useState<'video' | 'audio'>('video');
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const validateYouTubeURL = (url: string): boolean => {
    const youtubePatterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=[\w-]+/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/[\w-]+/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/[\w-]+/,
      /(?:https?:\/\/)?(?:m\.)?youtube\.com\/watch\?v=[\w-]+/,
    ];
    
    return youtubePatterns.some(pattern => pattern.test(url.toLowerCase()));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && validateYouTubeURL(text)) {
        setUrl(text);
        setError('');
      } else if (text) {
        setUrl(text);
        setError('Please paste a valid YouTube URL');
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
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

  const isLongVideo = (duration: number): boolean => {
    return duration > 3600;
  };

  const isVeryLongVideo = (duration: number): boolean => {
    return duration > 7200;
  };

  const simulateProcessingStages = () => {
    const stages = [
      { stage: 'validating', message: 'Validating YouTube URL...', percent: 10 },
      { stage: 'connecting', message: 'Connecting to YouTube servers...', percent: 25 },
      { stage: 'extracting', message: 'Extracting video information...', percent: 50 },
      { stage: 'analyzing', message: 'Analyzing available formats...', percent: 75 },
      { stage: 'finalizing', message: 'Finalizing format options...', percent: 90 },
      { stage: 'complete', message: 'Processing complete!', percent: 100 }
    ];

    let currentStage = 0;
    
    const updateStage = () => {
      if (currentStage < stages.length) {
        setProcessingStatus(stages[currentStage]);
        currentStage++;
        
        if (currentStage < stages.length) {
          const delay = currentStage === 1 ? 800 : currentStage === 2 ? 1200 : 600;
          setTimeout(updateStage, delay);
        }
      }
    };

    updateStage();
  };

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!validateYouTubeURL(url.trim())) {
      setError('Please provide a valid YouTube URL');
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
    }, 200);

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
      setProcessingStatus({ stage: 'complete', message: 'Video ready for download!', percent: 100 });
      
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
          platform: 'youtube',
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
                link.style.display = 'none';
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
                  window.location.href = `${API_BASE_URL}/download-direct/${downloadId}`;
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
            
            const duration = videoInfo?.duration || 0;
            const cleanupTime = duration > 3600 ? 20000 : 10000;
            setTimeout(() => {
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[downloadKey];
                return newProgress;
              });
            }, cleanupTime);
          } else if (progressData.status === 'downloading' || progressData.status === 'processing' || progressData.status === 'finalizing' || progressData.status.includes('retrying')) {
            const duration = videoInfo?.duration || 0;
            const pollInterval = duration > 3600 ? 3000 : 1500;
            setTimeout(pollProgress, pollInterval);
          } else if (progressData.status === 'error') {
            setTimeout(() => {
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[downloadKey];
                return newProgress;
              });
            }, 10000);
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
          progress.status.includes('retrying') ? 'bg-amber-500' : 'bg-cyan-500'
        }`}
        style={{ width: `${progress.percent}%` }}
      />
    </div>
  );

  const ProcessingIndicator = ({ status }: { status: ProcessingStatus }) => (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-8 px-4">
      <div className="bg-slate-800/80 border border-cyan-400/30 rounded-xl p-4 sm:p-6 text-center backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {status.stage === 'complete' ? (
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          ) : (
            <Loader className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 animate-spin" />
          )}
          <span className="text-sm sm:text-lg font-medium text-white">{status.message}</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mb-2">
          <div
            className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
              status.stage === 'complete' ? 'bg-emerald-500' : 'bg-cyan-500'
            }`}
            style={{ width: `${status.percent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm text-gray-300">
          <span>Processing video information...</span>
          <span>{status.percent}%</span>
        </div>
      </div>
    </div>
  );

  const LongVideoWarning = ({ duration }: { duration: number }) => {
    if (!isLongVideo(duration)) return null;
    
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const isVeryLong = isVeryLongVideo(duration);
    
    return (
      <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
        <div className={`${isVeryLong ? 'bg-amber-500/20 border-amber-400/30' : 'bg-yellow-500/20 border-yellow-400/30'} border rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm`}>
          <AlertTriangle className={`h-5 w-5 ${isVeryLong ? 'text-amber-400' : 'text-yellow-400'} flex-shrink-0 mt-0.5`} />
          <div className={isVeryLong ? 'text-amber-200' : 'text-yellow-200'}>
            <p className="font-medium text-sm sm:text-base">
              {isVeryLong ? 'Very Long Video Detected' : 'Long Video Detected'} ({hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`})
            </p>
            <p className="text-xs sm:text-sm mt-1">
              {isVeryLong ? 
                'Videos over 2 hours may take 20+ minutes to download. All quality options are available.' :
                'Downloads will use enhanced settings for better reliability. All quality options are available.'
              }
            </p>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
      <div className="relative z-10">
        
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Title Section - Mobile above input, Desktop centered */}
          <div className="text-center mb-6 sm:mb-12">
            {/* Mobile Title - Shows above input */}
            <div className="sm:hidden mb-6">
              <h1 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Free Video Downloader
              </h1>
              <p className="text-sm text-gray-300">
                Download YouTube videos & audio easily
              </p>
            </div>
            
            {/* Desktop Title - Unique and prominent */}
            <div className="hidden sm:block">
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Ultimate YouTube Downloader Pro
              </h1>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Download YouTube videos up to 2+ hours with premium quality options - Video & Audio formats available
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-8 px-4 sm:px-0">
            <div className="space-y-4">
              {/* Desktop - Input with inline Search Button */}
              <div className="hidden sm:block relative">
                <div className="flex rounded-2xl overflow-hidden shadow-2xl bg-slate-800/80 backdrop-blur-lg border border-slate-700/50">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste YouTube URL here..."
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
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <Search className="h-5 w-5" />
                    )}
                    {loading ? 'Processing...' : 'Search'}
                  </button>
                </div>
              </div>

              {/* Mobile - Input with Paste Button + Search Button Below */}
              <div className="sm:hidden space-y-4">
                {/* Input with Paste Button - Mobile Only */}
                <div className="relative">
                  <div className="flex rounded-2xl overflow-hidden shadow-2xl bg-slate-800/80 backdrop-blur-lg border border-slate-700/50">
                    <button
                      onClick={handlePaste}
                      className="px-4 py-4 bg-slate-700/50 hover:bg-slate-600/50 border-r border-slate-600/50 transition-all duration-300 group"
                      title="Paste from clipboard"
                    >
                      <Clipboard className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                    </button>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste YouTube URL here..."
                      className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-400 text-base focus:outline-none"
                      disabled={loading}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && url.trim()) {
                          handleSubmit(e);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Search Button - Mobile Below Input */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !url.trim()}
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 rounded-2xl hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-2xl"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                  {loading ? 'Processing...' : 'Search Video'}
                </button>
              </div>
            </div>
          </div>

          {processingStatus && <ProcessingIndicator status={processingStatus} />}
          {videoInfo && <LongVideoWarning duration={videoInfo.duration} />}

          {/* Mode Selector */}
          {videoInfo && (
            <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
              <div className="flex justify-center">
                <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-2 flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setDownloadMode('video')}
                    className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      downloadMode === 'video'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <FileVideo className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Video Downloads</span>
                    <span className="sm:hidden">Video</span>
                  </button>
                  <button
                    onClick={() => setDownloadMode('audio')}
                    className={`flex-1 sm:flex-initial px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      downloadMode === 'audio'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Music className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Audio Downloads (MP3)</span>
                    <span className="sm:hidden">Audio</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="w-full max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-200 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="font-medium text-sm sm:text-base">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Video Info and Downloads */}
          {videoInfo && (
            <div className="w-full max-w-6xl mx-auto px-4">
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Video Header */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="lg:col-span-1">
                      <img
                        src={videoInfo.thumbnail}
                        alt={videoInfo.title}
                        className="w-full rounded-xl shadow-lg"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 line-clamp-2">
                        {videoInfo.title}
                      </h2>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-gray-300">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm truncate">{videoInfo.uploader}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{formatDuration(videoInfo.duration)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{formatViewCount(videoInfo.view_count)} views</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Play className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">Ready to download</span>
                        </div>
                      </div>
                      {videoInfo.description && (
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                          {videoInfo.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Download Formats */}
                  <div className="space-y-6">
                    {downloadMode === 'video' ? (
                      <>
                        {videoInfo.formats?.video_with_audio && videoInfo.formats.video_with_audio.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <FileVideo className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                              <h3 className="text-lg sm:text-xl font-semibold text-white">Video with Audio (Recommended)</h3>
                              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full text-xs">
                                Complete Video
                              </span>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {videoInfo.formats.video_with_audio.map((format, index) => {
                                const downloadKey = Object.keys(downloadProgress).find(key =>
                                  key.startsWith(format.format_id)
                                );
                                const progress = downloadKey ? downloadProgress[downloadKey] : null;

                                return (
                                  <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-emerald-500/20">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex-1 min-w-0">
                                        <span className="text-white font-medium text-sm sm:text-base">
                                          {format.quality} ({format.ext.toUpperCase()})
                                        </span>
                                        <div className="text-xs text-emerald-400 mt-1 flex flex-wrap items-center gap-1">
                                          <span>✓ Video + Audio</span>
                                          {format.combined_with_audio && (
                                            <span className="bg-cyan-500/20 text-cyan-300 px-1 py-0.5 rounded text-xs">
                                              Auto-Combined
                                            </span>
                                          )}
                                          {format.has_builtin_audio && (
                                            <span className="bg-emerald-500/20 text-emerald-300 px-1 py-0.5 rounded text-xs">
                                              Built-in Audio
                                            </span>
                                          )}
                                          {isLongVideo(videoInfo.duration) && (
                                            <span className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded text-xs">
                                              Enhanced
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                        {formatFileSize(format.filesize)}
                                      </span>
                                    </div>

                                    {progress && (
                                      <div className="mb-3">
                                        <ProgressBar progress={progress} />
                                        <div className="flex justify-between text-xs text-gray-400">
                                          <span className="truncate">
                                            {progress.status.includes('retrying') ? 'Retrying...' : progress.status}
                                          </span>
                                          <div className="flex gap-2 flex-shrink-0">
                                            {progress.speed && <span>{progress.speed}</span>}
                                            {progress.eta && progress.eta !== 'N/A' && <span>ETA: {progress.eta}</span>}
                                          </div>
                                        </div>
                                        {progress.error && (
                                          <p className="text-red-400 text-xs mt-1 line-clamp-2">{progress.error}</p>
                                        )}
                                      </div>
                                    )}

                                    <button
                                      onClick={() => handleDownload(format)}
                                      disabled={!!progress && !['error', 'downloaded'].includes(progress.status)}
                                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                      <span className="truncate">{getButtonText(progress)}</span>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {videoInfo.formats?.video_only && videoInfo.formats.video_only.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <FileVideo className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
                              <h3 className="text-lg sm:text-xl font-semibold text-white">High Quality Video (Audio Combined)</h3>
                              <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full text-xs">
                                HD & 4K Quality
                              </span>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                              {videoInfo.formats.video_only.map((format, index) => {
                                const downloadKey = Object.keys(downloadProgress).find(key =>
                                  key.startsWith(format.format_id)
                                );
                                const progress = downloadKey ? downloadProgress[downloadKey] : null;

                                return (
                                  <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-cyan-500/20">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex-1 min-w-0">
                                        <span className="text-white font-medium text-sm sm:text-base">
                                          {format.quality} ({format.ext.toUpperCase()})
                                        </span>
                                        <div className="text-xs text-cyan-400 mt-1 flex flex-wrap items-center gap-1">
                                          <span>✓ Premium Quality</span>
                                          <span className="bg-cyan-500/20 text-cyan-300 px-1 py-0.5 rounded text-xs">
                                            Auto-Combined with Audio
                                          </span>
                                          {isLongVideo(videoInfo.duration) && (
                                            <span className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded text-xs">
                                              Enhanced
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                        {formatFileSize(format.filesize)}
                                      </span>
                                    </div>

                                    {progress && (
                                      <div className="mb-3">
                                        <ProgressBar progress={progress} />
                                        <div className="flex justify-between text-xs text-gray-400">
                                          <span className="truncate">
                                            {progress.status.includes('retrying') ? 'Retrying...' : progress.status}
                                          </span>
                                          <div className="flex gap-2 flex-shrink-0">
                                            {progress.speed && <span>{progress.speed}</span>}
                                            {progress.eta && progress.eta !== 'N/A' && <span>ETA: {progress.eta}</span>}
                                          </div>
                                        </div>
                                        {progress.error && (
                                          <p className="text-red-400 text-xs mt-1 line-clamp-2">{progress.error}</p>
                                        )}
                                      </div>
                                    )}

                                    <button
                                      onClick={() => handleDownload(format)}
                                      disabled={!!progress && !['error', 'downloaded'].includes(progress.status)}
                                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                    >
                                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                      <span className="truncate">{getButtonText(progress)}</span>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Music className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
                          <h3 className="text-lg sm:text-xl font-semibold text-white">Audio Downloads (MP3 & Original Formats)</h3>
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                            Audio Only
                          </span>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          {videoInfo.formats.audio_only.map((format, index) => {
                            const downloadKey = Object.keys(downloadProgress).find(key => 
                              key.startsWith(format.format_id)
                            );
                            const progress = downloadKey ? downloadProgress[downloadKey] : null;

                            return (
                              <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-purple-500/20">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex-1 min-w-0">
                                    <span className="text-white font-medium text-sm sm:text-base">
                                      {format.quality} ({format.ext.toUpperCase()})
                                    </span>
                                    <div className="text-xs text-purple-400 mt-1 flex flex-wrap items-center gap-1">
                                      <span>♪ {format.description || 'Audio Track'}</span>
                                      {isLongVideo(videoInfo.duration) && (
                                        <span className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded text-xs">
                                          Enhanced
                                        </span>
                                      )}
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
                                      <span className="truncate">
                                        {progress.status.includes('retrying') ? 'Retrying...' : progress.status}
                                      </span>
                                      <div className="flex gap-2 flex-shrink-0">
                                        {progress.speed && <span>{progress.speed}</span>}
                                      </div>
                                    </div>
                                    {progress.error && (
                                      <p className="text-red-400 text-xs mt-1 line-clamp-2">{progress.error}</p>
                                    )}
                                  </div>
                                )}
                                
                                <button
                                  onClick={() => handleDownload(format)}
                                  disabled={!!progress && !['error', 'downloaded'].includes(progress.status)}
                                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span className="truncate">{getButtonText(progress)}</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* No Formats Available Message */}
                    {((downloadMode === 'video' && !videoInfo.formats?.video_with_audio?.length && !videoInfo.formats?.video_only?.length) ||
                      (downloadMode === 'audio' && !videoInfo.formats?.audio_only?.length)) && (
                      <div className="text-center py-8">
                        <p className="text-gray-400 text-base sm:text-lg">
                          No {downloadMode} formats available for this video.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 sm:mt-12 text-gray-400 px-4">
            <p className="text-xs sm:text-sm">
              © 2025 Enhanced YouTube Downloader. Now supports videos up to 2+ hours with all qualities available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}