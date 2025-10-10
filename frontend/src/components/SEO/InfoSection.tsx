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
    emerald: 'from-emerald-500 to-teal-500'
  };

  const gradientClass = colorClasses[platformColor as keyof typeof colorClasses] || colorClasses.pink;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
        <h2 className={`text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientClass} mb-6`}>
          About {platform} Video Downloader
        </h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Snap Save Pro is the ultimate {platform} video downloader that allows you to download videos, reels, and stories from {platform} in high quality.
            Our advanced technology ensures that you get the best quality downloads without any watermarks or restrictions. Whether you want to save your
            favorite videos for offline viewing or create a collection of inspiring content, our tool makes it simple and fast.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Unlike other {platform} downloaders, Snap Save Pro doesn't require any software installation or registration. Simply paste the {platform} video URL,
            and our tool will instantly process it for download. We support all types of {platform} content including videos, reels, stories, and IGTV posts.
            Our servers are optimized for speed, ensuring that your downloads complete in seconds rather than minutes.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Download className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Multiple Quality Options</h3>
                <p className="text-gray-400">Choose from various quality options ranging from SD to Full HD and 4K. Download videos in the quality that best suits your needs and device capabilities.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Our advanced servers process {platform} videos instantly. No waiting, no delays - just paste the link and download within seconds.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">100% Safe & Secure</h3>
                <p className="text-gray-400">Your privacy is our priority. We don't store any downloaded videos or your personal information. All downloads are secure and encrypted.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center flex-shrink-0`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">No Watermarks</h3>
                <p className="text-gray-400">Download {platform} videos without watermarks. Get clean, professional downloads that are perfect for personal use or creative projects.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            Our {platform} downloader works on all devices including smartphones, tablets, and desktop computers. Whether you're using Android, iOS, Windows, or Mac,
            you can easily download {platform} videos with just a few clicks. The responsive design ensures optimal experience across all screen sizes and devices.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg mb-6">
            We understand the importance of content quality, which is why our tool preserves the original quality of {platform} videos. From crisp 4K videos to
            high-quality audio tracks, every download maintains the integrity of the original content. This makes Snap Save Pro ideal for content creators,
            marketers, educators, and anyone who values quality.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            Join millions of satisfied users who trust Snap Save Pro for their {platform} downloading needs. Our tool is completely free, with no hidden charges
            or premium restrictions. Download unlimited {platform} videos, create your offline collection, and enjoy your favorite content anytime, anywhere.
            Experience the best {platform} downloader today and see why users worldwide choose Snap Save Pro over other tools.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
