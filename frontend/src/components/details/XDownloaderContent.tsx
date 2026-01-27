'use client';
import React from 'react';
import { Download, Zap, Shield, Smartphone, Video, Twitter, Image as ImageIcon, Music } from 'lucide-react';
import Image from 'next/image';

export default function XDownloaderContent() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

            {/* Features Section with Image */}
            <section className="relative overflow-hidden rounded-2xl bg-black border border-slate-800 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        X (Twitter) Video Downloader Features
                    </h2>
                    <div className="mb-8 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
                        <Image
                            src="/images/x-features.png"
                            alt="X Video Downloader Features - HD Quality, Super Fast, No Watermark, Free Forever"
                            width={900}
                            height={350}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <Video className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">HD Quality</h3>
                            <p className="text-gray-400 text-sm">Download X videos in 1080p, 720p, and all available high-quality definitions.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <Zap className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Super Fast</h3>
                            <p className="text-gray-400 text-sm">Lightning fast download speeds for all Twitter content types.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <Shield className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Secure & Clean</h3>
                            <p className="text-gray-400 text-sm">No watermarks, no malware, securely downloaded from X servers.</p>
                        </div>
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <Smartphone className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">All Devices</h3>
                            <p className="text-gray-400 text-sm">Works perfectly on iPhone, Android, Mac, Windows, and Linux.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Download Section */}
            <section className="bg-slate-950 rounded-2xl p-8 md:p-12 border border-slate-800">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                    How to Download Videos from X (Twitter)
                </h2>
                <p className="text-gray-400 text-center mb-10 text-lg max-w-2xl mx-auto">
                    Save Twitter videos, GIFs, and Spaces in 3 easy steps.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-6 max-w-[280px] mx-auto border-2 border-slate-800 group-hover:border-blue-500/50 transition-all shadow-xl">
                            <Image
                                src="/images/x-step1.png"
                                alt="Step 1: Click Share Button on X/Twitter App"
                                width={500}
                                height={700}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg mb-3">1</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Find & Share</h3>
                        <p className="text-gray-400 text-sm">Find the video you want and click the Share icon below the tweet.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-6 max-w-[280px] mx-auto border-2 border-slate-800 group-hover:border-blue-500/50 transition-all shadow-xl">
                            <Image
                                src="/images/x-step2.png"
                                alt="Step 2: Select Copy Link from share menu"
                                width={500}
                                height={700}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg mb-3">2</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Copy Link</h3>
                        <p className="text-gray-400 text-sm">Select "Copy Link" from the share menu to save the URL to your clipboard.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-6 max-w-[400px] mx-auto border-2 border-slate-800 group-hover:border-blue-500/50 transition-all shadow-xl">
                            <Image
                                src="/images/x-step3.png"
                                alt="Step 3: Paste link on SnapSavePro and Download"
                                width={600}
                                height={400}
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg mb-3">3</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Paste & Download</h3>
                        <p className="text-gray-400 text-sm">Paste the link in our downloader box and hit the Download button.</p>
                    </div>
                </div>
            </section>

            {/* Device Compatibility Section */}
            <section className="relative overflow-hidden rounded-2xl bg-black border border-slate-800 p-8 md:p-12">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-800/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        Download on Any Device
                    </h2>
                    <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
                        Compatible with all modern devices and platforms. Whether you're using iOS, Android, MacOS, or Windows, SnapSavePro works flawlessly.
                    </p>
                    <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-800 mb-8">
                        <Image
                            src="/images/x-devices.png"
                            alt="X Video Downloader Devices - iPhone, Android, PC, Mac, Tablet"
                            width={800}
                            height={450}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 text-center">
                        <span className="px-4 py-2 bg-slate-900 rounded-lg text-gray-300 border border-slate-800">iOS (iPhone/iPad)</span>
                        <span className="px-4 py-2 bg-slate-900 rounded-lg text-gray-300 border border-slate-800">Android</span>
                        <span className="px-4 py-2 bg-slate-900 rounded-lg text-gray-300 border border-slate-800">Windows PC</span>
                        <span className="px-4 py-2 bg-slate-900 rounded-lg text-gray-300 border border-slate-800">MacOS</span>
                        <span className="px-4 py-2 bg-slate-900 rounded-lg text-gray-300 border border-slate-800">Linux</span>
                    </div>
                </div>
            </section>

            {/* FAQ / Content Section */}
            <section className="prose prose-invert max-w-none">
                <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-800">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        The Best X (Twitter) Content Downloader
                    </h2>
                    <p className="text-gray-400 mb-4">
                        Twitter (now X) is full of amazing videos, funny GIFs, and insightful Spaces audio. SnapSavePro provides a unified solution to download all these media types directly to your device.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                        <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                                <Video className="w-5 h-5 text-blue-500" /> Save X Videos
                            </h4>
                            <p className="text-sm text-gray-400">Download videos from Tweets in MP4 format. Supports multiple resolutions.</p>
                        </div>
                        <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                                <ImageIcon className="w-5 h-5 text-blue-500" /> Download GIFs
                            </h4>
                            <p className="text-sm text-gray-400">Convert Twitter GIFs to MP4 or GIF format for easy sharing.</p>
                        </div>
                        <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                                <Music className="w-5 h-5 text-blue-500" /> Spaces Audio
                            </h4>
                            <p className="text-sm text-gray-400">Download recorded X Spaces audio to listen offline anytime.</p>
                        </div>
                        <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
                            <h4 className="flex items-center gap-2 text-white font-semibold mb-2">
                                <Shield className="w-5 h-5 text-blue-500" /> Private & Safe
                            </h4>
                            <p className="text-sm text-gray-400">We don't keep logs of your downloads. Your privacy is guaranteed.</p>
                        </div>
                    </div>
                    <p className="text-gray-400">
                        Enjoy unlimited downloads with no restrictions. Whether you're saving news clips, sports highlights, or memes, SnapSavePro is your reliable tool for X video downloading.
                    </p>
                </div>
            </section>
        </div>
    );
}
