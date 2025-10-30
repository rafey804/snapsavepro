# Next.js i18n Implementation Guide

## Overview

This project implements internationalization (i18n) using `next-intl` with support for 4 languages:
- **English (en)** - Default language
- **Hindi (hi)**
- **Chinese (zh)**
- **Urdu (ur)** - with RTL support

## Key Features

✅ **Auto-persist language** - Language selection is saved and persists across all pages
✅ **Cookie-based storage** - Language preference stored in browser cookies
✅ **SEO-friendly URLs** - `/en/page`, `/hi/page`, `/zh/page`, `/ur/page`
✅ **RTL support** - Automatic right-to-left layout for Urdu
✅ **TypeScript types** - Type-safe translation keys
✅ **Fallback to English** - Missing translations fall back to English

## Project Structure

```
frontend/
├── src/
│   ├── i18n/
│   │   ├── config.ts          # i18n configuration
│   │   └── request.ts         # next-intl request configuration
│   ├── middleware.ts          # Locale detection middleware
│   ├── app/
│   │   ├── [locale]/          # Dynamic locale routes
│   │   │   ├── layout.tsx     # Locale-aware layout
│   │   │   └── page.tsx       # Homepage
│   │   ├── layout.tsx         # Root layout (removed)
│   │   └── page.tsx           # Root redirect to default locale
│   ├── components/
│   │   └── layout/
│   │       ├── LanguageSwitcher.tsx  # Language selector
│   │       └── Header.tsx            # Updated with language switcher
│   ├── lib/
│   │   └── navigation.ts      # Locale-aware navigation utilities
│   └── types/
│       └── i18n.d.ts          # TypeScript type definitions
├── messages/
│   ├── en.json                # English translations
│   ├── hi.json                # Hindi translations
│   ├── zh.json                # Chinese translations
│   └── ur.json                # Urdu translations
├── global.d.ts                # Global type declarations
└── next.config.ts             # Next.js config with i18n plugin
```

## File Descriptions

### 1. Configuration Files

#### `src/i18n/config.ts`
Defines supported locales, default locale, RTL languages, and language names.

```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'hi', 'zh', 'ur'],
} as const;

export const rtlLocales: Locale[] = ['ur'];

export const languageNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  zh: '中文',
  ur: 'اردو',
};
```

#### `src/i18n/request.ts`
Configures next-intl to load translations based on locale.

#### `src/middleware.ts`
Handles:
- Locale detection from URL
- Automatic redirects to localized URLs
- Cookie-based language persistence
- RTL direction setting

### 2. Translation Files

Located in `messages/` directory:
- `en.json` - English (default)
- `hi.json` - Hindi
- `zh.json` - Chinese (Simplified)
- `ur.json` - Urdu

Each file contains nested JSON structure:
```json
{
  "header": {
    "downloaders": "Downloaders",
    "resources": "Resources",
    ...
  },
  "home": {
    "title": "TikTok Video Downloader...",
    ...
  }
}
```

### 3. Components

#### `components/layout/LanguageSwitcher.tsx`
A dropdown component that:
- Shows current language with native name
- Lists all available languages
- Saves selection to cookie
- Updates URL with new locale
- Refreshes page to apply changes

#### Updated `components/layout/Header.tsx`
Now includes the `<LanguageSwitcher />` component in the navigation bar.

### 4. Routing

#### `app/[locale]/layout.tsx`
- Wraps entire app with `NextIntlClientProvider`
- Sets `dir` attribute for RTL support
- Loads translations for current locale
- Validates locale parameter

#### `app/[locale]/page.tsx`
Example of using translations:
```typescript
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return <h1>{t('h1')}</h1>;
}
```

#### `app/page.tsx`
Root page that redirects to default locale (`/en`).

## How to Use Translations

### In Server Components

```typescript
import { useTranslations } from 'next-intl';

export default function ServerComponent() {
  const t = useTranslations('header');

  return (
    <nav>
      <a href="/blog">{t('blog')}</a>
      <a href="/contact">{t('contact')}</a>
    </nav>
  );
}
```

### In Client Components

Same as server components - `next-intl` works in both!

```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function ClientComponent() {
  const t = useTranslations('home');

  return <button>{t('downloadButton')}</button>;
}
```

### With Parameters

```typescript
const t = useTranslations('howTo');

// Translation: "How to Download {platform} Videos"
<h2>{t('title', { platform: 'TikTok' })}</h2>
```

### Accessing Nested Keys

```typescript
const t = useTranslations('downloaders.tiktok');

<h3>{t('name')}</h3>        // "TikTok Video Downloader"
<p>{t('description')}</p>   // "Download TikTok videos..."
```

## Navigation

### Using Locale-Aware Links

```typescript
import { Link } from '@/lib/navigation';

// Automatically maintains current locale
<Link href="/about">About</Link>
// If user is on /hi, this links to /hi/about
// If user is on /zh, this links to /zh/about
```

### Programmatic Navigation

```typescript
import { useRouter } from '@/lib/navigation';

const router = useRouter();

// Navigate to another page maintaining locale
router.push('/contact');
```

## URL Structure

All pages follow this pattern:
- English: `https://snapsavepro.com/en/`
- Hindi: `https://snapsavepro.com/hi/`
- Chinese: `https://snapsavepro.com/zh/`
- Urdu: `https://snapsavepro.com/ur/`

Visiting `https://snapsavepro.com/` automatically redirects to `/en/` (default locale).

## RTL Support

The Urdu locale automatically applies RTL layout:

```typescript
// In app/[locale]/layout.tsx
const isRTL = rtlLocales.includes(locale as Locale);
const direction = isRTL ? 'rtl' : 'ltr';

<html lang={locale} dir={direction}>
```

CSS automatically flips for RTL languages due to the `dir="rtl"` attribute.

## Cookie Persistence

Language selection is saved in a cookie named `NEXT_LOCALE`:

```typescript
document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
```

- Cookie expires after 1 year
- Cookie is accessible across all pages
- Middleware reads this cookie to determine user's preferred language

## TypeScript Support

Type-safe translations are achieved through:

1. **global.d.ts**
```typescript
type IntlMessages = typeof import('./messages/en.json');
```

2. **src/types/i18n.d.ts**
```typescript
interface IntlMessages extends Messages {}
```

This provides autocomplete and type checking for all translation keys.

## Adding New Languages

1. **Create translation file**
   ```
   messages/es.json  // Spanish
   ```

2. **Update i18n config**
   ```typescript
   // src/i18n/config.ts
   export const i18n = {
     defaultLocale: 'en',
     locales: ['en', 'hi', 'zh', 'ur', 'es'],  // Add 'es'
   };

   export const languageNames: Record<Locale, string> = {
     // ...
     es: 'Español',  // Add Spanish
   };
   ```

3. **Update middleware matcher**
   ```typescript
   // src/middleware.ts
   matcher: ['/', '/(en|hi|zh|ur|es)/:path*', ...]
   ```

4. If RTL language, add to `rtlLocales` array in `src/i18n/config.ts`

## Adding New Translation Keys

1. **Add to English file first** (messages/en.json)
   ```json
   {
     "newSection": {
       "title": "New Section Title",
       "description": "Description text"
     }
   }
   ```

2. **Translate to all other languages**
   Update hi.json, zh.json, ur.json with translations

3. **Use in components**
   ```typescript
   const t = useTranslations('newSection');
   <h2>{t('title')}</h2>
   ```

## Testing

1. **Start dev server**
   ```bash
   npm run dev
   ```

2. **Test URLs**
   - `http://localhost:3003/` → Redirects to `/en/`
   - `http://localhost:3003/en/` → English version
   - `http://localhost:3003/hi/` → Hindi version
   - `http://localhost:3003/zh/` → Chinese version
   - `http://localhost:3003/ur/` → Urdu version (RTL)

3. **Test language switcher**
   - Click language dropdown in header
   - Select different language
   - Verify page updates
   - Navigate to different pages
   - Verify language persists

4. **Test cookie persistence**
   - Select a language
   - Close browser
   - Reopen and visit site
   - Should remember selected language

## Troubleshooting

### Translations not showing

1. Check translation key exists in all language files
2. Verify file path: `messages/{locale}.json`
3. Check JSON syntax is valid
4. Restart dev server

### Language not switching

1. Check middleware configuration
2. Verify locale in URL matches supported locales
3. Clear browser cookies and cache
4. Check browser console for errors

### RTL not working

1. Verify locale is in `rtlLocales` array
2. Check HTML has `dir="rtl"` attribute
3. Test CSS specificity (RTL overrides)

### Type errors

1. Run `npm run build` to regenerate types
2. Restart TypeScript server in VS Code
3. Verify global.d.ts and i18n.d.ts exist

## Best Practices

1. **Always add English first** - Use it as the base for all translations
2. **Keep keys consistent** - Use same structure across all language files
3. **Use meaningful key names** - `home.title` not `ht1`
4. **Group related translations** - Use nested objects
5. **Avoid hardcoded strings** - Always use translation keys
6. **Test all languages** - Don't assume translations work without testing
7. **Use locale-aware Links** - Import from `@/lib/navigation`
8. **Handle pluralization** - Use ICU message format when needed

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Test production build**
   ```bash
   npm start
   ```

3. **Environment variables**
   Ensure `NEXT_PUBLIC_SITE_URL` is set correctly

4. **SEO Considerations**
   - Each locale has its own URL
   - Sitemap should include all localized pages
   - Hreflang tags recommended for SEO
   - Set canonical URLs per locale

## Performance

- Translations are loaded per-page, not all at once
- Only current locale's translations are sent to client
- Static generation works with all locales
- Middleware is edge-compatible for fast redirects

## Summary

The implementation provides:
- ✅ 4 languages with easy addition of more
- ✅ Automatic language persistence via cookies
- ✅ SEO-friendly localized URLs
- ✅ RTL support for Urdu
- ✅ Type-safe translations
- ✅ Professional language switcher UI
- ✅ Fallback to English for missing translations
- ✅ Full TypeScript support

The language selected on ANY page persists automatically across the entire website!
