import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { ItineraryFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";
import { FactCheckedBadge } from "@/src/components/UltimateTrust";

export const metadata: Metadata = {
    title: "Naples Florida Itineraries – Expert-Planned 2, 3, 5 & 7 Day Trips",
    description:
        "Fact-checked Naples itineraries for every traveler. Expert-planned day-by-day guides for couples, families, and luxury travelers. Verified by locals.",
    alternates: {
        canonical: `${site.url}/itineraries`,
    },
};

const paceColors = {
    relaxed: "bg-green-100 text-green-700",
    balanced: "bg-blue-100 text-blue-700",
    fast: "bg-orange-100 text-orange-700",
};

const audienceIcons: Record<string, string> = {
    couples: "💑",
    families: "👨‍👩‍👧‍👦",
    luxury: "✨",
    nature: "🦅",
    all: "🌴",
};

export default function ItinerariesPage() {
    let itineraries: ReturnType<typeof getAllDocsByType> = [];

    try {
        itineraries = getAllDocsByType("itinerary");
    } catch {
        // No itineraries yet
    }

    // Sort by days for better organization
    const sortedItineraries = [...itineraries].sort((a, b) => {
        const aDays = (a.frontmatter as ItineraryFrontmatter).days;
        const bDays = (b.frontmatter as ItineraryFrontmatter).days;
        return aDays - bDays;
    });

    return (
        <>
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-ocean-900 to-slate-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-ocean-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Itineraries" }]}
                        className="text-white/60 mb-8"
                    />

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-900/50 border border-ocean-700 text-ocean-300 text-xs font-bold uppercase tracking-wider">
                                Expert Planned
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Fact-Checked
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                            Perfectly Planned<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 to-teal-300">
                                Naples Itineraries
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Don't waste hours planning. Our certified Naples experts have created
                            the perfect day-by-day schedules for every type of traveler.
                        </p>

                        {/* Quick Links */}
                        <div className="mt-10 flex flex-wrap gap-3">
                            {[2, 3, 5, 7].map((days) => (
                                <a
                                    key={days}
                                    href={`#${days}-day`}
                                    className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all hover:-translate-y-0.5"
                                >
                                    {days}-Day Plans
                                </a>
                            ))}
                        </div>
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
                            Verified Pricing
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Checked Monthly
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Local Authors
                        </span>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <section className="section-container py-16 bg-gray-50">
                {sortedItineraries.length > 0 ? (
                    <div
                        className={
                            sortedItineraries.length === 1
                                ? "grid grid-cols-1 gap-8 justify-items-center"
                                : sortedItineraries.length === 2
                                    ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        }
                    >
                        {sortedItineraries.map((doc, index) => {
                            const fm = doc.frontmatter as ItineraryFrontmatter;
                            const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/itineraries/${fm.slug}`}
                                    id={`${fm.days}-day`}
                                    className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 ${sortedItineraries.length === 1 ? "w-full max-w-xl" : ""
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={fm.featuredImage}
                                            fallbackSrc="/images/placeholders/itinerary.svg"
                                            alt={fm.featuredImageAlt || fm.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                        {/* Top badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold shadow-lg flex items-center gap-1">
                                                📅 {fm.days} {fm.days === 1 ? "Day" : "Days"}
                                            </span>
                                            {isNew && (
                                                <span className="px-3 py-1 rounded-full bg-ocean-600 text-white text-xs font-bold shadow-lg">
                                                    New Guide
                                                </span>
                                            )}
                                        </div>

                                        {/* Verify Badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="px-2 py-1 rounded-lg bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold shadow-lg flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                </svg>
                                                EXPERT VERIFIED
                                            </span>
                                        </div>

                                        {/* Audience Icon */}
                                        <div className="absolute bottom-3 right-3">
                                            <span className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-lg">
                                                {audienceIcons[fm.audience]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h2 className="font-bold text-xl text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2 mb-2">
                                            {fm.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {fm.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            <span
                                                className={`text-xs px-2 py-1 rounded-md font-medium ${paceColors[fm.pace]}`}
                                            >
                                                {fm.pace.charAt(0).toUpperCase() + fm.pace.slice(1)} Pace
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600 font-medium">
                                                {fm.audience.charAt(0).toUpperCase() + fm.audience.slice(1)}
                                            </span>
                                        </div>

                                        {/* Footer */}
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500 font-medium">{doc.readingTime} read</span>
                                            <span className="text-sm font-bold text-ocean-600 group-hover:text-ocean-700 flex items-center gap-1">
                                                View Plan
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
                        <span className="text-6xl mb-4 block">📅</span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Itineraries Coming Soon
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Our experts are currently crafting detailed day-by-day Naples itineraries.
                            Check back soon for the launch!
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                {sortedItineraries.length > 0 && (
                    <div className="mt-20 text-center">
                        <div className="inline-block p-1 bg-gradient-to-br from-ocean-500 via-teal-500 to-ocean-500 rounded-2xl">
                            <div className="bg-white rounded-xl p-8 md:p-12">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Itinerary Service</h3>
                                <p className="text-gray-600 max-w-lg mx-auto mb-8">
                                    Need something tailored specifically to your group? Our expert team can create
                                    a custom made-for-you itinerary based on your preferences.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
                                >
                                    Request Custom Plan
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
