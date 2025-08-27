'use client';

import React from 'react';
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Users } from 'lucide-react';

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
            Please read these terms carefully before using our YouTube downloader service. By using our service, you agree to these terms.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: January 2025</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                By accessing and using our YouTube downloader service, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-sm">
                These terms apply to all visitors, users, and others who access or use the service.
              </p>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Use License</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm font-semibold text-white mb-2">Permission is granted to temporarily download YouTube videos for personal, non-commercial use only.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    You MAY:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Download videos for personal viewing</li>
                    <li>Use for educational purposes</li>
                    <li>Create backups of your own content</li>
                    <li>Download public domain content</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    You MAY NOT:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Download copyrighted content without permission</li>
                    <li>Use for commercial purposes</li>
                    <li>Redistribute downloaded content</li>
                    <li>Violate YouTube's Terms of Service</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-white mb-1">Copyright Compliance</h4>
                  <p className="text-sm">You are responsible for ensuring you have the right to download and use any content. Respect intellectual property rights and creator copyrights.</p>
                </div>
                
                <div className="border-l-4 border-cyan-400 pl-4">
                  <h4 className="font-semibold text-white mb-1">Legal Compliance</h4>
                  <p className="text-sm">You must comply with all applicable local, national, and international laws when using our service.</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-white mb-1">Prohibited Use</h4>
                  <p className="text-sm">Do not use our service for any unlawful or prohibited activities, including but not limited to piracy or copyright infringement.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Service Availability</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Our service is provided "as is" without any guarantees of availability or performance</li>
                <li>We may modify, suspend, or discontinue the service at any time without notice</li>
                <li>Service may be temporarily unavailable due to maintenance, updates, or technical issues</li>
                <li>We do not guarantee compatibility with all YouTube videos or formats</li>
                <li>Download speeds and quality depend on various factors beyond our control</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-6 w-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Prohibited Activities</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">The following activities are strictly prohibited:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Automated or bulk downloading</li>
                  <li>Circumventing access controls</li>
                  <li>Reverse engineering our service</li>
                  <li>Distributing malware or viruses</li>
                </ul>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Commercial resale of downloads</li>
                  <li>Violating others' privacy rights</li>
                  <li>Spamming or excessive requests</li>
                  <li>Impersonating others</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Disclaimer</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="text-sm">
                  <strong className="text-orange-400">IMPORTANT:</strong> We do not host, store, or distribute any copyrighted content. 
                  Our service merely facilitates access to content that is already publicly available on YouTube.
                </p>
              </div>
              
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>We are not responsible for the content of downloaded videos</li>
                <li>We do not endorse or verify the accuracy of any content</li>
                <li>Users are solely responsible for their use of downloaded content</li>
                <li>We disclaim all warranties, express or implied</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              
              <div className="space-y-2 text-sm">
                <p><strong className="text-white">Our liability is limited to:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Providing the service to the best of our ability</li>
                  <li>Reasonable efforts to maintain service availability</li>
                  <li>Responding to user inquiries and support requests</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Modifications to Terms</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. 
                Your continued use of the service after changes constitutes acceptance of the new terms.
              </p>
              <p className="text-sm">
                We recommend checking this page periodically for updates.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <strong>Email:</strong> <a href="mailto:solutions@nafeytech.com" className="text-cyan-400 hover:text-cyan-300">solutions@nafeytech.com</a>
              </p>
              <p className="text-sm text-gray-300">
                <strong>Subject:</strong> Terms of Service Inquiry
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>By using our service, you acknowledge that you have read and understood these terms and agree to be bound by them.</p>
          </div>
        </div>
      </div>
    </main>
  );
}