// Experience Data Layer for Naples Vacation Planner

export type ExperienceCategory =
    | "yacht-cruise"
    | "fishing"
    | "kayak-tour"
    | "food-tour"
    | "spa"
    | "golf"
    | "photography"
    | "wildlife"
    | "private-dining"
    | "adventure";

export interface Experience {
    id: string;
    slug: string;
    title: string;
    category: ExperienceCategory;

    // Description
    description: string;
    highlights: string[];
    includes: string[];
    excludes?: string[];

    // Media
    featuredImage: string;
    gallery: string[];

    // Pricing
    pricePerPerson: number;
    pricePerGroup?: number;
    minGuests: number;
    maxGuests: number;

    // Duration
    durationHours: number;
    startTimes: string[];

    // Location
    meetingPoint: string;
    neighborhood: string;

    // Availability
    daysAvailable: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
    advanceBookingRequired: number; // days

    // Partner
    operatorName: string;
    operatorId: string;
    commission: number; // percentage

    // Trust
    rating: number;
    reviewCount: number;
    featured: boolean;

    publishedAt: string;
}

// Sample experiences
export const experiences: Experience[] = [
    {
        id: "1",
        slug: "private-sunset-yacht-cruise",
        title: "Private Sunset Yacht Cruise",
        category: "yacht-cruise",
        description: "Experience the magic of a Naples sunset aboard a private luxury yacht. Includes champagne, appetizers, and a professional captain.",
        highlights: [
            "2-hour private cruise",
            "Bottled champagne & hors d'oeuvres",
            "Dolphin sightings common",
            "Professional captain",
            "Up to 6 guests",
        ],
        includes: [
            "Private yacht",
            "Captain & crew",
            "Champagne",
            "Gourmet appetizers",
            "Soft drinks & water",
        ],
        excludes: [
            "Gratuity (suggested 20%)",
            "Additional alcohol",
        ],
        featuredImage: "/images/placeholders/naples_bay_resort_marina_4k.png",
        gallery: [
            "/images/placeholders/naples_pier_sunset_4k.jpg",
            "/images/placeholders/royal_harbor_canals_4k.png",
        ],
        pricePerPerson: 0,
        pricePerGroup: 850,
        minGuests: 2,
        maxGuests: 6,
        durationHours: 2,
        startTimes: ["17:00", "17:30"],
        meetingPoint: "Naples City Dock, 880 12th Ave S",
        neighborhood: "Downtown Naples",
        daysAvailable: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        advanceBookingRequired: 2,
        operatorName: "Pure Naples",
        operatorId: "pure-naples",
        commission: 15,
        rating: 4.9,
        reviewCount: 234,
        featured: true,
        publishedAt: "2026-01-10",
    },
    {
        id: "2",
        slug: "private-everglades-airboat-adventure",
        title: "Private Everglades Airboat Adventure",
        category: "adventure",
        description: "An exclusive private airboat tour through the Everglades with an expert captain. See alligators, exotic birds, and pristine wilderness.",
        highlights: [
            "Private 90-minute airboat ride",
            "Expert naturalist captain",
            "Guaranteed wildlife sightings",
            "Small group (max 4)",
            "Roundtrip Naples transportation",
        ],
        includes: [
            "Private airboat",
            "Expert guide",
            "Park fees",
            "Bottled water",
            "Transportation from Naples",
        ],
        featuredImage: "/images/placeholders/everglades_airboat_action_4k.jpg",
        gallery: [
            "/images/placeholders/ten_thousand_islands_4k.png",
        ],
        pricePerPerson: 195,
        minGuests: 2,
        maxGuests: 4,
        durationHours: 4,
        startTimes: ["08:00", "13:00"],
        meetingPoint: "Pickup from your Naples hotel",
        neighborhood: "Everglades",
        daysAvailable: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        advanceBookingRequired: 1,
        operatorName: "Everglades Excursions",
        operatorId: "everglades-excursions",
        commission: 12,
        rating: 4.8,
        reviewCount: 456,
        featured: true,
        publishedAt: "2026-01-10",
    },
    {
        id: "3",
        slug: "private-chef-beach-dinner",
        title: "Private Chef Beach Dinner",
        category: "private-dining",
        description: "A romantic candlelit dinner on the beach prepared by a private chef. Multi-course gourmet meal with wine pairings and personal service.",
        highlights: [
            "Private beachfront table setup",
            "5-course gourmet meal",
            "Wine pairings included",
            "Personal chef & server",
            "Custom menu available",
        ],
        includes: [
            "Private beach setup",
            "5-course dinner",
            "Premium wine pairings",
            "Personal chef",
            "Server",
            "All decor & lighting",
        ],
        featuredImage: "/images/itineraries/naples-romantic-dinner-table-sand.png",
        gallery: [
            "/images/placeholders/naples_romantic_dinner_sunset_4k.jpg",
        ],
        pricePerPerson: 0,
        pricePerGroup: 1500,
        minGuests: 2,
        maxGuests: 2,
        durationHours: 3,
        startTimes: ["18:30"],
        meetingPoint: "Private beach location (details provided)",
        neighborhood: "Vanderbilt Beach",
        daysAvailable: ["wed", "thu", "fri", "sat"],
        advanceBookingRequired: 7,
        operatorName: "Naples Private Chefs",
        operatorId: "naples-private-chefs",
        commission: 10,
        rating: 5.0,
        reviewCount: 89,
        featured: true,
        publishedAt: "2026-01-10",
    },
];

// Helper functions
export function getExperienceBySlug(slug: string): Experience | undefined {
    return experiences.find(e => e.slug === slug);
}

export function getExperiencesByCategory(category: ExperienceCategory): Experience[] {
    return experiences.filter(e => e.category === category);
}

export function getFeaturedExperiences(): Experience[] {
    return experiences.filter(e => e.featured);
}

export function calculatePrice(experience: Experience, guests: number): number {
    if (experience.pricePerGroup) {
        return experience.pricePerGroup;
    }
    return experience.pricePerPerson * guests;
}
