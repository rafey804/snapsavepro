'use client';
import React from 'react';
import { Star, User } from 'lucide-react';

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
  platform?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            User Reviews
          </h2>
          <p className="text-gray-300 text-lg">
            See what our users say about Snap Save Pro
          </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-gray-300 text-lg font-semibold">4.8/5 (2,500+ reviews)</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">{review.name}</h4>
                <p className="text-gray-400 text-sm">{review.date}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <p className="text-gray-300 leading-relaxed mb-3">
              {review.comment}
            </p>

            {/* Platform Badge */}
            {review.platform && (
              <span className="inline-block bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold">
                {review.platform} User
              </span>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
