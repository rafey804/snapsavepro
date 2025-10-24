'use client';
import React from 'react';
import { CheckCircle, Copy, Download, Link as LinkIcon } from 'lucide-react';

interface HowToDownloadProps {
  platform: string;
  platformColor?: string;
}

export default function HowToDownload({ platform, platformColor = 'pink' }: HowToDownloadProps) {
  const steps = [
    {
      title: `Copy ${platform} Link`,
      description: `Find and copy the link to your ${platform} video that you want to download`,
      icon: <LinkIcon className="w-6 h-6" />
    },
    {
      title: 'Paste the Link',
      description: `Paste the ${platform} video link into our downloader`,
      icon: <Copy className="w-6 h-6" />
    },
    {
      title: 'Choose Quality',
      description: `Select your desired video quality (up to 4K for ${platform})`,
      icon: <Download className="w-6 h-6" />
    },
    {
      title: 'Download Complete',
      description: 'Your video is ready to download without watermarks',
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

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
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-4`}>
            How to Download {platform} Videos
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Download {platform} videos in just 4 simple steps with the best quality
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center text-white shadow-lg`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass}`}>
                      STEP {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our {platform} Downloader?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-2`}>
                100% Free & Unlimited
              </h4>
              <p className="text-gray-400 text-sm">
                Download unlimited {platform} videos completely free, no premium required
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-2`}>
                High Quality Videos
              </h4>
              <p className="text-gray-400 text-sm">
                Download in the highest available quality up to 4K resolution
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-2`}>
                No Watermarks
              </h4>
              <p className="text-gray-400 text-sm">
                Remove watermarks and get clean {platform} videos without any branding
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
