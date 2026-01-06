import { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Naples Neighborhoods Guide: Where to Stay & Explore",
    description: "Discover Naples Florida's distinct neighborhoods. From historic Old Naples to luxurious Pelican Bay, find the perfect area for your vacation.",
};

const neighborhoods = [
    {
        slug: "old-naples",
        name: "Old Naples / Downtown",
        tagline: "Historic charm meets modern luxury",
        description: "The heart of Naples with Fifth Avenue South, Third Street South, and the iconic Naples Pier. Walk to world-class restaurants, boutique shopping, and beautiful beach access.",
        highlights: ["Fifth Avenue Shopping", "Naples Pier", "Historic Properties", "Best Restaurants"],
        vibe: "Upscale, walkable, lively",
        priceRange: "$$$-$$$$",
        bestFor: ["Couples", "First-timers", "Foodies", "Shoppers"],
        image: "/images/neighborhoods/old-naples.jpg",
    },
    {
        slug: "pelican-bay",
        name: "Pelican Bay",
        tagline: "Exclusive resort-style living",
        description: "A gated community featuring two private beaches accessible by tram, upscale condos, and Waterside Shops. Perfect for those seeking privacy and luxury amenities.",
        highlights: ["Private Beaches", "Waterside Shops", "Golf Courses", "Tram Service"],
        vibe: "Exclusive, peaceful, resort-like",
        priceRange: "$$$$",
        bestFor: ["Luxury seekers", "Golf lovers", "Families"],
        image: "/images/neighborhoods/pelican-bay.jpg",
    },
    {
        slug: "vanderbilt-beach",
        name: "Vanderbilt Beach",
        tagline: "Family-friendly beach paradise",
        description: "Popular beach area with the Ritz-Carlton and LaPlaya Beach resorts. Great for families with calmer waters and plenty of amenities. Easy access to Delnor-Wiggins State Park.",
        highlights: ["Ritz-Carlton", "State Park Access", "Family Beaches", "Water Sports"],
        vibe: "Resort, family-oriented, active",
        priceRange: "$$$-$$$$",
        bestFor: ["Families", "Beach lovers", "Resort guests"],
        image: "/images/neighborhoods/vanderbilt-beach.jpg",
    },
    {
        slug: "park-shore",
        name: "Park Shore",
        tagline: "Waterfront luxury with beach access",
        description: "Upscale residential area between Venetian Bay and the Gulf. Home to high-rise condos with stunning views, Venetian Village shopping, and beautiful waterfront dining.",
        highlights: ["Venetian Village", "Bay Views", "Sunset Walks", "High-Rise Living"],
        vibe: "Sophisticated, scenic, residential",
        priceRange: "$$$-$$$$",
        bestFor: ["Couples", "Sunset lovers", "Long-term stays"],
        image: "/images/neighborhoods/park-shore.jpg",
    },
    {
        slug: "north-naples",
        name: "North Naples",
        tagline: "Value with suburban comfort",
        description: "More affordable area with easy access to beaches and attractions. Home to Mercato shopping center, great restaurants, and newer developments. Best value for families.",
        highlights: ["Mercato Shopping", "Better Value", "Newer Developments", "Easy Access"],
        vibe: "Suburban, convenient, value-oriented",
        priceRange: "$$-$$$",
        bestFor: ["Families", "Budget-conscious", "Extended stays"],
        image: "/images/neighborhoods/north-naples.jpg",
    },
    {
        slug: "port-royal",
        name: "Port Royal",
        tagline: "Naples' most exclusive enclave",
        description: "Ultra-luxury waterfront community with multi-million dollar estates. Private beach club, yacht basin, and the most exclusive real estate in Southwest Florida.",
        highlights: ["Private Beach Club", "Yacht Basin", "Celebrity Homes", "Ultimate Privacy"],
        vibe: "Ultra-exclusive, private, prestigious",
        priceRange: "$$$$$",
        bestFor: ["Ultra-luxury seekers", "Privacy lovers"],
        image: "/images/neighborhoods/port-royal.jpg",
    },
];

export default function NeighborhoodsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-24 bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900 text-white overflow-hidden">
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-semibold mb-6">
                        Area Guide
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Naples Neighborhoods
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        From historic downtown to exclusive waterfront enclaves, find your perfect Naples home base
                    </p>
                </div>
            </section>

            {/* Neighborhoods Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {neighborhoods.map((n) => (
                            <Link
                                key={n.slug}
                                href={`/neighborhoods/${n.slug}`}
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="aspect-video relative overflow-hidden">
                                    <SafeImage
                                        src={n.image}
                                        fallbackSrc="/images/placeholders/neighborhood.svg"
                                        alt={n.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-white text-sm font-medium">
                                        {n.priceRange}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {n.name}
                                    </h3>
                                    <p className="text-blue-600 text-sm font-medium mb-3">{n.tagline}</p>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{n.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {n.bestFor.slice(0, 3).map((tag) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Comparison */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Quick Neighborhood Comparison
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-700">Neighborhood</th>
                                    <th className="text-center p-4 font-semibold text-gray-700">Vibe</th>
                                    <th className="text-center p-4 font-semibold text-gray-700">Price</th>
                                    <th className="text-center p-4 font-semibold text-gray-700">Best For</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neighborhoods.map((n, i) => (
                                    <tr key={n.slug} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="p-4">
                                            <Link href={`/neighborhoods/${n.slug}`} className="font-medium text-blue-600 hover:underline">
                                                {n.name}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-center text-gray-600 text-sm">{n.vibe}</td>
                                        <td className="p-4 text-center text-gray-900 font-medium">{n.priceRange}</td>
                                        <td className="p-4 text-center text-gray-600 text-sm">{n.bestFor.join(", ")}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Need Help Choosing?</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Take our quick quiz to find the perfect Naples neighborhood for your trip
                    </p>
                    <Link
                        href="/plan"
                        className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        Start Trip Planner Quiz
                    </Link>
                </div>
            </section>
        </>
    );
}
