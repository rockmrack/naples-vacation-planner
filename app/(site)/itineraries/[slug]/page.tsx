import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isItinerary, type ItineraryFrontmatter } from "@/src/lib/content-schema";
import { extractToc } from "@/src/lib/toc";
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
    Disclosure,
    AffiliateCta,
    QuickSummary,
    FAQ,
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

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: fm.title,
        description: fm.description,
        image: fm.featuredImage,
        datePublished: fm.publishedAt,
        dateModified: fm.updatedAt,
        author: {
            "@type": "Organization",
            name: fm.author,
            url: site.url,
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

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
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

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {new Date(fm.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {doc.readingTime}
                            </span>
                        </div>
                        <ShareButtons title={fm.title} />
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
                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
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

                    {/* Sidebar - Table of Contents */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            {tocItems.length > 0 && (
                                <TableOfContents items={tocItems} title="In This Guide" />
                            )}

                            {/* Sidebar CTA */}
                            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-ocean-50 to-teal-50 border border-ocean-100">
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
                        </div>
                    </aside>
                </div>
            </article>
        </>
    );
}

