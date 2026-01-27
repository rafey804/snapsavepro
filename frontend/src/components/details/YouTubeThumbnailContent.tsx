'use client';
import React from 'react';
import { Download, Zap, Shield, Smartphone, Image as ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';

export default function YouTubeThumbnailContent() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

            {/* Features Section with Image */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        YouTube Thumbnail Downloader Features
                    </h2>
                    <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/youtube-thumbnail-features.png"
                            alt="YouTube Thumbnail Downloader Features - HD Quality, All Resolutions, Instant Download, 100% Free"
                            width={900}
                            height={350}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-700/50 p-6 rounded-xl backdrop-blur-sm hover:bg-slate-700/70 transition-all">
                            <ImageIcon className="w-10 h-10 text-red-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">HD Quality</h3>
                            <p className="text-gray-300 text-sm">Download YouTube thumbnails in maximum resolution up to 4K quality</p>
                        </div>
                        <div className="bg-slate-700/50 p-6 rounded-xl backdrop-blur-sm hover:bg-slate-700/70 transition-all">
                            <Download className="w-10 h-10 text-red-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">All Sizes</h3>
                            <p className="text-gray-300 text-sm">Get thumbnails in all available resolutions from small to max</p>
                        </div>
                        <div className="bg-slate-700/50 p-6 rounded-xl backdrop-blur-sm hover:bg-slate-700/70 transition-all">
                            <Zap className="w-10 h-10 text-red-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Instant Download</h3>
                            <p className="text-gray-300 text-sm">Get YouTube video thumbnails in seconds with one click</p>
                        </div>
                        <div className="bg-slate-700/50 p-6 rounded-xl backdrop-blur-sm hover:bg-slate-700/70 transition-all">
                            <Shield className="w-10 h-10 text-red-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">100% Free</h3>
                            <p className="text-gray-300 text-sm">No registration, no watermarks, completely free forever</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Download Section - NEW */}
            <section className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 mb-4 text-center">
                    How to Download YouTube Thumbnails
                </h2>
                <p className="text-gray-300 text-center mb-10 text-lg max-w-2xl mx-auto">
                    Save any YouTube video thumbnail in just 3 simple steps. No software needed!
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="text-center">
                        <div className="rounded-xl overflow-hidden mb-4 max-w-[300px] mx-auto bg-slate-800/50 border border-slate-700/50">
                            <Image
                                src="/images/youtube-thumbnail-step1.png"
                                alt="Step 1: Copy YouTube video URL from browser address bar"
                                width={500}
                                height={700}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3 font-bold text-lg">1</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Copy Video URL</h3>
                        <p className="text-gray-400">Open the YouTube video and copy the URL from browser</p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center">
                        <div className="rounded-xl overflow-hidden mb-4 mx-auto bg-slate-800/50 border border-slate-700/50">
                            <Image
                                src="/images/youtube-thumbnail-step2.png"
                                alt="Step 2: Paste YouTube URL on SnapSavePro website"
                                width={600}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3 font-bold text-lg">2</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Paste on Website</h3>
                        <p className="text-gray-400">Paste the URL in our input field and hit enter</p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center">
                        <div className="rounded-xl overflow-hidden mb-4 mx-auto bg-slate-800/50 border border-slate-700/50">
                            <Image
                                src="/images/youtube-thumbnail-step3.png"
                                alt="Step 3: Choose thumbnail quality and download - Max Resolution, HD, Standard"
                                width={600}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3 font-bold text-lg">3</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Choose & Download</h3>
                        <p className="text-gray-400">Select your desired quality and click download button</p>
                    </div>
                </div>
            </section>

            {/* Resolution Comparison Section */}
            <section className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                    YouTube Thumbnail Resolutions
                </h2>
                <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                    Download YouTube thumbnails in multiple resolutions. Choose the perfect size for your blog, social media, or presentation needs.
                </p>
                <div className="rounded-xl overflow-hidden shadow-2xl">
                    <Image
                        src="/images/youtube-thumbnail-resolutions.png"
                        alt="YouTube Thumbnail Resolution Comparison - Max Resolution 1280x720, HD Quality 640x480, Standard 480x360"
                        width={900}
                        height={400}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <Video className="w-6 h-6 text-red-500" />
                            Max Resolution (1280x720)
                        </h3>
                        <p className="text-gray-300 text-sm">Best quality for presentations, blog headers, and professional use. Perfect clarity and detail.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20">
                        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                            <ImageIcon className="w-6 h-6 text-red-500" />
                            Standard Quality (480x360)
                        </h3>
                        <p className="text-gray-300 text-sm">Ideal for social media posts, quick previews, and smaller file sizes without compromising visibility.</p>
                    </div>
                </div>
            </section>

            {/* Device Compatibility Section */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-12">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        Download Thumbnails on Any Device
                    </h2>
                    <p className="text-gray-300 text-center mb-8 max-w-3xl mx-auto">
                        Our YouTube Thumbnail Downloader works seamlessly on all devices - smartphones, tablets, laptops, and desktops.
                    </p>
                    <div className="rounded-xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/youtube-thumbnail-devices.png"
                            alt="YouTube Thumbnail Downloader - Compatible with iPhone, Android, Mac, Windows, iPad"
                            width={800}
                            height={450}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                            <Smartphone className="w-8 h-8 text-red-500 mx-auto mb-2" />
                            <p className="text-white font-medium">Mobile</p>
                        </div>
                        <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                            <Smartphone className="w-8 h-8 text-red-500 mx-auto mb-2 rotate-90" />
                            <p className="text-white font-medium">Tablet</p>
                        </div>
                        <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                            <Download className="w-8 h-8 text-red-500 mx-auto mb-2" />
                            <p className="text-white font-medium">Desktop</p>
                        </div>
                        <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                            <ImageIcon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                            <p className="text-white font-medium">All Browsers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="bg-gradient-to-br from-gray-900 to-slate-900 rounded-2xl p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                    Creative Uses for YouTube Thumbnails
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                            <ImageIcon className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Blog Posts</h3>
                        <p className="text-gray-300 text-sm">Use YouTube thumbnails as eye-catching featured images for your blog articles and content.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Social Media</h3>
                        <p className="text-gray-300 text-sm">Share thumbnails on Instagram, Twitter, Facebook to promote videos and engage your audience.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Download className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Presentations</h3>
                        <p className="text-gray-300 text-sm">Add YouTube thumbnails to PowerPoint slides, Google Slides, or Keynote presentations.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Video className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Video References</h3>
                        <p className="text-gray-300 text-sm">Save thumbnails for video research, inspiration boards, or content planning workflows.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Design Inspiration</h3>
                        <p className="text-gray-300 text-sm">Collect thumbnails to study design trends and improve your own thumbnail creation skills.</p>
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-red-500/20 hover:border-red-500/50 transition-all">
                        <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                            <Smartphone className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Offline Access</h3>
                        <p className="text-gray-300 text-sm">Download thumbnails for offline viewing and quick reference without internet connection.</p>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="prose prose-invert max-w-none">
                <div className="bg-slate-800/50 rounded-xl p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Why Use Our YouTube Thumbnail Downloader?
                    </h2>
                    <p className="text-gray-300 mb-4">
                        YouTube thumbnails are crucial visual elements that represent video content across the platform. Our free YouTube Thumbnail Downloader allows you to save these images in various resolutions instantly. Whether you need a high-quality 4K thumbnail for professional use or a smaller version for quick sharing, our tool provides all available sizes.
                    </p>
                    <p className="text-gray-300 mb-4">
                        The maximum resolution thumbnail (1280x720 pixels) is perfect for blog posts, presentations, and social media marketing. You can download YouTube video thumbnails without any registration or software installation. Simply paste the YouTube video URL, and get instant access to download thumbnails in HD, Full HD, or even 4K quality when available.
                    </p>
                    <p className="text-gray-300">
                        Our YouTube thumbnail grabber works with all types of YouTube videos - music videos, vlogs, tutorials, gaming content, and more. It's completely free, fast, and requires no technical knowledge. Save YouTube thumbnails for offline use, content creation, or research purposes with just one click.
                    </p>
                </div>
            </section>
        </div>
    );
}
