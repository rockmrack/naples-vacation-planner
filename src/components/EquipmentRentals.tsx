"use client";

import { SafeImage } from "@/src/components/SafeImage";

interface RentalCategory {
    id: string;
    name: string;
    icon: string;
    description: string;
    priceRange: string;
    items: string[];
    partnerUrl: string;
}

const rentalCategories: RentalCategory[] = [
    {
        id: "beach",
        name: "Beach Gear",
        icon: "🏖️",
        description: "Everything you need for a perfect beach day",
        priceRange: "$20-50/day",
        items: ["Beach Chairs", "Umbrellas", "Coolers", "Beach Tents", "Sand Toys"],
        partnerUrl: "https://naples-beach-services.com?ref=nvp",
    },
    {
        id: "water",
        name: "Water Sports",
        icon: "🚣",
        description: "Kayaks, paddleboards, and more",
        priceRange: "$40-100/day",
        items: ["Single Kayaks", "Tandem Kayaks", "Stand-Up Paddleboards", "Snorkel Gear"],
        partnerUrl: "https://napleswatersports.com?ref=nvp",
    },
    {
        id: "bikes",
        name: "Bicycles",
        icon: "🚲",
        description: "Explore Naples on two wheels",
        priceRange: "$25-75/day",
        items: ["Beach Cruisers", "Electric Bikes", "Tandem Bikes", "Kids Bikes", "Helmets"],
        partnerUrl: "https://naples-bike-rentals.com?ref=nvp",
    },
    {
        id: "golf",
        name: "Golf Equipment",
        icon: "⛳",
        description: "Don't pack your clubs - rent them",
        priceRange: "$50-100/day",
        items: ["Full Club Sets", "Premium Sets", "Golf Carts", "Push Carts"],
        partnerUrl: "https://clubcaddie.com/naples?ref=nvp",
    },
    {
        id: "fishing",
        name: "Fishing Gear",
        icon: "🎣",
        description: "Surf fishing and pier gear",
        priceRange: "$30-75/day",
        items: ["Fishing Rods", "Tackle Boxes", "Bait", "Coolers", "Chairs"],
        partnerUrl: "https://naples-fishing-gear.com?ref=nvp",
    },
    {
        id: "baby",
        name: "Baby & Family Gear",
        icon: "👶",
        description: "Travel light with baby gear rentals",
        priceRange: "$15-75/day",
        items: ["Strollers", "Car Seats", "Cribs", "High Chairs", "Beach Wagons"],
        partnerUrl: "https://babyquip.com/naples?ref=nvp",
    },
];

export function EquipmentRentalsGrid() {
    return (
        <section className="my-12">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 mb-2 block">
                    Travel Light
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Equipment Rentals</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Don't pack it - rent it! Get beach gear, bikes, kayaks, and more delivered to your hotel or vacation rental.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rentalCategories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl">{category.icon}</span>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                                <p className="text-ocean-600 font-medium">{category.priceRange}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {category.items.slice(0, 4).map((item) => (
                                <span
                                    key={item}
                                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                        <a
                            href={category.partnerUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="block w-full py-3 px-4 bg-ocean-600 text-white text-center font-bold rounded-xl hover:bg-ocean-700 transition-colors"
                        >
                            Browse & Book →
                        </a>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-8 text-center">
                Partner with local rental companies. We earn 10-15% commission on bookings.
            </p>
        </section>
    );
}

export function EquipmentRentalInlineCta({ category }: { category?: string }) {
    return (
        <a
            href="https://babyquip.com/naples?ref=nvp"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100 hover:border-cyan-300 transition-colors my-4"
        >
            <span className="text-3xl">🏖️</span>
            <div className="flex-1">
                <div className="text-xs text-cyan-600 font-medium mb-1">TRAVEL LIGHT</div>
                <h4 className="font-semibold text-gray-900">Rent Beach Gear, Bikes & More</h4>
                <p className="text-sm text-gray-500">Delivered to your hotel or rental</p>
            </div>
            <div className="px-4 py-2 bg-cyan-600 text-white font-bold rounded-lg text-sm">
                Browse →
            </div>
        </a>
    );
}
