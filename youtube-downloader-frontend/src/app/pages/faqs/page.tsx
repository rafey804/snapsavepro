'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Download, 
  Shield, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor, 
  FileVideo, 
  Music, 
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Zap,
  Users,
  Star
} from 'lucide-react';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof faqData>('general');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const categories = [
    { id: 'general' as const, name: 'General Questions', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'download' as const, name: 'Download Process', icon: <Download className="h-5 w-5" /> },
    { id: 'quality' as const, name: 'Video Quality', icon: <FileVideo className="h-5 w-5" /> },
    { id: 'audio' as const, name: 'Audio & MP3', icon: <Music className="h-5 w-5" /> },
    { id: 'technical' as const, name: 'Technical Issues', icon: <Monitor className="h-5 w-5" /> },
    { id: 'legal' as const, name: 'Legal & Safety', icon: <Shield className="h-5 w-5" /> }
  ];

  const faqData = {
    general: [
      {
        question: "Is your YouTube video downloader completely free to use?",
        answer: "Yes, our YouTube downloader is 100% free with no hidden costs, subscription fees, or premium plans. You can download unlimited YouTube videos in all available qualities including 4K, 1080p, 720p, and extract MP3 audio without paying anything.",
        keywords: "free youtube downloader, no cost, unlimited downloads"
      },
      {
        question: "Do I need to create an account or register to download YouTube videos?",
        answer: "No registration or account creation is required. Simply paste the YouTube URL, choose your preferred quality, and start downloading immediately. We believe in keeping the process simple and privacy-focused.",
        keywords: "no registration, no account, anonymous download"
      },
      {
        question: "How many YouTube videos can I download per day?",
        answer: "There are no daily limits on the number of YouTube videos you can download. You can download as many videos as you need, whether it's 10 videos or 100 videos per day. We only ask that you use our service responsibly.",
        keywords: "unlimited downloads, no daily limit, bulk download"
      },
      {
        question: "What YouTube URL formats are supported?",
        answer: "Our downloader supports all YouTube URL formats including: youtube.com/watch?v=, youtu.be/, youtube.com/embed/, and mobile YouTube links (m.youtube.com). You can also download from YouTube playlists and channels.",
        keywords: "youtube url formats, youtu.be, playlist download"
      },
      {
        question: "Does your downloader work on mobile devices?",
        answer: "Yes, our YouTube downloader is fully optimized for mobile devices including Android phones, iPhones, and tablets. The responsive design ensures a smooth experience across all screen sizes and mobile browsers.",
        keywords: "mobile youtube downloader, android, iphone, tablet"
      }
    ],
    download: [
      {
        question: "How long does it take to download a YouTube video?",
        answer: "Download times vary based on video length, quality, and your internet speed. Typically: Short videos (under 5 minutes) download in 30-60 seconds, Medium videos (5-20 minutes) take 1-3 minutes, Long videos (20+ minutes) may take 3-10 minutes. 4K videos take longer due to larger file sizes.",
        keywords: "download speed, download time, processing time"
      },
      {
        question: "Where are downloaded YouTube videos saved on my device?",
        answer: "Downloaded videos are automatically saved to your device's default download folder. On Windows: Downloads folder in User directory. On Mac: Downloads folder in Finder. On mobile: Downloads app or Files app. You can change the download location in your browser settings.",
        keywords: "download location, save location, file storage"
      },
      {
        question: "Can I download multiple YouTube videos simultaneously?",
        answer: "Yes, you can start multiple downloads at once. Our system supports concurrent downloads, allowing you to queue several videos for download simultaneously. However, downloading one at a time may result in faster individual download speeds.",
        keywords: "multiple downloads, batch download, concurrent download"
      },
      {
        question: "What happens if my download gets interrupted?",
        answer: "If your download is interrupted due to internet connection issues or browser closure, you can simply restart the download process. Our system doesn't currently support resume functionality, but you can re-initiate the download from the beginning.",
        keywords: "interrupted download, resume download, connection issues"
      },
      {
        question: "Why is my YouTube video download taking so long?",
        answer: "Slow downloads can be caused by: Large file size (4K/HD videos), Slow internet connection, High server load during peak hours, Browser or device performance issues. Try downloading in lower quality for faster speeds or try again during off-peak hours.",
        keywords: "slow download, download issues, performance problems"
      }
    ],
    quality: [
      {
        question: "What video qualities can I download from YouTube?",
        answer: "We support all YouTube video qualities: 4K Ultra HD (2160p) - Best quality for large screens, 1080p Full HD - Perfect balance of quality and size, 720p HD - Good for mobile and moderate file sizes, 480p/360p - Smaller files for basic viewing. Quality availability depends on the original video upload.",
        keywords: "video quality, 4k download, 1080p, 720p, HD video"
      },
      {
        question: "How do I choose the best video quality for my needs?",
        answer: "Choose based on your usage: 4K (2160p) - For large TVs, professional editing, maximum quality. 1080p - For computers, tablets, general viewing (recommended). 720p - For smartphones, limited storage, faster downloads. 480p - For slow internet, basic quality needs, minimal storage.",
        keywords: "best video quality, quality selection, video resolution"
      },
      {
        question: "Why are some video qualities not available for certain YouTube videos?",
        answer: "Video quality availability depends on the original upload quality from the creator. If a video was uploaded in 720p, higher qualities like 1080p or 4K won't be available. Some older videos may only have lower quality options available.",
        keywords: "quality availability, missing quality options, video limitations"
      },
      {
        question: "What's the difference between MP4 and WEBM video formats?",
        answer: "MP4 is the most compatible format, working on all devices and players. WEBM offers better compression (smaller file sizes) but may not work on older devices or software. We recommend MP4 for maximum compatibility unless you specifically need WEBM for size optimization.",
        keywords: "mp4 vs webm, video formats, file compatibility"
      },
      {
        question: "How large are the downloaded video files?",
        answer: "File sizes vary by quality and length: 4K (10 minutes) - 400-800MB, 1080p (10 minutes) - 150-300MB, 720p (10 minutes) - 75-150MB, 480p (10 minutes) - 50-100MB. Actual sizes depend on video content, frame rate, and compression.",
        keywords: "file size, video size, storage requirements"
      }
    ],
    audio: [
      {
        question: "How do I extract MP3 audio from YouTube videos?",
        answer: "To extract MP3 audio: 1) Paste the YouTube video URL, 2) Click on 'Audio Downloads (MP3)' tab, 3) Select your preferred audio quality, 4) Click download. The system will extract and convert the audio to MP3 format automatically.",
        keywords: "youtube to mp3, audio extraction, mp3 converter"
      },
      {
        question: "What audio qualities are available for MP3 downloads?",
        answer: "We offer multiple audio qualities: 320kbps - Highest quality, larger file size, 256kbps - High quality, balanced size, 192kbps - Good quality, moderate size, 128kbps - Standard quality, smaller size. Higher bitrates provide better audio quality but larger files.",
        keywords: "mp3 quality, audio bitrate, sound quality"
      },
      {
        question: "Can I download just the audio from music videos and podcasts?",
        answer: "Yes, our MP3 extraction feature works perfectly for music videos, podcasts, interviews, speeches, and any YouTube video with audio content. The extracted MP3 files maintain high audio quality and include metadata when available.",
        keywords: "music download, podcast download, audio only"
      },
      {
        question: "Are there any limitations on MP3 audio downloads?",
        answer: "MP3 downloads have the same freedom as video downloads - no daily limits, no registration required, and completely free. The only limitation is the original audio quality of the YouTube video itself.",
        keywords: "mp3 limitations, audio download limits"
      },
      {
        question: "What audio formats besides MP3 are supported?",
        answer: "Besides MP3, we also support: M4A - High quality audio format, OGG - Open source audio format, WEBM Audio - Web-optimized format. MP3 remains the most popular choice due to universal compatibility.",
        keywords: "audio formats, m4a, ogg, webm audio"
      }
    ],
    technical: [
      {
        question: "Which browsers work best with your YouTube downloader?",
        answer: "Our downloader works on all modern browsers: Chrome - Fully supported, fastest performance, Firefox - Fully supported, excellent compatibility, Safari - Fully supported on Mac and iOS, Edge - Fully supported on Windows. We recommend using the latest browser versions for best performance.",
        keywords: "browser compatibility, chrome, firefox, safari, edge"
      },
      {
        question: "Why am I getting 'Video not available' or error messages?",
        answer: "Common causes and solutions: Age-restricted videos - May not be downloadable, Private/Unlisted videos - Must be public, Geo-blocked content - Not available in your region, Live streams - Cannot download active streams, Invalid URL - Check the YouTube link format. Try refreshing and using a different video URL.",
        keywords: "error messages, video not available, download errors"
      },
      {
        question: "Does your downloader work with YouTube playlists?",
        answer: "Currently, our downloader processes individual videos. For playlists, you'll need to download each video separately by copying each video URL. We're working on playlist support for future updates.",
        keywords: "playlist download, multiple videos, batch processing"
      },
      {
        question: "Can I use your downloader with a VPN or proxy?",
        answer: "Yes, our YouTube downloader works with VPNs and proxy services. Using a VPN may actually help access geo-restricted content. However, connection speed through VPNs might affect download speeds.",
        keywords: "vpn support, proxy compatibility, geo restrictions"
      },
      {
        question: "What should I do if downloads keep failing?",
        answer: "Try these troubleshooting steps: 1) Check your internet connection, 2) Clear browser cache and cookies, 3) Try a different browser, 4) Disable browser extensions temporarily, 5) Check if the YouTube video is still available, 6) Try downloading a different video to test functionality.",
        keywords: "troubleshooting, download failures, technical support"
      }
    ],
    legal: [
      {
        question: "Is it legal to download YouTube videos for personal use?",
        answer: "Downloading YouTube videos exists in a legal gray area. Personal use downloads are generally considered acceptable, but you should: Only download content you have permission to use, Respect copyright laws and creator rights, Not redistribute or sell downloaded content, Follow YouTube's Terms of Service. Always consider supporting creators through official channels.",
        keywords: "legal download, copyright, personal use, terms of service"
      },
      {
        question: "How do you protect my privacy and data?",
        answer: "We prioritize user privacy: No personal data collection or storage, No download history tracking, No user accounts or registration required, Secure HTTPS connection for all transfers, No cookies beyond essential functionality. Your download activity remains completely private.",
        keywords: "privacy protection, data security, no tracking"
      },
      {
        question: "Is your YouTube downloader safe from malware and viruses?",
        answer: "Yes, our service is completely safe: No software installation required - runs entirely in your browser, No executable files or downloads from us, Malware-free environment regularly security tested, No ads or pop-ups that could contain malicious content, Clean, secure codebase with no hidden scripts.",
        keywords: "malware free, virus safe, secure download"
      },
      {
        question: "Can I get in trouble for downloading copyrighted YouTube videos?",
        answer: "Copyright laws vary by country, but generally: Personal use downloads are typically not prosecuted, Commercial use or redistribution can lead to legal issues, Always respect creator copyrights and Fair Use guidelines, Consider supporting creators through legitimate means. We recommend only downloading content you have permission to use.",
        keywords: "copyright issues, legal trouble, fair use"
      },
      {
        question: "Do you store or monitor the videos I download?",
        answer: "No, we do not store, monitor, or keep any record of your downloads: Videos are processed temporarily and immediately deleted, No download logs or user tracking, No storage of personal information or download history, Completely anonymous service. Your privacy is our priority.",
        keywords: "no storage, no monitoring, anonymous download"
      }
    ]
  };

  const stats = [
    { icon: <Users className="h-6 w-6" />, number: "2M+", label: "Questions Answered" },
    { icon: <Star className="h-6 w-6" />, number: "4.9", label: "Satisfaction Rating" },
    { icon: <Clock className="h-6 w-6" />, number: "24/7", label: "Available Support" },
    { icon: <CheckCircle className="h-6 w-6" />, number: "99%", label: "Issues Resolved" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Object.values(faqData).flat().slice(0, 10).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://downloaderpr.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "FAQ",
                "item": "https://downloaderpr.com/faq"
              }
            ]
          })
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Hero Section */}
          <header className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to all your questions about our free YouTube video downloader. 
              Learn how to download HD videos, extract MP3 audio, and resolve common issues.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQ questions..."
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </header>

          {/* Stats Section */}
          <section className="mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 text-center">
                  <div className="flex justify-center mb-3 text-cyan-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Category Navigation */}
          <section className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-slate-800/80 text-gray-300 hover:text-white hover:bg-slate-700/80'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16" itemScope itemType="https://schema.org/FAQPage">
            <div className="space-y-4">
              {faqData[activeCategory]?.map((faq, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden" itemScope itemType="https://schema.org/Question">
                  <button
                    onClick={() => toggleFAQ(`${activeCategory}-${index}`)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white pr-4 leading-relaxed" itemProp="name">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === `${activeCategory}-${index}` ? (
                        <ChevronUp className="h-5 w-5 text-cyan-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-cyan-400" />
                      )}
                    </div>
                  </button>
                  
                  {openFAQ === `${activeCategory}-${index}` && (
                    <div className="px-6 pb-6 border-t border-slate-700/30" itemScope itemType="https://schema.org/Answer">
                      <div className="pt-4">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line" itemProp="text">
                          {faq.answer}
                        </p>
                        {faq.keywords && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {faq.keywords.split(', ').map((keyword, keyIndex) => (
                              <span key={keyIndex} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Quick Tips Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Quick Tips for Best Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-emerald-400" />
                  <h3 className="font-semibold text-white">Faster Downloads</h3>
                </div>
                <p className="text-gray-300 text-sm">Choose 720p instead of 4K for faster download speeds, especially on slower internet connections.</p>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <FileVideo className="h-6 w-6 text-cyan-400" />
                  <h3 className="font-semibold text-white">Best Quality</h3>
                </div>
                <p className="text-gray-300 text-sm">For most users, 1080p Full HD provides the perfect balance between video quality and file size.</p>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <Music className="h-6 w-6 text-purple-400" />
                  <h3 className="font-semibold text-white">Audio Quality</h3>
                </div>
                <p className="text-gray-300 text-sm">For MP3 downloads, 320kbps provides the highest audio quality, while 192kbps offers good quality with smaller files.</p>
              </div>
            </div>
          </section>

          {/* Still Have Questions Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-12 border border-cyan-500/20 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our FAQ is constantly updated 
                based on user questions and feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  <HelpCircle className="h-5 w-5" />
                  How It Works Guide
                </a>
                <a 
                  href="/"
                  className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-slate-700/50"
                >
                  <Download className="h-5 w-5" />
                  Try Downloader Now
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
}