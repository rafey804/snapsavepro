import type { Metadata } from 'next';
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
  title: 'Contact Us - Snap Save Pro Support | Video Downloader Help',
  description: 'Get help with Snap Save Pro video downloader. Contact our support team for technical issues, feature requests, or questions about downloading videos from TikTok, YouTube, Facebook, and more.',
  keywords: "contact snap save pro, video downloader support, customer service, technical support, help center, support email, contact us, video downloader help, tiktok downloader support, youtube downloader help, facebook downloader support, bug report, feature request, downloader issues, download help, video download support, snap save pro contact, email support, customer support, technical assistance",
  openGraph: {
    title: 'Contact Snap Save Pro Support | Video Downloader Help',
    description: 'Need help with video downloads? Contact our support team for assistance with TikTok, YouTube, Facebook downloads and more.',
    url: `${baseUrl}/${locale}/pages/contact`,
    siteName: 'Snap Save Pro',
    type: 'website',
    images: [
      {
        url: '/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Snap Save Pro Support',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Snap Save Pro Support',
    description: 'Get help with video downloads. Contact our support team for assistance.',
    images: ['/og-contact.png'],
  },
  alternates: {
    canonical: `${baseUrl}/en/pages/contact`,
      languages: {
        'en': `${baseUrl}/en/pages/contact`,
        'hi': `${baseUrl}/hi/pages/contact`,
        'zh': `${baseUrl}/zh/pages/contact`,
        'ur': `${baseUrl}/ur/pages/contact`,
        'x-default': `${baseUrl}/en/pages/contact`,
      },
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
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
