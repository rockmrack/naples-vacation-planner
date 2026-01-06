'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Beach {
    id: string;
    name: string;
    emoji: string;
    description: string;
    crowdLevel: 'low' | 'moderate' | 'high';
    parkingStatus: 'available' | 'limited' | 'full';
    features: string[];
    bestTime: string;
    location: string;
}

const NAPLES_BEACHES: Beach[] = [
    {
        id: 'naples-pier',
        name: 'Naples Pier Beach',
        emoji: '🌴',
        description: 'Iconic beach with the famous fishing pier and stunning sunsets',
        crowdLevel: 'high',
        parkingStatus: 'limited',
        features: ['Restrooms', 'Showers', 'Concessions', 'Pier Access'],
        bestTime: 'Early morning or sunset',
        location: '25 12th Ave S, Naples',
    },
    {
        id: 'vanderbilt',
        name: 'Vanderbilt Beach',
        emoji: '🏖️',
        description: 'Beautiful white sand beach with calm waters perfect for swimming',
        crowdLevel: 'moderate',
        parkingStatus: 'available',
        features: ['Restrooms', 'Showers', 'Lifeguards', 'Rental Chairs'],
        bestTime: 'Anytime - great all day',
        location: '10100 Gulf Shore Dr, Naples',
    },
    {
        id: 'lowdermilk',
        name: 'Lowdermilk Park Beach',
        emoji: '👨‍👩‍👧‍👦',
        description: 'Family-friendly beach with playground, picnic areas, and volleyball',
        crowdLevel: 'moderate',
        parkingStatus: 'available',
        features: ['Playground', 'Picnic Areas', 'Volleyball', 'Restrooms'],
        bestTime: 'Morning for families',
        location: '1301 Gulf Shore Blvd N, Naples',
    },
    {
        id: 'clam-pass',
        name: 'Clam Pass Park',
        emoji: '🌿',
        description: 'Natural beach with boardwalk through mangroves - a true escape',
        crowdLevel: 'low',
        parkingStatus: 'available',
        features: ['Nature Trail', 'Tram Service', 'Restaurant', 'Kayaking'],
        bestTime: 'Morning for wildlife',
        location: '465 Seagate Dr, Naples',
    },
    {
        id: 'delnor-wiggins',
        name: 'Delnor-Wiggins Pass',
        emoji: '🐚',
        description: 'State park beach with excellent shelling and natural beauty',
        crowdLevel: 'low',
        parkingStatus: 'available',
        features: ['Shelling', 'Fishing', 'Kayaking', 'Nature Trails'],
        bestTime: 'Early morning for shelling',
        location: '11135 Gulfshore Dr, Naples',
    },
    {
        id: 'barefoot',
        name: 'Barefoot Beach',
        emoji: '🦋',
        description: 'Preserve beach with gopher tortoises and pristine natural setting',
        crowdLevel: 'low',
        parkingStatus: 'limited',
        features: ['Preserve', 'Wildlife', 'Nature Trails', 'Shelling'],
        bestTime: 'Morning for cooler temps',
        location: '505 Barefoot Beach Blvd, Bonita Springs',
    },
];

export function BeachGuide() {
    const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null);
    const [filterCrowd, setFilterCrowd] = useState<string>('all');

    const getCrowdBadge = (level: Beach['crowdLevel']) => {
        const styles = {
            low: 'bg-green-100 text-green-700',
            moderate: 'bg-yellow-100 text-yellow-700',
            high: 'bg-red-100 text-red-700',
        };
        const labels = {
            low: '🟢 Low Crowds',
            moderate: '🟡 Moderate',
            high: '🔴 Busy',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[level]}`}>
                {labels[level]}
            </span>
        );
    };

    const getParkingBadge = (status: Beach['parkingStatus']) => {
        const styles = {
            available: 'bg-green-100 text-green-700',
            limited: 'bg-yellow-100 text-yellow-700',
            full: 'bg-red-100 text-red-700',
        };
        const labels = {
            available: '🅿️ Parking Available',
            limited: '🅿️ Limited Parking',
            full: '🅿️ Parking Full',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    const filteredBeaches = filterCrowd === 'all'
        ? NAPLES_BEACHES
        : NAPLES_BEACHES.filter(b => b.crowdLevel === filterCrowd);

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-5xl mb-4 block">🏖️</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Naples Beach Guide
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find the perfect beach for your day with real-time crowd levels and parking status
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-3 mb-8">
                    <button
                        onClick={() => setFilterCrowd('all')}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${filterCrowd === 'all'
                                ? 'bg-ocean-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        All Beaches
                    </button>
                    <button
                        onClick={() => setFilterCrowd('low')}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${filterCrowd === 'low'
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        🟢 Low Crowds
                    </button>
                    <button
                        onClick={() => setFilterCrowd('moderate')}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${filterCrowd === 'moderate'
                                ? 'bg-yellow-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        🟡 Moderate
                    </button>
                </div>

                {/* Beach Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBeaches.map((beach) => (
                        <motion.div
                            key={beach.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedBeach(beach)}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                        >
                            {/* Beach Image Placeholder */}
                            <div className="h-40 bg-gradient-to-br from-ocean-400 to-teal-400 flex items-center justify-center">
                                <span className="text-6xl">{beach.emoji}</span>
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{beach.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{beach.description}</p>

                                {/* Status Badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {getCrowdBadge(beach.crowdLevel)}
                                    {getParkingBadge(beach.parkingStatus)}
                                </div>

                                {/* Best Time */}
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>⏰</span>
                                    <span>{beach.bestTime}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Beach Detail Modal */}
                {selectedBeach && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedBeach(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                        >
                            {/* Header */}
                            <div className="h-48 bg-gradient-to-br from-ocean-400 to-teal-400 flex items-center justify-center relative">
                                <span className="text-8xl">{selectedBeach.emoji}</span>
                                <button
                                    onClick={() => setSelectedBeach(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBeach.name}</h3>
                                <p className="text-gray-600 mb-4">{selectedBeach.description}</p>

                                {/* Status */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {getCrowdBadge(selectedBeach.crowdLevel)}
                                    {getParkingBadge(selectedBeach.parkingStatus)}
                                </div>

                                {/* Features */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedBeach.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <span>📍</span>
                                        <span>{selectedBeach.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <span>⏰</span>
                                        <span>Best time: {selectedBeach.bestTime}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(selectedBeach.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl text-center hover:shadow-lg transition-all"
                                    >
                                        Get Directions
                                    </a>
                                    <button
                                        onClick={() => setSelectedBeach(null)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/itineraries"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        Plan Your Beach Day
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
