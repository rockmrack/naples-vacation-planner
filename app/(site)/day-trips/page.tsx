import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { DayTripFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

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
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-sunset-600 via-orange-500 to-amber-500" />
                <div className="absolute inset-0 hero-pattern opacity-30" />

                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Day Trips" }]}
                        className="text-white/80 mb-6"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                            <span className="text-lg">🚗</span>
                            {dayTrips.length} Day Trip Guides
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
                            Day Trips from Naples
                        </h1>

                        <p className="mt-6 text-xl text-white/90 leading-relaxed">
                            Naples is the perfect base for exploring Southwest Florida. Discover
                            pristine islands, wild Everglades, and charming coastal towns.
                        </p>

                        {/* Quick destination links */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {["Marco Island", "Everglades", "Ten Thousand Islands"].map((dest) => (
                                <span
                                    key={dest}
                                    className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
                                >
                                    {dest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-container py-16">
                {dayTrips.length > 0 ? (
                    <div
                        className={
                            dayTrips.length === 1
                                ? "grid grid-cols-1 gap-8 justify-items-center"
                                : dayTrips.length === 2
                                    ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        }
                    >
                        {dayTrips.map((doc, index) => {
                            const fm = doc.frontmatter as DayTripFrontmatter;
                            const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/day-trips/${fm.slug}`}
                                    className={`group card overflow-hidden animate-fade-in ${dayTrips.length === 1 ? "w-full max-w-xl" : ""
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={fm.featuredImage}
                                            fallbackSrc="/images/placeholders/day-trip.svg"
                                            alt={fm.featuredImageAlt || fm.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Top badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            <span className="badge bg-gradient-to-r from-sunset-500 to-orange-500 text-white shadow-lg">
                                                🚗 {fm.driveTimeFromNaples}
                                            </span>
                                            {isNew && (
                                                <span className="badge badge-new shadow-lg">New</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h2 className="font-bold text-xl text-gray-900 group-hover:text-sunset-600 transition-colors line-clamp-2">
                                            {fm.title}
                                        </h2>
                                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                                            {fm.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="badge badge-sunset">
                                                Best: {fm.bestSeason}
                                            </span>
                                            {fm.mustBook && fm.mustBook.length > 0 && (
                                                <span className="badge bg-amber-100 text-amber-700">
                                                    Book ahead
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{doc.readingTime}</span>
                                            <span className="text-sm font-medium text-sunset-600 group-hover:text-sunset-700 flex items-center gap-1">
                                                Read guide
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
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-sunset-50/30 rounded-2xl">
                        <span className="text-6xl">🚗</span>
                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            Day Trip Guides Coming Soon
                        </h2>
                        <p className="mt-2 text-gray-600">
                            We&apos;re creating detailed day trip guides from Naples. Check back soon!
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                {dayTrips.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-sunset-50 to-amber-50 border border-sunset-100">
                            <h3 className="text-xl font-bold text-gray-900">Most popular day trip?</h3>
                            <p className="mt-2 text-gray-600 max-w-md">
                                Marco Island is just 30 minutes from Naples—perfect for a beach day or shelling adventure.
                            </p>
                            <Link
                                href="/day-trips/marco-island-from-naples"
                                className="btn-sunset mt-6"
                            >
                                Marco Island Day Trip
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

