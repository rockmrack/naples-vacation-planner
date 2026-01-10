"use client";

import { SafeImage } from "@/src/components/SafeImage";

interface Restaurant {
    name: string;
    specialty: string;
    priceRange: string;
    neighborhood: string;
    mustTry: string;
}

const stoneCrabRestaurants: Restaurant[] = [
    {
        name: "The Dock at Crayton Cove",
        specialty: "Fresh local catches",
        priceRange: "$$$",
        neighborhood: "Naples Bay",
        mustTry: "Stone Crab Claws (market price)",
    },
    {
        name: "Truluck's",
        specialty: "Sustainable seafood",
        priceRange: "$$$$",
        neighborhood: "Waterside Shops",
        mustTry: "All-You-Can-Eat Stone Crab (seasonal)",
    },
    {
        name: "USS Nemo",
        specialty: "Creative seafood",
        priceRange: "$$$",
        neighborhood: "East Naples",
        mustTry: "Stone Crab with Signature Mustard",
    },
    {
        name: "Pincher's Crab Shack",
        specialty: "Casual crab house",
        priceRange: "$$",
        neighborhood: "Multiple locations",
        mustTry: "Stone Crab & Grouper Combo",
    },
    {
        name: "Kelly's Fish House",
        specialty: "Old Florida seafood",
        priceRange: "$$",
        neighborhood: "Naples Bay",
        mustTry: "Stone Crab Sampler",
    },
];

export default function StoneCrabPage() {
    const seasonStart = new Date("2025-10-15");
    const seasonEnd = new Date("2026-05-15");
    const today = new Date();
    const inSeason = today >= seasonStart && today <= seasonEnd;

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-red-600 to-orange-600" />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
                    <span className="text-6xl mb-4 block">🦀</span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Stone Crab Season</h1>
                    <div className={`inline-block px-6 py-3 rounded-full text-lg font-bold mb-6 ${inSeason ? "bg-green-500" : "bg-gray-500"
                        }`}>
                        {inSeason ? "🟢 IN SEASON NOW!" : "🔴 Off Season (Oct 15 - May 15)"}
                    </div>
                    <p className="text-xl text-white/80">
                        Naples is the stone crab capital of the world. Here's your guide to the best claws.
                    </p>
                </div>
            </section>

            {/* Season Info */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            2025-2026 Season
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="p-4 bg-green-50 rounded-2xl">
                                <div className="text-4xl mb-2">🗓️</div>
                                <div className="font-bold text-gray-900">Opens</div>
                                <div className="text-green-700 font-medium">October 15, 2025</div>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-2xl">
                                <div className="text-4xl mb-2">🏆</div>
                                <div className="font-bold text-gray-900">Peak Season</div>
                                <div className="text-amber-700 font-medium">November - January</div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-2xl">
                                <div className="text-4xl mb-2">🔒</div>
                                <div className="font-bold text-gray-900">Closes</div>
                                <div className="text-red-700 font-medium">May 15, 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Guide */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        What to Expect to Pay
                    </h2>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                        <table className="w-full">
                            <thead className="bg-red-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Size</th>
                                    <th className="px-6 py-4 text-left">Description</th>
                                    <th className="px-6 py-4 text-left">Market Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-bold">Medium</td>
                                    <td className="px-6 py-4">2.75 - 3.5 oz claws</td>
                                    <td className="px-6 py-4">$35-45/lb</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">Large</td>
                                    <td className="px-6 py-4">3.5 - 5 oz claws</td>
                                    <td className="px-6 py-4">$50-65/lb</td>
                                </tr>
                                <tr className="bg-gray-50">
                                    <td className="px-6 py-4 font-bold">Jumbo</td>
                                    <td className="px-6 py-4">5+ oz claws</td>
                                    <td className="px-6 py-4">$70-90/lb</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-bold">Colossal</td>
                                    <td className="px-6 py-4">7+ oz (rare)</td>
                                    <td className="px-6 py-4">$100+/lb</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                        Prices fluctuate based on supply. Early season = higher prices.
                    </p>
                </div>
            </section>

            {/* Where to Eat */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Best Stone Crab Restaurants in Naples
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stoneCrabRestaurants.map((restaurant) => (
                            <div
                                key={restaurant.name}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                                    <span className="text-sm font-bold text-red-600">{restaurant.priceRange}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{restaurant.neighborhood}</p>
                                <p className="text-sm text-gray-600 mb-3">{restaurant.specialty}</p>
                                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl">
                                    🦀 Must Try: {restaurant.mustTry}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tips */}
            <section className="py-12 bg-red-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-6">Stone Crab Tips</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <span className="text-3xl mb-2 block">🥶</span>
                            <p>Stone crab is always served cold with mustard sauce</p>
                        </div>
                        <div>
                            <span className="text-3xl mb-2 block">♻️</span>
                            <p>Claws regenerate! Crabs are returned to the ocean</p>
                        </div>
                        <div>
                            <span className="text-3xl mb-2 block">📞</span>
                            <p>Call ahead - popular restaurants sell out nightly</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
