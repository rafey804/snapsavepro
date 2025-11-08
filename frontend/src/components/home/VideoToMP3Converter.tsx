"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Music, Loader, CheckCircle, AlertTriangle, FileVideo, Link, Trash2, Settings, Volume2, Film, Mic } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Interface definitions
interface ConversionProgress {
  status: string;
  percent: number;
  message: string;
  bitrate?: number;
  file_size?: number;
}

interface SupportedFormats {
  video_formats: string[];
  audio_bitrates: number[];
  max_file_size: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

interface FileWithProgress {
  file: File;
  downloadId: string | null;
  progress: ConversionProgress | null;
  error: string | null;
}

export default function VideoToMP3Converter() {
  const t = useTranslations('videoToMp3');

  // State management - Support multiple files (max 5)
  const [selectedFiles, setSelectedFiles] = useState<FileWithProgress[]>([]);
  const [bitrate] = useState<number>(320); // Fixed at 320kbps for high quality
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [supportedFormats, setSupportedFormats] = useState<SupportedFormats | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Fetch supported formats on mount
  useEffect(() => {
    fetchSupportedFormats();
    return () => {
      // Clean up all progress intervals
      progressIntervalsRef.current.forEach(interval => clearInterval(interval));
      progressIntervalsRef.current.clear();
    };
  }, []);

  const fetchSupportedFormats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/video-to-mp3/formats`);
      const data = await response.json();
      setSupportedFormats(data);
    } catch (err) {
      console.error('Error fetching formats:', err);
    }
  };

  // File validation
  const validateFile = (file: File): boolean => {
    const maxSize = 500 * 1024 * 1024; // 500MB

    if (file.size > maxSize) {
      setError('File too large. Maximum size is 500MB.');
      return false;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    const supportedExts = supportedFormats?.video_formats || [
      'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', '3gp', 'mpg', 'mpeg', 'm4v'
    ];

    if (!extension || !supportedExts.includes(extension)) {
      setError(`Unsupported format. Supported: ${supportedExts.join(', ')}`);
      return false;
    }

    return true;
  };

  // Handle file selection - Support multiple files (max 5)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Check if adding these files would exceed the 5 file limit
    if (selectedFiles.length + files.length > 5) {
      setError(`Maximum 5 videos can be converted at once. You have ${selectedFiles.length} selected and tried to add ${files.length} more.`);
      return;
    }

    // Validate and add each file
    const newFiles: FileWithProgress[] = [];
    for (const file of files) {
      if (validateFile(file)) {
        newFiles.push({
          file,
          downloadId: null,
          progress: null,
          error: null
        });
      }
    }

    if (newFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setError('');
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    // Check if adding these files would exceed the 5 file limit
    if (selectedFiles.length + files.length > 5) {
      setError(`Maximum 5 videos can be converted at once. You have ${selectedFiles.length} selected and tried to add ${files.length} more.`);
      return;
    }

    // Validate and add each file
    const newFiles: FileWithProgress[] = [];
    for (const file of files) {
      if (validateFile(file)) {
        newFiles.push({
          file,
          downloadId: null,
          progress: null,
          error: null
        });
      }
    }

    if (newFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setError('');
    }
  };

  // Poll for progress for a specific file
  const pollProgress = async (id: string, fileIndex: number) => {
    console.log(`[File ${fileIndex}] Setting up progress polling for ID: ${id}`);

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/progress/${id}`);
        const data = await response.json();

        console.log(`[File ${fileIndex}] Progress update:`, data);

        // Update progress for this specific file
        setSelectedFiles(prev => {
          const updated = [...prev];
          updated[fileIndex] = {
            ...updated[fileIndex],
            progress: data
          };
          return updated;
        });

        if (data.status === 'completed') {
          console.log(`[File ${fileIndex}] Conversion completed! Starting download...`);
          const interval = progressIntervalsRef.current.get(id);
          if (interval) {
            clearInterval(interval);
            progressIntervalsRef.current.delete(id);
          }
          handleDownload(id, fileIndex);
        } else if (data.status === 'error') {
          console.error(`[File ${fileIndex}] Conversion error:`, data.message);
          const interval = progressIntervalsRef.current.get(id);
          if (interval) {
            clearInterval(interval);
            progressIntervalsRef.current.delete(id);
          }

          // Update error for this specific file
          setSelectedFiles(prev => {
            const updated = [...prev];
            updated[fileIndex] = {
              ...updated[fileIndex],
              error: data.message || 'Conversion failed'
            };
            return updated;
          });
        }
      } catch (err) {
        console.error(`[File ${fileIndex}] Error polling progress:`, err);
      }
    }, 1000);

    progressIntervalsRef.current.set(id, interval);
    console.log(`[File ${fileIndex}] Progress polling started. Active intervals: ${progressIntervalsRef.current.size}`);
  };

  // Handle batch file upload conversion
  const handleUploadConversion = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one video file');
      return;
    }

    setLoading(true);
    setError('');

    console.log(`Starting conversion for ${selectedFiles.length} files`);

    // Convert all files concurrently
    const conversionPromises = selectedFiles.map(async (fileWithProgress, index) => {
      console.log(`[File ${index}] Starting upload: ${fileWithProgress.file.name}`);

      // Set uploading status
      setSelectedFiles(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          progress: { status: 'uploading', percent: 0, message: 'Uploading video...' }
        };
        return updated;
      });

      const formData = new FormData();
      formData.append('file', fileWithProgress.file);
      formData.append('bitrate', bitrate.toString());

      try {
        const response = await fetch(`${API_BASE_URL}/video-to-mp3/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log(`[File ${index}] Upload response:`, data);

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
        }

        // Update download ID and start polling
        setSelectedFiles(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            downloadId: data.download_id
          };
          return updated;
        });

        console.log(`[File ${index}] Starting progress polling with ID: ${data.download_id}`);
        pollProgress(data.download_id, index);
      } catch (err: any) {
        console.error(`[File ${index}] Upload error:`, err);
        // Update error for this specific file
        setSelectedFiles(prev => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            error: err.message || 'Conversion failed',
            progress: null
          };
          return updated;
        });
      }
    });

    // Wait for all conversions to start
    await Promise.all(conversionPromises);
    console.log('All uploads completed, conversion in progress');
    setLoading(false);
  };


  // Handle download for a specific file with delay to prevent browser blocking
  const handleDownload = async (id: string, fileIndex: number) => {
    try {
      // Add small delay between downloads to prevent browser blocking
      await new Promise(resolve => setTimeout(resolve, fileIndex * 500)); // 500ms delay per file

      const downloadUrl = `${API_BASE_URL}/download-direct/${id}`;
      const fileName = selectedFiles[fileIndex].file.name.replace(/\.[^/.]+$/, '') + '.mp3';

      console.log(`[File ${fileIndex}] Downloading: ${fileName} from ${downloadUrl}`);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`[File ${fileIndex}] Download triggered successfully`);
    } catch (err) {
      console.error(`[File ${fileIndex}] Download error:`, err);
      setSelectedFiles(prev => {
        const updated = [...prev];
        updated[fileIndex] = {
          ...updated[fileIndex],
          error: 'Download failed. Please try again.'
        };
        return updated;
      });
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setError('');
  };

  // Clear all files
  const clearAllFiles = () => {
    // Clear all progress intervals
    progressIntervalsRef.current.forEach(interval => clearInterval(interval));
    progressIntervalsRef.current.clear();

    setSelectedFiles([]);
    setError('');
    setLoading(false);
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 py-12 px-4 z-10">
      <div className="max-w-5xl mx-auto relative z-20">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl">
                <div className="text-6xl">🎵</div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            {t('title') || 'Video to MP3 Converter'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('description') || 'Convert any video format to high-quality MP3 audio. Upload your file or paste a URL.'}
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden relative z-30">
          <div className="p-8 relative z-40">
            {/* Upload Mode - 320kbps High Quality */}
            <div className="space-y-6 relative z-50">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 relative z-50 ${
                    isDragging
                      ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 scale-105'
                      : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  style={{ pointerEvents: 'auto' }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-4">
                    <div className={`p-4 rounded-full ${isDragging ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-700'} transition-all duration-300`}>
                      <FileVideo className={`h-12 w-12 ${isDragging ? 'text-purple-600' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {selectedFiles.length > 0
                          ? `${selectedFiles.length} video${selectedFiles.length > 1 ? 's' : ''} selected`
                          : (t('dragDropFile') || 'Drag & drop your video files here (Max 5)')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {t('orClickToSelect') || 'or click to select from your computer'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* File List */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-3 relative z-50">
                    {selectedFiles.map((fileWithProgress, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border-2 border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <FileVideo className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                {fileWithProgress.file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatFileSize(fileWithProgress.file.size)}
                              </p>
                            </div>
                          </div>

                          {/* Status Icons */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {fileWithProgress.progress?.status === 'completed' && (
                              <button
                                onClick={() => fileWithProgress.downloadId && handleDownload(fileWithProgress.downloadId, index)}
                                className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-all cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            )}
                            {!fileWithProgress.progress && (
                              <button
                                onClick={() => removeFile(index)}
                                className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                            {fileWithProgress.progress && fileWithProgress.progress.status !== 'completed' && fileWithProgress.progress.status !== 'error' && (
                              <Loader className="h-5 w-5 animate-spin text-purple-600 dark:text-purple-400" />
                            )}
                            {fileWithProgress.error && (
                              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {fileWithProgress.progress && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                {fileWithProgress.progress.message}
                              </span>
                              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                                {fileWithProgress.progress.percent}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${fileWithProgress.progress.percent}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Error Message */}
                        {fileWithProgress.error && (
                          <div className="mt-3 text-xs text-red-600 dark:text-red-400">
                            {fileWithProgress.error}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                {selectedFiles.length > 0 && (
                  <div className="flex gap-3 relative z-50">
                    <button
                      onClick={handleUploadConversion}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer relative z-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {loading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin" />
                          {t('converting') || 'Converting...'}
                        </>
                      ) : (
                        <>
                          <Music className="h-5 w-5" />
                          {t('convertToMp3') || `Convert ${selectedFiles.length} Video${selectedFiles.length > 1 ? 's' : ''} to MP3`}
                        </>
                      )}
                    </button>
                    <button
                      onClick={clearAllFiles}
                      className="px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer relative z-50"
                      style={{ pointerEvents: 'auto' }}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3 animate-shake">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-800 dark:text-red-300">{error}</p>
              </div>
            )}
          </div>

          {/* Features Footer */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Volume2 className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">{t('highQuality') || 'High Quality Audio'}</h3>
                  <p className="text-sm text-purple-100">
                    {t('highQualityDesc') || 'Up to 320kbps bitrate for crystal clear sound'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Film className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">{t('allFormats') || 'All Video Formats'}</h3>
                  <p className="text-sm text-purple-100">
                    {t('allFormatsDesc') || 'Supports MP4, AVI, MKV, MOV, and more'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mic className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">{t('fastConversion') || 'Fast Conversion'}</h3>
                  <p className="text-sm text-purple-100">
                    {t('fastConversionDesc') || 'Convert videos to MP3 in seconds'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Formats Info */}
        {supportedFormats && (
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <Settings className="h-5 w-5 text-purple-600" />
              {t('supportedFormats') || 'Supported Formats'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {t('videoFormats') || 'Video Formats:'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {supportedFormats.video_formats.map(f => f.toUpperCase()).join(', ')}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {t('audioBitrates') || 'Audio Bitrates:'}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {supportedFormats.audio_bitrates.join(', ')} kbps
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
