'use client';
import React from 'react';
import Image from 'next/image';
import {
    Film,
    Image as ImageIcon,
    Music,
    Download,
    Zap,
    Shield,
    Award,
    Play,
    Volume2,
    Smartphone,
    Monitor,
    CheckCircle
} from 'lucide-react';
import { FaReddit } from 'react-icons/fa';

export default function RedditUniqueContent() {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16">
            <div className="max-w-6xl mx-auto px-4">

                {/* Hero Section with Icon-based Design */}
                <div className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600/20 to-red-600/20 p-8 border border-orange-500/30">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                                <FaReddit className="text-white text-6xl" />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-4">
                                Reddit Video Downloader
                            </h2>
                            <p className="text-gray-300 text-lg max-w-2xl">
                                Download videos, GIFs, and images from Reddit in HD quality. Works with v.redd.it, i.redd.it, and all Reddit post formats. Fast, free, and no registration required.
                            </p>
                        </div>
                    </div>

                    {/* Hero Image - Light crop to hide watermarks */}
                    <div className="mt-8 rounded-xl overflow-hidden" style={{ aspectRatio: '1.09/1' }}>
                        <Image
                            src="/images/reddit-hero.png"
                            alt="Reddit Video Downloader - Download Reddit Videos Free"
                            width={1200}
                            height={400}
                            className="w-full h-full object-cover object-top rounded-xl"
                            priority
                        />
                    </div>
                </div>

                <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
                    <h3 className="text-2xl font-bold text-white mb-6">What Can You Download from Reddit?</h3>

                    <div className="grid md:grid-cols-3 gap-6 my-8">
                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 transform text-center">
                            <Film className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-white mb-2">Videos</h4>
                            <p className="text-gray-300">
                                Download v.redd.it videos in HD quality with audio merged automatically
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105 transform text-center">
                            <ImageIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-white mb-2">Images & GIFs</h4>
                            <p className="text-gray-300">
                                Save images, GIFs, and animated content from i.redd.it and imgur links
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 transform text-center">
                            <Music className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-white mb-2">Audio</h4>
                            <p className="text-gray-300">
                                Extract audio from Reddit videos and save as MP3 for podcasts and music
                            </p>
                        </div>
                    </div>

                    {/* Features Section */}
                    <h3 className="text-2xl font-bold text-white mt-10 mb-6">Key Features</h3>

                    <div className="grid md:grid-cols-4 gap-4 my-6">
                        <div className="bg-slate-700/30 p-5 rounded-xl border border-orange-500/20 text-center hover:scale-105 transform transition-all duration-300">
                            <Download className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                            <div className="text-white font-semibold">HD Quality</div>
                            <div className="text-gray-400 text-sm">1080p & 720p</div>
                        </div>
                        <div className="bg-slate-700/30 p-5 rounded-xl border border-orange-500/20 text-center hover:scale-105 transform transition-all duration-300">
                            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                            <div className="text-white font-semibold">Lightning Fast</div>
                            <div className="text-gray-400 text-sm">Instant downloads</div>
                        </div>
                        <div className="bg-slate-700/30 p-5 rounded-xl border border-orange-500/20 text-center hover:scale-105 transform transition-all duration-300">
                            <Volume2 className="w-10 h-10 text-green-400 mx-auto mb-3" />
                            <div className="text-white font-semibold">Audio Merge</div>
                            <div className="text-gray-400 text-sm">Video + Audio</div>
                        </div>
                        <div className="bg-slate-700/30 p-5 rounded-xl border border-orange-500/20 text-center hover:scale-105 transform transition-all duration-300">
                            <Shield className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                            <div className="text-white font-semibold">100% Secure</div>
                            <div className="text-gray-400 text-sm">Privacy focused</div>
                        </div>
                    </div>

                    {/* How to Download Section */}
                    <h3 className="text-2xl font-bold text-white mt-10 mb-6">How to Download Reddit Videos</h3>

                    <div className="grid md:grid-cols-3 gap-6 my-8">
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">1</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Copy Reddit Link</h4>
                            <p className="text-gray-400 text-sm">
                                Find the video on Reddit and copy the post URL from address bar or share button
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">2</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Paste URL</h4>
                            <p className="text-gray-400 text-sm">
                                Paste the Reddit link into our downloader and click the download button
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white text-2xl font-bold">3</span>
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-2">Download</h4>
                            <p className="text-gray-400 text-sm">
                                Choose your quality and download the video with audio merged automatically
                            </p>
                        </div>
                    </div>

                    {/* Quality Options */}
                    <h3 className="text-2xl font-bold text-white mt-10 mb-6">Available Quality Options</h3>

                    <div className="grid md:grid-cols-4 gap-4 my-6">
                        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-5 rounded-xl border border-orange-500/30 text-center hover:scale-105 transform transition-all duration-300">
                            <div className="text-3xl font-bold text-orange-400 mb-2">1080p</div>
                            <div className="text-white font-semibold mb-1">Full HD</div>
                            <div className="text-gray-400 text-sm">Best Quality</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-5 rounded-xl border border-red-500/30 text-center hover:scale-105 transform transition-all duration-300">
                            <div className="text-3xl font-bold text-red-400 mb-2">720p</div>
                            <div className="text-white font-semibold mb-1">HD</div>
                            <div className="text-gray-400 text-sm">High Quality</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-5 rounded-xl border border-orange-500/30 text-center hover:scale-105 transform transition-all duration-300">
                            <div className="text-3xl font-bold text-orange-400 mb-2">480p</div>
                            <div className="text-white font-semibold mb-1">SD</div>
                            <div className="text-gray-400 text-sm">Standard</div>
                        </div>
                        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-5 rounded-xl border border-red-500/30 text-center hover:scale-105 transform transition-all duration-300">
                            <div className="text-3xl font-bold text-red-400 mb-2">MP3</div>
                            <div className="text-white font-semibold mb-1">Audio</div>
                            <div className="text-gray-400 text-sm">Extract Audio</div>
                        </div>
                    </div>

                    {/* Device Compatibility */}
                    <h3 className="text-2xl font-bold text-white mt-10 mb-6">Works on All Devices</h3>

                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 p-6 rounded-xl border border-orange-500/20">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-center gap-4">
                                <Monitor className="w-12 h-12 text-orange-400" />
                                <div>
                                    <div className="text-white font-semibold">Desktop</div>
                                    <div className="text-gray-400 text-sm">Windows, Mac, Linux</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Smartphone className="w-12 h-12 text-red-400" />
                                <div>
                                    <div className="text-white font-semibold">Mobile</div>
                                    <div className="text-gray-400 text-sm">iOS, Android</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <CheckCircle className="w-12 h-12 text-green-400" />
                                <div>
                                    <div className="text-white font-semibold">All Browsers</div>
                                    <div className="text-gray-400 text-sm">Chrome, Firefox, Safari</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Subreddits */}
                    <h3 className="text-2xl font-bold text-white mt-10 mb-6">Popular Subreddits for Video Content</h3>

                    <div className="flex flex-wrap gap-3">
                        {['r/videos', 'r/funny', 'r/gaming', 'r/aww', 'r/memes', 'r/PublicFreakout', 'r/nextfuckinglevel', 'r/interestingasfuck', 'r/oddlysatisfying', 'r/Unexpected', 'r/gifs', 'r/sports'].map((sub) => (
                            <span key={sub} className="px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30 text-sm hover:bg-orange-500/30 transition-colors cursor-pointer">
                                {sub}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-300 leading-relaxed text-lg mt-8">
                        Start downloading Reddit videos now with our fast, free, and secure tool. Perfect for saving memes, funny videos, educational content, and anything else you find on Reddit for offline viewing.
                    </p>
                </article>

            </div>
        </div>
    );
}
