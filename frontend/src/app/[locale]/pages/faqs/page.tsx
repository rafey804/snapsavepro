'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Download,
  Shield,
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
  Star,
  TrendingUp,
  Award
} from 'lucide-react';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof faqData>('general');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index: string) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const categories = [
    { id: 'general' as const, name: 'General Questions', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'download' as const, name: 'Download Process', icon: <Download className="h-5 w-5" /> },
    { id: 'quality' as const, name: 'Video Quality', icon: <FileVideo className="h-5 w-5" /> },
    { id: 'audio' as const, name: 'Audio & MP3', icon: <Music className="h-5 w-5" /> },
    { id: 'technical' as const, name: 'Technical Issues', icon: <Monitor className="h-5 w-5" /> },
    { id: 'legal' as const, name: 'Legal & Safety', icon: <Shield className="h-5 w-5" /> },
    { id: 'platforms' as const, name: 'Platforms', icon: <Globe className="h-5 w-5" /> },
    { id: 'features' as const, name: 'Features', icon: <Star className="h-5 w-5" /> }
  ];

  const faqData = {
    general: [
      {
        question: "Is Snap Save Pro completely free to use?",
        answer: "Yes, our service is completely free with no hidden costs or subscription fees. You can download as many videos as you need in various quality options (4K, 1080p, 720p) without paying anything. We also offer MP3 audio extraction at no charge.",
        keywords: "free, no cost, unlimited downloads"
      },
      {
        question: "Do I need to register or create an account?",
        answer: "No registration is required. Simply paste your video URL, choose your preferred quality, and start downloading. We value your privacy and don't collect personal information or require email addresses.",
        keywords: "no registration, no account, anonymous"
      },
      {
        question: "Are there any daily download limits?",
        answer: "There are no daily limits. You can download as many videos as you need, whether that's 10 or 100 per day. We only ask that you use the service responsibly and respect content creators' rights.",
        keywords: "unlimited, no daily limit, bulk download"
      },
      {
        question: "What social media platforms are supported?",
        answer: "We support major platforms including TikTok (with watermark removal option), YouTube (including Shorts), Facebook (videos and Reels), Instagram, Pinterest, Snapchat, Reddit, and Twitter/X. Each platform offers different quality options based on the original upload.",
        keywords: "supported platforms, social media, multi-platform"
      },
      {
        question: "Can I use Snap Save Pro on my phone or tablet?",
        answer: "Yes, our service works on all devices and operating systems - Android, iOS, Windows, Mac, and Linux. It's optimized for mobile browsers like Chrome, Safari, and Firefox, so you can download videos on the go without installing any apps.",
        keywords: "mobile, android, iphone, tablet, cross-platform"
      },
      {
        question: "What makes Snap Save Pro different from other downloaders?",
        answer: "We offer several key advantages: support for 8+ major platforms in one tool, no registration requirements, unlimited free downloads, high-quality options up to 4K, fast processing speeds, MP3 audio extraction, and a mobile-friendly interface. Most importantly, we prioritize user privacy and don't track your downloads.",
        keywords: "advantages, benefits, unique features"
      }
    ],
    download: [
      {
        question: "How do I download TikTok videos without the watermark?",
        answer: "Open the TikTok app and find your video. Tap the Share button and copy the link. Then visit our website, paste the URL, and click Download. You'll see an option to remove the watermark - select this and choose your preferred quality (HD recommended). The clean video will download in seconds.",
        keywords: "tiktok, no watermark, remove watermark"
      },
      {
        question: "How long does it take to download a video?",
        answer: "Download times vary based on video length and quality. Short videos under 5 minutes typically take 30-60 seconds. Medium-length videos (5-20 minutes) usually download in 1-3 minutes. Longer videos or 4K content may take 5-15 minutes. Your internet speed also affects download time.",
        keywords: "download speed, processing time"
      },
      {
        question: "Where do downloaded videos get saved on my device?",
        answer: "Videos are automatically saved to your default Downloads folder. On Android, check the Files app. On iPhone/iPad, look in the Files app under Downloads. On Windows, it's typically C:\\Users\\YourName\\Downloads. On Mac, check the Finder Downloads folder. You can change this location in your browser settings.",
        keywords: "save location, file storage, downloads folder"
      },
      {
        question: "Can I download multiple videos at once?",
        answer: "Yes, you can download multiple videos simultaneously by opening several browser tabs. Each tab can process a different video. This is useful for batch downloads, though downloading one at a time may be slightly faster for individual videos.",
        keywords: "multiple downloads, batch download, concurrent"
      },
      {
        question: "How do I download Facebook videos and Reels?",
        answer: "On Facebook, find the video you want and click the three dots menu. Select 'Copy link', then come to our site and paste the URL. Click download and choose your quality (HD or SD). This works for regular videos, Reels, and even stories (before they expire after 24 hours).",
        keywords: "facebook, reels, stories"
      },
      {
        question: "What should I do if a download fails?",
        answer: "First, check your internet connection and verify the video URL is correct and public. Try selecting a different quality option like 720p. Clear your browser cache and cookies, or try a different browser (we recommend Chrome). If the problem persists, wait a few minutes and try again, as the issue may be temporary server congestion.",
        keywords: "download failed, error fix, troubleshooting"
      }
    ],
    quality: [
      {
        question: "What video quality options are available on Snap Save Pro?",
        answer: "We offer quality options from 4K down to 360p, depending on what the original video supports. Most videos are available in 1080p or 720p. The available quality depends on how the creator uploaded it - for example, most TikToks max out at 1080p, while YouTube can go up to 4K.",
        keywords: "quality options, HD, 4K"
      },
      {
        question: "Which video quality should I choose for TikTok, YouTube, and Facebook downloads?",
        answer: "For most people, 1080p is the sweet spot - it looks great and doesn't take forever to download. Choose 720p if you're on a slower connection or watching on your phone. Only go for 4K if you really need it, as the files are huge.",
        keywords: "best quality, recommended"
      },
      {
        question: "Why are some quality options not available for certain videos?",
        answer: "You can only download in the quality the video was originally uploaded. If someone posted a TikTok in 720p, you can't magically get it in 1080p. Platform limits matter too - TikTok maxes at 1080p while YouTube can go higher.",
        keywords: "missing quality, limitations"
      },
      {
        question: "What's the difference between MP4, WEBM, and MKV video formats?",
        answer: "Stick with MP4 - it works everywhere. WEBM and MKV can have better quality or compression, but some older devices won't play them. Unless you have a specific reason to use another format, MP4 is your safest bet.",
        keywords: "video formats, MP4"
      },
      {
        question: "How large are video files downloaded from TikTok, YouTube, and Facebook?",
        answer: "A typical 10-minute video in 1080p is around 150-300 MB. TikToks are much smaller since they're usually under a minute - expect 15-50 MB for most. 4K videos are massive (400-800 MB per 10 minutes), so make sure you have the space.",
        keywords: "file size, storage"
      },
      {
        question: "Can I download 4K videos from YouTube, TikTok, and other platforms?",
        answer: "YouTube is really the only platform where 4K is common. TikTok and Facebook max out at 1080p. If a YouTube video was uploaded in 4K, you'll see that option. Just remember 4K files are huge, so make sure you have fast internet and storage space.",
        keywords: "4K support, platforms"
      }
    ],
    audio: [
      {
        question: "How do I convert YouTube, TikTok videos to MP3 audio?",
        answer: "Just paste the video URL, click on the 'Audio' or 'MP3' tab, choose your quality, and download. It works with any video from any of our supported platforms and takes about 30-60 seconds to process.",
        keywords: "MP3 converter, extract audio"
      },
      {
        question: "What audio quality and bitrates are available for MP3 downloads?",
        answer: "We offer 320kbps, 256kbps, 192kbps, 128kbps, and 96kbps. Use 320kbps for music if quality matters to you, 192kbps for podcasts and voice content, or 128kbps if you need to save space. Higher bitrate means better quality but larger files.",
        keywords: "audio quality, bitrate"
      },
      {
        question: "Can I download music from TikTok, YouTube Music, and Spotify?",
        answer: "Yes for TikTok and YouTube - you can extract audio from any video. Spotify doesn't work since it's a streaming service, not videos. Always remember to respect copyright - only download music you have permission to use.",
        keywords: "music download, copyright"
      },
      {
        question: "Are there limits on MP3 audio downloads from videos?",
        answer: "Nope, no limits. Download as many MP3s as you want, completely free. The only limitation is the quality of the original audio in the video.",
        keywords: "unlimited, free"
      },
      {
        question: "What audio formats besides MP3 does Snap Save Pro support?",
        answer: "We support MP3, M4A, AAC, OGG, and WAV. MP3 is usually your best choice since it works on everything. The others might have slightly better quality or compression, but compatibility can be hit or miss.",
        keywords: "audio formats, compatibility"
      },
      {
        question: "How do I download TikTok sounds and trending audio?",
        answer: "Copy the link to any TikTok with the sound you want, paste it into our site, select the 'Audio' tab, and download. Choose 320kbps if you want the best quality. Great for saving trending sounds to use in your own videos.",
        keywords: "TikTok sounds, trending audio"
      }
    ],
    technical: [
      {
        question: "Which browsers work best with Snap Save Pro video downloader?",
        answer: "Any modern browser works fine - Chrome, Firefox, Safari, Edge, Opera, Brave, you name it. We recommend Chrome for the best experience, but honestly they all work great. Just make sure you're on a recent version.",
        keywords: "browser compatibility, Chrome"
      },
      {
        question: "Why do I get 'Video not available' or error messages?",
        answer: "Usually it means the video is private, deleted, or region-locked. Make sure the video is public and the URL is correct. Try a different quality like 720p, clear your browser cache, or wait a few minutes and try again.",
        keywords: "error messages, troubleshooting"
      },
      {
        question: "Does Snap Save Pro work with VPN and proxy services?",
        answer: "Yes, it works fine with VPNs. Actually, a VPN can help you access region-locked content. Just keep in mind that using a VPN might slow down your downloads depending on the server location.",
        keywords: "VPN compatible, proxy"
      },
      {
        question: "Can I use Snap Save Pro to download TikTok, YouTube playlists?",
        answer: "Right now you need to download videos one at a time. The workaround is to open multiple browser tabs and download several videos simultaneously. We're working on a batch playlist download feature - stay tuned!",
        keywords: "playlists, batch download"
      },
      {
        question: "What to do if downloads are slow or timing out?",
        answer: "Try choosing a lower quality like 720p instead of 4K. Close other tabs and downloads. If you're using a VPN, try disabling it. Make sure you have at least 5 Mbps internet speed for HD videos. Sometimes waiting a few minutes and trying again helps if servers are busy.",
        keywords: "slow download, timeout"
      },
      {
        question: "Is Snap Save Pro safe from viruses, malware, and ads?",
        answer: "Yes, it's completely safe. Everything runs in your browser - no software installation, no executable files, no malware. We use HTTPS encryption and don't collect your data. We keep ads minimal and never use intrusive pop-ups.",
        keywords: "safe, secure, no malware"
      }
    ],
    legal: [
      {
        question: "Is it legal to download videos from TikTok, YouTube, and Facebook?",
        answer: "It's complicated. Downloading for personal, offline viewing is generally okay, but you can't redistribute or monetize someone else's content without permission. You're responsible for respecting copyright laws. When in doubt, only download content you have permission to use or your own uploads.",
        keywords: "legal, copyright, personal use"
      },
      {
        question: "Does Snap Save Pro respect privacy and protect user data?",
        answer: "We take privacy seriously. We don't collect personal info, don't track what you download, don't require registration, and don't store any of your videos. Everything is processed temporarily and deleted immediately. Your downloads are completely private and anonymous.",
        keywords: "privacy, data protection, anonymous"
      },
      {
        question: "Can I download copyrighted content from TikTok and YouTube?",
        answer: "You can technically download anything that's public, but that doesn't mean you legally should. Copyrighted content requires permission from the creator. Downloading for personal use is typically overlooked, but commercial use or redistribution can get you in legal trouble. Always respect creators' rights.",
        keywords: "copyright, permissions"
      },
      {
        question: "Do you store or monitor videos I download from social media?",
        answer: "No, we don't store anything. Videos are processed in real-time and sent directly to your device. Once the download is complete, all data is immediately deleted from our servers. We have no record of what you download.",
        keywords: "no storage, privacy"
      },
      {
        question: "What are the Terms of Service and acceptable use policies?",
        answer: "Use our service for personal, non-commercial purposes only. Don't abuse the service with bots or scrapers. You're responsible for complying with copyright laws. You must be 13+ to use the service (18+ recommended). Read our full Terms and Privacy Policy for complete details.",
        keywords: "terms, acceptable use"
      },
      {
        question: "How does Snap Save Pro handle DMCA and copyright claims?",
        answer: "We comply with DMCA regulations. Since we don't store content, we can't 'take down' videos, but we respond to valid copyright claims. If you're a creator with concerns, contact us. We're just a tool provider - users are responsible for how they use it.",
        keywords: "DMCA, copyright claims"
      }
    ],
    platforms: [
      {
        question: "How do I download TikTok videos with Snap Save Pro?",
        answer: "Open TikTok, tap the Share button on the video, and copy the link. Then come to our site, paste the URL, and click download. You can choose to remove the watermark and pick your quality. The video downloads in seconds.",
        keywords: "TikTok, watermark removal"
      },
      {
        question: "How to download YouTube videos and shorts with Snap Save Pro?",
        answer: "Copy the YouTube URL from your address bar, paste it on our site, choose your quality (up to 4K), and download. It works for regular videos, Shorts, music videos, and even completed live streams. You can also extract just the audio as MP3.",
        keywords: "YouTube, Shorts, MP4"
      },
      {
        question: "How to download Facebook videos, reels, and stories?",
        answer: "Click the three dots on any Facebook video or Reel and select 'Copy link'. Paste it on our site and download in HD or SD. For stories, grab the link before they expire after 24 hours. Works with Watch videos, Marketplace videos, and group content too.",
        keywords: "Facebook, Reels, Stories"
      },
      {
        question: "How to save Pinterest videos and GIFs using Snap Save Pro?",
        answer: "Find the video or GIF on Pinterest, click the three dots menu, copy the link, and paste it on our site. We'll convert it to MP4 for you. Great for saving recipe videos, DIY tutorials, and inspiration content.",
        keywords: "Pinterest, GIFs"
      },
      {
        question: "Can I download Snapchat stories and spotlight videos?",
        answer: "You can download public Spotlight videos and public stories by copying the share link. Private snaps can't be downloaded - and that's a good thing for privacy. Remember that stories disappear after 24 hours, so grab them quickly.",
        keywords: "Snapchat, Spotlight"
      },
      {
        question: "How to download Reddit videos, GIFs, and v.redd.it links?",
        answer: "Copy the Reddit post URL or v.redd.it link, paste it on our site, and download. We'll include the audio if it has any. Works with all subreddits, including NSFW content (with age verification).",
        keywords: "Reddit, v.redd.it"
      },
      {
        question: "How to download Twitter/X videos and media?",
        answer: "Click the share icon on any tweet with video, select 'Copy link to Tweet', paste it on our site, choose your quality, and download. Works with both Twitter.com and X.com links, including GIFs and quoted tweets with video.",
        keywords: "Twitter, X platform"
      },
      {
        question: "Which platform offers best video quality for downloads?",
        answer: "YouTube has the best quality, going up to 4K. TikTok and Facebook max out at 1080p, which is still great. Pinterest, Reddit, and Twitter are usually 720p-1080p. Quality varies by platform and how the creator uploaded it.",
        keywords: "quality comparison, 4K"
      }
    ],
    features: [
      {
        question: "What makes Snap Save Pro different from other video downloaders?",
        answer: "We support 8+ platforms in one tool (most others only do 1-2), offer watermark removal for TikTok, go up to 4K on YouTube, extract MP3 audio, and it's all free with no registration. Plus we actually care about your privacy and keep the interface clean without annoying pop-ups.",
        keywords: "advantages, multi-platform, free"
      },
      {
        question: "Does Snap Save Pro offer batch download or bulk download features?",
        answer: "Not yet, but you can open multiple browser tabs to download several videos at once. We're working on a proper batch download feature for playlists and bulk URLs - it's coming soon!",
        keywords: "batch download, multiple"
      },
      {
        question: "Can I download TikTok videos without watermark on mobile phone?",
        answer: "Yes! Just open your mobile browser (Chrome on Android or Safari on iPhone), visit our site, paste the TikTok link, and select the 'No Watermark' option. It works just as well on phones as it does on computers. No app installation needed.",
        keywords: "mobile, watermark removal"
      },
      {
        question: "What video formats and file types does Snap Save Pro support?",
        answer: "We support MP4, WEBM, MKV, and AVI for video. For audio, we have MP3, M4A, AAC, OGG, and WAV. Stick with MP4 for video and MP3 for audio - they work everywhere. The other formats are available if you need them for specific reasons.",
        keywords: "formats, MP4, MP3"
      },
      {
        question: "Is there a Snap Save Pro app for Android and iOS?",
        answer: "No app needed - just use your mobile browser. This is actually better because there's no installation, no storage space wasted, and you're always using the latest version. If you want quick access, add our website to your home screen and it'll work like an app.",
        keywords: "mobile, no app, web-based"
      },
      {
        question: "Can I edit or trim videos before downloading?",
        answer: "We don't have built-in editing - we focus on fast, reliable downloads. Download the full video first, then use a free editor like CapCut, InShot (mobile), iMovie (iPhone), or DaVinci Resolve (PC) to trim or edit it.",
        keywords: "editing, trimming"
      },
      {
        question: "How do I download private or restricted videos from TikTok?",
        answer: "You can't download private videos - that's by design to respect privacy. We only work with public content. If you want to download from a private account, ask the creator to make it public or download your own content directly from the platform.",
        keywords: "private videos, limitations"
      },
      {
        question: "What are the system requirements to use Snap Save Pro?",
        answer: "Pretty much nothing. If you can browse the web, you can use our service. Any modern browser, any operating system (Windows, Mac, Android, iPhone, Linux), at least 2GB RAM, and an internet connection. That's it.",
        keywords: "requirements, compatibility"
      }
    ]
  };

  // Filter FAQs based on search query
  const filterFAQs = () => {
    if (!searchQuery.trim()) return faqData[activeCategory];
    
    return faqData[activeCategory].filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const stats = [
    { icon: <Users className="h-6 w-6" />, number: "10k+", label: "Active Users" },
    { icon: <Star className="h-6 w-6" />, number: "4.9/5", label: "User Rating" },
    { icon: <Download className="h-6 w-6" />, number: "5k+", label: "Videos Downloaded" },
    { icon: <Globe className="h-6 w-6" />, number: "8+", label: "Platforms Supported" }
  ];

  const filteredFAQs = filterFAQs();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* FAQPage Structured Data - Single Instance */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": Object.values(faqData).flat().map(faq => ({
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

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* SEO-Optimized Hero Section */}
          <header className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Snap Save Pro FAQ - Video Downloader Help
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Complete guide to downloading videos from TikTok, YouTube, Facebook, Pinterest, Snapchat, Reddit, and Twitter. 
              Find answers about HD video downloads, MP3 audio extraction, and troubleshooting.
            </p>
            
            {/* Enhanced Search Bar with SEO */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search: TikTok download, YouTube MP3, Facebook video, remove watermark..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  aria-label="Search FAQ questions"
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-gray-400 mt-2">
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </header>

          {/* Stats Section with SEO Keywords */}
          <section className="mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 text-center hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex justify-center mb-3 text-cyan-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Category Navigation with Keywords */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Browse FAQ Categories</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery('');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg scale-105'
                        : 'bg-slate-800/80 text-gray-300 hover:text-white hover:bg-slate-700/80 hover:scale-102'
                    }`}
                    aria-label={`View ${category.name} questions`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </button>
              ))}
            </div>
          </section>

          {/* SEO-Enhanced FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16" itemScope itemType="https://schema.org/FAQPage">
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <article key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden hover:border-cyan-500/30 transition-all duration-300" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <button
                      onClick={() => toggleFAQ(`${activeCategory}-${index}`)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-all duration-300"
                      aria-expanded={openFAQ === `${activeCategory}-${index}`}
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
                      <div className="px-6 pb-6 border-t border-slate-700/30" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <div className="pt-4">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line" itemProp="text">
                            {faq.answer}
                          </p>
                          {faq.keywords && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              <span className="text-xs text-gray-400 mr-2">Related:</span>
                              {faq.keywords.split(', ').map((keyword, keyIndex) => (
                                <span key={keyIndex} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full hover:bg-cyan-500/30 transition-colors">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
                  <p className="text-gray-300">Try different keywords or browse categories above</p>
                </div>
              )}
            </div>
          </section>

          {/* SEO-Enhanced Quick Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Pro Tips for Best Video Downloads
            </h2>
            <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              Expert tips to download TikTok, YouTube, and Facebook videos faster and in better quality
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-emerald-400" />
                  <h3 className="font-semibold text-white">Faster TikTok Downloads</h3>
                </div>
                <p className="text-gray-300 text-sm">Choose 720p instead of 1080p for 2x faster TikTok video downloads, especially on slower internet connections under 10 Mbps.</p>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <FileVideo className="h-6 w-6 text-cyan-400" />
                  <h3 className="font-semibold text-white">Best YouTube Quality</h3>
                </div>
                <p className="text-gray-300 text-sm">For YouTube videos, 1080p Full HD provides the perfect balance between video quality (sharp) and file size (manageable).</p>
              </div>
              
              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Music className="h-6 w-6 text-purple-400" />
                  <h3 className="font-semibold text-white">MP3 Audio Quality</h3>
                </div>
                <p className="text-gray-300 text-sm">For MP3 downloads from TikTok or YouTube, use 320kbps for music, 192kbps for podcasts, and 128kbps for voice content.</p>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-orange-400" />
                  <h3 className="font-semibold text-white">Remove Watermarks</h3>
                </div>
                <p className="text-gray-300 text-sm">Always select &quot;No Watermark&quot; option when downloading TikTok videos to get clean videos without TikTok logo overlay.</p>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/20 hover:border-pink-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="h-6 w-6 text-pink-400" />
                  <h3 className="font-semibold text-white">Mobile Downloads</h3>
                </div>
                <p className="text-gray-300 text-sm">On mobile, add Snap Save Pro to home screen for quick access. Works like an app without installation on Android and iPhone.</p>
              </div>

              <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                  <h3 className="font-semibold text-white">Batch Downloads</h3>
                </div>
                <p className="text-gray-300 text-sm">Open multiple browser tabs to download several videos simultaneously from TikTok, YouTube, or Facebook at once.</p>
              </div>
            </div>
          </section>

          {/* Popular Searches Section for SEO */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Popular Searches</h2>
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "TikTok downloader no watermark",
                  "YouTube to MP3 converter",
                  "Facebook video downloader",
                  "Download TikTok videos",
                  "YouTube 4K downloader",
                  "Pinterest video saver",
                  "Reddit video download",
                  "Twitter video downloader",
                  "Instagram reels downloader",
                  "Snapchat video save",
                  "Download YouTube shorts",
                  "TikTok MP3 audio"
                ].map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(term)}
                    className="text-left px-4 py-2 bg-slate-900/50 hover:bg-cyan-500/20 text-gray-300 hover:text-cyan-300 rounded-lg transition-all text-sm border border-slate-700/30 hover:border-cyan-500/30"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section with SEO Keywords */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-12 border border-cyan-500/20 backdrop-blur-sm">
              <Award className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Still Have Questions About Video Downloads?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our FAQ is constantly updated with new questions about downloading from TikTok, YouTube, Facebook, and all supported platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download className="h-5 w-5" />
                  Start Downloading Videos Now
                </Link>
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700/50"
                >
                  <HelpCircle className="h-5 w-5" />
                  Read Our Blog & Guides
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
}