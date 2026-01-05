import type { Metadata } from "next";
import Link from "next/link";
import { getAllDocsByType } from "@/src/lib/content";
import NeighborhoodMap from "@/src/components/NeighborhoodMap";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Naples Neighborhood Guide - Interactive Map & Best Areas to Stay",
    description: "Explore the best neighborhoods in Naples, Florida. From Historic Old Naples to luxury Pelican Bay and family-friendly North Naples, find the perfect area for your stay.",
};

export default function NeighborhoodsPage() {
    const neighborhoods = getAllDocsByType("where-to-stay");

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
                        Find Your Perfect <span className="text-ocean-300">Naples Neighborhood</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Whether you want walkable historic streets, beachfront luxury, or golf course living,
                        Naples has a distinct neighborhood for every lifestyle.
                    </p>
                </div>
            </div>

            {/* Map Section */}
            <div className="container mx-auto px-4 -mt-10 relative z-20 mb-20">
                <div className="bg-white p-4 rounded-2xl shadow-2xl">
                    <NeighborhoodMap />
                </div>
            </div>

            {/* Neighborhood Grid */}
            <div className="container mx-auto px-4 pb-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Explore by Area</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {neighborhoods.map((hood) => (
                        <Link
                            key={hood.slug}
                            href={`/where-to-stay/${hood.slug}`}
                            className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 block h-full flex flex-col"
                        >
                            <div className="relative h-48 w-full overflow-hidden">
                                <SafeImage
                                    src={hood.frontmatter.featuredImage || "/images/placeholders/neighborhood-default.jpg"}
                                    alt={hood.frontmatter.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold">{hood.frontmatter.title}</h3>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                    {hood.frontmatter.description}
                                </p>
                                <span className="text-ocean-600 font-bold text-sm group-hover:underline flex items-center gap-1">
                                    Read Guide
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
