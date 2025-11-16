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
  title: 'Privacy Policy - Snap Save Pro Video Downloader',
  description: 'Read Snap Save Pro privacy policy. Learn how we protect your data when using our video downloader service. We respect your privacy and do not store personal information.',
  keywords: "privacy policy, data protection, user privacy, privacy terms, data security, personal information, privacy statement, data collection, privacy rights, user data, privacy practices, confidentiality, data privacy, privacy notice, privacy agreement",
  openGraph: {
    title: 'Privacy Policy - Snap Save Pro',
    description: 'Our commitment to protecting your privacy while using our video downloader service.',
    url: `${baseUrl}/${locale}/pages/legal/privacy-policy`,
    siteName: 'Snap Save Pro',
    type: 'website',
    images: [
      {
        url: '/og-privacy.png',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Snap Save Pro',
    description: 'Learn about our privacy practices and data protection.',
    images: ['/og-privacy.png'],
  },
  alternates: {
    canonical: `${baseUrl}/${locale}/pages/legal/privacy-policy`,
      languages: {
        'en': `${baseUrl}/en/pages/legal/privacy-policy`,
        'hi': `${baseUrl}/hi/pages/legal/privacy-policy`,
        'zh': `${baseUrl}/zh/pages/legal/privacy-policy`,
        'ur': `${baseUrl}/ur/pages/legal/privacy-policy`,
        'x-default': `${baseUrl}/en/pages/legal/privacy-policy`,
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

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
