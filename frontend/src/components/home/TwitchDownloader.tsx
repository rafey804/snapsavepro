'use client';

import React, { useState, useEffect } from 'react';
import { Download, AlertCircle, CheckCircle, Copy, Sparkles, Video, Music, Clock, Eye, Heart, User, Calendar } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

interface VideoFormat {
  format_id: string;
  ext: string;
  quality: string;
  filesize?: number;
  vcodec?: string;
  acodec?: string;
  resolution?: string;
  fps?: number;
  video_bitrate?: number;
  audio_bitrate?: number;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  uploader: string;
  view_count?: number;
  like_count?: number;
  upload_date?: string;
  description?: string;
  formats: VideoFormat[];
  platform: string;
}

interface DownloadProgress {
  status: 'processing' | 'downloading' | 'completed' | 'error';
  percent: number;
  message: string;
}

const TwitchDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadMode, setDownloadMode] = useState<'video' | 'audio'>('video');
  const [downloadProgress, setDownloadProgress] = useState<Record<string, DownloadProgress>>({});
  const [copied, setCopied] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to paste from clipboard. Please paste manually.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setError('Please enter a Twitch clip URL');
      return;
    }

    // Validate Twitch URL
    const twitchRegex = /^https?:\/\/(www\.)?(twitch\.tv|clips\.twitch\.tv)\/.+/i;
    if (!twitchRegex.test(url.trim())) {
      setError('Please enter a valid Twitch clip URL');
      return;
    }

    setIsLoading(true);
    setError('');
    setVideoInfo(null);
    setDownloadProgress({});

    try {
      const response = await fetch(`${API_BASE_URL}/video-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch video information');
      }

      const data: VideoInfo = await response.json();
      console.log('Twitch API Response:', data);
      console.log('Total formats:', data.formats?.length || 0);
      console.log('Video formats:', data.formats?.filter(f => f.vcodec && f.vcodec !== 'none').length || 0);
      console.log('Audio formats:', data.formats?.filter(f => f.acodec && f.acodec !== 'none').length || 0);
      setVideoInfo(data);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('video-info')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching video information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: VideoFormat) => {
    if (!videoInfo) return;

    const downloadKey = `${format.format_id}-${downloadMode}`;

    setDownloadProgress(prev => ({
      ...prev,
      [downloadKey]: { status: 'processing', percent: 0, message: 'Initializing download...' }
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
          format_id: format.format_id,
          type: downloadMode,
          ext: format.ext,
          duration: videoInfo.duration,
          platform: 'twitch',
        }),
      });

      if (!response.ok) {
        throw new Error('Download request failed');
      }

      const { download_id } = await response.json();

      // Poll for progress
      const pollProgress = async () => {
        try {
          const progressResponse = await fetch(`${API_BASE_URL}/progress/${download_id}`);
          const progressData = await progressResponse.json();

          setDownloadProgress(prev => ({
            ...prev,
            [downloadKey]: progressData
          }));

          if (progressData.status === 'completed') {
            // Trigger file download
            window.location.href = `${API_BASE_URL}/download-direct/${download_id}`;
          } else if (progressData.status === 'error') {
            setError(progressData.message || 'Download failed');
          } else {
            // Continue polling
            setTimeout(pollProgress, 1500);
          }
        } catch (err) {
          setDownloadProgress(prev => ({
            ...prev,
            [downloadKey]: { status: 'error', percent: 0, message: 'Failed to get download progress' }
          }));
        }
      };

      pollProgress();
    } catch (err) {
      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: { status: 'error', percent: 0, message: 'Failed to initiate download' }
      }));
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCount = (count?: number): string => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getProgressStage = (progress: DownloadProgress) => {
    const stages = [
      { status: 'processing', percent: 0, label: 'Validating URL' },
      { status: 'processing', percent: 20, label: 'Fetching clip data' },
      { status: 'processing', percent: 40, label: 'Preparing download' },
      { status: 'downloading', percent: 60, label: 'Downloading clip' },
      { status: 'downloading', percent: 80, label: 'Processing file' },
      { status: 'completed', percent: 100, label: 'Download complete' },
    ];

    for (let i = stages.length - 1; i >= 0; i--) {
      if (progress.percent >= stages[i].percent && progress.status === stages[i].status) {
        return stages[i].label;
      }
    }
    return progress.message || 'Processing...';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Section with Twitch Theme */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent animate-gradient">
            Twitch Clip Downloader
          </h1>
        </div>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-4">
          Download your favorite Twitch clips in high quality - Fast, Free & Easy
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            HD Quality
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            No Watermark
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            100% Free
          </span>
        </div>
      </div>

      {/* Input Section - Mobile Layout */}
      <form onSubmit={handleSubmit} className="mb-8 block md:hidden space-y-3">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Twitch clip URL here..."
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-xl transition-all text-sm sm:text-base pr-12"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
            title="Paste from clipboard"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] text-sm sm:text-base"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Clip
            </span>
          )}
        </button>
      </form>

      {/* Input Section - Desktop Layout */}
      <form onSubmit={handleSubmit} className="mb-8 hidden md:block">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Twitch clip URL here..."
              className="w-full px-6 py-4 bg-slate-800/50 border border-purple-500/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-xl transition-all pr-12"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-purple-500/20 rounded-lg transition-colors"
              title="Paste from clipboard"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-slate-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Get Clip
              </span>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-300 animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm sm:text-base">{error}</p>
        </div>
      )}

      {/* Video Info and Download Options */}
      {videoInfo && (
        <div id="video-info" className="space-y-6 animate-fade-in-up">
          {/* Video Preview Card */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl">
            <div className="relative">
              <img
                src={videoInfo.thumbnail}
                alt={videoInfo.title}
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-white font-semibold text-sm">{formatDuration(videoInfo.duration)}</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 line-clamp-2">{videoInfo.title}</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-4 h-4 text-purple-400" />
                  <span className="text-xs sm:text-sm truncate">{videoInfo.uploader}</span>
                </div>
                {videoInfo.view_count !== undefined && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Eye className="w-4 h-4 text-pink-400" />
                    <span className="text-xs sm:text-sm">{formatCount(videoInfo.view_count)} views</span>
                  </div>
                )}
                {videoInfo.like_count !== undefined && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-xs sm:text-sm">{formatCount(videoInfo.like_count)} likes</span>
                  </div>
                )}
                {videoInfo.upload_date && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-xs sm:text-sm">{videoInfo.upload_date}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {videoInfo.description && (
                <div className="mb-6 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-slate-300 text-sm line-clamp-3">{videoInfo.description}</p>
                </div>
              )}

              {/* Download Mode Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setDownloadMode('video')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    downloadMode === 'video'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  Video
                </button>
                <button
                  onClick={() => setDownloadMode('audio')}
                  className={`flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    downloadMode === 'audio'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Music className="w-4 h-4" />
                  Audio
                </button>
              </div>

              {/* Download Formats */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  {downloadMode === 'video' ? <Video className="w-5 h-5 text-purple-400" /> : <Music className="w-5 h-5 text-pink-400" />}
                  Available {downloadMode === 'video' ? 'Video' : 'Audio'} Formats
                </h3>

                {videoInfo.formats.length === 0 ? (
                  <div className="p-6 bg-slate-900/50 rounded-xl border border-red-500/20 text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="text-slate-300">No formats available for this clip.</p>
                  </div>
                ) : (() => {
                  const filteredFormats = videoInfo.formats.filter(format => {
                    if (downloadMode === 'video') {
                      // Show video formats (those with video codec)
                      return format.vcodec && format.vcodec !== 'none' && format.vcodec !== null;
                    } else {
                      // Show audio formats (those with audio codec but no video)
                      return (!format.vcodec || format.vcodec === 'none' || format.vcodec === null) &&
                             format.acodec && format.acodec !== 'none' && format.acodec !== null;
                    }
                  });

                  if (filteredFormats.length === 0) {
                    return (
                      <div className="p-6 bg-slate-900/50 rounded-xl border border-yellow-500/20 text-center">
                        <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                        <p className="text-slate-300">
                          No {downloadMode} formats available for this clip. Try switching to {downloadMode === 'video' ? 'Audio' : 'Video'} mode.
                        </p>
                      </div>
                    );
                  }

                  return filteredFormats.map((format, index) => {
                    const downloadKey = `${format.format_id}-${downloadMode}`;
                    const progress = downloadProgress[downloadKey];

                    return (
                      <div
                        key={format.format_id}
                        className="p-4 bg-slate-900/50 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm font-semibold">
                                {format.quality}
                              </span>
                              <span className="text-slate-400 text-sm">{formatFileSize(format.filesize)}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                              {format.resolution && <span>Resolution: {format.resolution}</span>}
                              {format.fps && <span>FPS: {format.fps}</span>}
                              {format.video_bitrate && <span>Video: {Math.round(format.video_bitrate / 1000)}kbps</span>}
                              {format.audio_bitrate && <span>Audio: {Math.round(format.audio_bitrate / 1000)}kbps</span>}
                              <span>Format: {format.ext.toUpperCase()}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDownload(format)}
                            disabled={progress && progress.status !== 'error'}
                            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 whitespace-nowrap"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>

                        {/* Progress Bar */}
                        {progress && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-300">{getProgressStage(progress)}</span>
                              <span className="text-purple-400 font-semibold">{progress.percent}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 ${
                                  progress.status === 'error'
                                    ? 'bg-red-500'
                                    : progress.status === 'completed'
                                    ? 'bg-green-500'
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                }`}
                                style={{ width: `${progress.percent}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default TwitchDownloader;
