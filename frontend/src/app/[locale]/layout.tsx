import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { i18n, rtlLocales, type Locale } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/Analytics';
import '../globals.css';

// Locale to OG locale mapping
const localeToOGLocale: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  zh: 'zh_CN',
  ur: 'ur_PK',
};

// generateMetadata removed to prevent default canonical inheritance

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
