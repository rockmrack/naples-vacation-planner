import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { AuthorBio } from "@/src/components/AuthorBio";
import { TrustBadges, TrustStats } from "@/src/components/TrustBadges";
import { getAllAuthors } from "@/src/lib/authors";

export const metadata: Metadata = {
    title: "About Us - Meet the Naples Travel Experts",
    description:
        "Meet the expert travel team behind Naples Vacation Planner. Learn about our mission, editorial standards, and commitment to providing trusted Naples travel guides.",
    alternates: {
        canonical: `${site.url}/about`,
    },
};

export default function AboutPage() {
    const authors = getAllAuthors().filter(a => a.slug !== "editorial-team");

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-ocean-500 to-teal-500" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "About" }]} className="text-white/80 mb-8 justify-center" />

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Trusted Since 2024
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto">
                        Your Trusted Guide to Naples, Florida
                    </h1>

                    <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        We're a team of Naples locals and travel experts dedicated to helping you plan the perfect Southwest Florida vacation.
                    </p>

                    {/* Trust badges */}
                    <div className="mt-10">
                        <TrustBadges variant="compact" />
                    </div>
                </div>
            </section>

            {/* Trust Stats */}
            <section className="section-container -mt-12 relative z-10">
                <TrustStats variant="cards" />
            </section>

            {/* Our Mission */}
            <section className="section-container py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="badge bg-ocean-100 text-ocean-700 mb-4">Our Mission</span>
                        <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900">
                            Making Naples Travel Planning Simple
                        </h2>
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none">
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Naples Vacation Planner was founded with a simple mission: <strong>to provide the most accurate,
                                helpful, and trustworthy travel information for Naples, Florida</strong>.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mt-10">
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-ocean-50 to-white border border-ocean-100">
                                <span className="text-3xl mb-4 block">🎯</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Actionable Itineraries</h3>
                                <p className="text-gray-600">
                                    Unlike generic travel sites, we provide day-by-day itineraries with exact timings,
                                    restaurant reservations, and insider tips you can actually use.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-palm-50 to-white border border-palm-100">
                                <span className="text-3xl mb-4 block">📍</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
                                <p className="text-gray-600">
                                    Our team lives in Naples. We personally visit every restaurant, beach, and attraction
                                    we recommend—no generic AI-generated content here.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-sunset-50 to-white border border-sunset-100">
                                <span className="text-3xl mb-4 block">✅</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Information</h3>
                                <p className="text-gray-600">
                                    Every guide is fact-checked and updated monthly. We verify hours, prices, and
                                    availability so you don't encounter surprises.
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                                <span className="text-3xl mb-4 block">💯</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Honest Recommendations</h3>
                                <p className="text-gray-600">
                                    We only recommend what we genuinely love. Our editorial integrity is non-negotiable,
                                    even when affiliate partnerships are involved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-ocean-50/30">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="badge bg-ocean-100 text-ocean-700 mb-4">Our Experts</span>
                        <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900">
                            Meet the Team Behind the Guides
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Our team combines decades of Naples travel expertise to bring you thoroughly researched, locally verified content.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authors.map((author) => (
                            <AuthorBio key={author.slug} author={author} variant="compact" showCredentials={false} showSocial={false} />
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href="/authors"
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            View All Team Members
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Editorial Standards */}
            <section className="section-container py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="badge bg-green-100 text-green-700 mb-4">Editorial Standards</span>
                        <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900">
                            Our Commitment to Quality
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">First-Hand Verification</h3>
                                <p className="mt-1 text-gray-600">
                                    Every restaurant, attraction, and accommodation is personally visited by our team.
                                    We don't rely on third-party data or unverified sources.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-ocean-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Monthly Updates</h3>
                                <p className="mt-1 text-gray-600">
                                    All content is reviewed and updated monthly. We verify hours, pricing, seasonal changes,
                                    and closures to ensure accuracy.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Transparent Affiliate Relationships</h3>
                                <p className="mt-1 text-gray-600">
                                    We clearly disclose when we use affiliate links. Our recommendations are based on merit,
                                    not commissions. Read our{" "}
                                    <Link href="/affiliate-disclosure" className="text-ocean-600 hover:underline">
                                        full affiliate disclosure
                                    </Link>.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Corrections Policy</h3>
                                <p className="mt-1 text-gray-600">
                                    If we make an error, we correct it promptly and transparently. Found something incorrect?{" "}
                                    <Link href="/contact" className="text-ocean-600 hover:underline">
                                        Let us know
                                    </Link>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/editorial-standards" className="text-ocean-600 hover:text-ocean-700 font-medium">
                            Read our full editorial policy →
                        </Link>
                    </div>
                </div>
            </section>

            {/* How We Make Money */}
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="section-container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold font-display text-white mb-6">
                            How We Keep This Site Free
                        </h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Naples Vacation Planner is free because we earn revenue through affiliate partnerships with
                            hotels, tour operators, and travel services. When you book through our links, we may receive
                            a small commission at no extra cost to you.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            <strong className="text-white">Our commitment:</strong> We only recommend what we genuinely
                            believe in. Our editorial recommendations are never influenced by affiliate relationships.
                        </p>
                        <Link
                            href="/affiliate-disclosure"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Read Our Affiliate Disclosure
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="section-container py-20">
                <div className="max-w-2xl mx-auto text-center">
                    <span className="text-5xl mb-6 block">📬</span>
                    <h2 className="text-3xl font-bold font-display text-gray-900 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Have questions, feedback, or partnership inquiries? We'd love to hear from you.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact" className="btn-primary">
                            Contact Us
                        </Link>
                        <Link href="/itineraries" className="btn-secondary">
                            Explore Our Guides
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

