'use client';

import React, { useState } from 'react';
import { Download, AlertCircle, CheckCircle, Copy, Sparkles, Image, User, Zap, Search } from 'lucide-react';

import { getApiBaseUrl } from '@/utils/apiConfig';

const API_BASE_URL = getApiBaseUrl();

interface ProfileData {
  username: string;
  platform: string;
  profile_pic_url: string;
  profile_pic_url_hd?: string;  // High-resolution profile picture URL
  full_name?: string;
  bio?: string;
  followers?: number;
  following?: number;
  is_verified?: boolean;
  error?: string;  // Error message from backend
}

const ProfilePictureDownloader: React.FC = () => {
  const [username, setUsername] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      logo: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      gradient: 'from-pink-500 via-purple-500 to-orange-500'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      logo: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      gradient: 'from-cyan-400 via-pink-500 to-red-500'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      logo: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      gradient: 'from-red-600 to-red-500'
    },
  ];

  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatform(platformId);
    setUsername(''); // Clear username when platform changes
    setProfileData(null); // Clear profile data
    setError(''); // Clear any errors
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUsername(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to paste from clipboard. Please paste manually.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setIsLoading(true);
    setError('');
    setProfileData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/profile-picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim().replace('@', ''),
          platform: selectedPlatform,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch profile information');
      }

      const data: ProfileData = await response.json();

      // Check if backend returned an error
      if (data.error) {
        setError(data.error);
        setProfileData(null);
        return;
      }

      // Use proxy for Instagram images to avoid CORS issues
      if (data.profile_pic_url && data.profile_pic_url.includes('instagram')) {
        data.profile_pic_url = `${API_BASE_URL}/proxy-image?url=${encodeURIComponent(data.profile_pic_url)}`;
      }

      setProfileData(data);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('profile-info')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching profile information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: 'jpg' | 'png' = 'jpg') => {
    if (!profileData) return;

    try {
      setError(''); // Clear any previous errors

      // Get the HD version URL (not the proxy URL)
      // Always use profile_pic_url_hd for downloads to get highest quality
      let originalUrl = profileData.profile_pic_url_hd || profileData.profile_pic_url;
      if (originalUrl.includes('/proxy-image?url=')) {
        const urlParams = new URLSearchParams(originalUrl.split('?')[1]);
        originalUrl = decodeURIComponent(urlParams.get('url') || '');
      }

      console.log('Downloading from URL:', originalUrl);

      const response = await fetch(`${API_BASE_URL}/download-profile-picture`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: originalUrl,
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
      a.download = `${profileData.username}_${profileData.platform}_profile.${format}`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);

    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'Failed to download profile picture');
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
            <Sparkles className="w-12 h-12 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent animate-gradient">
            Profile Picture Downloader
          </h1>
        </div>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-4">
          Download profile pictures from any social media platform in full HD quality
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            Full HD Quality
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            All Platforms
          </span>
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-xs sm:text-sm backdrop-blur-sm">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
            No Login Required
          </span>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Select Platform</h3>
        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => handlePlatformChange(platform.id)}
              className={`group relative py-4 px-5 rounded-2xl font-semibold transition-all duration-500 ease-out transform ${selectedPlatform === platform.id
                  ? 'scale-110 shadow-2xl'
                  : 'hover:scale-105 bg-slate-800/40 hover:bg-slate-800/60'
                }`}
            >
              {/* Glowing background gradient */}
              {selectedPlatform === platform.id && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${platform.gradient} opacity-100 animate-pulse`}></div>
              )}

              {/* Glow effect ring */}
              <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${selectedPlatform === platform.id
                  ? `bg-gradient-to-br ${platform.gradient} blur-xl opacity-60 animate-pulse`
                  : 'opacity-0 group-hover:opacity-30 group-hover:blur-lg'
                }`}></div>

              <div className="relative flex flex-col items-center gap-2 z-10">
                <div className={`transition-all duration-500 ${selectedPlatform === platform.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                  {platform.logo}
                </div>
                <span className={`text-xs font-medium transition-all duration-500 ${selectedPlatform === platform.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}>
                  {platform.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Section - Mobile Layout */}
      <form onSubmit={handleSubmit} className="mb-8 block md:hidden space-y-3">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={`Enter ${selectedPlatform} username...`}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 border border-cyan-500/30 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-xl transition-all text-sm sm:text-base pr-12"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={handlePaste}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
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
          className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] text-sm sm:text-base"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Fetching Profile...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Profile Picture
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`Enter ${selectedPlatform} username...`}
              className="w-full px-6 py-4 bg-slate-800/50 border border-cyan-500/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-xl transition-all pr-12"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
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
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 whitespace-nowrap"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Fetching...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Get Profile Picture
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
        <div id="profile-info" className="space-y-6 animate-fade-in-up">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={profileData.profile_pic_url}
                    alt={`${profileData.username}'s profile picture`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-cyan-500/30"
                  />
                  {profileData.is_verified && (
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
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
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                      {profileData.platform}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio - Only show if it's not a generic fallback message */}
              {profileData.bio && !profileData.bio.includes('user @') && (
                <div className="mb-6 p-4 bg-slate-900/50 rounded-xl">
                  <p className="text-slate-300 text-sm">{profileData.bio}</p>
                </div>
              )}

              {/* Stats - Only show if followers or following is greater than 0 */}
              {((profileData.followers && profileData.followers > 0) || (profileData.following && profileData.following > 0)) && (
                <div className="flex gap-6 mb-6 p-4 bg-slate-900/50 rounded-xl">
                  {profileData.followers && profileData.followers > 0 && (
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{formatCount(profileData.followers)}</div>
                      <div className="text-xs text-slate-400">Followers</div>
                    </div>
                  )}
                  {profileData.following && profileData.following > 0 && (
                    <div className="text-center">
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
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] flex items-center justify-center gap-3"
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

export default ProfilePictureDownloader;
