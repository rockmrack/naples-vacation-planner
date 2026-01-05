import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import type { HotelFrontmatter } from "@/src/lib/content-schema";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Hotels & Resorts in Naples, Florida – Complete Accommodation Guide",
    description:
        "60+ hotels, resorts, and accommodations in Naples, Marco Island, Bonita Springs, and Estero. From luxury beachfront resorts to budget-friendly options.",
    alternates: {
        canonical: `${site.url}/hotels`,
    },
};

// Category display info
const CATEGORY_INFO: Record<string, { label: string; color: string }> = {
    "luxury-resort": { label: "Luxury Resort", color: "bg-amber-500" },
    boutique: { label: "Boutique", color: "bg-purple-500" },
    "mid-range": { label: "Mid-Range", color: "bg-blue-500" },
    budget: { label: "Budget", color: "bg-green-500" },
    "extended-stay": { label: "Extended Stay", color: "bg-teal-500" },
    "vacation-rental": { label: "Vacation Rental", color: "bg-orange-500" },
    "golf-resort": { label: "Golf Resort", color: "bg-emerald-500" },
    "family-resort": { label: "Family Resort", color: "bg-pink-500" },
    waterfront: { label: "Waterfront", color: "bg-cyan-500" },
};

const PRICE_DISPLAY: Record<string, string> = {
    "$": "Budget",
    "$$": "Mid-Range",
    "$$$": "Upscale",
    "$$$$": "Luxury",
    "$$$$$": "Ultra-Luxury",
};

export default function HotelsPage() {
    let hotels: ReturnType<typeof getAllDocsByType> = [];

    try {
        hotels = getAllDocsByType("hotel");
    } catch {
        // No content yet
    }

    // Group hotels by category
    const groupedHotels = hotels.reduce(
        (acc, hotel) => {
            const fm = hotel.frontmatter as HotelFrontmatter;
            const category = fm.category;
            if (!acc[category]) acc[category] = [];
            acc[category].push(hotel);
            return acc;
        },
        {} as Record<string, typeof hotels>
    );

    // Define category order
    const categoryOrder = [
        "luxury-resort",
        "boutique",
        "family-resort",
        "golf-resort",
        "waterfront",
        "mid-range",
        "extended-stay",
        "budget",
        "vacation-rental",
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-palm-900 to-gray-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                <div className="absolute top-10 right-10 w-64 h-64 bg-palm-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container">
                    <Breadcrumbs
                        items={[{ label: "Hotels & Resorts" }]}
                        className="text-white/60 mb-8"
                    />

                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-palm-900/50 border border-palm-700 text-palm-300 text-xs font-bold uppercase tracking-wider">
                                {hotels.length} Properties
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Expert Curated
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                            Hotels & Resorts in
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-palm-300 to-teal-300">
                                Naples, Florida
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                            From iconic beachfront luxury to budget-friendly bases—find the perfect
                            place to stay in Naples, Marco Island, Bonita Springs, and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <div className="border-b border-gray-100 bg-white">
                <div className="section-container py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-palm-600">{hotels.length}</div>
                            <div className="text-sm text-gray-500">Total Properties</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-palm-600">
                                {groupedHotels["luxury-resort"]?.length || 0}
                            </div>
                            <div className="text-sm text-gray-500">Luxury Resorts</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-palm-600">
                                {hotels.filter((h) => (h.frontmatter as HotelFrontmatter).petFriendly).length}
                            </div>
                            <div className="text-sm text-gray-500">Pet-Friendly</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-palm-600">
                                {hotels.filter((h) => (h.frontmatter as HotelFrontmatter).beachAccess).length}
                            </div>
                            <div className="text-sm text-gray-500">Beach Access</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotels by Category */}
            <section className="section-container py-16 bg-gray-50">
                {categoryOrder.map((category) => {
                    const categoryHotels = groupedHotels[category];
                    if (!categoryHotels?.length) return null;

                    const info = CATEGORY_INFO[category] || { label: category, color: "bg-gray-500" };

                    return (
                        <div key={category} className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <span className={`px-3 py-1 rounded-full ${info.color} text-white text-sm font-bold`}>
                                    {info.label}
                                </span>
                                <span className="text-gray-400">({categoryHotels.length} properties)</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryHotels.map((hotel) => {
                                    const fm = hotel.frontmatter as HotelFrontmatter;
                                    return (
                                        <Link
                                            key={fm.slug}
                                            href={`/hotels/${fm.slug}`}
                                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                                        >
                                            <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                                <SafeImage
                                                    src={fm.featuredImage}
                                                    fallbackSrc="/images/placeholders/hotel.svg"
                                                    alt={fm.featuredImageAlt || fm.hotelName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 left-3 flex gap-2">
                                                    <span className={`px-2 py-0.5 rounded text-white text-xs font-bold ${info.color}`}>
                                                        {info.label}
                                                    </span>
                                                    {fm.beachAccess && (
                                                        <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-xs font-bold">
                                                            Beach
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="absolute top-3 right-3">
                                                    <span className="px-2 py-0.5 rounded bg-gray-900/70 text-white text-xs font-bold">
                                                        {fm.priceLevel}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-5">
                                                <h3 className="font-bold text-gray-900 group-hover:text-palm-600 transition-colors mb-1">
                                                    {fm.hotelName}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-3">{fm.area}</p>
                                                <p className="text-sm text-gray-600 line-clamp-2">{fm.description}</p>

                                                <div className="mt-4 flex items-center gap-3 text-xs">
                                                    {fm.petFriendly && (
                                                        <span className="flex items-center gap-1 text-green-600">
                                                            <span>🐾</span> Pet-Friendly
                                                        </span>
                                                    )}
                                                    <span className="text-gray-400">
                                                        {PRICE_DISPLAY[fm.priceLevel] || fm.priceLevel}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* CTA */}
            <section className="section-container py-16">
                <div className="bg-gradient-to-br from-palm-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Not Sure Where to Stay?</h2>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                        Check out our neighborhood guides to find the perfect area based on your travel style.
                    </p>
                    <Link
                        href="/where-to-stay"
                        className="inline-block px-8 py-4 rounded-xl bg-white text-palm-700 font-bold hover:bg-gray-100 transition-colors"
                    >
                        Explore Neighborhoods
                    </Link>
                </div>
            </section>
        </>
    );
}
