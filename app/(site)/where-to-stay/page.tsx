import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { WhereToStayFrontmatter } from "@/src/lib/content-schema";

export const metadata: Metadata = {
    title: "Where to Stay in Naples, Florida – Neighborhood Guide",
    description:
        "Find the perfect neighborhood in Naples, FL for your vacation. From walkable Old Naples to beachfront Vanderbilt—discover the best areas for couples, families, and luxury seekers.",
    alternates: {
        canonical: `${site.url}/where-to-stay`,
    },
};

export default function WhereToStayPage() {
    let neighborhoods: ReturnType<typeof getAllDocsByType> = [];

    try {
        neighborhoods = getAllDocsByType("where-to-stay");
    } catch {
        // No content yet
    }

    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Where to Stay" }]} />

            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900">
                    Where to Stay in Naples
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Each Naples neighborhood has its own personality. Find the perfect
                    base for your vacation style.
                </p>
            </div>

            {/* Neighborhoods Grid */}
            {neighborhoods.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {neighborhoods.map((doc) => {
                        const fm = doc.frontmatter as WhereToStayFrontmatter;
                        return (
                            <Link
                                key={fm.slug}
                                href={`/where-to-stay/${fm.slug}`}
                                className="group card overflow-hidden"
                            >
                                {/* Image */}
                                <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={fm.featuredImage}
                                        alt={fm.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h2 className="text-2xl font-bold text-white">
                                            {fm.areaName}
                                        </h2>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-600 line-clamp-2">{fm.description}</p>

                                    {/* Best For */}
                                    {fm.bestFor.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs font-medium text-gray-500 uppercase mb-2">
                                                Best For
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {fm.bestFor.slice(0, 3).map((item) => (
                                                    <span
                                                        key={item}
                                                        className="px-2 py-1 rounded-full bg-palm-100 text-palm-700 text-xs font-medium"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <p className="mt-4 text-xs text-gray-500">{doc.readingTime}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <span className="text-6xl">🏨</span>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Neighborhood Guides Coming Soon
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We&apos;re writing detailed guides for each Naples neighborhood. Check
                        back soon!
                    </p>
                </div>
            )}
        </div>
    );
}
