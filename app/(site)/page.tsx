import Link from "next/link";
import { site } from "@/src/config/site";
import { getFeaturedPosts, getDocCountsByType } from "@/src/lib/content";
import { SafeImage } from "@/src/components/SafeImage";

// Category cards data
const categories = [
    {
        title: "Itineraries",
        description: "Day-by-day plans for 2, 3, 5, or 7 day trips",
        href: "/itineraries",
        icon: "📅",
        gradient: "from-ocean-400 to-blue-600",
    },
    {
        title: "Where to Stay",
        description: "Neighborhood guides to find your perfect base",
        href: "/where-to-stay",
        icon: "🏨",
        gradient: "from-palm-400 to-green-600",
    },
    {
        title: "Day Trips",
        description: "Explore Marco Island, Everglades, and beyond",
        href: "/day-trips",
        icon: "🚗",
        gradient: "from-sunset-400 to-orange-600",
    },
    {
        title: "Travel Tips",
        description: "When to visit, what to pack, local insights",
        href: "/travel-tips",
        icon: "💡",
        gradient: "from-amber-400 to-yellow-600",
    },
];

// Highlights data
const highlights = [
    {
        title: "Naples Pier & Beach",
        description: "Iconic sunset views and Gulf swimming",
        icon: "🌅",
    },
    {
        title: "5th Avenue South",
        description: "Upscale dining and boutique shopping",
        icon: "🛍️",
    },
    {
        title: "Naples Botanical Garden",
        description: "170 acres of cultivated beauty",
        icon: "🌺",
    },
    {
        title: "Everglades Day Trips",
        description: "Wildlife adventures just 45 min away",
        icon: "🐊",
    },
];

// Stats data
const stats = [
    { value: "16+", label: "Curated Guides", icon: "📖" },
    { value: "10+", label: "Neighborhoods", icon: "📍" },
    { value: "50+", label: "Insider Tips", icon: "💡" },
    { value: "100%", label: "Free to Use", icon: "🆓" },
];

export default function HomePage() {
    let featuredPosts: ReturnType<typeof getFeaturedPosts> = [];

    try {
        featuredPosts = getFeaturedPosts(3);
    } catch {
        // Content not yet created
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-ocean-500 to-teal-600" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 hero-pattern opacity-50" />

                {/* Animated Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute top-40 right-20 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-40 left-20 w-72 h-72 bg-ocean-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

                {/* Content */}
                <div className="relative z-10 section-container text-center text-white py-20">
                    <div className="animate-fade-in">
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6 border border-white/10">
                            <span className="text-lg">🌴</span>
                            Your Complete Guide to Naples, Florida
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display animate-slide-up max-w-5xl mx-auto leading-tight">
                        Plan Your Perfect{" "}
                        <span className="relative">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sunset-300 via-sunset-400 to-amber-300">
                                Naples Escape
                            </span>
                            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sunset-300/0 via-sunset-400 to-sunset-300/0 rounded-full" />
                        </span>
                    </h1>

                    <p className="mt-8 text-lg sm:text-xl text-ocean-100 max-w-2xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '200ms' }}>
                        Curated itineraries, neighborhood guides, and insider tips for
                        first-time visitors, families, couples, and nature lovers.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                        <Link
                            href="/itineraries"
                            className="btn-primary bg-white text-ocean-700 hover:bg-gray-50 shadow-xl shadow-black/10 hover:shadow-2xl"
                        >
                            Browse Itineraries
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/where-to-stay"
                            className="btn-secondary bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                        >
                            Find Where to Stay
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-ocean-200 animate-fade-in" style={{ animationDelay: '400ms' }}>
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                            <span>Local Expertise</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                            <span>Constantly Updated</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</span>
                            <span>Free to Use</span>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg
                        className="w-6 h-6 text-white/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="section-container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="text-3xl mb-2 block">{stat.icon}</span>
                                <div className="text-3xl sm:text-4xl font-bold text-gray-900 font-display">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 bg-white">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-ocean-100 text-ocean-700 text-sm font-medium mb-4">
                            Explore by Category
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Start Planning Your Trip
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to plan the perfect Naples vacation, from
                            detailed itineraries to practical logistics.
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
                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                >
                                    <span className="text-2xl">{category.icon}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg group-hover:text-ocean-600 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="mt-2 text-gray-600 text-sm">
                                    {category.description}
                                </p>
                                <div className="mt-4 flex items-center text-ocean-600 text-sm font-medium">
                                    <span>Explore</span>
                                    <svg
                                        className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Naples Highlights */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-ocean-50/30">
                <div className="section-container">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-palm-100 text-palm-700 text-sm font-medium mb-4">
                            Top Attractions
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Why Visit Naples?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Pristine beaches, world-class dining, and the gateway to
                            Florida&apos;s wild Everglades.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((highlight, index) => (
                            <div
                                key={highlight.title}
                                className="group bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="text-4xl group-hover:scale-125 transition-transform duration-300 inline-block">{highlight.icon}</span>
                                <h3 className="mt-4 font-bold text-gray-900">
                                    {highlight.title}
                                </h3>
                                <p className="mt-2 text-sm text-gray-600">
                                    {highlight.description}
                                </p>
                            </div>
                        ))}
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
                                    Fresh Content
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                                    Latest Guides
                                </h2>
                                <p className="mt-3 text-gray-600">
                                    Fresh content to help you plan your Naples adventure.
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
            <section className="py-20 bg-gradient-to-br from-sunset-50 via-orange-50 to-amber-50">
                <div className="section-container">
                    <div className="max-w-2xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-sunset-100 text-sunset-700 text-sm font-medium mb-4">
                            Stay Updated
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Get Naples Travel Tips
                        </h2>
                        <p className="mt-4 text-gray-600">
                            Subscribe for seasonal updates, new guides, and exclusive insider tips delivered to your inbox.
                        </p>

                        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3.5 rounded-xl border-2 border-gray-200 focus:border-sunset-500 focus:outline-none transition-colors text-gray-900"
                                required
                            />
                            <button
                                type="submit"
                                className="btn-sunset px-8 py-3.5"
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

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-ocean-600 via-ocean-600 to-teal-600 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                <div className="section-container text-center relative">
                    <h2 className="text-3xl sm:text-4xl font-bold font-display">
                        Ready to Start Planning?
                    </h2>
                    <p className="mt-4 text-lg text-ocean-100 max-w-xl mx-auto">
                        Browse our curated itineraries and find the perfect Naples vacation
                        for you.
                    </p>
                    <Link
                        href="/itineraries"
                        className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-xl bg-white text-ocean-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                        View All Itineraries
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    );
}

