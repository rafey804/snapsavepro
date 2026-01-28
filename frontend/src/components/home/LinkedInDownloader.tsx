'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FiDownload, FiVideo, FiMusic, FiClock, FiEye, FiHeart, FiMessageCircle, FiCheck, FiAlertCircle, FiRefreshCw, FiImage } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';

// Types
interface VideoFormat {
  quality: string;
  type: 'video' | 'audio' | 'image';
  format_id: string;
  ext: string;
  filesize: number;
  width?: number;
  height?: number;
  fps?: number;
  abr?: number;
  has_audio?: boolean;
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
  content_type?: 'video' | 'image';
  formats: {
    video_formats: VideoFormat[];
    audio_formats: VideoFormat[];
    image_formats?: VideoFormat[];
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

const LinkedInDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: DownloadProgress }>({});
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [processingPercent, setProcessingPercent] = useState(0);
  const [downloadMode, setDownloadMode] = useState<'video' | 'audio' | 'image'>('video');

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

  // Real-time processing status update
  const updateProcessingStatus = (status: ProcessingStatus, percent: number) => {
    setProcessingStatus(status);
    setProcessingPercent(percent);
  };

  // Validate LinkedIn URL
  const validateLinkedInURL = (url: string): boolean => {
    const linkedinPatterns = [
      /^(https?:\/\/)?(www\.)?linkedin\.com\/posts\/[\w-]+/i,
      /^(https?:\/\/)?(www\.)?linkedin\.com\/feed\/update\/urn:li:activity:\d+/i,
      /^(https?:\/\/)?(www\.)?linkedin\.com\/feed\/update\/urn:li:ugcPost:\d+/i,
      /^(https?:\/\/)?(www\.)?linkedin\.com\/video\/live\/urn:li:ugcPost:\d+/i,
    ];

    return linkedinPatterns.some(pattern => pattern.test(url.trim()));
  };

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setError('');
    setVideoInfo(null);
    setDownloadProgress({});

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('Please enter a LinkedIn URL');
      return;
    }

    try {
      // Start with real backend request - no fake animation
      updateProcessingStatus('validating', 5);

      const response = await fetch(`${API_BASE_URL}/video-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      // Update to extracting when we get response
      updateProcessingStatus('extracting', 50);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video information');
      }

      // Update to analyzing
      updateProcessingStatus('analyzing', 75);

      // Small delay to show analyzing state
      await new Promise(resolve => setTimeout(resolve, 200));

      setVideoInfo(data);
      updateProcessingStatus('complete', 100);

      // Auto-select appropriate download mode
      if (data.content_type === 'image') {
        setDownloadMode('image');
      } else if (data.formats.video_formats && data.formats.video_formats.length > 0) {
        setDownloadMode('video');
      } else if (data.formats.audio_formats && data.formats.audio_formats.length > 0) {
        setDownloadMode('audio');
      }
    } catch (err: any) {
      console.error('Error fetching video info:', err);
      setError(err.message || 'An error occurred while fetching video information');
      setProcessingStatus('idle');
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
      const requestBody: any = {
        url: url.trim(),
        format_id: format.format_id,
        type: format.type,
        ext: format.ext,
        duration: videoInfo?.duration || 0,
        platform: 'linkedin',
      };

      // Add image URL for direct image downloads
      if (format.type === 'image' && (format as any).url) {
        requestBody.image_url = (format as any).url;
      }

      // Add direct video URL for scraped LinkedIn videos
      if (format.type === 'video' && (format as any).direct_url) {
        requestBody.direct_url = (format as any).direct_url;
      }

      const response = await fetch(`${API_BASE_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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
            link.download = `linkedin_${format.type}_${format.quality}.${format.ext}`;
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
      case 'validating': return 'Validating LinkedIn URL...';
      case 'connecting': return 'Connecting to LinkedIn servers...';
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

  const currentFormats = downloadMode === 'video'
    ? videoInfo?.formats.video_formats || []
    : downloadMode === 'audio'
      ? videoInfo?.formats.audio_formats || []
      : videoInfo?.formats.image_formats || [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
            <FaLinkedin className="text-4xl sm:text-5xl text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
          LinkedIn Video Downloader
        </h1>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
          Download LinkedIn videos in high quality - Fast, free, and easy to use
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
                onChange={(e) => setUrl(e.target.value)}
                onPaste={(e) => {
                  e.preventDefault();
                  const pastedText = e.clipboardData.getData('text');
                  setUrl(pastedText);
                }}
                placeholder="Paste LinkedIn video URL here..."
                className="w-full px-4 py-3 bg-slate-900/80 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm cursor-text relative z-50"
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
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2"
            >
              <FiVideo className="text-lg" />
              Get Video Info
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste LinkedIn video URL here..."
                className="w-full px-5 py-4 bg-slate-900/80 border border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <button
              type="button"
              onClick={handlePaste}
              className="px-6 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Paste
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiVideo />
              Get Video Info
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
            <FiAlertCircle className="text-red-400 text-xl flex-shrink-0 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Processing Status */}
        {processingStatus !== 'idle' && processingStatus !== 'complete' && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-400 font-medium">{getProcessingMessage()}</span>
              <span className="text-gray-400">{processingPercent}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${processingPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Video Information */}
      {videoInfo && processingStatus === 'complete' && (
        <div ref={videoInfoRef} className="space-y-6">
          {/* Video Preview Card */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
            <div className="grid md:grid-cols-5 gap-6 p-6">
              {/* Thumbnail */}
              <div className="md:col-span-2">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  {videoInfo.thumbnail ? (
                    <img
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiVideo className="text-6xl text-slate-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Video Details */}
              <div className="md:col-span-3 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                    {videoInfo.title}
                  </h2>
                  <p className="text-sm text-blue-400">@{videoInfo.uploader}</p>
                </div>

                {videoInfo.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {videoInfo.description}
                  </p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiClock className="text-sm" />
                      <span className="text-xs">Duration</span>
                    </div>
                    <p className="text-white font-semibold">
                      {formatDuration(videoInfo.duration)}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiEye className="text-sm" />
                      <span className="text-xs">Views</span>
                    </div>
                    <p className="text-white font-semibold">
                      {formatCount(videoInfo.view_count)}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiHeart className="text-sm" />
                      <span className="text-xs">Likes</span>
                    </div>
                    <p className="text-white font-semibold">
                      {formatCount(videoInfo.like_count)}
                    </p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <FiMessageCircle className="text-sm" />
                      <span className="text-xs">Comments</span>
                    </div>
                    <p className="text-white font-semibold">
                      {formatCount(videoInfo.comment_count)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-4">Download Options</h3>

            {/* Video/Audio/Image Toggle */}
            <div className="flex gap-2 mb-6">
              {videoInfo.formats.video_formats && videoInfo.formats.video_formats.length > 0 && (
                <button
                  onClick={() => setDownloadMode('video')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${downloadMode === 'video'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-slate-700/50 text-gray-400 hover:bg-slate-700'
                    }`}
                >
                  <FiVideo />
                  Video
                </button>
              )}
              {videoInfo.formats.audio_formats && videoInfo.formats.audio_formats.length > 0 && (
                <button
                  onClick={() => setDownloadMode('audio')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${downloadMode === 'audio'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-slate-700/50 text-gray-400 hover:bg-slate-700'
                    }`}
                >
                  <FiMusic />
                  Audio
                </button>
              )}
              {videoInfo.formats.image_formats && videoInfo.formats.image_formats.length > 0 && (
                <button
                  onClick={() => setDownloadMode('image')}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${downloadMode === 'image'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                      : 'bg-slate-700/50 text-gray-400 hover:bg-slate-700'
                    }`}
                >
                  <FiImage />
                  Image
                </button>
              )}
            </div>

            {/* Format Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFormats.map((format, index) => {
                const progressKey = getProgressKey(format);
                const progress = progressKey ? downloadProgress[progressKey] : null;

                return (
                  <div
                    key={`${format.format_id}-${index}`}
                    className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {format.quality}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {format.ext?.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-400 font-medium">
                          {formatFileSize(format.filesize)}
                        </p>
                      </div>
                    </div>

                    {progress ? (
                      <div className="space-y-2">
                        {progress.status === 'completed' ? (
                          <div className="flex items-center gap-2 text-green-400 text-sm">
                            <FiCheck />
                            <span>Downloaded</span>
                          </div>
                        ) : progress.status === 'error' ? (
                          <div className="text-red-400 text-sm">
                            <p>{progress.error || 'Download failed'}</p>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>{progress.status}</span>
                              <span>{progress.percent}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                                style={{ width: `${progress.percent}%` }}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(format)}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <FiDownload />
                        Download
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {currentFormats.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  No {downloadMode} formats available for this video.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInDownloader;
