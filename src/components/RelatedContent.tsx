'use client';

import Link from "next/link";
import { SafeImage } from "./SafeImage";

interface RelatedItem {
    title: string;
    slug: string;
    type: string;
    description?: string;
    featuredImage?: string;
    tags?: string[];
}

interface RelatedContentProps {
    items: RelatedItem[];
    title?: string;
    variant?: 'grid' | 'list' | 'compact';
}

/**
 * Get the route base for a content type
 */
function getRouteBase(type: string): string {
    const routeMap: Record<string, string> = {
        'itinerary': 'itineraries',
        'travel-tip': 'travel-tips',
        'day-trip': 'day-trips',
        'where-to-stay': 'where-to-stay',
        'hotel': 'hotels',
        'restaurant': 'restaurants',
        'event': 'events',
    };
    return routeMap[type] || type;
}

/**
 * RelatedContent - Automated internal linking component
 * Displays related content based on tag matching
 */
export function RelatedContent({
    items,
    title = "You Might Also Like",
    variant = 'grid'
}: RelatedContentProps) {
    if (!items || items.length === 0) return null;

    if (variant === 'compact') {
        return (
            <aside className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                <ul className="space-y-2">
                    {items.map((item) => (
                        <li key={item.slug}>
                            <Link
                                href={`/${getRouteBase(item.type)}/${item.slug}`}
                                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        );
    }

    if (variant === 'list') {
        return (
            <aside className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
                <div className="space-y-4">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/${getRouteBase(item.type)}/${item.slug}`}
                            className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                        >
                            {item.featuredImage && (
                                <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                                    <SafeImage
                                        src={item.featuredImage}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                    {item.title}
                                </h4>
                                {item.description && (
                                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </aside>
        );
    }

    // Default: Grid variant
    return (
        <section className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <Link
                        key={item.slug}
                        href={`/${getRouteBase(item.type)}/${item.slug}`}
                        className="group block rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                    >
                        {item.featuredImage && (
                            <div className="aspect-video overflow-hidden">
                                <SafeImage
                                    src={item.featuredImage}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <div className="p-4">
                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                                {item.type.replace('-', ' ')}
                            </span>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mt-1 line-clamp-2">
                                {item.title}
                            </h3>
                            {item.description && (
                                <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

/**
 * InlineRelatedLinks - For inserting related links within article content
 */
export function InlineRelatedLinks({ items }: { items: RelatedItem[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <p className="text-sm font-semibold text-blue-800 mb-3 uppercase tracking-wider">
                📚 Related Reading
            </p>
            <ul className="space-y-2">
                {items.slice(0, 4).map((item) => (
                    <li key={item.slug} className="flex items-center gap-2">
                        <span className="text-blue-500">→</span>
                        <Link
                            href={`/${getRouteBase(item.type)}/${item.slug}`}
                            className="text-blue-700 hover:text-blue-900 hover:underline font-medium"
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
