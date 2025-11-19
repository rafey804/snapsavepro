import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BookOpen,
  FileText,
  Users,
  Globe
} from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://snapsavepro.com';

export const metadata: Metadata = {
  title: 'Legal & Copyright Guide for Video Downloads | SnapSavePro',
  description: 'Complete guide to legal video downloading, copyright laws, fair use, and responsible content use. Understand your rights and obligations when downloading videos from social media.',
  keywords: 'copyright law, fair use, video download legal, dmca, content rights, legal video download, youtube copyright, tiktok copyright, instagram copyright',
  alternates: {
    canonical: `${baseUrl}/en/pages/legal-copyright-guide`,
    languages: {
      'en': `${baseUrl}/en/pages/legal-copyright-guide`,
      'hi': `${baseUrl}/hi/pages/legal-copyright-guide`,
      'zh': `${baseUrl}/zh/pages/legal-copyright-guide`,
      'ur': `${baseUrl}/ur/pages/legal-copyright-guide`,
      'x-default': `${baseUrl}/en/pages/legal-copyright-guide`,
    },
  },
};

export default function LegalCopyrightGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Scale className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
              Legal & Copyright Guide
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Understanding copyright law, fair use, and responsible video downloading practices.
            Know your rights and obligations when downloading content from social media platforms.
          </p>
        </header>

        {/* Important Disclaimer */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/30">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-yellow-400 mb-3">Important Legal Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed">
                  This guide provides general information about copyright law and video downloading. It is not legal advice.
                  Copyright laws vary by country and situation. For specific legal guidance, consult a qualified attorney in
                  your jurisdiction. SnapSavePro is a tool provider; users are responsible for how they use downloaded content
                  and must comply with all applicable laws.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Copyright Basics */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              Copyright Law Basics
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Copyright law grants creators exclusive rights to their original works, including videos, music, images, and text.
                When someone uploads a video to TikTok, YouTube, Instagram, or Facebook, they retain copyright unless they explicitly
                transfer it. This means downloading and using someone else's video may infringe their copyright, depending on how
                you use it.
              </p>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">What Copyright Protects</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-700/30 p-6 rounded-xl border border-blue-500/20">
                  <h4 className="text-xl font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Protected Elements
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Original video content and editing</li>
                    <li>• Music and audio tracks</li>
                    <li>• Visual effects and graphics</li>
                    <li>• Choreography and performances</li>
                    <li>• Scripts and dialogue</li>
                    <li>• Cinematography and direction</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-purple-500/20">
                  <h4 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    NOT Protected
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Ideas and concepts</li>
                    <li>• Facts and data</li>
                    <li>• Public domain content</li>
                    <li>• Works with expired copyright</li>
                    <li>• Government-produced content (in most countries)</li>
                    <li>• Content explicitly released under Creative Commons</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mt-8 mb-4">Platform Terms of Service</h3>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                When you use TikTok, YouTube, Instagram, or Facebook, you agree to their Terms of Service. Most platforms explicitly
                prohibit downloading content without permission, with specific exceptions:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-slate-900/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="text-left p-4 text-white font-semibold">Platform</th>
                      <th className="text-left p-4 text-white font-semibold">Official Download Feature</th>
                      <th className="text-left p-4 text-white font-semibold">Third-Party Downloads</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-pink-400 font-medium">TikTok</td>
                      <td className="p-4 text-gray-300">Yes, with watermark</td>
                      <td className="p-4 text-yellow-400">Gray area in TOS</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-red-400 font-medium">YouTube</td>
                      <td className="p-4 text-gray-300">Premium only (app-locked)</td>
                      <td className="p-4 text-red-400">Prohibited in TOS</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-purple-400 font-medium">Instagram</td>
                      <td className="p-4 text-gray-300">No official option</td>
                      <td className="p-4 text-yellow-400">Gray area in TOS</td>
                    </tr>
                    <tr className="border-t border-slate-700">
                      <td className="p-4 text-blue-400 font-medium">Facebook</td>
                      <td className="p-4 text-gray-300">Limited (own content)</td>
                      <td className="p-4 text-yellow-400">Gray area in TOS</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">
                <strong className="text-white">Important:</strong> Violating Terms of Service can result in account suspension
                or termination. However, TOS violations are civil matters between you and the platform, separate from copyright law.
              </p>
            </div>
          </article>
        </section>

        {/* Fair Use Doctrine */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-400" />
              Fair Use Doctrine (U.S. Law)
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Fair use allows limited use of copyrighted material without permission for specific purposes. In the U.S., courts
                evaluate fair use based on four factors. Note that fair use is a legal defense, not a right, and can only be
                determined definitively by a court.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-xl border border-blue-500/30">
                  <h3 className="text-xl font-semibold text-blue-400 mb-4">1. Purpose and Character of Use</h3>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="font-semibold text-emerald-400 mb-1">Favors Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Educational purposes</li>
                        <li>• News reporting and commentary</li>
                        <li>• Criticism and review</li>
                        <li>• Parody and satire</li>
                        <li>• Transformative use (adding new meaning)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-400 mb-1">Against Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Commercial use for profit</li>
                        <li>• Entertainment without transformation</li>
                        <li>• Simple republication</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="text-xl font-semibold text-purple-400 mb-4">2. Nature of Copyrighted Work</h3>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="font-semibold text-emerald-400 mb-1">Favors Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Factual or educational content</li>
                        <li>• Published works</li>
                        <li>• News and documentaries</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-400 mb-1">Against Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Highly creative works (music, film)</li>
                        <li>• Unpublished works</li>
                        <li>• Fiction and entertainment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500/20 to-red-500/20 p-6 rounded-xl border border-pink-500/30">
                  <h3 className="text-xl font-semibold text-pink-400 mb-4">3. Amount and Substantiality Used</h3>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="font-semibold text-emerald-400 mb-1">Favors Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Small portions or clips</li>
                        <li>• Only what's necessary</li>
                        <li>• Non-essential segments</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-400 mb-1">Against Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Entire work used</li>
                        <li>• "Heart" of the work</li>
                        <li>• More than necessary</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 p-6 rounded-xl border border-red-500/30">
                  <h3 className="text-xl font-semibold text-red-400 mb-4">4. Effect on Market Value</h3>
                  <div className="space-y-3 text-gray-300">
                    <div>
                      <p className="font-semibold text-emerald-400 mb-1">Favors Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• No market harm</li>
                        <li>• Different market/audience</li>
                        <li>• Increases value of original</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-red-400 mb-1">Against Fair Use:</p>
                      <ul className="space-y-1 ml-4 text-sm">
                        <li>• Substitutes for original</li>
                        <li>• Reduces sales/views</li>
                        <li>• Competes with creator</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-xl border border-blue-500/20">
                <h4 className="text-xl font-semibold text-white mb-3">Fair Use Examples</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">Likely Fair Use:</strong> Downloading a 10-second clip from a YouTube tutorial to include in your educational presentation with commentary and analysis.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">Likely Fair Use:</strong> Downloading a TikTok video to create a parody or satirical commentary video.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">NOT Fair Use:</strong> Downloading entire music videos or movies to watch offline for entertainment.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span><strong className="text-white">NOT Fair Use:</strong> Downloading viral TikToks and reposting them on your account without transformation or commentary.</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* Permitted Uses */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-emerald-400" />
              When Video Downloads Are Clearly Permitted
            </h2>

            <div className="space-y-6 text-gray-300">
              <div className="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">1. Downloading Your Own Content</h3>
                <p className="leading-relaxed">
                  You own full rights to videos you create and upload. Downloading your own TikToks, YouTube videos, Instagram Reels,
                  or Facebook content is completely legal and permitted. This protects your work against account issues, platform
                  changes, or content removal.
                </p>
              </div>

              <div className="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">2. Content With Explicit Permission</h3>
                <p className="leading-relaxed mb-3">
                  If a creator gives you explicit permission to download and use their video, this is legally permitted. Written
                  permission is best for documentation. Permission should specify:
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• What content you can download</li>
                  <li>• How you can use it (personal, commercial, educational)</li>
                  <li>• Duration of permission</li>
                  <li>• Attribution requirements</li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">3. Public Domain and Creative Commons</h3>
                <p className="leading-relaxed mb-3">
                  Content explicitly released under Creative Commons licenses or in the public domain can be downloaded and used
                  according to license terms:
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• <strong>CC0 (Public Domain):</strong> Use freely for any purpose</li>
                  <li>• <strong>CC BY:</strong> Use with attribution</li>
                  <li>• <strong>CC BY-SA:</strong> Use with attribution, share derivatives under same license</li>
                  <li>• <strong>CC BY-NC:</strong> Non-commercial use only with attribution</li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 p-6 rounded-xl border border-emerald-500/20">
                <h3 className="text-xl font-semibold text-emerald-400 mb-3">4. Personal, Private Use</h3>
                <p className="leading-relaxed">
                  Many jurisdictions allow downloading for personal, private use (format-shifting). This typically means watching
                  offline for yourself, not sharing, redistributing, or using commercially. However, this is not universally accepted
                  and varies by country.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Prohibited Uses */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              Clearly Prohibited and Risky Uses
            </h2>

            <div className="space-y-6 text-gray-300">
              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-400 mb-3">1. Commercial Use Without Permission</h3>
                <p className="leading-relaxed">
                  Using downloaded videos in advertisements, selling compilations, or monetizing content you don't own is copyright
                  infringement. This includes using others' TikToks in your monetized YouTube videos without transformative use or
                  permission.
                </p>
              </div>

              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-400 mb-3">2. Redistribution and Reposting</h3>
                <p className="leading-relaxed">
                  Downloading viral TikToks or Instagram Reels and reposting them on your account without significant transformation
                  infringes copyright. Even crediting the creator doesn't make this legal—credit is not permission.
                </p>
              </div>

              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-400 mb-3">3. Circumventing DRM (Digital Rights Management)</h3>
                <p className="leading-relaxed">
                  Downloading content protected by DRM (like Netflix, Disney+, or YouTube Premium offline videos) by circumventing
                  technical protections violates the DMCA (Digital Millennium Copyright Act) in the U.S. and similar laws globally.
                </p>
              </div>

              <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
                <h3 className="text-xl font-semibold text-red-400 mb-3">4. Mass Content Scraping</h3>
                <p className="leading-relaxed">
                  Using automated tools to mass-download content from TikTok, YouTube, or Instagram violates Terms of Service and
                  may constitute unauthorized access to computer systems, potentially violating laws like the Computer Fraud and Abuse
                  Act (CFAA) in the U.S.
                </p>
              </div>
            </div>
          </article>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              Responsible Download Best Practices
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-400 mb-4">DO</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Download your own content for backup and archival</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Seek permission before using others' content</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Use downloads for personal, offline viewing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Support creators through official channels</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Respect Creative Commons licenses and terms</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Educate yourself on fair use for educational/critical work</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-400 mb-4">DON'T</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Repost downloaded content as your own</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Use downloads for commercial purposes without permission</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Distribute or sell downloaded content</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Assume credit equals permission</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Download DRM-protected premium content</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-gray-300">Ignore creator's wishes or platform guidelines</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* International Considerations */}
        <section className="mb-16">
          <article className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-cyan-400" />
              International Copyright Considerations
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                Copyright law varies significantly by country. While most countries are signatories to international treaties like
                the Berne Convention, specific rules differ:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">European Union</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Stricter copyright enforcement</li>
                    <li>• Right to private copying in some countries</li>
                    <li>• Article 17 holds platforms liable</li>
                    <li>• GDPR affects data collection</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Canada</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Fair dealing (similar to fair use)</li>
                    <li>• Private copying for personal use allowed</li>
                    <li>• Cannot circumvent DRM</li>
                    <li>• Educational exemptions broader than U.S.</li>
                  </ul>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-xl border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-3">Australia</h3>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Fair dealing doctrine</li>
                    <li>• Format-shifting allowed</li>
                    <li>• Time-shifting for personal use</li>
                    <li>• Strict anti-circumvention laws</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg mt-6">
                <strong className="text-white">Important:</strong> When in doubt, consult local legal resources or attorneys
                familiar with copyright law in your jurisdiction.
              </p>
            </div>
          </article>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-12 border border-blue-500/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Use SnapSavePro Responsibly
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Our tool helps you download videos for legitimate purposes. Always respect copyright,
              support creators, and use downloads responsibly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Download Responsibly
              </Link>
              <Link
                href="/pages/about"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 border border-slate-700/50"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
