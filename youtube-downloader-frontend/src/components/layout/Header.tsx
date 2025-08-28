'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '../../../public/Snap save pro.png'
import Link from 'next/link';
export default function ProfessionalHeader() {
  const [activeTab, setActiveTab] = useState('youtube');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      available: true,
      gradient: 'from-cyan-500 to-emerald-500'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      available: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      available: false,
      gradient: 'from-pink-500 to-red-500'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      available: false,
      gradient: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/20 bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 backdrop-blur-xl shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
             <Link href='/' >

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-cyan-500/20">
             <Image src={Logo} height={400} width={500} className=' w-auto'  alt="Snap Save Pro"/>
            </div>
            <div className=" hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
                Snap Save Pro
              </h1>
              <p className="text-xs lg:text-sm text-gray-300">Multi-Platform Video Downloader</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
                DL Pro
              </h1>
            </div>
          </div>
             </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {platforms.map((platform) => (
              <div key={platform.id} className="relative">
                <button 
                  onClick={() => platform.available && setActiveTab(platform.id)}
                  disabled={!platform.available}
                  className={`px-4 py-2.5 font-medium rounded-xl shadow-sm flex items-center gap-2.5 transition-all duration-300 ${
                    platform.available && activeTab === platform.id
                      ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg scale-105` 
                      : platform.available
                      ? 'bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white hover:scale-102 backdrop-blur-sm'
                      : 'bg-slate-700/50 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  {platform.icon}
                  <span className="text-sm font-semibold">{platform.name}</span>
                </button>
                {!platform.available && (
                  <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${platform.gradient} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse`}>
                    Soon
                  </div>
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
                <button 
                  onClick={() => {
                    if (platform.available) {
                      setActiveTab(platform.id);
                      setMobileMenuOpen(false);
                    }
                  }}
                  disabled={!platform.available}
                  className={`w-full p-4 font-medium rounded-xl shadow-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                    platform.available && activeTab === platform.id
                      ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg` 
                      : platform.available
                      ? 'bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white backdrop-blur-sm'
                      : 'bg-slate-700/50 text-slate-400 cursor-not-allowed opacity-60'
                  }`}
                >
                  {platform.icon}
                  <span className="text-sm font-semibold">{platform.name}</span>
                </button>
                {!platform.available && (
                  <div className={`absolute -top-1.5 -right-1.5 bg-gradient-to-r ${platform.gradient} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse`}>
                    Soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}