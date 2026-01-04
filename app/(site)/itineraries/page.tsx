import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { ItineraryFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Naples Florida Itineraries – 2, 3, 5 & 7 Day Trip Plans",
    description:
        "Day-by-day Naples, Florida itineraries for first-time visitors, couples, families, and nature lovers. From weekend getaways to week-long adventures.",
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
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-ocean-500 to-teal-500" />
                <div className="absolute inset-0 hero-pattern opacity-30" />

                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-sunset-500/20 rounded-full blur-3xl" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Itineraries" }]}
                        className="text-white/80 mb-6"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                            <span className="text-lg">📅</span>
                            {sortedItineraries.length} Curated Itineraries
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
                            Naples Itineraries
                        </h1>

                        <p className="mt-6 text-xl text-white/90 leading-relaxed">
                            Detailed day-by-day plans to help you make the most of your Naples,
                            Florida vacation—whether you have a weekend or a full week.
                        </p>

                        {/* Quick Links */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {[2, 3, 5, 7].map((days) => (
                                <a
                                    key={days}
                                    href={`#${days}-day`}
                                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                                >
                                    {days}-Day Plans
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-container py-16">
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
                                    className={`group card overflow-hidden animate-fade-in ${sortedItineraries.length === 1 ? "w-full max-w-xl" : ""
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Top badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="badge bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-lg">
                                                {fm.days} {fm.days === 1 ? "Day" : "Days"}
                                            </span>
                                            {isNew && (
                                                <span className="badge badge-new shadow-lg">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        {/* Bottom gradient with audience icon */}
                                        <div className="absolute bottom-3 right-3">
                                            <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-lg">
                                                {audienceIcons[fm.audience]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h2 className="font-bold text-xl text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2">
                                            {fm.title}
                                        </h2>
                                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                                            {fm.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span
                                                className={`badge ${paceColors[fm.pace]}`}
                                            >
                                                {fm.pace.charAt(0).toUpperCase() + fm.pace.slice(1)} Pace
                                            </span>
                                            <span className="badge bg-gray-100 text-gray-700">
                                                {fm.audience.charAt(0).toUpperCase() + fm.audience.slice(1)}
                                            </span>
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{doc.readingTime}</span>
                                            <span className="text-sm font-medium text-ocean-600 group-hover:text-ocean-700 flex items-center gap-1">
                                                View itinerary
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
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-ocean-50/30 rounded-2xl">
                        <span className="text-6xl">📅</span>
                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            Itineraries Coming Soon
                        </h2>
                        <p className="mt-2 text-gray-600">
                            We&apos;re crafting detailed day-by-day Naples itineraries. Check back soon!
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                {sortedItineraries.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-ocean-50 to-teal-50 border border-ocean-100">
                            <h3 className="text-xl font-bold text-gray-900">Not sure which itinerary?</h3>
                            <p className="mt-2 text-gray-600 max-w-md">
                                Start with our 3-day itinerary—it covers the Naples essentials and is perfect for first-time visitors.
                            </p>
                            <Link
                                href="/itineraries/naples-3-day-itinerary"
                                className="btn-primary mt-6"
                            >
                                View 3-Day Itinerary
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

