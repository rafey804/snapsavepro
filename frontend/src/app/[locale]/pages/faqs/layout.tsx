import type { Metadata} from 'next';

export const metadata: Metadata = {
  title: 'FAQs - Snap Save Pro Video Downloader Questions Answered',
  description: 'Frequently asked questions about downloading videos from TikTok, YouTube, Facebook. Get answers about video quality, formats, safety, legal issues, and technical problems.',
  keywords: "video downloader faq, frequently asked questions, download questions, video download help, tiktok downloader faq, youtube download questions, facebook video faq, downloader help, common questions, video download issues, download troubleshooting, is downloader safe, is downloading legal, video quality questions, format questions, download problems, technical help, downloader guide, video save questions, download answers",
  openGraph: {
    title: 'FAQs - Video Downloader Questions Answered',
    description: 'Get answers to common questions about downloading videos from TikTok, YouTube, Facebook and more.',
    url: 'https://snapsavepro.com/pages/faqs',
    siteName: 'Snap Save Pro',
    type: 'website',
    images: [
      {
        url: '/og-faq.png',
        width: 1200,
        height: 630,
        alt: 'Frequently Asked Questions',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Downloader FAQs',
    description: 'Common questions about downloading videos answered.',
    images: ['/og-faq.png'],
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/faqs',
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

export default function FAQsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
