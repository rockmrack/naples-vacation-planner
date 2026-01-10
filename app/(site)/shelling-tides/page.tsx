"use client";

import { useState } from "react";

interface TideData {
    time: string;
    height: string;
    type: "High" | "Low";
}

interface ShellingSpot {
    name: string;
    quality: "Excellent" | "Good" | "Fair";
    bestFinds: string[];
    tips: string;
}

const todayTides: TideData[] = [
    { time: "5:42 AM", height: "2.8 ft", type: "High" },
    { time: "11:58 AM", height: "0.4 ft", type: "Low" },
    { time: "5:24 PM", height: "2.4 ft", type: "High" },
    { time: "11:42 PM", height: "0.6 ft", type: "Low" },
];

const shellingSpots: ShellingSpot[] = [
    {
        name: "Keewaydin Island",
        quality: "Excellent",
        bestFinds: ["Junonia", "Whelks", "Lightning Whelks", "Sand Dollars"],
        tips: "Boat access only. Go early morning at low tide.",
    },
    {
        name: "Barefoot Beach",
        quality: "Excellent",
        bestFinds: ["Fighting Conchs", "Olive Shells", "Murex", "Shark Teeth"],
        tips: "North end near preserve has best shells.",
    },
    {
        name: "Delnor-Wiggins",
        quality: "Good",
        bestFinds: ["Cockles", "Scallops", "Coquinas", "Sand Dollars"],
        tips: "$6 entry. Less crowded than Naples Beach.",
    },
    {
        name: "Marco Island (Tigertail)",
        quality: "Good",
        bestFinds: ["Horse Conchs", "Pen Shells", "Whelks", "Sea Urchins"],
        tips: "Sandbars at low tide are hotspots.",
    },
    {
        name: "Naples Pier",
        quality: "Fair",
        bestFinds: ["Small Olives", "Coquinas", "Clams", "Moon Snails"],
        tips: "Best for beginners. Go at first light.",
    },
];

const qualityColors = {
    Excellent: "bg-green-100 text-green-800",
    Good: "bg-blue-100 text-blue-800",
    Fair: "bg-yellow-100 text-yellow-800",
};

export default function ShellingTidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            {/* Hero */}
            <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-5xl mb-4 block">🐚</span>
                    <h1 className="text-4xl font-bold mb-4">Naples Shelling & Tide Guide</h1>
                    <p className="text-xl text-white/80">
                        Best shelling times, tide charts, and secret spots for finding shells.
                    </p>
                </div>
            </section>

            {/* Today's Tides */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Today's Tides</h2>
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="grid grid-cols-4 gap-4">
                            {todayTides.map((tide, i) => (
                                <div
                                    key={i}
                                    className={`text-center p-4 rounded-2xl ${tide.type === "Low" ? "bg-teal-50" : "bg-blue-50"
                                        }`}
                                >
                                    <div className={`text-3xl mb-2 ${tide.type === "Low" ? "text-teal-600" : "text-blue-600"}`}>
                                        {tide.type === "Low" ? "🌊" : "🌊🌊"}
                                    </div>
                                    <div className="font-bold text-gray-900">{tide.time}</div>
                                    <div className="text-sm text-gray-500">{tide.type} Tide</div>
                                    <div className="text-sm font-medium">{tide.height}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
                            <span className="text-green-700 font-bold">
                                🐚 Best Shelling Time Today: 11:00 AM - 1:00 PM (Low Tide)
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shelling Spots */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Best Shelling Spots</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {shellingSpots.map((spot) => (
                            <div
                                key={spot.name}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-900">{spot.name}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${qualityColors[spot.quality]}`}>
                                        {spot.quality}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-2">Best Finds:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {spot.bestFinds.map((shell) => (
                                            <span
                                                key={shell}
                                                className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full"
                                            >
                                                {shell}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    💡 {spot.tips}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shelling Tips */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Shelling Tips</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">🌙 When to Go</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>• Low tide is essential (1-2 hours before/after)</li>
                                <li>• Early morning = less competition</li>
                                <li>• After storms = best shell deposits</li>
                                <li>• New/full moon = more dramatic tides</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">🎒 What to Bring</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>• Mesh bag (lets sand drain)</li>
                                <li>• Water shoes (sharp shells!)</li>
                                <li>• Sunscreen and hat</li>
                                <li>• Shell identification guide</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
