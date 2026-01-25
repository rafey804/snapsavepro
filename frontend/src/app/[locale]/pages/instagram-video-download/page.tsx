import React from 'react';
import type { Metadata } from 'next';
import InstagramDownloader from '@/components/home/InstagramDownloader';
import InfoSection from '@/components/SEO/InfoSection';
import InstagramUniqueContent from '@/components/SEO/InstagramUniqueContent';
import { constructMetadata } from '@/utils/seo';
import { instagramPageSEO } from '@/data/comprehensiveSEOData';
import { instagramInfo } from '@/data/instagramSEOData';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return constructMetadata({
        title: instagramPageSEO.title,
        description: instagramPageSEO.description,
        keywords: instagramPageSEO.keywords,
        path: '/pages/instagram-video-download',
        locale,
        image: instagramPageSEO.ogImage,
    });
}

export default function InstagramVideoDownloaderPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: instagramPageSEO.h1,
        applicationCategory: 'MultimediaApplication',
        url: 'https://snapsavepro.com/pages/instagram-video-download',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '8540',
            bestRating: '5',
            worstRating: '1',
        },
        operatingSystem: 'Windows, MacOS, Linux, Android, iOS',
        browserRequirements: 'Requires JavaScript. Works on all modern browsers.',
        softwareVersion: '2.0',
        datePublished: '2023-09-20',
        dateModified: '2025-10-28',
        author: {
            '@type': 'Organization',
            name: 'SnapSavePro',
            url: 'https://snapsavepro.com',
        },
        description: instagramPageSEO.description,
        featureList: [
            'Download Instagram Videos in HD',
            'Save Instagram Reels',
            'Download Instagram Stories',
            'Save IGTV Videos',
            'Download Instagram Photos',
            'No Login Required',
            'Fast & Free',
            'Unlimited Downloads'
        ],
        screenshot: 'https://snapsavepro.com/instagram-downloader-screenshot.jpg',
        applicationSubCategory: 'Video Downloader',
        keywords: instagramPageSEO.keywords.join(', '),
    };

    // Custom info for general video downloader (adapting from reels info)
    const generalInstagramInfo = {
        ...instagramInfo,
        title: "Instagram Video Downloader - Save Videos, Reels & Stories",
        description: [
            "Download Instagram videos, Reels, Stories, and photos in the highest quality possible with our free tool. Whether you're a content creator or just want to save a memory, we make it simple.",
            "Our downloader supports all Instagram content types: Videos, Reels, IGTV, regular posts, and carousels. You can download videos in MP4 format and photos in high-resolution JPG.",
            "No login is required. Just paste the link and download. We support downloading from public accounts instantly."
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Main Downloader Component */}
            <InstagramDownloader />

            {/* Info Section */}
            <InfoSection
                platform="Instagram"
                platformColor="purple"
                customTitle={generalInstagramInfo.title}
                customDescription={generalInstagramInfo.description}
                customFeatures={generalInstagramInfo.features}
                featureImage="/images/instagram-features.png"
            />

            <InstagramUniqueContent />
        </>
    );
}
