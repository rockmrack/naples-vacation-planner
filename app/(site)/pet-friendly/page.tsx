"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";

interface PetFriendlyPlace {
    name: string;
    category: "Beach" | "Restaurant" | "Hotel" | "Park" | "Activity";
    neighborhood: string;
    description: string;
    petPolicy: string;
    restrictions?: string;
}

const petFriendlyPlaces: PetFriendlyPlace[] = [
    // Beaches
    {
        name: "Bonita Dog Beach",
        category: "Beach",
        neighborhood: "Bonita Springs",
        description: "Off-leash dog beach with designated swimming area",
        petPolicy: "Dogs allowed off-leash in designated area",
    },
    {
        name: "Barefoot Beach (Lee County)",
        category: "Beach",
        neighborhood: "Bonita Springs",
        description: "Leashed dogs allowed on certain sections",
        petPolicy: "Leashed dogs only",
        restrictions: "Not allowed on preserve trails",
    },
    // Restaurants
    {
        name: "The Bay House",
        category: "Restaurant",
        neighborhood: "Naples Bay",
        description: "Waterfront dining with pet-friendly patio",
        petPolicy: "Dogs welcome on outdoor patio",
    },
    {
        name: "HB's on the Gulf",
        category: "Restaurant",
        neighborhood: "Vanderbilt Beach",
        description: "Beachfront restaurant with dog-friendly deck",
        petPolicy: "Dogs allowed on beach deck",
    },
    {
        name: "Ridgway Bar & Grill",
        category: "Restaurant",
        neighborhood: "3rd Street South",
        description: "Upscale casual with courtyard seating",
        petPolicy: "Dogs welcome in courtyard",
    },
    // Hotels
    {
        name: "Inn on Fifth",
        category: "Hotel",
        neighborhood: "Downtown Naples",
        description: "Luxury boutique hotel in the heart of 5th Avenue",
        petPolicy: "$150 fee, up to 25 lbs",
        restrictions: "Weight limit applies",
    },
    {
        name: "LaPlaya Beach Resort",
        category: "Hotel",
        neighborhood: "Vanderbilt Beach",
        description: "Beachfront resort with pet program",
        petPolicy: "$150 fee, pet amenities included",
    },
    {
        name: "The Naples Grande",
        category: "Hotel",
        neighborhood: "North Naples",
        description: "Resort with Pets in Paradise program",
        petPolicy: "$75/night fee, pet bed and bowls provided",
    },
    // Parks
    {
        name: "Naples Dog Park",
        category: "Park",
        neighborhood: "East Naples",
        description: "Fully fenced off-leash dog park",
        petPolicy: "Off-leash, separate small dog area",
    },
    {
        name: "Canine Cove",
        category: "Park",
        neighborhood: "Golden Gate",
        description: "Large dog park with water features",
        petPolicy: "Off-leash, agility equipment",
    },
    // Activities
    {
        name: "Pure Naples Cruises",
        category: "Activity",
        neighborhood: "Naples Pier",
        description: "Sunset dolphin cruises allow small dogs",
        petPolicy: "Small dogs welcome on afternoon cruises",
        restrictions: "Call ahead to confirm",
    },
];

const categoryIcons = {
    Beach: "🏖️",
    Restaurant: "🍽️",
    Hotel: "🏨",
    Park: "🌳",
    Activity: "⛵",
};

const categoryColors = {
    Beach: "bg-cyan-100 text-cyan-800",
    Restaurant: "bg-orange-100 text-orange-800",
    Hotel: "bg-purple-100 text-purple-800",
    Park: "bg-green-100 text-green-800",
    Activity: "bg-blue-100 text-blue-800",
};

export default function PetFriendlyPage() {
    const categories = ["All", "Beach", "Restaurant", "Hotel", "Park", "Activity"];

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-5xl mb-4 block">🐕</span>
                    <h1 className="text-4xl font-bold mb-4">Pet-Friendly Naples</h1>
                    <p className="text-xl text-white/80">
                        Beaches, restaurants, hotels, and activities that welcome your furry friends.
                    </p>
                </div>
            </section>

            {/* Places Grid */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    {/* By Category */}
                    {["Beach", "Restaurant", "Hotel", "Park", "Activity"].map((category) => {
                        const places = petFriendlyPlaces.filter((p) => p.category === category);
                        if (places.length === 0) return null;

                        return (
                            <div key={category} className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                    <span>{categoryIcons[category as keyof typeof categoryIcons]}</span>
                                    Pet-Friendly {category}s
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {places.map((place) => (
                                        <div
                                            key={place.name}
                                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-gray-900">{place.name}</h3>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${categoryColors[place.category]}`}>
                                                    {place.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2">{place.neighborhood}</p>
                                            <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                                            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-xl mb-2">
                                                🐾 {place.petPolicy}
                                            </div>
                                            {place.restrictions && (
                                                <p className="text-xs text-amber-600">
                                                    ⚠️ {place.restrictions}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Tips */}
            <section className="py-12 bg-amber-900 text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">Tips for Traveling with Pets</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 rounded-2xl p-6">
                            <h3 className="font-bold mb-3">📋 Before You Go</h3>
                            <ul className="text-sm space-y-2 text-amber-100">
                                <li>• Ensure vaccinations are up to date</li>
                                <li>• Bring health certificate for hotels</li>
                                <li>• Pack familiar food and treats</li>
                                <li>• Bring pet first-aid kit</li>
                            </ul>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6">
                            <h3 className="font-bold mb-3">🌴 In Naples</h3>
                            <ul className="text-sm space-y-2 text-amber-100">
                                <li>• Keep pets hydrated in Florida heat</li>
                                <li>• Hot pavement burns paws - test first</li>
                                <li>• Watch for wildlife (gators, snakes)</li>
                                <li>• Always clean up after your pet</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
