import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isItinerary, type ItineraryFrontmatter } from "@/src/lib/content-schema";
import { extractToc } from "@/src/lib/toc";
import { getAuthorBySlug, getDefaultAuthor } from "@/src/lib/authors";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { QuickSummary } from "@/src/components/QuickSummary";
import { AffiliateCta } from "@/src/components/AffiliateCta";
import { FAQ } from "@/src/components/FAQ";
import { RelatedPosts } from "@/src/components/RelatedPosts";
import { Prose } from "@/src/components/Prose";
import { SafeImage } from "@/src/components/SafeImage";
import { ReadingProgress } from "@/src/components/ReadingProgress";
import { TableOfContents } from "@/src/components/TableOfContents";
import { ShareButtons } from "@/src/components/ShareButtons";
import { ExpertVerifiedBadge } from "@/src/components/EnterpriseComponents";
import { ExpertTip, EditorNote, Rating, ProsCons, KeyStat } from "@/src/components/ContentComponents";

export const dynamicParams = false;

export function generateStaticParams() {
    try {
        return getAllSlugs("itinerary").map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const doc = getDocBySlug("itinerary", params.slug);
    if (!doc) return {};

    const url = `${site.url}/itineraries/${doc.frontmatter.slug}`;

    return {
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
        alternates: {
            canonical: doc.frontmatter.canonicalUrl ?? url,
        },
        openGraph: {
            title: doc.frontmatter.title,
            description: doc.frontmatter.description,
            url,
            type: "article",
            images: [doc.frontmatter.featuredImage],
            publishedTime: doc.frontmatter.publishedAt,
            modifiedTime: doc.frontmatter.updatedAt,
            authors: [doc.frontmatter.author],
        },
    };
}

// MDX components available in content
const mdxComponents = {
    AffiliateCta,
    QuickSummary,
    FAQ,
    ExpertTip,
    EditorNote,
    Rating,
    ProsCons,
    KeyStat,
};

const audienceLabels: Record<string, string> = {
    couples: "Couples",
    families: "Families",
    luxury: "Luxury travelers",
    nature: "Nature lovers",
    all: "All travelers",
};

export default function ItineraryPage({
    params,
}: {
    params: { slug: string };
}) {
    const doc = getDocBySlug("itinerary", params.slug);

    if (!doc || !isItinerary(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as ItineraryFrontmatter;

    // Get author from slug mapping or default
    const authorSlugMap: Record<string, string> = {
        "sarah-mitchell": "sarah-mitchell",
        "michael-chen": "michael-chen",
        "jennifer-rodriguez": "jennifer-rodriguez",
        "Naples Vacation Planner": "editorial-team",
    };
    const authorSlug = authorSlugMap[fm.author] || "editorial-team";
    const author = getAuthorBySlug(authorSlug) || getDefaultAuthor();

    // Extract table of contents
    const tocItems = extractToc(doc.body, 3);

    // Get related posts
    let allItineraries: ReturnType<typeof getAllDocsByType> = [];
    try {
        allItineraries = getAllDocsByType("itinerary");
    } catch {
        // No itineraries
    }
    const relatedPosts = getRelatedPosts(doc, allItineraries, 3);

    // Article Schema with Person author
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: fm.title,
        description: fm.description,
        image: fm.featuredImage,
        datePublished: fm.publishedAt,
        dateModified: fm.updatedAt,
        author: {
            "@type": "Person",
            name: author.name,
            url: `${site.url}/authors`,
            jobTitle: author.title,
        },
        publisher: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
        },
    };

    return (
        <>
            {/* Reading Progress Bar */}
            <ReadingProgress />

            <article className="section-container py-12">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                />

                <Breadcrumbs
                    items={[
                        { label: "Itineraries", href: "/itineraries" },
                        { label: fm.title },
                    ]}
                />

                {/* Header with Enterprise Trust Signals */}
                <header className="mb-8">
                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <ExpertVerifiedBadge size="sm" />
                        <span className="badge bg-gradient-to-r from-ocean-500 to-ocean-600 text-white shadow-md shadow-ocean-500/30">
                            {fm.days}-Day Itinerary
                        </span>
                        <span className="badge badge-ocean">
                            {fm.pace.charAt(0).toUpperCase() + fm.pace.slice(1)} Pace
                        </span>
                        <span className="badge badge-sunset">
                            {audienceLabels[fm.audience] || fm.audience}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 leading-tight">
                        {fm.title}
                    </h1>

                    <p className="mt-4 text-xl text-gray-600 leading-relaxed">{fm.description}</p>

                    {/* Author Byline - Enterprise Style */}
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
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                </svg>
                                                Verified Expert
                                            </span>
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
                                    Updated {new Date(fm.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {doc.readingTime}
                                </span>
                                <ShareButtons title={fm.title} />
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
                </header>

                {/* Featured Image */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl relative group">
                    <SafeImage
                        src={fm.featuredImage}
                        fallbackSrc="/images/placeholders/itinerary.svg"
                        alt={fm.featuredImageAlt || fm.title}
                        className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Two Column Layout */}
                <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
                    {/* Main Content */}
                    <div>
                        {/* Disclosure */}
                        <Disclosure variant="detailed" />

                        {/* Quick Summary */}
                        <QuickSummary
                            whoFor={audienceLabels[fm.audience] || fm.audience}
                            pace={fm.pace}
                            bestSeason="January – April (peak season)"
                            mustBook={fm.bookAhead}
                            duration={`${fm.days} ${fm.days === 1 ? "day" : "days"}`}
                        />

                        {/* MDX Content */}
                        <Prose className="prose-naples">
                            <MDXRemote source={doc.body} components={mdxComponents} />
                        </Prose>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
                    </div>

                    {/* Sidebar - Table of Contents & Author Card */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            {tocItems.length > 0 && (
                                <TableOfContents items={tocItems} title="In This Guide" />
                            )}

                            {/* Author Card Sidebar */}
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

                            {/* Sidebar CTA */}
                            <div className="p-4 rounded-xl bg-gradient-to-br from-ocean-50 to-teal-50 border border-ocean-100">
                                <h3 className="font-semibold text-gray-900 text-sm">Planning your trip?</h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    Book accommodations early during peak season (Jan–Apr).
                                </p>
                                <a
                                    href="/where-to-stay"
                                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-ocean-600 hover:text-ocean-700"
                                >
                                    Find where to stay
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>

                            {/* Trust Indicators */}
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
                        </div>
                    </aside>
                </div>
            </article>
        </>
    );
}
