import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isDayTrip, type DayTripFrontmatter } from "@/src/lib/content-schema";
import { extractToc } from "@/src/lib/toc";
import { getAuthorBySlug, getDefaultAuthor } from "@/src/lib/authors";
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
import { FactCheckedBadge, EditorialReviewIndicator } from "@/src/components/UltimateTrust";

export const dynamicParams = false;

export function generateStaticParams() {
    try {
        return getAllSlugs("day-trip").map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const doc = getDocBySlug("day-trip", params.slug);
    if (!doc) return {};

    const url = `${site.url}/day-trips/${doc.frontmatter.slug}`;

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

export default function DayTripDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const doc = getDocBySlug("day-trip", params.slug);

    if (!doc || !isDayTrip(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as DayTripFrontmatter;

    // Get author
    const author = getAuthorBySlug("sarah-mitchell") || getDefaultAuthor();

    // Extract table of contents
    const tocItems = extractToc(doc.body, 3);

    let allDocs: ReturnType<typeof getAllDocsByType> = [];
    try {
        allDocs = getAllDocsByType("day-trip");
    } catch {
        // No content
    }
    const relatedPosts = getRelatedPosts(doc, allDocs, 3);

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
                        { label: "Day Trips", href: "/day-trips" },
                        { label: fm.title },
                    ]}
                />

                {/* Header with Trust Badges */}
                <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <FactCheckedBadge reviewer={author.name} reviewDate={new Date(fm.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })} variant="small" />
                        <span className="badge bg-gradient-to-r from-sunset-500 to-orange-500 text-white shadow-md shadow-sunset-500/30">
                            Day Trip
                        </span>
                        <span className="badge bg-gray-100 text-gray-700">
                            🚗 {fm.driveTimeFromNaples} from Naples
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900 leading-tight">
                        {fm.title}
                    </h1>

                    <p className="mt-4 text-xl text-gray-600 leading-relaxed">{fm.description}</p>

                    {/* Author Byline */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-sunset-50/30 border border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sunset-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                                    {author.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Link href="/authors" className="font-semibold text-gray-900 hover:text-ocean-600 transition-colors">
                                            {author.name}
                                        </Link>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                            Verified Expert
                                        </span>
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
                                <span>{doc.readingTime}</span>
                                <ShareButtons title={fm.title} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl relative group">
                    <SafeImage
                        src={fm.featuredImage}
                        fallbackSrc="/images/placeholders/day-trip.svg"
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

                        {/* Quick Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-center group hover:shadow-md transition-shadow">
                                <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🚗</span>
                                <p className="mt-2 text-sm font-medium text-gray-900">Drive Time</p>
                                <p className="text-sm text-gray-600">{fm.driveTimeFromNaples}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-center group hover:shadow-md transition-shadow">
                                <span className="text-2xl group-hover:scale-110 inline-block transition-transform">☀️</span>
                                <p className="mt-2 text-sm font-medium text-gray-900">Best Season</p>
                                <p className="text-sm text-gray-600">{fm.bestSeason}</p>
                            </div>
                            {fm.difficulty && (
                                <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 text-center group hover:shadow-md transition-shadow">
                                    <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📊</span>
                                    <p className="mt-2 text-sm font-medium text-gray-900">Difficulty</p>
                                    <p className="text-sm text-gray-600 capitalize">{fm.difficulty}</p>
                                </div>
                            )}
                            {fm.mustBook.length > 0 && (
                                <div className="p-4 rounded-xl bg-gradient-to-br from-sunset-50 to-orange-50 border border-sunset-100 text-center group hover:shadow-md transition-shadow">
                                    <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🎟️</span>
                                    <p className="mt-2 text-sm font-medium text-sunset-900">Book Ahead</p>
                                    <p className="text-sm text-sunset-700">{fm.mustBook.length} items</p>
                                </div>
                            )}
                        </div>

                        {/* Must Book */}
                        {fm.mustBook.length > 0 && (
                            <div className="p-4 rounded-xl bg-sunset-50 border border-sunset-100 mb-8">
                                <h3 className="font-semibold text-sunset-800 mb-2">🎟️ Book in Advance</h3>
                                <ul className="space-y-1">
                                    {fm.mustBook.map((item) => (
                                        <li key={item} className="text-sm text-sunset-700 flex items-center gap-2">
                                            <span>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* MDX Content */}
                        <Prose className="prose-naples">
                            <MDXRemote source={doc.body} components={mdxComponents} />
                        </Prose>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            {tocItems.length > 0 && (
                                <TableOfContents items={tocItems} title="In This Guide" />
                            )}

                            {/* Author Card */}
                            <div className="p-5 rounded-xl bg-white border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sunset-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold">
                                        {author.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-gray-900">{author.name}</p>
                                        <p className="text-xs text-gray-500">{author.title}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{author.shortBio}</p>
                                <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                    </svg>
                                    Verified Expert • {author.yearsExperience}+ years
                                </div>
                            </div>

                            {/* Editorial Review */}
                            <EditorialReviewIndicator
                                author={author.name}
                                editor="Editorial Team"
                                publishDate={new Date(fm.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                lastReview={new Date(fm.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                nextReview="Feb 2026"
                            />

                            {/* Sidebar CTA */}
                            <div className="p-4 rounded-xl bg-gradient-to-br from-sunset-50 to-orange-50 border border-sunset-100">
                                <h3 className="font-semibold text-gray-900 text-sm">Planning your trip?</h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    Include this day trip in one of our curated Naples itineraries.
                                </p>
                                <a
                                    href="/itineraries"
                                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-sunset-600 hover:text-sunset-700"
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
