import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { getAuthorBySlug } from "@/src/lib/authors";
import { isItinerary, type ItineraryFrontmatter } from "@/src/lib/content-schema";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { Disclosure } from "@/src/components/Disclosure";
import { QuickSummary } from "@/src/components/QuickSummary";
import { AffiliateCta } from "@/src/components/AffiliateCta";
import { FAQ } from "@/src/components/FAQ";
import { RelatedPosts } from "@/src/components/RelatedPosts";
import { Prose } from "@/src/components/Prose";
import { SafeImage } from "@/src/components/SafeImage";
import { EditorNote, ExpertTip, KeyStat, ProsCons, Rating } from "@/src/components/ContentComponents";
import WeatherWidget from "@/src/components/WeatherWidget";
import NewsletterSignup from "@/src/components/NewsletterSignup";
import { ArticleAuthorByline } from "@/src/components/ArticleAuthor";
import { ReviewsSection } from "@/src/components/Reviews";
import { getAggregateRating } from "@/src/data/reviews";

const MapComponent = dynamic(() => import("@/src/components/MapComponent"), { ssr: false });

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
    SafeImage,
    EditorNote,
    ExpertTip,
    KeyStat,
    ProsCons,
    Rating,
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

    // Get Author Data
    const author = getAuthorBySlug(fm.author) || {
        slug: "naples-vacation-planner",
        name: fm.author,
        title: "Editor",
        avatar: "/images/logo.png",
        bio: "Naples Vacation Planner Editorial Team",
        shortBio: "Naples Vacation Planner Editorial Team",
        credentials: [],
        expertise: [],
        socialLinks: {},
        yearsExperience: 10,
        articlesWritten: 100,
        verifiedExpert: true
    };

    // Get Review Data
    const aggregateRating = getAggregateRating(fm.slug);

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
            "name": author.name,
            "url": `https://naplesvacationplanner.com/authors/${author.slug}`,
            "jobTitle": author.title,
            "image": author.avatar ? `https://naplesvacationplanner.com${author.avatar}` : undefined,
            "description": author.shortBio,
            "sameAs": Object.values(author.socialLinks || {})
        },
        publisher: {
            "@type": "Organization",
            "name": site.name,
            "url": site.url,
        },
        ...(aggregateRating && {
            aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: aggregateRating.ratingValue,
                reviewCount: aggregateRating.reviewCount,
            }
        })
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

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900">
                            {fm.title}
                        </h1>

                        <p className="mt-4 text-xl text-gray-600">{fm.description}</p>

                        <ArticleAuthorByline
                            author={author}
                            updatedAt={fm.updatedAt}
                            readingTime={doc.readingTime}
                        />
                    </div>
                    <WeatherWidget className="w-full lg:w-64 flex-shrink-0" />
                </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                <SafeImage
                    src={fm.featuredImage}
                    fallbackSrc="/images/placeholders/itinerary.svg"
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

            {/* Interactive Map - Render if locations exist */}
            {fm.locations && fm.locations.length > 0 && (
                <div className="my-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span>📍</span> Itinerary Map
                    </h2>
                    <MapComponent locations={fm.locations} />
                </div>
            )}

            {/* MDX Content */}
            <Prose>
                <MDXRemote source={doc.body} components={mdxComponents} />
            </Prose>

            {/* Reviews */}
            <div className="my-12">
                <ReviewsSection slug={fm.slug} />
            </div>

            {/* Newsletter Signup */}
            <div className="my-12">
                <NewsletterSignup
                    title="Enjoyed This Itinerary?"
                    description="Get more expert Naples travel guides, insider tips, and a free vacation planning PDF delivered to your inbox."
                />
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </article>
    );
}
