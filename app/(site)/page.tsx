import Link from "next/link";
import { site } from "@/src/config/site";
import { getFeaturedPosts } from "@/src/lib/content";
import { SafeImage } from "@/src/components/SafeImage";
import {
    AwardsBanner,
    TrustCertifications,
    MediaFeaturesSection,
    TrustGuarantee,
    LiveStatistics,
    ProfessionalTrustFooter,
    FactCheckedBadge
} from "@/src/components/UltimateTrust";
import { TestimonialsCarousel } from "@/src/components/TestimonialsCarousel";
import { getAllAuthors } from "@/src/lib/authors";
import { getFeaturedTestimonials, getAverageRating, getVerifiedReviewCount } from "@/src/lib/testimonials";

// Category cards data
const categories = [
    {
        title: "Expert Itineraries",
        description: "Fact-checked day-by-day plans from certified travel professionals",
        href: "/itineraries",
        icon: "📅",
        gradient: "from-ocean-500 to-blue-600",
        count: "6 guides",
        badge: "Most Popular",
    },
    {
        title: "Where to Stay",
        description: "Neighborhood guides verified by local Naples residents",
        href: "/where-to-stay",
        icon: "🏨",
        gradient: "from-palm-500 to-green-600",
        count: "4 areas",
        badge: "Updated Weekly",
    },
    {
        title: "Day Trips",
        description: "Expert-planned excursions with insider booking tips",
        href: "/day-trips",
        icon: "🚗",
        gradient: "from-sunset-500 to-orange-600",
        count: "3 trips",
        badge: "Editor's Pick",
    },
    {
        title: "Travel Tips",
        description: "Practical advice from 8+ year Naples residents",
        href: "/travel-tips",
        icon: "💡",
        gradient: "from-amber-500 to-yellow-600",
        count: "4 guides",
        badge: "Expert Advice",
    },
];

// Ultimate trust features
const trustFeatures = [
    {
        title: "Fact-Checked by Experts",
        description: "Every guide is reviewed by certified travel professionals with extensive Naples experience. We verify every fact before publication.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: "from-green-500 to-emerald-600",
    },
    {
        title: "Written by Locals",
        description: "Our team has lived in Naples for 8+ years. We personally visit every restaurant, beach, and attraction we recommend.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        color: "from-blue-500 to-ocean-600",
    },
    {
        title: "Monthly Verification",
        description: "All content is reviewed and updated every 30 days. We verify hours, pricing, seasonal changes, and closures.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        color: "from-purple-500 to-violet-600",
    },
    {
        title: "Editorial Independence",
        description: "We clearly disclose affiliate relationships. Our recommendations are based on merit, never influenced by partnerships.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        color: "from-rose-500 to-pink-600",
    },
];

export default function HomePage() {
    let featuredPosts: ReturnType<typeof getFeaturedPosts> = [];
    const authors = getAllAuthors().filter(a => a.slug !== "editorial-team").slice(0, 3);
    const testimonials = getFeaturedTestimonials(4);
    const avgRating = getAverageRating();
    const reviewCount = getVerifiedReviewCount();

    try {
        featuredPosts = getFeaturedPosts(3);
    } catch {
        // Content not yet created
    }

    return (
        <>
            {/* Award Banner - Top of Page */}
            <AwardsBanner />

            {/* Hero Section - #1 Authority Level */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                {/* Professional Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-30 30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />

                {/* Accent Lights */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center py-20">
                    {/* Trust Rating Badge */}
                    <div className="mb-8">
                        <Link href="/reviews" className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-white font-medium">{avgRating}/5</span>
                            <span className="text-white/60">from {reviewCount} verified reviews</span>
                        </Link>
                    </div>

                    {/* Authority Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ocean-600/30 to-teal-600/30 backdrop-blur-sm border border-white/10 mb-8">
                        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                        </svg>
                        <span className="text-white/90 font-medium">Florida's Most Trusted Naples Travel Resource</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white max-w-5xl mx-auto leading-tight">
                        The Definitive Guide to{" "}
                        <span className="relative inline-block">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ocean-400 via-teal-400 to-ocean-400">
                                Naples, Florida
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-ocean-400/0 via-teal-400 to-ocean-400/0 rounded-full" />
                        </span>
                    </h1>

                    <p className="mt-8 text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Award-winning, fact-checked travel guides from local experts.
                        Trusted by <strong className="text-white">15,000+ travelers</strong> planning their
                        Southwest Florida vacation.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/itineraries"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold shadow-xl shadow-ocean-500/30 hover:shadow-2xl hover:from-ocean-400 hover:to-teal-400 transition-all"
                        >
                            Browse Expert Itineraries
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
                        >
                            Why Trust Us
                        </Link>
                    </div>

                    {/* Trust Indicators Row */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8">
                        <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            <span>Fact-Checked Content</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            <span>Expert Verified</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            <span>Updated Monthly</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            <span>Award-Winning</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Statistics */}
            <LiveStatistics />

            {/* Trust Certifications */}
            <TrustCertifications />

            {/* Media Features */}
            <MediaFeaturesSection />

            {/* Why Trust Us Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-4">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                            Our Trust Standards
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
                            Why Travelers Choose Us
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                            We hold ourselves to the highest standards of editorial integrity and accuracy.
                            Every guide meets our rigorous verification process.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trustFeatures.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group p-8 rounded-2xl bg-white border-2 border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="mt-6 font-bold text-gray-900 text-xl">{feature.title}</h3>
                                <p className="mt-3 text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/editorial-standards" className="inline-flex items-center gap-2 text-ocean-600 hover:text-ocean-700 font-semibold">
                            Read Our Complete Editorial Standards
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Expert Guides Section */}
            <section className="py-24 bg-gradient-to-br from-slate-50 to-ocean-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Expert-Curated Content
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
                            Start Planning Your Trip
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                            Every guide is fact-checked by certified travel experts and verified by Naples locals.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.href}
                                href={category.href}
                                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                            >
                                {/* Badge */}
                                <div className="absolute -top-3 right-4">
                                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-ocean-500 to-teal-500 text-white text-xs font-bold shadow-lg">
                                        {category.badge}
                                    </span>
                                </div>

                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-5`}>
                                    <span className="text-3xl">{category.icon}</span>
                                </div>

                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-ocean-600 transition-colors">
                                        {category.title}
                                    </h3>
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {category.count}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-4">{category.description}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <FactCheckedBadge reviewer="" reviewDate="" variant="inline" />
                                    <span className="text-ocean-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Explore
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Verified Reviews
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
                            Trusted by 15,000+ Travelers
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                            Real reviews from verified travelers who planned their Naples vacation with our guides.
                        </p>
                    </div>

                    <TestimonialsCarousel testimonials={testimonials} />

                    <div className="text-center mt-12">
                        <Link href="/reviews" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors">
                            Read All {reviewCount} Reviews
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet Our Experts */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-bold uppercase tracking-wider mb-4 border border-white/10">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Our Expert Team
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-display">
                            Meet the Experts Behind the Guides
                        </h2>
                        <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto">
                            Certified travel professionals and Naples residents who personally verify every recommendation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {authors.map((author) => (
                            <div key={author.slug} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                                        {author.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{author.name}</h3>
                                        <p className="text-slate-400">{author.title}</p>
                                    </div>
                                </div>
                                <p className="text-slate-300 text-sm mb-6">{author.shortBio}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {author.credentials.slice(0, 2).map((cred) => (
                                        <span key={cred} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                                            {cred}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-sm text-green-400">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                        </svg>
                                        Verified Expert
                                    </div>
                                    <span className="text-sm text-slate-400">{author.yearsExperience}+ years</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/authors" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
                            Meet Our Full Team
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trust Guarantee */}
            <TrustGuarantee />

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                            <div>
                                <span className="inline-block px-4 py-2 rounded-full bg-sunset-100 text-sunset-700 text-sm font-bold uppercase tracking-wider mb-4">
                                    Latest Expert Guides
                                </span>
                                <h2 className="text-4xl font-bold font-display text-gray-900">
                                    Fresh From Our Experts
                                </h2>
                            </div>
                            <Link
                                href="/itineraries"
                                className="text-ocean-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                            >
                                View all guides
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredPosts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/${post.frontmatter.type === 'itinerary' ? 'itineraries' : post.frontmatter.type === 'day-trip' ? 'day-trips' : post.frontmatter.type === 'where-to-stay' ? 'where-to-stay' : post.frontmatter.type === 'travel-tip' ? 'travel-tips' : 'maps'}/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                                >
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={post.frontmatter.featuredImage}
                                            fallbackSrc="/images/placeholders/travel-tip.svg"
                                            alt={post.frontmatter.featuredImageAlt || post.frontmatter.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                </svg>
                                                Fact-Checked
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-ocean-600 transition-colors line-clamp-2">
                                            {post.frontmatter.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                                            {post.frontmatter.description}
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{post.readingTime}</span>
                                            <span className="text-sm font-medium text-ocean-600">Read guide →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter Section */}
            <section className="py-24 bg-gradient-to-br from-ocean-600 via-ocean-500 to-teal-600 text-white">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold mb-6">
                        Join 8,000+ Subscribers
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display">
                        Get Insider Naples Tips
                    </h2>
                    <p className="mt-4 text-xl text-ocean-100">
                        Expert travel tips, seasonal updates, and exclusive guides delivered to your inbox.
                    </p>

                    <form className="mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
                        >
                            Subscribe Free
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-ocean-200">
                        No spam ever. Unsubscribe anytime.
                    </p>
                </div>
            </section>

            {/* Professional Trust Footer */}
            <ProfessionalTrustFooter />
        </>
    );
}
