import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/', '/*.json$', '/node_modules/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: ['Slurp', 'DuckDuckBot', 'Baiduspider', 'YandexBot'],
        allow: '/',
      },
      {
        userAgent: ['AdsBot-Google', 'Mediapartners-Google'],
        allow: '/',
      },
      {
        userAgent: 'AhrefsBot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: 'SemrushBot',
        allow: '/',
        crawlDelay: 10,
      },
      {
        userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp', 'TelegramBot'],
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        crawlDelay: 2,
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
    ],
    sitemap: 'https://snapsavepro.com/sitemap.xml',
    host: 'https://snapsavepro.com',
  };
}
