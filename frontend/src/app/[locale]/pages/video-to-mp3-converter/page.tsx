import VideoToMP3Converter from '@/components/home/VideoToMP3Converter'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import RelatedTools from "@/components/common/RelatedTools";

import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";
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

      {/* SEO Content Section */}
      <PlatformContentSection platform="videoToMp3" platformColor="purple" />

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

      {/* Related Tools Section */}
      <RelatedTools exclude="videoToMp3" />
    </div>
  );
}

export default VideoToMP3Page
