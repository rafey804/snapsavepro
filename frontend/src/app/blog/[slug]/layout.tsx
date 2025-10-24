import { getBlogBySlug } from '@/data/blogs';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Snap Save Pro',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${blog.title} | Snap Save Pro Blog`;
  const description = blog.description;
  const url = `https://snapsavepro.com/blog/${slug}`;

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
