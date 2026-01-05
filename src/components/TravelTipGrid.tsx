"use client";

import { useState } from "react";
import Link from "next/link";
import type { TravelTipFrontmatter } from "@/src/lib/content-schema";

const categoryIcons: Record<string, string> = {
    planning: "📅",
    logistics: "🚗",
    seasonal: "☀️",
    budget: "💰",
    activities: "🎯",
    dining: "🍽️",
};

const categoryLabels: Record<string, string> = {
    all: "All Tips",
    planning: "Planning",
    logistics: "Logistics",
    seasonal: "When to Go",
    budget: "Budget",
    activities: "Things to Do",
    dining: "Dining",
};

interface TravelTipDoc {
    slug: string;
    frontmatter: TravelTipFrontmatter;
    readingTime: string;
}

interface TravelTipGridProps {
    tips: TravelTipDoc[];
}

export function TravelTipGrid({ tips }: TravelTipGridProps) {
    const [activeCategory, setActiveCategory] = useState("all");

    // Get unique categories from actual data
    const availableCategories = ["all", ...Array.from(new Set(tips.map(t => t.frontmatter.category || "planning")))];

    const filteredTips = activeCategory === "all"
        ? tips
        : tips.filter(t => (t.frontmatter.category || "planning") === activeCategory);

    return (
        <div>
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
                {availableCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeCategory === cat
                            ? "bg-ocean-600 text-white shadow-lg shadow-ocean-500/30 scale-105"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                    >
                        {categoryIcons[cat]} {categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500">
                {filteredTips.map((doc, index) => {
                    const fm = doc.frontmatter;
                    const icon = fm.category ? categoryIcons[fm.category] || "💡" : "💡";
                    const isNew = new Date(fm.publishedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

                    return (
                        <Link
                            key={fm.slug}
                            href={`/travel-tips/${fm.slug}`}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-6 flex gap-5 animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                {icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2 mb-1">
                                    <h2 className="font-bold text-lg text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2 flex-1">
                                        {fm.title}
                                    </h2>
                                    {isNew && (
                                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wide flex-shrink-0">
                                            New
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                    {fm.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400 font-medium">{doc.readingTime} read</span>
                                    <span className="text-sm font-bold text-ocean-600 group-hover:text-ocean-700 flex items-center gap-1">
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

            {filteredTips.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No tips found in this category.
                </div>
            )}
        </div>
    );
}
