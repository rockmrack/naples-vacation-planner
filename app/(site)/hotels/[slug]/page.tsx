import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { site } from "@/src/config/site";
import { getAllSlugs, getDocBySlug, getAllDocsByType, getRelatedPosts } from "@/src/lib/content";
import { isHotel, type HotelFrontmatter } from "@/src/lib/content-schema";
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
        return getAllSlugs("hotel").map((slug) => ({ slug }));
    } catch {
        return [];
    }
}

export function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Metadata {
    const doc = getDocBySlug("hotel", params.slug);
    if (!doc) return {};

    const fm = doc.frontmatter as HotelFrontmatter;
    const url = `${site.url}/hotels/${fm.slug}`;

    return {
        title: fm.title,
        description: fm.description,
        alternates: {
            canonical: fm.canonicalUrl ?? url,
        },
        openGraph: {
            title: fm.title,
            description: fm.description,
            url,
            type: "article",
            images: [fm.featuredImage],
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

// Category display info
const CATEGORY_INFO: Record<string, { label: string; color: string }> = {
    "luxury-resort": { label: "Luxury Resort", color: "bg-amber-500" },
    boutique: { label: "Boutique Hotel", color: "bg-purple-500" },
    "mid-range": { label: "Mid-Range", color: "bg-blue-500" },
    budget: { label: "Budget", color: "bg-green-500" },
    "extended-stay": { label: "Extended Stay", color: "bg-teal-500" },
    "vacation-rental": { label: "Vacation Rental", color: "bg-orange-500" },
    "golf-resort": { label: "Golf Resort", color: "bg-emerald-500" },
    "family-resort": { label: "Family Resort", color: "bg-pink-500" },
    waterfront: { label: "Waterfront", color: "bg-cyan-500" },
};

const PRICE_DISPLAY: Record<string, string> = {
    "$": "Budget – Under $150/night",
    "$$": "Mid-Range – $150-250/night",
    "$$$": "Upscale – $250-400/night",
    "$$$$": "Luxury – $400-600/night",
    "$$$$$": "Ultra-Luxury – $600+/night",
};

export default function HotelDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const doc = getDocBySlug("hotel", params.slug);

    if (!doc || !isHotel(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as HotelFrontmatter;
    const categoryInfo = CATEGORY_INFO[fm.category] || { label: fm.category, color: "bg-gray-500" };

    let allDocs: ReturnType<typeof getAllDocsByType> = [];
    try {
        allDocs = getAllDocsByType("hotel");
    } catch {
        // No content
    }
    const relatedPosts = getRelatedPosts(doc, allDocs, 3);

    return (
        <article className="section-container py-12">
            <Breadcrumbs
                items={[
                    { label: "Hotels", href: "/hotels" },
                    { label: fm.hotelName },
                ]}
            />

            {/* Header */}
            <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full ${categoryInfo.color} text-white text-sm font-semibold`}>
                        {categoryInfo.label}
                    </span>
                    {fm.beachAccess && (
                        <span className="px-3 py-1 rounded-full bg-blue-500 text-white text-sm font-semibold">
                            🏖️ Beach Access
                        </span>
                    )}
                    {fm.petFriendly && (
                        <span className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-semibold">
                            🐾 Pet-Friendly
                        </span>
                    )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-gray-900">
                    {fm.hotelName}
                </h1>

                <p className="mt-2 text-lg text-gray-500">{fm.area}</p>
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
                    fallbackSrc="/images/placeholders/hotel.svg"
                    alt={fm.featuredImageAlt || fm.hotelName}
                    className="w-full aspect-[21/9] object-cover"
                />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                {/* Price Level */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">💰 Price Level</h3>
                    <p className="text-2xl font-bold text-palm-600">{fm.priceLevel}</p>
                    <p className="text-sm text-gray-500">{PRICE_DISPLAY[fm.priceLevel]}</p>
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">📍 Location</h3>
                    <p className="text-lg font-semibold text-gray-900">{fm.area}</p>
                    <p className="text-sm text-gray-500">{fm.beachAccess ? "Beach access available" : "Drive to beach"}</p>
                </div>

                {/* Category */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2">🏨 Type</h3>
                    <p className="text-lg font-semibold text-gray-900">{categoryInfo.label}</p>
                    <p className="text-sm text-gray-500">{fm.petFriendly ? "Pets welcome" : "No pets"}</p>
                </div>
            </div>

            {/* Amenities */}
            {fm.amenities.length > 0 && (
                <div className="p-6 rounded-xl bg-palm-50 border border-palm-100 mb-8">
                    <h3 className="font-semibold text-palm-800 mb-4">✨ Key Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                        {fm.amenities.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full bg-white text-palm-700 text-sm border border-palm-200"
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

            {/* Related Hotels */}
            {relatedPosts.length > 0 && (
                <div className="mt-12">
                    <RelatedPosts posts={relatedPosts} title="Similar Hotels" />
                </div>
            )}
        </article>
    );
}
