"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { QuoteRequestForm } from "@/src/components/LeadForms";

const conciergeServices = [
    {
        icon: "🍽️",
        title: "Restaurant Reservations",
        description: "Secure tables at Naples' most sought-after restaurants",
        price: "$25-50",
    },
    {
        icon: "🛥️",
        title: "Yacht & Boat Charters",
        description: "Private sunset cruises, fishing charters, island hopping",
        price: "From $450",
    },
    {
        icon: "👨‍🍳",
        title: "Private Chef",
        description: "In-home dining experiences with local chefs",
        price: "From $150/person",
    },
    {
        icon: "🛍️",
        title: "Personal Shopping",
        description: "Guided shopping tours on 5th Avenue & 3rd Street",
        price: "$75/hour",
    },
    {
        icon: "🏌️",
        title: "Golf Concierge",
        description: "Tee times at exclusive courses, equipment delivery",
        price: "$50-200",
    },
    {
        icon: "✈️",
        title: "Airport Transfers",
        description: "Private car service from RSW to your accommodation",
        price: "$75-150",
    },
    {
        icon: "🏠",
        title: "Home Pre-Stocking",
        description: "Groceries, wine, beach gear delivered before arrival",
        price: "From $75",
    },
    {
        icon: "🎉",
        title: "Event Planning",
        description: "Birthdays, anniversaries, proposals, celebrations",
        price: "Custom quote",
    },
];

const premiumExperiences = [
    {
        title: "Sunset Yacht Proposal",
        price: "$2,500",
        includes: ["Private yacht", "Champagne", "Photographer", "Flowers"],
        image: "/images/placeholders/naples_pier_sunset_4k.jpg",
    },
    {
        title: "Private Island Picnic",
        price: "$1,200",
        includes: ["Boat to Keewaydin", "Gourmet lunch", "Beach setup", "Gear"],
        image: "/images/placeholders/keewaydin_island_secluded_beach_4k.jpg",
    },
    {
        title: "Chef's Table Experience",
        price: "$350/person",
        includes: ["7-course tasting", "Wine pairing", "Meet the chef", "Signed menu"],
        image: "/images/placeholders/naples_romantic_dinner_sunset_4k.jpg",
    },
];

export default function ConciergePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/port_royal_luxury_estate_4k.png"
                        alt="Luxury Naples"
                        fill
                        className="object-cover opacity-30"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-bold uppercase tracking-wider mb-6">
                        ✨ VIP Services
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Naples Concierge Services
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Let us handle every detail of your Naples vacation. Restaurant reservations,
                        private experiences, event planning—we make the impossible possible.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Concierge Services
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {conciergeServices.map((service) => (
                            <div
                                key={service.title}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                            >
                                <span className="text-4xl mb-4 block">{service.icon}</span>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                                <p className="text-ocean-600 font-bold">{service.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Experiences */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Signature Experiences
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {premiumExperiences.map((exp) => (
                            <div
                                key={exp.title}
                                className="bg-white/10 backdrop-blur rounded-3xl overflow-hidden"
                            >
                                <div className="relative h-48">
                                    <SafeImage
                                        src={exp.image}
                                        alt={exp.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                                    <p className="text-2xl font-bold text-ocean-400 mb-4">{exp.price}</p>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                        {exp.includes.map((item) => (
                                            <li key={item} className="flex items-center gap-2">
                                                <span className="text-ocean-400">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Request Form */}
            <section className="py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                            Request Concierge Services
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Tell us what you need and we'll make it happen.
                        </p>
                        <QuoteRequestForm defaultType="concierge" />
                    </div>
                </div>
            </section>
        </div>
    );
}
