"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { QuoteRequestForm } from "@/src/components/LeadForms";

const relocationBenefits = [
    { icon: "🌴", title: "No State Income Tax", desc: "Florida has no state income tax" },
    { icon: "☀️", title: "Year-Round Sunshine", desc: "340+ days of sunshine annually" },
    { icon: "🏥", title: "Top Healthcare", desc: "NCH and Physicians Regional hospitals" },
    { icon: "📚", title: "Quality Schools", desc: "Top-rated public and private schools" },
    { icon: "🛡️", title: "Low Crime", desc: "One of Florida's safest cities" },
    { icon: "✈️", title: "Travel Hub", desc: "RSW airport with direct flights" },
];

const neighborhoods = [
    {
        name: "Old Naples",
        lifestyle: "Historic charm, walkable downtown",
        priceRange: "$1M - $20M+",
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
    },
    {
        name: "Pelican Bay",
        lifestyle: "Beach access, cultural hub",
        priceRange: "$500K - $8M",
        image: "/images/placeholders/pelican_bay_tram_beach_4k.png",
    },
    {
        name: "Grey Oaks",
        lifestyle: "Golf, privacy, luxury estates",
        priceRange: "$1.5M - $15M",
        image: "/images/placeholders/grey_oaks_golf_estate_4k.png",
    },
    {
        name: "Park Shore",
        lifestyle: "Venetian Bay, central location",
        priceRange: "$800K - $6M",
        image: "/images/placeholders/park_shore_venetian_bay_4k.png",
    },
    {
        name: "Vanderbilt Beach",
        lifestyle: "Beach living, resort amenities",
        priceRange: "$600K - $5M",
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
    },
    {
        name: "Fiddler's Creek",
        lifestyle: "Golf, family-friendly, new builds",
        priceRange: "$400K - $3M",
        image: "/images/placeholders/fiddlers_creek_resort_pool_4k.png",
    },
];

export default function RelocatingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/port_royal_luxury_estate_4k.png"
                        alt="Naples luxury home"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold uppercase tracking-wider mb-6">
                        🏠 Relocating
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Moving to Naples, Florida
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Your complete relocation guide—neighborhoods, schools, healthcare, cost of living,
                        and insider tips from locals who made the move.
                    </p>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Why People Are Moving to Naples
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {relocationBenefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="text-center p-6 bg-white rounded-2xl shadow-sm"
                            >
                                <span className="text-4xl mb-3 block">{benefit.icon}</span>
                                <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                                <p className="text-xs text-gray-500">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Neighborhoods */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Naples Neighborhood Guide
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {neighborhoods.map((area) => (
                            <div
                                key={area.name}
                                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <SafeImage
                                        src={area.image}
                                        alt={area.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900">{area.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{area.lifestyle}</p>
                                    <p className="text-sm font-medium text-green-700">{area.priceRange}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Form */}
            <section className="py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            Connect with a Naples Realtor
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Get personalized neighborhood recommendations and schedule property tours.
                        </p>
                        <QuoteRequestForm defaultType="relocation" />
                    </div>
                </div>
            </section>
        </div>
    );
}
