"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Search, Download, Clock, Eye, User, Music, Loader, CheckCircle, AlertTriangle, Heart, Volume2, Play, Headphones, Radio, Link, Globe, ExternalLink } from 'lucide-react';

// Interface definitions
interface AudioFormat {
  quality: string;
  type: 'audio';
  format_id: string;
  ext: string;
  filesize: number;
  abr?: number;
  description?: string;
  platform?: string;
  direct_url?: string;
}

interface AudioInfo {
  title: string;
  duration: number;
  view_count?: number;
  uploader: string;
  thumbnail: string;
  platform: string;
  type: string;
  format: string;
  quality: string;
  filesize: number;
  direct_url?: string;
  formats: {
    audio_formats: AudioFormat[];
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
  downloaded_bytes?: number;
  total_bytes?: number;
}

interface ProcessingStatus {
  stage: string;
  message: string;
  percent: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

export default function AudioDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioInfo, setAudioInfo] = useState<AudioInfo | null>(null);
  const [error, setError] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: DownloadProgress}>({});
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);

  const audioInfoRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to audio info section when audio info is loaded
  useEffect(() => {
    if (audioInfo && !loading && audioInfoRef.current) {
      setTimeout(() => {
        audioInfoRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 300);
    }
  }, [audioInfo, loading]);

  // Utility functions
  const formatDuration = (seconds: number): string => {
    if (seconds === 0) return 'Unknown';
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes < 60) {
      return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return 'Unknown';
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

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return <Play className="h-4 w-4" />;
      case 'soundcloud':
        return <Radio className="h-4 w-4" />;
      case 'direct_link':
        return <Link className="h-4 w-4" />;
      case 'generic':
        return <Globe className="h-4 w-4" />;
      default:
        return <Music className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return 'from-red-500 to-red-600';
      case 'soundcloud':
        return 'from-orange-500 to-orange-600';
      case 'direct_link':
        return 'from-purple-500 to-pink-500';
      case 'generic':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-purple-500 to-pink-500';
    }
  };

  // Processing stages simulation
  const simulateProcessingStages = () => {
    const stages = [
      { stage: 'validating', message: 'Validating audio URL...', percent: 15 },
      { stage: 'connecting', message: 'Connecting to audio source...', percent: 35 },
      { stage: 'extracting', message: 'Extracting audio information...', percent: 60 },
      { stage: 'analyzing', message: 'Analyzing audio quality...', percent: 80 },
      { stage: 'finalizing', message: 'Preparing download...', percent: 95 },
      { stage: 'complete', message: 'Ready to download!', percent: 100 }
    ];

    let currentStage = 0;
    
    const updateStage = () => {
      if (currentStage < stages.length) {
        setProcessingStatus(stages[currentStage]);
        currentStage++;
        
        if (currentStage < stages.length) {
          const delay = currentStage === 3 ? 1200 : 800;
          setTimeout(updateStage, delay);
        }
      }
    };

    updateStage();
  };

  const validateAudioURL = (url: string): boolean => {
    const audioPatterns = [
      // Direct audio files
      /\.(mp3|wav|m4a|aac|ogg|flac|wma)(\?.*)?$/i,
      // YouTube
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/,
      // SoundCloud
      /(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/[\w-]+\/[\w-]+/,
      // Vimeo
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/\d+/,
      // Dailymotion
      /(?:https?:\/\/)?(?:www\.)?dailymotion\.com\/video\/[\w-]+/,
      // Twitch
      /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/videos\/\d+/,
      // Mixcloud
      /(?:https?:\/\/)?(?:www\.)?mixcloud\.com\/[\w-]+\/[\w-]+/,
      // Generic media URLs
      /^https?:\/\/.*\.(mp3|wav|m4a|aac|ogg|flac|wma)/i
    ];
    
    return audioPatterns.some(pattern => pattern.test(url.toLowerCase()));
  };

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!validateAudioURL(url.trim())) {
      setError('Please provide a valid audio URL (direct audio files, YouTube, SoundCloud, etc.)');
      return;
    }

    setLoading(true);
    setError('');
    setAudioInfo(null);
    setProcessingStatus(null);

    setTimeout(() => {
      if (loading) {
        simulateProcessingStages();
      }
    }, 300);

    try {
      const response = await fetch(`${API_BASE_URL}/audio-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch audio information');
      }

      console.log('Audio data received:', data);
      setAudioInfo(data);
      setProcessingStatus({ stage: 'complete', message: 'Audio ready to download!', percent: 100 });
      
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

  const handleDownload = async (format: AudioFormat) => {
    const downloadKey = `${format.format_id}_${Date.now()}`;
    
    try {
      setDownloadProgress(prev => ({
        ...prev,
        [downloadKey]: { status: 'initializing', percent: 0 }
      }));

      const downloadParams = {
        url: url.trim(),
        format_id: format.format_id,
        type: 'audio',
        ext: 'mp3',
        duration: audioInfo?.duration || 0,
        platform: audioInfo?.platform || 'generic',
        target_bitrate: format.abr || 192,
        is_conversion: true,
        direct_url: format.direct_url || audioInfo?.direct_url
      };

      console.log('Audio download parameters:', downloadParams);

      const response = await fetch(`${API_BASE_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(downloadParams),
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
            }, 6000);
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
    if (!progress) return 'Download MP3';
    
    switch (progress.status) {
      case 'downloaded': return 'Downloaded';
      case 'completed': return 'Starting Download...';
      case 'downloading': return 'Downloading...';
      case 'processing': return 'Processing...';
      case 'finalizing': return 'Finalizing...';
      case 'initializing': return 'Initializing...';
      default:
        if (progress.status.includes('retrying')) return 'Retrying...';
        return 'Download MP3';
    }
  };

  const ProgressBar = ({ progress }: { progress: DownloadProgress }) => (
    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
      <div
        className={`h-2 rounded-full transition-all duration-300 ${
          progress.status === 'error' ? 'bg-red-500' : 
          progress.status === 'completed' || progress.status === 'downloaded' ? 'bg-emerald-500' : 
          progress.status.includes('retrying') ? 'bg-amber-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
        }`}
        style={{ width: `${progress.percent}%` }}
      />
    </div>
  );

  const ProcessingIndicator = ({ status }: { status: ProcessingStatus }) => (
    <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
      <div className="bg-slate-800/80 border border-purple-400/30 rounded-xl p-4 sm:p-6 text-center backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          {status.stage === 'complete' ? (
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          ) : (
            <Loader className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 animate-spin" />
          )}
          <span className="text-base sm:text-lg font-medium text-white">{status.message}</span>
        </div>
        
        <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mb-2">
          <div
            className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
              status.stage === 'complete' ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}
            style={{ width: `${status.percent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs sm:text-sm text-gray-300">
          <span>Processing audio content...</span>
          <span>{status.percent}%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-4 sm:pt-20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-orange-600/10" />
      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Audio Downloader
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Download audio from URLs or convert any media to high-quality MP3
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-4 mt-3 sm:mt-4 flex-wrap">
            <div className="flex items-center gap-1 sm:gap-2 bg-red-500/20 text-red-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <Play className="h-3 w-3 sm:h-4 sm:w-4" />
              YouTube
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-orange-500/20 text-orange-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <Radio className="h-3 w-3 sm:h-4 sm:w-4" />
              SoundCloud
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <Link className="h-3 w-3 sm:h-4 sm:w-4" />
              Direct Links
            </div>
            <div className="flex items-center gap-1 sm:gap-2 bg-blue-500/20 text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
              <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
              Any Media
            </div>
          </div>
        </div>

        {/* Input Section - Mobile Responsive */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="relative">
            
            {/* Mobile Layout */}
            <div className="block md:hidden">
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                <div className="p-3 sm:p-4">
                  <div className="relative">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Paste audio URL or any media link here..."
                      className="w-full px-4 py-3 sm:py-4 bg-slate-700/50 text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none rounded-xl border border-slate-600/50 focus:border-purple-500/50 pr-16 sm:pr-20"
                      disabled={loading}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && url.trim()) {
                          handleSubmit(e);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.readText().then(text => {
                          setUrl(text);
                        }).catch(err => {
                          console.log('Failed to read clipboard');
                        });
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 sm:px-3 py-1 sm:py-2 text-purple-400 hover:text-purple-300 transition-colors text-xs sm:text-sm font-medium bg-transparent hover:bg-slate-600/20 rounded-lg border border-purple-500/30 backdrop-blur-sm"
                      disabled={loading}
                    >
                      Paste
                    </button>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !url.trim()}
                    className="w-full mt-3 sm:mt-4 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 rounded-xl text-sm sm:text-base"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                    {loading ? 'Processing...' : 'Get Audio Info'}
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex rounded-2xl overflow-hidden shadow-2xl bg-slate-800/80 backdrop-blur-lg border border-slate-700/50">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste audio URL or any media link here... (YouTube, SoundCloud, direct links, etc.)"
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
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                {loading ? 'Processing...' : 'Get Audio Info'}
              </button>
            </div>
          </div>
        </div>

        {processingStatus && <ProcessingIndicator status={processingStatus} />}

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
     
        {audioInfo && (
          <div ref={audioInfoRef} className="max-w-6xl mx-auto px-4 sm:px-0">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 md:p-8">
                
                {/* Audio Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="md:col-span-1">
                    <div className="relative">
                      {audioInfo.thumbnail ? (
                        <img
                          src={audioInfo.thumbnail}
                          alt={audioInfo.title}
                          className="w-full rounded-xl shadow-lg aspect-square object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-600">
                          <div className="text-center">
                            <Headphones className="h-16 w-16 text-purple-400 mx-auto mb-3" />
                            <p className="text-slate-300 text-lg font-medium">Audio Track</p>
                            <p className="text-slate-500 text-sm">Ready to Download</p>
                          </div>
                        </div>
                      )}
                      {audioInfo.duration > 0 && (
                        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-xs sm:text-sm">
                          {formatDuration(audioInfo.duration)}
                        </div>
                      )}
                      <div className={`absolute bottom-2 left-2 bg-gradient-to-r ${getPlatformColor(audioInfo.platform)} text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1`}>
                        {getPlatformIcon(audioInfo.platform)}
                        {audioInfo.platform.replace('_', ' ').toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      {audioInfo.title}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">{audioInfo.uploader}</span>
                      </div>
                      {audioInfo.view_count && audioInfo.view_count > 0 && (
                        <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{formatViewCount(audioInfo.view_count)} views</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                        <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{audioInfo.format.toUpperCase()} Audio</span>
                      </div>
                      {audioInfo.duration > 0 && (
                        <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{formatDuration(audioInfo.duration)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 sm:gap-2 text-purple-300">
                        <Music className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{audioInfo.quality}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2 text-emerald-300 col-span-2 sm:col-span-1">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold">Ready to download</span>
                      </div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-2 sm:p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <ExternalLink className="h-4 w-4 text-purple-400" />
                        <span className="text-purple-300 text-sm font-medium">Source URL:</span>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm break-all">
                        {url}
                      </p>
                    </div>
                  </div>
                </div>
                  
                {/* Download Options */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Music className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
                      <h3 className="text-lg sm:text-xl font-semibold text-white">Audio Downloads (MP3)</h3>
                      <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full text-xs">
                        High Quality
                      </span>
                    </div>
                    {audioInfo.formats?.audio_formats && audioInfo.formats.audio_formats.length > 0 ? (
                      <div className="grid gap-3 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {audioInfo.formats.audio_formats.map((format, index) => {
                          const downloadKey = Object.keys(downloadProgress).find(key => 
                            key.startsWith(format.format_id)
                          );
                          const progress = downloadKey ? downloadProgress[downloadKey] : null;

                          return (
                            <div key={index} className="bg-slate-700/50 rounded-xl p-3 sm:p-4 border border-pink-500/20">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <span className="text-white font-medium text-sm sm:text-base">
                                    {format.quality}
                                  </span>
                                  <div className="text-xs text-pink-400 mt-1 flex items-center gap-1">
                                    <Volume2 className="h-2 w-2 sm:h-3 sm:w-3" />
                                    {format.description || 'High Quality MP3'}
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
                                className={`w-full bg-gradient-to-r ${getPlatformColor(audioInfo.platform)} hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 sm:py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base`}
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
                        <p className="text-gray-400 text-base sm:text-lg">No audio formats available for this URL.</p>
                        <p className="text-gray-500 text-sm mt-2">Please check the URL and try again.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
         
        {/* Footer */}
        <div className="text-center mt-8 sm:mt-12 text-gray-400 px-4 sm:px-0">
          <p className="text-sm sm:text-base">© 2025 Audio Downloader. Convert any media to high-quality MP3.</p>
          <p className="text-xs sm:text-sm mt-2">Supports YouTube, SoundCloud, direct audio links & more • Fast conversions • No registration required</p>
        </div>
      </div>
    </div>
  );
}