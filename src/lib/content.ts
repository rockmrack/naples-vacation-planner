import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
    FrontmatterSchema,
    type Frontmatter,
    type ContentType,
} from "./content-schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// Type directory mapping
const TYPE_DIR: Record<ContentType, string> = {
    itinerary: "itineraries",
    "where-to-stay": "where-to-stay",
    "day-trip": "day-trips",
    "travel-tip": "travel-tips",
    map: "maps",
    hotel: "hotels",
};

export interface ContentDoc {
    frontmatter: Frontmatter;
    body: string; // MDX content without frontmatter
    readingTime: string; // e.g., "6 min read"
    filePath: string;
    slug: string;
}

function getDirForType(type: ContentType): string {
    return path.join(CONTENT_ROOT, TYPE_DIR[type]);
}

/**
 * Get all documents of a specific content type
 */
export function getAllDocsByType(
    type: ContentType,
    options: { includeDrafts?: boolean } = {}
): ContentDoc[] {
    const { includeDrafts = false } = options;
    const folder = getDirForType(type);

    // Create folder if it doesn't exist
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        return [];
    }

    const files = fs.readdirSync(folder).filter((f) => f.endsWith(".mdx"));

    const docs: ContentDoc[] = files
        .map((file) => {
            const filePath = path.join(folder, file);
            const raw = fs.readFileSync(filePath, "utf8");
            const { data, content } = matter(raw);

            try {
                // Validate frontmatter with Zod
                const parsed = FrontmatterSchema.parse({ ...data, type });

                // Skip drafts unless explicitly including them
                if (!includeDrafts && parsed.status !== "published") {
                    return null;
                }

                const rt = readingTime(content);

                return {
                    frontmatter: parsed,
                    body: content,
                    readingTime: rt.text,
                    filePath,
                    slug: parsed.slug,
                };
            } catch (error) {
                // Log validation errors but don't crash - skip invalid files
                console.error(`Validation error in ${filePath}:`, error);
                // Return null to skip this file - allowing other valid files to load
                return null;
            }
        })
        .filter((doc): doc is ContentDoc => doc !== null);

    // Sort by published date, newest first
    return docs.sort((a, b) =>
        a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1
    );
}

/**
 * Get a single document by its slug
 */
export function getDocBySlug(
    type: ContentType,
    slug: string,
    options: { includeDrafts?: boolean } = {}
): ContentDoc | null {
    const docs = getAllDocsByType(type, options);
    return docs.find((d) => d.frontmatter.slug === slug) ?? null;
}

/**
 * Get all slugs for a content type (for generateStaticParams)
 */
export function getAllSlugs(
    type: ContentType,
    options: { includeDrafts?: boolean } = {}
): string[] {
    return getAllDocsByType(type, options).map((d) => d.frontmatter.slug);
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(
    currentDoc: ContentDoc,
    allDocs: ContentDoc[],
    limit: number = 3
): ContentDoc[] {
    const currentTags = new Set(currentDoc.frontmatter.tags);

    return allDocs
        .filter((doc) => doc.frontmatter.slug !== currentDoc.frontmatter.slug)
        .map((doc) => {
            const sharedTags = doc.frontmatter.tags.filter((tag) =>
                currentTags.has(tag)
            );
            return { doc, score: sharedTags.length };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ doc }) => doc);
}

/**
 * Get featured/latest posts across all types
 */
export function getFeaturedPosts(limit: number = 6): ContentDoc[] {
    const allTypes: ContentType[] = [
        "itinerary",
        "where-to-stay",
        "day-trip",
        "travel-tip",
    ];

    const allDocs = allTypes.flatMap((type) => getAllDocsByType(type));

    return allDocs
        .sort((a, b) =>
            a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1
        )
        .slice(0, limit);
}

/**
 * Count documents by content type
 */
export function getDocCountsByType(): Record<ContentType, number> {
    const types: ContentType[] = [
        "itinerary",
        "where-to-stay",
        "day-trip",
        "travel-tip",
        "map",
    ];

    return types.reduce(
        (acc, type) => {
            acc[type] = getAllDocsByType(type).length;
            return acc;
        },
        {} as Record<ContentType, number>
    );
}
