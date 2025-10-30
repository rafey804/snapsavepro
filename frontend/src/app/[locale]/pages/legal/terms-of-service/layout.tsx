import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Snap Save Pro Video Downloader',
  description: 'Read Snap Save Pro terms of service. Understand the rules and guidelines for using our multi-platform video downloader. Fair use, legal compliance, and user responsibilities.',
  keywords: "terms of service, terms and conditions, user agreement, service terms, usage terms, terms of use, legal terms, service agreement, user terms, conditions of use, terms policy, usage policy, service rules, legal agreement, user guidelines",
  openGraph: {
    title: 'Terms of Service - Snap Save Pro',
    description: 'Terms and conditions for using our video downloader service.',
    url: 'https://snapsavepro.com/pages/legal/terms-of-service',
    siteName: 'Snap Save Pro',
    type: 'website',
    images: [
      {
        url: '/og-terms.png',
        width: 1200,
        height: 630,
        alt: 'Terms of Service',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Snap Save Pro',
    description: 'Service terms and user guidelines.',
    images: ['/og-terms.png'],
  },
  alternates: {
    canonical: 'https://snapsavepro.com/pages/legal/terms-of-service',
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

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
