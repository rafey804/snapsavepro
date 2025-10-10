'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { getBlogBySlug } from '@/data/blogs';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, ExternalLink, Tag } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const blog = getBlogBySlug(params.slug as string);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-purple-600/5 to-pink-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              {blog.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {blog.title}
          </h1>
          <p className="text-xl text-gray-300">
            {blog.description}
          </p>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 h-64 md:h-96 flex items-center justify-center">
          <span className="text-8xl md:text-9xl">
            {blog.category === 'TikTok' && '🎵'}
            {blog.category === 'Instagram' && '📸'}
            {blog.category === 'YouTube' && '▶️'}
            {blog.category === 'Facebook' && '👍'}
            {blog.category === 'Guide' && '📚'}
          </span>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-slate-700/50">
            <p className="text-gray-300 leading-relaxed text-lg">
              {blog.content.introduction}
            </p>
          </div>

          {/* Sections */}
          {blog.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {section.content}
              </p>
            </div>
          ))}

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-cyan-500/30">
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              Conclusion
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              {blog.content.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span key={index} className="bg-slate-800/50 text-cyan-400 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-slate-700/50">
              <Tag className="w-4 h-4" />
              {tag}
            </span>
          ))}
        </div>

        {/* Related Tools */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold text-white mb-6">Try Our Tools</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {blog.relatedTools.map((tool, index) => (
              <Link
                key={index}
                href={tool.link}
                className="bg-slate-700/50 hover:bg-slate-700 rounded-xl p-4 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="text-sm text-gray-400">{tool.platform}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Author */}
        <div className="mt-8 flex items-center gap-4 text-gray-400">
          <span>Written by</span>
          <span className="font-semibold text-cyan-400">{blog.author}</span>
        </div>
      </div>
    </div>
  );
}
