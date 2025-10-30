import YouTubeMp3Downloader from '@/components/home/YouTubeMp3Downloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import AudioContentSection from "@/components/SEO/AudioContentSection";
import { audioFAQs, audioReviews } from "@/data/pageSEOData";
import type { Metadata } from "next";

// SEO Metadata for YouTube to MP3 Page - Optimized with Long-tail & Multilingual Keywords
export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter - Free Online YT Video to Audio Download 320kbps | Snap Save Pro',
  description: 'Convert YouTube videos to high-quality MP3 audio files instantly. Download YouTube music, songs, podcasts in 128kbps, 192kbps, 256kbps, 320kbps. Free online YouTube to MP3 converter without registration.',
  keywords: [
    // Primary English Keywords
    'youtube to mp3', 'youtube mp3 converter', 'youtube audio download', 'convert youtube to mp3', 'youtube mp3 downloader',

    // Long-tail English Keywords
    'youtube to mp3 converter online free', 'download youtube videos as mp3', 'youtube video to mp3 320kbps',
    'youtube music downloader mp3', 'convert youtube shorts to mp3', 'youtube audio extractor',
    'free youtube to mp3 converter without registration', 'youtube to mp3 high quality 320kbps',
    'best youtube mp3 converter 2025', 'youtube to mp3 no software needed', 'youtube song download mp3',
    'extract audio from youtube video', 'youtube music to mp3 download', 'youtube playlist to mp3',
    'youtube to mp3 320kbps online', 'convert yt to mp3 fast', 'youtube audio ripper',
    'download youtube audio only', 'youtube to mp3 converter mobile', 'yt mp3 downloader free',

    // Short Keywords
    'yt to mp3', 'yt mp3', 'youtube mp3', 'yt audio download', 'youtube song download',

    // Platform-specific
    'youtube shorts to mp3', 'youtube music mp3', 'youtube podcast download mp3',

    // Quality-specific
    'youtube to mp3 320kbps', 'youtube to mp3 256kbps', 'youtube to mp3 192kbps',
    'youtube to mp3 128kbps', 'high quality youtube mp3', 'hq youtube audio download',

    // Device-specific
    'youtube to mp3 android', 'youtube to mp3 iphone', 'youtube to mp3 mobile online',
    'youtube to mp3 pc', 'youtube to mp3 mac', 'youtube mp3 converter for mobile',

    // Feature-specific
    'youtube to mp3 fast converter', 'youtube to mp3 no ads', 'youtube to mp3 unlimited downloads',
    'youtube to mp3 batch download', 'youtube to mp3 no watermark'
  ],
  openGraph: {
    title: 'Free YouTube to MP3 Converter - Download YT Audio 320kbps',
    description: 'Convert YouTube videos to MP3 in 128-320kbps quality. Fast, free, no registration required. Download YouTube music, songs & podcasts instantly.',
    url: 'https://snapsavepro.com/pages/youtube-to-mp3',
    siteName: 'Snap Save Pro',
    images: [{ url: '/og-youtube-mp3.jpg', width: 1200, height: 630, alt: 'YouTube to MP3 Converter - Free Online YT Audio Downloader' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube to MP3 Converter - Download Audio 320kbps Free',
    description: 'Convert YouTube videos to high-quality MP3. 128-320kbps quality options. Fast & free converter.',
    images: ['/og-youtube-mp3.jpg'],
    creator: '@snapsavepro',
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/youtube-to-mp3',
    languages: {
      'en-US': 'https://snapsavepro.com/pages/youtube-to-mp3',
    }
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }},
};

const YouTubeMp3Page = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "YouTube to MP3 Converter - Free Online Audio Downloader 320kbps",
        "description": "Convert YouTube videos to high-quality MP3 audio files in 128kbps, 192kbps, 256kbps, 320kbps. Free online converter without registration.",
        "url": "https://snapsavepro.com/pages/youtube-to-mp3",
        "inLanguage": ["en-US"],
        "keywords": "youtube to mp3, youtube mp3 converter, youtube audio download, yt to mp3",
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": "YouTube to MP3 Converter - Snap Save Pro",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Web Browser, Android, iOS, Windows, Mac, Linux",
          "description": "Free online YouTube to MP3 converter supporting multiple audio quality options from 128kbps to 320kbps. Convert YouTube videos, shorts, and music to MP3 instantly.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "8234",
            "bestRating": "5",
            "worstRating": "1"
          },
          "featureList": [
            "Convert YouTube to MP3 320kbps",
            "Download YouTube music and songs",
            "YouTube Shorts to MP3",
            "Multiple quality options (128, 192, 256, 320 kbps)",
            "No registration required",
            "Unlimited downloads",
            "Fast conversion speed",
            "Mobile friendly",
            "No watermarks"
          ],
          "screenshot": "https://snapsavepro.com/og-youtube-mp3.jpg"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://snapsavepro.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "YouTube to MP3 Converter",
              "item": "https://snapsavepro.com/pages/youtube-to-mp3"
            }
          ]
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://snapsavepro.com/pages/youtube-to-mp3?url={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })}} />
      <header className="sr-only">
        <h1>YouTube to MP3 Converter - Free Online YT Video to Audio Download 320kbps</h1>
        <p>Convert YouTube videos, shorts, music to high-quality MP3 audio files. Download in 128kbps, 192kbps, 256kbps, 320kbps.</p>
      </header>
      <YouTubeMp3Downloader/>
      <HowToDownload platform="YouTube MP3" platformColor="red" />
      <InfoSection platform="YouTube MP3" platformColor="red" />
      <AudioContentSection />
      <FAQSection faqs={audioFAQs} platform="YouTube MP3" />
      <ReviewsSection reviews={audioReviews} />
    </>
  );
}

export default YouTubeMp3Page
