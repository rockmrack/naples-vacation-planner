"use client";

import { useState } from "react";
import Link from "next/link";

interface HappyHour {
    id: string;
    restaurant: string;
    neighborhood: string;
    days: string;
    time: string;
    deals: string[];
    priceRange: string;
    vibe: string;
}

const happyHours: HappyHour[] = [
    {
        id: "1",
        restaurant: "The Bay House",
        neighborhood: "Naples Bay",
        days: "Daily",
        time: "4:00 PM - 6:00 PM",
        deals: ["$8 Wines", "$6 Beers", "$10 Appetizers", "Half-Price Oysters"],
        priceRange: "$$",
        vibe: "Waterfront Upscale",
    },
    {
        id: "2",
        restaurant: "HB's on the Gulf",
        neighborhood: "Vanderbilt Beach",
        days: "Daily",
        time: "3:00 PM - 6:00 PM",
        deals: ["$7 House Wines", "$5 Draft Beer", "$9 Apps", "Sunset Views"],
        priceRange: "$$",
        vibe: "Beachfront Casual",
    },
    {
        id: "3",
        restaurant: "Brio Tuscan Grille",
        neighborhood: "Waterside Shops",
        days: "Daily",
        time: "4:00 PM - 6:30 PM",
        deals: ["$6 Wines", "$5 Beers", "$8 Flatbreads", "$7 Bruschetta"],
        priceRange: "$$",
        vibe: "Italian Casual",
    },
    {
        id: "4",
        restaurant: "Blue Martini",
        neighborhood: "Mercato",
        days: "Daily",
        time: "4:00 PM - 8:00 PM",
        deals: ["$5 Martinis", "Half-Price Apps", "Live Music", "DJ Nights"],
        priceRange: "$$",
        vibe: "Nightlife Scene",
    },
    {
        id: "5",
        restaurant: "Burn by Rocky Patel",
        neighborhood: "Mercato",
        days: "Daily",
        time: "5:00 PM - 7:00 PM",
        deals: ["$8 Premium Cocktails", "$7 Wines", "50% Off Apps", "Cigars"],
        priceRange: "$$$",
        vibe: "Upscale Lounge",
    },
    {
        id: "6",
        restaurant: "Campiello",
        neighborhood: "3rd Street South",
        days: "Daily",
        time: "4:00 PM - 6:00 PM",
        deals: ["$8 House Wines", "Bar Menu Specials", "Aperitivo Hour"],
        priceRange: "$$$",
        vibe: "Upscale Italian",
    },
    {
        id: "7",
        restaurant: "The Local",
        neighborhood: "Downtown Naples",
        days: "Daily",
        time: "3:00 PM - 6:00 PM",
        deals: ["$4 Drafts", "$6 Wells", "$7 Apps", "Fish Tacos Special"],
        priceRange: "$",
        vibe: "Casual Pub",
    },
    {
        id: "8",
        restaurant: "Pelican Larry's",
        neighborhood: "Multiple Locations",
        days: "Daily",
        time: "4:00 PM - 7:00 PM",
        deals: ["$3.50 Drafts", "$5 Wings", "$6 Burgers", "Sports Bar"],
        priceRange: "$",
        vibe: "Sports Bar",
    },
];

const neighborhoods = ["All", "Downtown Naples", "3rd Street South", "Mercato", "Vanderbilt Beach", "Naples Bay"];

export default function HappyHourPage() {
    const [filter, setFilter] = useState("All");
    const [timeFilter, setTimeFilter] = useState("all");

    const filteredHours = happyHours.filter((hh) => {
        if (filter !== "All" && !hh.neighborhood.includes(filter)) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-5xl mb-4 block">🍹</span>
                    <h1 className="text-4xl font-bold mb-4">Naples Happy Hour Guide</h1>
                    <p className="text-xl text-white/80">
                        The best drink deals and bar specials in Naples, updated daily.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-40">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {neighborhoods.map((n) => (
                            <button
                                key={n}
                                onClick={() => setFilter(n)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === n
                                        ? "bg-amber-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Happy Hours List */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredHours.map((hh) => (
                            <div
                                key={hh.id}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{hh.restaurant}</h3>
                                        <p className="text-sm text-gray-500">{hh.neighborhood}</p>
                                    </div>
                                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                        {hh.priceRange}
                                    </span>
                                </div>
                                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                                    <span className="flex items-center gap-1">
                                        📅 {hh.days}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        ⏰ {hh.time}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {hh.deals.map((deal) => (
                                        <span
                                            key={deal}
                                            className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full"
                                        >
                                            ✓ {deal}
                                        </span>
                                    ))}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {hh.vibe}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-12 bg-amber-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Naples Happy Hour Tips</h2>
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <span className="text-2xl mb-2 block">🕓</span>
                            <p>Most happy hours run 4-6 PM. Arrive early for best seating.</p>
                        </div>
                        <div>
                            <span className="text-2xl mb-2 block">🚗</span>
                            <p>Use a rideshare - parking is limited at popular spots.</p>
                        </div>
                        <div>
                            <span className="text-2xl mb-2 block">🌅</span>
                            <p>Beachfront bars have sunset views but fill up fast.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
