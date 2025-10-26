'use client'
import Link from 'next/link';
import React from 'react';

export default function ProfessionalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-gray-900 to-zinc-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
                  SnapSavePro
                </h3>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              The ultimate tool for downloading videos from your favorite social media platforms. Fast, secure, and reliable.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.566-1.35 2.14-2.21z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800/80 hover:bg-slate-700/80 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Downloaders */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Downloaders</h4>
            <ul className="space-y-3">
              <li><Link href='/pages/instagram-reels-downloader' className="text-gray-300 hover:text-teal-400 transition-colors duration-200 text-sm flex items-center gap-2">
                <span className="text-teal-400">•</span> Instagram Reels Download
              </Link></li>
              <li><Link href='/pages/youtube-shorts-downloader' className="text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm flex items-center gap-2">
                <span className="text-purple-400">•</span> YouTube Shorts Download
              </Link></li>
              <li><Link href='/pages/pinterest-video-download' className="text-gray-300 hover:text-red-400 transition-colors duration-200 text-sm flex items-center gap-2">
                <span className="text-red-400">•</span> Pinterest Video Download
              </Link></li>
              <li><Link href='/pages/snapchat-video-download' className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm flex items-center gap-2">
                <span className="text-yellow-400">•</span> Snapchat Video Download
              </Link></li>
              <li><Link href='/pages/reddit-video-download' className="text-gray-300 hover:text-orange-400 transition-colors duration-200 text-sm flex items-center gap-2">
                <span className="text-orange-400">•</span> Reddit Video Download
              </Link></li>
              <li><Link href='/pages/twitter-video-download' className="text-gray-300 hover:text-gray-300 transition-colors duration-200 text-sm flex items-center gap-2">
                <span className="text-gray-400">•</span> Twitter/X Video Download
              </Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href='/' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Home</Link></li>
              <li><Link href='/pages/how-it-works' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">How It Works</Link></li>
              <li><Link href='/pages/faqs' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">FAQ</Link></li>
              <li><Link href='/pages/contact' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              <li><Link href='/pages/legal/privacy-policy' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</Link></li>
              <li><Link href='/pages/legal/terms-of-service' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Terms of Service</Link></li>
              <li><Link href='/pages/contact' className="text-gray-300 hover:text-white transition-colors duration-200 text-sm">Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with Developer Credit */}
        <div className="border-t border-slate-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-gray-300 text-sm">
              © {currentYear} SnapSavePro. All rights reserved.
            </div>

            {/* Developer Credit */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-full border border-cyan-500/30 backdrop-blur-sm">
              <Link href="https://nafeytech.com/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-sm">
                  <span className="text-gray-300">Developed by</span>
                  <span className="ml-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
                    Rafey
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-1">
                <a
                  href="#"
                  className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors duration-200"
                  aria-label="Developer's GitHub"
                >
                  <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors duration-200"
                  aria-label="Developer's LinkedIn"
                >
                  <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-gray-400 text-xs">
              Made with ❤️ for the community
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
