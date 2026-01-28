'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiDownload, FiVideo, FiMusic, FiClock, FiEye, FiHeart, FiMessageCircle, FiCheck, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';

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

const ShortsDownloader: React.FC = () => {
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
      setTimeout(() => {
        videoInfoRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 300);
    }
  }, [processingStatus, videoInfo]);

  // Simulate processing stages
  const simulateProcessingStages = () => {
    const stages: { status: ProcessingStatus; percent: number; duration: number }[] = [
      { status: 'validating', percent: 15, duration: 1500 },
      { status: 'connecting', percent: 35, duration: 2000 },
      { status: 'extracting', percent: 60, duration: 2500 },
      { status: 'analyzing', percent: 80, duration: 2000 },
      { status: 'finalizing', percent: 95, duration: 1500 },
      { status: 'complete', percent: 100, duration: 500 },
    ];

    let currentIndex = 0;

    const runStage = () => {
      if (currentIndex < stages.length) {
        const stage = stages[currentIndex];
        setProcessingStatus(stage.status);
        setProcessingPercent(stage.percent);
        currentIndex++;
        setTimeout(runStage, stage.duration);
      }
    };

    runStage();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideoInfo(null);
    setProcessingStatus('validating');
    setProcessingPercent(0);

    if (!url.trim()) {
      setError('Please enter a YouTube Shorts URL');
      setProcessingStatus('idle');
      return;
    }

    simulateProcessingStages();

    try {
      const response = await fetch(`${API_BASE_URL}/video-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video information');
      }

      setVideoInfo(data);
      setProcessingStatus('complete');
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching video information');
      setProcessingStatus('idle');
      console.error('Error fetching video info:', err);
    }
  };

  const handleDownload = async (format: VideoFormat) => {
    const downloadKey = `${format.format_id}_${Date.now()}`;

    try {
      // For YouTube Shorts audio, use best video format and convert to audio
      let formatId = format.format_id;
      let downloadType = format.type;

      if (format.type === 'audio' && videoInfo?.formats?.video_formats && videoInfo.formats.video_formats.length > 0) {
        formatId = videoInfo.formats.video_formats[0].format_id;
        downloadType = 'audio';
      }

      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: { status: 'downloading', percent: 0 }
      }));

      const response = await fetch(`${API_BASE_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          format_id: formatId,
          type: downloadType,
          ext: format.ext,
          duration: videoInfo?.duration || 0,
          platform: 'shorts',
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

          // Check if download is ready (100% or completed status)
          if (progressData.status === 'completed' || progressData.percent >= 100) {
            setDownloadProgress(prev => ({
              ...prev,
              [downloadKey]: {
                status: 'completed',
                percent: 100,
              },
            }));

            if (pollingIntervals.current[downloadKey]) {
              clearInterval(pollingIntervals.current[downloadKey]);
              delete pollingIntervals.current[downloadKey];
            }

            // Immediate download trigger
            const downloadResponse = await fetch(`${API_BASE_URL}/download-direct/${downloadId}`);

            if (!downloadResponse.ok) {
              throw new Error('Download failed');
            }

            const blob = await downloadResponse.blob();

            // Create download link and trigger immediately
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = progressData.filename || `shorts_video.${format.ext}`;
            a.style.display = 'none';
            document.body.appendChild(a);

            // Trigger download immediately
            setTimeout(() => {
              a.click();

              // Cleanup after short delay
              setTimeout(() => {
                window.URL.revokeObjectURL(downloadUrl);
                document.body.removeChild(a);
              }, 100);
            }, 0);

            setTimeout(() => {
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[downloadKey];
                return newProgress;
              });
            }, 3000);
          } else if (progressData.status === 'error') {
            if (pollingIntervals.current[downloadKey]) {
              clearInterval(pollingIntervals.current[downloadKey]);
              delete pollingIntervals.current[downloadKey];
            }
            setDownloadProgress(prev => ({
              ...prev,
              [downloadKey]: {
                status: 'error',
                percent: 0,
                error: progressData.error || 'Download failed',
              },
            }));
          } else {
            setDownloadProgress(prev => ({
              ...prev,
              [downloadKey]: {
                status: progressData.status || 'downloading',
                percent: progressData.percent || 0,
              },
            }));
          }
        } catch (err) {
          console.error('Error polling progress:', err);
        }
      };

      // Poll every 500ms for faster response
      const intervalId = setInterval(pollProgress, 500);
      pollingIntervals.current[downloadKey] = intervalId;
      pollProgress();
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
      case 'validating': return 'Validating YouTube Shorts URL...';
      case 'connecting': return 'Connecting to YouTube servers...';
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
      key.startsWith(format.format_id)
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-red-500 to-pink-600 p-4 rounded-2xl shadow-lg">
            <FaYoutube className="text-4xl sm:text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
          YouTube Shorts Downloader
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Download YouTube Shorts videos in high quality - Fast, free, and no watermark
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
                  setUrl(e.target.value);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  setUrl(pastedText);
                }}
                placeholder="Paste YouTube Shorts URL here..."
                className="w-full px-4 py-3 bg-slate-900/80 border border-red-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm cursor-text relative z-50"
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
              className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2"
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
                  setUrl(e.target.value);
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  setUrl(pastedText);
                }}
                placeholder="Paste YouTube Shorts URL here..."
                className="w-full px-5 py-4 bg-slate-900/80 border border-red-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all cursor-text relative z-50"
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
              className="px-6 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap flex items-center gap-2"
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

        {/* Processing Status */}
        {processingStatus !== 'idle' && processingStatus !== 'complete' && (
          <div className="mt-6 bg-slate-900/60 rounded-xl p-4 border border-red-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">{getProcessingMessage()}</span>
              <span className="text-sm font-semibold text-red-400">{processingPercent}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${processingPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <FiAlertCircle className="text-red-400 flex-shrink-0 mt-0.5 text-xl" />
            <div className="flex-1">
              <h3 className="text-red-400 font-semibold mb-1">Error</h3>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Information */}
      {videoInfo && (
        <div ref={videoInfoRef} className="space-y-6">
          {/* Video Preview */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
            <div className="grid md:grid-cols-5 gap-4 sm:gap-6 p-4 sm:p-6">
              {/* Thumbnail */}
              <div className="md:col-span-2">
                <div className="relative rounded-xl overflow-hidden group">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/80 px-2 py-1 rounded text-xs text-white font-medium">
                    {formatDuration(videoInfo.duration)}
                  </div>
                </div>
              </div>

              {/* Video Details */}
              <div className="md:col-span-3 space-y-3 sm:space-y-4">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
                    {videoInfo.title}
                  </h2>
                  <p className="text-red-400 font-medium text-sm sm:text-base">{videoInfo.uploader}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  <div className="bg-slate-900/60 rounded-lg p-2 sm:p-3 border border-slate-700/30">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs mb-1">
                      <FiEye className="text-xs sm:text-sm" />
                      <span>Views</span>
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{formatCount(videoInfo.view_count)}</div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-2 sm:p-3 border border-slate-700/30">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs mb-1">
                      <FiHeart className="text-xs sm:text-sm" />
                      <span>Likes</span>
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{formatCount(videoInfo.like_count)}</div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-2 sm:p-3 border border-slate-700/30">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs mb-1">
                      <FiMessageCircle className="text-xs sm:text-sm" />
                      <span>Comments</span>
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{formatCount(videoInfo.comment_count)}</div>
                  </div>
                  <div className="bg-slate-900/60 rounded-lg p-2 sm:p-3 border border-slate-700/30">
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs mb-1">
                      <FiClock className="text-xs sm:text-sm" />
                      <span>Duration</span>
                    </div>
                    <div className="text-white font-bold text-sm sm:text-base">{formatDuration(videoInfo.duration)}</div>
                  </div>
                </div>

                {/* Description Preview */}
                {videoInfo.description && (
                  <div className="bg-slate-900/40 rounded-lg p-3 border border-slate-700/20">
                    <p className="text-gray-300 text-xs sm:text-sm line-clamp-3">{videoInfo.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Download Mode Toggle */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 border border-slate-700/50">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={() => setDownloadMode('video')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${downloadMode === 'video'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                  }`}
              >
                <FiVideo className="text-sm sm:text-base" />
                Video
              </button>
              <button
                onClick={() => setDownloadMode('audio')}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${downloadMode === 'audio'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                  }`}
              >
                <FiMusic className="text-sm sm:text-base" />
                Audio
              </button>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              {downloadMode === 'video' && (
                <>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FiVideo className="text-red-400" />
                    Video Formats
                  </h3>
                  <div className="grid gap-3">
                    {videoInfo.formats.video_formats
                      .filter((format) => {
                        // Only show MP4 formats with format_id that contains '96' (working format)
                        // Format 137 and others cause 403 errors
                        return format.ext === 'mp4' && format.format_id.includes('96');
                      })
                      .map((format, index) => {
                        const progressKey = getProgressKey(format);
                        const progress = progressKey ? downloadProgress[progressKey] : null;

                        return (
                          <div
                            key={index}
                            className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30 hover:border-red-500/30 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2">
                                  <span className="text-white font-semibold text-sm sm:text-base">{format.quality}</span>
                                  <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full font-medium">
                                    {format.ext.toUpperCase()}
                                  </span>
                                  {format.has_audio && (
                                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-medium flex items-center gap-1">
                                      <FiMusic className="text-xs" />
                                      Audio
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                                  {format.width && format.height && (
                                    <span>{format.width}x{format.height}</span>
                                  )}
                                  {format.fps && <span>{format.fps}fps</span>}
                                  <span>{formatFileSize(format.filesize)}</span>
                                </div>
                              </div>

                              <div className="flex flex-col w-full sm:w-auto sm:items-end gap-2">
                                <button
                                  onClick={() => handleDownload(format)}
                                  disabled={!!(progress && (progress.status === 'downloading' || progress.status === 'processing'))}
                                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                  <FiDownload />
                                  Download
                                </button>

                                {progress && progress.status === 'downloading' && (
                                  <div className="w-full sm:min-w-[200px]">
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                      <span>Downloading</span>
                                      <span>{progress.percent}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                                      <div
                                        className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-300"
                                        style={{ width: `${progress.percent}%` }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {progress && progress.status === 'processing' && (
                                  <div className="flex items-center justify-center sm:justify-end gap-2 text-red-400 text-sm">
                                    <FiRefreshCw className="animate-spin" />
                                    <span>Processing...</span>
                                  </div>
                                )}

                                {progress && progress.status === 'completed' && (
                                  <div className="flex items-center justify-center sm:justify-end gap-2 text-green-400 text-sm">
                                    <FiCheck />
                                    <span className="font-medium">Downloaded!</span>
                                  </div>
                                )}

                                {progress && progress.status === 'error' && (
                                  <div className="flex items-center justify-center sm:justify-end gap-2 text-red-400 text-sm">
                                    <FiAlertCircle />
                                    <span>Failed</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}

              {downloadMode === 'audio' && (
                <>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <FiMusic className="text-red-400" />
                    Audio Formats
                  </h3>
                  <div className="grid gap-3">
                    {videoInfo.formats.audio_formats.map((format, index) => {
                      const progressKey = getProgressKey(format);
                      const progress = progressKey ? downloadProgress[progressKey] : null;

                      return (
                        <div
                          key={index}
                          className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/30 hover:border-red-500/30 transition-all"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2">
                                <span className="text-white font-semibold text-sm sm:text-base">{format.quality}</span>
                                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full font-medium">
                                  {format.ext.toUpperCase()}
                                </span>
                                {format.abr && (
                                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full font-medium">
                                    {format.abr} kbps
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                                <span>{formatFileSize(format.filesize)}</span>
                              </div>
                            </div>

                            <div className="flex flex-col w-full sm:w-auto sm:items-end gap-2">
                              <button
                                onClick={() => handleDownload(format)}
                                disabled={!!(progress && (progress.status === 'downloading' || progress.status === 'processing'))}
                                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                              >
                                <FiDownload />
                                Download
                              </button>

                              {progress && progress.status === 'downloading' && (
                                <div className="w-full sm:min-w-[200px]">
                                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                                    <span>Downloading</span>
                                    <span>{progress.percent}%</span>
                                  </div>
                                  <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                                    <div
                                      className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full transition-all duration-300"
                                      style={{ width: `${progress.percent}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {progress && progress.status === 'processing' && (
                                <div className="flex items-center justify-center sm:justify-end gap-2 text-red-400 text-sm">
                                  <FiRefreshCw className="animate-spin" />
                                  <span>Processing...</span>
                                </div>
                              )}

                              {progress && progress.status === 'completed' && (
                                <div className="flex items-center justify-center sm:justify-end gap-2 text-green-400 text-sm">
                                  <FiCheck />
                                  <span className="font-medium">Downloaded!</span>
                                </div>
                              )}

                              {progress && progress.status === 'error' && (
                                <div className="flex items-center justify-center sm:justify-end gap-2 text-red-400 text-sm">
                                  <FiAlertCircle />
                                  <span>Failed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortsDownloader;
