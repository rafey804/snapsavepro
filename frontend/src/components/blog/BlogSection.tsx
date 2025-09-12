"use client"
import React from 'react';
import { Calendar, User, ArrowRight, Download, Zap, Shield, Clock, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const BlogSection: React.FC = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'How to Download YouTube Videos in 4K Quality - Complete Guide 2024',
      excerpt: 'Learn the best methods to download YouTube videos in highest quality including 4K, 1080p, and 720p formats. Step-by-step guide with tips and tricks for optimal results.',
      author: 'Tech Expert',
      date: '2024-08-25',
      readTime: '5 min read',
      category: 'Tutorial',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop&crop=center&q=80',
      featured: true
    },
    {
      id: '2',
      title: 'Top 10 Best YouTube Video Downloaders in 2024 - Free & Premium',
      excerpt: 'Compare the best YouTube video downloaders available. Find out which tools offer the best quality, speed, and features for your specific needs.',
      author: 'Download Expert',
      date: '2024-08-23',
      readTime: '8 min read',
      category: 'Reviews',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&crop=center&q=80'
    },
    {
      id: '3',
      title: 'Is Downloading YouTube Videos Legal? Everything You Need to Know',
      excerpt: 'Understanding the legal aspects of downloading YouTube videos. Learn about copyright, fair use, and when it\'s safe to download content legally.',
      author: 'Legal Advisor',
      date: '2024-08-20',
      readTime: '6 min read',
      category: 'Legal',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop&crop=center&q=80'
    },
    {
      id: '4',
      title: 'Convert YouTube Videos to MP3 - High Quality Audio Download',
      excerpt: 'Extract high-quality audio from YouTube videos. Learn about different audio formats and bitrates for the best listening experience possible.',
      author: 'Audio Expert',
      date: '2024-08-18',
      readTime: '4 min read',
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop&crop=center&q=80'
    },
    {
      id: '5',
      title: 'YouTube Video Download Speed Tips - Faster Downloads Guaranteed',
      excerpt: 'Optimize your YouTube video download speed with these proven techniques. Get faster downloads without compromising quality or reliability.',
      author: 'Speed Master',
      date: '2024-08-15',
      readTime: '7 min read',
      category: 'Tips',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&crop=center&q=80'
    },
    {
      id: '6',
      title: 'Mobile YouTube Video Downloader - Download on Phone & Tablet',
      excerpt: 'Download YouTube videos directly on your mobile device. Best apps and methods for Android and iOS users with step-by-step instructions.',
      author: 'Mobile Expert',
      date: '2024-08-12',
      readTime: '5 min read',
      category: 'Mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop&crop=center&q=80'
    }
  ];

  const categories = ['All', 'Tutorial', 'Reviews', 'Legal', 'Audio', 'Tips', 'Mobile'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const nonFeaturedPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Latest <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Insights</span>
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest guides, tips, and insights about YouTube video downloading
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12 lg:mb-20">
            <div className="flex items-center mb-6 lg:mb-8">
              <Zap className="h-6 w-6 text-yellow-400 mr-2" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">Featured Article</h3>
            </div>
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-1 shadow-2xl border border-purple-500/30">
              <div className="bg-black/40 rounded-2xl lg:rounded-3xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden order-2 lg:order-1">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 sm:h-80 lg:h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        <Zap className="h-3 w-3 inline mr-1" />
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center order-1 lg:order-2">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-purple-300 mb-4">
                      <span className="bg-purple-600/30 px-3 py-1 rounded-full flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 hover:text-purple-200 transition-colors cursor-pointer leading-tight">
                      {featuredPost.title}
                    </h4>
                    <p className="text-purple-100 mb-6 leading-relaxed text-base sm:text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center text-purple-200">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{featuredPost.author}</span>
                      </div>
                      <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 font-medium">
                        Read Article
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                    : 'bg-black/30 text-purple-200 hover:bg-black/50 border border-purple-500/30 hover:border-purple-400/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {nonFeaturedPosts.length > 0 && (
          <div className="mb-16 lg:mb-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 lg:mb-12">Latest Articles</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {nonFeaturedPosts.map((post) => (
                <article key={post.id} className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm rounded-xl lg:rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-purple-300 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 hover:text-purple-200 transition-colors cursor-pointer leading-tight group-hover:text-purple-200">
                      {post.title}
                    </h4>
                    <p className="text-purple-100 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-purple-500/20">
                      <div className="flex items-center text-purple-200 text-sm">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span>{post.author}</span>
                      </div>
                      <button className="text-purple-400 hover:text-white text-sm flex items-center transition-colors group-hover:text-purple-300">
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 border border-purple-500/20 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                <Download className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Stay Updated</h3>
            </div>
            <p className="text-purple-100 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Get the latest tips, tutorials, and insights about YouTube video downloading delivered directly to your inbox. Join thousands of satisfied users.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 bg-black/30 border border-purple-500/30 text-white placeholder-purple-300 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Subscribe
              </button>
            </div>
            <p className="text-purple-300 text-sm mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;