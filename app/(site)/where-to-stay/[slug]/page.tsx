import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isWhereToStay, type WhereToStayFrontmatter } from "@/src/lib/content-schema";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { AffiliateCta } from "@/src/components/AffiliateCta";
import { FAQ } from "@/src/components/FAQ";
import { RelatedPosts } from "@/src/components/RelatedPosts";
import { Prose } from "@/src/components/Prose";
import { SafeImage } from "@/src/components/SafeImage";

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

    let allDocs: ReturnType<typeof getAllDocsByType> = [];
    try {
        allDocs = getAllDocsByType("where-to-stay");
    } catch {
        // No content
    }
    const relatedPosts = getRelatedPosts(doc, allDocs, 3);

    return (
        <article className="section-container py-12">
            <Breadcrumbs
                items={[
                    { label: "Where to Stay", href: "/where-to-stay" },
                    { label: fm.areaName },
                ]}
            />

            {/* Header */}
            <header className="mb-8">
                <span className="px-3 py-1 rounded-full bg-palm-500 text-white text-sm font-semibold">
                    Neighborhood Guide
                </span>

                <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900">
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
                <SafeImage
                    src={fm.featuredImage}
                    fallbackSrc="/images/placeholders/where-to-stay.svg"
                    alt={fm.featuredImageAlt || fm.title}
                    className="w-full aspect-[21/9] object-cover"
                />
            </div>

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
                                className="px-3 py-1 rounded-full bg-white text-ocean-700 text-sm border border-ocean-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* MDX Content */}
            <Prose>
                <MDXRemote source={doc.body} components={mdxComponents} />
            </Prose>

            {/* Related Posts */}
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </article>
    );
}
