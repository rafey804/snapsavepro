'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import {
    FaTiktok,
    FaInstagram,
    FaFacebook,
    FaReddit,
    FaMusic,
    FaSnapchat,
    FaTwitter,
    FaPinterest,
    FaTelegram,
    FaTwitch,
    FaUserCircle
} from 'react-icons/fa';
import { FaLinkedin, FaThreads } from 'react-icons/fa6';
import { SiDailymotion } from 'react-icons/si';

interface RelatedToolProps {
    exclude?: string;
}

export default function RelatedTools({ exclude }: RelatedToolProps) {
    const t = useTranslations('downloaders');

    const tools = [
        {
            id: 'tiktok',
            name: t('tiktok.name'),
            path: '/pages/tiktok-video-download-without-watermark',
            icon: <FaTiktok className="text-3xl mb-3" />,
            iconColor: 'text-white',
            bgGradient: 'from-gray-900 to-gray-700',
            borderColor: 'border-gray-600 hover:border-white'
        },
        {
            id: 'instagram',
            name: t('instagram.name'),
            path: '/pages/instagram-video-download',
            icon: <FaInstagram className="text-3xl mb-3" />,
            iconColor: 'text-pink-500',
            bgGradient: 'from-pink-600/20 to-purple-600/20',
            borderColor: 'border-pink-500/30 hover:border-pink-500'
        },
        {
            id: 'instagramReels',
            name: t('instagramReels.name'),
            path: '/pages/instagram-reels-downloader',
            icon: <FaInstagram className="text-3xl mb-3" />,
            iconColor: 'text-purple-500',
            bgGradient: 'from-purple-600/20 to-pink-600/20',
            borderColor: 'border-purple-500/30 hover:border-purple-500'
        },
        {
            id: 'instagramProfile',
            name: t('instagramProfile.name'),
            path: '/pages/instagram-profile-picture-downloader',
            icon: <FaUserCircle className="text-3xl mb-3" />,
            iconColor: 'text-pink-400',
            bgGradient: 'from-pink-500/20 to-rose-600/20',
            borderColor: 'border-pink-400/30 hover:border-pink-400'
        },
        {
            id: 'facebook',
            name: t('facebook.name'),
            path: '/pages/facebook-video-download',
            icon: <FaFacebook className="text-3xl mb-3" />,
            iconColor: 'text-blue-500',
            bgGradient: 'from-blue-600/20 to-blue-800/20',
            borderColor: 'border-blue-500/30 hover:border-blue-500'
        },
        {
            id: 'twitter',
            name: t('twitter.name'),
            path: '/pages/x-video-download',
            icon: <FaTwitter className="text-3xl mb-3" />,
            iconColor: 'text-sky-400',
            bgGradient: 'from-sky-600/20 to-blue-600/20',
            borderColor: 'border-sky-500/30 hover:border-sky-500'
        },
        {
            id: 'linkedin',
            name: t('linkedin.name'),
            path: '/pages/linkedin-video-downloader',
            icon: <FaLinkedin className="text-3xl mb-3" />,
            iconColor: 'text-blue-600',
            bgGradient: 'from-blue-700/20 to-cyan-600/20',
            borderColor: 'border-blue-600/30 hover:border-blue-600'
        },
        {
            id: 'pinterest',
            name: t('pinterest.name'),
            path: '/pages/pinterest-video-download',
            icon: <FaPinterest className="text-3xl mb-3" />,
            iconColor: 'text-red-500',
            bgGradient: 'from-red-600/20 to-red-800/20',
            borderColor: 'border-red-500/30 hover:border-red-500'
        },
        {
            id: 'snapchat',
            name: t('snapchat.name'),
            path: '/pages/snapchat-video-download',
            icon: <FaSnapchat className="text-3xl mb-3" />,
            iconColor: 'text-yellow-400',
            bgGradient: 'from-yellow-500/20 to-yellow-600/20',
            borderColor: 'border-yellow-500/30 hover:border-yellow-500'
        },
        {
            id: 'reddit',
            name: t('reddit.name'),
            path: '/pages/reddit-video-download',
            icon: <FaReddit className="text-3xl mb-3" />,
            iconColor: 'text-orange-500',
            bgGradient: 'from-orange-600/20 to-red-600/20',
            borderColor: 'border-orange-500/30 hover:border-orange-500'
        },
        {
            id: 'telegram',
            name: t('telegram.name'),
            path: '/pages/telegram-video-download',
            icon: <FaTelegram className="text-3xl mb-3" />,
            iconColor: 'text-sky-500',
            bgGradient: 'from-sky-500/20 to-blue-500/20',
            borderColor: 'border-sky-500/30 hover:border-sky-500'
        },
        {
            id: 'threads',
            name: t('threads.name'),
            path: '/pages/threads-video-downloader',
            icon: <FaThreads className="text-3xl mb-3" />,
            iconColor: 'text-white',
            bgGradient: 'from-gray-800 to-gray-900',
            borderColor: 'border-gray-500/30 hover:border-white'
        },
        {
            id: 'twitch',
            name: t('twitch.name'),
            path: '/pages/twitch-clip-downloader',
            icon: <FaTwitch className="text-3xl mb-3" />,
            iconColor: 'text-purple-500',
            bgGradient: 'from-purple-600/20 to-purple-800/20',
            borderColor: 'border-purple-500/30 hover:border-purple-500'
        },
        {
            id: 'dailymotion',
            name: t('dailymotion.name'),
            path: '/pages/dailymotion-video-downloader',
            icon: <SiDailymotion className="text-3xl mb-3" />,
            iconColor: 'text-blue-400',
            bgGradient: 'from-blue-500/20 to-indigo-600/20',
            borderColor: 'border-blue-400/30 hover:border-blue-400'
        },
        {
            id: 'kwai',
            name: t('kwai.name'),
            path: '/pages/kwai-video-downloader',
            icon: <FaTiktok className="text-3xl mb-3" />,
            iconColor: 'text-orange-400',
            bgGradient: 'from-orange-500/20 to-yellow-500/20',
            borderColor: 'border-orange-400/30 hover:border-orange-400'
        },
        {
            id: 'videoToMp3',
            name: t('videoToMp3Converter.name'),
            path: '/pages/video-to-mp3-converter',
            icon: <FaMusic className="text-3xl mb-3" />,
            iconColor: 'text-purple-500',
            bgGradient: 'from-purple-600/20 to-pink-600/20',
            borderColor: 'border-purple-500/30 hover:border-purple-500'
        },
        {
            id: 'profilePicture',
            name: t('profilePicture.name'),
            path: '/pages/profile-picture-downloader',
            icon: <FaUserCircle className="text-3xl mb-3" />,
            iconColor: 'text-cyan-500',
            bgGradient: 'from-cyan-600/20 to-blue-600/20',
            borderColor: 'border-cyan-500/30 hover:border-cyan-500'
        }
    ];

    const filteredTools = tools.filter(tool => tool.id !== exclude);

    return (
        <section className="w-full py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <div className="max-w-6xl mx-auto px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    More Free Video Tools
                </h3>
                <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
                    Download videos from all your favorite social media platforms
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredTools.slice(0, 10).map((tool) => (
                        <Link
                            key={tool.id}
                            href={tool.path}
                            className={`flex flex-col items-center justify-center p-5 bg-gradient-to-br ${tool.bgGradient} backdrop-blur-sm rounded-xl border ${tool.borderColor} transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg group`}
                        >
                            <div className={`${tool.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                {tool.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-300 text-center line-clamp-2 group-hover:text-white transition-colors">
                                {tool.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
