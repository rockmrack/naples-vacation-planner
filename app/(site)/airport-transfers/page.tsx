"use client";

import { useState } from "react";
import { SafeImage } from "@/src/components/SafeImage";
import { QuoteRequestForm } from "@/src/components/LeadForms";

interface TransferOption {
    type: string;
    description: string;
    priceRange: string;
    capacity: string;
    features: string[];
    bookingUrl: string;
}

const transferOptions: TransferOption[] = [
    {
        type: "Private Sedan",
        description: "Professional chauffeur in a luxury sedan",
        priceRange: "$75-100",
        capacity: "Up to 3 passengers",
        features: ["Door-to-door", "Flight tracking", "Meet & greet", "Child seats available"],
        bookingUrl: "https://example.com/book-sedan",
    },
    {
        type: "Private SUV",
        description: "Spacious SUV for families with luggage",
        priceRange: "$95-130",
        capacity: "Up to 6 passengers",
        features: ["Extra luggage space", "Flight tracking", "Complimentary water", "Child seats"],
        bookingUrl: "https://example.com/book-suv",
    },
    {
        type: "Luxury Vehicle",
        description: "Premium experience in a luxury vehicle",
        priceRange: "$150-200",
        capacity: "Up to 3 passengers",
        features: ["Mercedes/BMW/Cadillac", "Red carpet service", "Champagne option", "VIP treatment"],
        bookingUrl: "https://example.com/book-luxury",
    },
    {
        type: "Shared Shuttle",
        description: "Affordable shared ride with other travelers",
        priceRange: "$35-50/person",
        capacity: "Shared with others",
        features: ["Scheduled departures", "Multiple stops", "Budget-friendly", "AC van"],
        bookingUrl: "https://example.com/book-shuttle",
    },
];

export default function AirportTransfersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-5xl mb-4 block">✈️</span>
                    <h1 className="text-4xl font-bold mb-4">Airport Transfers</h1>
                    <p className="text-xl text-white/80">
                        Private car service from RSW Airport to Naples. Skip the rental car lines.
                    </p>
                </div>
            </section>

            {/* Route Info */}
            <section className="py-8 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-8 text-center">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">RSW</div>
                            <div className="text-sm text-gray-500">Southwest Florida Int'l</div>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed border-gray-300 relative">
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-400">
                                ~30 min
                            </span>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-900">Naples</div>
                            <div className="text-sm text-gray-500">Downtown / Beaches</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Transfer Options */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Transfer Options</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {transferOptions.map((option) => (
                            <div
                                key={option.type}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{option.type}</h3>
                                        <p className="text-sm text-gray-500">{option.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">{option.priceRange}</div>
                                        <div className="text-xs text-gray-400">each way</div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">{option.capacity}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {option.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                                        >
                                            ✓ {feature}
                                        </span>
                                    ))}
                                </div>
                                <a
                                    href={option.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-bold rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    Book {option.type} →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Request Quote */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            Request a Custom Quote
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Need a group transfer or special arrangement? Tell us your needs.
                        </p>
                        <QuoteRequestForm defaultType="concierge" />
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">FAQ</h2>
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">How far is RSW Airport from Naples?</h3>
                            <p className="text-gray-600">RSW is about 35 miles from downtown Naples, roughly 30-45 minutes depending on traffic.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">What if my flight is delayed?</h3>
                            <p className="text-gray-600">All services include flight tracking. Your driver will adjust pickup time based on actual arrival.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">Can I book a round-trip transfer?</h3>
                            <p className="text-gray-600">Yes! Save 10% when you book round-trip transfers at time of reservation.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
