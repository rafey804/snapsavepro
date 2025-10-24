'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../../../public/Snap save pro.png'
import Link from 'next/link';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactElement;
  gradient: string;
  route: string;
}

export default function ProfessionalHeader() {
  const pathname = usePathname();
  const router = useRouter();
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
      gradient: 'from-pink-500 to-red-500',
      route: '/'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      route: '/pages/facebook-video-download'
    },
    {
      id: 'pinterest',
      name: 'Pinterest',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.104-2.073-.295.286-.434.712-1.096 1.103-2.068.205-.513.487-1.191.731-1.88.126.24.362.454.648.599.375.192.817.296 1.256.296 1.301 0 2.349-.922 2.658-2.13.056-.222.085-.452.085-.689 0-1.639-1.343-2.959-3-2.959-.472 0-.92.107-1.337.301-.745-1.345-1.342-2.445-1.342-3.506 0-1.268.728-2.172 1.771-2.172.682 0 1.229.396 1.229 1.075 0 .686-.343 1.268-.856 1.653-.137.103-.256.226-.256.396 0 .257.234.447.516.447.457 0 .901-.339 1.229-.785.457-.625.714-1.396.714-2.168 0-1.438-1.079-2.614-2.446-2.614-1.541 0-2.775 1.23-2.775 2.787 0 .856.342 1.653.939 2.236-.164.188-.394.308-.656.308-.375 0-.686-.274-.686-.633 0-.103.026-.206.069-.308-.896-.831-1.462-2.013-1.462-3.338C6.157 4.819 7.975 3 10.242 3c2.319 0 4.201 1.819 4.201 4.114 0 1.405-.662 2.684-1.747 3.595-.103.086-.206.188-.206.325 0 .223.188.396.426.396.274 0 .548-.171.737-.411.788-.993 1.234-2.253 1.234-3.563 0-3.054-2.446-5.556-5.445-5.556C6.618 2.9 4.414 5.04 4.414 7.871c0 1.887 1.011 3.629 2.641 4.629-.069.274-.188.548-.343.788-.686-.274-1.268-.702-1.713-1.234C3.848 10.777 3.25 9.104 3.25 7.336 3.25 3.626 6.293 0 10.242 0c3.949 0 7.258 3.214 7.258 7.199 0 2.099-.99 4.063-2.658 5.367-.223.171-.479.308-.754.396.103.583.274 1.166.514 1.696.411-.086.805-.223 1.165-.411 2.321-1.234 3.766-3.612 3.766-6.219C19.533 3.419 16.191 0 12 0z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-pink-500',
      route: '/pages/pinterest-video-download'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.134 4.259.225.06.422.18.584.33.241.241.361.54.361.839 0 .299-.12.604-.346.868-.195.225-.48.42-.779.599-.449.27-1.108.324-1.418.345-.329.03-.735.104-1.123.21-.314.09-.629.225-.944.404-.449.27-.868.735-1.048 1.064-.195.345-.569.569-.945.569-.09 0-.181-.015-.27-.044-.479-.165-.868-.735-1.094-1.137a.958.958 0 00-.089-.18c-.09-.15-.181-.299-.285-.449-.495-.734-1.183-1.064-2.175-1.064-.989 0-1.68.33-2.175 1.064-.104.15-.195.299-.285.449-.03.06-.06.12-.089.18-.227.402-.616.972-1.094 1.137-.089.029-.18.044-.27.044-.375 0-.75-.224-.945-.569-.18-.329-.599-.794-1.048-1.064a4.121 4.121 0 00-.944-.404c-.388-.105-.794-.18-1.123-.21-.31-.021-.969-.075-1.418-.345-.299-.18-.584-.374-.779-.599-.227-.264-.347-.569-.347-.868 0-.299.12-.598.361-.839.162-.15.359-.27.584-.33 2.608-.784 4.074-4.123 4.134-4.259l.015-.015c.18-.344.21-.644.12-.868-.195-.45-.883-.675-1.333-.81-.135-.044-.255-.09-.344-.119-.823-.329-1.228-.719-1.213-1.168 0-.359.284-.689.734-.838.15-.061.327-.09.509-.09.12 0 .299.016.464.104.374.181.733.285 1.033.301.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/>
        </svg>
      ),
      gradient: 'from-yellow-400 to-yellow-500',
      route: '/pages/snapchat-video-download'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
      route: '/pages/reddit-video-download'
    },
    {
      id: 'twitter',
      name: 'X',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      gradient: 'from-gray-700 to-black',
      route: '/pages/twitter-video-download'
    },
    {
      id: 'blog',
      name: 'Blog',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-500',
      route: '/blog'
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3a9 9 0 0 0-9 9v7c0 1.11.89 2 2 2h4v-8H5v-1a7 7 0 1 1 14 0v1h-4v8h4c1.11 0 2-.89 2-2v-7a9 9 0 0 0-9-9Z"/>
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-500',
      route: '/pages/audio'
    }
  ];

  // Language switcher removed - will be added back with proper i18n setup

  const getActiveTab = () => {
    const currentPlatform = platforms.find(platform => platform.route === pathname);
    return currentPlatform ? currentPlatform.id : 'tiktok';
  };

  const activeTab = getActiveTab();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-700/20 bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 backdrop-blur-xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 via-purple-600/5 to-blue-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo Section - Left */}
            <Link href='/' className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-pink-500/20">
                <Image src={Logo} height={400} width={500} className='w-auto' alt="Snap Save Pro"/>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                  Snap Save Pro
                </h1>
              </div>
            </Link>
            
            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2">
              {platforms.map((platform) => (
                <Link 
                  key={platform.id}
                  href={platform.route}
                  className={`px-3 py-2 text-xs font-medium rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    activeTab === platform.id
                      ? `bg-gradient-to-r ${platform.gradient} text-white shadow-md` 
                      : 'bg-slate-800/60 text-gray-300 hover:bg-slate-700/60 hover:text-white'
                  }`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 bg-slate-800/80 rounded-lg text-gray-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200"
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
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}>
            <div className="grid grid-cols-2 gap-2 pt-3">
              {platforms.map((platform) => (
                <Link 
                  key={platform.id}
                  href={platform.route}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    activeTab === platform.id
                      ? `bg-gradient-to-r ${platform.gradient} text-white shadow-lg` 
                      : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white'
                  }`}
                >
                  {platform.icon}
                  <span>{platform.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}