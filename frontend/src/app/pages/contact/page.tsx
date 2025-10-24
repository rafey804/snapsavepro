'use client';

import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  Send,
  User,
  Users,
  Star,
  HelpCircle,
  Bug,
  Lightbulb,
  Heart
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const contactOptions = [
    {
      icon: <Mail className="h-8 w-8 text-cyan-400" />,
      title: "Email Support",
      description: "Get help with technical issues, feature requests, or general questions",
      contact: "solutions@nafeytech.com",
      responseTime: "24 hours",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-emerald-400" />,
      title: "General Inquiries",
      description: "Questions about our service, partnerships, or business inquiries",
      contact: "solutions@nafeytech.com",
      responseTime: "48 hours",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Bug className="h-8 w-8 text-purple-400" />,
      title: "Report Issues",
      description: "Found a bug or experiencing technical difficulties?",
      contact: "solutions@nafeytech.com",
      responseTime: "12 hours",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-orange-400" />,
      title: "Feature Requests",
      description: "Suggest new features or improvements to our downloader",
      contact: "solutions@nafeytech.com",
      responseTime: "72 hours",
      color: "from-orange-500 to-red-500"
    }
  ];

  const categories = [
    { value: 'general', label: 'General Question' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'business', label: 'Business Inquiry' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, number: "10K+", label: "Support Tickets Resolved" },
    { icon: <Clock className="h-6 w-6" />, number: "< 24h", label: "Average Response Time" },
    { icon: <Star className="h-6 w-6" />, number: "4.9", label: "Customer Satisfaction" },
    { icon: <CheckCircle className="h-6 w-6" />, number: "99%", label: "Issue Resolution Rate" }
  ];

  const faqs = [
    {
      question: "How quickly do you respond to support requests?",
      answer: "We typically respond to all support requests within 24 hours. Bug reports and technical issues are prioritized and usually receive responses within 12 hours."
    },
    {
      question: "What information should I include in my support request?",
      answer: "Please include: Your browser type and version, the YouTube video URL you're trying to download, any error messages you see, and steps to reproduce the issue."
    },
    {
      question: "Do you provide phone support?",
      answer: "Currently, we only provide email support to ensure we can give detailed, documented responses to technical issues. This also allows us to maintain faster response times."
    },
    {
      question: "Can you help with downloading specific videos?",
      answer: "We can help troubleshoot technical issues with our downloader, but we cannot assist with downloading copyrighted content or bypassing restrictions on private videos."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Us - YouTube Downloader Support",
            "description": "Get help with YouTube video downloads, report issues, or contact our support team",
            "url": "https://downloaderpr.com/contact",
            "mainEntity": {
              "@type": "Organization",
              "name": "Downloader Pro",
              "email": "solutions@nafeytech.com",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "solutions@nafeytech.com",
                "availableLanguage": "English",
                "areaServed": "Worldwide"
              }
            }
          })
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 via-emerald-600/5 to-purple-600/10" />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Need help with our YouTube downloader? Have questions or feedback? 
            Our support team is here to assist you with any issues or inquiries.
          </p>
        </header>

        <div className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="flex justify-center mb-3 text-cyan-400">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How Can We Help You?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {contactOptions.map((option, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">{option.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{option.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        <a 
                          href={`mailto:${option.contact}`}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          {option.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>Response time: {option.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                  Send Us a Message
                </h2>
                
                <form action="https://formsubmit.co/solutions@nafeytech.com" method="POST" className="space-y-6">
                  {/* FormSubmit configuration fields */}
                  <input type="hidden" name="_next" value="http://localhost:3000/?contact=success" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value="New Contact Form Submission - YouTube Downloader" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                      placeholder="Please provide detailed information about your question or issue..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <Send className="h-5 w-5" />
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Quick Support FAQ
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-800/80 backdrop-blur-lg rounded-2xl border border-slate-700/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-cyan-400" />
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <div className="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-2xl p-12 border border-cyan-500/20 backdrop-blur-sm text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Direct Email Contact
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              For immediate assistance, reach out to our support team directly
            </p>
            <div className="inline-flex items-center gap-3 bg-slate-800/80 px-6 py-4 rounded-xl border border-slate-700/50">
              <Mail className="h-6 w-6 text-cyan-400" />
              <a 
                href="mailto:solutions@nafeytech.com" 
                className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg transition-colors"
              >
                solutions@nafeytech.com
              </a>
            </div>
            <p className="text-gray-400 mt-4">
              We typically respond within 24 hours
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-pink-400" />
              <h2 className="text-2xl font-bold text-white">We Value Your Feedback</h2>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your suggestions help us improve our YouTube downloader service.
              Whether it&apos;s a feature request, bug report, or general feedback, we read every message and use it to enhance your experience.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}