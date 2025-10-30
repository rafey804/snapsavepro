'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, Shield, Zap, Download } from 'lucide-react';

interface InfoSectionProps {
  platform: string;
  platformColor?: string;
}

export default function InfoSection({ platform, platformColor = 'pink' }: InfoSectionProps) {
  const t = useTranslations('seo.infoSection');
  const colorClasses = {
    pink: 'from-pink-500 to-purple-500',
    blue: 'from-blue-500 to-cyan-500',
    red: 'from-red-500 to-orange-500',
    purple: 'from-purple-500 to-pink-500',
    emerald: 'from-emerald-500 to-teal-500',
    yellow: 'from-yellow-400 to-orange-500',
    orange: 'from-orange-500 to-red-500'
  };

  const gradientClass = colorClasses[platformColor as keyof typeof colorClasses] || colorClasses.pink;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
        <h2 className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-6`}>
          {t('title', { platform })}
        </h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            {t('description1', { platform })}
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            {t('description2', { platform })}
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('features.quality.title')}</h3>
                <p className="text-gray-400">{t('features.quality.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('features.speed.title')}</h3>
                <p className="text-gray-400">{t('features.speed.description', { platform })}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('features.security.title')}</h3>
                <p className="text-gray-400">{t('features.security.description')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('features.noWatermark.title')}</h3>
                <p className="text-gray-400">{t('features.noWatermark.description', { platform })}</p>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            {t('description3')}
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            {t('description4')}
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            {t('description5')}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
