'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from '../../../public/Snap save pro.png'
import Link from 'next/link';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactElement;
  available: boolean;
  gradient: string;
  route: string;
  isNew?: boolean;
  isAudio?: boolean;
}

export default function ProfessionalHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const platforms: Platform[] = [
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      available: true,
      gradient: 'from-pink-500 to-red-500',
      route: '/'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      available: true,
      gradient: 'from-purple-500 to-pink-500',
      route: '/pages/instagram-video-download',
      isNew: true
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      available: true,
      gradient: 'from-blue-500 to-blue-600',
      route: '/pages/facebook-video-download',
      isNew: true
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 0 0-9 9v7c0 1.11.89 2 2 2h4v-8H5v-1a7 7 0 1 1 14 0v1h-4v8h4c1.11 0 2-.89 2-2v-7a9 9 0 0 0-9-9Z"/>
          <circle cx="12" cy="12" r="1.5" className="animate-pulse"/>
          <path d="M8 14h2v6H8zm6 0h2v6h-2z" className="animate-audio-wave"/>
        </svg>
      ),
      available: true,
      gradient: 'from-emerald-500 to-teal-500',
      route: '/pages/audio',
      isNew: true,
      isAudio: true
    }
  ];

  // Function to determine active tab based on current pathname
  const getActiveTab = () => {
    const currentPlatform = platforms.find(platform => platform.route === pathname);
    return currentPlatform ? currentPlatform.id : 'tiktok'; // Default to tiktok since it's now the main platform
  };

  const activeTab = getActiveTab();

  const handlePlatformClick = (platform: Platform) => {
    if (platform.available) {
      // Remove window.location.href since we're using Link components
      // The Link component will handle navigation
    }
  };

  // Enhanced Animated "New" Badge Component with special audio effects
  const NewBadge = ({ gradient, isAudio }: { gradient: string; isAudio?: boolean }) => (
    <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${gradient} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 ${isAudio ? 'animate-bounce audio-glow' : ''}`}>
      <span className="animate-pulse">New</span>
      {isAudio && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-ping rounded-full opacity-75"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse blur-sm"></div>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-full"></div>
    </div>
  );

  // Enhanced Mobile New Badge Component
  const MobileNewBadge = ({ gradient, isAudio }: { gradient: string; isAudio?: boolean }) => (
    <div className={`absolute -top-1.5 -right-1.5 bg-gradient-to-r ${gradient} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform transition-all duration-300 ${isAudio ? 'animate-bounce audio-glow-mobile' : ''}`}>
      <span className="animate-pulse">New</span>
      {isAudio && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-ping rounded-full opacity-60"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full animate-pulse blur-sm"></div>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-full"></div>
    </div>
  );

  return (
    <>
      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes audioWave {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(1.3); opacity: 1; }
        }
        @keyframes audioPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes audioGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.6), 0 0 30px rgba(20, 184, 166, 0.4); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-audio-wave {
          animation: audioWave 1.2s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .animate-audio-pulse {
          animation: audioPulse 2s ease-in-out infinite;
        }
        .audio-glow {
          animation: audioGlow 2s ease-in-out infinite;
        }
        .audio-glow-mobile {
          animation: audioGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      <header className="sticky top-0 z-50 border-b border-slate-700/20 bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 backdrop-blur-xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-purple-600/5 to-blue-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section */}
            <Link href='/' >
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-pink-500/20">
                 <Image src={Logo} height={400} width={500} className=' w-auto'  alt="Snap Save Pro"/>
                </div>
                <div className=" hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                    Snap Save Pro
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-300">TikTok, Instagram, Facebook & Audio Downloader</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                    Snap Save Pro
                  </h1>
                </div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {platforms.map((platform) => (
                <div key={platform.id} className="relative">
                  <Link 
                    href={platform.route}
                    className={`px-4 py-2.5 font-medium rounded-xl shadow-sm flex items-center gap-2.5 transition-all duration-300 ${
                      activeTab === platform.id
                        ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg scale-105 ${platform.isAudio ? 'audio-glow' : ''}` 
                        : `bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white hover:scale-102 backdrop-blur-sm ${platform.isAudio ? 'hover:shadow-emerald-500/20 hover:shadow-lg' : ''}`
                    }`}
                  >
                    {/* Only apply audio animations to Audio button */}
                    <div className={platform.isAudio ? 'animate-audio-pulse' : ''}>
                      {platform.icon}
                    </div>
                    <span className="text-sm font-semibold">{platform.name}</span>
                    {/* Sound wave bars only for Audio button when active */}
                    {platform.isAudio && activeTab === platform.id && (
                      <div className="flex gap-0.5 ml-1">
                        <div className="w-1 h-3 bg-white/60 rounded-full animate-audio-wave" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-1 h-3 bg-white/60 rounded-full animate-audio-wave" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-1 h-3 bg-white/60 rounded-full animate-audio-wave" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    )}
                  </Link>
                  
                  {/* New Badge - enhanced only for Audio */}
                  {platform.isNew && (
                    <NewBadge gradient={platform.gradient} isAudio={platform.isAudio} />
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-800/80 rounded-xl text-gray-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {platforms.map((platform) => (
                <div key={platform.id} className="relative">
                  <Link 
                    href={platform.route}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full p-4 font-medium rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                      activeTab === platform.id
                        ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg ${platform.isAudio ? 'audio-glow-mobile' : ''}` 
                        : `bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white backdrop-blur-sm ${platform.isAudio ? 'hover:shadow-emerald-500/20 hover:shadow-lg' : ''}`
                    }`}
                  >
                    {/* Only apply audio animations to Audio button */}
                    <div className={platform.isAudio ? 'animate-audio-pulse' : ''}>
                      {platform.icon}
                    </div>
                    <span className="text-sm font-semibold">{platform.name}</span>
                    {/* Sound wave bars only for Audio button when active */}
                    {platform.isAudio && activeTab === platform.id && (
                      <div className="flex gap-0.5 ml-2">
                        <div className="w-0.5 h-2 bg-white/60 rounded-full animate-audio-wave" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-0.5 h-2 bg-white/60 rounded-full animate-audio-wave" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-0.5 h-2 bg-white/60 rounded-full animate-audio-wave" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    )}
                  </Link>
                  
                  {/* New Badge - enhanced only for Audio */}
                  {platform.isNew && (
                    <MobileNewBadge gradient={platform.gradient} isAudio={platform.isAudio} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}