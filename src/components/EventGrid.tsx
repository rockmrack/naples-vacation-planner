"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categoryLabels: Record<string, string> = {
    all: "All Events",
    "art-show": "Art Shows",
    festival: "Festivals",
    "farmers-market": "Farmers Markets",
    music: "Music & Concerts",
    "food-drink": "Food & Drink",
    sports: "Sports & Fitness",
    holiday: "Holiday Events",
    film: "Film & Theater",
    community: "Community",
};

const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

interface EventGridProps {
    events: {
        frontmatter: {
            title: string;
            slug: string;
            eventName: string;
            category: string;
            startDate: string;
            endDate?: string;
            venue: string;
            featuredImage: string;
            featuredImageAlt?: string;
            price?: string;
            isFree?: boolean;
            isRecurring?: boolean;
            recurringSchedule?: string;
        };
    }[];
}

function formatDate(dateStr: string): { month: string; day: string; full: string } {
    const date = new Date(dateStr);
    return {
        month: monthLabels[date.getMonth()],
        day: date.getDate().toString(),
        full: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        }),
    };
}

export default function EventGrid({ events }: EventGridProps) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showRecurring, setShowRecurring] = useState(true);

    const categories = ["all", ...Array.from(new Set(events.map((e) => e.frontmatter.category)))];

    const filteredEvents = events.filter((event) => {
        const matchesCategory =
            selectedCategory === "all" || event.frontmatter.category === selectedCategory;
        const matchesRecurring = showRecurring || !event.frontmatter.isRecurring;
        return matchesCategory && matchesRecurring;
    });

    // Sort by date
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        return new Date(a.frontmatter.startDate).getTime() - new Date(b.frontmatter.startDate).getTime();
    });

    return (
        <div>
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                            ? "bg-ocean-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {categoryLabels[category] || category}
                    </button>
                ))}
            </div>

            {/* Recurring toggle */}
            <div className="flex items-center gap-2 mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showRecurring}
                        onChange={(e) => setShowRecurring(e.target.checked)}
                        className="w-4 h-4 text-ocean-600 rounded"
                    />
                    <span className="text-sm text-gray-600">Show recurring events (farmers markets, etc.)</span>
                </label>
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-6">
                Showing {sortedEvents.length} upcoming events
            </p>

            {/* Event List */}
            <div className="space-y-4">
                {sortedEvents.map((event) => {
                    const dateInfo = formatDate(event.frontmatter.startDate);
                    return (
                        <Link
                            key={event.frontmatter.slug}
                            href={`/events/${event.frontmatter.slug}`}
                            className="group flex bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                        >
                            {/* Date Badge */}
                            <div className="flex-shrink-0 w-20 bg-ocean-600 text-white flex flex-col items-center justify-center p-3">
                                <span className="text-sm uppercase">{dateInfo.month}</span>
                                <span className="text-2xl font-bold">{dateInfo.day}</span>
                                {event.frontmatter.isRecurring && (
                                    <span className="text-xs mt-1">Weekly</span>
                                )}
                            </div>

                            {/* Image */}
                            <div className="hidden sm:block relative w-32 flex-shrink-0">
                                <Image
                                    src={event.frontmatter.featuredImage}
                                    alt={event.frontmatter.featuredImageAlt || event.frontmatter.eventName}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-ocean-600 uppercase tracking-wide">
                                        {categoryLabels[event.frontmatter.category] || event.frontmatter.category}
                                    </span>
                                    {event.frontmatter.isFree && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            Free
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-ocean-600 transition-colors">
                                    {event.frontmatter.eventName}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {event.frontmatter.venue}
                                    {event.frontmatter.price && !event.frontmatter.isFree && (
                                        <span className="ml-2">• {event.frontmatter.price}</span>
                                    )}
                                </p>
                                {event.frontmatter.recurringSchedule && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {event.frontmatter.recurringSchedule}
                                    </p>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {sortedEvents.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No events match your filters. Try adjusting your selection.
                </div>
            )}
        </div>
    );
}
