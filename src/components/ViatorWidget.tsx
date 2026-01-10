"use client";

import { useState } from "react";
import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";

interface ViatorTour {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    duration: string;
    rating: number;
    reviewCount: number;
    image: string;
    affiliateUrl: string;
}

// Sample Naples tours - replace with real Viator API data
const sampleTours: ViatorTour[] = [
    {
        id: "1",
        title: "Everglades Airboat Adventure from Naples",
        description: "Experience the thrill of an airboat ride through the Florida Everglades with expert guides.",
        price: 89,
        currency: "USD",
        duration: "4 hours",
        rating: 4.8,
        reviewCount: 2341,
        image: "/images/placeholders/everglades_airboat_action_4k.jpg",
        affiliateUrl: "https://www.viator.com/tours/Naples/Everglades-Airboat?pid=P00001",
    },
    {
        id: "2",
        title: "Naples Sunset Dolphin Cruise",
        description: "Watch dolphins play as the sun sets over the Gulf of Mexico on this relaxing cruise.",
        price: 65,
        currency: "USD",
        duration: "2 hours",
        rating: 4.9,
        reviewCount: 1856,
        image: "/images/itineraries/naples-manatee-surfacing.png",
        affiliateUrl: "https://www.viator.com/tours/Naples/Dolphin-Cruise?pid=P00001",
    },
    {
        id: "3",
        title: "Private Naples Food Tour",
        description: "Taste the best of Naples cuisine with a local expert guide on 5th Avenue and 3rd Street.",
        price: 125,
        currency: "USD",
        duration: "3 hours",
        rating: 4.9,
        reviewCount: 892,
        image: "/images/itineraries/naples-food-tour-group-tasting.png",
        affiliateUrl: "https://www.viator.com/tours/Naples/Food-Tour?pid=P00001",
    },
    {
        id: "4",
        title: "Ten Thousand Islands Kayak Tour",
        description: "Paddle through pristine mangrove tunnels and spot wildlife in this ecological adventure.",
        price: 79,
        currency: "USD",
        duration: "3 hours",
        rating: 4.7,
        reviewCount: 634,
        image: "/images/itineraries/naples-kayaking-mangrove-tunnels.png",
        affiliateUrl: "https://www.viator.com/tours/Naples/Kayak-Tour?pid=P00001",
    },
];

interface ViatorWidgetProps {
    location?: string;
    category?: string;
    maxTours?: number;
    title?: string;
}

export function ViatorWidget({
    location = "Naples",
    category,
    maxTours = 4,
    title = "Book Popular Experiences"
}: ViatorWidgetProps) {
    const [hoveredTour, setHoveredTour] = useState<string | null>(null);

    const displayTours = sampleTours.slice(0, maxTours);

    return (
        <section className="my-12 bg-gradient-to-br from-ocean-50 to-teal-50 rounded-3xl p-8 border border-ocean-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 mb-2 block">
                        Powered by Viator
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                </div>
                <a
                    href={`https://www.viator.com/Naples/d23073-ttd?pid=P00001`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                >
                    View All Tours →
                </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayTours.map((tour) => (
                    <a
                        key={tour.id}
                        href={tour.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                        onMouseEnter={() => setHoveredTour(tour.id)}
                        onMouseLeave={() => setHoveredTour(null)}
                    >
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <SafeImage
                                src={tour.image}
                                alt={tour.title}
                                fill
                                className={`object-cover transition-transform duration-500 ${hoveredTour === tour.id ? "scale-110" : "scale-100"
                                    }`}
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-bold text-gray-900">
                                ${tour.price}
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-ocean-600 transition-colors">
                                {tour.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                    <span className="text-amber-400">★</span>
                                    {tour.rating}
                                </span>
                                <span>({tour.reviewCount.toLocaleString()})</span>
                                <span>•</span>
                                <span>{tour.duration}</span>
                            </div>
                            <div className="inline-flex items-center gap-1 text-ocean-600 font-medium text-sm group-hover:gap-2 transition-all">
                                Book Now
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                We may earn a commission when you book through these links at no extra cost to you.
            </p>
        </section>
    );
}

export function ViatorInlineCard({ tour }: { tour: ViatorTour }) {
    return (
        <a
            href={tour.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-ocean-50 rounded-xl border border-ocean-100 hover:border-ocean-300 transition-colors my-4"
        >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <SafeImage
                    src={tour.image}
                    alt={tour.title}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-1">
                <div className="text-xs text-ocean-600 font-medium mb-1">BOOK THIS EXPERIENCE</div>
                <h4 className="font-semibold text-gray-900">{tour.title}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        {tour.rating}
                    </span>
                    <span>•</span>
                    <span>From ${tour.price}</span>
                </div>
            </div>
            <div className="px-4 py-2 bg-ocean-600 text-white font-bold rounded-lg text-sm">
                Book →
            </div>
        </a>
    );
}
