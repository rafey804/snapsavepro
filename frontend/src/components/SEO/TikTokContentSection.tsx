'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Sparkles, TrendingUp, Users, Video, Music, Share2, Heart, MessageCircle } from 'lucide-react';

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
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('introduction.para2')}
            </p>
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

          {/* How It Works Section */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('howItWorks.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              {t('howItWorks.description')}
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white font-bold mr-3">1</span>
                  {t('howItWorks.step1.title')}
                </h3>
                <p className="text-gray-300 ml-11">
                  {t('howItWorks.step1.description')}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-500 text-white font-bold mr-3">2</span>
                  {t('howItWorks.step2.title')}
                </h3>
                <p className="text-gray-300 ml-11">
                  {t('howItWorks.step2.description')}
                </p>
              </div>
              <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white font-bold mr-3">3</span>
                  {t('howItWorks.step3.title')}
                </h3>
                <p className="text-gray-300 ml-11">
                  {t('howItWorks.step3.description')}
                </p>
              </div>
            </div>
          </section>

          {/* Features Deep Dive */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('advancedFeatures.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-6">
              {t('advancedFeatures.description')}
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <Share2 className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  {t('advancedFeatures.unlimited')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  {t('advancedFeatures.mobileFriendly')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  {t('advancedFeatures.fastProcessing')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Video className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  {t('advancedFeatures.batchDownload')}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Music className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  {t('advancedFeatures.formatConversion')}
                </div>
              </li>
            </ul>
          </section>

          {/* SEO Content Section */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('benefits.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('benefits.description')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('benefits.contentCreation')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('benefits.offlineViewing')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('benefits.backup')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('benefits.educational')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('benefits.marketing')}
            </p>
          </section>

          {/* Safety & Privacy Section */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('safetyPrivacy.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('safetyPrivacy.safety')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('safetyPrivacy.privacy')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('safetyPrivacy.legal')}
            </p>
          </section>

          {/* Tips & Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('proTips.title')}
            </h2>
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-6 rounded-xl border border-pink-500/20">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>{t('proTips.tip1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>{t('proTips.tip2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>{t('proTips.tip3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>{t('proTips.tip4')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-500 font-bold">•</span>
                  <span>{t('proTips.tip5')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Closing Section */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {t('closing.title')}
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('closing.para1')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              {t('closing.para2')}
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t('closing.para3')}
            </p>
          </section>

        </article>
      </div>
    </div>
  );
}
