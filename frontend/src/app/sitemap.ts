import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://snapsavepro.com';
  const currentDate = new Date().toISOString().split('T')[0];
  const locales = ['en', 'hi', 'zh', 'ur'];

  // Define all pages with their priorities and change frequencies
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/pages/tiktok-video-download-without-watermark', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/youtube-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/instagram-video-download', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/facebook-video-download', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/snapchat-video-download', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/twitter-video-download', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/reddit-video-download', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/pinterest-video-download', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/linkedin-video-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/youtube-shorts-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/instagram-reels-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/youtube-to-mp3', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/pages/audio', priority: 0.8, changeFrequency: 'daily' as const },
    { path: '/pages/youtube-thumbnail-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/twitch-clip-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/kwai-video-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/dailymotion-video-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/threads-video-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/profile-picture-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pages/instagram-profile-picture-downloader', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/blog', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/pages/how-it-works', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/pages/faqs', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/pages/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/pages/legal/privacy-policy', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/pages/legal/terms-of-service', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each page in each locale
  pages.forEach(page => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page.path}`,
            hi: `${baseUrl}/hi${page.path}`,
            zh: `${baseUrl}/zh${page.path}`,
            ur: `${baseUrl}/ur${page.path}`,
          }
        }
      });
    });
  });

  return sitemapEntries;
}
