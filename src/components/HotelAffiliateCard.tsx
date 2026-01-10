"use client";

import { SafeImage } from "@/src/components/SafeImage";

interface Hotel {
    id: string;
    name: string;
    neighborhood: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
    image: string;
    highlights: string[];
    bookingUrl: string;
}

const featuredHotels: Hotel[] = [
    {
        id: "1",
        name: "The Ritz-Carlton, Naples",
        neighborhood: "Vanderbilt Beach",
        priceRange: "$$$$$",
        rating: 4.9,
        reviewCount: 3456,
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        highlights: ["Beachfront", "Forbes 5-Star Spa", "Fine Dining"],
        bookingUrl: "https://www.booking.com/hotel/us/the-ritz-carlton-naples.html?aid=YOUR_AFFILIATE_ID",
    },
    {
        id: "2",
        name: "Naples Grande Beach Resort",
        neighborhood: "North Naples",
        priceRange: "$$$$",
        rating: 4.7,
        reviewCount: 2890,
        image: "/images/placeholders/naples_bay_resort_marina_4k.png",
        highlights: ["Golf Course", "Multiple Pools", "On-Site Spa"],
        bookingUrl: "https://www.booking.com/hotel/us/naples-grande-beach-resort.html?aid=YOUR_AFFILIATE_ID",
    },
    {
        id: "3",
        name: "Inn on Fifth",
        neighborhood: "Downtown Naples",
        priceRange: "$$$",
        rating: 4.8,
        reviewCount: 1567,
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
        highlights: ["5th Avenue Location", "Rooftop Pool", "Walking Distance"],
        bookingUrl: "https://www.booking.com/hotel/us/inn-on-fifth.html?aid=YOUR_AFFILIATE_ID",
    },
    {
        id: "4",
        name: "LaPlaya Beach & Golf Resort",
        neighborhood: "Vanderbilt Beach",
        priceRange: "$$$$",
        rating: 4.6,
        reviewCount: 2134,
        image: "/images/placeholders/pelican_bay_tram_beach_4k.png",
        highlights: ["Private Beach", "Championship Golf", "Balinese Spa"],
        bookingUrl: "https://www.booking.com/hotel/us/laplaya-beach-golf-resort.html?aid=YOUR_AFFILIATE_ID",
    },
];

interface HotelAffiliateGridProps {
    title?: string;
    maxHotels?: number;
    neighborhood?: string;
}

export function HotelAffiliateGrid({
    title = "Where to Stay in Naples",
    maxHotels = 4,
    neighborhood
}: HotelAffiliateGridProps) {
    let hotels = featuredHotels;
    if (neighborhood) {
        hotels = hotels.filter(h => h.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()));
    }
    hotels = hotels.slice(0, maxHotels);

    return (
        <section className="my-12">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">
                        Compare Prices on Booking.com
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                </div>
                <a
                    href="https://www.booking.com/city/us/naples-fl.html?aid=YOUR_AFFILIATE_ID"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-sm text-ocean-600 hover:text-ocean-700 font-medium"
                >
                    View All Hotels →
                </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hotels.map((hotel) => (
                    <a
                        key={hotel.id}
                        href={hotel.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <SafeImage
                                src={hotel.image}
                                alt={hotel.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-bold text-gray-900">
                                {hotel.priceRange}
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="text-xs text-ocean-600 font-medium mb-1">{hotel.neighborhood}</div>
                            <h4 className="font-semibold text-gray-900 line-clamp-1 mb-2 group-hover:text-ocean-600 transition-colors">
                                {hotel.name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                <span className="flex items-center gap-1">
                                    <span className="text-amber-400">★</span>
                                    {hotel.rating}
                                </span>
                                <span>({hotel.reviewCount.toLocaleString()} reviews)</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {hotel.highlights.slice(0, 2).map((h) => (
                                    <span key={h} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        {h}
                                    </span>
                                ))}
                            </div>
                            <div className="inline-flex items-center gap-1 text-ocean-600 font-medium text-sm">
                                Check Availability →
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                Prices shown are approximate. We earn a commission when you book through these links.
            </p>
        </section>
    );
}

export function HotelInlineCard({ hotel }: { hotel: Hotel }) {
    return (
        <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100 hover:border-amber-300 transition-colors my-4"
        >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <SafeImage
                    src={hotel.image}
                    alt={hotel.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex-1">
                <div className="text-xs text-amber-700 font-medium mb-1">RECOMMENDED HOTEL</div>
                <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        {hotel.rating}
                    </span>
                    <span>•</span>
                    <span>{hotel.priceRange}</span>
                </div>
            </div>
            <div className="px-4 py-2 bg-amber-600 text-white font-bold rounded-lg text-sm">
                Check Rates →
            </div>
        </a>
    );
}
