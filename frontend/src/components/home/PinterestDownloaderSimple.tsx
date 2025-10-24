'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function PinterestDownloaderSimple() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with URL:', url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Pinterest Downloader - Simple Test
        </h1>

        <div className="bg-slate-800 rounded-2xl p-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste Pinterest URL here..."
            className="w-full px-6 py-4 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={loading}
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !url.trim()}
            className="w-full mt-4 px-6 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
          >
            <Search className="inline h-5 w-5 mr-2" />
            {loading ? 'Processing...' : 'Get Content'}
          </button>

          <div className="mt-4 text-gray-400 text-sm">
            Loading state: {loading ? 'true' : 'false'}<br />
            URL value: {url || '(empty)'}<br />
            Input disabled: {loading ? 'YES' : 'NO'}
          </div>
        </div>
      </div>
    </div>
  );
}
