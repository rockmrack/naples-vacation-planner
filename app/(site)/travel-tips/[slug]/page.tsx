import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isTravelTip } from "@/src/lib/content-schema";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { AffiliateCta } from "@/src/components/AffiliateCta";
import { FAQ } from "@/src/components/FAQ";
import { QuickSummary } from "@/src/components/QuickSummary";
import { RelatedPosts } from "@/src/components/RelatedPosts";
import { Prose } from "@/src/components/Prose";

export const dynamicParams = false;

export function generateStaticParams() {
    try {
        return getAllSlugs("travel-tip").map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const doc = getDocBySlug("travel-tip", params.slug);
    if (!doc) return {};

    const url = `${site.url}/travel-tips/${doc.frontmatter.slug}`;

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
    QuickSummary,
};

export default function TravelTipDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const doc = getDocBySlug("travel-tip", params.slug);

    if (!doc || !isTravelTip(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter;

    let allDocs: ReturnType<typeof getAllDocsByType> = [];
    try {
        allDocs = getAllDocsByType("travel-tip");
    } catch {
        // No content
    }
    const relatedPosts = getRelatedPosts(doc, allDocs, 3);

    return (
        <article className="section-container py-12">
            <Breadcrumbs
                items={[
                    { label: "Travel Tips", href: "/travel-tips" },
                    { label: fm.title },
                ]}
            />

            {/* Header */}
            <header className="mb-8">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-semibold">
                    Travel Tip
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
                <img
                    src={fm.featuredImage}
                    alt={fm.featuredImageAlt || fm.title}
                    className="w-full aspect-[21/9] object-cover"
                />
            </div>

            {/* Disclosure */}
            <Disclosure />

            {/* MDX Content */}
            <Prose>
                <MDXRemote source={doc.body} components={mdxComponents} />
            </Prose>

            {/* Related Posts */}
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </article>
    );
}
