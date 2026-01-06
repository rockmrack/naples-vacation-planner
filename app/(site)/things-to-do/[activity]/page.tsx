import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafeImage } from "@/src/components/SafeImage";
import { FAQSchema, BreadcrumbSchema } from "@/src/components/SchemaMarkup";
import { activities, getActivityBySlug, getAllActivitySlugs } from "@/src/data/activities";
import { site } from "@/src/config/site";

// Generate static paths for all activities
export function generateStaticParams() {
    return getAllActivitySlugs().map((activity) => ({
        activity,
    }));
}

// Generate metadata for SEO
export function generateMetadata({ params }: { params: { activity: string } }): Metadata {
    const activity = getActivityBySlug(params.activity);

    if (!activity) {
        return {
            title: "Activity Not Found",
        };
    }

    return {
        title: activity.metaTitle,
        description: activity.metaDescription,
        openGraph: {
            title: activity.metaTitle,
            description: activity.metaDescription,
            type: "article",
        },
    };
}

export default function ActivityPage({ params }: { params: { activity: string } }) {
    const activity = getActivityBySlug(params.activity);

    if (!activity) {
        notFound();
    }

    // Breadcrumb data
    const breadcrumbs = [
        { name: "Home", url: site.url },
        { name: "Things to Do", url: `${site.url}/things-to-do` },
        { name: activity.name, url: `${site.url}/things-to-do/${activity.slug}` },
    ];

    // FAQ data for schema
    const faqItems = activity.tips.map((tip, i) => ({
        question: `Tip ${i + 1}: What should I know about ${activity.name.toLowerCase()} in Naples?`,
        answer: tip,
    }));

    return (
        <>
            {/* Schema Markup */}
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema items={faqItems} />

            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-teal-800/80 z-10" />
                <SafeImage
                    src={`/images/activities/${activity.slug}.jpg`}
                    fallbackSrc="/images/placeholders/activity.jpg"
                    alt={activity.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                        {activity.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {activity.name} in Naples, FL
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                        {activity.description}
                    </p>
                </div>
            </section>

            {/* Quick Info Bar */}
            <section className="bg-white shadow-md py-6 border-b">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Best Time</p>
                        <p className="font-semibold text-gray-900">{activity.bestTime}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Duration</p>
                        <p className="font-semibold text-gray-900">{activity.duration}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Price Range</p>
                        <p className="font-semibold text-gray-900">{activity.priceRange}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Difficulty</p>
                        <p className="font-semibold text-gray-900">{activity.difficulty}</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Highlights */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Why {activity.name} in Naples?
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {activity.highlights.map((highlight, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                                        <span className="text-2xl">✨</span>
                                        <span className="text-gray-800">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Spots */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Best Places for {activity.name}
                            </h2>
                            <div className="space-y-4">
                                {activity.topSpots.map((spot, i) => (
                                    <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {i + 1}
                                            </span>
                                            <h3 className="font-semibold text-lg text-gray-900">{spot.name}</h3>
                                        </div>
                                        <p className="text-gray-600 ml-11">{spot.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tips */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Insider Tips for {activity.name}
                            </h2>
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                                <ul className="space-y-3">
                                    {activity.tips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-amber-600 font-bold">💡</span>
                                            <span className="text-gray-800">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Related Activities */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">Related Activities</h3>
                            <div className="space-y-3">
                                {activity.relatedActivities.map((slug) => {
                                    const related = getActivityBySlug(slug);
                                    if (!related) return null;
                                    return (
                                        <Link
                                            key={slug}
                                            href={`/things-to-do/${slug}`}
                                            className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-200"
                                        >
                                            <span className="font-medium text-gray-900">{related.name}</span>
                                            <span className="block text-sm text-gray-500">{related.category}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                            <h3 className="font-bold text-xl mb-3">Need Help Planning?</h3>
                            <p className="text-white/90 mb-4">
                                Our concierge team can help you book the perfect {activity.name.toLowerCase()} experience.
                            </p>
                            <Link
                                href="/plan"
                                className="block w-full text-center py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Start Planning →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Activities Grid */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Explore More Things to Do in Naples
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activities.filter(a => a.slug !== activity.slug).slice(0, 8).map((a) => (
                            <Link
                                key={a.slug}
                                href={`/things-to-do/${a.slug}`}
                                className="block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow group"
                            >
                                <div className="h-32 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                                    <span className="text-4xl">{a.category === "Water Sports" ? "🌊" : a.category === "Beach Activities" ? "🏖️" : a.category === "Sports" ? "⛳" : a.category === "Eco-Tourism" ? "🦎" : "✨"}</span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {a.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{a.category}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
