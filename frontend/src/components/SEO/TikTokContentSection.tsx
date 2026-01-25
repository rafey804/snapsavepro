'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, TrendingUp, Users, Video, Music, Share2, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export default function TikTokContentSection() {
  const t = useTranslations('seo.tiktokContent');
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Content Article */}
        <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
              {t('mainTitle')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('introduction.para1')}
            </p>

            {/* Quality Options Image */}
            <div className="my-8 rounded-xl overflow-hidden border border-slate-600/50">
              <Image
                src="/images/tiktok-quality.png"
                alt="TikTok Video Quality Options - 1080p, 720p, 480p, 360p"
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-pink-500" />
              {t('whyChoose.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Video className="w-6 h-6 text-pink-500" />
                  {t('whyChoose.noWatermark.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('whyChoose.noWatermark.description')}
                </p>
              </div>
              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  {t('whyChoose.hdQuality.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('whyChoose.hdQuality.description')}
                </p>
              </div>
              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-pink-500" />
                  {t('whyChoose.noRegistration.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('whyChoose.noRegistration.description')}
                </p>
              </div>
              <div className="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Music className="w-6 h-6 text-purple-500" />
                  {t('whyChoose.audioSupport.title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('whyChoose.audioSupport.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Cross-Platform Repurpose Section */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Share TikTok Videos Across All Platforms
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Download TikTok videos without watermark and share them on Instagram Reels, YouTube Shorts, Pinterest, and more.
              Remove the TikTok logo to create professional content for all your social media channels.
            </p>

            {/* Repurpose Graphic */}
            <div className="my-8 rounded-xl overflow-hidden">
              <Image
                src="/images/tiktok-repurpose.png"
                alt="Share TikTok videos on Instagram Reels, YouTube Shorts, Pinterest"
                width={1000}
                height={600}
                className="w-full h-auto max-w-2xl mx-auto"
              />
            </div>
          </section>

          {/* Device Compatibility */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Works on All Devices
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              Download TikTok videos on any device - iPhone, Android, Windows PC, Mac, or tablet.
              No app installation required. Works directly in your browser.
            </p>

            {/* Devices Image */}
            <div className="my-8 rounded-xl overflow-hidden">
              <Image
                src="/images/tiktok-devices.png"
                alt="TikTok Downloader works on iPhone, Android, Windows, Mac"
                width={1000}
                height={600}
                className="w-full h-auto max-w-2xl mx-auto"
              />
            </div>
          </section>

          {/* Security Section */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Safe & Secure Downloads
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  Your privacy is our priority. We don't store any personal data or downloaded videos on our servers.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Share2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>No login or registration required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>SSL encrypted connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span>No malware or viruses</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden">
                <Image
                  src="/images/tiktok-security.png"
                  alt="100% Secure TikTok Downloads - Privacy Protected"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </section>

          {/* Features List - Compact */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('advancedFeatures.title')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-xl border border-pink-500/20 flex items-center gap-3">
                <Share2 className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <span className="text-gray-300">{t('advancedFeatures.unlimited')}</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-xl border border-pink-500/20 flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <span className="text-gray-300">{t('advancedFeatures.mobileFriendly')}</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-xl border border-pink-500/20 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <span className="text-gray-300">{t('advancedFeatures.fastProcessing')}</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-xl border border-pink-500/20 flex items-center gap-3">
                <Video className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <span className="text-gray-300">{t('advancedFeatures.batchDownload')}</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 rounded-xl border border-pink-500/20 flex items-center gap-3">
                <Music className="w-6 h-6 text-pink-500 flex-shrink-0" />
                <span className="text-gray-300">{t('advancedFeatures.formatConversion')}</span>
              </div>
            </div>
          </section>

          {/* Closing Section - Compact */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('closing.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('closing.para1')} Start downloading TikTok videos now - it's fast, free, and easy!
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}
