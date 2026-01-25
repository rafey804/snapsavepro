'use client';
import React from 'react';
import { CheckCircle, Zap, Shield, Smartphone, Download, Video, Globe } from 'lucide-react';
import Image from 'next/image';

export default function XDownloaderContent() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-12"
            style={{ backgroundColor: '#0a0a0a' }}
        >

            {/* How to Download X Videos - 5 Steps Visual Guide - MOVED TO TOP */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-6 text-center">
                    How to Download X Videos
                </h2>
                <p className="text-gray-400 leading-relaxed text-lg mb-8 text-center max-w-2xl mx-auto">
                    Download any X/Twitter video in just 5 simple steps. No app needed!
                </p>

                {/* Steps 1-3: From X App */}
                <h3 className="text-lg font-semibold text-blue-400 mb-4 text-center">📱 On X App</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {/* Step 1 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-4 max-w-[280px] mx-auto bg-gray-900/50 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300" style={{ marginBottom: '-15px' }}>
                            <Image
                                src="/images/x-step1.png"
                                alt="Step 1: Tap Share Icon on X video tweet"
                                width={280}
                                height={180}
                                className="w-full h-auto max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
                                style={{ marginBottom: '-8%' }}
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 mt-6 font-bold">1</div>
                        <h3 className="text-lg font-semibold text-white mb-1">Tap Share Icon</h3>
                        <p className="text-gray-400 text-sm">Find the video tweet and tap share</p>
                    </div>

                    {/* Step 2 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-4 max-w-[280px] mx-auto bg-gray-900/50 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300" style={{ marginBottom: '-15px' }}>
                            <Image
                                src="/images/x-step2.png"
                                alt="Step 2: Tap Copy Link from X share menu"
                                width={280}
                                height={180}
                                className="w-full h-auto max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
                                style={{ marginBottom: '-8%' }}
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 mt-6 font-bold">2</div>
                        <h3 className="text-lg font-semibold text-white mb-1">Tap "Copy Link"</h3>
                        <p className="text-gray-400 text-sm">Select Copy Link from menu</p>
                    </div>

                    {/* Step 3 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-4 max-w-[280px] mx-auto bg-gray-900/50 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300" style={{ marginBottom: '-15px' }}>
                            <Image
                                src="/images/x-step3.png"
                                alt="Step 3: Link copied confirmation on X"
                                width={280}
                                height={180}
                                className="w-full h-auto max-h-[180px] object-contain group-hover:scale-105 transition-transform duration-300"
                                style={{ marginBottom: '-8%' }}
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 mt-6 font-bold">3</div>
                        <h3 className="text-lg font-semibold text-white mb-1">Link Copied!</h3>
                        <p className="text-gray-400 text-sm">You'll see confirmation message</p>
                    </div>
                </div>

                {/* Steps 4-5: On Website */}
                <h3 className="text-lg font-semibold text-cyan-400 mb-4 text-center">💻 On Our Website</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Step 4 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300 bg-gray-900/30">
                            <Image
                                src="/images/x-step4-website.png"
                                alt="Step 4: Paste X video link on SnapSavePro website"
                                width={450}
                                height={280}
                                className="w-full h-auto max-h-[250px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">4</div>
                        <h3 className="text-lg font-semibold text-white mb-1">Paste X Link</h3>
                        <p className="text-gray-400 text-sm">Paste the copied link and click Get Video</p>
                    </div>

                    {/* Step 5 */}
                    <div className="text-center group">
                        <div className="rounded-xl overflow-hidden mb-4 mx-auto border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300 bg-gray-900/30">
                            <Image
                                src="/images/x-step5-download.png"
                                alt="Step 5: Select quality and download X video"
                                width={450}
                                height={280}
                                className="w-full h-auto max-h-[250px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">5</div>
                        <h3 className="text-lg font-semibold text-white mb-1">Download Video</h3>
                        <p className="text-gray-400 text-sm">Choose HD, SD or MP3 and download</p>
                    </div>
                </div>
            </section>

            {/* Content Types with Hover Animation - WATERMARK HIDDEN */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-blue-500/30 transition-all duration-300">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
                    Download All X Content Types
                </h2>
                <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
                    Save Video Tweets, GIFs, Spaces audio, and complete X Threads in high quality.
                </p>
                <div className="rounded-xl overflow-hidden max-w-3xl mx-auto group" style={{ marginBottom: '-20px' }}>
                    <Image
                        src="/images/x-content-types.png"
                        alt="X Content Types - Video Tweets, GIFs, Spaces Audio, X Threads"
                        width={700}
                        height={280}
                        className="w-full h-auto max-h-[260px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        style={{ marginBottom: '-6%' }}
                    />
                </div>
            </section>

            {/* Introduction Section */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    <Video className="h-7 w-7 text-blue-400" />
                    What is SnapSavePro X Video Downloader?
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p className="text-base sm:text-lg">
                        SnapSavePro X Video Downloader is a powerful, free online tool that lets you download videos from X (formerly Twitter) directly to your device in HD quality without watermarks.
                    </p>
                    <p className="text-base sm:text-lg">
                        Whether you want to save viral video tweets, animated GIFs, Spaces recordings, or entire threads with media - our tool delivers fast, reliable downloads.
                    </p>
                </div>
            </section>

            {/* Features Grid with Staggered Animation */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    Why Choose Our X Downloader?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {[
                        {
                            icon: <Zap className="h-6 w-6 text-blue-400" />,
                            title: "Lightning Fast",
                            description: "Download X videos in seconds with optimized servers."
                        },
                        {
                            icon: <Shield className="h-6 w-6 text-green-400" />,
                            title: "100% Safe & Secure",
                            description: "No data stored. Your privacy is fully protected."
                        },
                        {
                            icon: <Video className="h-6 w-6 text-purple-400" />,
                            title: "HD Quality Support",
                            description: "Download in crisp HD quality up to 4K resolution."
                        },
                        {
                            icon: <Smartphone className="h-6 w-6 text-orange-400" />,
                            title: "All Devices",
                            description: "Works on Android, iOS, Windows, Mac & Linux."
                        },
                        {
                            icon: <Download className="h-6 w-6 text-cyan-400" />,
                            title: "No Watermarks",
                            description: "Clean downloads exactly as posted on X."
                        },
                        {
                            icon: <Globe className="h-6 w-6 text-pink-400" />,
                            title: "No Registration",
                            description: "Start downloading instantly. No sign-up needed."
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">{feature.icon}</div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                                    <p className="text-sm text-gray-400">{feature.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Devices with Animation - WATERMARK HIDDEN */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
                    Works on All Devices
                </h2>
                <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto">
                    Download X videos on iPhone, Android, Windows PC, Mac, or tablet. No app required.
                </p>
                <div className="rounded-xl overflow-hidden max-w-2xl mx-auto group" style={{ marginBottom: '-20px' }}>
                    <Image
                        src="/images/x-devices.png"
                        alt="Download X videos on any device - iOS, Android, Mac, PC"
                        width={700}
                        height={350}
                        className="w-full h-auto max-h-[320px] object-contain group-hover:scale-[1.03] transition-transform duration-500"
                        style={{ marginBottom: '-6%' }}
                    />
                </div>
            </section>

            {/* Security Section with Glow Effect - WATERMARK HIDDEN */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-50"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center flex items-center justify-center gap-3 relative z-10">
                    <Shield className="h-8 w-8 text-blue-400" />
                    100% Safe & Secure
                </h2>
                <p className="text-gray-400 text-center mb-6 max-w-2xl mx-auto relative z-10">
                    Your privacy is our top priority. No login, no data stored, SSL encrypted.
                </p>
                <div className="rounded-xl overflow-hidden max-w-2xl mx-auto relative z-10 group" style={{ marginBottom: '-20px' }}>
                    <Image
                        src="/images/x-security.png"
                        alt="X Downloader Security - 100% Secure, No Login, Privacy Protected, SSL Encrypted"
                        width={600}
                        height={320}
                        className="w-full h-auto max-h-[300px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
                        style={{ marginBottom: '-6%' }}
                    />
                </div>
            </section>

            {/* Use Cases - Animated Icons */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    Popular Use Cases
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        { icon: "🎬", title: "Viral Videos" },
                        { icon: "😂", title: "Memes & GIFs" },
                        { icon: "📰", title: "Breaking News" },
                        { icon: "🎵", title: "Music Clips" },
                        { icon: "⚽", title: "Sports Highlights" },
                        { icon: "🎙️", title: "Spaces Audio" }
                    ].map((useCase, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        >
                            <div className="text-3xl mb-2 hover:scale-110 transition-transform duration-200">{useCase.icon}</div>
                            <h3 className="text-white font-medium text-sm">{useCase.title}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="rounded-2xl p-6 sm:p-8 border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            question: "Is SnapSavePro X Downloader free?",
                            answer: "Yes! 100% free with no hidden charges or subscriptions."
                        },
                        {
                            question: "Do I need to install any app?",
                            answer: "No. It works directly in your browser on any device."
                        },
                        {
                            question: "Can I download private X videos?",
                            answer: "No, only publicly available X content can be downloaded."
                        },
                        {
                            question: "What quality options are available?",
                            answer: "HD (1080p/720p), SD (480p/360p), and audio-only (MP3)."
                        },
                        {
                            question: "Is my privacy protected?",
                            answer: "Absolutely! No data stored, fully encrypted connections."
                        }
                    ].map((faq, index) => (
                        <div key={index} className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-200">
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                {faq.question}
                            </h3>
                            <p className="text-gray-400 leading-relaxed text-sm pl-7">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA with Pulse Animation */}
            <section className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 animate-pulse"></div>
                <h2 className="text-3xl font-bold text-white mb-4 relative z-10">
                    Start Downloading X Videos Now! 🚀
                </h2>
                <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto relative z-10">
                    Join thousands of users who trust SnapSavePro for fast, safe X video downloads.
                </p>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 relative z-10"
                >
                    Try X Downloader Now
                </button>
            </section>
        </div>
    );
}
