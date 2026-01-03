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
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Travel Tips" }]} />

            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold font-display text-gray-900">
                    Naples Travel Tips
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Practical advice and insider knowledge to help you plan the perfect
                    Naples, Florida vacation.
                </p>
            </div>

            {/* Tips Grid */}
            {tips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tips.map((doc) => {
                        const fm = doc.frontmatter as TravelTipFrontmatter;
                        const icon = fm.category ? categoryIcons[fm.category] || "💡" : "💡";

                        return (
                            <Link
                                key={fm.slug}
                                href={`/travel-tips/${fm.slug}`}
                                className="group card p-6 flex gap-4"
                            >
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center text-2xl">
                                    {icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h2 className="font-bold text-lg text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2">
                                        {fm.title}
                                    </h2>
                                    <p className="mt-1 text-gray-600 text-sm line-clamp-2">
                                        {fm.description}
                                    </p>
                                    <p className="mt-3 text-xs text-gray-500">{doc.readingTime}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-gray-50 rounded-2xl">
                    <span className="text-6xl">💡</span>
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Travel Tips Coming Soon
                    </h2>
                    <p className="mt-2 text-gray-600">
                        We&apos;re compiling essential Naples travel tips. Check back soon!
                    </p>
                </div>
            )}
        </div>
    );
}
