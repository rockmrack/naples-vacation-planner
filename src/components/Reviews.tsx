"use client";

import { useState } from "react";
import { getReviewsBySlug, getAggregateRating } from "@/src/data/reviews";
import { Rating } from "@/src/components/ContentComponents";

interface ReviewsSectionProps {
    slug: string;
}

export function ReviewsSection({ slug }: ReviewsSectionProps) {
    const reviews = getReviewsBySlug(slug);
    const aggregate = getAggregateRating(slug);
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (!aggregate && reviews.length === 0) {
        return (
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Reviews</h3>
                <p className="text-gray-600 mb-6">Be the first to review this itinerary!</p>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="px-6 py-2 bg-ocean-600 text-white font-bold rounded-xl hover:bg-ocean-700 transition-colors"
                >
                    Write a Review
                </button>
                {isFormOpen && <ReviewForm onClose={() => setIsFormOpen(false)} />}
            </div>
        );
    }

    return (
        <section className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden" id="reviews">
            <div className="p-8 md:p-10 bg-gray-50 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                            Verified Reviews
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                                Trust Verified
                            </span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="text-5xl font-bold text-gray-900 leading-none">
                                {aggregate?.ratingValue}
                            </div>
                            <div>
                                <div className="flex text-amber-400 text-lg mb-1">
                                    {"★".repeat(Math.round(aggregate?.ratingValue || 0))}
                                    <span className="text-gray-300">
                                        {"★".repeat(5 - Math.round(aggregate?.ratingValue || 0))}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm font-medium">
                                    Based on {aggregate?.reviewCount} verified reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="px-8 py-3 bg-ocean-600 text-white font-bold rounded-xl hover:bg-ocean-700 transition-colors shadow-lg shadow-ocean-600/20"
                    >
                        Write a Review
                    </button>
                </div>
            </div>

            {isFormOpen && (
                <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                    <ReviewForm onClose={() => setIsFormOpen(false)} />
                </div>
            )}

            <div className="divide-y divide-gray-100">
                {reviews.map((review) => (
                    <div key={review.id} className="p-8 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-xl flex-shrink-0">
                                {review.avatar || review.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                    <h3 className="font-bold text-gray-900">{review.title}</h3>
                                    <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex text-amber-400 text-sm">
                                        {"★".repeat(review.rating)}
                                        <span className="text-gray-300">
                                            {"★".repeat(5 - review.rating)}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400">·</span>
                                    <span className="text-sm font-semibold text-gray-700">{review.author}</span>
                                    {review.verified && (
                                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                            Verified Traveler
                                        </span>
                                    )}
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {review.content}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <button className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                        Helpful ({review.helpfulCount})
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function ReviewForm({ onClose }: { onClose: () => void }) {
    const [submitted, setSubmitted] = useState(false);

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h4 className="font-bold text-green-900 mb-1">Review Submitted!</h4>
                <p className="text-sm text-green-700 mb-4">
                    Thanks for sharing your experience. Our team will review it shortly.
                </p>
                <button onClick={onClose} className="text-sm text-green-800 font-medium hover:underline">
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900">Write a Review</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overall Rating</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" className="text-2xl text-gray-300 hover:text-amber-400 focus:text-amber-400 transition-colors">★</button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" id="name" required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-ocean-500 focus:ring-ocean-500 text-sm p-2.5 border" placeholder="John Doe" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" id="email" required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-ocean-500 focus:ring-ocean-500 text-sm p-2.5 border" placeholder="john@example.com" />
                    </div>
                </div>

                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Review Title</label>
                    <input type="text" id="title" required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-ocean-500 focus:ring-ocean-500 text-sm p-2.5 border" placeholder="Summarize your experience" />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                    <textarea id="content" rows={4} required className="w-full rounded-lg border-gray-300 shadow-sm focus:border-ocean-500 focus:ring-ocean-500 text-sm p-2.5 border" placeholder="What did you enjoy most? check out the parking? etc." />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-ocean-600 rounded-lg hover:bg-ocean-700 shadow-md shadow-ocean-600/20">
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
}
