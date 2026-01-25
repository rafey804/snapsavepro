'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, Shield, Zap, Download } from 'lucide-react';
import Image from 'next/image';

interface InfoSectionProps {
  platform: string;
  platformColor?: string;
  customTitle?: string;
  customDescription?: string[];
  customFeatures?: {
    quality?: { title: string; description: string };
    speed?: { title: string; description: string };
    security?: { title: string; description: string };
    noWatermark?: { title: string; description: string };
  };
  featureImage?: string;
}

export default function InfoSection({
  platform,
  platformColor = 'pink',
  customTitle,
  customDescription,
  customFeatures,
  featureImage
}: InfoSectionProps) {
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
            {customTitle || t('title', { platform })}
          </h2>

          {/* Feature Image Banner - WATERMARK HIDDEN */}
          {featureImage && (
            <div className="mb-8 rounded-xl overflow-hidden" style={{ marginBottom: '8px' }}>
              <Image
                src={featureImage}
                alt={`${platform} downloader features`}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                style={{ marginBottom: '-7%' }}
              />
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {customDescription ? (
              customDescription.map((desc, index) => (
                <p key={index} className="text-gray-300 leading-relaxed text-lg mb-6">
                  {desc}
                </p>
              ))
            ) : (
              <>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {t('description1', { platform })}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {t('description2', { platform })}
                </p>
              </>
            )}

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                  <Download className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {customFeatures?.quality?.title || t('features.quality.title')}
                  </h3>
                  <p className="text-gray-400">
                    {customFeatures?.quality?.description || t('features.quality.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {customFeatures?.speed?.title || t('features.speed.title')}
                  </h3>
                  <p className="text-gray-400">
                    {customFeatures?.speed?.description || t('features.speed.description', { platform })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {customFeatures?.security?.title || t('features.security.title')}
                  </h3>
                  <p className="text-gray-400">
                    {customFeatures?.security?.description || t('features.security.description')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {customFeatures?.noWatermark?.title || t('features.noWatermark.title')}
                  </h3>
                  <p className="text-gray-400">
                    {customFeatures?.noWatermark?.description || t('features.noWatermark.description', { platform })}
                  </p>
                </div>
              </div>
            </div>

            {!customDescription && (
              <>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {t('description3')}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {t('description4')}
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {t('description5')}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
