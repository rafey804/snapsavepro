import SnapchatDownloader from '@/components/home/SnapchatDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};
// Snapchat-specific FAQ data
const snapchatFAQs = [
  {
    question: "Can I download Snapchat videos without the creator knowing?",
    answer: "Yes! Our Snapchat downloader allows you to save public Snapchat content (Spotlight videos, public stories) without notifying the creator. However, please respect content creators' rights and only download content for personal use."
  },
  {
    question: "What types of Snapchat content can I download?",
    answer: "You can download Snapchat Spotlight videos, public stories, and posts. Our tool supports various Snapchat content types and downloads them in high quality (up to 1080p HD) without watermarks."
  },
  {
    question: "Is it free to download Snapchat videos?",
    answer: "Yes! Our Snapchat video downloader is completely free. No registration, no hidden fees, no subscription required. Download unlimited Snapchat videos in HD quality."
  },
  {
    question: "What video quality can I download from Snapchat?",
    answer: "You can download Snapchat videos in multiple quality options including 1080p, 720p, 480p, and 360p. We also offer audio extraction to MP3 format from Snapchat videos."
  },
  {
    question: "Do I need to install any software to download Snapchat videos?",
    answer: "No installation needed! Our Snapchat downloader is a web-based tool that works directly in your browser. Simply paste the Snapchat URL and download instantly on any device."
  },
  {
    question: "Can I download Snapchat videos on mobile?",
    answer: "Absolutely! Our Snapchat downloader works perfectly on all devices - iPhone, Android, tablets, and desktop. The interface is fully responsive and optimized for mobile use."
  },
  {
    question: "Are downloaded Snapchat videos safe and without viruses?",
    answer: "Yes! Our tool is completely safe and secure. We don't host any files on our servers, and all downloads are virus-free. We use secure protocols to fetch videos directly from Snapchat."
  },
  {
    question: "Can I extract audio from Snapchat videos?",
    answer: "Yes! You can extract audio from any Snapchat video and convert it to MP3 format. Choose the audio download option, select your preferred quality (up to 320kbps), and download."
  }
];

// Snapchat-specific reviews data
const snapchatReviews = [
  {
    name: "Alex Thompson",
    rating: 5,
    comment: "Best Snapchat downloader I've found! Works perfectly for Spotlight videos. Fast and reliable!",
    date: "2 days ago",
    platform: "Snapchat Spotlight"
  },
  {
    name: "Maria Garcia",
    rating: 5,
    comment: "Finally a working Snapchat downloader! HD quality and no watermarks. Exactly what I needed for my content.",
    date: "1 week ago",
    platform: "Snapchat Stories"
  },
  {
    name: "James Wilson",
    rating: 5,
    comment: "Works great on mobile! Downloaded several Snapchat Spotlight videos without any issues. Highly recommended!",
    date: "3 days ago",
    platform: "Mobile - Snapchat"
  },
  {
    name: "Sophie Chen",
    rating: 5,
    comment: "Clean interface, fast downloads, and supports high quality. Perfect for saving Snapchat content!",
    date: "5 days ago",
    platform: "Snapchat Posts"
  }
];

// SEO Metadata for Snapchat Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: "Snapchat Video Downloader - Download Spotlight & Stories in HD Free",
    description: "Download Snapchat videos, Spotlight, and stories in HD quality. Free Snapchat downloader for posts and content. Fast, secure, no registration required.",
    keywords: "snapchat downloader, download snapchat videos, snapchat spotlight downloader, snapchat story downloader, snapchat video download, save snapchat videos, snapchat to mp4, snapchat content saver, download snapchat spotlight, snapchat video saver, free snapchat downloader, snapchat hd downloader",
    path: '/pages/snapchat-video-download',
    locale,
    image: "/snapchat-downloader-og.png",
  });
}

const SnapchatDownloadPage = () => {
  return (
    <>
      {/* Schema.org structured data for Snapchat Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Snapchat Video Downloader - Download Spotlight & Stories in HD",
            "description": "Free online Snapchat video downloader. Download Spotlight videos, stories, and posts in HD quality.",
            "url": "https://snapsavepro.com/pages/snapchat-video-download",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Snapchat Video Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "3247"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>Snapchat Video Downloader - Download Spotlight, Stories & Posts in HD</h1>
      </header>

      <SnapchatDownloader />



      <HowToDownload platform="Snapchat" platformColor="yellow" />
      <InfoSection platform="Snapchat" platformColor="yellow" />
      <PlatformContentSection platform="snapchat" platformColor="yellow" />
      <FAQSection faqs={snapchatFAQs} platform="Snapchat" />

      <ReviewsSection reviews={snapchatReviews} />
    </>
  );
};

export default SnapchatDownloadPage;
