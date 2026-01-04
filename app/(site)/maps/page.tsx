import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { MapFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Naples Florida Maps – Interactive & Printable Travel Maps",
    description:
        "Interactive and printable maps for Naples, Florida. Beach maps, restaurant guides, and custom itinerary maps to enhance your trip.",
    alternates: {
        canonical: `${site.url}/maps`,
    },
};

export default function MapsPage() {
    let maps: ReturnType<typeof getAllDocsByType> = [];

    try {
        maps = getAllDocsByType("map");
    } catch {
        // No content yet
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500" />
                <div className="absolute inset-0 hero-pattern opacity-30" />

                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Maps" }]}
                        className="text-white/80 mb-6"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                            <span className="text-lg">🗺️</span>
                            {maps.length} Maps Available
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
                            Naples Maps
                        </h1>

                        <p className="mt-6 text-xl text-white/90 leading-relaxed">
                            Interactive and printable maps to help you navigate Naples, Florida
                            like a local.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-container py-16">
                {maps.length > 0 ? (
                    <div
                        className={
                            maps.length === 1
                                ? "grid grid-cols-1 gap-8 justify-items-center"
                                : maps.length === 2
                                    ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                                    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        }
                    >
                        {maps.map((doc, index) => {
                            const fm = doc.frontmatter as MapFrontmatter;
                            const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/maps/${fm.slug}`}
                                    className={`group card overflow-hidden animate-fade-in ${maps.length === 1 ? "w-full max-w-xl" : ""
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={fm.featuredImage}
                                            fallbackSrc="/images/placeholders/map.svg"
                                            alt={fm.featuredImageAlt || fm.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Top badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {fm.mapType && (
                                                <span className="badge bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg capitalize">
                                                    {fm.mapType.replace("-", " ")}
                                                </span>
                                            )}
                                            {isNew && (
                                                <span className="badge badge-new shadow-lg">New</span>
                                            )}
                                        </div>

                                        {fm.downloadUrl && (
                                            <div className="absolute bottom-3 right-3">
                                                <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-lg">
                                                    📥
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h2 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                                            {fm.title}
                                        </h2>
                                        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                                            {fm.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{doc.readingTime}</span>
                                            <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700 flex items-center gap-1">
                                                View map
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
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-2xl">
                        <span className="text-6xl">🗺️</span>
                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            Maps Coming Soon
                        </h2>
                        <p className="mt-2 text-gray-600">
                            We&apos;re creating interactive and printable Naples maps. Check back soon!
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}

