'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Review {
    id: string;
    authorName: string;
    authorAvatar?: string;
    rating: number;
    date: string;
    title: string;
    content: string;
    helpful: number;
    verified: boolean;
    photos?: string[];
}

// Star Rating Component
export function StarRating({
    rating,
    maxRating = 5,
    size = 'md',
    interactive = false,
    onChange
}: {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onChange?: (rating: number) => void;
}) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => {
                const filled = interactive ? star <= (hoverRating || rating) : star <= rating;
                return (
                    <button
                        key={star}
                        type="button"
                        disabled={!interactive}
                        onClick={() => onChange?.(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                        className={interactive ? 'cursor-pointer' : 'cursor-default'}
                    >
                        <svg
                            className={`${sizes[size]} ${filled ? 'text-yellow-400' : 'text-gray-300'} transition-colors`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                );
            })}
        </div>
    );
}

// Review Card Component
export function ReviewCard({ review }: { review: Review }) {
    const [helpfulClicked, setHelpfulClicked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-400 to-teal-400 flex items-center justify-center text-white font-bold">
                        {review.authorAvatar || review.authorName.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{review.authorName}</span>
                            {review.verified && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                    ✓ Verified
                                </span>
                            )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                </div>
                <StarRating rating={review.rating} size="sm" />
            </div>

            {/* Title & Content */}
            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.content}</p>

            {/* Photos */}
            {review.photos && review.photos.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {review.photos.map((photo, i) => (
                        <div
                            key={i}
                            className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-2xl"
                        >
                            📷
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                    onClick={() => setHelpfulClicked(true)}
                    disabled={helpfulClicked}
                    className={`text-sm flex items-center gap-1 transition-colors ${helpfulClicked ? 'text-ocean-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful ({review.helpful + (helpfulClicked ? 1 : 0)})
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    Report
                </button>
            </div>
        </motion.div>
    );
}

// Review Form Component
export function ReviewForm({
    onSubmit,
    contentType,
    contentTitle
}: {
    onSubmit: (review: Omit<Review, 'id' | 'date' | 'helpful' | 'verified'>) => void;
    contentType: string;
    contentTitle: string;
}) {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        onSubmit({
            authorName,
            rating,
            title,
            content,
        });

        setSubmitted(true);
        setIsSubmitting(false);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
            >
                <span className="text-5xl mb-4 block">✅</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">Your review has been submitted and will appear after moderation.</p>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Write a Review</h3>
            <p className="text-gray-600 mb-6">Share your experience with {contentTitle}</p>

            {/* Rating */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating *</label>
                <StarRating rating={rating} size="lg" interactive onChange={setRating} />
                {rating === 0 && (
                    <p className="text-sm text-red-500 mt-1">Please select a rating</p>
                )}
            </div>

            {/* Name */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="John S."
                />
            </div>

            {/* Title */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Title *</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    placeholder="Summarize your experience"
                />
            </div>

            {/* Content */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
                    placeholder="Share details about your experience..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || rating === 0}
                className="w-full py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
}

// Reviews Section Component
export function ReviewsSection({
    reviews,
    contentType,
    contentTitle,
    averageRating,
    totalReviews
}: {
    reviews: Review[];
    contentType: string;
    contentTitle: string;
    averageRating: number;
    totalReviews: number;
}) {
    const [showForm, setShowForm] = useState(false);
    const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'helpful') return b.helpful - a.helpful;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviews</h2>
                    <div className="flex items-center gap-3">
                        <StarRating rating={Math.round(averageRating)} />
                        <span className="font-semibold text-gray-900">{averageRating.toFixed(1)}</span>
                        <span className="text-gray-500">({totalReviews} reviews)</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                    </select>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-ocean-500 text-white font-semibold rounded-lg hover:bg-ocean-600 transition-colors"
                    >
                        Write a Review
                    </button>
                </div>
            </div>

            {/* Review Form */}
            {showForm && (
                <div className="mb-8">
                    <ReviewForm
                        contentType={contentType}
                        contentTitle={contentTitle}
                        onSubmit={(review) => {
                            console.log('Review submitted:', review);
                            setShowForm(false);
                        }}
                    />
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {sortedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {/* Load More */}
            {reviews.length > 5 && (
                <div className="text-center mt-8">
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                        Load More Reviews
                    </button>
                </div>
            )}
        </section>
    );
}
