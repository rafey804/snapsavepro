'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

interface ContentSection {
  title: string;
  content?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PlatformSEOContent {
  mainTitle?: string;
  intro?: string;
  whatIs?: ContentSection;
  howItWorks?: ContentSection;
  benefits?: ContentSection;
  safety?: ContentSection;
  features?: {
    title?: string;
    list?: string[];
  };
  faqs?: {
    title?: string;
    items: FAQItem[];
  };
}

interface PlatformContentSectionProps {
  platform: string; // 'youtube', 'facebook', 'twitter', etc.
  platformColor?: string;
  content?: PlatformSEOContent;
}

export default function PlatformContentSection({
  platform,
  platformColor = 'blue',
  content
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
    },
    green: {
      gradient: 'from-green-400 to-emerald-500',
      border: 'border-green-500/20',
      text: 'text-green-400'
    },
    orange: {
      gradient: 'from-orange-400 to-red-500',
      border: 'border-orange-500/20',
      text: 'text-orange-400'
    },
    pink: {
      gradient: 'from-pink-400 to-rose-500',
      border: 'border-pink-500/20',
      text: 'text-pink-400'
    },
    yellow: {
      gradient: 'from-yellow-400 to-orange-500',
      border: 'border-yellow-500/20',
      text: 'text-yellow-400'
    },
    black: {
      gradient: 'from-gray-200 to-gray-400',
      border: 'border-gray-500/20',
      text: 'text-gray-400'
    }
  };

  const colors = colorClasses[platformColor as keyof typeof colorClasses] || colorClasses.blue;

  // Helper to get content either from prop or translation
  const getContent = (key: string, subKey?: string) => {
    if (content) {
      // logic to extract from content object maps generic keys to potential specific ones if needed
      // But wait, the content object structure matches the sections. 
      // We'll trust the props to match the shape.
      return null;
    }
    return t(`${key}${subKey ? '.' + subKey : ''}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
        <h2 className={`text-3xl font-bold text-white mb-6 bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
          {content?.mainTitle || t('mainTitle')}
        </h2>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-lg leading-relaxed">
            {content?.intro || t('intro')}
          </p>

          {/* How To Section */}
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{content?.howItWorks?.title || t('howTo.title')}</h3>
          {content?.howItWorks?.content ? (
            <div className="text-gray-300 whitespace-pre-line">{content.howItWorks.content}</div>
          ) : (
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>{t('howTo.step1')}</li>
              <li>{t('howTo.step2')}</li>
              <li>{t('howTo.step3')}</li>
              <li>{t('howTo.step4')}</li>
              <li>{t('howTo.step5')}</li>
            </ol>
          )}

          {/* Features Section */}
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{content?.features?.title || t('features.title')}</h3>
          {content?.features?.list ? (
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {content.features.list.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          ) : (
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
          )}

          {/* Benefits/Why Choose Section */}
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{content?.benefits?.title || t('whyChoose.title')}</h3>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {content?.benefits?.content || t('whyChoose.description')}
          </div>

          {/* Safety Section - Optional in TS version but good to have */}
          {content?.safety && (
            <>
              <h3 className="text-2xl font-bold text-white mt-8 mb-4">{content.safety.title}</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {content.safety.content}
              </div>
            </>
          )}

          {/* FAQ Section */}
          <h3 className="text-2xl font-bold text-white mt-8 mb-4">{content?.faqs?.title || t('faq.title')}</h3>

          <div className="space-y-4">
            {content?.faqs?.items ? (
              content.faqs.items.map((faq, idx) => (
                <div key={idx} className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
                  <h4 className="text-lg font-bold text-white mb-2">{faq.question}</h4>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))
            ) : (
              <>
                <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
                  <h4 className="text-lg font-bold text-white mb-2">{t('faq.q1.question')}</h4>
                  <p className="text-gray-300">{t('faq.q1.answer')}</p>
                </div>
                {/* ... other default FAQs ... */}
                <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
                  <h4 className="text-lg font-bold text-white mb-2">{t('faq.q2.question')}</h4>
                  <p className="text-gray-300">{t('faq.q2.answer')}</p>
                </div>
                <div className={`bg-slate-900/50 rounded-xl p-5 border ${colors.border}`}>
                  <h4 className="text-lg font-bold text-white mb-2">{t('faq.q3.question')}</h4>
                  <p className="text-gray-300">{t('faq.q3.answer')}</p>
                </div>
              </>
            )}
          </div>

          {/* Pro Tip - Only in translation version currently, or added to content? */}
          {!content && (
            <div className={`bg-gradient-to-r ${colors.gradient}/10 rounded-xl p-6 border ${colors.border} mt-8`}>
              <h4 className="text-xl font-bold text-white mb-3">{t('proTip.title')}</h4>
              <p className="text-gray-300">{t('proTip.description')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
