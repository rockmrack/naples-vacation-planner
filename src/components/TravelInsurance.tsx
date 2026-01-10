"use client";

import { useState } from "react";

interface InsuranceQuote {
    provider: string;
    planName: string;
    coverage: string;
    priceRange: string;
    features: string[];
    affiliateUrl: string;
    logo: string;
}

const insuranceProviders: InsuranceQuote[] = [
    {
        provider: "World Nomads",
        planName: "Standard Plan",
        coverage: "Up to $100,000",
        priceRange: "$50-150",
        features: ["Trip Cancellation", "Medical Coverage", "Baggage Loss", "24/7 Assistance"],
        affiliateUrl: "https://www.worldnomads.com/usa/travel-insurance?affiliate=naplesvacationplanner",
        logo: "🌍",
    },
    {
        provider: "Allianz Travel",
        planName: "OneTrip Prime",
        coverage: "Up to $150,000",
        priceRange: "$75-200",
        features: ["Cancel for Any Reason", "Medical Evacuation", "Trip Interruption", "Rental Car Coverage"],
        affiliateUrl: "https://www.allianztravelinsurance.com/?affiliate=naplesvacationplanner",
        logo: "🛡️",
    },
    {
        provider: "Travel Guard",
        planName: "Preferred Plan",
        coverage: "Up to $100,000",
        priceRange: "$60-175",
        features: ["Trip Cancellation", "Emergency Medical", "Missed Connection", "Concierge Services"],
        affiliateUrl: "https://www.travelguard.com/?affiliate=naplesvacationplanner",
        logo: "✈️",
    },
];

export function TravelInsuranceWidget() {
    const [tripCost, setTripCost] = useState("");
    const [travelers, setTravelers] = useState(2);
    const [age, setAge] = useState("35-49");

    return (
        <section className="my-12 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
            <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2 block">
                    🛡️ Protect Your Trip
                </span>
                <h3 className="text-2xl font-bold text-gray-900">Travel Insurance</h3>
                <p className="text-gray-600 mt-1">
                    Don't let unexpected events ruin your Naples vacation.
                </p>
            </div>

            {/* Quote Calculator */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Get a Quick Quote</h4>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trip Cost</label>
                        <input
                            type="number"
                            value={tripCost}
                            onChange={(e) => setTripCost(e.target.value)}
                            placeholder="$3,500"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                        <select
                            value={travelers}
                            onChange={(e) => setTravelers(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? "Traveler" : "Travelers"}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                        <select
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="18-34">18-34</option>
                            <option value="35-49">35-49</option>
                            <option value="50-64">50-64</option>
                            <option value="65+">65+</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Insurance Providers */}
            <div className="grid md:grid-cols-3 gap-4">
                {insuranceProviders.map((provider) => (
                    <div
                        key={provider.provider}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="text-4xl mb-3">{provider.logo}</div>
                        <h4 className="font-bold text-gray-900">{provider.provider}</h4>
                        <p className="text-sm text-purple-600 font-medium">{provider.planName}</p>
                        <p className="text-xs text-gray-500 mt-1">Coverage: {provider.coverage}</p>
                        <p className="text-lg font-bold text-gray-900 my-3">{provider.priceRange}</p>
                        <ul className="text-sm text-gray-600 space-y-1 mb-4">
                            {provider.features.slice(0, 3).map((f) => (
                                <li key={f} className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={provider.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="block w-full py-2 px-4 bg-purple-600 text-white text-center font-medium rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Get Quote →
                        </a>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                We may earn a commission when you purchase through these links (10% per sale).
            </p>
        </section>
    );
}

export function InsuranceInlineCta() {
    return (
        <a
            href="https://www.worldnomads.com/usa/travel-insurance?affiliate=naplesvacationplanner"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100 hover:border-purple-300 transition-colors my-4"
        >
            <span className="text-3xl">🛡️</span>
            <div className="flex-1">
                <div className="text-xs text-purple-600 font-medium mb-1">PROTECT YOUR TRIP</div>
                <h4 className="font-semibold text-gray-900">Get Travel Insurance</h4>
                <p className="text-sm text-gray-500">From $50 for comprehensive coverage</p>
            </div>
            <div className="px-4 py-2 bg-purple-600 text-white font-bold rounded-lg text-sm">
                Quote →
            </div>
        </a>
    );
}
