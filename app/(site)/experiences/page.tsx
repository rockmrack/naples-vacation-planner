"use client";

import { useState } from "react";
import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { experiences, type Experience, type ExperienceCategory } from "@/src/data/experiences";

const categoryLabels: Record<ExperienceCategory, string> = {
    "yacht-cruise": "Yacht Cruises",
    "fishing": "Fishing Charters",
    "kayak-tour": "Kayak Tours",
    "food-tour": "Food Tours",
    "spa": "Spa Experiences",
    "golf": "Golf Packages",
    "photography": "Photography Tours",
    "wildlife": "Wildlife Tours",
    "private-dining": "Private Dining",
    "adventure": "Adventures",
};

function ExperienceCard({ experience }: { experience: Experience }) {
    const price = experience.pricePerGroup
        ? `$${experience.pricePerGroup} / group`
        : `From $${experience.pricePerPerson} / person`;

    return (
        <Link
            href={`/experiences/${experience.slug}`}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <SafeImage
                    src={experience.featuredImage}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gray-900">
                    {price}
                </div>
                {experience.featured && (
                    <div className="absolute top-4 left-4 bg-ocean-600 text-white rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                        Featured
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="text-xs text-ocean-600 font-medium uppercase tracking-wider mb-2">
                    {categoryLabels[experience.category]} • {experience.durationHours}h
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
                    {experience.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {experience.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <span className="text-amber-400">★</span>
                            {experience.rating}
                        </span>
                        <span>({experience.reviewCount} reviews)</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-ocean-600 font-medium text-sm">
                        Book Now →
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function ExperiencesPage() {
    const [selectedCategory, setSelectedCategory] = useState<ExperienceCategory | "all">("all");

    const categories = ["all", ...Object.keys(categoryLabels)] as (ExperienceCategory | "all")[];

    const filteredExperiences = selectedCategory === "all"
        ? experiences
        : experiences.filter(e => e.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-r from-ocean-600 to-teal-600 text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wider mb-6">
                        Private Experiences
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Unforgettable Naples Experiences
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Book exclusive private tours, yacht cruises, dining experiences, and adventures
                        curated by local experts. Skip the crowds and create lasting memories.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="py-8 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-40">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? "bg-ocean-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {cat === "all" ? "All Experiences" : categoryLabels[cat]}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experiences Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredExperiences.map((experience) => (
                            <ExperienceCard key={experience.id} experience={experience} />
                        ))}
                    </div>

                    {filteredExperiences.length === 0 && (
                        <div className="text-center py-16 text-gray-500">
                            No experiences found in this category. Check back soon!
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Looking for Something Custom?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Our concierge team can design a personalized experience just for you.
                        Private yacht charters, exclusive dinners, behind-the-scenes tours—anything is possible.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-ocean-600 text-white font-bold rounded-xl hover:bg-ocean-700 transition-colors"
                    >
                        Contact Concierge →
                    </Link>
                </div>
            </section>
        </div>
    );
}
