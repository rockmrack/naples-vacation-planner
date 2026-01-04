import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { TestimonialCard, TestimonialsGrid, TestimonialsSummary } from "@/src/components/TestimonialCard";
import { getAllTestimonials, getAverageRating, getVerifiedReviewCount } from "@/src/lib/testimonials";

export const metadata: Metadata = {
    title: "Traveler Reviews - See What Our Readers Say",
    description:
        "Read verified reviews from travelers who used Naples Vacation Planner to plan their trips. Real feedback from real visitors to Naples, Florida.",
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
            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-sunset-500" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "Reviews" }]} className="text-white/80 mb-8 justify-center" />

                    <div className="flex justify-center gap-1 mb-6">
                        {Array(5).fill(0).map((_, i) => (
                            <svg key={i} className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
                        Traveler Reviews
                    </h1>

                    <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        See what real travelers have to say about planning their Naples vacation with our guides.
                    </p>

                    <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm">
                        <div className="text-left">
                            <p className="text-3xl font-bold text-white">{averageRating}</p>
                            <p className="text-sm text-white/80">average rating</p>
                        </div>
                        <div className="w-px h-10 bg-white/30" />
                        <div className="text-left">
                            <p className="text-3xl font-bold text-white">{reviewCount}</p>
                            <p className="text-sm text-white/80">verified reviews</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="section-container py-16">
                <TestimonialsGrid testimonials={testimonials} variant="full" columns={2} />
            </section>

            {/* How Reviews Work */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50/30">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-2xl lg:text-3xl font-bold font-display text-gray-900 mb-4">
                            About Our Reviews
                        </h2>
                        <p className="text-gray-600">
                            We believe in transparency. Here's how we collect and display traveler feedback.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                            <span className="text-3xl mb-4 block">✅</span>
                            <h3 className="font-bold text-gray-900 mb-2">Verified Travelers</h3>
                            <p className="text-sm text-gray-600">
                                All reviews come from real travelers who used our guides. We verify their trips before publishing.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                            <span className="text-3xl mb-4 block">📝</span>
                            <h3 className="font-bold text-gray-900 mb-2">Unedited Feedback</h3>
                            <p className="text-sm text-gray-600">
                                We publish reviews as submitted, with only minor edits for clarity. No filtering of negative feedback.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                            <span className="text-3xl mb-4 block">🔄</span>
                            <h3 className="font-bold text-gray-900 mb-2">Ongoing Collection</h3>
                            <p className="text-sm text-gray-600">
                                We continuously invite readers to share their travel experiences to keep feedback current.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Share Your Experience */}
            <section className="section-container py-16">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-5xl mb-6 block">💬</span>
                    <h2 className="text-2xl lg:text-3xl font-bold font-display text-gray-900 mb-4">
                        Share Your Experience
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Used our guides to plan your Naples trip? We'd love to hear about your experience!
                        Your feedback helps other travelers and helps us improve.
                    </p>
                    <Link href="/contact" className="btn-primary">
                        Submit Your Review
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="section-container text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold font-display text-white mb-4">
                        Ready to Plan Your Trip?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Join thousands of satisfied travelers who've used our guides to discover Naples, Florida.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/itineraries" className="btn-primary">
                            Browse Itineraries
                        </Link>
                        <Link href="/about" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
                            About Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
