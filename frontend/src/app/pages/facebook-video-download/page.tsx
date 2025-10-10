import FacebookDownloader from '@/components/home/FacebookDnwload'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import { facebookFAQs, facebookReviews } from "@/data/pageSEOData";
import { facebookPageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";

// SEO Metadata for Facebook Downloader Page
export const metadata: Metadata = {
  title: facebookPageSEO.title,
  description: facebookPageSEO.description,
  keywords: facebookPageSEO.keywords,
  openGraph: {
    title: facebookPageSEO.title,
    description: facebookPageSEO.description,
    url: facebookPageSEO.canonicalUrl,
    siteName: 'Snap Save Pro',
    images: [{ url: facebookPageSEO.ogImage, width: 1200, height: 630, alt: 'Facebook Video Downloader' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: facebookPageSEO.title,
    description: facebookPageSEO.description,
    images: [facebookPageSEO.ogImage],
  },
  alternates: { canonical: facebookPageSEO.canonicalUrl },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }},
};

const FacebookPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": facebookPageSEO.h1, "description": facebookPageSEO.description, "url": facebookPageSEO.canonicalUrl, "mainEntity": { "@type": "SoftwareApplication", "name": "Facebook Video Downloader", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "5432" }}})}} />
      <header className="sr-only"><h1>{facebookPageSEO.h1}</h1></header>
      <FacebookDownloader/>
      <HowToDownload platform="Facebook" platformColor="blue" />
      <InfoSection platform="Facebook" platformColor="blue" />
      <FAQSection faqs={facebookFAQs} platform="Facebook" />
      <ReviewsSection reviews={facebookReviews} />
    </>
  );
}

export default FacebookPage
