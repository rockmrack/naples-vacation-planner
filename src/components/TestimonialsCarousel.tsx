"use client";

import { useState, useEffect } from "react";
import { type Testimonial } from "@/src/lib/testimonials";

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
    autoPlay?: boolean;
    interval?: number;
}

export function TestimonialsCarousel({
    testimonials,
    autoPlay = true,
    interval = 5000,
}: TestimonialsCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, testimonials.length]);

    if (testimonials.length === 0) return null;

    const current = testimonials[activeIndex];

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Main testimonial card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                {/* Rating stars */}
                <div className="flex justify-center gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-6 h-6 ${star <= current.rating ? "text-amber-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-gray-700 text-center font-medium leading-relaxed">
                    "{current.highlight}"
                </blockquote>

                {/* Author */}
                <div className="mt-8 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {current.name.charAt(0)}
                    </div>
                    <div className="mt-4 text-center">
                        <div className="font-bold text-gray-900">{current.name}</div>
                        <div className="text-sm text-gray-500">
                            {current.location} • {current.tripType}
                        </div>
                    </div>
                    {current.verified && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Verified Traveler
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === activeIndex
                                ? "bg-ocean-600 w-8"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        aria-label={`View testimonial ${index + 1}`}
                    />
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-ocean-600 transition-colors hidden md:block"
                aria-label="Previous testimonial"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-ocean-600 transition-colors hidden md:block"
                aria-label="Next testimonial"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
