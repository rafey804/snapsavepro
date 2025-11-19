'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Shield,
  Zap,
  Heart,
  Globe,
  Award,
  Target,
  TrendingUp,
  CheckCircle,
  Download,
  Lock,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy First",
      description: "We don't track what you download, don't store your videos, and never ask for personal information. Your privacy is non-negotiable."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast & Reliable",
      description: "Our servers are optimized for speed. Most downloads complete in under a minute, and we maintain 99.9% uptime."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Always Free",
      description: "No hidden fees, no premium tiers, no subscriptions. Everyone deserves access to powerful tools without paying for them."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Universal Access",
      description: "Works on any device, any browser, anywhere in the world. No app installation, no barriers to entry."
    }
  ];

  const stats = [
    { number: "10M+", label: "Videos Downloaded", icon: <Download className="h-6 w-6" /> },
    { number: "150+", label: "Countries Served", icon: <Globe className="h-6 w-6" /> },
    { number: "8+", label: "Platforms Supported", icon: <CheckCircle className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime Reliability", icon: <Award className="h-6 w-6" /> }
  ];

  const timeline = [
    {
      year: "2022",
      title: "The Beginning",
      description: "Started as a simple TikTok downloader to help creators save their work offline."
    },
    {
      year: "2023",
      title: "Rapid Growth",
      description: "Expanded to support YouTube, Instagram, and Facebook. Reached 1 million downloads."
    },
    {
      year: "2024",
      title: "Multi-Platform",
      description: "Added support for 8+ platforms including Pinterest, Reddit, Twitter, and Snapchat."
    },
    {
      year: "2025",
      title: "Innovation Focus",
      description: "Launched 4K support, watermark removal, and MP3 extraction. Serving millions of users monthly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-purple-600/5 to-pink-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-semibold">About Snap Save Pro</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
            Making Video Downloads
            <br />Simple & Accessible
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We believe everyone should be able to save and enjoy videos offline, without complicated software,
            expensive subscriptions, or privacy concerns. That's why we built Snap Save Pro.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all text-center"
            >
              <div className="flex justify-center mb-3 text-cyan-400">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-purple-400" />
                <h2 className="text-3xl font-bold text-white">Our Story</h2>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Snap Save Pro started in 2022 when our founder, a content creator, got frustrated with
                  complicated download tools that required software installation, forced registrations,
                  or worse - charged monthly fees for basic functionality.
                </p>

                <p>
                  We asked ourselves: Why can't downloading videos be as simple as copying a link and clicking a button?
                  Why should users sacrifice their privacy just to save content offline? Why should this cost money?
                </p>

                <p>
                  Those questions drove us to create Snap Save Pro - a completely free, browser-based tool that
                  respects your privacy and works instantly. No installations, no registrations, no tracking.
                  Just paste, click, and download.
                </p>

                <p>
                  What began as a simple TikTok downloader has grown to support 8+ major platforms, serving
                  millions of users across 150+ countries. We've processed over 10 million video downloads
                  while maintaining our core principles: privacy, simplicity, and accessibility for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What We Stand For
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all"
              >
                <div className="text-purple-400 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Our Journey
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{item.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-10 border border-cyan-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
              Why Users Choose Snap Save Pro
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">100% Private</h3>
                <p className="text-gray-300">
                  Zero tracking, zero data collection, zero storage. Your downloads are your business alone.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-300">
                  Optimized servers and smart processing deliver your downloads in seconds, not minutes.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">User-Focused</h3>
                <p className="text-gray-300">
                  Built by users, for users. No corporate bloat, just features that actually matter to you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Award className="h-8 w-8 text-yellow-400" />
              Our Commitment to You
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Always Free</h3>
                  <p className="text-gray-300">We will never charge for basic features. Video downloading should be accessible to everyone.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Privacy Protected</h3>
                  <p className="text-gray-300">We will never sell your data, track your activity, or compromise your privacy for profit.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Constantly Improving</h3>
                  <p className="text-gray-300">We actively listen to user feedback and regularly update our service with new features and platform support.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Responsible Service</h3>
                  <p className="text-gray-300">We encourage users to respect copyright laws and support content creators. Download responsibly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl p-12 border border-cyan-500/30">
            <TrendingUp className="h-12 w-12 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Millions of Satisfied Users
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start downloading videos from your favorite platforms in seconds. No registration, no fees, no hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="h-5 w-5" />
                Start Downloading Now
              </Link>
              <Link
                href="/pages/contact"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700/50"
              >
                <Users className="h-5 w-5" />
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
