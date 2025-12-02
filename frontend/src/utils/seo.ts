import { Metadata } from 'next';

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

export const locales = ['en', 'hi', 'zh', 'ur'];

export function constructMetadata({
  title,
  description,
  keywords,
  image = '/og-multi-platform-downloader.png',
  path,
  locale,
  noIndex = false
}: {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  path: string;
  locale: string;
  noIndex?: boolean;
}): Metadata {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Construct canonical URL for THIS locale
  const canonicalUrl = `${baseUrl}/${locale}${cleanPath === '/' ? '' : cleanPath}`;

  // Construct alternates for all locales
  const languages: Record<string, string> = {};
  locales.forEach(l => {
    languages[l] = `${baseUrl}/${l}${cleanPath === '/' ? '' : cleanPath}`;
  });
  
  // Add x-default (usually points to English)
  languages['x-default'] = `${baseUrl}/en${cleanPath === '/' ? '' : cleanPath}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'SnapSavePro',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@snapsavepro',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
