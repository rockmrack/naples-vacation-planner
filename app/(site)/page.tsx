import Link from "next/link";
import { site } from "@/src/config/site";
import { getFeaturedPosts } from "@/src/lib/content";
import { SafeImage } from "@/src/components/SafeImage";
import { MediaLogos, EnterpriseStats, SecurityBadges } from "@/src/components/EnterpriseComponents";
import { TrustBadges, TrustStats } from "@/src/components/TrustBadges";
import { AuthorBio } from "@/src/components/AuthorBio";
import { TestimonialsCarousel } from "@/src/components/TestimonialsCarousel";
import { getAllAuthors } from "@/src/lib/authors";
import { getFeaturedTestimonials, getAverageRating, getVerifiedReviewCount } from "@/src/lib/testimonials";

// Category cards data
const categories = [
    {
        title: "Itineraries",
        description: "Day-by-day plans crafted by certified travel experts",
        href: "/itineraries",
        icon: "📅",
        gradient: "from-ocean-400 to-blue-600",
        count: "6 guides",
    },
    {
        title: "Where to Stay",
        description: "Neighborhood guides verified by local residents",
        href: "/where-to-stay",
        icon: "🏨",
        gradient: "from-palm-400 to-green-600",
        count: "4 areas",
    },
    {
        title: "Day Trips",
        description: "Expert-planned excursions with insider tips",
        href: "/day-trips",
        icon: "🚗",
        gradient: "from-sunset-400 to-orange-600",
        count: "3 trips",
    },
    {
        title: "Travel Tips",
        description: "Practical advice from Naples locals",
        href: "/travel-tips",
        icon: "💡",
        gradient: "from-amber-400 to-yellow-600",
        count: "4 guides",
    },
];

// Why choose us features
const whyChooseUs = [
    {
        title: "Expert-Verified Content",
        description: "Every guide is researched and verified by certified travel professionals with 8+ years of Naples experience.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: "Local Florida Experts",
        description: "Our team lives in Naples. We personally visit every restaurant, beach, and attraction we recommend.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        title: "Updated Monthly",
        description: "Content is reviewed and updated every month to ensure accuracy. We verify hours, pricing, and availability.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
    },
    {
        title: "Transparent & Honest",
        description: "We clearly disclose affiliate relationships. Our editorial recommendations are never influenced by partnerships.",
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
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
            {/* Hero Section - Enterprise Grade */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-ocean-900 to-gray-900" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 hero-pattern opacity-30" />

                {/* Animated Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-ocean-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute top-40 right-20 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-40 left-20 w-72 h-72 bg-ocean-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

                {/* Content */}
                <div className="relative z-10 section-container text-center text-white py-20">
                    {/* Trust Badge at Top */}
                    <div className="animate-fade-in mb-8">
                        <a href="/reviews" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10 hover:bg-white/20 transition-colors">
                            <span className="flex items-center gap-1 text-amber-400">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ))}
                            </span>
                            <span className="text-white/90">{avgRating} rating from {reviewCount} verified travelers</span>
                        </a>
                    </div>

                    <div className="animate-fade-in">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-ocean-600/30 to-teal-600/30 backdrop-blur-sm text-sm font-medium mb-6 border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Florida's #1 Naples Travel Planning Resource
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display animate-slide-up max-w-5xl mx-auto leading-tight">
                        Plan Your Perfect{" "}
                        <span className="relative">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ocean-300 via-teal-300 to-ocean-300">
                                Naples Vacation
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-ocean-400/0 via-teal-400 to-ocean-400/0 rounded-full" />
                        </span>
                    </h1>

                    <p className="mt-8 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '200ms' }}>
                        Expert-verified itineraries, insider neighborhood guides, and trusted travel tips
                        from locals who've helped <strong className="text-white">12,500+ travelers</strong> experience Southwest Florida.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <Link
                            href="/itineraries"
                            className="btn-primary bg-gradient-to-r from-ocean-500 to-teal-500 text-white shadow-xl shadow-ocean-500/30 hover:shadow-2xl hover:from-ocean-400 hover:to-teal-400 px-8 py-4"
                        >
                            Browse Itineraries
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/about"
                            className="btn-secondary bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4"
                        >
                            Meet Our Experts
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <TrustBadges variant="compact" />
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Enterprise Stats Bar */}
            <EnterpriseStats />

            {/* As Featured In - Media Logos */}
            <section className="py-12 bg-gray-50 border-b border-gray-100">
                <div className="section-container">
                    <MediaLogos variant="light" />
                </div>
            </section>

            {/* Why Choose Us - Trust Section */}
            <section className="py-20 bg-white">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Why Travelers Trust Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            The Most Trusted Naples Travel Resource
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Unlike generic travel sites, we provide expert-verified, locally-researched content
                            that's updated monthly for accuracy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl hover:border-ocean-200 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-ocean-500/30 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="mt-6 font-bold text-gray-900 text-lg">{feature.title}</h3>
                                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/editorial-standards" className="text-ocean-600 hover:text-ocean-700 font-medium inline-flex items-center gap-1">
                            Read our editorial standards
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid with Trust Indicators */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-ocean-50/30">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-100 text-ocean-700 text-sm font-medium mb-4">
                            Expert-Curated Guides
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Start Planning Your Trip
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Every guide is written by certified travel experts and verified by Naples locals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.href}
                                href={category.href}
                                className="group card p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        <span className="text-2xl">{category.icon}</span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        {category.count}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg group-hover:text-ocean-600 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="mt-2 text-gray-600 text-sm">
                                    {category.description}
                                </p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1 text-xs text-green-600">
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                        </svg>
                                        Expert Verified
                                    </span>
                                    <span className="text-ocean-600 text-sm font-medium flex items-center gap-1">
                                        Explore
                                        <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <section className="py-20 bg-white">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            Verified Traveler Reviews
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Trusted by 12,500+ Travelers
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Real reviews from real travelers who planned their Naples vacation with our guides.
                        </p>
                    </div>

                    <TestimonialsCarousel testimonials={testimonials} />

                    <div className="text-center mt-10">
                        <Link href="/reviews" className="btn-secondary inline-flex items-center gap-2">
                            Read All Reviews
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet Our Experts */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-ocean-900 to-gray-900 text-white">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4 border border-white/10">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Our Expert Team
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display">
                            Meet the Experts Behind the Guides
                        </h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                            Certified travel professionals and Naples locals who personally verify every recommendation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {authors.map((author) => (
                            <div key={author.slug} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-400 to-teal-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                        {author.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{author.name}</h3>
                                        <p className="text-sm text-gray-400">{author.title}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 mb-4">{author.shortBio}</p>
                                <div className="flex flex-wrap gap-2">
                                    {author.credentials.slice(0, 2).map((cred) => (
                                        <span key={cred} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                                            {cred}
                                        </span>
                                    ))}
                                </div>
                                {author.verifiedExpert && (
                                    <div className="mt-4 flex items-center gap-1.5 text-xs text-green-400">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                        </svg>
                                        Verified Expert • {author.yearsExperience}+ years
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href="/authors" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
                            View All Team Members
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="section-container">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-sunset-100 text-sunset-700 text-sm font-medium mb-4">
                                    Latest Expert Guides
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                                    Fresh From Our Experts
                                </h2>
                                <p className="mt-3 text-gray-600">
                                    Recently published and updated guides for your Naples adventure.
                                </p>
                            </div>
                            <Link
                                href="/itineraries"
                                className="text-ocean-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
                            >
                                View all guides
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredPosts.map((post, index) => (
                                <Link
                                    key={post.slug}
                                    href={`/${post.frontmatter.type === 'itinerary' ? 'itineraries' : post.frontmatter.type === 'day-trip' ? 'day-trips' : post.frontmatter.type === 'where-to-stay' ? 'where-to-stay' : post.frontmatter.type === 'travel-tip' ? 'travel-tips' : 'maps'}/${post.slug}`}
                                    className="group card overflow-hidden animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={post.frontmatter.featuredImage}
                                            fallbackSrc="/images/placeholders/travel-tip.svg"
                                            alt={post.frontmatter.featuredImageAlt || post.frontmatter.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-medium">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                </svg>
                                                Verified
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2">
                                            {post.frontmatter.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            {post.frontmatter.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                {post.readingTime}
                                            </span>
                                            <span className="text-sm font-medium text-ocean-600 group-hover:text-ocean-700 flex items-center gap-1">
                                                Read more
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-br from-ocean-50 via-teal-50 to-ocean-50">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-100 text-ocean-700 text-sm font-medium mb-4">
                            Join 5,000+ Subscribers
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Get Insider Naples Tips
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Subscribe for seasonal updates, new expert guides, and exclusive travel tips delivered to your inbox.
                        </p>

                        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-ocean-500 focus:outline-none transition-colors text-gray-900"
                                required
                            />
                            <button
                                type="submit"
                                className="btn-primary px-8 py-3.5"
                            >
                                Subscribe
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </form>

                        <p className="mt-4 text-xs text-gray-500">
                            No spam. Unsubscribe anytime. We respect your privacy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Security Badges Footer */}
            <section className="bg-white border-t border-gray-100">
                <div className="section-container">
                    <SecurityBadges />
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-ocean-900 to-gray-900 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="section-container text-center relative">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 border border-white/10">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        Trusted by 12,500+ Travelers
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-display">
                        Ready to Plan Your Perfect Naples Trip?
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
                        Join thousands of travelers who've trusted our expert guides for their
                        Southwest Florida vacation.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/itineraries"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            View Expert Itineraries
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all duration-300"
                        >
                            Learn About Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
