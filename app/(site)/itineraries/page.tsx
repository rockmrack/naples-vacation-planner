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

    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Itineraries" }]} />

            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900">
                    Naples Itineraries
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Detailed day-by-day plans to help you make the most of your Naples,
                    Florida vacation—whether you have a weekend or a full week.
                </p>
            </div>

            {/* Itinerary Grid */}
            {itineraries.length > 0 ? (
                <div
                    className={
                        itineraries.length === 1
                            ? "grid grid-cols-1 gap-8 justify-items-center"
                            : itineraries.length === 2
                                ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    }
                >
                    {itineraries.map((doc) => {
                        const fm = doc.frontmatter as ItineraryFrontmatter;
                        return (
                            <Link
                                key={fm.slug}
                                href={`/itineraries/${fm.slug}`}
                                className={
                                    itineraries.length === 1
                                        ? "group card overflow-hidden w-full max-w-xl"
                                        : "group card overflow-hidden"
                                }
                            >
                                {/* Image */}
                                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                    <SafeImage
                                        src={fm.featuredImage}
                                        fallbackSrc="/images/placeholders/itinerary.svg"
                                        alt={fm.featuredImageAlt || fm.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-3 py-1 rounded-full bg-ocean-500 text-white text-sm font-semibold shadow-lg">
                                            {fm.days} {fm.days === 1 ? "Day" : "Days"}
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
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${paceColors[fm.pace]}`}
                                        >
                                            {fm.pace.charAt(0).toUpperCase() + fm.pace.slice(1)} Pace
                                        </span>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                            {audienceIcons[fm.audience]} {fm.audience.charAt(0).toUpperCase() + fm.audience.slice(1)}
                                        </span>
                                    </div>

                                    {/* Reading time */}
                                    <p className="mt-4 text-xs text-gray-500">{doc.readingTime}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <span className="text-6xl">📅</span>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Itineraries Coming Soon
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We&apos;re crafting detailed day-by-day Naples itineraries. Check back
                        soon!
                    </p>
                </div>
            )}
        </div>
    );
}
