'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { i18n, languageNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname
  const getCurrentLocale = (): Locale => {
    const locale = pathname.split('/')[1] as Locale;
    return i18n.locales.includes(locale) ? locale : i18n.defaultLocale;
  };

  const currentLocale = getCurrentLocale();

  const changeLanguage = (newLocale: Locale) => {
    setIsOpen(false);

    // Save language preference to cookie
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;

    startTransition(() => {
      // Replace the locale in the pathname
      const segments = pathname.split('/');
      segments[1] = newLocale;
      const newPathname = segments.join('/');

      router.push(newPathname);
      router.refresh();
    });
  };

  return (
    <div className="relative">
      {/* Language selector button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700 transition-all duration-200"
        aria-label="Select language"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span className="text-sm font-medium text-gray-200">
          {languageNames[currentLocale]}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-xl z-50 overflow-hidden">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => changeLanguage(locale)}
                disabled={isPending}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  currentLocale === locale
                    ? 'bg-pink-500/20 text-pink-400 font-medium'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{languageNames[locale]}</span>
                  {currentLocale === locale && (
                    <svg
                      className="h-4 w-4 text-pink-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
