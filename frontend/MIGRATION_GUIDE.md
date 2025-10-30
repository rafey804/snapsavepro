# Migration Guide: Adding i18n to Existing Pages

## Quick Start

To migrate existing pages to the new i18n structure, follow these steps:

## Step 1: Move Pages to [locale] Directory

### Before:
```
src/app/pages/about/page.tsx
```

### After:
```
src/app/[locale]/pages/about/page.tsx
```

**Action:** Move all page directories under `src/app/[locale]/`

## Step 2: Update Imports

### Replace Next.js imports with locale-aware versions:

```typescript
// ❌ OLD
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// ✅ NEW
import { Link, useRouter, usePathname } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
```

## Step 3: Add Translation Keys

### Example: About Page

1. **Add translations to all language files:**

`messages/en.json`:
```json
{
  "about": {
    "title": "About Us",
    "description": "Learn more about our service",
    "mission": "Our mission is to provide...",
    "team": "Our Team"
  }
}
```

`messages/hi.json`:
```json
{
  "about": {
    "title": "हमारे बारे में",
    "description": "हमारी सेवा के बारे में और जानें",
    "mission": "हमारा मिशन है...",
    "team": "हमारी टीम"
  }
}
```

Repeat for `zh.json` and `ur.json`.

2. **Use translations in component:**

```typescript
// src/app/[locale]/pages/about/page.tsx
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <section>
        <h2>{t('team')}</h2>
        <p>{t('mission')}</p>
      </section>
    </div>
  );
}
```

## Step 4: Update Metadata

### For SEO, update page metadata with translations:

```typescript
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## Step 5: Update Links

### Replace hardcoded links with locale-aware links:

```typescript
// ❌ OLD
<Link href="/pages/contact">Contact Us</Link>

// ✅ NEW
import { Link } from '@/lib/navigation';

<Link href="/pages/contact">Contact Us</Link>
// Automatically becomes /en/pages/contact, /hi/pages/contact, etc.
```

## Example: Complete Page Migration

### Before (Old Structure):
```typescript
// src/app/pages/contact/page.tsx
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch with our support team</p>
      <form>
        <input type="text" placeholder="Your name" />
        <input type="email" placeholder="Your email" />
        <textarea placeholder="Your message"></textarea>
        <button>Send Message</button>
      </form>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
```

### After (New i18n Structure):
```typescript
// src/app/[locale]/pages/contact/page.tsx
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <form>
        <input type="text" placeholder={t('name')} />
        <input type="email" placeholder={t('email')} />
        <textarea placeholder={t('message')}></textarea>
        <button>{t('send')}</button>
      </form>
      <Link href="/">{t('backToHome')}</Link>
    </div>
  );
}
```

## Common Patterns

### 1. Dynamic Content with Parameters

```typescript
const t = useTranslations('howTo');

// Translation: "How to download {platform} videos"
<h2>{t('title', { platform: 'TikTok' })}</h2>
```

### 2. Lists and Arrays

```json
{
  "features": {
    "list": [
      "Fast downloads",
      "No watermark",
      "HD quality",
      "Free forever"
    ]
  }
}
```

```typescript
const t = useTranslations('features');

<ul>
  {['0', '1', '2', '3'].map((i) => (
    <li key={i}>{t(`list.${i}`)}</li>
  ))}
</ul>
```

### 3. Rich Text / HTML

```json
{
  "terms": {
    "content": "By using this service, you agree to our <strong>Terms</strong>"
  }
}
```

```typescript
const t = useTranslations('terms');

<p dangerouslySetInnerHTML={{ __html: t('content') }} />
// Or better: use next-intl's rich text support
```

### 4. Conditional Text

```typescript
const t = useTranslations('common');

<button>
  {isLoading ? t('loading') : t('submit')}
</button>
```

## Migrating Existing Components

### 1. Header/Navigation
Already updated with LanguageSwitcher ✅

### 2. Footer
```typescript
// components/layout/Footer.tsx
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer>
      <p>{t('description')}</p>
      <nav>
        <h3>{t('quickLinks')}</h3>
        <Link href="/pages/about">{t('about')}</Link>
        <Link href="/pages/contact">{t('contact')}</Link>
      </nav>
    </footer>
  );
}
```

### 3. Downloader Components

For existing downloader components, wrap user-facing text:

```typescript
// components/home/TiktokDownloader.tsx
'use client';
import { useTranslations } from 'next-intl';

export default function TiktokDownloader() {
  const t = useTranslations('home');

  return (
    <div>
      <input
        type="text"
        placeholder={t('pasteUrl')}
      />
      <button>
        {loading ? t('processing') : t('downloadButton')}
      </button>
    </div>
  );
}
```

## Bulk Migration Script

You can create a script to help migrate pages:

```typescript
// scripts/migrate-page.ts
import fs from 'fs';
import path from 'path';

const sourceDir = 'src/app/pages';
const targetDir = 'src/app/[locale]/pages';

// Copy pages to new location
fs.cpSync(sourceDir, targetDir, { recursive: true });

console.log('Pages copied to [locale] directory');
console.log('Remember to:');
console.log('1. Update imports');
console.log('2. Add translation keys');
console.log('3. Replace hardcoded strings');
```

## Testing Checklist

For each migrated page:

- [ ] Page accessible at `/en/page-url`
- [ ] Page accessible at `/hi/page-url`
- [ ] Page accessible at `/zh/page-url`
- [ ] Page accessible at `/ur/page-url` (check RTL)
- [ ] All text is translated
- [ ] No console errors
- [ ] Language switcher works
- [ ] Navigation links work
- [ ] Forms work correctly
- [ ] SEO metadata is localized

## Priority Migration Order

1. **High Priority** (User-facing pages)
   - Homepage ✅
   - Contact page
   - About page
   - FAQ page
   - How It Works page

2. **Medium Priority** (Feature pages)
   - All downloader pages
   - Blog pages
   - Terms & Privacy

3. **Low Priority** (Admin/Special pages)
   - Error pages
   - Admin pages

## Common Issues & Solutions

### Issue: "Cannot find module '@/lib/navigation'"
**Solution:** Ensure `src/lib/navigation.ts` exists with proper exports

### Issue: Translation not found
**Solution:**
1. Check spelling of translation key
2. Verify key exists in all language files
3. Restart dev server

### Issue: Links don't maintain locale
**Solution:** Use `Link` from `@/lib/navigation`, not `next/link`

### Issue: Page not found after migration
**Solution:**
1. Verify page is in `src/app/[locale]/` directory
2. Check file naming (page.tsx, not Page.tsx)
3. Clear `.next` folder and rebuild

## Quick Reference

### Import Statements
```typescript
// Translations
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server'; // for metadata

// Navigation
import { Link, useRouter, usePathname } from '@/lib/navigation';

// Config
import { i18n, type Locale } from '@/i18n/config';
```

### Common Translation Patterns
```typescript
const t = useTranslations('namespace');

// Simple
{t('key')}

// With parameters
{t('key', { variable: 'value' })}

// Nested
{t('section.subsection.key')}

// With defaults (fallback if missing)
{t('key', { default: 'Fallback text' })}
```

## Need Help?

Refer to:
- `I18N_IMPLEMENTATION.md` - Full implementation details
- `messages/en.json` - Example translation structure
- `src/app/[locale]/page.tsx` - Example migrated page
- `components/layout/LanguageSwitcher.tsx` - Language selector example

## Summary

Migration steps:
1. Move pages to `[locale]` directory
2. Update imports to use `@/lib/navigation`
3. Add translation keys to all language files
4. Replace hardcoded strings with `t('key')`
5. Test in all languages
6. Update metadata for SEO

That's it! Each page you migrate will automatically support all 4 languages with persistent language selection.
