import FacebookDownloader from '@/components/home/FacebookDnwload'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import FacebookUniqueContent from "@/components/SEO/FacebookUniqueContent";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { facebookFAQs, facebookReviews } from "@/data/pageSEOData";
import { facebookPageSEO } from "@/data/comprehensiveSEOData";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

// Locale to OG locale mapping
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// Dynamic SEO Metadata for Facebook Downloader Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.facebook' });

  return constructMetadata({
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    path: '/pages/facebook-video-download',
    locale,
    image: facebookPageSEO.ogImage,
  });
}

const FacebookPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": facebookPageSEO.h1, "description": facebookPageSEO.description, "url": facebookPageSEO.canonicalUrl, "mainEntity": { "@type": "SoftwareApplication", "name": "Facebook Video Downloader", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "5432" } } }) }} />
      <header className="sr-only"><h1>{facebookPageSEO.h1}</h1></header>
      <Breadcrumb items={[{ label: "Facebook Video Downloader" }]} />
      <FacebookDownloader />
      <HowToDownload platform="Facebook" platformColor="blue" />
      <InfoSection platform="Facebook" platformColor="blue" />
      <PlatformContentSection platform="facebook" platformColor="blue" />
      <FacebookUniqueContent />
      <FAQSection faqs={facebookFAQs} platform="Facebook" />
      <ReviewsSection reviews={facebookReviews} />
    </>
  );
}

export default FacebookPage
