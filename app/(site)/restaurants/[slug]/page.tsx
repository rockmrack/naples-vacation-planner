import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllDocsByType, getDocBySlug } from "@/src/lib/content";
import { site } from "@/src/config/site";
import { isRestaurant, RestaurantFrontmatter } from "@/src/lib/content-schema";
import { Prose } from "@/src/components/Prose";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import ShareButtons from "@/src/components/ShareButtons";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const restaurants = getAllDocsByType("restaurant");
    return restaurants.map((doc) => ({
        slug: doc.frontmatter.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const doc = getDocBySlug("restaurant", slug);

    if (!doc || !isRestaurant(doc.frontmatter)) {
        return { title: "Restaurant Not Found" };
    }

    const fm = doc.frontmatter;

    return {
        title: `${fm.restaurantName} - Naples Restaurant Guide | ${site.name}`,
        description: fm.description,
        openGraph: {
            title: `${fm.restaurantName} | ${site.name}`,
            description: fm.description,
            url: `${site.url}/restaurants/${fm.slug}`,
            type: "article",
            images: [{ url: fm.featuredImage }],
        },
    };
}

const cuisineLabels: Record<string, string> = {
    "fine-dining": "Fine Dining",
    seafood: "Seafood",
    italian: "Italian",
    steakhouse: "Steakhouse",
    american: "American",
    asian: "Asian",
    french: "French",
    mediterranean: "Mediterranean",
    "breakfast-brunch": "Breakfast & Brunch",
    casual: "Casual",
    mexican: "Mexican",
};

export default async function RestaurantPage({ params }: PageProps) {
    const { slug } = await params;
    const doc = getDocBySlug("restaurant", slug);

    if (!doc || !isRestaurant(doc.frontmatter)) {
        notFound();
    }

    const fm = doc.frontmatter as RestaurantFrontmatter;

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Restaurants", href: "/restaurants" },
        { label: fm.restaurantName, href: `/restaurants/${fm.slug}` },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image */}
            <section className="relative h-[40vh] md:h-[50vh] w-full">
                <Image
                    src={fm.featuredImage}
                    alt={fm.featuredImageAlt || fm.restaurantName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        <span className="inline-block bg-amber-500 text-white text-sm font-medium px-3 py-1 rounded-full mb-3">
                            {cuisineLabels[fm.cuisine] || fm.cuisine}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">
                            {fm.restaurantName}
                        </h1>
                        <p className="text-lg text-gray-200">
                            {fm.neighborhood} • {fm.priceLevel}
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-4">
                <Breadcrumbs items={breadcrumbs} />
            </div>

            {/* Main Content */}
            <article className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Article */}
                    <div className="lg:col-span-2">
                        <Prose>
                            <MDXRemote source={doc.body} />
                        </Prose>

                        {/* Signature Dishes */}
                        {fm.signatureDishes.length > 0 && (
                            <div className="mt-8 p-6 bg-amber-50 rounded-xl">
                                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                                    🍽️ Signature Dishes
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    {fm.signatureDishes.map((dish) => (
                                        <li key={dish}>{dish}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Awards */}
                        {fm.awards.length > 0 && (
                            <div className="mt-6 p-6 bg-yellow-50 rounded-xl">
                                <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                                    🏆 Awards & Recognition
                                </h3>
                                <ul className="list-disc list-inside text-gray-700 space-y-1">
                                    {fm.awards.map((award) => (
                                        <li key={award}>{award}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <ShareButtons title={fm.title} url={`/restaurants/${fm.slug}`} />
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Quick Facts */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Restaurant Details
                                </h3>
                                <dl className="space-y-3 text-sm">
                                    <div>
                                        <dt className="text-gray-500">Cuisine</dt>
                                        <dd className="font-medium text-gray-900">
                                            {cuisineLabels[fm.cuisine] || fm.cuisine}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500">Price Range</dt>
                                        <dd className="font-medium text-green-600 text-lg">
                                            {fm.priceLevel}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500">Neighborhood</dt>
                                        <dd className="font-medium text-gray-900">{fm.neighborhood}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500">Address</dt>
                                        <dd className="font-medium text-gray-900">{fm.address}</dd>
                                    </div>
                                    {fm.phone && (
                                        <div>
                                            <dt className="text-gray-500">Phone</dt>
                                            <dd className="font-medium text-gray-900">
                                                <a href={`tel:${fm.phone}`} className="hover:text-amber-600">
                                                    {fm.phone}
                                                </a>
                                            </dd>
                                        </div>
                                    )}
                                    {fm.hours && (
                                        <div>
                                            <dt className="text-gray-500">Hours</dt>
                                            <dd className="font-medium text-gray-900">{fm.hours}</dd>
                                        </div>
                                    )}
                                    {fm.waterfront && (
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <span>🌊</span>
                                            <span className="font-medium">Waterfront Dining</span>
                                        </div>
                                    )}
                                    {fm.outdoorSeating && (
                                        <div className="flex items-center gap-2 text-green-600">
                                            <span>🌴</span>
                                            <span className="font-medium">Outdoor Seating</span>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Best For Tags */}
                            {fm.bestFor.length > 0 && (
                                <div className="bg-amber-50 rounded-xl p-6">
                                    <h3 className="text-lg font-semibold text-amber-800 mb-3">
                                        Best For
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {fm.bestFor.map((tag) => (
                                            <span
                                                key={tag}
                                                className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="space-y-3">
                                {fm.reservationUrl && (
                                    <a
                                        href={fm.reservationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Make a Reservation
                                    </a>
                                )}
                                {fm.website && (
                                    <a
                                        href={fm.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-center font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        Visit Website
                                    </a>
                                )}
                            </div>

                            {/* Back Link */}
                            <Link
                                href="/restaurants"
                                className="block text-center text-amber-600 hover:text-amber-700 font-medium"
                            >
                                ← View All Restaurants
                            </Link>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}
