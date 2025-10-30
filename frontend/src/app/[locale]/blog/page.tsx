'use client';
import React from 'react';
import { getAllBlogs } from '@/data/blogs';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-purple-600/5 to-pink-600/10" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
            Video Download Guides & Tips
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Expert guides, tutorials, and tips for downloading videos from TikTok, Instagram, YouTube, Facebook and more.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id}>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.className = parent.className.replace('overflow-hidden', 'overflow-hidden bg-gradient-to-br ' +
                          (blog.category === 'TikTok' ? 'from-cyan-500 to-pink-500' :
                           blog.category === 'Instagram' ? 'from-purple-500 to-pink-500' :
                           blog.category === 'YouTube' ? 'from-red-500 to-orange-500' :
                           blog.category === 'Facebook' ? 'from-blue-500 to-indigo-500' :
                           'from-slate-700 to-slate-800'));
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-7xl opacity-20">
                      {blog.category === 'TikTok' && '🎵'}
                      {blog.category === 'Instagram' && '📸'}
                      {blog.category === 'YouTube' && '▶️'}
                      {blog.category === 'Facebook' && '👍'}
                      {blog.category === 'Guide' && '📚'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {blog.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="text-xs bg-slate-700/50 text-cyan-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
