import type { Metadata } from 'next';
import { constructMetadata } from "@/utils/seo";
import { getTranslations } from 'next-intl/server';
import ContactPage from '@/components/pages/ContactPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });

  return constructMetadata({
    title: t('title', { default: 'Contact Us - SnapSavePro Support' }),
    description: t('description', { default: 'Get help with video downloads, report issues, or contact our support team. We are here to help you 24/7.' }),
    path: '/pages/contact',
    locale,
  });
}

export default function Page() {
  return <ContactPage />;
}