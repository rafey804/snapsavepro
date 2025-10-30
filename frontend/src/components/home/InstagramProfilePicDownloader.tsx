'use client';

import React, { useState } from 'react';
import { Download, AlertCircle, CheckCircle, Copy, Sparkles, Image, User, Zap, Search, Eye } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api';

interface InstagramProfileData {
  username: string;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  full_name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  posts_count?: number;
  is_verified?: boolean;
  is_private?: boolean;
}

const InstagramProfilePicDownloader: React.FC = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState<InstagramProfileData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Remove @ symbol if present
      const cleanedText = text.replace('@', '').trim();
      setUsername(cleanedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to paste from clipboard. Please paste manually.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Please enter an Instagram username');
      return;
    }

    // Clean username (remove @ symbol)
    const cleanUsername = username.trim().replace('@', '');

    setIsLoading(true);
    setError('');
    setProfileData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/instagram-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: cleanUsername,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch Instagram profile');
      }

      const data: InstagramProfileData = await response.json();

      // Use proxy for Instagram images to avoid CORS issues
      if (data.profile_pic_url && data.profile_pic_url.includes('instagram')) {
        data.profile_pic_url = `${API_BASE_URL}/proxy-image?url=${encodeURIComponent(data.profile_pic_url)}`;
      }
      if (data.profile_pic_url_hd && data.profile_pic_url_hd.includes('instagram')) {
        data.profile_pic_url_hd = `${API_BASE_URL}/proxy-image?url=${encodeURIComponent(data.profile_pic_url_hd)}`;
      }

      setProfileData(data);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('instagram-profile-info')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching Instagram profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: 'jpg' | 'png' = 'jpg') => {
    if (!profileData) return;

    try {
      setError(''); // Clear any previous errors

      // Get the original Instagram URL (not the proxy URL)
      let imageUrl = profileData.profile_pic_url_hd || profileData.profile_pic_url;
      if (imageUrl.includes('/proxy-image?url=')) {
        const urlParams = new URLSearchParams(imageUrl.split('?')[1]);
        imageUrl = decodeURIComponent(urlParams.get('url') || '');
      }

      console.log('Downloading HD Instagram profile from:', imageUrl);

      const response = await fetch(`${API_BASE_URL}/download-profile-picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: imageUrl,
          username: profileData.username,
          format: format,
        }),
      });

      console.log('Download response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || 'Failed to download profile picture');
      }

      const blob = await response.blob();
      console.log('Blob size:', blob.size);

      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${profileData.username}_instagram_profile.${format}`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);

    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Failed to download profile picture. Please try again.');
    }
  };

  const formatCount = (count?: number): string => {
    if (!count) return '0';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
            Instagram DP Downloader
          </h1>
        </div>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-4">
          View and download Instagram profile pictures in full HD quality
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Full HD Quality
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Username Only
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            No Login
          </span>
        </div>
      </div>

      {/* Input Section - Mobile Layout */}
      <form onSubmit={handleSubmit} className="mb-8 block md:hidden space-y-3">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm sm:text-base">@</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.replace('@', ''))}
            placeholder="Enter Instagram username"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-8 sm:pl-10 bg-slate-800/50 border border-blue-500/30 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-xl transition-all text-sm sm:text-base pr-12"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
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
          className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] text-sm sm:text-base"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Fetching Profile...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              View Profile Picture
            </span>
          )}
        </button>
      </form>

      {/* Input Section - Desktop Layout */}
      <form onSubmit={handleSubmit} className="mb-8 hidden md:block">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">@</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace('@', ''))}
              placeholder="Enter Instagram username"
              className="w-full px-6 py-4 pl-10 bg-slate-800/50 border border-blue-500/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-xl transition-all pr-12"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
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
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Fetching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                View DP
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

      {/* Profile Info and Download */}
      {profileData && (
        <div id="instagram-profile-info" className="space-y-6 animate-fade-in-up">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={profileData.profile_pic_url}
                    alt={`${profileData.username}'s Instagram profile picture`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-blue-500/30"
                  />
                  {profileData.is_verified && (
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    @{profileData.username}
                  </h2>
                  {profileData.full_name && (
                    <p className="text-slate-300">{profileData.full_name}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">
                      Instagram
                    </span>
                    {profileData.is_private && (
                      <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">
                        🔒 Private
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {profileData.bio && (
                <div className="mb-6 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-slate-300 text-sm">{profileData.bio}</p>
                </div>
              )}

              {/* Stats - Only show if there's real data (not all zeros) */}
              {(profileData.posts_count > 0 || profileData.followers > 0 || profileData.following > 0) && (
              <div className="flex gap-6 mb-6 p-4 bg-slate-900/50 rounded-xl overflow-x-auto">
                {profileData.posts_count > 0 && (
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-white">{formatCount(profileData.posts_count)}</div>
                    <div className="text-xs text-slate-400">Posts</div>
                  </div>
                )}
                {profileData.followers > 0 && (
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-white">{formatCount(profileData.followers)}</div>
                    <div className="text-xs text-slate-400">Followers</div>
                  </div>
                )}
                {profileData.following > 0 && (
                  <div className="text-center min-w-[80px]">
                    <div className="text-2xl font-bold text-white">{formatCount(profileData.following)}</div>
                    <div className="text-xs text-slate-400">Following</div>
                  </div>
                )}
              </div>
              )}

              {/* Download Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleDownload('jpg')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download Full HD (JPG)
                </button>
                <button
                  onClick={() => handleDownload('png')}
                  className="w-full px-8 py-3 bg-slate-700/50 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Download className="w-5 h-5" />
                  Download (PNG)
                </button>
              </div>

              {/* Info Note */}
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <p className="text-sm text-slate-300 text-center">
                  ✅ Original quality • No watermark • No login required • Works on private profiles (if DP is public)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-shake { animation: shake 0.5s ease-out; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
};

export default InstagramProfilePicDownloader;
