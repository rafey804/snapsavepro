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
      title: `Find the ${platform} video you want to download`,
      description: `Open ${platform} and navigate to the video, reel, or post you wish to download. Make sure the content is publicly accessible.`,
      icon: <LinkIcon className="w-6 h-6" />
    },
    {
      title: "Copy the video URL",
      description: `Click the share button on the ${platform} video and copy the link to your clipboard. You can also copy the URL directly from your browser's address bar.`,
      icon: <Copy className="w-6 h-6" />
    },
    {
      title: "Paste the URL in Snap Save Pro",
      description: `Return to our website and paste the copied ${platform} URL into the input box above. Our tool will automatically detect the platform.`,
      icon: <Download className="w-6 h-6" />
    },
    {
      title: "Download your video",
      description: `Click the "Get Video" button and wait for our tool to process the link. Once ready, choose your preferred quality and click download. The video will be saved to your device!`,
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const colorClasses = {
    pink: 'from-pink-500 to-purple-500',
    blue: 'from-blue-500 to-cyan-500',
    red: 'from-red-500 to-orange-500',
    purple: 'from-purple-500 to-pink-500',
    emerald: 'from-emerald-500 to-teal-500'
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
            Follow these simple steps to download any {platform} video, reel, or story in high quality.
            Our tool makes it easy and fast - no registration required!
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
        <h3 className="text-2xl font-bold text-white mb-4">Why Choose Snap Save Pro?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-2`}>
              Free & Unlimited
            </h4>
            <p className="text-gray-400 text-sm">
              Download as many videos as you want, completely free. No hidden charges or premium plans required.
            </p>
          </div>
          <div>
            <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-2`}>
              High Quality
            </h4>
            <p className="text-gray-400 text-sm">
              Get videos in the best available quality, including HD and 4K options. Preserve the original quality of your favorite content.
            </p>
          </div>
          <div>
            <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-2`}>
              No Watermarks
            </h4>
            <p className="text-gray-400 text-sm">
              Download {platform} videos without watermarks. Clean, professional downloads every time for personal or creative use.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
