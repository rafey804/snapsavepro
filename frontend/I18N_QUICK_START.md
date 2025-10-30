# i18n Quick Start Guide

## 🚀 Quick Overview

Your Next.js app now supports **4 languages** with automatic persistence:
- 🇬🇧 English (en) - Default
- 🇮🇳 Hindi (hi)
- 🇨🇳 Chinese (zh)
- 🇵🇰 Urdu (ur) - RTL enabled

## ✅ What's Already Done

- ✅ next-intl installed and configured
- ✅ 4 language files created with comprehensive translations
- ✅ Middleware setup for locale detection
- ✅ Language switcher component in header
- ✅ SEO-friendly URLs (`/en/`, `/hi/`, `/zh/`, `/ur/`)
- ✅ Cookie-based language persistence
- ✅ RTL support for Urdu
- ✅ TypeScript types for translations
- ✅ Homepage migrated to i18n structure

## 🎯 How It Works

1. User visits your site → Redirected to `/en/` (default)
2. User selects language from dropdown → Cookie saved + URL updated
3. User navigates to any page → Language persists automatically
4. User closes browser and returns → Last selected language remembered

## 📝 Using Translations in Your Code

### In Any Component (Client or Server)

```typescript
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');

  return <h1>{t('title')}</h1>;
}
```

### Available Namespaces

Check `messages/en.json` for all available namespaces:
- `header` - Navigation, menu items
- `home` - Homepage content
- `downloaders` - All downloader names and descriptions
- `howTo` - How-to instructions
- `faq` - Frequently asked questions
- `contact` - Contact form
- `footer` - Footer content
- `common` - Common UI elements (buttons, messages, etc.)

### Example Usage

```typescript
// Header text
const t = useTranslations('header');
<nav>
  <a>{t('howItWorks')}</a>
  <a>{t('faqs')}</a>
  <a>{t('contact')}</a>
</nav>

// Button text
const t = useTranslations('common');
<button>{t('download')}</button>
<button>{t('loading')}</button>

// With parameters
const t = useTranslations('howTo');
<h2>{t('title', { platform: 'TikTok' })}</h2>
// Result: "How to Download TikTok Videos"
```

## 🔗 Using Links

**Important:** Use locale-aware Link component

```typescript
// ✅ CORRECT
import { Link } from '@/lib/navigation';
<Link href="/pages/about">About</Link>

// ❌ WRONG
import Link from 'next/link';
<Link href="/pages/about">About</Link>
```

The locale-aware Link automatically maintains the user's language:
- User on `/en/` → Links to `/en/pages/about`
- User on `/hi/` → Links to `/hi/pages/about`

## 📁 File Structure for New Pages

When creating a new page:

```
src/app/[locale]/pages/your-page/page.tsx
```

NOT:

```
src/app/pages/your-page/page.tsx  ❌
```

## ➕ Adding New Translations

1. **Add to English first** (`messages/en.json`):
```json
{
  "myNewSection": {
    "title": "My Title",
    "subtitle": "My Subtitle"
  }
}
```

2. **Translate to other languages** (hi.json, zh.json, ur.json)

3. **Use in code**:
```typescript
const t = useTranslations('myNewSection');
<h1>{t('title')}</h1>
<h2>{t('subtitle')}</h2>
```

## 🌐 Testing Different Languages

Visit these URLs:
- English: `http://localhost:3003/en/`
- Hindi: `http://localhost:3003/hi/`
- Chinese: `http://localhost:3003/zh/`
- Urdu: `http://localhost:3003/ur/`

Or use the language switcher in the header.

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for TypeScript errors
npx tsc --noEmit
```

## 📋 Migration Checklist for Existing Pages

To add i18n to an existing page:

1. [ ] Move page to `src/app/[locale]/` directory
2. [ ] Change imports:
   ```typescript
   // Before
   import Link from 'next/link';

   // After
   import { Link } from '@/lib/navigation';
   import { useTranslations } from 'next-intl';
   ```
3. [ ] Add translation keys to all 4 language files
4. [ ] Replace hardcoded text with `t('key')`
5. [ ] Test in all 4 languages
6. [ ] Verify language switcher works

## 🎨 Styling for RTL (Urdu)

CSS automatically flips for RTL because of `dir="rtl"` attribute.

For manual RTL styles:
```css
/* Applies only in RTL mode */
[dir="rtl"] .my-class {
  text-align: right;
  /* etc */
}
```

Or in Tailwind:
```typescript
<div className="text-left rtl:text-right">
  Content
</div>
```

## 🔍 Debugging Tips

### Translation not showing?
1. Check key exists in all 4 language files
2. Check spelling
3. Restart dev server
4. Check browser console for errors

### Language not switching?
1. Clear browser cookies
2. Check URL includes locale (`/en/`, `/hi/`, etc.)
3. Verify middleware is running
4. Check browser console

### Links not working?
1. Use `Link` from `@/lib/navigation`
2. Don't include locale in href (it's added automatically)
3. Use relative paths: `/pages/about` not `/en/pages/about`

## 📖 Translation File Structure

```json
{
  "namespace": {
    "key": "Value",
    "nested": {
      "key": "Nested value"
    },
    "withParam": "Text with {variable}"
  }
}
```

Access as:
```typescript
t('namespace.key')           // "Value"
t('namespace.nested.key')    // "Nested value"
t('namespace.withParam', { variable: 'replacement' })
```

## 🎁 Bonus Features

### Language Detection
- First visit: Browser language detected (if supported)
- Cookie exists: Use cookie language
- URL has locale: Use URL locale
- Fallback: English

### SEO Benefits
- Each language has unique URL
- Search engines can index all languages
- Better international reach
- Proper hreflang support

### Performance
- Only current language loads (not all 4)
- Static generation supported
- Fast edge middleware
- Minimal bundle size increase

## 🆘 Need Help?

Check these files:
1. **I18N_IMPLEMENTATION.md** - Complete documentation
2. **MIGRATION_GUIDE.md** - Detailed migration steps
3. **messages/en.json** - All available translations
4. **src/app/[locale]/page.tsx** - Working example

## 🎉 You're Ready!

The hardest part is done. Now just:
1. Add translations to language files
2. Use `t('key')` in your components
3. Use `Link` from `@/lib/navigation`
4. Test in different languages

**Your entire website will automatically work in 4 languages!**

## Quick Reference Card

```typescript
// Import
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

// In component
const t = useTranslations('namespace');

// Use
<h1>{t('title')}</h1>
<Link href="/about">{t('linkText')}</Link>
<button>{loading ? t('loading') : t('submit')}</button>

// With parameter
<p>{t('greeting', { name: 'John' })}</p>
```

That's it! Happy translating! 🌍
