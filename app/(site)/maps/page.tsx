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
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Maps" }]} />

            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900">
                    Naples Maps
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Interactive and printable maps to help you navigate Naples, Florida
                    like a local.
                </p>
            </div>

            {/* Maps Grid */}
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
                    {maps.map((doc) => {
                        const fm = doc.frontmatter as MapFrontmatter;
                        return (
                            <Link
                                key={fm.slug}
                                href={`/maps/${fm.slug}`}
                                className={
                                    maps.length === 1
                                        ? "group card overflow-hidden w-full max-w-xl"
                                        : "group card overflow-hidden"
                                }
                            >
                                {/* Image */}
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                    <SafeImage
                                        src={fm.featuredImage}
                                        fallbackSrc="/images/placeholders/map.svg"
                                        alt={fm.featuredImageAlt || fm.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {fm.mapType && (
                                        <div className="absolute top-3 left-3">
                                            <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-sm font-semibold shadow-lg capitalize">
                                                {fm.mapType.replace("-", " ")}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="font-bold text-xl text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2">
                                        {fm.title}
                                    </h2>
                                    <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                                        {fm.description}
                                    </p>

                                    {fm.downloadUrl && (
                                        <p className="mt-3 text-xs text-purple-600 font-medium">
                                            📥 Downloadable
                                        </p>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <span className="text-6xl">🗺️</span>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Maps Coming Soon
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We&apos;re creating interactive and printable Naples maps. Check back
                        soon!
                    </p>
                </div>
            )}
        </div>
    );
}
