import TikTokDownloader from '@/components/home/TiktokDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import RelatedTools from "@/components/common/RelatedTools";
import YouTubeUniqueContent from "@/components/SEO/YouTubeUniqueContent";
import { youtubeFAQs, youtubeReviews, youtubeInfo } from "@/data/youtubeSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

// SEO Metadata for YouTube Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: "YouTube Video Downloader - Free Download YouTube Videos in HD, MP4, MP3 | SnapSavePro",
    description: "Download YouTube videos for free in HD quality. Save YouTube videos as MP4, convert to MP3, download 1080p, 4K videos. Fast, free, and no registration required.",
    keywords: "youtube downloader, download youtube videos, youtube to mp4, youtube to mp3, youtube video download free, download youtube videos hd, youtube downloader 1080p, youtube downloader 4k, youtube video saver, save youtube videos, youtube mp4 converter, youtube mp3 converter, free youtube downloader, youtube video download online, youtube downloader no registration, youtube downloader free, youtube video download hd quality, download youtube shorts, youtube playlist downloader, youtube audio downloader",
    path: '/pages/youtube-downloader',
    locale,
    image: '/og-youtube-downloader.png',
  });
}

const YouTubePage = () => {
  return (
    <>
      {/* Schema.org structured data for YouTube Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "YouTube Video Downloader - Free HD Download",
            "description": "Download YouTube videos for free in HD quality. Save YouTube videos as MP4, convert to MP3, download 1080p, 4K videos.",
            "url": "https://snapsavepro.com/pages/youtube-downloader",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "YouTube Video Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "12547"
              },
              "featureList": [
                "Download YouTube videos in HD",
                "Convert YouTube to MP4",
                "Convert YouTube to MP3",
                "4K video support",
                "1080p HD downloads",
                "No registration required",
                "Fast download speed",
                "Free unlimited downloads"
              ]
            }
          })
        }}
      />

      {/* HowTo Schema for YouTube Download */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Download YouTube Videos",
            "description": "Learn how to download YouTube videos in HD quality using SnapSavePro",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Copy YouTube Video URL",
                "text": "Go to YouTube, find the video you want to download, and copy the video URL from the address bar",
                "position": 1
              },
              {
                "@type": "HowToStep",
                "name": "Paste URL",
                "text": "Paste the YouTube video URL into the SnapSavePro downloader input field",
                "position": 2
              },
              {
                "@type": "HowToStep",
                "name": "Choose Format and Download",
                "text": "Select your preferred format (MP4, MP3) and quality (4K, 1080p, 720p), then click download",
                "position": 3
              }
            ],
            "totalTime": "PT1M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            }
          })
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": youtubeFAQs?.slice(0, 10).map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            })) || []
          })
        }}
      />

      {/* VideoObject Schema Example */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "How to Download YouTube Videos Tutorial",
            "description": "Learn how to download YouTube videos in HD quality using Snap Save Pro. Simple, fast, and free video downloader.",
            "thumbnailUrl": "https://snapsavepro.com/og-youtube-downloader.png",
            "uploadDate": "2024-01-01",
            "duration": "PT2M",
            "contentUrl": "https://snapsavepro.com/pages/youtube-downloader",
            "embedUrl": "https://snapsavepro.com/pages/youtube-downloader",
            "publisher": {
              "@type": "Organization",
              "name": "Snap Save Pro",
              "logo": {
                "@type": "ImageObject",
                "url": "https://snapsavepro.com/icon.png"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>YouTube Video Downloader - Download YouTube Videos in HD, MP4, MP3</h1>
      </header>

      <TikTokDownloader />
      <HowToDownload platform="YouTube" platformColor="red" />

      <InfoSection
        platform="YouTube"
        platformColor="red"
        customTitle={youtubeInfo.title}
        customDescription={youtubeInfo.description}
        customFeatures={youtubeInfo.features}
        featureImage="/images/youtube-features.png"
      />

      <YouTubeUniqueContent />
      <FAQSection faqs={youtubeFAQs || []} platform="YouTube" />
      <RelatedTools exclude="youtube" />
    </>
  )
}

export default YouTubePage
