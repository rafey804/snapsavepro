export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'hi', 'zh', 'ur'],
} as const;

export type Locale = (typeof i18n.locales)[number];

// RTL languages
export const rtlLocales: Locale[] = ['ur'];

// Language names in their native languages
export const languageNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  zh: '中文',
  ur: 'اردو',
};
