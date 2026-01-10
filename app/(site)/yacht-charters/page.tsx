"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { QuoteRequestForm } from "@/src/components/LeadForms";

const yachtTypes = [
    {
        title: "Sunset Cruises",
        description: "2-hour cruises with champagne and dolphin watching",
        price: "From $450",
        image: "/images/placeholders/naples_pier_sunset_4k.jpg",
        duration: "2 hours",
        capacity: "Up to 6 guests",
    },
    {
        title: "Fishing Charters",
        description: "Inshore and offshore fishing with expert captains",
        price: "From $600",
        image: "/images/placeholders/goodland_fishing_village_4k.png",
        duration: "4-8 hours",
        capacity: "Up to 6 guests",
    },
    {
        title: "Day Charters",
        description: "Full-day island hopping, sandbar stops, and swimming",
        price: "From $1,200",
        image: "/images/placeholders/marco_island_tigertail_beach_aerial_4k.jpg",
        duration: "6-8 hours",
        capacity: "Up to 12 guests",
    },
    {
        title: "Private Events",
        description: "Weddings, proposals, anniversaries, corporate events",
        price: "Custom pricing",
        image: "/images/placeholders/naples_bay_resort_marina_4k.png",
        duration: "Flexible",
        capacity: "Up to 50 guests",
    },
];

const whatToExpect = [
    { icon: "🍾", title: "Premium Catering", desc: "Champagne, appetizers, custom menus available" },
    { icon: "👨‍✈️", title: "Professional Crew", desc: "USCG-certified captains and experienced crew" },
    { icon: "🐬", title: "Wildlife", desc: "Dolphins, manatees, and sea birds are common" },
    { icon: "📸", title: "Photo Worthy", desc: "Stunning sunsets and Gulf views" },
    { icon: "🎵", title: "Entertainment", desc: "Bluetooth speakers, optional live music" },
    { icon: "🛟", title: "Safety First", desc: "Full safety equipment and insurance" },
];

export default function YachtChartersPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/naples_bay_resort_marina_4k.png"
                        alt="Naples yacht marina"
                        fill
                        className="object-cover opacity-40"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-6">
                        ⛵ Yacht Charters
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Naples Private Yacht Charters
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Experience the Gulf of Mexico in style. Sunset cruises, fishing charters,
                        island hopping, and private events aboard luxury vessels.
                    </p>
                </div>
            </section>

            {/* Charter Types */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Choose Your Experience
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {yachtTypes.map((type) => (
                            <div
                                key={type.title}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <SafeImage
                                        src={type.image}
                                        alt={type.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 font-bold text-gray-900">
                                        {type.price}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                                    <p className="text-gray-600 mb-4">{type.description}</p>
                                    <div className="flex gap-4 text-sm text-gray-500">
                                        <span>⏱️ {type.duration}</span>
                                        <span>👥 {type.capacity}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="py-16 bg-blue-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        What's Included
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {whatToExpect.map((item) => (
                            <div
                                key={item.title}
                                className="text-center p-4"
                            >
                                <span className="text-4xl mb-3 block">{item.icon}</span>
                                <h3 className="font-bold mb-1">{item.title}</h3>
                                <p className="text-xs text-blue-200">{item.desc}</p>
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
                            Request a Charter Quote
                        </h2>
                        <p className="text-gray-600 text-center mb-8">
                            Tell us about your ideal charter and we'll match you with the perfect vessel.
                        </p>
                        <QuoteRequestForm defaultType="concierge" />
                    </div>
                </div>
            </section>
        </div>
    );
}
