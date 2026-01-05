import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { TravelTipGrid } from "@/src/components/TravelTipGrid";
import type { TravelTipFrontmatter } from "@/src/lib/content-schema";

export const metadata: Metadata = {
    title: "Naples Florida Travel Tips – Expert Advice from Locals",
    description:
        "Essential travel tips for Naples, FL. Local advice on packing, weather, transportation, and saving money. Fact-checked and updated monthly.",
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
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative blobs */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Travel Tips" }]}
                        className="text-white/60 mb-8"
                    />

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/50 border border-amber-700 text-amber-300 text-xs font-bold uppercase tracking-wider">
                                Insider Advice
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Verified Monthly
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                            Naples Travel Tips<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-300">
                                & Local Insights
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            Skip the tourist traps. Get practical advice and insider knowledge
                            from verified locals who live here year-round.
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
                            Resident Advice
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Updated Monthly
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                            Expert Verified
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="section-container py-16 bg-gray-50">
                {tips.length > 0 ? (
                    <TravelTipGrid tips={tips as any} />
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto">
                        <span className="text-6xl mb-4 block">💡</span>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Travel Tips Coming Soon
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            We're gathering the best local advice for you. Check back soon.
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}
