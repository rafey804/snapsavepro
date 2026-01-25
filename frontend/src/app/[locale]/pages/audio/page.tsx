import AudioDownloader from '@/components/home/Audio'
import HowToDownload from "@/components/SEO/HowToDownload";
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";

import AudioContentSection from "@/components/SEO/AudioContentSection";
import { audioInfo, audioFAQs, audioReviews } from "@/data/audioSEOData";
import { audioPageSEO } from "@/data/comprehensiveSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return constructMetadata({
    title: audioPageSEO.title,
    description: audioPageSEO.description,
    keywords: audioPageSEO.keywords.join(', '),
    image: audioPageSEO.ogImage,
    path: '/pages/audio',
    locale,
  });
}

const AudioPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", "name": audioPageSEO.h1, "description": audioPageSEO.description, "url": audioPageSEO.canonicalUrl, "mainEntity": { "@type": "SoftwareApplication", "name": "Video to MP3 Converter", "applicationCategory": "MultimediaApplication", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "6543" } } }) }} />
      <header className="sr-only"><h1>{audioPageSEO.h1}</h1></header>
      <AudioDownloader />
      <HowToDownload platform="Audio" platformColor="emerald" />

      <InfoSection
        platform="Audio"
        platformColor="emerald"
        customTitle={audioInfo.title}
        customDescription={audioInfo.description}
        customFeatures={audioInfo.features}
      />

      <AudioContentSection />
      <FAQSection faqs={audioFAQs} platform="Audio" />
    </>
  );
}

export default AudioPage
