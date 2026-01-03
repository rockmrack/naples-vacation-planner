import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isItinerary, type ItineraryFrontmatter } from "@/src/lib/content-schema";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { QuickSummary } from "@/src/components/QuickSummary";
import { AffiliateCta } from "@/src/components/AffiliateCta";
import { FAQ } from "@/src/components/FAQ";
import { RelatedPosts } from "@/src/components/RelatedPosts";
import { Prose } from "@/src/components/Prose";

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
                    <span className="px-3 py-1 rounded-full bg-ocean-500 text-white text-sm font-semibold">
                        {fm.days}-Day Itinerary
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                        {fm.pace.charAt(0).toUpperCase() + fm.pace.slice(1)} Pace
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900">
                    {fm.title}
                </h1>

                <p className="mt-4 text-xl text-gray-600">{fm.description}</p>

                <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                    <span>Last updated: {new Date(fm.updatedAt).toLocaleDateString()}</span>
                    <span>·</span>
                    <span>{doc.readingTime}</span>
                </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                <img
                    src={fm.featuredImage}
                    alt={fm.featuredImageAlt || fm.title}
                    className="w-full aspect-[21/9] object-cover"
                />
            </div>

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
            <Prose>
                <MDXRemote source={doc.body} components={mdxComponents} />
            </Prose>

            {/* Related Posts */}
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </article>
    );
}
