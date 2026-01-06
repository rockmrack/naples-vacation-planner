import { MetadataRoute } from "next";
import { getAllDocsByType } from "@/src/lib/content";
import { site } from "@/src/config/site";
import { ContentType } from "@/src/lib/content-schema";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = site.url;
    const lastModified = new Date();

    // Static pages with priority differentiation
    const routes = [
        { route: "", priority: 1, changeFrequency: "daily" as const },
        { route: "/itineraries", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/where-to-stay", priority: 0.9, changeFrequency: "weekly" as const },
        { route: "/hotels", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/restaurants", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/events", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/day-trips", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/travel-tips", priority: 0.8, changeFrequency: "weekly" as const },
        { route: "/plan", priority: 0.7, changeFrequency: "monthly" as const },
        { route: "/about", priority: 0.6, changeFrequency: "monthly" as const },
        { route: "/authors", priority: 0.5, changeFrequency: "monthly" as const },
        { route: "/editorial-standards", priority: 0.4, changeFrequency: "monthly" as const },
        { route: "/reviews", priority: 0.5, changeFrequency: "weekly" as const },
        { route: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
        { route: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    ].map(({ route, priority, changeFrequency }) => ({
        url: `${baseUrl}${route}`,
        lastModified: lastModified,
        changeFrequency,
        priority,
    }));

    // All dynamic content types with proper routing
    const contentTypeConfig: { type: ContentType; routeBase: string; priority: number }[] = [
        { type: "itinerary", routeBase: "itineraries", priority: 0.9 },
        { type: "where-to-stay", routeBase: "where-to-stay", priority: 0.8 },
        { type: "hotel", routeBase: "hotels", priority: 0.8 },
        { type: "restaurant", routeBase: "restaurants", priority: 0.7 },
        { type: "event", routeBase: "events", priority: 0.7 },
        { type: "day-trip", routeBase: "day-trips", priority: 0.8 },
        { type: "travel-tip", routeBase: "travel-tips", priority: 0.7 },
    ];

    const contentRoutes = contentTypeConfig.flatMap(({ type, routeBase, priority }) => {
        try {
            const docs = getAllDocsByType(type);
            return docs.map((doc) => ({
                url: `${baseUrl}/${routeBase}/${doc.frontmatter.slug}`,
                lastModified: new Date(doc.frontmatter.updatedAt || doc.frontmatter.publishedAt),
                changeFrequency: "monthly" as const,
                priority,
            }));
        } catch (error) {
            console.error(`Sitemap: Skipping type ${type} due to error:`, error);
            return [];
        }
    });

    return [...routes, ...contentRoutes];
}
