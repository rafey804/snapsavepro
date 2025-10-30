'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Logo from '../../../public/Snap save pro.png'
import { Link } from '@/lib/navigation';
import LanguageSwitcher from './LanguageSwitcher';

interface DownloaderItem {
  name: string;
  route: string;
  icon: React.ReactElement;
  gradient: string;
  description: string;
}

interface ResourceItem {
  name: string;
  route: string;
  icon: React.ReactElement;
}

export default function ProfessionalHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const t = useTranslations('downloaders');
  const tHeader = useTranslations('header');

  const downloaderItems: DownloaderItem[] = [
    {
      name: t('tiktok.name'),
      route: '/',
      description: t('tiktok.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      gradient: 'from-pink-500 to-red-500'
    },
    {
      name: t('instagram.name'),
      route: '/pages/instagram-reels-downloader',
      description: t('instagram.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: t('youtube.name'),
      route: '/pages/youtube-shorts-downloader',
      description: t('youtube.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-red-600'
    },
    {
      name: t('youtubeMP3.name'),
      route: '/pages/youtube-to-mp3',
      description: t('youtubeMP3.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-orange-500'
    },
    {
      name: t('facebook.name'),
      route: '/pages/facebook-video-download',
      description: t('facebook.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: t('snapchat.name'),
      route: '/pages/snapchat-video-download',
      description: t('snapchat.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.134 4.259.225.06.422.18.584.33.241.241.361.54.361.839 0 .299-.12.604-.346.868-.195.225-.48.42-.779.599-.449.27-1.108.324-1.418.345-.329.03-.735.104-1.123.21-.314.09-.629.225-.944.404-.449.27-.868.735-1.048 1.064-.195.345-.569.569-.945.569-.09 0-.181-.015-.27-.044-.479-.165-.868-.735-1.094-1.137a.958.958 0 00-.089-.18c-.09-.15-.181-.299-.285-.449-.495-.734-1.183-1.064-2.175-1.064-.989 0-1.68.33-2.175 1.064-.104.15-.195.299-.285.449-.03.06-.06.12-.089.18-.227.402-.616.972-1.094 1.137-.089.029-.18.044-.27.044-.375 0-.75-.224-.945-.569-.18-.329-.599-.794-1.048-1.064a4.121 4.121 0 00-.944-.404c-.388-.105-.794-.18-1.123-.21-.31-.021-.969-.075-1.418-.345-.299-.18-.584-.374-.779-.599-.227-.264-.347-.569-.347-.868 0-.299.12-.598.361-.839.162-.15.359-.27.584-.33 2.608-.784 4.074-4.123 4.134-4.259l.015-.015c.18-.344.21-.644.12-.868-.195-.45-.883-.675-1.333-.81-.135-.044-.255-.09-.344-.119-.823-.329-1.228-.719-1.213-1.168 0-.359.284-.689.734-.838.15-.061.327-.09.509-.09.12 0 .299.016.464.104.374.181.733.285 1.033.301.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.299-4.847C7.859 1.069 11.216.793 12.206.793z"/>
        </svg>
      ),
      gradient: 'from-yellow-400 to-yellow-500'
    },
    {
      name: t('twitter.name'),
      route: '/pages/twitter-video-download',
      description: t('twitter.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      gradient: 'from-gray-700 to-black'
    },
    {
      name: t('linkedin.name'),
      route: '/pages/linkedin-video-downloader',
      description: t('linkedin.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      name: t('pinterest.name'),
      route: '/pages/pinterest-video-download',
      description: t('pinterest.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19c-.721 0-1.418-.104-2.073-.295.286-.434.712-1.096 1.103-2.068.205-.513.487-1.191.731-1.88.126.24.362.454.648.599.375.192.817.296 1.256.296 1.301 0 2.349-.922 2.658-2.13.056-.222.085-.452.085-.689 0-1.639-1.343-2.959-3-2.959-.472 0-.92.107-1.337.301-.745-1.345-1.342-2.445-1.342-3.506 0-1.268.728-2.172 1.771-2.172.682 0 1.229.396 1.229 1.075 0 .686-.343 1.268-.856 1.653-.137.103-.256.226-.256.396 0 .257.234.447.516.447.457 0 .901-.339 1.229-.785.457-.625.714-1.396.714-2.168 0-1.438-1.079-2.614-2.446-2.614-1.541 0-2.775 1.23-2.775 2.787 0 .856.342 1.653.939 2.236-.164.188-.394.308-.656.308-.375 0-.686-.274-.686-.633 0-.103.026-.206.069-.308-.896-.831-1.462-2.013-1.462-3.338C6.157 4.819 7.975 3 10.242 3c2.319 0 4.201 1.819 4.201 4.114 0 1.405-.662 2.684-1.747 3.595-.103.086-.206.188-.206.325 0 .223.188.396.426.396.274 0 .548-.171.737-.411.788-.993 1.234-2.253 1.234-3.563 0-3.054-2.446-5.556-5.445-5.556C6.618 2.9 4.414 5.04 4.414 7.871c0 1.887 1.011 3.629 2.641 4.629-.069.274-.188.548-.343.788-.686-.274-1.268-.702-1.713-1.234C3.848 10.777 3.25 9.104 3.25 7.336 3.25 3.626 6.293 0 10.242 0c3.949 0 7.258 3.214 7.258 7.199 0 2.099-.99 4.063-2.658 5.367-.223.171-.479.308-.754.396.103.583.274 1.166.514 1.696.411-.086.805-.223 1.165-.411 2.321-1.234 3.766-3.612 3.766-6.219C19.533 3.419 16.191 0 12 0z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-pink-500'
    },
    {
      name: t('youtubeThumbnail.name'),
      route: '/pages/youtube-thumbnail-downloader',
      description: t('youtubeThumbnail.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 12c0 .83-.67 1.5-1.5 1.5S6 12.83 6 12s.67-1.5 1.5-1.5S9 11.17 9 12zm4.5 6H5V7h13v11h-4.5z"/>
        </svg>
      ),
      gradient: 'from-red-500 to-orange-500'
    },
    {
      name: t('twitch.name'),
      route: '/pages/twitch-clip-downloader',
      description: t('twitch.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: t('telegram.name'),
      route: '/pages/telegram-video-download',
      description: t('telegram.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.248-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.325.016.093.036.305.02.469z"/>
        </svg>
      ),
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      name: t('profilePic.name'),
      route: '/pages/profile-picture-downloader',
      description: t('profilePic.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      name: t('instagramProfile.name'),
      route: '/pages/instagram-profile-picture-downloader',
      description: t('instagramProfile.description'),
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const resourceItems: ResourceItem[] = [
    {
      name: tHeader('howToUse'),
      route: '/pages/how-to-use',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: tHeader('faq'),
      route: '/pages/faqs',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: tHeader('blog'),
      route: '/blog',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      )
    },
    {
      name: tHeader('contactSupport'),
      route: '/pages/contact',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      name: tHeader('aboutUs'),
      route: '/pages/about',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const showDropdown = (menu: string) => {
    setActiveDropdown(menu);
  };

  const hideDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-700/20 bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 backdrop-blur-xl shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 via-purple-600/5 to-blue-600/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo Section */}
            <Link href='/' className="flex items-center gap-3 flex-shrink-0 z-10">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-pink-500/20 transition-transform hover:scale-105">
                <Image src={Logo} height={400} width={500} className='w-auto' alt="Snap Save Pro"/>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base lg:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
                  Snap Save Pro
                </h1>
                <p className="text-xs text-gray-400 hidden lg:block">Fast & Free Video Downloader</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 ml-auto">
              {/* Social Media Downloaders Menu */}
              <div
                className="relative"
                onMouseEnter={() => showDropdown('downloaders')}
                onMouseLeave={hideDropdown}
              >
                <button
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    activeDropdown === 'downloaders'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{tHeader('socialMediaDownloaders')}</span>
                  <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'downloaders' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Downloaders Mega Menu */}
                {activeDropdown === 'downloaders' && (
                  <div className="absolute top-full right-0 mt-0.5 w-[800px] bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-xl overflow-hidden">
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4">
                        {downloaderItems.map((item) => (
                          <Link
                            key={item.route}
                            href={item.route}
                            onClick={() => setActiveDropdown(null)}
                            className="group p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          >
                            <div className="flex items-start gap-2">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg`}>
                                {item.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-xs text-white mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all">
                                  {item.name}
                                </h3>
                                <p className="text-[10px] text-gray-400 line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 px-6 py-3 border-t border-slate-700/50">
                      <p className="text-xs text-gray-400 text-center">
                        {tHeader('allPlatformsSupport')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Help & Resources Menu */}
              <div
                className="relative"
                onMouseEnter={() => showDropdown('resources')}
                onMouseLeave={hideDropdown}
              >
                <button
                  className={`px-4 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    activeDropdown === 'resources'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{tHeader('helpAndResources')}</span>
                  <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Resources Mega Menu */}
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full right-0 mt-0.5 w-80 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 rounded-2xl shadow-2xl border border-slate-700/50 backdrop-blur-xl overflow-hidden">
                    <div className="p-4">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.route}
                          href={item.route}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/60 transition-all duration-300 hover:scale-105"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-3 border-t border-slate-700/50">
                      <p className="text-xs text-gray-400 text-center">
                        {tHeader('needHelp')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Blog Link */}
              <Link
                href="/blog"
                className={`px-4 py-2.5 text-sm font-medium rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  pathname === '/blog'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>{tHeader('blog')}</span>
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-800/80 rounded-xl text-gray-300 hover:bg-slate-700/80 hover:text-white transition-all duration-200 ml-auto"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-90' : ''}`}
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
            mobileMenuOpen ? 'max-h-[80vh] pb-4' : 'max-h-0'
          }`}>
            <div className="pt-4 space-y-4">
              {/* Mobile Downloaders Section */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-downloaders')}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl text-white font-medium"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {tHeader('socialMediaDownloaders')}
                  </span>
                  <svg className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-downloaders' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === 'mobile-downloaders' && (
                  <div className="mt-2 space-y-2 pl-4">
                    {downloaderItems.map((item) => (
                      <Link
                        key={item.route}
                        href={item.route}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                        className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-all"
                      >
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white flex-shrink-0`}>
                          {item.icon}
                        </div>
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Resources Section */}
              <div>
                <button
                  onClick={() => toggleDropdown('mobile-resources')}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl text-white font-medium"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {tHeader('helpAndResources')}
                  </span>
                  <svg className={`w-5 h-5 transition-transform ${activeDropdown === 'mobile-resources' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === 'mobile-resources' && (
                  <div className="mt-2 space-y-2 pl-4">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.route}
                        href={item.route}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                        className="flex items-center gap-3 p-3 bg-slate-800/60 rounded-lg hover:bg-slate-700/60 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm text-gray-300">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Blog Link */}
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl text-white font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>{tHeader('blog')}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
