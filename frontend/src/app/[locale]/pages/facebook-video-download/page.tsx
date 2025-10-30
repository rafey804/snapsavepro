import FacebookDownloader from '@/components/home/FacebookDnwload'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import ReviewsSection from "@/components/SEO/ReviewsSection";
import PlatformContentSection from "@/components/SEO/PlatformContentSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { facebookFAQs, facebookReviews } from "@/data/pageSEOData";
import { facebookPageSEO } from "@/data/comprehensiveSEOData";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";

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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/pages/facebook-video-download`,
      siteName: 'Snap Save Pro',
      images: [{ url: facebookPageSEO.ogImage, width: 1200, height: 630, alt: 'Facebook Video Downloader' }],
      locale: localeToOGLocale[locale] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [facebookPageSEO.ogImage],
      creator: '@snapsavepro',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/pages/facebook-video-download`,
      languages: {
        'en': `${baseUrl}/en/pages/facebook-video-download`,
        'hi': `${baseUrl}/hi/pages/facebook-video-download`,
        'zh': `${baseUrl}/zh/pages/facebook-video-download`,
        'ur': `${baseUrl}/ur/pages/facebook-video-download`,
        'x-default': `${baseUrl}/en/pages/facebook-video-download`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }},
  };
}

const FacebookPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": facebookPageSEO.h1, "description": facebookPageSEO.description, "url": facebookPageSEO.canonicalUrl, "mainEntity": { "@type": "SoftwareApplication", "name": "Facebook Video Downloader", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "5432" }}})}} />
      <header className="sr-only"><h1>{facebookPageSEO.h1}</h1></header>
      <Breadcrumb items={[{ label: "Facebook Video Downloader" }]} />
      <FacebookDownloader/>
      <HowToDownload platform="Facebook" platformColor="blue" />
      <InfoSection platform="Facebook" platformColor="blue" />
      <PlatformContentSection platform="facebook" platformColor="blue" />
      <FAQSection faqs={facebookFAQs} platform="Facebook" />
      <ReviewsSection reviews={facebookReviews} />
    </>
  );
}

export default FacebookPage
