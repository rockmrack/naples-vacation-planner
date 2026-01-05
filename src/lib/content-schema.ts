import { z } from "zod";

// Content type enum
export const ContentTypeEnum = z.enum([
    "itinerary",
    "where-to-stay",
    "day-trip",
    "travel-tip",
    "map",
    "hotel",
    "restaurant",
    "event",
]);

export type ContentType = z.infer<typeof ContentTypeEnum>;

// Content status enum
export const ContentStatusEnum = z.enum(["draft", "published"]);

export type ContentStatus = z.infer<typeof ContentStatusEnum>;

// Base frontmatter schema - shared by all content types
export const BaseFrontmatterSchema = z.object({
    title: z.string().min(10, "Title must be at least 10 characters"),
    description: z
        .string()
        .min(50, "Description must be at least 50 characters")
        .max(180, "Description must not exceed 180 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    type: ContentTypeEnum,
    status: ContentStatusEnum,
    publishedAt: z.string(), // ISO date string
    updatedAt: z.string(), // ISO date string
    author: z.string().min(2).default("Naples Vacation Planner"),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().min(1, "Featured image is required"),
    featuredImageAlt: z.string().optional(),
    videoUrl: z.string().url().optional(), // YouTube or Vimeo URL
    canonicalUrl: z.string().url().optional(),
});

// Itinerary-specific schema
export const ItineraryFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("itinerary"),
    days: z.number().int().min(1).max(14),
    pace: z.enum(["relaxed", "balanced", "fast"]),
    audience: z.enum(["couples", "families", "luxury", "nature", "all"]),
    bookAhead: z.array(z.string()).default([]),
    mapEmbedUrl: z.string().url().optional(),
    locations: z.array(z.object({
        title: z.string(),
        description: z.string().optional(),
        lat: z.number(),
        lng: z.number()
    })).optional(),
});

export type ItineraryFrontmatter = z.infer<typeof ItineraryFrontmatterSchema>;

// Where to Stay schema
export const WhereToStayFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("where-to-stay"),
    areaName: z.string().min(3),
    bestFor: z.array(z.string()).default([]),
    avoidIf: z.array(z.string()).default([]),
    nearbyHighlights: z.array(z.string()).default([]),
    priceRange: z.enum(["budget", "mid-range", "luxury", "ultra-luxury"]).optional(),
});

export type WhereToStayFrontmatter = z.infer<typeof WhereToStayFrontmatterSchema>;

// Day Trip schema
export const DayTripFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("day-trip"),
    driveTimeFromNaples: z.string().min(2),
    bestSeason: z.string().min(2),
    mustBook: z.array(z.string()).default([]),
    difficulty: z.enum(["easy", "moderate", "challenging"]).optional(),
});

export type DayTripFrontmatter = z.infer<typeof DayTripFrontmatterSchema>;

// Travel Tip schema
export const TravelTipFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("travel-tip"),
    category: z.enum(["planning", "logistics", "seasonal", "budget", "activities", "dining"]).optional(),
});

export type TravelTipFrontmatter = z.infer<typeof TravelTipFrontmatterSchema>;

// Map schema
export const MapFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("map"),
    downloadUrl: z.string().url().optional(),
    mapEmbedUrl: z.string().url().optional(),
    mapType: z.enum(["interactive", "printable", "google-my-maps"]).optional(),
});

export type MapFrontmatter = z.infer<typeof MapFrontmatterSchema>;

// Hotel schema
export const HotelFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("hotel"),
    hotelName: z.string().min(3),
    category: z.enum(["luxury-resort", "boutique", "mid-range", "budget", "extended-stay", "vacation-rental", "golf-resort", "family-resort", "waterfront"]),
    area: z.string().min(3), // e.g., "Old Naples", "Marco Island", "Bonita Springs"
    amenities: z.array(z.string()).default([]),
    priceLevel: z.enum(["$", "$$", "$$$", "$$$$", "$$$$$"]),
    bookingUrl: z.string().url().optional(),
    petFriendly: z.boolean().optional(),
    beachAccess: z.boolean().optional(),
});

export type HotelFrontmatter = z.infer<typeof HotelFrontmatterSchema>;

// Restaurant schema
export const RestaurantFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("restaurant"),
    restaurantName: z.string().min(3),
    cuisine: z.enum([
        "seafood", "italian", "american", "steakhouse",
        "asian", "mexican", "french", "mediterranean",
        "breakfast-brunch", "casual", "fine-dining"
    ]),
    priceLevel: z.enum(["$", "$$", "$$$", "$$$$"]),
    neighborhood: z.string().min(3),
    address: z.string().min(10),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    reservationUrl: z.string().url().optional(),
    hours: z.string().optional(),
    bestFor: z.array(z.string()).default([]),
    signatureDishes: z.array(z.string()).default([]),
    awards: z.array(z.string()).default([]),
    waterfront: z.boolean().optional(),
    outdoorSeating: z.boolean().optional(),
});

export type RestaurantFrontmatter = z.infer<typeof RestaurantFrontmatterSchema>;

// Event schema
export const EventFrontmatterSchema = BaseFrontmatterSchema.extend({
    type: z.literal("event"),
    eventName: z.string().min(3),
    category: z.enum([
        "art-show", "festival", "farmers-market", "music",
        "food-drink", "sports", "holiday", "film", "community"
    ]),
    startDate: z.string(), // ISO date
    endDate: z.string().optional(), // ISO date for multi-day events
    isRecurring: z.boolean().optional(),
    recurringSchedule: z.string().optional(), // e.g., "Every Saturday"
    venue: z.string().min(3),
    address: z.string().min(10),
    neighborhood: z.string().optional(),
    price: z.string().optional(), // e.g., "Free", "$10", "$25-50"
    website: z.string().url().optional(),
    ticketUrl: z.string().url().optional(),
    isFree: z.boolean().optional(),
});

export type EventFrontmatter = z.infer<typeof EventFrontmatterSchema>;

// Discriminated union of all content types
export const FrontmatterSchema = z.discriminatedUnion("type", [
    ItineraryFrontmatterSchema,
    WhereToStayFrontmatterSchema,
    DayTripFrontmatterSchema,
    TravelTipFrontmatterSchema,
    MapFrontmatterSchema,
    HotelFrontmatterSchema,
    RestaurantFrontmatterSchema,
    EventFrontmatterSchema,
]);

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

// Helper type guards
export function isItinerary(fm: Frontmatter): fm is ItineraryFrontmatter {
    return fm.type === "itinerary";
}

export function isWhereToStay(fm: Frontmatter): fm is WhereToStayFrontmatter {
    return fm.type === "where-to-stay";
}

export function isDayTrip(fm: Frontmatter): fm is DayTripFrontmatter {
    return fm.type === "day-trip";
}

export function isTravelTip(fm: Frontmatter): fm is TravelTipFrontmatter {
    return fm.type === "travel-tip";
}

export function isMap(fm: Frontmatter): fm is MapFrontmatter {
    return fm.type === "map";
}

export function isHotel(fm: Frontmatter): fm is HotelFrontmatter {
    return fm.type === "hotel";
}

export function isRestaurant(fm: Frontmatter): fm is RestaurantFrontmatter {
    return fm.type === "restaurant";
}

export function isEvent(fm: Frontmatter): fm is EventFrontmatter {
    return fm.type === "event";
}
