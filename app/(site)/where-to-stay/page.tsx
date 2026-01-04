import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { WhereToStayFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

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
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-palm-600 via-palm-500 to-teal-500" />
                <div className="absolute inset-0 hero-pattern opacity-30" />

                {/* Decorative blobs */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-ocean-500/20 rounded-full blur-3xl" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Where to Stay" }]}
                        className="text-white/80 mb-6"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                            <span className="text-lg">🏨</span>
                            {neighborhoods.length} Neighborhoods
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
                            Where to Stay in Naples
                        </h1>

                        <p className="mt-6 text-xl text-white/90 leading-relaxed">
                            Each Naples neighborhood has its own personality. Find the perfect
                            base for your vacation style.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-container py-16">
                {neighborhoods.length > 0 ? (
                    <div
                        className={
                            neighborhoods.length === 1
                                ? "grid grid-cols-1 gap-8 justify-items-center"
                                : "grid grid-cols-1 md:grid-cols-2 gap-8"
                        }
                    >
                        {neighborhoods.map((doc, index) => {
                            const fm = doc.frontmatter as WhereToStayFrontmatter;
                            const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/where-to-stay/${fm.slug}`}
                                    className={`group card overflow-hidden animate-fade-in ${neighborhoods.length === 1 ? "w-full max-w-3xl" : ""
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={fm.featuredImage}
                                            fallbackSrc="/images/placeholders/where-to-stay.svg"
                                            alt={fm.featuredImageAlt || fm.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Top badges */}
                                        {isNew && (
                                            <div className="absolute top-3 left-3">
                                                <span className="badge badge-new shadow-lg">New</span>
                                            </div>
                                        )}

                                        {/* Bottom content */}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                                                {fm.areaName}
                                            </h2>
                                            <p className="text-white/80 text-sm mt-1 line-clamp-1">
                                                {fm.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Best For */}
                                        {fm.bestFor.length > 0 && (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                    Best For
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {fm.bestFor.slice(0, 4).map((item) => (
                                                        <span
                                                            key={item}
                                                            className="badge bg-palm-100 text-palm-700"
                                                        >
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Nearby Highlights */}
                                        {fm.nearbyHighlights && fm.nearbyHighlights.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                    Nearby
                                                </p>
                                                <p className="text-sm text-gray-600 line-clamp-1">
                                                    {fm.nearbyHighlights.slice(0, 3).join(" · ")}
                                                </p>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{doc.readingTime}</span>
                                            <span className="text-sm font-medium text-palm-600 group-hover:text-palm-700 flex items-center gap-1">
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
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-palm-50/30 rounded-2xl">
                        <span className="text-6xl">🏨</span>
                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            Neighborhood Guides Coming Soon
                        </h2>
                        <p className="mt-2 text-gray-600">
                            We&apos;re writing detailed guides for each Naples neighborhood. Check back soon!
                        </p>
                    </div>
                )}

                {/* Bottom CTA */}
                {neighborhoods.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-palm-50 to-teal-50 border border-palm-100">
                            <h3 className="text-xl font-bold text-gray-900">Looking for specific hotel recommendations?</h3>
                            <p className="mt-2 text-gray-600 max-w-md">
                                Each neighborhood guide includes our top hotel picks for different budgets.
                            </p>
                            <Link
                                href="/where-to-stay/old-naples"
                                className="btn-primary mt-6 bg-gradient-to-r from-palm-500 to-palm-600 hover:from-palm-600 hover:to-palm-700"
                            >
                                Start with Old Naples
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

