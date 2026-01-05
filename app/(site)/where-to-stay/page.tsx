import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { WhereToStayFrontmatter, HotelFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Where to Stay in Naples, Florida – Expert Neighborhood Guides",
    description:
        "Expert-verified guides to Naples neighborhoods. Find the perfect area for your vacation—from Old Naples luxury to Vanderbilt Beach family resorts.",
    alternates: {
        canonical: `${site.url}/where-to-stay`,
    },
};

export default function WhereToStayPage() {
    let neighborhoods: ReturnType<typeof getAllDocsByType> = [];
    let hotels: ReturnType<typeof getAllDocsByType> = [];

    try {
        neighborhoods = getAllDocsByType("where-to-stay");
    } catch {
        // No content yet
    }

    try {
        hotels = getAllDocsByType("hotel");
    } catch {
        // No hotels yet
    }

    // Get featured hotels (luxury and boutique)
    const featuredHotels = hotels
        .filter((h) => {
            const fm = h.frontmatter as HotelFrontmatter;
            return fm.category === "luxury-resort" || fm.category === "boutique";
        })
        .slice(0, 6);

    return (
        <>
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-palm-900 to-gray-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative blobs */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-palm-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Where to Stay" }]}
                        className="text-white/60 mb-8"
                    />

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palm-900/50 border border-palm-700 text-palm-300 text-xs font-bold uppercase tracking-wider">
                                Neighborhood Guides
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/50 border border-amber-700 text-amber-300 text-xs font-bold uppercase tracking-wider">
                                {hotels.length} Hotels & Resorts
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Verified by Locals
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                            Where to Stay in<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-palm-300 to-teal-300">
                                Naples, Florida
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Don't book blind. Our local experts break down every neighborhood
                            so you can find the perfect base for your vacation style.
                        </p>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <div className="border-b border-gray-100 bg-white">
                <div className="section-container py-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Visited by Our Team
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Unbiased Reviews
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Safety Checked
                        </span>
                    </div>
                </div>
            </div>

            {/* Hotels & Resorts Section */}
            {hotels.length > 0 && (
                <section className="section-container py-16 bg-white">
                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold mb-4">
                            🏨 {hotels.length} Properties
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4">
                            Hotels & Resorts
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            From luxury beachfront resorts to budget-friendly options—explore every accommodation in Naples, Marco Island, and beyond.
                        </p>
                    </div>

                    {/* Featured Hotels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {featuredHotels.map((hotel) => {
                            const fm = hotel.frontmatter as HotelFrontmatter;
                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/hotels/${fm.slug}`}
                                    className="group bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                                >
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={fm.featuredImage}
                                            fallbackSrc="/images/placeholders/hotel.svg"
                                            alt={fm.featuredImageAlt || fm.hotelName}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2 py-0.5 rounded bg-amber-500 text-white text-xs font-bold">
                                                {fm.category === "luxury-resort" ? "Luxury" : "Boutique"}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <span className="px-2 py-0.5 rounded bg-gray-900/70 text-white text-xs font-bold">
                                                {fm.priceLevel}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 group-hover:text-palm-600 transition-colors">
                                            {fm.hotelName}
                                        </h3>
                                        <p className="text-sm text-gray-500">{fm.area}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* View All Hotels Button */}
                    <div className="text-center">
                        <Link
                            href="/hotels"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-palm-600 to-teal-600 text-white font-bold hover:from-palm-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            View All {hotels.length} Hotels & Resorts
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>
            )}

            {/* Neighborhoods Section Header */}
            <section className="section-container py-16 bg-gray-50">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-palm-100 text-palm-700 text-sm font-bold mb-4">
                        📍 Neighborhood Guides
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 mb-4">
                        Explore by Neighborhood
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Each Naples neighborhood has its own personality. Find the one that matches your vacation style.
                    </p>
                </div>

                {/* Main Content */}
                {neighborhoods.length > 0 ? (
                    <div
                        className={
                            neighborhoods.length === 1
                                ? "grid grid-cols-1 gap-8 justify-items-center"
                                : "grid grid-cols-1 md:grid-cols-2 gap-8"
                        }
                    >
                        {neighborhoods.map((doc, index) => {
                            const fm = doc.frontmatter as WhereToStayFrontmatter;
                            const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/where-to-stay/${fm.slug}`}
                                    className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col ${neighborhoods.length === 1 ? "w-full max-w-3xl" : ""
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={fm.featuredImage}
                                            fallbackSrc="/images/placeholders/where-to-stay.svg"
                                            alt={fm.featuredImageAlt || fm.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-80" />

                                        {/* Top badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {isNew && (
                                                <span className="px-3 py-1 rounded-full bg-palm-600 text-white text-xs font-bold shadow-lg">
                                                    New Guide
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom content */}
                                        <div className="absolute bottom-5 left-5 right-5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-0.5 rounded bg-green-500 text-white text-[10px] font-bold uppercase">
                                                    Verified Area
                                                </span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-white drop-shadow-md font-display">
                                                {fm.areaName}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <p className="text-gray-600 mb-6 flex-1">
                                            {fm.description}
                                        </p>

                                        {/* Best For */}
                                        {fm.bestFor.length > 0 && (
                                            <div className="mb-6">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                                    Best For
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {fm.bestFor.slice(0, 4).map((item) => (
                                                        <span
                                                            key={item}
                                                            className="px-3 py-1 rounded-full bg-palm-50 text-palm-700 text-xs font-medium border border-palm-100"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Nearby Highlights */}
                                        {fm.nearbyHighlights && fm.nearbyHighlights.length > 0 && (
                                            <div className="pt-5 border-t border-gray-100">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                                    Highlights
                                                </p>
                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                                                    {fm.nearbyHighlights.slice(0, 3).map(h => (
                                                        <span key={h} className="flex items-center gap-1.5">
                                                            <span className="w-1 h-1 rounded-full bg-palm-400"></span>
                                                            {h}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <div className="mt-6 pt-4 flex items-center justify-between">
                                            <span className="text-xs text-gray-400 font-medium">{doc.readingTime} read</span>
                                            <span className="text-sm font-bold text-palm-600 group-hover:text-palm-700 flex items-center gap-1">
                                                Explore neighborhood
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                        <span className="text-6xl mb-4 block">🏨</span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Neighborhood Guides Coming Soon
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            We're currently writing comprehensive guides for every Naples neighborhood.
                            Check back soon.
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                {neighborhoods.length > 0 && (
                    <div className="mt-20 text-center">
                        <div className="inline-block p-1 bg-gradient-to-br from-palm-500 via-teal-500 to-palm-500 rounded-2xl">
                            <div className="bg-white rounded-xl p-8 md:p-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Not sure where to stay?</h3>
                                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                                    Start with <strong>Old Naples</strong> if you want to be walkable to everything,
                                    or <strong>Vanderbilt Beach</strong> if you want resort-style luxury.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/where-to-stay/old-naples"
                                        className="px-6 py-3 rounded-xl bg-palm-600 text-white font-bold hover:bg-palm-700 transition-colors"
                                    >
                                        Explore Old Naples
                                    </Link>
                                    <Link
                                        href="/where-to-stay/vanderbilt-beach"
                                        className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Explore Vanderbilt Beach
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
