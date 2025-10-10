import InstagramDownloader from '@/components/home/InstagramDownloader'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import { instagramPageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";

// SEO Metadata for Instagram Downloader Page
export const metadata: Metadata = {
  title: instagramPageSEO.title,
  description: instagramPageSEO.description,
  keywords: instagramPageSEO.keywords,
  openGraph: {
    title: instagramPageSEO.title,
    description: instagramPageSEO.description,
    url: instagramPageSEO.canonicalUrl,
    siteName: 'Snap Save Pro',
    images: [
      {
        url: instagramPageSEO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Instagram Video Downloader - Download Reels, Stories, Posts',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: instagramPageSEO.title,
    description: instagramPageSEO.description,
    images: [instagramPageSEO.ogImage],
  },
  alternates: {
    canonical: instagramPageSEO.canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const InstagramPage = () => {
  const instagramFAQs = [
    {
      question: "Can I download Instagram Reels without watermark?",
      answer: "Yes! Snap Save Pro allows you to download Instagram Reels without any watermark. Simply paste the Reel URL and download in HD quality completely free."
    },
    {
      question: "Is it safe to use Instagram video downloader?",
      answer: "Absolutely! Our Instagram downloader is 100% safe and secure. We don't store any videos or require login credentials, ensuring your privacy and security."
    },
    {
      question: "What quality options are available for Instagram downloads?",
      answer: "We offer multiple quality options including SD, HD, and Full HD (1080p). You can choose the quality that best suits your needs and device storage."
    },
    {
      question: "Can I download Instagram Stories?",
      answer: "Yes, you can download Instagram Stories using Snap Save Pro. Just copy the story link and paste it in our downloader to save it before it expires."
    },
    {
      question: "Do I need to install any software?",
      answer: "No installation required! Snap Save Pro is a web-based tool that works directly in your browser on any device - desktop, mobile, or tablet."
    },
    {
      question: "Is there a limit on Instagram downloads?",
      answer: "No limits! Download as many Instagram videos, reels, and stories as you want. Our service is completely free with unlimited downloads."
    }
  ];

  const instagramReviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Best Instagram downloader I've found! Downloads Reels in HD quality without any watermark. Super fast and easy to use.",
      date: "2 days ago",
      platform: "Instagram"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Perfect for saving inspiration! I use it daily to download Instagram videos for my content creation. Highly recommend!",
      date: "5 days ago",
      platform: "Instagram"
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      comment: "Great tool! Works flawlessly on mobile. Download Instagram stories before they disappear. Very useful!",
      date: "1 week ago",
      platform: "Instagram"
    },
    {
      name: "David Kim",
      rating: 5,
      comment: "Fantastic! No watermarks, no login required, just paste and download. Exactly what I needed for Instagram.",
      date: "1 week ago",
      platform: "Instagram"
    },
    {
      name: "Lisa Anderson",
      rating: 5,
      comment: "Love this downloader! Clean interface, fast downloads, and HD quality. Best Instagram tool out there!",
      date: "2 weeks ago",
      platform: "Instagram"
    },
    {
      name: "James Wilson",
      rating: 4,
      comment: "Excellent service! Download Instagram Reels in seconds. Works great on both phone and computer.",
      date: "2 weeks ago",
      platform: "Instagram"
    }
  ];

  return (
    <>
      {/* Schema.org structured data for Instagram Downloader */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": instagramPageSEO.h1,
            "description": instagramPageSEO.description,
            "url": instagramPageSEO.canonicalUrl,
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Instagram Video & Reels Downloader",
              "applicationCategory": "MultimediaApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "7821"
              }
            }
          })
        }}
      />

      {/* Main H1 Heading for SEO */}
      <header className="sr-only">
        <h1>{instagramPageSEO.h1}</h1>
      </header>

      <InstagramDownloader />
      <HowToDownload platform="Instagram" platformColor="purple" />
      <InfoSection platform="Instagram" platformColor="purple" />
      <FAQSection faqs={instagramFAQs} platform="Instagram" />
      <ReviewsSection reviews={instagramReviews} />
    </>
  );
}

export default InstagramPage
