import { site } from "@/src/config/site";
import { getAllDocsByType } from "@/src/lib/content";

export default function sitemap() {
    const now = new Date();

    // Static pages
    const staticUrls = [
        "",
        "/itineraries",
        "/where-to-stay",
        "/day-trips",
        "/travel-tips",
        "/maps",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
        "/affiliate-disclosure",
    ].map((path) => ({
        url: `${site.url}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly" as const,
        priority: path === "" ? 1.0 : path.includes("/") ? 0.6 : 0.8,
    }));

    // Dynamic content pages
    let itineraries: ReturnType<typeof getAllDocsByType> = [];
    let whereToStay: ReturnType<typeof getAllDocsByType> = [];
    let dayTrips: ReturnType<typeof getAllDocsByType> = [];
    let tips: ReturnType<typeof getAllDocsByType> = [];
    let maps: ReturnType<typeof getAllDocsByType> = [];

    try {
        itineraries = getAllDocsByType("itinerary");
    } catch {
        // No content
    }

    try {
        whereToStay = getAllDocsByType("where-to-stay");
    } catch {
        // No content
    }

    try {
        dayTrips = getAllDocsByType("day-trip");
    } catch {
        // No content
    }

    try {
        tips = getAllDocsByType("travel-tip");
    } catch {
        // No content
    }

    try {
        maps = getAllDocsByType("map");
    } catch {
        // No content
    }

    const itineraryUrls = itineraries.map((d) => ({
        url: `${site.url}/itineraries/${d.frontmatter.slug}`,
        lastModified: new Date(d.frontmatter.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    const whereToStayUrls = whereToStay.map((d) => ({
        url: `${site.url}/where-to-stay/${d.frontmatter.slug}`,
        lastModified: new Date(d.frontmatter.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const dayTripUrls = dayTrips.map((d) => ({
        url: `${site.url}/day-trips/${d.frontmatter.slug}`,
        lastModified: new Date(d.frontmatter.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const tipUrls = tips.map((d) => ({
        url: `${site.url}/travel-tips/${d.frontmatter.slug}`,
        lastModified: new Date(d.frontmatter.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const mapUrls = maps.map((d) => ({
        url: `${site.url}/maps/${d.frontmatter.slug}`,
        lastModified: new Date(d.frontmatter.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [
        ...staticUrls,
        ...itineraryUrls,
        ...whereToStayUrls,
        ...dayTripUrls,
        ...tipUrls,
        ...mapUrls,
    ];
}
