import Link from "next/link";
import { site } from "@/src/config/site";
import { getFeaturedPosts, getDocCountsByType } from "@/src/lib/content";

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
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-ocean-500 to-ocean-700" />

                {/* Pattern Overlay */}
                <div className="absolute inset-0 hero-pattern opacity-50" />

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-sunset-500/20 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10 section-container text-center text-white py-20">
                    <div className="animate-fade-in">
                        <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                            🌴 Your Guide to Naples, Florida
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display animate-slide-up max-w-4xl mx-auto leading-tight">
                        Plan Your Perfect{" "}
                        <span className="text-gradient-sunset bg-clip-text text-transparent bg-gradient-to-r from-sunset-300 via-sunset-400 to-amber-300">
                            Naples Escape
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-ocean-100 max-w-2xl mx-auto animate-fade-in delay-200">
                        Curated itineraries, neighborhood guides, and insider tips for
                        first-time visitors, families, couples, and nature lovers.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-300">
                        <Link
                            href="/itineraries"
                            className="btn-primary bg-white text-ocean-700 hover:bg-gray-100 shadow-xl"
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
                    <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-ocean-200 animate-fade-in delay-400">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">✓</span>
                            <span>Local Expertise</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">✓</span>
                            <span>Constantly Updated</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">✓</span>
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

            {/* Categories Grid */}
            <section className="py-20 bg-white">
                <div className="section-container">
                    <div className="text-center mb-12">
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
                                className="group card p-6 hover:shadow-2xl"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
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
                                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                            Why Visit Naples?
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Pristine beaches, world-class dining, and the gateway to
                            Florida&apos;s wild Everglades.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {highlights.map((highlight) => (
                            <div
                                key={highlight.title}
                                className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100"
                            >
                                <span className="text-4xl">{highlight.icon}</span>
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
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900">
                                Latest Guides
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Fresh content to help you plan your Naples adventure.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredPosts.map((post) => (
                                <article key={post.slug} className="card overflow-hidden group">
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={post.frontmatter.featuredImage}
                                            alt={post.frontmatter.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2">
                                            {post.frontmatter.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                            {post.frontmatter.description}
                                        </p>
                                        <p className="mt-4 text-xs text-gray-500">
                                            {post.readingTime}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-ocean-600 to-ocean-700 text-white">
                <div className="section-container text-center">
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
