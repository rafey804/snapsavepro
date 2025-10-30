'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Download, Loader, CheckCircle, AlertTriangle, FileVideo, Image as ImageIcon, File } from 'lucide-react';

interface VideoFormat {
  quality: string;
  format_id: string;
  ext: string;
  filesize: number;
  has_video?: boolean;
  has_audio?: boolean;
}

interface TelegramMediaInfo {
  platform: string;
  media_type: 'video' | 'photo' | 'document';
  title: string;
  thumbnail?: string;
  duration?: number;
  formats: VideoFormat[];
}

interface DownloadProgress {
  status: string;
  percent: number;
  error?: string;
  filename?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

export default function TelegramDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [mediaInfo, setMediaInfo] = useState<TelegramMediaInfo | null>(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: DownloadProgress}>({});

  const mediaInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mediaInfo && !loading && mediaInfoRef.current) {
      setTimeout(() => {
        mediaInfoRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    }
  }, [mediaInfo, loading]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return 'N/A';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const validateTelegramURL = (url: string): boolean => {
    const telegramPatterns = [
      /(?:https?:\/\/)?t\.me\/([a-zA-Z0-9_]+)\/(\d+)/,
      /(?:https?:\/\/)?t\.me\/c\/(\d+)\/(\d+)/,
      /(?:https?:\/\/)?telegram\.me\/([a-zA-Z0-9_]+)\/(\d+)/,
    ];
    return telegramPatterns.some(pattern => pattern.test(url));
  };

  const fetchMediaInfo = async () => {
    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('Please enter a Telegram link');
      return;
    }

    if (!validateTelegramURL(trimmedUrl)) {
      setError('Please enter a valid Telegram channel message link (e.g., t.me/channel/123)');
      return;
    }

    setLoading(true);
    setError('');
    setMediaInfo(null);

    try {
      const response = await fetch(`${API_BASE_URL}/video-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmedUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch media information');
      }

      setMediaInfo(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching media information');
    } finally {
      setLoading(false);
    }
  };

  const startDownload = async (format: VideoFormat) => {
    const downloadId = `download_${Date.now()}`;

    setDownloadProgress(prev => ({
      ...prev,
      [downloadId]: { status: 'initializing', percent: 0 }
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
          type: mediaInfo?.media_type === 'photo' ? 'image' : 'video',
          ext: format.ext,
          platform: 'telegram',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Download failed');
      }

      const serverDownloadId = data.download_id;
      pollDownloadProgress(serverDownloadId, downloadId);

    } catch (err: any) {
      setDownloadProgress(prev => ({
        ...prev,
        [downloadId]: {
          status: 'error',
          percent: 0,
          error: err.message || 'Download failed'
        }
      }));
    }
  };

  const pollDownloadProgress = async (serverDownloadId: string, localDownloadId: string) => {
    const maxAttempts = 120;
    let attempts = 0;

    const checkProgress = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/progress/${serverDownloadId}`);
        const progress = await response.json();

        setDownloadProgress(prev => ({
          ...prev,
          [localDownloadId]: progress
        }));

        if (progress.status === 'completed') {
          window.location.href = `${API_BASE_URL}/download-direct/${serverDownloadId}`;

          setTimeout(() => {
            setDownloadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[localDownloadId];
              return newProgress;
            });
          }, 3000);

          return;
        }

        if (progress.status === 'error') {
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(checkProgress, 1000);
        } else {
          setDownloadProgress(prev => ({
            ...prev,
            [localDownloadId]: {
              status: 'error',
              percent: 0,
              error: 'Download timeout'
            }
          }));
        }

      } catch (err: any) {
        setDownloadProgress(prev => ({
          ...prev,
          [localDownloadId]: {
            status: 'error',
            percent: 0,
            error: err.message || 'Failed to check progress'
          }
        }));
      }
    };

    checkProgress();
  };

  const getMediaIcon = () => {
    if (!mediaInfo) return <FileVideo className="w-6 h-6" />;

    switch (mediaInfo.media_type) {
      case 'video':
        return <FileVideo className="w-6 h-6 text-blue-500" />;
      case 'photo':
        return <ImageIcon className="w-6 h-6 text-green-500" />;
      case 'document':
        return <File className="w-6 h-6 text-gray-500" />;
      default:
        return <FileVideo className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Telegram Video Downloader
          </h2>
          <p className="text-lg text-gray-600">
            Download videos, photos, and media from public Telegram channels for free
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchMediaInfo()}
                placeholder="Paste Telegram channel message link (e.g., t.me/channel/123)"
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                disabled={loading}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>

            <button
              onClick={fetchMediaInfo}
              disabled={loading || !url.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="w-6 h-6 animate-spin" />
                  <span>Fetching Media...</span>
                </>
              ) : (
                <>
                  <Search className="w-6 h-6" />
                  <span>Get Media Info</span>
                </>
              )}
            </button>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How to use:</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Open Telegram and find the channel message with media</li>
              <li>Copy the message link (right-click on message → Copy Link)</li>
              <li>Paste the link above and click &quot;Get Media Info&quot;</li>
              <li>Choose your preferred format and download</li>
            </ol>
            <p className="text-xs text-blue-700 mt-2">
              ⚠️ Note: Only public Telegram channels are supported
            </p>
          </div>
        </div>

        {/* Media Info Section */}
        {mediaInfo && (
          <div ref={mediaInfoRef} className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              {getMediaIcon()}
              <span>Media Information</span>
            </h3>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">{mediaInfo.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="capitalize">{mediaInfo.media_type}</span>
                {mediaInfo.duration && (
                  <span>Duration: {formatDuration(mediaInfo.duration)}</span>
                )}
              </div>
            </div>

            {/* Download Options */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">Download Options:</h4>
              {mediaInfo.formats.map((format, index) => {
                const downloadId = `download_${Date.now()}_${index}`;
                const progress = downloadProgress[downloadId];

                return (
                  <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{format.quality}</p>
                        <p className="text-sm text-gray-600">
                          {format.ext.toUpperCase()} • {formatFileSize(format.filesize)}
                        </p>
                      </div>

                      <button
                        onClick={() => startDownload(format)}
                        disabled={progress?.status === 'downloading' || progress?.status === 'initializing'}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
                      >
                        {progress?.status === 'downloading' || progress?.status === 'initializing' ? (
                          <>
                            <Loader className="w-4 h-4 animate-spin" />
                            <span>Downloading...</span>
                          </>
                        ) : progress?.status === 'completed' ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Downloaded</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    {progress && progress.status !== 'error' && progress.status !== 'completed' && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress.percent}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {progress.status} - {Math.round(progress.percent)}%
                        </p>
                      </div>
                    )}

                    {/* Error */}
                    {progress?.status === 'error' && (
                      <div className="mt-2 flex items-center space-x-2 text-red-600 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{progress.error || 'Download failed'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
