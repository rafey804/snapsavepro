'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface PlatformContentSectionProps {
  platform: string; // 'youtube', 'facebook', 'twitter', etc.
  platformColor?: string;
}

export default function PlatformContentSection({
  platform,
  platformColor = 'blue'
}: PlatformContentSectionProps) {
  const t = useTranslations(`seo.${platform}`);

  const colorClasses = {
    blue: {
      gradient: 'from-blue-400 to-cyan-500',
      border: 'border-blue-500/20',
      text: 'text-blue-400'
    },
    red: {
      gradient: 'from-red-400 to-pink-500',
      border: 'border-red-500/20',
      text: 'text-red-400'
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500',
      border: 'border-purple-500/20',
      text: 'text-purple-400'
    },
    teal: {
      gradient: 'from-teal-400 to-blue-500',
      border: 'border-teal-500/20',
      text: 'text-teal-400'
    }
  };

  const colors = colorClasses[platformColor as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
        <h2 className={`text-3xl font-bold text-white mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
          {t('mainTitle')}
        </h2>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-lg leading-relaxed">
            {t('intro')}
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{t('howTo.title')}</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>{t('howTo.step1')}</li>
            <li>{t('howTo.step2')}</li>
            <li>{t('howTo.step3')}</li>
            <li>{t('howTo.step4')}</li>
            <li>{t('howTo.step5')}</li>
          </ol>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{t('features.title')}</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>{t('features.highQuality')}</li>
            <li>{t('features.noWatermark')}</li>
            <li>{t('features.multipleFormats')}</li>
            <li>{t('features.fastSecure')}</li>
            <li>{t('features.free')}</li>
            <li>{t('features.noRegistration')}</li>
            <li>{t('features.allDevices')}</li>
            <li>{t('features.audioExtraction')}</li>
          </ul>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{t('whyChoose.title')}</h3>
          <p className="text-gray-300 leading-relaxed">
            {t('whyChoose.description')}
          </p>

          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{t('faq.title')}</h3>

          <div className="space-y-4">
            <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
              <h4 className="text-lg font-bold text-white mb-2">{t('faq.q1.question')}</h4>
              <p className="text-gray-300">{t('faq.q1.answer')}</p>
            </div>

            <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
              <h4 className="text-lg font-bold text-white mb-2">{t('faq.q2.question')}</h4>
              <p className="text-gray-300">{t('faq.q2.answer')}</p>
            </div>

            <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
              <h4 className="text-lg font-bold text-white mb-2">{t('faq.q3.question')}</h4>
              <p className="text-gray-300">{t('faq.q3.answer')}</p>
            </div>

            <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
              <h4 className="text-lg font-bold text-white mb-2">{t('faq.q4.question')}</h4>
              <p className="text-gray-300">{t('faq.q4.answer')}</p>
            </div>

            <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
              <h4 className="text-lg font-bold text-white mb-2">{t('faq.q5.question')}</h4>
              <p className="text-gray-300">{t('faq.q5.answer')}</p>
            </div>

            <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
              <h4 className="text-lg font-bold text-white mb-2">{t('faq.q6.question')}</h4>
              <p className="text-gray-300">{t('faq.q6.answer')}</p>
            </div>
          </div>

          <div className={`bg-gradient-to-r ${colors.gradient}/10 rounded-xl p-6 border ${colors.border} mt-8`}>
            <h4 className="text-xl font-bold text-white mb-3">{t('proTip.title')}</h4>
            <p className="text-gray-300">{t('proTip.description')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
