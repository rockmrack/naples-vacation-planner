"use client";

import { useState } from "react";
import { SafeImage } from "@/src/components/SafeImage";

interface GolfCourse {
    id: string;
    name: string;
    type: "Public" | "Resort" | "Semi-Private";
    priceRange: string;
    holes: number;
    rating: number;
    neighborhood: string;
    image: string;
    bookingUrl: string;
    features: string[];
}

const golfCourses: GolfCourse[] = [
    {
        id: "1",
        name: "Tiburón Golf Club",
        type: "Resort",
        priceRange: "$150-350",
        holes: 36,
        rating: 4.8,
        neighborhood: "North Naples",
        image: "/images/placeholders/grey_oaks_golf_estate_4k.png",
        bookingUrl: "https://www.golfnow.com/tee-times/facility/1234-tiburon-golf-club",
        features: ["PGA Tour Host", "Two 18-Hole Courses", "Ritz-Carlton Resort"],
    },
    {
        id: "2",
        name: "Naples Grande Golf Club",
        type: "Resort",
        priceRange: "$100-200",
        holes: 18,
        rating: 4.6,
        neighborhood: "North Naples",
        image: "/images/placeholders/naples_bay_resort_marina_4k.png",
        bookingUrl: "https://www.golfnow.com/tee-times/facility/1235-naples-grande",
        features: ["Rees Jones Design", "Practice Facility", "Resort Guests Welcome"],
    },
    {
        id: "3",
        name: "Lely Resort Golf & Country Club",
        type: "Semi-Private",
        priceRange: "$75-175",
        holes: 36,
        rating: 4.5,
        neighborhood: "East Naples",
        image: "/images/placeholders/fiddlers_creek_resort_pool_4k.png",
        bookingUrl: "https://www.golfnow.com/tee-times/facility/1236-lely-resort",
        features: ["Two Championship Courses", "Public Welcome", "Great Value"],
    },
    {
        id: "4",
        name: "Naples Beach Hotel & Golf Club",
        type: "Resort",
        priceRange: "$100-175",
        holes: 18,
        rating: 4.4,
        neighborhood: "Downtown Naples",
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
        bookingUrl: "https://www.golfnow.com/tee-times/facility/1237-naples-beach",
        features: ["Beachside Location", "Historic Course", "Walking Friendly"],
    },
];

export function GolfTeeTimeWidget() {
    const [date, setDate] = useState("");
    const [players, setPlayers] = useState(4);
    const [courseType, setCourseType] = useState<string>("all");

    const filteredCourses = courseType === "all"
        ? golfCourses
        : golfCourses.filter(c => c.type === courseType);

    const today = new Date().toISOString().split("T")[0];

    return (
        <section className="my-12">
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-8 text-white mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-green-300 mb-2 block">
                    ⛳ Golf Capital of the World
                </span>
                <h2 className="text-3xl font-bold mb-4">Book Tee Times in Naples</h2>
                <p className="text-green-100 mb-6">
                    Naples has 90+ golf courses. Book online and save up to 50% on green fees.
                </p>

                {/* Search Filters */}
                <div className="grid md:grid-cols-4 gap-4 bg-white/10 backdrop-blur rounded-2xl p-4">
                    <div>
                        <label className="block text-xs font-medium text-green-200 mb-1">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={today}
                            className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-green-200 mb-1">Players</label>
                        <select
                            value={players}
                            onChange={(e) => setPlayers(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg"
                        >
                            {[1, 2, 3, 4].map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? "Player" : "Players"}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-green-200 mb-1">Course Type</label>
                        <select
                            value={courseType}
                            onChange={(e) => setCourseType(e.target.value)}
                            className="w-full px-3 py-2 bg-white text-gray-900 rounded-lg"
                        >
                            <option value="all">All Courses</option>
                            <option value="Public">Public</option>
                            <option value="Resort">Resort</option>
                            <option value="Semi-Private">Semi-Private</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <a
                            href={`https://www.golfnow.com/naples-florida/tee-times?date=${date}&players=${players}`}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 transition-colors text-center"
                        >
                            Search All Courses →
                        </a>
                    </div>
                </div>
            </div>

            {/* Featured Courses */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="relative h-48">
                            <SafeImage
                                src={course.image}
                                alt={course.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                {course.type}
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                                {course.priceRange}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                                <div className="flex items-center gap-1 text-sm">
                                    <span className="text-amber-400">★</span>
                                    <span className="font-medium">{course.rating}</span>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm mb-3">
                                {course.neighborhood} • {course.holes} Holes
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {course.features.map((f) => (
                                    <span key={f} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                                        {f}
                                    </span>
                                ))}
                            </div>
                            <a
                                href={course.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer sponsored"
                                className="block w-full py-3 px-4 bg-green-600 text-white text-center font-bold rounded-xl hover:bg-green-700 transition-colors"
                            >
                                Book Tee Time →
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                Powered by GolfNow. Book online and save up to 50% on green fees.
            </p>
        </section>
    );
}

export function GolfInlineCta() {
    return (
        <a
            href="https://www.golfnow.com/naples-florida/tee-times"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100 hover:border-green-300 transition-colors my-4"
        >
            <span className="text-3xl">⛳</span>
            <div className="flex-1">
                <div className="text-xs text-green-600 font-medium mb-1">90+ COURSES</div>
                <h4 className="font-semibold text-gray-900">Book Naples Tee Times</h4>
                <p className="text-sm text-gray-500">Save up to 50% booking online</p>
            </div>
            <div className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg text-sm">
                Book →
            </div>
        </a>
    );
}
