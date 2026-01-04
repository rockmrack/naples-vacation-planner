import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug } from "@/src/lib/content";
import { isMap, type MapFrontmatter } from "@/src/lib/content-schema";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { QuickSummary } from "@/src/components/QuickSummary";
import { Prose } from "@/src/components/Prose";
import { SafeImage } from "@/src/components/SafeImage";

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

    return (
        <article className="section-container py-12">
            <Breadcrumbs
                items={[
                    { label: "Maps", href: "/maps" },
                    { label: fm.title },
                ]}
            />

            {/* Header */}
            <header className="mb-8">
                <span className="px-3 py-1 rounded-full bg-purple-500 text-white text-sm font-semibold">
                    {fm.mapType ? fm.mapType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()) : "Map"}
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
                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                    <SafeImage
                        src={fm.featuredImage}
                        fallbackSrc="/images/placeholders/map.svg"
                        alt={fm.featuredImageAlt || fm.title}
                        className="w-full aspect-[16/9] object-cover"
                    />
                </div>
            )}

            {/* Disclosure */}
            <Disclosure variant="minimal" />

            {/* MDX Content */}
            <Prose>
                <MDXRemote source={doc.body} components={mdxComponents} />
            </Prose>
        </article>
    );
}
