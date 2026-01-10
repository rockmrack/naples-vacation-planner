"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { QuoteRequestForm } from "@/src/components/LeadForms";

const venueCategories = [
    {
        title: "Beachfront Venues",
        description: "Say 'I do' with the Gulf of Mexico as your backdrop",
        image: "/images/placeholders/naples_pier_sunset_4k.jpg",
        venues: ["The Ritz-Carlton Beach", "LaPlaya Beach Resort", "Naples Grande Beach"],
    },
    {
        title: "Garden Venues",
        description: "Lush tropical settings for romantic ceremonies",
        image: "/images/placeholders/east_naples_botanical_garden_4k.png",
        venues: ["Naples Botanical Garden", "The Conservancy", "Grey Oaks Estate"],
    },
    {
        title: "Yacht & Waterfront",
        description: "Celebrate on the water with stunning sunset views",
        image: "/images/placeholders/naples_bay_resort_marina_4k.png",
        venues: ["Naples Yacht Club", "Pure Naples Charters", "Bayfront Inn"],
    },
    {
        title: "Historic & Unique",
        description: "One-of-a-kind venues with character and charm",
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
        venues: ["Palm Cottage", "Third Street South", "Koreshan Historic Site"],
    },
];

const weddingServices = [
    { icon: "📸", title: "Photography", desc: "Award-winning wedding photographers" },
    { icon: "🎂", title: "Catering", desc: "From casual to black-tie dining" },
    { icon: "💐", title: "Florists", desc: "Tropical and classic arrangements" },
    { icon: "🎵", title: "Entertainment", desc: "DJs, bands, and live music" },
    { icon: "🚗", title: "Transportation", desc: "Limos, trolleys, and boats" },
    { icon: "💄", title: "Beauty", desc: "Hair, makeup, and spa services" },
];

export default function WeddingsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/naples_romantic_dinner_sunset_4k.jpg"
                        alt="Naples wedding sunset"
                        fill
                        className="object-cover opacity-30"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Naples Weddings
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Your Dream Naples Wedding
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        From beachfront ceremonies to botanical garden receptions,
                        discover why Naples is Southwest Florida's premier wedding destination.
                    </p>
                </div>
            </section>

            {/* Venue Categories */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Wedding Venue Styles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {venueCategories.map((cat) => (
                            <div
                                key={cat.title}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <SafeImage
                                        src={cat.image}
                                        alt={cat.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                                    <p className="text-gray-600 mb-4">{cat.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.venues.map((venue) => (
                                            <span
                                                key={venue}
                                                className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-sm"
                                            >
                                                {venue}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Wedding Services & Vendors
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {weddingServices.map((service) => (
                            <div
                                key={service.title}
                                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-rose-50 transition-colors"
                            >
                                <span className="text-4xl mb-3 block">{service.icon}</span>
                                <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                                <p className="text-xs text-gray-500">{service.desc}</p>
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
                            Start Planning Your Naples Wedding
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Tell us about your vision and we'll connect you with the best venues and vendors.
                        </p>
                        <QuoteRequestForm defaultType="wedding" />
                    </div>
                </div>
            </section>
        </div>
    );
}
