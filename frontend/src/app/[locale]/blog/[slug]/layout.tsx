import { getBlogBySlug } from '@/data/blogs';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string; locale: string }>
  children: React.ReactNode
}

const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const blog = getBlogBySlug(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  if (!blog) {
    return {
      title: 'Blog Not Found | Snap Save Pro',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${blog.title} | Snap Save Pro Blog`;
  const description = blog.description;
  const url = `${baseUrl}/${locale}/blog/${slug}`;

  return {
    title,
    description,
    keywords: blog.tags,
    authors: [{ name: blog.author }],
    openGraph: {
      title,
      description,
      url,
      siteName: 'Snap Save Pro',
      locale: localeToOGLocale[locale] || 'en_US',
      type: 'article',
      publishedTime: blog.date,
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: `/og-blog-${blog.category.toLowerCase()}.png`,
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/og-blog-${blog.category.toLowerCase()}.png`],
      creator: '@snapsavepro',
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/en/blog/${slug}`,
        'hi': `${baseUrl}/hi/blog/${slug}`,
        'zh': `${baseUrl}/zh/blog/${slug}`,
        'ur': `${baseUrl}/ur/blog/${slug}`,
        'x-default': `${baseUrl}/en/blog/${slug}`,
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

export default function BlogLayout({ children }: Props) {
  return <>{children}</>;
}
