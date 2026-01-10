"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";

interface NaplesPass {
    id: string;
    name: string;
    price: number;
    originalValue: number;
    validDays: number;
    description: string;
    includes: string[];
    color: string;
    popular?: boolean;
}

const naplesPasses: NaplesPass[] = [
    {
        id: "beach",
        name: "Naples Beach Pass",
        price: 49,
        originalValue: 120,
        validDays: 7,
        description: "The perfect beach vacation bundle",
        includes: [
            "20% off at 10 beachfront restaurants",
            "Free beach chair rental (1 day)",
            "$10 off kayak/paddleboard rental",
            "Naples Pier sunset tour discount",
            "Beach gear shop discounts",
        ],
        color: "from-cyan-500 to-blue-600",
    },
    {
        id: "foodie",
        name: "Naples Foodie Pass",
        price: 59,
        originalValue: 150,
        validDays: 7,
        description: "Taste the best of Naples dining",
        includes: [
            "15% off at 15+ partner restaurants",
            "Free appetizer at participating venues",
            "$20 off food tour booking",
            "Exclusive stone crab season deal",
            "Winery tasting discount",
        ],
        color: "from-orange-500 to-red-600",
        popular: true,
    },
    {
        id: "arts",
        name: "Naples Arts Pass",
        price: 39,
        originalValue: 90,
        validDays: 7,
        description: "Explore Naples' vibrant arts scene",
        includes: [
            "Naples Botanical Garden entry",
            "Baker Museum admission",
            "Art gallery tour discount",
            "Naples Players show discount",
            "Public art walking tour",
        ],
        color: "from-purple-500 to-pink-600",
    },
    {
        id: "golf",
        name: "Naples Golf Pass",
        price: 99,
        originalValue: 250,
        validDays: 14,
        description: "Play the best courses in Naples",
        includes: [
            "$30 off at 5 partner courses",
            "Free range balls at practice facility",
            "10% off pro shop purchases",
            "Guaranteed hot time availability",
            "Golf cart included",
        ],
        color: "from-green-500 to-emerald-600",
    },
    {
        id: "adventure",
        name: "Naples Adventure Pass",
        price: 79,
        originalValue: 200,
        validDays: 7,
        description: "For thrill-seekers and nature lovers",
        includes: [
            "Everglades airboat tour discount",
            "Kayak eco-tour discount",
            "Fishing charter $25 off",
            "Dolphin cruise discount",
            "Bike rental included (1 day)",
        ],
        color: "from-amber-500 to-orange-600",
    },
    {
        id: "ultimate",
        name: "Ultimate Naples Pass",
        price: 149,
        originalValue: 400,
        validDays: 14,
        description: "Everything Naples has to offer",
        includes: [
            "All Beach Pass benefits",
            "All Foodie Pass benefits",
            "All Arts Pass benefits",
            "All Adventure Pass benefits",
            "VIP concierge access",
            "Priority reservations",
        ],
        color: "from-gray-800 to-gray-900",
    },
];

export function NaplesPassesGrid() {
    return (
        <section className="my-12">
            <div className="text-center mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 mb-2 block">
                    Exclusive Savings
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Naples Vacation Passes</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Save hundreds on your Naples vacation with our curated discount passes.
                    One purchase, unlimited savings at partner locations.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {naplesPasses.map((pass) => (
                    <div
                        key={pass.id}
                        className={`relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow ${pass.popular ? "ring-2 ring-orange-500" : ""
                            }`}
                    >
                        {pass.popular && (
                            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                MOST POPULAR
                            </div>
                        )}
                        <div className={`h-3 bg-gradient-to-r ${pass.color}`} />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{pass.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{pass.description}</p>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-4xl font-bold text-gray-900">${pass.price}</span>
                                <span className="text-lg text-gray-400 line-through">${pass.originalValue}</span>
                                <span className="text-sm text-green-600 font-bold">
                                    Save ${pass.originalValue - pass.price}
                                </span>
                            </div>

                            <p className="text-xs text-gray-400 mb-4">Valid for {pass.validDays} days</p>

                            <ul className="space-y-2 mb-6">
                                {pass.includes.slice(0, 4).map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        {item}
                                    </li>
                                ))}
                                {pass.includes.length > 4 && (
                                    <li className="text-sm text-gray-500">
                                        +{pass.includes.length - 4} more benefits
                                    </li>
                                )}
                            </ul>

                            <button
                                className={`w-full py-3 px-4 bg-gradient-to-r ${pass.color} text-white font-bold rounded-xl hover:opacity-90 transition-opacity`}
                            >
                                Buy Pass - ${pass.price}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-gray-50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-center text-gray-900 mb-6">How It Works</h3>
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">1</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Choose Your Pass</h4>
                        <p className="text-sm text-gray-500">Select the pass that fits your vacation style</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">2</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Purchase Online</h4>
                        <p className="text-sm text-gray-500">Instant digital delivery to your email</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">3</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Show Your Pass</h4>
                        <p className="text-sm text-gray-500">Present QR code at partner locations</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">4</div>
                        <h4 className="font-semibold text-gray-900 mb-1">Save Money</h4>
                        <p className="text-sm text-gray-500">Enjoy discounts at all partner venues</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function NaplesPassInlineCta() {
    return (
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl p-6 my-6">
            <div className="flex items-center gap-4">
                <span className="text-4xl">🎟️</span>
                <div className="flex-1">
                    <h4 className="font-bold text-lg">Save with Naples Passes</h4>
                    <p className="text-white/80 text-sm">Get discounts at 50+ restaurants, tours, and attractions</p>
                </div>
                <Link
                    href="/naples-passes"
                    className="px-6 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                >
                    View Passes →
                </Link>
            </div>
        </div>
    );
}
