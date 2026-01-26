'use client';
import React from 'react';
import Image from 'next/image';
import {
    Briefcase,
    Users,
    VideoIcon,
    TrendingUp,
    GraduationCap,
    Target,
    BookOpen,
    Award
} from 'lucide-react';

export default function LinkedInUniqueContent() {
    return (
        <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-16">
            <div className="max-w-6xl mx-auto px-4">

                {/* Hero Section with Image - Cropped to hide bottom watermark */}
                <div className="relative mb-12 rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500" style={{ height: '280px' }}>
                    <Image
                        src="/images/linkedin-hero.png"
                        alt="LinkedIn Video Downloader - Download Professional Videos Free"
                        width={1200}
                        height={400}
                        className="w-full h-full object-cover object-top rounded-2xl"
                        priority
                    />
                </div>

                <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50 mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-6">
                        LinkedIn Video Downloader - Professional Content Made Easy
                    </h2>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed text-lg mb-6">
                            LinkedIn is the world's largest professional network with 900+ million users. Our LinkedIn Video Downloader helps you save professional videos, webinars, educational content, and business insights in HD quality - completely free and secure.
                        </p>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Professional Video Content on LinkedIn</h3>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform">
                                <div className="flex items-center gap-3 mb-4">
                                    <Briefcase className="w-12 h-12 text-blue-500" />
                                    <h3 className="text-xl font-semibold text-white">Business Webinars</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Download professional webinars and business presentations. Perfect for learning industry trends and best practices offline.
                                </p>
                            </div>

                            <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 transform">
                                <div className="flex items-center gap-3 mb-4">
                                    <GraduationCap className="w-12 h-12 text-cyan-500" />
                                    <h3 className="text-xl font-semibold text-white">Educational Content</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Save tutorials, courses, and professional development videos for continuous learning and skill enhancement.
                                </p>
                            </div>

                            <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-12 h-12 text-blue-500" />
                                    <h3 className="text-xl font-semibold text-white">Expert Interviews</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Download thought leadership interviews and expert panels. Learn from industry leaders and innovators.
                                </p>
                            </div>

                            <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 transform">
                                <div className="flex items-center gap-3 mb-4">
                                    <BookOpen className="w-12 h-12 text-cyan-500" />
                                    <h3 className="text-xl font-semibold text-white">Training Materials</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    Save corporate training videos and onboarding content for your team and professional development.
                                </p>
                            </div>
                        </div>

                        {/* Features Banner with Animation - Cropped */}
                        <div className="my-8 rounded-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500" style={{ height: '200px' }}>
                            <Image
                                src="/images/linkedin-features.png"
                                alt="LinkedIn Video Downloader Features - HD Quality, Fast Speed, Secure, Professional"
                                width={1200}
                                height={300}
                                className="w-full h-full object-cover object-top rounded-xl"
                                loading="lazy"
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">How to Download LinkedIn Videos</h3>

                        {/* Step-by-Step with Images - Cropped */}
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform" style={{ height: '280px' }}>
                                <Image
                                    src="/images/linkedin-step1.png"
                                    alt="Step 1: Find LinkedIn Video"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform" style={{ height: '280px' }}>
                                <Image
                                    src="/images/linkedin-step2.png"
                                    alt="Step 2: Copy Link"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                            </div>
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 transform" style={{ height: '280px' }}>
                                <Image
                                    src="/images/linkedin-step3.png"
                                    alt="Step 3: Paste and Download"
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why Download LinkedIn Videos?</h3>

                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-500/20 my-6">
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start gap-3">
                                    <Target className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    <span><strong className="text-white">Professional Development:</strong> Save educational videos and industry insights for continuous learning and career growth.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <VideoIcon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                    <span><strong className="text-white">Training Archives:</strong> Download corporate training materials and onboarding videos for team development.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                                    <span><strong className="text-white">Market Research:</strong> Study industry trends and competitor strategies through professional video content.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Award className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                    <span><strong className="text-white">Content Repurposing:</strong> Use professional LinkedIn videos for presentations, reports, and internal communications.</span>
                                </li>
                            </ul>
                        </div>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">LinkedIn Video Quality & Formats</h3>
                        <p className="text-gray-300 leading-relaxed text-lg mb-4">
                            Download LinkedIn videos in multiple quality options to suit your needs:
                        </p>

                        <div className="grid md:grid-cols-3 gap-4 my-6">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-5 rounded-xl border border-blue-500/30 text-center hover:scale-105 transform transition-all duration-300">
                                <div className="text-3xl font-bold text-blue-400 mb-2">1080p</div>
                                <div className="text-white font-semibold mb-1">Full HD</div>
                                <div className="text-gray-400 text-sm">Best Quality</div>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-5 rounded-xl border border-cyan-500/30 text-center hover:scale-105 transform transition-all duration-300">
                                <div className="text-3xl font-bold text-cyan-400 mb-2">720p</div>
                                <div className="text-white font-semibold mb-1">HD</div>
                                <div className="text-gray-400 text-sm">High Quality</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-5 rounded-xl border border-blue-500/30 text-center hover:scale-105 transform transition-all duration-300">
                                <div className="text-3xl font-bold text-blue-400 mb-2">480p</div>
                                <div className="text-white font-semibold mb-1">SD</div>
                                <div className="text-gray-400 text-sm">Fast Download</div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Best Practices for LinkedIn Videos</h3>
                        <div className="bg-slate-700/40 p-6 rounded-xl border border-blue-500/20 my-6">
                            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
                                <li><strong className="text-white">Professional Use:</strong> Download educational content and webinars for offline learning and team training.</li>
                                <li><strong className="text-white">Respect Copyright:</strong> Always credit original creators and use downloaded content ethically.</li>
                                <li><strong className="text-white">Archive Important Content:</strong> Save valuable industry insights and thought leadership videos before they're removed.</li>
                                <li><strong className="text-white">Offline Access:</strong> Download conference talks and presentations for viewing during travel or offline study.</li>
                                <li><strong className="text-white">Team Sharing:</strong> Create internal knowledge bases with downloaded professional development content.</li>
                            </ol>
                        </div>

                        <p className="text-gray-300 leading-relaxed text-lg mt-6">
                            Start downloading LinkedIn videos now with our fast, free, and secure tool. Perfect for professionals, entrepreneurs, students, and anyone looking to save valuable business content for offline access and continuous learning.
                        </p>
                    </div>
                </article>

            </div>
        </div>
    );
}
