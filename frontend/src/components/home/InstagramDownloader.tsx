'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiDownload, FiVideo, FiMusic, FiClock, FiEye, FiHeart, FiMessageCircle, FiCheck, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';

// Types
interface VideoFormat {
  quality: string;
  type: 'video' | 'audio';
  format_id: string;
  ext: string;
  filesize: number;
  width?: number;
  height?: number;
  fps?: number;
  abr?: number;
  has_audio?: boolean;
  watermark_free?: boolean;
  duration?: number;
}

interface VideoInfo {
  title: string;
  duration: number;
  view_count: number;
  like_count: number;
  comment_count: number;
  uploader: string;
  thumbnail: string;
  description: string;
  upload_date: string;
  formats: {
    video_formats: VideoFormat[];
    audio_formats: VideoFormat[];
  };
}

interface DownloadProgress {
  status: 'idle' | 'downloading' | 'processing' | 'completed' | 'error' | 'retrying';
  percent: number;
  speed?: string;
  eta?: string;
  error?: string;
}

type ProcessingStatus = 'idle' | 'validating' | 'connecting' | 'extracting' | 'analyzing' | 'finalizing' | 'complete';

import { getApiBaseUrl } from '@/utils/apiConfig';

const API_BASE_URL = getApiBaseUrl();

const InstagramDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: DownloadProgress }>({});
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [processingPercent, setProcessingPercent] = useState(0);
  const [downloadMode, setDownloadMode] = useState<'video' | 'audio'>('video');

  const inputRef = useRef<HTMLInputElement>(null);
  const pollingIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const videoInfoRef = useRef<HTMLDivElement>(null);

  // Cleanup polling intervals
  useEffect(() => {
    return () => {
      Object.values(pollingIntervals.current).forEach(clearInterval);
    };
  }, []);

  // Auto-scroll to video info section when processing is complete
  useEffect(() => {
    if (processingStatus === 'complete' && videoInfo && videoInfoRef.current) {
      // Immediate scroll when complete - no delay
      setTimeout(() => {
        videoInfoRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 100); // Minimal delay to ensure UI has rendered
    }
  }, [processingStatus, videoInfo]);

  // Simulate processing stages
  const simulateProcessingStages = () => {
    const stages: { status: ProcessingStatus; percent: number; duration: number }[] = [
      { status: 'validating', percent: 15, duration: 600 },
      { status: 'connecting', percent: 35, duration: 800 },
      { status: 'extracting', percent: 60, duration: 1000 },
      { status: 'analyzing', percent: 80, duration: 700 },
      { status: 'finalizing', percent: 95, duration: 500 },
      { status: 'complete', percent: 100, duration: 300 },
    ];

    let currentIndex = 0;

    const runStage = () => {
      if (currentIndex < stages.length) {
        const stage = stages[currentIndex];
        setProcessingStatus(stage.status);
        setProcessingPercent(stage.percent);

        setTimeout(() => {
          currentIndex++;
          runStage();
        }, stage.duration);
      }
    };

    runStage();
  };

  // Validate Instagram URL
  const validateInstagramURL = (url: string): boolean => {
    const instagramPatterns = [
      /^(https?:\/\/)?(www\.)?instagram\.com\/p\/[\w-]+/i,
      /^(https?:\/\/)?(www\.)?instagram\.com\/reel\/[\w-]+/i,
      /^(https?:\/\/)?(www\.)?instagram\.com\/reels\/[\w-]+/i,
      /^(https?:\/\/)?(www\.)?instagram\.com\/tv\/[\w-]+/i,
      /^(https?:\/\/)?(www\.)?instagr\.am\/p\/[\w-]+/i,
      /^(https?:\/\/)?(www\.)?instagr\.am\/reel\/[\w-]+/i,
    ];

    return instagramPatterns.some(pattern => pattern.test(url.trim()));
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError('');
    setVideoInfo(null);
    setDownloadProgress({});

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('Please enter an Instagram URL');
      return;
    }

    // Removed frontend validation - let backend handle it
    // if (!validateInstagramURL(trimmedUrl)) {
    //   setError('Please enter a valid Instagram Reel, Post, or IGTV URL');
    //   return;
    // }

    try {
      // Show loading state immediately
      setProcessingStatus('extracting');
      setProcessingPercent(50);

      const response = await fetch(`${API_BASE_URL}/video-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video information');
      }

      // Immediately show results when API returns
      setVideoInfo(data);
      setProcessingStatus('complete');
      setProcessingPercent(100);
    } catch (err: any) {
      console.error('Error fetching video info:', err);
      setError(err.message || 'An error occurred while fetching video information');
      setProcessingStatus('idle');
      setProcessingPercent(0);
    }
  };

  // Handle download
  const handleDownload = async (format: VideoFormat) => {
    const downloadKey = `${format.format_id}_${format.type}_${Date.now()}`;

    try {
      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: {
          status: 'downloading',
          percent: 0,
        },
      }));

      // Initiate download
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
          platform: 'instagram',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initiate download');
      }

      const downloadId = data.download_id;

      // Poll for progress
      const pollProgress = async () => {
        try {
          const progressResponse = await fetch(`${API_BASE_URL}/progress/${downloadId}`);
          const progressData = await progressResponse.json();

          setDownloadProgress(prev => ({
            ...prev,
            [downloadKey]: {
              status: progressData.status === 'completed' ? 'completed' :
                progressData.status === 'error' ? 'error' :
                  progressData.status === 'retrying' ? 'retrying' :
                    progressData.status === 'processing' ? 'processing' : 'downloading',
              percent: progressData.percent || 0,
              speed: progressData.speed,
              eta: progressData.eta,
              error: progressData.error,
            },
          }));

          if (progressData.status === 'completed') {
            // Clear polling interval
            if (pollingIntervals.current[downloadKey]) {
              clearInterval(pollingIntervals.current[downloadKey]);
              delete pollingIntervals.current[downloadKey];
            }

            // Trigger file download
            const downloadUrl = `${API_BASE_URL}/download-direct/${downloadId}`;
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `instagram_${format.type}_${format.quality}.${format.ext}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clear progress after delay
            setTimeout(() => {
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[downloadKey];
                return newProgress;
              });
            }, 8000);
          } else if (progressData.status === 'error') {
            // Clear polling interval on error
            if (pollingIntervals.current[downloadKey]) {
              clearInterval(pollingIntervals.current[downloadKey]);
              delete pollingIntervals.current[downloadKey];
            }
          }
        } catch (err) {
          console.error('Error polling progress:', err);
        }
      };

      // Start polling
      const intervalId = setInterval(pollProgress, 1500);
      pollingIntervals.current[downloadKey] = intervalId;
      pollProgress(); // Initial poll
    } catch (err: any) {
      console.error('Error downloading:', err);
      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: {
          status: 'error',
          percent: 0,
          error: err.message || 'Download failed',
        },
      }));
    }
  };

  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return 'N/A';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(2)} MB` : `${(bytes / 1024).toFixed(2)} KB`;
  };

  // Format duration
  const formatDuration = (seconds: number): string => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format count (views, likes, etc.)
  const formatCount = (count: number): string => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Get processing stage message
  const getProcessingMessage = (): string => {
    switch (processingStatus) {
      case 'validating': return 'Validating Instagram URL...';
      case 'connecting': return 'Connecting to Instagram servers...';
      case 'extracting': return 'Extracting video information...';
      case 'analyzing': return 'Analyzing available formats...';
      case 'finalizing': return 'Finalizing details...';
      case 'complete': return 'Ready to download!';
      default: return '';
    }
  };

  // Get download progress key for a format
  const getProgressKey = (format: VideoFormat): string | undefined => {
    return Object.keys(downloadProgress).find(key =>
      key.startsWith(format.format_id) && key.includes(format.type)
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-4 rounded-2xl shadow-lg">
            <FaInstagram className="text-4xl sm:text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          Instagram Reels Downloader
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Download Instagram Reels, Posts, and IGTV videos in high quality - Fast, free, and no watermark
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700/50 mb-8 relative z-10">
        <form onSubmit={handleSubmit} className="space-y-4 relative z-20">
          {/* Mobile Layout */}
          <div className="block sm:hidden space-y-3 relative z-30">
            <div className="relative z-40">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => {
                  console.log('Input changed:', e.target.value);
                  setUrl(e.target.value);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  console.log('Pasted:', pastedText);
                  setUrl(pastedText);
                }}
                onFocus={() => console.log('Input focused')}
                onClick={() => console.log('Input clicked')}
                placeholder="Paste Instagram Reel or Post URL here..."
                className="w-full px-4 py-3 bg-slate-900/80 border border-teal-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-sm cursor-text relative z-50"
                style={{ pointerEvents: 'auto', userSelect: 'text' }}
                autoComplete="off"
                spellCheck="false"
                readOnly={false}
              />
            </div>
            <button
              type="button"
              onClick={handlePaste}
              className="w-full px-4 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
            >
              Paste from Clipboard
            </button>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2"
            >
              {processingStatus !== 'idle' && processingStatus !== 'complete' ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FiDownload />
                  Get Video
                </>
              )}
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center gap-3 relative z-30">
            <div className="relative flex-1 z-40">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  console.log('Desktop input changed:', e.target.value);
                  setUrl(e.target.value);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  console.log('Desktop pasted:', pastedText);
                  setUrl(pastedText);
                }}
                onFocus={() => console.log('Desktop input focused')}
                onClick={() => console.log('Desktop input clicked')}
                placeholder="Paste Instagram Reel or Post URL here..."
                className="w-full px-5 py-4 bg-slate-900/80 border border-teal-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all cursor-text relative z-50"
                style={{ pointerEvents: 'auto', userSelect: 'text' }}
                autoComplete="off"
                spellCheck="false"
                readOnly={false}
              />
            </div>
            <button
              type="button"
              onClick={handlePaste}
              className="px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Paste
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap"
            >
              {processingStatus !== 'idle' && processingStatus !== 'complete' ? (
                <>
                  <FiRefreshCw className="animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <FiDownload />
                  Get Video
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
            <FiAlertCircle className="text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Processing Status */}
        {processingStatus !== 'idle' && processingStatus !== 'complete' && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-teal-400 font-medium text-sm">{getProcessingMessage()}</span>
              <span className="text-teal-400 font-bold text-sm">{processingPercent}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${processingPercent}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Info & Download Options */}
      {videoInfo && (
        <div className="space-y-6">
          {/* Download Mode Selector */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setDownloadMode('video')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${downloadMode === 'video'
                  ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800/80 text-gray-400 hover:text-white border border-slate-700/50'
                }`}
            >
              <FiVideo />
              Video Formats
            </button>
            <button
              onClick={() => setDownloadMode('audio')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${downloadMode === 'audio'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-slate-800/80 text-gray-400 hover:text-white border border-slate-700/50'
                }`}
            >
              <FiMusic />
              Audio Formats
            </button>
          </div>

          {/* Video Information */}
          <div ref={videoInfoRef} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Thumbnail */}
              <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
                {videoInfo.thumbnail && (
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      // Hide broken image and show gradient background with icon
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                {/* Fallback Instagram icon when thumbnail fails */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaInstagram className="text-white text-6xl opacity-50" />
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <FiClock className="text-teal-400 text-sm" />
                  <span className="text-white text-sm font-medium">{formatDuration(videoInfo.duration)}</span>
                </div>
                <div className="absolute bottom-3 left-3 bg-gradient-to-r from-teal-500 to-blue-600 px-3 py-1.5 rounded-lg">
                  <span className="text-white text-xs font-bold">HIGH QUALITY</span>
                </div>
              </div>

              {/* Video Details */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white line-clamp-2">{videoInfo.title}</h2>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaInstagram className="text-teal-400" />
                  <span className="font-medium">{videoInfo.uploader}</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-teal-500/20">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiEye className="text-teal-400" />
                      <span className="text-xs">Views</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {videoInfo.view_count === 0 ? 'N/A' : formatCount(videoInfo.view_count)}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-blue-500/20">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiHeart className="text-blue-400" />
                      <span className="text-xs">Likes</span>
                    </div>
                    <p className="text-lg font-bold text-white">{formatCount(videoInfo.like_count)}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 border border-cyan-500/20">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiMessageCircle className="text-cyan-400" />
                      <span className="text-xs">Comments</span>
                    </div>
                    <p className="text-lg font-bold text-white">{formatCount(videoInfo.comment_count)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Formats */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              {downloadMode === 'video' ? <FiVideo className="text-teal-400" /> : <FiMusic className="text-blue-400" />}
              Available {downloadMode === 'video' ? 'Video' : 'Audio'} Formats
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(downloadMode === 'video' ? videoInfo.formats.video_formats : videoInfo.formats.audio_formats).map((format, index) => {
                const progressKey = getProgressKey(format);
                const progress = progressKey ? downloadProgress[progressKey] : null;

                return (
                  <div
                    key={`${format.format_id}_${index}`}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-5 hover:border-teal-500/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        {format.quality}
                      </span>
                      {format.watermark_free && (
                        <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-lg font-medium border border-teal-500/30">
                          NO WATERMARK
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      {format.width && format.height && (
                        <div className="flex justify-between text-gray-400">
                          <span>Resolution:</span>
                          <span className="text-white font-medium">{format.width}x{format.height}</span>
                        </div>
                      )}
                      {format.fps && (
                        <div className="flex justify-between text-gray-400">
                          <span>FPS:</span>
                          <span className="text-white font-medium">{format.fps}</span>
                        </div>
                      )}
                      {format.abr && (
                        <div className="flex justify-between text-gray-400">
                          <span>Bitrate:</span>
                          <span className="text-white font-medium">{format.abr}kbps</span>
                        </div>
                      )}
                      <div className="flex justify-between text-gray-400">
                        <span>Size:</span>
                        <span className="text-white font-medium">{formatFileSize(format.filesize)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Format:</span>
                        <span className="text-white font-medium uppercase">{format.ext}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {progress && progress.status !== 'idle' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-medium ${progress.status === 'error' ? 'text-red-400' :
                              progress.status === 'completed' ? 'text-green-400' :
                                progress.status === 'retrying' ? 'text-amber-400' :
                                  'text-teal-400'
                            }`}>
                            {progress.status === 'error' ? 'Failed' :
                              progress.status === 'completed' ? 'Completed' :
                                progress.status === 'retrying' ? 'Retrying...' :
                                  progress.status === 'processing' ? 'Processing...' :
                                    'Downloading...'}
                          </span>
                          <span className={`text-xs font-bold ${progress.status === 'error' ? 'text-red-400' :
                              progress.status === 'completed' ? 'text-green-400' :
                                'text-teal-400'
                            }`}>
                            {progress.percent}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${progress.status === 'error' ? 'bg-red-500' :
                                progress.status === 'completed' ? 'bg-green-500' :
                                  progress.status === 'retrying' ? 'bg-amber-500 animate-pulse' :
                                    'bg-gradient-to-r from-teal-500 to-blue-600'
                              }`}
                            style={{ width: `${progress.percent}%` }}
                          ></div>
                        </div>
                        {progress.error && (
                          <p className="text-xs text-red-400 mt-2">{progress.error}</p>
                        )}
                      </div>
                    )}

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(format)}
                      disabled={progress?.status === 'downloading' || progress?.status === 'processing'}
                      className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group-hover:scale-105"
                    >
                      {progress?.status === 'completed' ? (
                        <>
                          <FiCheck />
                          Downloaded
                        </>
                      ) : progress?.status === 'downloading' || progress?.status === 'processing' ? (
                        <>
                          <FiRefreshCw className="animate-spin" />
                          Downloading
                        </>
                      ) : (
                        <>
                          <FiDownload />
                          Download {format.type === 'video' ? 'Video' : 'Audio'}
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* No formats message */}
            {downloadMode === 'video' && videoInfo.formats.video_formats.length === 0 && (
              <p className="text-center text-gray-400 py-8">No video formats available</p>
            )}
            {downloadMode === 'audio' && videoInfo.formats.audio_formats.length === 0 && (
              <p className="text-center text-gray-400 py-8">No audio formats available</p>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      {!videoInfo && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-teal-500/20 hover:border-teal-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <FiDownload className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High Quality</h3>
            <p className="text-gray-400 text-sm">Download Instagram Reels in the best available quality without any watermarks</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
              <FiVideo className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multiple Formats</h3>
            <p className="text-gray-400 text-sm">Choose from various video qualities and audio formats to suit your needs</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <FiCheck className="text-2xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fast & Free</h3>
            <p className="text-gray-400 text-sm">Quick downloads with no registration required - completely free to use</p>
          </div>
        </div>
      )}

      {/* Shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default InstagramDownloader;
