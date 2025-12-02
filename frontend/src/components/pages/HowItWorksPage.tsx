'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Download,
    Shield,
    Zap,
    Globe,
    CheckCircle,
    ArrowRight,
    Copy,
    Settings,
    Smartphone,
    Monitor,
    Tablet,
    Star,
    Users,
    TrendingUp
} from 'lucide-react';

export default function HowItWorksPage() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            id: 1,
            title: "Copy YouTube Video URL",
            description: "Navigate to YouTube and find the video you want to download. Copy the video URL from your browser's address bar or use the share button.",
            details: [
                "Works with any YouTube video URL format",
                "Supports youtube.com and youtu.be links",
                "Compatible with playlists and channels",
                "No account login required"
            ],
            icon: <Copy className="h-8 w-8" />,
            color: "from-cyan-500 to-blue-500"
        },
        {
            id: 2,
            title: "Paste URL in Our Downloader",
            description: "Return to our YouTube downloader tool and paste the copied URL into the input field. Click the 'Download Video' button to analyze.",
            details: [
                "Instant video information extraction",
                "Automatic quality detection",
                "Shows video thumbnail and details",
                "Supports videos up to 2+ hours"
            ],
            icon: <Search className="h-8 w-8" />,
            color: "from-emerald-500 to-teal-500"
        },
        {
            id: 3,
            title: "Choose Your Preferred Quality",
            description: "Select from available video qualities including 4K, 1080p, 720p, or extract MP3 audio. All formats are processed for optimal compatibility.",
            details: [
                "4K Ultra HD for maximum quality",
                "1080p Full HD for balanced size/quality",
                "720p HD for mobile devices",
                "MP3 audio extraction available"
            ],
            icon: <Settings className="h-8 w-8" />,
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 4,
            title: "Download & Enjoy",
            description: "Click download and the file will be saved to your device automatically. View offline anytime, anywhere on any device.",
            details: [
                "Automatic download to default folder",
                "Progress tracking during download",
                "Multiple simultaneous downloads",
                "Compatible with all devices"
            ],
            icon: <Download className="h-8 w-8" />,
            color: "from-orange-500 to-red-500"
        }
    ];

    const features = [
        {
            icon: <Zap className="h-12 w-12 text-cyan-400" />,
            title: "Lightning Fast Downloads",
            description: "Our optimized servers ensure maximum download speeds for all video qualities and formats."
        },
        {
            icon: <Shield className="h-12 w-12 text-emerald-400" />,
            title: "100% Safe & Secure",
            description: "No malware, no viruses, no ads. Your downloads are completely secure and private."
        },
        {
            icon: <Globe className="h-12 w-12 text-purple-400" />,
            title: "All Quality Options",
            description: "Download in 4K, 1080p, 720p, 480p, or extract high-quality MP3 audio files."
        },
        {
            icon: <Monitor className="h-12 w-12 text-blue-400" />,
            title: "Works on All Devices",
            description: "Compatible with Windows, Mac, Android, iOS, and all modern web browsers."
        }
    ];

    const supportedDevices = [
        { icon: <Monitor className="h-6 w-6" />, name: "Desktop", description: "Windows, Mac, Linux" },
        { icon: <Smartphone className="h-6 w-6" />, name: "Mobile", description: "Android, iOS" },
        { icon: <Tablet className="h-6 w-6" />, name: "Tablet", description: "iPad, Android Tablets" }
    ];

    const supportedBrowsers = [
        { icon: <Globe className="h-6 w-6" />, name: "Chrome", supported: true },
        { icon: <Globe className="h-6 w-6" />, name: "Firefox", supported: true },
        { icon: <Globe className="h-6 w-6" />, name: "Safari", supported: true },
        { icon: <Globe className="h-6 w-6" />, name: "Edge", supported: true }
    ];

    const stats = [
        { icon: <Users className="h-8 w-8" />, number: "10k+", label: "Happy Users" },
        { icon: <Download className="h-8 w-8" />, number: "5k+", label: "Videos Downloaded" },
        { icon: <Star className="h-8 w-8" />, number: "4.9", label: "User Rating" },
        { icon: <TrendingUp className="h-8 w-8" />, number: "99.9%", label: "Uptime" }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />

            <div className="relative z-10 container mx-auto px-4 py-16">
                {/* Hero Section */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                        How It Works
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Download any YouTube video in HD quality with our simple 4-step process.
                        No software installation, no registration required - completely free and secure.
                    </p>
                </header>

                {/* Stats Section */}
                <section className="mb-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 text-center">
                                <div className="flex justify-center mb-3 text-cyan-400">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="mb-20" itemScope itemType="https://schema.org/HowTo">
                    <h2 className="text-3xl font-bold text-white text-center mb-12" itemProp="name">
                        Download YouTube Videos in 4 Easy Steps
                    </h2>

                    <div className="max-w-6xl mx-auto">
                        {/* Desktop Step Navigation */}
                        <div className="hidden lg:flex justify-center mb-12">
                            <div className="flex items-center gap-4">
                                {steps.map((step, index) => (
                                    <React.Fragment key={step.id}>
                                        <button
                                            onClick={() => setActiveStep(index)}
                                            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeStep === index
                                                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg scale-105`
                                                    : 'bg-slate-800/80 text-gray-300 hover:text-white hover:bg-slate-700/80'
                                                }`}
                                        >
                                            {step.icon}
                                            <span>Step {step.id}</span>
                                        </button>
                                        {index < steps.length - 1 && (
                                            <ArrowRight className="h-5 w-5 text-gray-400" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Active Step Details */}
                        <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden">
                            <div className="p-8 lg:p-12">
                                <div className="flex items-start gap-6">
                                    <div className={`w-16 h-16 bg-gradient-to-r ${steps[activeStep].color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}>
                                        {steps[activeStep].icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-4" itemProp="name">
                                            {steps[activeStep].title}
                                        </h3>
                                        <p className="text-gray-300 text-lg leading-relaxed mb-6" itemProp="text">
                                            {steps[activeStep].description}
                                        </p>
                                        <ul className="space-y-3">
                                            {steps[activeStep].details.map((detail, index) => (
                                                <li key={index} className="flex items-center gap-3 text-sm text-emerald-400">
                                                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Step Cards */}
                        <div className="lg:hidden space-y-6 mt-12">
                            {steps.map((step, index) => (
                                <div key={step.id} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6" itemScope itemType="https://schema.org/HowToStep">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-3" itemProp="name">
                                                Step {step.id}: {step.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed mb-4" itemProp="text">
                                                {step.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {step.details.map((detail, detailIndex) => (
                                                    <li key={detailIndex} className="flex items-center gap-2 text-sm text-emerald-400">
                                                        <CheckCircle className="h-3 w-3 flex-shrink-0" />
                                                        {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Why Choose Our YouTube Downloader?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    {feature.icon}
                                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Compatibility Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Works on All Devices & Browsers
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Supported Devices */}
                            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                    <Monitor className="h-6 w-6 text-cyan-400" />
                                    Supported Devices
                                </h3>
                                <div className="space-y-4">
                                    {supportedDevices.map((device, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                                            <div className="text-emerald-400">{device.icon}</div>
                                            <div>
                                                <div className="font-medium text-white">{device.name}</div>
                                                <div className="text-sm text-gray-400">{device.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Supported Browsers */}
                            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
                                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                                    <Globe className="h-6 w-6 text-purple-400" />
                                    Supported Browsers
                                </h3>
                                <div className="space-y-4">
                                    {supportedBrowsers.map((browser, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 bg-slate-700/50 rounded-lg">
                                            <div className="text-purple-400">{browser.icon}</div>
                                            <div className="flex-1">
                                                <div className="font-medium text-white">{browser.name}</div>
                                            </div>
                                            <CheckCircle className="h-5 w-5 text-emerald-400" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Quality Guide */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Available Download Qualities
                    </h2>

                    <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden max-w-5xl mx-auto">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-700/50">
                                    <tr>
                                        <th className="text-left p-6 text-white font-semibold">Quality</th>
                                        <th className="text-left p-6 text-white font-semibold">Resolution</th>
                                        <th className="text-left p-6 text-white font-semibold">File Size (10min)</th>
                                        <th className="text-left p-6 text-white font-semibold">Best For</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t border-slate-700/30 hover:bg-slate-700/30">
                                        <td className="p-6 text-cyan-400 font-medium">4K Ultra HD</td>
                                        <td className="p-6 text-gray-300">3840x2160</td>
                                        <td className="p-6 text-gray-300">~400-800MB</td>
                                        <td className="p-6 text-emerald-400">Large screens, editing</td>
                                    </tr>
                                    <tr className="border-t border-slate-700/30 hover:bg-slate-700/30">
                                        <td className="p-6 text-cyan-400 font-medium">1080p Full HD</td>
                                        <td className="p-6 text-gray-300">1920x1080</td>
                                        <td className="p-6 text-gray-300">~150-300MB</td>
                                        <td className="p-6 text-emerald-400">Most users, general viewing</td>
                                    </tr>
                                    <tr className="border-t border-slate-700/30 hover:bg-slate-700/30">
                                        <td className="p-6 text-cyan-400 font-medium">720p HD</td>
                                        <td className="p-6 text-gray-300">1280x720</td>
                                        <td className="p-6 text-gray-300">~75-150MB</td>
                                        <td className="p-6 text-emerald-400">Mobile devices, limited storage</td>
                                    </tr>
                                    <tr className="border-t border-slate-700/30 hover:bg-slate-700/30">
                                        <td className="p-6 text-cyan-400 font-medium">MP3 Audio</td>
                                        <td className="p-6 text-gray-300">Audio Only</td>
                                        <td className="p-6 text-gray-300">~10-15MB</td>
                                        <td className="p-6 text-emerald-400">Music, podcasts, audio content</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-12 border border-cyan-500/20 backdrop-blur-sm">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Start Downloading?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Try our free YouTube video downloader now. No registration required,
                            completely secure, and works with all video qualities.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                        >
                            <Download className="h-5 w-5" />
                            Start Downloading Now
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}
