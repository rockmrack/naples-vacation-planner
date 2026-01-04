import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { TravelTipFrontmatter } from "@/src/lib/content-schema";

export const metadata: Metadata = {
    title: "Naples Florida Travel Tips – Planning, Logistics & Insider Advice",
    description:
        "Practical travel tips for visiting Naples, Florida. Best time to visit, what to pack, transportation, seasonal weather, and local insights.",
    alternates: {
        canonical: `${site.url}/travel-tips`,
    },
};

const categoryIcons: Record<string, string> = {
    planning: "📅",
    logistics: "🚗",
    seasonal: "☀️",
    budget: "💰",
    activities: "🎯",
};

export default function TravelTipsPage() {
    let tips: ReturnType<typeof getAllDocsByType> = [];

    try {
        tips = getAllDocsByType("travel-tip");
    } catch {
        // No content yet
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-400" />
                <div className="absolute inset-0 hero-pattern opacity-30" />

                {/* Decorative blobs */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-300/20 rounded-full blur-3xl" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Travel Tips" }]}
                        className="text-white/80 mb-6"
                    />

                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                            <span className="text-lg">💡</span>
                            {tips.length} Helpful Tips
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
                            Naples Travel Tips
                        </h1>

                        <p className="mt-6 text-xl text-white/90 leading-relaxed">
                            Practical advice and insider knowledge to help you plan the perfect
                            Naples, Florida vacation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section-container py-16">
                {tips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tips.map((doc, index) => {
                            const fm = doc.frontmatter as TravelTipFrontmatter;
                            const icon = fm.category ? categoryIcons[fm.category] || "💡" : "💡";
                            const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                            return (
                                <Link
                                    key={fm.slug}
                                    href={`/travel-tips/${fm.slug}`}
                                    className="group card p-6 flex gap-4 animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                        {icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-2">
                                            <h2 className="font-bold text-lg text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 flex-1">
                                                {fm.title}
                                            </h2>
                                            {isNew && (
                                                <span className="badge badge-new flex-shrink-0">New</span>
                                            )}
                                        </div>
                                        <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                                            {fm.description}
                                        </p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{doc.readingTime}</span>
                                            <span className="text-sm font-medium text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                                                Read tip
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
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-2xl">
                        <span className="text-6xl">💡</span>
                        <h2 className="mt-4 text-xl font-bold text-gray-900">
                            Travel Tips Coming Soon
                        </h2>
                        <p className="mt-2 text-gray-600">
                            We&apos;re compiling essential Naples travel tips. Check back soon!
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}

