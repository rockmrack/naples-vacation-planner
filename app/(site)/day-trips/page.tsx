import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { DayTripFrontmatter } from "@/src/lib/content-schema";

export const metadata: Metadata = {
    title: "Day Trips from Naples, Florida – Marco Island, Everglades & More",
    description:
        "Explore beyond Naples with day trips to Marco Island, Everglades National Park, Ten Thousand Islands, and more. Complete guides with drive times and booking tips.",
    alternates: {
        canonical: `${site.url}/day-trips`,
    },
};

export default function DayTripsPage() {
    let dayTrips: ReturnType<typeof getAllDocsByType> = [];

    try {
        dayTrips = getAllDocsByType("day-trip");
    } catch {
        // No content yet
    }

    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Day Trips" }]} />

            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900">
                    Day Trips from Naples
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Naples is the perfect base for exploring Southwest Florida. Discover
                    pristine islands, wild Everglades, and charming coastal towns.
                </p>
            </div>

            {/* Day Trips Grid */}
            {dayTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dayTrips.map((doc) => {
                        const fm = doc.frontmatter as DayTripFrontmatter;
                        return (
                            <Link
                                key={fm.slug}
                                href={`/day-trips/${fm.slug}`}
                                className="group card overflow-hidden"
                            >
                                {/* Image */}
                                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={fm.featuredImage}
                                        alt={fm.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-3 py-1 rounded-full bg-sunset-500 text-white text-sm font-semibold shadow-lg">
                                            🚗 {fm.driveTimeFromNaples}
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
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-sunset-100 text-sunset-700">
                                            Best: {fm.bestSeason}
                                        </span>
                                    </div>

                                    <p className="mt-4 text-xs text-gray-500">{doc.readingTime}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <span className="text-6xl">🚗</span>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Day Trip Guides Coming Soon
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We&apos;re creating detailed day trip guides from Naples. Check back
                        soon!
                    </p>
                </div>
            )}
        </div>
    );
}
