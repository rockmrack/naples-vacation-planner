import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug } from "@/src/lib/content";
import { isMap, type MapFrontmatter } from "@/src/lib/content-schema";
import { extractToc } from "@/src/lib/toc";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { QuickSummary } from "@/src/components/QuickSummary";
import { Prose } from "@/src/components/Prose";
import { SafeImage } from "@/src/components/SafeImage";
import { EditorNote, ExpertTip, KeyStat, ProsCons, Rating } from "@/src/components/ContentComponents";
import { ReadingProgress } from "@/src/components/ReadingProgress";
import { TableOfContents } from "@/src/components/TableOfContents";
import { ShareButtons } from "@/src/components/ShareButtons";

export const dynamicParams = false;

export function generateStaticParams() {
    try {
        return getAllSlugs("map").map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const doc = getDocBySlug("map", params.slug);
    if (!doc) return {};

    const url = `${site.url}/maps/${doc.frontmatter.slug}`;

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
    QuickSummary,
    SafeImage,
    EditorNote,
    ExpertTip,
    KeyStat,
    ProsCons,
    Rating,
};

export default function MapDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const doc = getDocBySlug("map", params.slug);

    if (!doc || !isMap(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as MapFrontmatter;

    // Extract table of contents
    const tocItems = extractToc(doc.body, 3);

    return (
        <>
            {/* Reading Progress Bar */}
            <ReadingProgress />

            <article className="section-container py-12">
                <Breadcrumbs
                    items={[
                        { label: "Maps", href: "/maps" },
                        { label: fm.title },
                    ]}
                />

                {/* Header */}
                <header className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="badge bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-md shadow-purple-500/30">
                            {fm.mapType ? fm.mapType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "Map"}
                        </span>
                        {fm.downloadUrl && (
                            <span className="badge bg-gray-100 text-gray-700">
                                📥 Downloadable
                            </span>
                        )}
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

                {/* Download & Embed Actions */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {fm.downloadUrl && (
                        <a
                            href={fm.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            📥 Download Map
                        </a>
                    )}
                    {fm.mapEmbedUrl && (
                        <a
                            href={fm.mapEmbedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            🗺️ Open in Google Maps
                        </a>
                    )}
                </div>

                {/* Embedded Map */}
                {fm.mapEmbedUrl && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
                        <iframe
                            src={fm.mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={fm.title}
                        />
                    </div>
                )}

                {/* Featured Image (if no embed) */}
                {!fm.mapEmbedUrl && (
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-xl relative group">
                        <SafeImage
                            src={fm.featuredImage}
                            fallbackSrc="/images/placeholders/map.svg"
                            alt={fm.featuredImageAlt || fm.title}
                            className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                )}

                {/* Two Column Layout */}
                <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
                    {/* Main Content */}
                    <div>
                        {/* Disclosure */}
                        <Disclosure variant="minimal" />

                        {/* MDX Content */}
                        <Prose className="prose-naples">
                            <MDXRemote source={doc.body} components={mdxComponents} />
                        </Prose>
                    </div>

                    {/* Sidebar - Table of Contents */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24">
                            {tocItems.length > 0 && (
                                <TableOfContents items={tocItems} title="In This Guide" />
                            )}

                            {/* Sidebar CTA */}
                            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
                                <h3 className="font-semibold text-gray-900 text-sm">Need an itinerary?</h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    Use this map with one of our curated Naples itineraries.
                                </p>
                                <a
                                    href="/itineraries"
                                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-purple-600 hover:text-purple-700"
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

