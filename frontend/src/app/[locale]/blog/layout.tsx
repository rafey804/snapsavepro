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
    title: 'Blog - Snap Save Pro | Video Download Tips & Guides',
    description: 'Read our blog for video download tips, guides, tutorials, and news. Learn about TikTok, YouTube, Facebook video downloading, best practices, and platform updates.',
    keywords: [
      'video download blog',
      'downloader tips',
      'download guides',
      'video tutorials',
      'tiktok tips',
      'youtube guides',
      'facebook tutorials',
      'download tricks',
      'video blog',
      'downloader news',
      'platform updates',
      'download how-to',
      'video guides',
      'social media tips',
      'downloader articles',
      'video download news',
      'tutorial blog',
      'download best practices',
      'video save tips',
      'downloader guides',
    ],
    openGraph: {
      title: 'Blog - Video Download Tips & Guides',
      description: 'Learn tips, tricks, and best practices for downloading videos from social media platforms.',
      url: `${baseUrl}/${locale}/blog`,
      siteName: 'Snap Save Pro',
      locale: localeToOGLocale[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-multi-platform-downloader.png',
          width: 1200,
          height: 630,
          alt: 'Snap Save Pro Blog',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Video Download Blog - Tips & Guides',
      description: 'Learn about video downloading from our blog.',
      images: ['/og-multi-platform-downloader.png'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'hi': `${baseUrl}/hi/blog`,
        'zh': `${baseUrl}/zh/blog`,
        'ur': `${baseUrl}/ur/blog`,
        'x-default': `${baseUrl}/en/blog`,
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
