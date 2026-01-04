"use client";

import Link from "next/link";
import { type Testimonial } from "@/src/lib/testimonials";

interface TestimonialCardProps {
    testimonial: Testimonial;
    variant?: "full" | "compact" | "highlight";
}

export function TestimonialCard({ testimonial, variant = "full" }: TestimonialCardProps) {
    const stars = Array(5).fill(0).map((_, i) => (
        <svg
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    ));

    if (variant === "highlight") {
        return (
            <div className="relative p-6 rounded-2xl bg-white shadow-lg border border-gray-100">
                {/* Quote icon */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-ocean-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-ocean-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>

                <div className="flex gap-1 mb-3">{stars}</div>

                <p className="text-lg text-gray-700 font-medium leading-relaxed">
                    "{testimonial.highlight}"
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    {testimonial.verified && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                        </span>
                    )}
                </div>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-2">{stars}</div>
                <p className="text-sm text-gray-700 line-clamp-3">"{testimonial.highlight}"</p>
                <div className="mt-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center text-ocean-600 font-semibold text-xs">
                        {testimonial.name.split(" ")[0][0]}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Full variant
    return (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ocean-100 to-ocean-200 flex items-center justify-center text-ocean-600 font-bold text-lg flex-shrink-0">
                    {testimonial.name.split(" ")[0][0]}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-gray-900">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                        <div className="flex gap-0.5">{stars}</div>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 rounded-full bg-ocean-50 text-ocean-700">{testimonial.tripType}</span>
                        {testimonial.verified && (
                            <span className="inline-flex items-center gap-1 text-green-600">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified Review
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">"{testimonial.text}"</p>

            <p className="mt-3 text-xs text-gray-400">
                {new Date(testimonial.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
        </div>
    );
}

interface TestimonialsGridProps {
    testimonials: Testimonial[];
    variant?: "full" | "compact" | "highlight";
    columns?: 1 | 2 | 3;
}

export function TestimonialsGrid({ testimonials, variant = "full", columns = 3 }: TestimonialsGridProps) {
    const gridCols = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    };

    return (
        <div className={`grid ${gridCols[columns]} gap-6`}>
            {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} variant={variant} />
            ))}
        </div>
    );
}

interface TestimonialsSummaryProps {
    averageRating: number;
    reviewCount: number;
}

export function TestimonialsSummary({ averageRating, reviewCount }: TestimonialsSummaryProps) {
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
            <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">{averageRating}</p>
                <div className="flex gap-0.5 mt-1">
                    {Array(5).fill(0).map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 ${i < fullStars ? "text-amber-400" : i === fullStars && hasHalfStar ? "text-amber-300" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
            <div className="h-12 w-px bg-amber-200" />
            <div>
                <p className="text-sm text-gray-600">
                    Based on <strong className="text-gray-900">{reviewCount}</strong> verified reviews
                </p>
                <Link
                    href="/reviews"
                    className="text-sm text-ocean-600 hover:text-ocean-700 font-medium inline-flex items-center gap-1 mt-1"
                >
                    Read all reviews
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
