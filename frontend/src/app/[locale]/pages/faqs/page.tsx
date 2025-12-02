import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import { getTranslations } from 'next-intl/server';
import FaqPage from '@/components/pages/FaqPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.faq' });

  return constructMetadata({
    title: t('title', { default: 'FAQ - Frequently Asked Questions | SnapSavePro' }),
    description: t('description', { default: 'Find answers to common questions about downloading videos from TikTok, YouTube, Facebook, and more with SnapSavePro.' }),
    path: '/pages/faqs',
    locale,
  });
}

export default function Page() {
  return <FaqPage />;
}