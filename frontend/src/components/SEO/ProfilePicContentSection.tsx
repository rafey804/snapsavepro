'use client';

import React from 'react';
import { Download, Zap, Shield, Sparkles, Image, Smartphone, Globe, Crown, Eye } from 'lucide-react';

const ProfilePicContentSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="prose prose-invert prose-lg max-w-none">
        {/* Introduction Section */}
        <section className="mb-12 animate-fade-in">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Universal Profile Picture Downloader - Save DPs from Any Social Media Platform
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Welcome to the most comprehensive and user-friendly profile picture downloader available online. Whether you need Instagram DPs, Facebook profile pics, Twitter avatars, or TikTok profile images, our platform provides a seamless, fast, and completely free solution to download profile pictures from all major social media platforms in full HD quality. With billions of users across social media, having a reliable tool to view and save profile pictures has become essential for personal and professional use.
            </p>
          </div>
        </section>

        {/* Why Download Profile Pictures Section */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            Why Download Profile Pictures?
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/10">
            <p className="text-slate-300 mb-4 leading-relaxed">
              Social media profile pictures serve as digital identities across platforms. However, most social networks deliberately restrict viewing profile pictures in full size, showing only small thumbnails or circular crops. This limitation creates challenges for users who need high-quality profile pictures for legitimate purposes such as contact lists, team directories, presentations, or professional portfolios.
            </p>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Our Profile Picture Downloader solves this problem by accessing the full-resolution images stored on social media servers. This tool is invaluable for business owners managing contact databases, social media managers organizing team profiles, content creators needing high-quality images for collaborations, designers working on projects, and individuals who simply want to view profile pictures in their original quality.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Unlike sketchy tools that require logins or install suspicious software, our web-based downloader works directly in your browser with no registration required. Simply enter a username, and instantly view and download profile pictures in full HD quality - up to 4K resolution depending on the original upload.
            </p>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <Crown className="w-8 h-8 text-cyan-400" />
            Premium Features for All Platforms
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Globe className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">All Platforms Supported</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Download profile pictures from Instagram, Facebook, Twitter/X, TikTok, YouTube, LinkedIn, WhatsApp, and Telegram. All major social media platforms supported in one unified tool. No need for multiple downloaders.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Image className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Full HD Quality</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Download profile pictures in their original quality - up to 4K resolution. We fetch the highest quality version available from each platform's servers. No compression, no watermarks, no quality loss.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Eye className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Zoom & Preview</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                View profile pictures in full size with our zoom feature before downloading. See every detail clearly in the original resolution. Perfect for verifying quality and inspecting images.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">No Login Required</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Download profile pictures without logging into any social media account. Completely anonymous, no registration needed, no personal information required. Your accounts remain secure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <Smartphone className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Mobile Optimized</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Works perfectly on all devices - iPhone, iPad, Android phones, tablets, and computers. Fully responsive design optimized for touchscreens. Download DPs directly to your device's gallery.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Instant Results</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Lightning-fast downloads with no waiting. Enter a username and get instant access to full HD profile pictures. Our optimized servers ensure maximum speed and reliability.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-white mb-6">
            Perfect for Every Use Case
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/10">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Business & Professional</h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Create team directories with high-quality photos</li>
                <li>• Build contact databases with profile pictures</li>
                <li>• Design presentations and pitch decks</li>
                <li>• Manage employee or client portfolios</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-blue-500/10">
              <h3 className="text-lg font-semibold text-blue-400 mb-3">Content Creation</h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Get collaborator profile pictures for videos</li>
                <li>• Create influencer comparison graphics</li>
                <li>• Design social media posts and thumbnails</li>
                <li>• Build brand partnership presentations</li>
              </ul>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-xl rounded-xl p-6 border border-cyan-500/10">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Personal Use</h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Save friends' profile pictures for contacts</li>
                <li>• View full-size profile pictures clearly</li>
                <li>• Archive memorable profile pictures</li>
                <li>• Create personal photo collections</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-cyan-400" />
              Privacy & Security First
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Your privacy is our top priority. We never store or save any profile pictures on our servers. Images are fetched directly from social media platforms and delivered to your device without any intermediate storage. We don't track your downloads, create user profiles, or collect personal information.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              All connections are encrypted and secure. No cookies, no tracking, no data retention. Your activity remains completely private and anonymous. We respect both your privacy and the privacy of profile picture owners.
            </p>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default ProfilePicContentSection;
