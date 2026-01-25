
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import {
    FaYoutube,
    FaTiktok,
    FaInstagram,
    FaFacebook,
    FaReddit,
    FaMusic,
    FaSnapchat
} from 'react-icons/fa';

interface RelatedToolProps {
    exclude?: string;
}

export default function RelatedTools({ exclude }: RelatedToolProps) {
    const t = useTranslations('header.downloaders');

    const tools = [
        {
            id: 'youtube',
            name: t('youtube.name'),
            path: '/pages/youtube-downloader',
            icon: <FaYoutube className="text-red-600 text-3xl mb-2" />,
            color: "hover:border-red-500 hover:shadow-red-500/20"
        },
        {
            id: 'tiktok',
            name: t('tiktok.name'),
            path: '/pages/tiktok-video-download-without-watermark',
            icon: <FaTiktok className="text-black text-3xl mb-2" />,
            color: "hover:border-black hover:shadow-black/20"
        },
        {
            id: 'instagram',
            name: t('instagram.name'),
            path: '/pages/instagram-video-download',
            icon: <FaInstagram className="text-pink-600 text-3xl mb-2" />,
            color: "hover:border-pink-500 hover:shadow-pink-500/20"
        },
        {
            id: 'facebook',
            name: t('facebook.name'),
            path: '/pages/facebook-video-download',
            icon: <FaFacebook className="text-blue-600 text-3xl mb-2" />,
            color: "hover:border-blue-500 hover:shadow-blue-500/20"
        },
        {
            id: 'videoToMp3',
            name: t('videoToMp3Converter.name'),
            path: '/pages/video-to-mp3-converter',
            icon: <FaMusic className="text-purple-600 text-3xl mb-2" />,
            color: "hover:border-purple-500 hover:shadow-purple-500/20"
        },
        {
            id: 'reddit',
            name: t('reddit.name'), // Assuming this key exists
            path: '/pages/reddit-video-download',
            icon: <FaReddit className="text-orange-600 text-3xl mb-2" />,
            color: "hover:border-orange-500 hover:shadow-orange-500/20"
        },
        {
            id: 'snapchat',
            name: t('snapchat.name'),
            path: '/pages/snapchat-video-download',
            icon: <FaSnapchat className="text-yellow-500 text-3xl mb-2" />,
            color: "hover:border-yellow-500 hover:shadow-yellow-500/20"
        }
    ];

    const filteredTools = tools.filter(tool => tool.id !== exclude);

    return (
        <section className="w-full py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">
                    More Free Video Tools
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {filteredTools.slice(0, 6).map((tool) => (
                        <Link
                            key={tool.id}
                            href={tool.path}
                            className={`flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 ${tool.color}`}
                        >
                            {tool.icon}
                            <span className="text-sm font-medium text-gray-700 text-center line-clamp-2">
                                {tool.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
