import AudioDownloader from '@/components/home/Audio'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import AudioContentSection from "@/components/SEO/AudioContentSection";
import { audioFAQs, audioReviews } from "@/data/pageSEOData";
import { audioPageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";

// SEO Metadata for Audio Converter Page
export const metadata: Metadata = {
  title: audioPageSEO.title,
  description: audioPageSEO.description,
  keywords: audioPageSEO.keywords,
  openGraph: {
    title: audioPageSEO.title,
    description: audioPageSEO.description,
    url: audioPageSEO.canonicalUrl,
    siteName: 'Snap Save Pro',
    images: [{ url: audioPageSEO.ogImage, width: 1200, height: 630, alt: 'Video to MP3 Converter' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: audioPageSEO.title,
    description: audioPageSEO.description,
    images: [audioPageSEO.ogImage],
  },
  alternates: { canonical: audioPageSEO.canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }},
};

const AudioPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": audioPageSEO.h1, "description": audioPageSEO.description, "url": audioPageSEO.canonicalUrl, "mainEntity": { "@type": "SoftwareApplication", "name": "Video to MP3 Converter", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "6543" }}})}} />
      <header className="sr-only"><h1>{audioPageSEO.h1}</h1></header>
      <AudioDownloader/>
      <HowToDownload platform="Audio" platformColor="emerald" />
      <InfoSection platform="Audio" platformColor="emerald" />
      <AudioContentSection />
      <FAQSection faqs={audioFAQs} platform="Audio" />
      <ReviewsSection reviews={audioReviews} />
    </>
  );
}

export default AudioPage
