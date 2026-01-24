import VideoToMP3Converter from '@/components/home/VideoToMP3Converter'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";
import { Music, FileVideo, Download, Settings, CheckCircle, Globe, Shield, Zap } from 'lucide-react';
import { videoToMp3Info, videoToMp3FAQs, videoToMp3Reviews } from "@/data/videoToMp3SEOData";

const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// SEO Metadata - Highly Optimized with Multilingual Keywords
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const keywordsList = [
    // Primary English Keywords
    'video to mp3', 'video to mp3 converter', 'convert video to mp3', 'video to audio converter', 'mp4 to mp3',
    'extract audio from video', 'video audio extractor', 'video to mp3 online', 'free video to mp3 converter',

    // Long-tail English Keywords
    'convert mp4 to mp3 online free', 'avi to mp3 converter', 'mkv to mp3 converter online', 'mov to mp3',
    'wmv to mp3 converter', 'flv to mp3 online', 'webm to mp3 converter', 'video to mp3 320kbps',
    'high quality video to mp3', 'video to mp3 converter online free no download', 'extract audio from video online',
    'convert video file to mp3', 'video to audio converter free', 'best video to mp3 converter 2025',
    'video to mp3 converter without watermark', 'video to mp3 fast converter', 'bulk video to mp3 converter',
    'video to mp3 converter for pc', 'video to mp3 android', 'video to mp3 iphone',
    'convert large video to mp3', 'video to mp3 no registration', 'video to mp3 unlimited size',

    // Hindi Keywords (हिंदी कीवर्ड)
    'वीडियो टू एमपी3', 'वीडियो को एमपी3 में बदलें', 'वीडियो से ऑडियो निकालें', 'एमपी4 टू एमपी3',
    'वीडियो ऑडियो कन्वर्टर', 'फ्री वीडियो टू एमपी3', 'ऑनलाइन वीडियो टू एमपी3 कन्वर्टर',
    'वीडियो से म्यूजिक एक्सट्रैक्ट करें', 'वीडियो को म्यूजिक में बदलें', 'हाई क्वालिटी एमपी3 कन्वर्टर',

    // Urdu Keywords (اردو مطلوبہ الفاظ)
    'ویڈیو ٹو ایم پی 3', 'ویڈیو کو ایم پی 3 میں تبدیل کریں', 'ویڈیو سے آڈیو نکالیں',
    'ایم پی 4 ٹو ایم پی 3 کنورٹر', 'آن لائن ویڈیو ٹو ایم پی 3', 'فری ویڈیو آڈیو کنورٹر',
    'ویڈیو سے میوزک نکالیں', 'ہائی کوالٹی ایم پی 3 کنورٹر',

    // Feature-specific
    'video to mp3 320kbps', 'video to mp3 256kbps', 'video to mp3 192kbps', 'video to mp3 128kbps',
    'video to mp3 high quality', 'video to mp3 batch converter', 'video to mp3 url',

    // Platform/Format specific
    'convert youtube video to mp3', 'convert facebook video to mp3', 'convert instagram video to mp3',
    'avi video to mp3', 'mkv video to mp3', 'mov video to mp3', 'wmv video to mp3',
    'mp4 video to audio', 'video format to mp3', 'all video formats to mp3',

    // Use-case specific
    'music video to mp3', 'lecture video to audio', 'podcast video to mp3', 'movie to mp3 audio',
    'video clip to mp3', 'video song to mp3', 'video background music extractor'
  ];

  return constructMetadata({
    title: 'Video to MP3 Converter - Free Online Video Audio Extractor | Convert MP4, AVI, MKV to MP3 320kbps',
    description: 'Convert any video to MP3 audio online free. Extract audio from MP4, AVI, MKV, MOV, WMV videos. High-quality 320kbps MP3 conversion. No software needed. Fast & secure video to MP3 converter.',
    keywords: keywordsList.join(', '),
    path: '/pages/video-to-mp3-converter',
    locale,
    image: '/og-video-to-mp3.jpg',
  });
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

const VideoToMP3Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  return (
    <div className="bg-white min-h-screen">
      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Video to MP3 Converter - Snap Save Pro",
          "description": "Free online video to MP3 converter. Extract audio from MP4, AVI, MKV, MOV, WMV videos. Convert to high-quality MP3 up to 320kbps. No software required.",
          "url": "https://snapsavepro.com/pages/video-to-mp3-converter",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser, Windows, Mac, Linux, Android, iOS",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "12847",
            "bestRating": "5",
            "worstRating": "1"
          },
          "featureList": [
            "Convert all video formats to MP3",
            "Support for MP4, AVI, MKV, MOV, WMV, FLV, WebM",
            "High-quality audio up to 320kbps",
            "URL and file upload conversion",
            "No file size limits (URL method)",
            "Fast conversion speed",
            "No registration required",
            "Mobile friendly",
            "Secure and private",
            "No watermarks"
          ]
        })
      }} />

      {/* Accessibility Header */}
      <header className="sr-only">
        <h1>Video to MP3 Converter - Free Online Video Audio Extractor</h1>
        <p>Convert any video format to high-quality MP3 audio. Extract audio from MP4, AVI, MKV, MOV, WMV videos.</p>
      </header>

      {/* Main Converter Component */}
      <VideoToMP3Converter />

      {/* Comprehensive SEO Content Section with White Background */}
      <section className="relative w-full px-4 py-16 bg-white">
        <article className="relative max-w-7xl mx-auto prose prose-lg max-w-none text-gray-900">
          {/* English Content */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-gradient">
              Professional Video to MP3 Converter - Extract High-Quality Audio from Any Video Format
            </h2>

            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              Welcome to the most advanced and user-friendly <strong className="text-purple-600">video to MP3 converter</strong> available online. Whether you need to extract audio from a music video, create an audiobook from video lectures, or save podcast audio, our powerful tool makes it effortless. Convert <strong className="text-pink-600">MP4 to MP3</strong>, <strong className="text-pink-600">AVI to MP3</strong>, <strong className="text-pink-600">MKV to MP3</strong>, and virtually any video format to high-quality audio files up to <strong className="text-purple-600">320kbps bitrate</strong>.
            </p>

            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-gray-900 flex items-center justify-center gap-3">
                <FileVideo className="h-9 w-9 text-purple-600" />
                What is Video to MP3 Conversion?
              </h3>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 text-center">
                Video to MP3 conversion is the process of <strong className="text-purple-600">extracting audio</strong> from video files and saving it as an MP3 audio file. This is incredibly useful when you only need the audio portion of a video - such as music, dialogue, podcasts, lectures, or interviews. Instead of storing large video files that consume significant storage space, you can convert them to compact MP3 files that maintain excellent audio quality while being much smaller in size.
              </p>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 text-center">
                Our <strong className="text-pink-600">online video to MP3 converter</strong> supports all popular video formats including MP4 (MPEG-4), AVI (Audio Video Interleave), MKV (Matroska Video), MOV (QuickTime), WMV (Windows Media Video), FLV (Flash Video), WebM, 3GP, and many more. You can convert videos from your computer, mobile device, or directly from video URLs on platforms like YouTube, Facebook, Instagram, TikTok, and Vimeo.
              </p>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mt-16 mb-10 text-gray-900 flex items-center justify-center gap-3">
              <Settings className="h-9 w-9 text-purple-600" />
              Key Features of Our Video to MP3 Converter
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 my-12 max-w-6xl mx-auto">
              <div className="group bg-white p-8 rounded-3xl border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <CheckCircle className="h-7 w-7 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Universal Format Support
                  </h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Convert any video format to MP3 - supports MP4, AVI, MKV, MOV, WMV, FLV, WebM, 3GP, MPG, MPEG, M4V, F4V, TS, and more. No format restrictions.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl border-2 border-pink-100 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <Music className="h-7 w-7 text-pink-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Premium Audio Quality
                  </h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Get studio-quality MP3 audio with 320kbps bitrate. Preserves every detail of the original sound for crystal-clear listening experience.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <Zap className="h-7 w-7 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Lightning Fast Conversion
                  </h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Advanced processing technology converts videos to MP3 in seconds. Real-time progress tracking keeps you informed throughout the process.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl border-2 border-pink-100 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform">
                    <Shield className="h-7 w-7 text-pink-600" />
                  </div>
                  <h4 className="font-bold text-xl text-gray-900">
                    Secure & Private
                  </h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  All conversions are encrypted and files are automatically deleted after processing. We never store, share, or access your content.
                </p>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mt-16 mb-10 text-gray-900 flex items-center justify-center gap-3">
                <Download className="h-9 w-9 text-purple-600" />
                How to Convert Video to MP3 - Step by Step Guide
              </h3>

              <ol className="space-y-6 text-lg md:text-xl text-gray-700 mb-12">
                <li className="pl-8 text-center">
                  <strong className="text-purple-600 text-xl">Step 1: Upload Your Video</strong><br />
                  <span className="text-gray-600">Select up to 5 video files from your device. Supports all popular formats like MP4, AVI, MKV, and more.</span>
                </li>
                <li className="pl-8 text-center">
                  <strong className="text-pink-600 text-xl">Step 2: Automatic Conversion</strong><br />
                  <span className="text-gray-600">Your videos are automatically converted to high-quality 320kbps MP3 format. Watch the progress in real-time.</span>
                </li>
                <li className="pl-8 text-center">
                  <strong className="text-pink-600 text-xl">Step 3: Download Your MP3 Files</strong><br />
                  <span className="text-gray-600">Once conversion is complete, all your MP3 files will download automatically with unique names. Enjoy your audio!</span>
                </li>
              </ol>
            </div>

            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-gray-900 flex items-center justify-center gap-3">
                <Globe className="h-9 w-9 text-purple-600" />
                Why Choose Our Video to MP3 Converter?
              </h3>

              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-center">
                Unlike other converters that limit features or require paid subscriptions, our tool offers <strong className="text-purple-600">100% free unlimited conversions</strong> with all premium features included. Here's what sets us apart:
              </p>

              <ul className="space-y-4 text-lg md:text-xl text-gray-700 mb-12 max-w-4xl mx-auto">
                <li className="flex items-center gap-4 justify-center">
                  <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
                  <span><strong className="text-purple-600">No Registration Required:</strong> Start converting immediately without creating an account.</span>
                </li>
                <li className="flex items-center gap-4 justify-center">
                  <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
                  <span><strong className="text-pink-600">Unlimited Conversions:</strong> Convert as many videos as you want with no limits.</span>
                </li>
                <li className="flex items-center gap-4 justify-center">
                  <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
                  <span><strong className="text-purple-600">No Watermarks:</strong> Your MP3 files are clean with no added branding.</span>
                </li>
                <li className="flex items-center gap-4 justify-center">
                  <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
                  <span><strong className="text-pink-600">Cross-Platform:</strong> Works on Windows, Mac, Linux, Android, iOS, and all browsers.</span>
                </li>
                <li className="flex items-center gap-4 justify-center">
                  <CheckCircle className="h-7 w-7 text-green-500 flex-shrink-0" />
                  <span><strong className="text-purple-600">Privacy Focused:</strong> Files are automatically deleted after conversion.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Hindi Content - Only show for Hindi locale */}
          {locale === 'hi' && (
            <div className="mb-16 border-t-4 border-purple-200 pt-12">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                वीडियो को MP3 में बदलें - फ्री ऑनलाइन वीडियो ऑडियो कन्वर्टर
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                हमारा <strong>वीडियो टू MP3 कन्वर्टर</strong> किसी भी वीडियो फॉर्मेट से हाई-क्वालिटी ऑडियो निकालने का सबसे आसान तरीका है। चाहे आप <strong>MP4 को MP3</strong> में बदलना चाहें, <strong>AVI को MP3</strong> में, या किसी अन्य वीडियो फॉर्मेट को, हमारा टूल सभी प्रकार के वीडियो को <strong>320kbps तक की क्वालिटी</strong> में कन्वर्ट कर सकता है।
              </p>

              <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                वीडियो टू MP3 कन्वर्टर की मुख्य विशेषताएं
              </h3>

              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>सभी वीडियो फॉर्मेट सपोर्ट:</strong> MP4, AVI, MKV, MOV, WMV, FLV, WebM और अन्य सभी वीडियो फॉर्मेट को MP3 में बदलें।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>हाई क्वालिटी ऑडियो:</strong> 128, 192, 256, या 320 kbps बिटरेट में ऑडियो प्राप्त करें। बेहतरीन साउंड क्वालिटी।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>तेज़ कन्वर्जन:</strong> मिनटों में अपने वीडियो को MP3 में बदलें। रियल-टाइम प्रोग्रेस ट्रैकिंग।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>पूरी तरह फ्री:</strong> बिना किसी लिमिट के अनलिमिटेड वीडियो कन्वर्ट करें। कोई रजिस्ट्रेशन नहीं चाहिए।</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>सुरक्षित और प्राइवेट:</strong> आपकी फाइलें एन्क्रिप्टेड हैं और कन्वर्जन के बाद ऑटोमैटिक डिलीट हो जाती हैं।</span>
                </li>
              </ul>

              <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-900">
                वीडियो को MP3 में कैसे बदलें - आसान स्टेप्स
              </h3>

              <ol className="space-y-4 text-lg text-gray-700 mb-8">
                <li className="pl-6">
                  <strong className="text-purple-600">स्टेप 1:</strong> "Upload File" या "From URL" विकल्प चुनें।
                </li>
                <li className="pl-6">
                  <strong className="text-purple-600">स्टेप 2:</strong> ऑडियो क्वालिटी सेलेक्ट करें (128, 192, 256, या 320 kbps)।
                </li>
                <li className="pl-6">
                  <strong className="text-purple-600">स्टेप 3:</strong> अपना वीडियो अपलोड करें या वीडियो URL पेस्ट करें।
                </li>
                <li className="pl-6">
                  <strong className="text-purple-600">स्टेप 4:</strong> "Convert to MP3" बटन पर क्लिक करें।
                </li>
                <li className="pl-6">
                  <strong className="text-purple-600">स्टेप 5:</strong> अपनी हाई-क्वालिटी MP3 फाइल डाउनलोड करें।
                </li>
              </ol>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                हमारा वीडियो टू MP3 कन्वर्टर मोबाइल, टैबलेट, कंप्यूटर सभी डिवाइस पर काम करता है। यूट्यूब, फेसबुक, इंस्टाग्राम, टिकटॉक की वीडियो को भी MP3 में बदल सकते हैं। बिल्कुल फ्री और बिना किसी सॉफ्टवेयर इंस्टॉल किए।
              </p>
            </div>
          )}

          {/* Urdu Content - Only show for Urdu locale */}
          {locale === 'ur' && (
            <div className="mb-16 border-t-4 border-purple-200 pt-12">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600" dir="rtl">
                ویڈیو کو MP3 میں تبدیل کریں - مفت آن لائن ویڈیو آڈیو کنورٹر
              </h2>

              <p className="text-xl text-gray-700 leading-relaxed mb-6" dir="rtl">
                ہمارا <strong>ویڈیو ٹو MP3 کنورٹر</strong> کسی بھی ویڈیو فارمیٹ سے ہائی کوالٹی آڈیو نکالنے کا سب سے آسان طریقہ ہے۔ چاہے آپ <strong>MP4 کو MP3</strong> میں تبدیل کرنا چاہیں، <strong>AVI کو MP3</strong> میں، یا کسی اور ویڈیو فارمیٹ کو، ہمارا ٹول تمام قسم کی ویڈیوز کو <strong>320kbps تک کی کوالٹی</strong> میں کنورٹ کر سکتا ہے۔
              </p>

              <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-900" dir="rtl">
                ویڈیو ٹو MP3 کنورٹر کی اہم خصوصیات
              </h3>

              <ul className="space-y-3 text-lg text-gray-700 mb-6" dir="rtl">
                <li className="flex items-start gap-3 flex-row-reverse">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>تمام ویڈیو فارمیٹس سپورٹ:</strong> MP4, AVI, MKV, MOV, WMV, FLV, WebM اور دیگر تمام ویڈیو فارمیٹس کو MP3 میں تبدیل کریں۔</span>
                </li>
                <li className="flex items-start gap-3 flex-row-reverse">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>ہائی کوالٹی آڈیو:</strong> 128, 192, 256, یا 320 kbps بِٹ ریٹ میں آڈیو حاصل کریں۔ بہترین آواز کی کوالٹی۔</span>
                </li>
                <li className="flex items-start gap-3 flex-row-reverse">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>تیز رفتار کنورژن:</strong> منٹوں میں اپنی ویڈیو کو MP3 میں تبدیل کریں۔ ریئل ٹائم پروگریس ٹریکنگ۔</span>
                </li>
                <li className="flex items-start gap-3 flex-row-reverse">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>مکمل طور پر مفت:</strong> بغیر کسی حد کے لامحدود ویڈیوز کنورٹ کریں۔ کوئی رجسٹریشن کی ضرورت نہیں۔</span>
                </li>
                <li className="flex items-start gap-3 flex-row-reverse">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>محفوظ اور پرائیویٹ:</strong> آپ کی فائلیں انکرپٹڈ ہیں اور کنورژن کے بعد خودکار طور پر ڈیلیٹ ہو جاتی ہیں۔</span>
                </li>
              </ul>

              <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-900" dir="rtl">
                ویڈیو کو MP3 میں کیسے تبدیل کریں - آسان قدم
              </h3>

              <ol className="space-y-4 text-lg text-gray-700 mb-8" dir="rtl">
                <li className="pr-6">
                  <strong className="text-purple-600">قدم 1:</strong> "Upload File" یا "From URL" آپشن منتخب کریں۔
                </li>
                <li className="pr-6">
                  <strong className="text-purple-600">قدم 2:</strong> آڈیو کوالٹی سلیکٹ کریں (128, 192, 256, یا 320 kbps)۔
                </li>
                <li className="pr-6">
                  <strong className="text-purple-600">قدم 3:</strong> اپنی ویڈیو اپ لوڈ کریں یا ویڈیو URL پیسٹ کریں۔
                </li>
                <li className="pr-6">
                  <strong className="text-purple-600">قدم 4:</strong> "Convert to MP3" بٹن پر کلک کریں۔
                </li>
                <li className="pr-6">
                  <strong className="text-purple-600">قدم 5:</strong> اپنی ہائی کوالٹی MP3 فائل ڈاؤن لوڈ کریں۔
                </li>
              </ol>

              <p className="text-lg text-gray-700 leading-relaxed mb-6" dir="rtl">
                ہمارا ویڈیو ٹو MP3 کنورٹر موبائل، ٹیبلٹ، کمپیوٹر تمام ڈیوائسز پر کام کرتا ہے۔ یوٹیوب، فیس بک، انسٹاگرام، ٹک ٹاک کی ویڈیوز کو بھی MP3 میں تبدیل کر سکتے ہیں۔ بالکل مفت اور بغیر کسی سافٹ ویئر انسٹال کیے۔
              </p>
            </div>
          )}
        </article>
      </section>

      {/* How to Download Section */}
      <HowToDownload platform="Video to MP3" platformColor="purple" />

      {/* Info Section */}
      <InfoSection
        platform="Video to MP3"
        platformColor="purple"
        customTitle={videoToMp3Info.title}
        customDescription={videoToMp3Info.description}
        customFeatures={videoToMp3Info.features}
      />

      {/* FAQ Section */}
      <FAQSection faqs={videoToMp3FAQs} platform="Video to MP3 Converter" />

      {/* Reviews Section */}
      <ReviewsSection reviews={videoToMp3Reviews} />
    </div>
  );
}

export default VideoToMP3Page
