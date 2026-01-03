import Link from "next/link";
import { site } from "@/src/config/site";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    // Generate BreadcrumbList Schema for SEO
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: site.url,
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: item.label,
                ...(item.href && { item: `${site.url}${item.href}` }),
            })),
        ],
    };

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            {/* Breadcrumb Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                {/* Home */}
                <li>
                    <Link
                        href="/"
                        className="hover:text-ocean-600 transition-colors flex items-center gap-1"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="sr-only sm:not-sr-only">Home</span>
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {/* Separator */}
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>

                        {/* Link or current page */}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-ocean-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 font-medium" aria-current="page">
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
