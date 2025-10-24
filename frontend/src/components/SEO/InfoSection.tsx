'use client';
import React from 'react';
import { CheckCircle, Shield, Zap, Download } from 'lucide-react';

interface InfoSectionProps {
  platform: string;
  platformColor?: string;
}

export default function InfoSection({ platform, platformColor = 'pink' }: InfoSectionProps) {
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
          Download {platform} Videos
        </h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Our {platform} downloader is the most reliable tool available.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Get high-quality downloads from {platform} instantly.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Multiple Quality Options</h3>
                <p className="text-gray-400">Choose from various quality options to suit your needs.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast Downloads</h3>
                <p className="text-gray-400">Download {platform} videos in seconds.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Safe & Secure</h3>
                <p className="text-gray-400">Your data is encrypted and never stored on our servers.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">No Watermarks</h3>
                <p className="text-gray-400">Get clean {platform} videos without any watermarks.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Compatible with all devices and operating systems.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We preserve the original quality of your downloads.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            Start downloading now and enjoy your content offline!
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
