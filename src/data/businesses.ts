// Business Listing Schema for Naples Vacation Planner

export type BusinessCategory =
    | "restaurant"
    | "hotel"
    | "tour-operator"
    | "spa"
    | "shopping"
    | "attraction"
    | "service"
    | "rental"
    | "wedding-vendor"
    | "real-estate";

export type ListingTier = "free" | "enhanced" | "premium" | "sponsored";

export interface BusinessListing {
    id: string;
    slug: string;
    name: string;
    category: BusinessCategory;
    tier: ListingTier;

    // Basic Info
    description: string;
    shortDescription: string;
    address: string;
    neighborhood: string;
    phone?: string;
    email?: string;
    website?: string;

    // Media
    featuredImage: string;
    gallery?: string[];
    logoUrl?: string;

    // Details
    priceRange?: "$" | "$$" | "$$$" | "$$$$" | "$$$$$";
    hours?: Record<string, string>;
    amenities?: string[];
    specialties?: string[];

    // Trust & Verification
    isVerified: boolean;
    verifiedDate?: string;
    yearEstablished?: number;
    licenses?: string[];

    // Reviews
    rating?: number;
    reviewCount?: number;

    // Social
    instagram?: string;
    facebook?: string;

    // Booking
    bookingUrl?: string;
    reservationRequired?: boolean;

    // Metadata
    featured?: boolean;
    publishedAt: string;
    updatedAt: string;
}

// Pricing for Business Listings
export const LISTING_PRICING = {
    free: {
        price: 0,
        features: [
            "Basic listing",
            "Name, address, website",
            "Category placement",
        ],
    },
    enhanced: {
        price: 99, // per month
        features: [
            "Everything in Free",
            "Verified badge",
            "Photo gallery (up to 10)",
            "Priority placement",
            "Monthly analytics",
        ],
    },
    premium: {
        price: 299, // per month
        features: [
            "Everything in Enhanced",
            "Featured placement",
            "Custom description",
            "Direct booking link",
            "Social media links",
            "Weekly analytics",
        ],
    },
    sponsored: {
        price: 500, // per feature
        features: [
            "Dedicated article/review",
            "Homepage feature",
            "Newsletter inclusion",
            "Social media promotion",
        ],
    },
};

// Sample business listings
export const sampleBusinesses: BusinessListing[] = [
    {
        id: "1",
        slug: "pure-naples-yachts",
        name: "Pure Naples Yacht Charters",
        category: "tour-operator",
        tier: "premium",
        description: "Luxury yacht charters for sunset cruises, fishing trips, and private events on Naples Bay.",
        shortDescription: "Premier yacht charter service",
        address: "1200 5th Ave S, Naples, FL 34102",
        neighborhood: "Downtown Naples",
        phone: "(239) 555-0100",
        website: "https://purenaples.com",
        featuredImage: "/images/placeholders/naples_bay_resort_marina_4k.png",
        priceRange: "$$$$$",
        isVerified: true,
        verifiedDate: "2026-01-10",
        rating: 4.9,
        reviewCount: 234,
        featured: true,
        publishedAt: "2026-01-10",
        updatedAt: "2026-01-10",
    },
    {
        id: "2",
        slug: "naples-grande-spa",
        name: "The Spa at Naples Grande",
        category: "spa",
        tier: "enhanced",
        description: "World-class spa offering massage, facials, and wellness treatments in a serene resort setting.",
        shortDescription: "Award-winning resort spa",
        address: "475 Seagate Dr, Naples, FL 34103",
        neighborhood: "North Naples",
        phone: "(239) 555-0200",
        website: "https://naplesgrande.com/spa",
        featuredImage: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        priceRange: "$$$$",
        isVerified: true,
        rating: 4.8,
        reviewCount: 567,
        publishedAt: "2026-01-10",
        updatedAt: "2026-01-10",
    },
];

// Helper functions
export function getBusinessesByCategory(category: BusinessCategory): BusinessListing[] {
    return sampleBusinesses.filter(b => b.category === category);
}

export function getFeaturedBusinesses(): BusinessListing[] {
    return sampleBusinesses.filter(b => b.featured);
}

export function getVerifiedBusinesses(): BusinessListing[] {
    return sampleBusinesses.filter(b => b.isVerified);
}
