'use client';

import React from 'react';
import { Shield, Eye, Cookie, Database, Lock, Globe } from 'lucide-react';

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
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when using our YouTube downloader service.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last updated: January 2025</p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-6 w-6 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Information You Provide</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Contact form information (name, email, message) when you contact us</li>
                  <li>YouTube URLs you submit for downloading</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Basic usage analytics (pages visited, time spent on site)</li>
                  <li>Browser type and version for compatibility</li>
                  <li>IP address for security and spam prevention</li>
                  <li>Device information for service optimization</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm"><strong>Service Provision:</strong> To process your YouTube video downloads and provide our core service</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm"><strong>Communication:</strong> To respond to your inquiries and provide customer support</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm"><strong>Service Improvement:</strong> To analyze usage patterns and improve our service</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm"><strong>Security:</strong> To protect against abuse, spam, and unauthorized access</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Data Protection & Security</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>HTTPS encryption for all data transmission</li>
                <li>No storage of downloaded video content on our servers</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information by authorized personnel only</li>
                <li>Automatic deletion of temporary processing files</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Cookies & Tracking</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">We use minimal cookies and tracking:</p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white">Essential Cookies</h4>
                  <p className="text-sm">Required for basic site functionality and security</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Analytics</h4>
                  <p className="text-sm">Anonymous usage statistics to improve our service (can be disabled)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white">No Advertising Cookies</h4>
                  <p className="text-sm">We do not use cookies for advertising or tracking across other websites</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Third-Party Services</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">We may use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>YouTube API:</strong> For video information retrieval</li>
                <li><strong>Email Service:</strong> For contact form submissions</li>
                <li><strong>Analytics:</strong> For usage statistics (anonymized)</li>
                <li><strong>CDN Services:</strong> For faster content delivery</li>
              </ul>
              <p className="text-sm mt-4">These services have their own privacy policies that govern their use of information.</p>
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            </div>
            
            <div className="space-y-3 text-gray-300">
              <p className="text-sm">You have the following rights regarding your personal information:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-white mb-1">Access</h4>
                  <p className="text-sm">Request information about data we hold</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Correction</h4>
                  <p className="text-sm">Request correction of inaccurate data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Deletion</h4>
                  <p className="text-sm">Request deletion of your personal data</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Portability</h4>
                  <p className="text-sm">Request data in a portable format</p>
                </div>
              </div>
              <p className="text-sm mt-4">Contact us at <a href="mailto:solutions@nafeytech.com" className="text-cyan-400 hover:text-cyan-300">solutions@nafeytech.com</a> to exercise these rights.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <strong>Email:</strong> <a href="mailto:solutions@nafeytech.com" className="text-cyan-400 hover:text-cyan-300">solutions@nafeytech.com</a>
              </p>
              <p className="text-sm text-gray-300">
                <strong>Subject:</strong> Privacy Policy Inquiry
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>This Privacy Policy may be updated periodically. We will notify users of significant changes.</p>
          </div>
        </div>
      </div>
    </main>
  );
}