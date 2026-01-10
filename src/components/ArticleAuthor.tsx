import Link from "next/link";
import { type Author } from "@/src/lib/authors";
import { FactCheckedBadge } from "@/src/components/UltimateTrust";

interface ArticleAuthorBylineProps {
    author: Author;
    updatedAt: string;
    readingTime: string;
}

/**
 * Enterprise-grade author byline for article pages
 * Shows author info, credentials, verification status, and metadata
 */
export function ArticleAuthorByline({ author, updatedAt, readingTime }: ArticleAuthorBylineProps) {
    return (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-ocean-50/30 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {author.name.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Link href="/authors" className="font-semibold text-gray-900 hover:text-ocean-600 transition-colors">
                                {author.name}
                            </Link>
                            {author.verifiedExpert && (
                                <FactCheckedBadge variant="inline" />
                            )}
                        </div>
                        <p className="text-sm text-gray-500">{author.title}</p>
                    </div>
                </div>
                <div className="sm:ml-auto flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Updated {new Date(updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {readingTime}
                    </span>
                </div>
            </div>
            {/* Author credentials */}
            {author.credentials.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                    {author.credentials.map((cred) => (
                        <span key={cred} className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                            {cred}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

interface AuthorSidebarCardProps {
    author: Author;
}

/**
 * Compact author card for article sidebars
 */
export function AuthorSidebarCard({ author }: AuthorSidebarCardProps) {
    return (
        <div className="p-5 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                    {author.name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-sm text-gray-900">{author.name}</p>
                    <p className="text-xs text-gray-500">{author.title}</p>
                </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{author.shortBio}</p>
            {author.verifiedExpert && (
                <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Verified Expert • {author.yearsExperience}+ years
                </div>
            )}
            <Link href="/authors" className="mt-3 text-xs text-ocean-600 hover:text-ocean-700 font-medium inline-flex items-center gap-1">
                View full profile
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}

/**
 * Trust indicators sidebar component
 */
export function TrustIndicatorsSidebar() {
    return (
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
            <p className="text-xs text-gray-500 mb-3">This guide is</p>
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Expert Verified
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Updated Monthly
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Locally Researched
                </div>
            </div>
        </div>
    );
}

/**
 * Get author by matching frontmatter author string to known authors
 */
export function getAuthorFromFrontmatter(authorString: string, getAuthorBySlug: (slug: string) => ReturnType<typeof import("@/src/lib/authors").getAuthorBySlug>, getDefaultAuthor: () => ReturnType<typeof import("@/src/lib/authors").getDefaultAuthor>) {
    const authorSlugMap: Record<string, string> = {
        "sarah-mitchell": "sarah-mitchell",
        "Sarah Mitchell": "sarah-mitchell",
        "michael-chen": "michael-chen",
        "Michael Chen": "michael-chen",
        "jennifer-rodriguez": "jennifer-rodriguez",
        "Jennifer Rodriguez": "jennifer-rodriguez",
        "Naples Vacation Planner": "editorial-team",
        "editorial-team": "editorial-team",
    };

    const authorSlug = authorSlugMap[authorString] || "editorial-team";
    return getAuthorBySlug(authorSlug) || getDefaultAuthor();
}
