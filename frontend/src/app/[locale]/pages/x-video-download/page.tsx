import TwitterDownloader from '@/components/home/TwitterDownloader'
import XDownloaderContent from '@/components/details/XDownloaderContent';
import InfoSection from "@/components/SEO/InfoSection";
import FAQSection from "@/components/SEO/FAQSection";
import { twitterFAQs, twitterInfo } from "@/data/twitterSEOData";
import type { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

// Dynamic SEO Metadata for X Video Downloader Page (Alternate URL)
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return constructMetadata({
        title: 'X Video Downloader - Download X/Twitter Videos HD Free | SnapSavePro',
        description: 'Free X video downloader to save X (Twitter) videos, GIFs, Spaces audio in HD. No watermark, no login. Fast & secure X tweet video download online.',
        keywords: 'x video downloader, download x videos, x twitter video download, save x videos, x gif download, x video saver, download from x, x downloader online, twitter video download, x spaces download',
        path: '/pages/x-video-download',
        locale,
        image: 'https://snapsavepro.com/og-twitter.png',
    });
}

const XVideoDownloadPage = () => {
    return (
        <>
            {/* Schema.org structured data for X Video Downloader */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "X Video Downloader - Save X/Twitter Videos Free",
                        "description": "Free X video downloader. Save X (Twitter) videos, GIFs, and Spaces audio in HD quality without watermark.",
                        "url": "https://snapsavepro.com/pages/x-video-download",
                        "mainEntity": {
                            "@type": "SoftwareApplication",
                            "name": "X Video Downloader",
                            "applicationCategory": "MultimediaApplication",
                            "operatingSystem": "Web, Android, iOS, Windows, Mac",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "reviewCount": "9245"
                            }
                        }
                    })
                }}
            />

            {/* Main H1 Heading for SEO */}
            <header className="sr-only">
                <h1>X Video Downloader - Save X/Twitter Videos in HD Quality Free Online</h1>
            </header>

            <TwitterDownloader />

            {/* Visual Content with Images & Animations */}
            <XDownloaderContent />

            <InfoSection
                platform="X"
                platformColor="blue"
                customTitle="X Video Downloader Features"
                customDescription={["Download any video from X (formerly Twitter) with our powerful free tool. Save video tweets, GIFs, Spaces recordings, and threads instantly."]}
                customFeatures={twitterInfo.features}
                featureImage="/images/x-features.png"
            />

            <FAQSection faqs={twitterFAQs} platform="X" />
        </>
    )
}

export default XVideoDownloadPage
