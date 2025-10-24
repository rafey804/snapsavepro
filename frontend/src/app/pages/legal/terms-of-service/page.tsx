'use client';

import React from 'react';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Users, Shield, Clock, Gavel, Info, Mail, Lock, Globe, Ban, RefreshCw } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="h-12 w-12 text-cyan-400" />
            <h1 className="text-4xl lg:text-6xl font-bold text-white bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our video and audio downloader service. By using our service, you agree to these terms.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: January 2025</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Info className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Introduction & Agreement</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Welcome to Snap Save Pro. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our video and audio downloading service across multiple platforms including TikTok, Facebook, Pinterest, Snapchat, Reddit, Twitter/X, and audio content. These Terms constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and Snap Save Pro (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
              </p>
              <p>
                By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our service.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access or use the service, whether as a guest or registered user. We reserve the right to update, change, or replace any part of these Terms at our sole discretion.
              </p>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                By accessing and using Snap Save Pro&apos;s video and audio downloader service, you accept and agree to be bound by the terms and provisions of this agreement. Your use of our service constitutes your acceptance of these Terms, and you agree to comply with all applicable laws and regulations.
              </p>
              <p>
                If you do not agree to abide by these Terms, please do not use this service. Your continued use of the service following the posting of any changes to these Terms constitutes acceptance of those changes.
              </p>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-cyan-400 mb-2">Age Requirement</h4>
                <p>You must be at least 13 years old to use our service. By using our service, you represent and warrant that you meet this age requirement. Users under 18 should have parental or guardian consent before using our service.</p>
              </div>
            </div>
          </div>

          {/* Use License */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Use License & Permitted Uses</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Permission is granted to temporarily download videos and audio from supported platforms for personal, non-commercial use only. This license is subject to the following restrictions and does not include the sale or commercial use of the service or its contents.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Permitted Uses
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Download videos for personal, offline viewing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Use for educational purposes and research</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Create backups of your own uploaded content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Download public domain and Creative Commons content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>Access content you have permission to download</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Prohibited Uses
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Download copyrighted content without authorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Use for commercial purposes or resale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Redistribute, share, or publicly display downloaded content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Violate platform Terms of Service (TikTok, Facebook, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Infringe on intellectual property rights</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">User Responsibilities & Obligations</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>As a user of our service, you agree to the following responsibilities and obligations:</p>
              
              <div className="space-y-3 mt-4">
                <div className="border-l-4 border-yellow-400 pl-4 bg-yellow-400/5 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4 text-yellow-400" />
                    Copyright & Intellectual Property Compliance
                  </h4>
                  <p>You are solely responsible for ensuring you have the legal right to download and use any content. You must respect intellectual property rights, creator copyrights, trademarks, and other proprietary rights. Downloading copyrighted material without proper authorization may violate copyright laws and could result in legal consequences.</p>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-4 bg-cyan-400/5 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Gavel className="h-4 w-4 text-cyan-400" />
                    Legal Compliance
                  </h4>
                  <p>You must comply with all applicable local, state, national, and international laws, regulations, and ordinances when using our service. This includes, but is not limited to, copyright laws, data protection regulations, and platform-specific terms of service.</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4 bg-purple-400/5 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Ban className="h-4 w-4 text-purple-400" />
                    Prohibited Activities
                  </h4>
                  <p>You agree not to use our service for any unlawful or prohibited activities, including but not limited to piracy, copyright infringement, harassment, distribution of malicious software, or any activity that violates the rights of others or applicable laws.</p>
                </div>

                <div className="border-l-4 border-orange-400 pl-4 bg-orange-400/5 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-orange-400" />
                    Account Security
                  </h4>
                  <p>While we don&apos;t require account registration, you are responsible for maintaining the security of any information you provide and for all activities that occur under your access to our service. Notify us immediately of any unauthorized use.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Service Description */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Service Description & Features</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>Snap Save Pro provides a web-based platform that allows users to download videos and audio content from various social media platforms. Our service includes:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Supported Platforms</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>TikTok video downloads</li>
                    <li>Facebook video downloads</li>
                    <li>Pinterest video downloads</li>
                    <li>Snapchat content downloads</li>
                    <li>Reddit video downloads</li>
                    <li>Twitter/X media downloads</li>
                    <li>Audio extraction and downloads</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Multiple quality options</li>
                    <li>Fast download speeds</li>
                    <li>No registration required</li>
                    <li>Mobile-friendly interface</li>
                    <li>Audio-only extraction</li>
                    <li>Batch download support</li>
                    <li>Preview before download</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Service Availability & Modifications</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>We strive to provide reliable and consistent service, but please understand the following:</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Our service is provided &quot;as is&quot; and &quot;as available&quot; without any guarantees of availability, performance, or uninterrupted access</li>
                <li>We reserve the right to modify, suspend, or discontinue the service (or any part thereof) at any time with or without notice</li>
                <li>Service may be temporarily unavailable due to maintenance, updates, technical issues, or circumstances beyond our control</li>
                <li>We do not guarantee compatibility with all videos, formats, or platforms at all times</li>
                <li>Download speeds, quality, and availability depend on various factors including platform restrictions, network conditions, and content availability</li>
                <li>We may impose usage limits, restrictions, or quotas on certain features to ensure fair use and service stability</li>
              </ul>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-purple-400 mb-2">Platform Changes</h4>
                <p>Social media platforms (TikTok, Facebook, etc.) may change their APIs, policies, or technical implementations at any time, which may affect our service&apos;s functionality. We will make reasonable efforts to adapt to such changes, but cannot guarantee continuous compatibility.</p>
              </div>
            </div>
          </div>

          {/* Prohibited Activities */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Prohibited Activities & Restrictions</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>The following activities are strictly prohibited when using our service. Violation of these terms may result in immediate termination of access:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Technical Abuse</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Automated or bulk downloading using bots or scripts</li>
                    <li>Circumventing access controls or security measures</li>
                    <li>Reverse engineering, decompiling, or disassembling our service</li>
                    <li>Attempting to gain unauthorized access to our systems</li>
                    <li>Overloading or interfering with service infrastructure</li>
                    <li>Using proxies or VPNs to bypass restrictions</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Content & Usage Abuse</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Commercial resale or distribution of downloads</li>
                    <li>Violating others&apos; privacy, publicity, or proprietary rights</li>
                    <li>Downloading private or restricted content</li>
                    <li>Spamming or making excessive download requests</li>
                    <li>Using the service for illegal purposes</li>
                    <li>Impersonating others or providing false information</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Consequences of Violation
                </h4>
                <p>Violation of these prohibited activities may result in immediate suspension or termination of your access to the service, reporting to appropriate authorities, and potential legal action. We reserve the right to investigate suspected violations.</p>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Intellectual Property Rights</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="space-y-3">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Our Intellectual Property</h4>
                  <p>The service, including its original content, features, functionality, design, code, graphics, logos, and trademarks, is owned by Snap Save Pro and is protected by international copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Third-Party Content</h4>
                  <p>All downloaded content remains the property of its original creators and copyright holders. Our service does not claim ownership of any downloaded content. You acknowledge that downloading content does not transfer any intellectual property rights to you.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">DMCA Compliance</h4>
                  <p>We respect intellectual property rights and comply with the Digital Millennium Copyright Act (DMCA). If you believe your copyrighted work has been infringed, please contact us with detailed information about the alleged infringement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Disclaimers & Warranties</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="font-semibold text-orange-400 mb-2">IMPORTANT DISCLAIMER</p>
                <p>
                  THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
              </div>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We do not host, store, or distribute any copyrighted content on our servers</li>
                <li>Our service merely facilitates access to content that is already publicly available on third-party platforms</li>
                <li>We are not responsible for the content, quality, accuracy, or legality of downloaded videos or audio</li>
                <li>We do not endorse, verify, or guarantee the accuracy of any downloaded content</li>
                <li>We make no warranties regarding service availability, reliability, or error-free operation</li>
                <li>We disclaim all liability for any damages resulting from use of downloaded content</li>
                <li>Users are solely responsible for their use of downloaded content and compliance with applicable laws</li>
              </ul>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-amber-400 mb-2">Third-Party Platforms</h4>
                <p>We are not affiliated with, endorsed by, or sponsored by TikTok, Facebook, Pinterest, Snapchat, Reddit, Twitter/X, or any other third-party platform. All platform names and logos are trademarks of their respective owners.</p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p className="font-semibold text-white">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SNAP SAVE PRO, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY DAMAGES WHATSOEVER, INCLUDING BUT NOT LIMITED TO:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, use, goodwill, or other intangible losses</li>
                <li>Damages resulting from unauthorized access to or use of our servers</li>
                <li>Damages resulting from any content obtained through our service</li>
                <li>Damages resulting from errors, mistakes, or inaccuracies of content</li>
                <li>Personal injury or property damage resulting from your use of the service</li>
                <li>Any bugs, viruses, or harmful code that may be transmitted through our service</li>
                <li>Claims by third parties related to your use of downloaded content</li>
              </ul>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-green-400 mb-2">Maximum Liability</h4>
                <p>Our total liability to you for all claims arising from or related to the service shall not exceed the amount you paid us (if any) to use the service, or $100 USD, whichever is less.</p>
              </div>
            </div>
          </div>

          {/* Indemnification */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Indemnification</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                You agree to indemnify, defend, and hold harmless Snap Save Pro, its officers, directors, employees, agents, affiliates, and partners from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising from:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your use or misuse of the service</li>
                <li>Your violation of these Terms of Service</li>
                <li>Your violation of any third-party rights, including intellectual property rights</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Any content you download or distribute using our service</li>
                <li>Any false or misleading information you provide</li>
                <li>Any disputes or issues you have with other users or third parties</li>
              </ul>

              <p className="mt-4">
                This indemnification obligation will survive termination of these Terms and your use of the service.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Gavel className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Governing Law & Dispute Resolution</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Applicable Law</h4>
                <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the courts located in Pakistan for the purpose of litigating all such claims or disputes.</p>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Dispute Resolution</h4>
                <p>In the event of any dispute arising from these Terms or your use of the service, you agree to first attempt to resolve the dispute informally by contacting us. If a dispute cannot be resolved informally within 30 days, either party may pursue formal legal remedies.</p>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Class Action Waiver</h4>
                <p>You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. You waive the right to participate in a class action lawsuit or class-wide arbitration.</p>
              </div>
            </div>
          </div>

          {/* Termination */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Termination</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                We reserve the right to terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including but not limited to:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violation of these Terms of Service</li>
                <li>Engaging in prohibited activities</li>
                <li>Fraudulent, abusive, or illegal activity</li>
                <li>At our sole discretion for any reason</li>
              </ul>

              <p className="mt-4">
                Upon termination, your right to use the service will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including but not limited to ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>
          </div>

          {/* Modifications to Terms */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Modifications to Terms</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                We reserve the right to modify, update, or replace these Terms of Service at any time at our sole discretion. Changes will be effective immediately upon posting to this page. We will update the &quot;Last Updated&quot; date at the top of this page when changes are made.
              </p>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-400 mb-2">Notification of Changes</h4>
                <p>For material changes to these Terms, we will make reasonable efforts to provide notice through:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>A prominent notice on our website</li>
                  <li>Email notification (if you have provided contact information)</li>
                  <li>Update to the &quot;Last Updated&quot; date</li>
                </ul>
              </div>

              <p className="mt-4">
                Your continued use of the service after any changes to these Terms constitutes acceptance of those changes. We recommend checking this page periodically for updates. If you do not agree to the modified Terms, you must discontinue use of the service immediately.
              </p>
            </div>
          </div>

          {/* Severability */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Severability & Waiver</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Severability</h4>
                <p>If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect and enforceable.</p>
              </div>
              
              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Waiver</h4>
                <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. Any waiver of any provision of these Terms will be effective only if in writing and signed by an authorized representative of Snap Save Pro.</p>
              </div>

              <div className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Entire Agreement</h4>
                <p>These Terms constitute the entire agreement between you and Snap Save Pro regarding the use of our service and supersede all prior agreements and understandings, whether written or oral, regarding the subject matter.</p>
              </div>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Third-Party Links & Services</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Our service may contain links to third-party websites, services, or platforms (including but not limited to TikTok, Facebook, Pinterest, Snapchat, Reddit, Twitter/X) that are not owned or controlled by Snap Save Pro.
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services</li>
                <li>You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any third-party websites or services</li>
                <li>We strongly advise you to read the terms of service and privacy policies of any third-party websites or services that you visit</li>
                <li>Links to third-party sites are provided for convenience only and do not constitute endorsement</li>
                <li>Each platform has its own terms of service that you must comply with</li>
              </ul>
            </div>
          </div>

          {/* User Content & Feedback */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">User Feedback & Suggestions</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                We welcome and encourage you to provide feedback, comments, and suggestions for improvements to our service (&quot;Feedback&quot;). You may submit Feedback by emailing us or through other communication channels.
              </p>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">License to Feedback</h4>
                <p>By submitting Feedback, you grant us a non-exclusive, worldwide, perpetual, irrevocable, fully-paid, royalty-free, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such Feedback in any media.</p>
              </div>

              <p className="mt-4">
                You acknowledge and agree that we are not obligated to use, display, reproduce, or distribute any Feedback, and you have no right to compel such use, display, reproduction, or distribution.
              </p>
            </div>
          </div>

          {/* Privacy & Data Protection */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Privacy & Data Protection</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                Your use of our service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your information.
              </p>
              
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-purple-400 mb-2">Key Privacy Points</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>We do not store downloaded video or audio content on our servers</li>
                  <li>We collect minimal personal information necessary to provide the service</li>
                  <li>We use cookies and similar technologies as described in our Privacy Policy</li>
                  <li>We do not sell your personal information to third parties</li>
                  <li>You have rights regarding your personal data as outlined in our Privacy Policy</li>
                </ul>
              </div>

              <p className="mt-4">
                By using our service, you consent to the collection and use of information as described in our Privacy Policy.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                If you have any questions, concerns, or feedback regarding these Terms of Service, please don&apos;t hesitate to contact us:
              </p>
              
              <div className="bg-slate-900/50 p-6 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Email Address</p>
                    <a href="mailto:solutions@nafeytech.com" className="text-cyan-400 hover:text-cyan-300 text-sm">solutions@nafeytech.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Subject Line</p>
                    <p className="text-sm text-gray-300">Terms of Service Inquiry / Legal Question</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Service Name</p>
                    <p className="text-sm text-gray-300">Snap Save Pro - Video & Audio Downloader</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Response Time</p>
                    <p className="text-sm text-gray-300">We typically respond within 48-72 hours during business days</p>
                  </div>
                </div>
              </div>

              <p className="text-sm mt-6">
                For urgent legal matters, please include &quot;URGENT - LEGAL&quot; in your subject line. We take all legal inquiries seriously and will respond as quickly as possible.
              </p>
            </div>
          </div>

          {/* Acknowledgment & Acceptance */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Acknowledgment & Acceptance</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p className="font-semibold text-white">
                BY USING OUR SERVICE, YOU ACKNOWLEDGE THAT:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You have read, understood, and agree to be bound by these Terms of Service</li>
                <li>You meet all age and eligibility requirements</li>
                <li>You have the legal capacity to enter into this binding agreement</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>You understand the limitations and disclaimers outlined in these Terms</li>
                <li>You accept all risks associated with downloading and using content</li>
                <li>You have reviewed our Privacy Policy and consent to our data practices</li>
              </ul>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mt-6">
                <p className="font-semibold text-emerald-400 mb-2">
                  Important Reminder
                </p>
                <p>
                  If you do not agree with any part of these Terms of Service, you must immediately discontinue use of our service. Your continued use after any changes to these Terms constitutes acceptance of those changes.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 border-t border-slate-700/50 pt-8 space-y-4">
            <p className="font-semibold text-white">
              Thank you for using Snap Save Pro
            </p>
            <p>
              These Terms of Service are effective as of January 2025 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
            </p>
            <p>
              By using our video and audio downloading service, you agree to use it responsibly, respect intellectual property rights, and comply with all applicable laws and platform terms of service.
            </p>
            <p className="text-xs mt-4">
              © 2025 Snap Save Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}