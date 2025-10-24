'use client';

import React from 'react';
import { Shield, Eye, Cookie, Database, Lock, Globe, FileText, UserCheck, AlertTriangle, Mail, RefreshCw, Server, MapPin, Scale, Users, FileCheck, Ban, Info } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-12 w-12 text-cyan-400" />
            <h1 className="text-4xl lg:text-6xl font-bold text-white bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when using our video and audio downloader service.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: January 2025</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                Welcome to Snap Save Pro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, store, share, and protect your information when you use our video and audio downloading services across multiple platforms including TikTok, Facebook, Pinterest, Snapchat, Reddit, Twitter/X, and audio content.
              </p>
              <p>
                By accessing or using our website and services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with our policies and practices, please do not use our services. This policy applies to all visitors, users, and others who access or use our services.
              </p>
              <p>
                We understand the importance of data privacy and security in today&apos;s digital age. Our commitment is to maintain the highest standards of data protection while providing you with excellent service. This comprehensive policy outlines our practices and your rights regarding your personal information.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">1. Information You Provide Directly</h3>
                <p className="text-sm mb-2">When you use our service, you may provide us with the following information:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Contact Information:</strong> Name, email address, and message content when you contact us through our contact form or support channels</li>
                  <li><strong>Video/Audio URLs:</strong> Social media URLs (TikTok, Facebook, Pinterest, Snapchat, Reddit, Twitter/X) you submit for downloading purposes</li>
                  <li><strong>Feedback and Communications:</strong> Any feedback, suggestions, or communications you send to us</li>
                  <li><strong>User Preferences:</strong> Your download format preferences, quality settings, and other customization options</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">2. Automatically Collected Information</h3>
                <p className="text-sm mb-2">When you access our service, we automatically collect certain information:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Usage Data:</strong> Pages visited, time spent on site, download history, features used, and interaction patterns</li>
                  <li><strong>Device Information:</strong> Browser type and version, operating system, device type, screen resolution, and language preferences</li>
                  <li><strong>IP Address:</strong> Your Internet Protocol address for security, fraud prevention, and geographic analysis</li>
                  <li><strong>Cookies and Similar Technologies:</strong> Data collected through cookies, web beacons, and similar tracking technologies</li>
                  <li><strong>Referral Information:</strong> Information about how you found our website (search engines, social media, direct links)</li>
                  <li><strong>Error and Performance Data:</strong> Technical logs, error reports, and performance metrics to improve service quality</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">3. Information from Third Parties</h3>
                <p className="text-sm mb-2">We may receive limited information from third-party platforms:</p>
                <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                  <li><strong>Social Media Platforms:</strong> Public video/audio metadata necessary to process downloads</li>
                  <li><strong>Analytics Providers:</strong> Aggregated usage statistics and demographic information</li>
                  <li><strong>Security Services:</strong> Threat intelligence and security verification data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">We use the collected information for various purposes, including:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm"><strong>Service Provision and Improvement:</strong> To process your video and audio download requests, maintain and improve our service functionality, develop new features, and optimize user experience across all supported platforms</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm"><strong>Communication and Support:</strong> To respond to your inquiries, provide customer support, send service-related notifications, and communicate important updates about our service</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm"><strong>Security and Fraud Prevention:</strong> To protect against abuse, spam, unauthorized access, detect and prevent fraud, ensure service security, and maintain the integrity of our platform</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm"><strong>Analytics and Research:</strong> To analyze usage patterns, understand user behavior, conduct research for service improvement, and generate aggregated statistics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm"><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, and enforceable governmental requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm"><strong>Service Personalization:</strong> To remember your preferences, provide customized content, and enhance your overall experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Protection & Security */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Data Protection & Security</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, or destruction:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Server className="h-4 w-4 text-orange-400" />
                    Technical Measures
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>HTTPS/SSL encryption for all data transmission</li>
                    <li>Secure server infrastructure with firewalls</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Encrypted data storage for sensitive information</li>
                    <li>DDoS protection and anti-bot measures</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-orange-400" />
                    Organizational Measures
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Limited access to personal information</li>
                    <li>Employee training on data protection</li>
                    <li>Confidentiality agreements with staff</li>
                    <li>Regular security awareness programs</li>
                    <li>Incident response procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Important Security Notice
                </h4>
                <p className="text-sm text-gray-300">
                  We do not store downloaded video or audio content on our servers. All downloads are processed in real-time and delivered directly to your device. Temporary processing files are automatically deleted within minutes of download completion.
                </p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Data Retention</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:</p>
              
              <div className="space-y-3">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Service Data</h4>
                  <p>URLs and download requests are processed in real-time and not permanently stored. Temporary logs are kept for 24-48 hours for troubleshooting purposes only.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Contact Information</h4>
                  <p>Contact form submissions are retained for up to 2 years or until the inquiry is resolved and no longer needed for support purposes.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Analytics Data</h4>
                  <p>Anonymized usage statistics and analytics data are retained for up to 26 months to help us understand long-term trends and improve our service.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Security Logs</h4>
                  <p>Security and access logs are retained for 90 days for fraud prevention and security analysis purposes.</p>
                </div>
              </div>

              <p className="mt-4">When data is no longer needed, we securely delete or anonymize it. You may request deletion of your personal data at any time by contacting us.</p>
            </div>
          </div>

          {/* Cookies & Tracking */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Cookies & Tracking Technologies</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">We use cookies and similar tracking technologies to enhance your experience. Here&apos;s what you need to know:</p>
              
              <div className="space-y-3">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-green-400" />
                    Essential Cookies (Required)
                  </h4>
                  <p className="text-sm mb-2">These cookies are necessary for basic site functionality and cannot be disabled:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Session management and security</li>
                    <li>User preference storage (quality settings, format preferences)</li>
                    <li>Anti-fraud and abuse prevention</li>
                    <li>Load balancing and performance optimization</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-400" />
                    Analytics Cookies (Optional)
                  </h4>
                  <p className="text-sm mb-2">These help us understand how visitors use our service:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Anonymous usage statistics and page views</li>
                    <li>Feature usage patterns and popular content</li>
                    <li>Performance metrics and error tracking</li>
                    <li>User journey and navigation analysis</li>
                  </ul>
                  <p className="text-sm mt-2 text-cyan-400">You can opt-out of analytics cookies through your browser settings.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Ban className="h-4 w-4 text-red-400" />
                    What We DON&apos;T Use
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Advertising cookies or ad tracking</li>
                    <li>Cross-site tracking or behavioral profiling</li>
                    <li>Third-party marketing cookies</li>
                    <li>Social media tracking pixels</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-blue-400 mb-2">Managing Cookies</h4>
                <p className="text-sm">You can control cookies through your browser settings. Please note that disabling essential cookies may affect site functionality. Most browsers allow you to refuse cookies or delete existing ones.</p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Third-Party Services & Integrations</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">To provide our services, we integrate with several third-party platforms and services. Each has its own privacy policy:</p>
              
              <div className="space-y-3">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Social Media Platforms</h4>
                  <p className="text-sm mb-2">We interact with these platforms to retrieve public video and audio information:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li><strong>TikTok:</strong> Video metadata and public content information</li>
                    <li><strong>Facebook:</strong> Public video data and thumbnails</li>
                    <li><strong>Pinterest:</strong> Pin information and media URLs</li>
                    <li><strong>Snapchat:</strong> Public story content (where available)</li>
                    <li><strong>Reddit:</strong> Public post data and video links</li>
                    <li><strong>Twitter/X:</strong> Tweet data and attached media</li>
                  </ul>
                  <p className="text-sm mt-2 text-gray-400">We only access publicly available information and do not access private or restricted content.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Analytics Providers</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Anonymous usage statistics and traffic analysis</li>
                    <li>Performance monitoring and error tracking</li>
                    <li>User behavior patterns (aggregated data only)</li>
                  </ul>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Infrastructure & Security</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li><strong>CDN Services:</strong> For faster content delivery and reduced latency</li>
                    <li><strong>Cloud Hosting:</strong> Secure server infrastructure and data storage</li>
                    <li><strong>Email Service:</strong> For contact form delivery and support communications</li>
                    <li><strong>Security Services:</strong> DDoS protection and threat monitoring</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm mt-4">These third-party services are contractually obligated to maintain data privacy and security standards. We do not sell or share your personal information with third parties for their marketing purposes.</p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Your Privacy Rights</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">Depending on your location, you have certain rights regarding your personal information:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-400" />
                    Right to Access
                  </h4>
                  <p className="text-sm">Request a copy of the personal information we hold about you and how we use it.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-green-400" />
                    Right to Correction
                  </h4>
                  <p className="text-sm">Request correction of inaccurate or incomplete personal information.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Ban className="h-4 w-4 text-green-400" />
                    Right to Deletion
                  </h4>
                  <p className="text-sm">Request deletion of your personal data, subject to certain exceptions.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4 text-green-400" />
                    Right to Portability
                  </h4>
                  <p className="text-sm">Request your data in a structured, commonly used, machine-readable format.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-400" />
                    Right to Restrict
                  </h4>
                  <p className="text-sm">Request restriction of processing of your personal information in certain circumstances.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                    <Ban className="h-4 w-4 text-green-400" />
                    Right to Object
                  </h4>
                  <p className="text-sm">Object to processing of your personal information where we rely on legitimate interests.</p>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  How to Exercise Your Rights
                </h4>
                <p className="text-sm">To exercise any of these rights, please contact us at <a href="mailto:solutions@nafeytech.com" className="text-cyan-400 hover:text-cyan-300 underline">solutions@nafeytech.com</a> with the subject line &quot;Privacy Rights Request.&quot; We will respond to your request within 30 days.</p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-white">Children&apos;s Privacy</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>Our service is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
              
              <p>If we discover that we have collected personal information from a child under 13, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us at solutions@nafeytech.com.</p>

              <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-pink-400 mb-2">Parental Responsibility</h4>
                <p>We encourage parents and guardians to monitor their children&apos;s internet usage and help enforce this Privacy Policy by instructing children never to provide personal information through our service without permission.</p>
              </div>
            </div>
          </div>

          {/* International Data Transfers */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">International Data Transfers</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.</p>
              
              <p>If you are located outside Pakistan and choose to provide information to us, please note that we transfer the data, including personal information, to Pakistan and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>

              <p>We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy. We use appropriate safeguards to protect your information during international transfers, including:</p>

              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Standard contractual clauses approved by relevant authorities</li>
                <li>Encryption of data during transfer</li>
                <li>Ensuring third parties maintain adequate data protection standards</li>
                <li>Regular audits of data transfer practices</li>
              </ul>
            </div>
          </div>

          {/* Legal Basis for Processing */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Legal Basis for Processing</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>We process your personal information based on the following legal grounds:</p>
              
              <div className="space-y-3">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Consent</h4>
                  <p>When you provide explicit consent for us to process your information for specific purposes (e.g., contacting us through forms).</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Contract Performance</h4>
                  <p>Processing necessary to provide the services you requested (video/audio downloading).</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Legitimate Interests</h4>
                  <p>Processing necessary for our legitimate interests in operating and improving our service, provided these interests are not overridden by your rights and interests.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Legal Obligations</h4>
                  <p>Processing necessary to comply with legal obligations, court orders, or regulatory requirements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Breach Notification */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Data Breach Notification</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>In the unlikely event of a data breach that affects your personal information, we will:</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Notify affected users within 72 hours of becoming aware of the breach</li>
                <li>Provide detailed information about the nature of the breach and data affected</li>
                <li>Describe the measures we are taking to address the breach</li>
                <li>Offer recommendations for steps you can take to protect yourself</li>
                <li>Notify relevant regulatory authorities as required by law</li>
                <li>Conduct a thorough investigation and implement additional security measures</li>
              </ul>

              <p className="mt-4">We maintain incident response procedures and regularly test our breach notification protocols to ensure timely and effective communication in case of any security incident.</p>
            </div>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Changes to This Privacy Policy</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Update the &quot;Last Updated&quot; date at the top of this policy</li>
                <li>Notify users of material changes through a prominent notice on our website</li>
                <li>For significant changes, send email notifications to registered users (if applicable)</li>
                <li>Maintain an archive of previous versions for reference</li>
              </ul>

              <p className="mt-4">We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of our service after any changes indicates your acceptance of the updated Privacy Policy.</p>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-purple-400 mb-2">Material Changes</h4>
                <p>If we make material changes that significantly affect your privacy rights, we will provide at least 30 days&apos; notice before the changes take effect, giving you time to review and, if desired, discontinue use of the service.</p>
              </div>
            </div>
          </div>

          {/* Do Not Track Signals */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Do Not Track Signals</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>Some web browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no uniform standard for how DNT signals should be interpreted.</p>

              <p>Our service currently does not respond to DNT signals. However, we are committed to minimal tracking and do not track your activities across third-party websites. We only collect the information necessary to provide and improve our service as described in this Privacy Policy.</p>

              <p className="mt-4">You can still control cookies and tracking through your browser settings, as described in the &quot;Cookies &amp; Tracking Technologies&quot; section above.</p>
            </div>
          </div>

          {/* California Privacy Rights */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">California Privacy Rights (CCPA)</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
              
              <div className="space-y-3">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Right to Know</h4>
                  <p>You can request information about the personal information we have collected about you in the past 12 months, including categories of information, sources, purposes, and third parties with whom we share it.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Right to Delete</h4>
                  <p>You can request deletion of your personal information, subject to certain exceptions.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Right to Opt-Out</h4>
                  <p>You have the right to opt-out of the sale of your personal information. Note: We do not sell personal information.</p>
                </div>
                
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Right to Non-Discrimination</h4>
                  <p>We will not discriminate against you for exercising any of your CCPA rights.</p>
                </div>
              </div>

              <p className="mt-4">To exercise these rights, contact us at solutions@nafeytech.com with &quot;CCPA Request&quot; in the subject line.</p>
            </div>
          </div>

          {/* GDPR Compliance (European Users) */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">GDPR Compliance (European Users)</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>If you are located in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR):</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right to Access:</strong> Obtain confirmation of whether we process your personal data and access to such data</li>
                <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain circumstances</li>
                <li><strong>Right to Restrict Processing:</strong> Request restriction of processing in certain situations</li>
                <li><strong>Right to Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local supervisory authority</li>
              </ul>

              <p className="mt-4">We process data based on consent, contractual necessity, legal obligations, and legitimate interests as described in this policy. To exercise your GDPR rights, contact us at solutions@nafeytech.com.</p>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don&apos;t hesitate to contact us:
              </p>
              
              <div className="bg-slate-900/50 p-6 rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Email</p>
                    <a href="mailto:solutions@nafeytech.com" className="text-cyan-400 hover:text-cyan-300 text-sm">solutions@nafeytech.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Subject Line</p>
                    <p className="text-sm text-gray-300">Privacy Policy Inquiry / Privacy Rights Request</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">Service</p>
                    <p className="text-sm text-gray-300">Snap Save Pro - Video & Audio Downloader</p>
                  </div>
                </div>
              </div>

              <p className="text-sm mt-6">
                We typically respond to privacy inquiries within 48 hours during business days. For requests to exercise your privacy rights, we will respond within 30 days as required by applicable law.
              </p>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <UserCheck className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Acknowledgment</h2>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <p>
                By using our service, you acknowledge that you have read and understood this Privacy Policy and agree to be bound by its terms. If you do not agree with this policy, please discontinue use of our service immediately.
              </p>
              
              <p>
                This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collected through Snap Save Pro. This policy does not apply to any information collected offline or via channels other than this website.
              </p>

              <p className="font-semibold text-white mt-6">
                Thank you for trusting Snap Save Pro with your video and audio downloading needs. We are committed to protecting your privacy and providing a secure, reliable service.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-400 border-t border-slate-700/50 pt-8">
            <p className="mb-2">This Privacy Policy is effective as of January 2025 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
            <p className="text-xs">© 2025 Snap Save Pro. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}