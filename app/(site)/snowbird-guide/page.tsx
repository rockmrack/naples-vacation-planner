"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { QuoteRequestForm } from "@/src/components/LeadForms";

const snowbirdBenefits = [
    { icon: "☀️", title: "Perfect Weather", desc: "Average 75°F from November to April" },
    { icon: "🏖️", title: "World-Class Beaches", desc: "10+ miles of pristine Gulf beaches" },
    { icon: "⛳", title: "Golf Paradise", desc: "80+ courses in the Naples area" },
    { icon: "🍽️", title: "Fine Dining", desc: "Top restaurants and wine bars" },
    { icon: "🎭", title: "Arts & Culture", desc: "Philharmonic, theaters, galleries" },
    { icon: "🛡️", title: "Safety", desc: "One of Florida's safest communities" },
];

const monthlyRentalGuide = [
    { type: "Beachfront Condo", range: "$4,000 - $12,000/month", peak: "Jan-Mar" },
    { type: "Golf Community Home", range: "$3,500 - $8,000/month", peak: "Jan-Mar" },
    { type: "Downtown Apartment", range: "$2,500 - $5,000/month", peak: "Feb-Apr" },
    { type: "Vanderbilt Beach Area", range: "$5,000 - $15,000/month", peak: "Jan-Mar" },
];

const neighborhoods = [
    {
        name: "Pelican Bay",
        description: "Beachfront luxury with tram service to private beach",
        image: "/images/placeholders/pelican_bay_tram_beach_4k.png",
        highlights: ["Private beach", "Artis—Naples", "Fine dining"],
    },
    {
        name: "Vanderbilt Beach",
        description: "Walkable beach access and resort amenities",
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        highlights: ["Beach access", "Mercato nearby", "Restaurants"],
    },
    {
        name: "Old Naples",
        description: "Historic charm with 5th Avenue walkability",
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
        highlights: ["Walking district", "Boutique shopping", "Naples Pier"],
    },
    {
        name: "Park Shore",
        description: "Venetian Bay views and upscale living",
        image: "/images/placeholders/park_shore_venetian_bay_4k.png",
        highlights: ["Venetian Village", "Bay views", "Central location"],
    },
];

export default function SnowbirdGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/naples_pier_sunny_winter_day_4k.jpg"
                        alt="Naples winter day"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-6">
                        🐦 Snowbird Guide
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Your Naples Snowbird Guide
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to know about spending winter in Naples—seasonal rentals,
                        neighborhoods, activities, and insider tips from longtime residents.
                    </p>
                </div>
            </section>

            {/* Why Naples */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Why Snowbirds Choose Naples
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {snowbirdBenefits.map((benefit) => (
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
                        Popular Snowbird Neighborhoods
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {neighborhoods.map((area) => (
                            <div
                                key={area.name}
                                className="group bg-gray-50 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <SafeImage
                                        src={area.image}
                                        alt={area.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{area.name}</h3>
                                    <p className="text-gray-600 mb-4">{area.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {area.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm"
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rental Pricing */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Seasonal Rental Pricing Guide
                    </h2>
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-amber-600 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left">Property Type</th>
                                    <th className="px-6 py-4 text-left">Price Range</th>
                                    <th className="px-6 py-4 text-left">Peak Months</th>
                                </tr>
                            </thead>
                            <tbody>
                                {monthlyRentalGuide.map((row, i) => (
                                    <tr key={row.type} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                                        <td className="px-6 py-4 font-medium">{row.type}</td>
                                        <td className="px-6 py-4">{row.range}</td>
                                        <td className="px-6 py-4">{row.peak}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                        Prices are estimates and vary by property condition, location, and amenities.
                    </p>
                </div>
            </section>

            {/* Lead Form */}
            <section className="py-16 bg-amber-900 text-white">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 text-gray-900">
                        <h2 className="text-2xl font-bold mb-2 text-center">
                            Find Your Winter Rental
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Tell us your preferences and we'll connect you with trusted rental agents.
                        </p>
                        <QuoteRequestForm defaultType="vacation-rental" />
                    </div>
                </div>
            </section>
        </div>
    );
}
