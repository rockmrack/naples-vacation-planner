import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { TestimonialsGrid } from "@/src/components/TestimonialCard";
import { getAllTestimonials, getAverageRating, getVerifiedReviewCount } from "@/src/lib/testimonials";

export const metadata: Metadata = {
    title: "Traveler Reviews – Validated Feedback",
    description:
        "Real stories from verified travelers. See why reputable families, couples, and luxury travelers trust Naples Vacation Planner.",
    alternates: {
        canonical: `${site.url}/reviews`,
    },
};

export default function ReviewsPage() {
    const testimonials = getAllTestimonials();
    const averageRating = getAverageRating();
    const reviewCount = getVerifiedReviewCount();

    return (
        <>
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "Reviews" }]} className="text-white/60 mb-8 justify-center" />

                    <div className="flex justify-center gap-2 mb-6 animate-fade-in">
                        {Array(5).fill(0).map((_, i) => (
                            <svg key={i} className="w-8 h-8 text-amber-400 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto mb-6">
                        Verified Traveler<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                            Reviews & Stories
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                        Don't just take our word for it. Read verified feedback from the 12,000+ travelers
                        who have used our guides to plan their perfect trip.
                    </p>

                    <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-white mb-1">{averageRating}</p>
                            <p className="text-xs text-amber-200 uppercase tracking-wider font-bold">Average Rating</p>
                        </div>
                        <div className="w-px h-12 bg-white/20" />
                        <div className="text-center">
                            <p className="text-4xl font-bold text-white mb-1">{reviewCount}+</p>
                            <p className="text-xs text-amber-200 uppercase tracking-wider font-bold">Verified Reviews</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="section-container py-20 bg-gray-50">
                <TestimonialsGrid testimonials={testimonials} variant="full" columns={2} />
            </section>

            {/* Trust Promise */}
            <section className="py-20 bg-white">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold font-display text-gray-900 mb-6">
                            Our Review Promise
                        </h2>
                        <p className="text-gray-600 text-lg">
                            We believe in total transparency. Here is how we handle reviews.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                            <span className="text-4xl mb-4 block">🛡️</span>
                            <h3 className="font-bold text-gray-900 mb-2">Verified Trips</h3>
                            <p className="text-gray-600 text-sm">
                                We only publish reviews from travelers who can prove they visited Naples.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                            <span className="text-4xl mb-4 block">🔍</span>
                            <h3 className="font-bold text-gray-900 mb-2">No Edits</h3>
                            <p className="text-gray-600 text-sm">
                                We never edit reviews to change the meaning or remove negative feedback.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                            <span className="text-4xl mb-4 block">🚫</span>
                            <h3 className="font-bold text-gray-900 mb-2">Zero Bots</h3>
                            <p className="text-gray-600 text-sm">
                                We use strict spam filters to ensure every review is from a real human.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="section-container text-center">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold font-display text-white mb-6">
                            Plan Your Trip with Confidence
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Join thousands of happy travelers who saved time and money using our expert guides.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/itineraries" className="btn-primary">
                                Get Started
                            </Link>
                            <Link href="/contact" className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
