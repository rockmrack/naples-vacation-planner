import Link from "next/link";
import type { ContentDoc } from "@/src/lib/content";

interface RelatedPostsProps {
    posts: ContentDoc[];
    title?: string;
}

const typeLabels: Record<string, string> = {
    itinerary: "Itinerary",
    "where-to-stay": "Where to Stay",
    "day-trip": "Day Trip",
    "travel-tip": "Travel Tip",
    map: "Map",
};

const typeColors: Record<string, string> = {
    itinerary: "bg-ocean-100 text-ocean-700",
    "where-to-stay": "bg-palm-100 text-palm-700",
    "day-trip": "bg-sunset-100 text-sunset-700",
    "travel-tip": "bg-amber-100 text-amber-700",
    map: "bg-purple-100 text-purple-700",
};

const typeRoutes: Record<string, string> = {
    itinerary: "/itineraries",
    "where-to-stay": "/where-to-stay",
    "day-trip": "/day-trips",
    "travel-tip": "/travel-tips",
    map: "/maps",
};

export function RelatedPosts({
    posts,
    title = "You Might Also Like",
}: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <section className="my-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                {title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => {
                    const type = post.frontmatter.type;
                    const route = typeRoutes[type] || "/";
                    const href = `${route}/${post.frontmatter.slug}`;

                    return (
                        <Link
                            key={post.frontmatter.slug}
                            href={href}
                            className="group block"
                        >
                            <article className="card p-4 h-full flex flex-col">
                                {/* Featured Image */}
                                <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-gray-100 mb-4">
                                    <img
                                        src={post.frontmatter.featuredImage}
                                        alt={post.frontmatter.featuredImageAlt || post.frontmatter.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span
                                        className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full ${typeColors[type] || "bg-gray-100 text-gray-700"}`}
                                    >
                                        {typeLabels[type] || type}
                                    </span>
                                </div>

                                {/* Content */}
                                <h3 className="font-bold text-gray-900 group-hover:text-ocean-600 transition-colors line-clamp-2">
                                    {post.frontmatter.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">
                                    {post.frontmatter.description}
                                </p>

                                {/* Reading Time */}
                                <p className="text-xs text-gray-500 mt-3">
                                    {post.readingTime}
                                </p>
                            </article>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
