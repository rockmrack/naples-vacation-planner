import { MetadataRoute } from "next";
import { getAllDocsByType } from "@/src/lib/content";
import { site } from "@/src/config/site";
import { ContentType } from "@/src/lib/content-schema";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = site.url;
    const lastModified = new Date();

    // Static pages
    const routes = [
        "",
        "/itineraries",
        "/where-to-stay",
        "/day-trips",
        "/travel-tips",
        "/about",
        "/authors",
        "/editorial-standards",
        "/reviews",
        "/privacy",
        "/terms",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: lastModified,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Dynamic Content Types
    const contentTypes: ContentType[] = [
        "itinerary",
        "where-to-stay",
        "day-trip",
        "travel-tip",
    ];

    const contentRoutes = contentTypes.flatMap((type) => {
        try {
            const docs = getAllDocsByType(type);
            const routeBase = type === "itinerary" ? "itineraries" :
                type === "where-to-stay" ? "where-to-stay" :
                    type === "day-trip" ? "day-trips" : "travel-tips";

            return docs.map((doc) => ({
                url: `${baseUrl}/${routeBase}/${doc.frontmatter.slug}`,
                lastModified: new Date(doc.frontmatter.updatedAt),
                changeFrequency: "monthly" as const,
                priority: type === "itinerary" ? 0.9 : 0.7,
            }));
        } catch (error) {
            console.error(`Sitemap: Skipping type ${type} due to error:`, error);
            // Return empty array to allow build to continue
            return [];
        }
    });

    return [...routes, ...contentRoutes];
}
