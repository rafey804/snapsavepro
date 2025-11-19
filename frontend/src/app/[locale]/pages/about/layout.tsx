import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Snap Save Pro | Our Story & Mission',
  description: 'Learn about Snap Save Pro, our mission to make video downloading simple and accessible, and why millions of users trust us for downloading videos from TikTok, YouTube, Facebook, and more.',
  keywords: 'about snap save pro, our story, video downloader company, mission, privacy-focused downloader',
  openGraph: {
    title: 'About Snap Save Pro - Free Video Downloader',
    description: 'Discover our mission to provide free, private, and easy video downloading for everyone.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
