import { getAllDocsByType } from "@/src/lib/content";
import type { BaseFrontmatter } from "@/src/lib/content-schema";

interface ContentDoc {
    frontmatter: BaseFrontmatter & { tags?: string[] };
    slug: string;
}

/**
 * Get related content based on shared tags
 * @param currentSlug - The slug of the current content to exclude
 * @param currentTags - Tags of the current content
 * @param contentTypes - Array of content types to search
 * @param maxResults - Maximum number of related items to return
 */
export function getRelatedContent(
    currentSlug: string,
    currentTags: string[],
    contentTypes: string[] = ["itinerary", "travel-tip", "day-trip", "where-to-stay"],
    maxResults: number = 6
): ContentDoc[] {
    if (!currentTags || currentTags.length === 0) {
        return [];
    }

    const tagSet = new Set(currentTags.map(t => t.toLowerCase()));
    const allRelated: { doc: ContentDoc; score: number }[] = [];

    for (const type of contentTypes) {
        try {
            const docs = getAllDocsByType(type as "itinerary" | "travel-tip" | "day-trip" | "where-to-stay" | "hotel" | "restaurant" | "event" | "map");

            for (const doc of docs) {
                // Skip current content
                if (doc.frontmatter.slug === currentSlug) continue;

                // Calculate relevance score based on tag overlap
                const docTags = doc.frontmatter.tags || [];
                const matchingTags = docTags.filter(t => tagSet.has(t.toLowerCase()));

                if (matchingTags.length > 0) {
                    allRelated.push({
                        doc: {
                            frontmatter: doc.frontmatter as BaseFrontmatter & { tags?: string[] },
                            slug: doc.frontmatter.slug
                        },
                        score: matchingTags.length
                    });
                }
            }
        } catch (error) {
            // Skip content types that error
            console.error(`Error getting related content for type ${type}:`, error instanceof Error ? error.message : String(error));
        }
    }

    // Sort by relevance score and return top results
    return allRelated
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults)
        .map(item => item.doc);
}

/**
 * Get popular/featured content for homepage or fallback
 */
export function getFeaturedContent(
    contentType: string,
    maxResults: number = 4
): ContentDoc[] {
    try {
        const docs = getAllDocsByType(contentType as "itinerary" | "travel-tip" | "day-trip" | "where-to-stay" | "hotel" | "restaurant" | "event" | "map");

        // Return first N items (could be enhanced with actual popularity metrics)
        return docs.slice(0, maxResults).map(doc => ({
            frontmatter: doc.frontmatter as BaseFrontmatter & { tags?: string[] },
            slug: doc.frontmatter.slug
        }));
    } catch (error) {
        console.error(`Error getting featured content for type ${contentType}:`, error instanceof Error ? error.message : String(error));
        return [];
    }
}
