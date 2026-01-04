import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isWhereToStay, type WhereToStayFrontmatter } from "@/src/lib/content-schema";
import { extractToc } from "@/src/lib/toc";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
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
        return getAllSlugs("where-to-stay").map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const doc = getDocBySlug("where-to-stay", params.slug);
    if (!doc) return {};

    const url = `${site.url}/where-to-stay/${doc.frontmatter.slug}`;

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
        },
    };
}

const mdxComponents = {
    Disclosure,
    AffiliateCta,
    FAQ,
};

export default function WhereToStayDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const doc = getDocBySlug("where-to-stay", params.slug);

    if (!doc || !isWhereToStay(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as WhereToStayFrontmatter;

    // Extract table of contents
    const tocItems = extractToc(doc.body, 3);

    let allDocs: ReturnType<typeof getAllDocsByType> = [];
    try {
        allDocs = getAllDocsByType("where-to-stay");
    } catch {
        // No content
    }
    const relatedPosts = getRelatedPosts(doc, allDocs, 3);

    return (
        <>
            {/* Reading Progress Bar */}
            <ReadingProgress />

            <article className="section-container py-12">
                <Breadcrumbs
                    items={[
                        { label: "Where to Stay", href: "/where-to-stay" },
                        { label: fm.areaName },
                    ]}
                />

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="badge bg-gradient-to-r from-palm-500 to-palm-600 text-white shadow-md shadow-palm-500/30">
                            Neighborhood Guide
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
                        fallbackSrc="/images/placeholders/where-to-stay.svg"
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
                        <Disclosure />

                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                            {fm.bestFor.length > 0 && (
                                <div className="p-4 rounded-xl bg-palm-50 border border-palm-100">
                                    <h3 className="font-semibold text-palm-800 mb-2">✓ Best For</h3>
                                    <ul className="space-y-1">
                                        {fm.bestFor.map((item) => (
                                            <li key={item} className="text-sm text-palm-700">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {fm.avoidIf.length > 0 && (
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                                    <h3 className="font-semibold text-amber-800 mb-2">⚠️ Consider Elsewhere If</h3>
                                    <ul className="space-y-1">
                                        {fm.avoidIf.map((item) => (
                                            <li key={item} className="text-sm text-amber-700">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Nearby Highlights */}
                        {fm.nearbyHighlights.length > 0 && (
                            <div className="p-4 rounded-xl bg-ocean-50 border border-ocean-100 mb-8">
                                <h3 className="font-semibold text-ocean-800 mb-2">📍 Nearby Highlights</h3>
                                <div className="flex flex-wrap gap-2">
                                    {fm.nearbyHighlights.map((item) => (
                                        <span
                                            key={item}
                                            className="badge bg-white text-ocean-700 border border-ocean-200"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

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
                            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-palm-50 to-teal-50 border border-palm-100">
                                <h3 className="font-semibold text-gray-900 text-sm">Need an itinerary?</h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    See how this neighborhood fits into our curated Naples itineraries.
                                </p>
                                <a
                                    href="/itineraries"
                                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-palm-600 hover:text-palm-700"
                                >
                                    View itineraries
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

