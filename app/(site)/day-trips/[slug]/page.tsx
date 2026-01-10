import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isDayTrip, type DayTripFrontmatter } from "@/src/lib/content-schema";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { AffiliateCta } from "@/src/components/AffiliateCta";
import { FAQ } from "@/src/components/FAQ";
import { QuickSummary } from "@/src/components/QuickSummary";
import { RelatedPosts } from "@/src/components/RelatedPosts";
import { Prose } from "@/src/components/Prose";
import { SafeImage } from "@/src/components/SafeImage";

import { EditorNote, ExpertTip, KeyStat, ProsCons, Rating } from "@/src/components/ContentComponents";

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
    QuickSummary,
    SafeImage,
    EditorNote,
    ExpertTip,
    KeyStat,
    ProsCons,
    Rating,
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

    let allDocs: ReturnType<typeof getAllDocsByType> = [];
    try {
        allDocs = getAllDocsByType("day-trip");
    } catch {
        // No content
    }
    const relatedPosts = getRelatedPosts(doc, allDocs, 3);

    return (
        <article className="section-container py-12">
            <Breadcrumbs
                items={[
                    { label: "Day Trips", href: "/day-trips" },
                    { label: fm.title },
                ]}
            />

            {/* Header */}
            <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-sunset-500 text-white text-sm font-semibold">
                        Day Trip
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                        🚗 {fm.driveTimeFromNaples} from Naples
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
                <SafeImage
                    src={fm.featuredImage}
                    fallbackSrc="/images/placeholders/day-trip.svg"
                    alt={fm.featuredImageAlt || fm.title}
                    className="w-full aspect-[21/9] object-cover"
                />
            </div>



            {/* Disclosure */}
            <Disclosure />

            {/* Quick Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                    <span className="text-2xl">🚗</span>
                    <p className="mt-2 text-sm font-medium text-gray-900">Drive Time</p>
                    <p className="text-sm text-gray-600">{fm.driveTimeFromNaples}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 text-center">
                    <span className="text-2xl">☀️</span>
                    <p className="mt-2 text-sm font-medium text-gray-900">Best Season</p>
                    <p className="text-sm text-gray-600">{fm.bestSeason}</p>
                </div>
                {fm.difficulty && (
                    <div className="p-4 rounded-xl bg-gray-50 text-center">
                        <span className="text-2xl">📊</span>
                        <p className="mt-2 text-sm font-medium text-gray-900">Difficulty</p>
                        <p className="text-sm text-gray-600 capitalize">{fm.difficulty}</p>
                    </div>
                )}
                {fm.mustBook.length > 0 && (
                    <div className="p-4 rounded-xl bg-sunset-50 text-center">
                        <span className="text-2xl">🎟️</span>
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
            <Prose>
                <MDXRemote source={doc.body} components={mdxComponents} />
            </Prose>



            {/* Related Posts */}
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </article>
    );
}
