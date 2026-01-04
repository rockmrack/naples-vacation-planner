import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { AuthorBio } from "@/src/components/AuthorBio";
import { TrustBadges, TrustStats } from "@/src/components/TrustBadges";
import { getAllAuthors } from "@/src/lib/authors";
import { AwardsBanner, MediaFeaturesSection, LiveStatistics } from "@/src/components/UltimateTrust";

export const metadata: Metadata = {
    title: "About Us – Naples Vacation Planner",
    description:
        "Meet the local experts behind Naples Vacation Planner. Our mission is to provide the #1 most trusted, verified travel advice for Southwest Florida.",
    alternates: {
        canonical: `${site.url}/about`,
    },
};

export default function AboutPage() {
    const authors = getAllAuthors().filter(a => a.slug !== "editorial-team");

    return (
        <>
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-ocean-900 to-slate-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-ocean-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "About" }]} className="text-white/60 mb-8 justify-center" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Naples' #1 Trusted Resource
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto mb-6">
                        We Help You Plan the<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 to-teal-300">
                            Perfect Naples Vacation
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                        We are a team of verified local experts dedicated to providing accurate,
                        unbiased, and fact-checked travel advice for Southwest Florida.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/itineraries" className="btn-primary">
                            Explore Our Guides
                        </Link>
                        <Link href="/contact" className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Awards Banner */}
            <AwardsBanner />

            {/* Live Stats Section */}
            <div className="bg-gray-50 py-12 border-b border-gray-100">
                <div className="section-container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-gray-900 mb-1">10+</span>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-gray-900 mb-1">500+</span>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Verified Guides</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-gray-900 mb-1">12k+</span>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Travelers Helped</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-gray-900 mb-1">100%</span>
                            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Independent</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Mission */}
            <section className="section-container py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-ocean-600 font-bold tracking-wider text-sm uppercase mb-3 block">Our Mission</span>
                        <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900">
                            Trusted Travel Advice, <br />Not Generated Content
                        </h2>
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none">
                        <p className="text-xl text-gray-600 leading-relaxed text-center mb-12">
                            Naples Vacation Planner was verified with a single goal: to replace generic, AI-generated travel spam with
                            <strong> genuine, expert-verified local knowledge</strong>.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center text-2xl mb-6">🎯</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable Itineraries</h3>
                                <p className="text-gray-600">
                                    We don't just list places; we create logical, timed itineraries that account for travel time,
                                    opening hours, and local logistics.
                                </p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl mb-6">📍</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Local Expertise</h3>
                                <p className="text-gray-600">
                                    Our team lives here. We eat at the restaurants, walk the beaches, and book the tours
                                    we recommend.
                                </p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl mb-6">✅</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Information</h3>
                                <p className="text-gray-600">
                                    We factor-check our guides monthly. You won't find closed restaurants or outdated prices
                                    on our site.
                                </p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <span className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-2xl mb-6">🛡️</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Unbiased Reviews</h3>
                                <p className="text-gray-600">
                                    We pay our own way. Our recommendations are based on merit, not sponsorship. We tell you
                                    the pros and the cons.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Media Features */}
            <MediaFeaturesSection />

            {/* Meet Our Team */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="text-ocean-300 font-bold tracking-wider text-sm uppercase mb-3 block">Our Experts</span>
                        <h2 className="text-3xl lg:text-4xl font-bold font-display text-white mb-4">
                            Meet the Local Team
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Our guides are written by certified travel professionals and locals with deep roots in Southwest Florida.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authors.map((author) => (
                            <div key={author.slug} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                <AuthorBio author={author} variant="compact" showCredentials={false} showSocial={false} />
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/authors"
                            className="inline-flex items-center gap-2 text-white font-bold hover:text-ocean-300 transition-colors"
                        >
                            View All Team Credentials
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
