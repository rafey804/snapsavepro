import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n, rtlLocales, type Locale } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/Analytics';
import '../globals.css';
import type { Metadata } from 'next';

// Locale to OG locale mapping
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
  const t = await getTranslations({ locale, namespace: 'metadata.home' });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Rafey Ul Fin' }],
    creator: 'Rafey Ul Fin',
    publisher: 'Snap Save Pro',
    verification: {
      google: 'xjiCGcMml5ZC_vYg9emsUrFfDQ4gyKb7ErLdYcVv4gs',
      other: {
        'msvalidate.01': 'DD2808B3DE3ED9BBDE14483A464278E2',
        'google-adsense-account': 'ca-pub-8694080572387733',
      },
    },
    icons: {
      icon: '/favicon.ico',
    },
    themeColor: '#ec4899',
    appleWebApp: {
      capable: true,
      title: 'Snap Save Pro',
      statusBarStyle: 'black-translucent',
    },
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      locale: localeToOGLocale[locale] || 'en_US',
      url: `${baseUrl}/${locale}`,
      siteName: 'Snap Save Pro',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [
        {
          url: '/og-multi-platform-downloader.png',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: ['/twitter-multi-platform-downloader.png'],
      creator: '@snapsavepro',
    },
    alternates: {
      canonical: `${baseUrl}/en`,
      languages: {
        'en': `${baseUrl}/en`,
        'hi': `${baseUrl}/hi`,
        'zh': `${baseUrl}/zh`,
        'ur': `${baseUrl}/ur`,
        'x-default': `${baseUrl}/en`,
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

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!i18n.locales.includes(locale as Locale)) {
    notFound();
  }

  // Determine if the locale is RTL
  const isRTL = rtlLocales.includes(locale as Locale);
  const direction = isRTL ? 'rtl' : 'ltr';

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-593VWXRV"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
