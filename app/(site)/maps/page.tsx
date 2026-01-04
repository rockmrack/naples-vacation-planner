import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { MapFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Naples Florida Maps – Interactive & Printable",
    description:
        "Detailed maps of Naples, Florida. Interactive beach maps, printable walking guides, and neighborhood maps verified by locals for accuracy.",
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
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative blobs */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Maps" }]}
                        className="text-white/60 mb-8"
                    />

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-700 text-purple-300 text-xs font-bold uppercase tracking-wider">
                                Planning Tools
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                2025 Updated
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                            Naples Florida<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-violet-300">
                                Maps & Guides
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Navigate like a local. Our high-resolution, expert-verified maps
                            help you find the best beaches, restaurants, and hidden gems.
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
                            High Resolution
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Printable PDF
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Verified Locations
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="section-container py-16 bg-gray-50">
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
                                    className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col ${maps.length === 1 ? "w-full max-w-xl" : ""
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
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                        {/* Top badges */}
                                        <div className="absolute top-3 left-3 flex gap-2">
                                            {fm.mapType && (
                                                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold shadow-lg capitalize">
                                                    {fm.mapType.replace("-", " ")}
                                                </span>
                                            )}
                                            {isNew && (
                                                <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold shadow-lg">
                                                    New
                                                </span>
                                            )}
                                        </div>

                                        {fm.downloadUrl && (
                                            <div className="absolute bottom-3 right-3">
                                                <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-lg shadow-lg text-purple-600">
                                                    📥
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h2 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                                            {fm.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                                            {fm.description}
                                        </p>

                                        {/* Footer */}
                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500 font-medium">{doc.readingTime} read</span>
                                            <span className="text-sm font-bold text-purple-600 group-hover:text-purple-700 flex items-center gap-1">
                                                View Map
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
                        <span className="text-6xl mb-4 block">🗺️</span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Maps Coming Soon
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            We're designing high-quality, printable maps for your trip. Check back soon.
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}
