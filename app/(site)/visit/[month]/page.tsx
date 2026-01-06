import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSchema, BreadcrumbSchema } from "@/src/components/SchemaMarkup";
import { monthlyGuides, getMonthlyGuideBySlug, getAllMonthlySlugs } from "@/src/data/monthly-guides";
import { site } from "@/src/config/site";

// Generate static paths for all months
export function generateStaticParams() {
    return getAllMonthlySlugs().map((month) => ({
        month,
    }));
}

// Generate metadata for SEO
export function generateMetadata({ params }: { params: { month: string } }): Metadata {
    const guide = getMonthlyGuideBySlug(params.month);

    if (!guide) {
        return { title: "Month Not Found" };
    }

    return {
        title: guide.metaTitle,
        description: guide.metaDescription,
        openGraph: {
            title: guide.metaTitle,
            description: guide.metaDescription,
            type: "article",
        },
    };
}

export default function MonthlyGuidePage({ params }: { params: { month: string } }) {
    const guide = getMonthlyGuideBySlug(params.month);

    if (!guide) {
        notFound();
    }

    // Breadcrumb data
    const breadcrumbs = [
        { name: "Home", url: site.url },
        { name: "Visit Naples", url: `${site.url}/visit` },
        { name: guide.month, url: `${site.url}/visit/${guide.slug}` },
    ];

    // FAQ data for schema
    const faqItems = [
        { question: `What is the weather like in Naples in ${guide.month}?`, answer: guide.weatherSummary },
        { question: `Is ${guide.month} a good time to visit Naples, FL?`, answer: `${guide.month} is ${guide.season.toLowerCase()} in Naples with ${guide.crowdLevel.toLowerCase()} crowds and ${guide.priceLevel.toLowerCase()} pricing. ${guide.bestFor.slice(0, 2).join(' and ')} will particularly enjoy visiting during this month.` },
        { question: `What events happen in Naples during ${guide.month}?`, answer: guide.topEvents.map(e => e.name).join(', ') },
    ];

    // Season color
    const seasonColors: Record<string, string> = {
        "Peak Season": "from-amber-500 to-orange-600",
        "Shoulder Season": "from-teal-500 to-cyan-600",
        "Off-Peak Season": "from-blue-500 to-indigo-600",
        "Season Begins": "from-green-500 to-emerald-600",
    };

    return (
        <>
            {/* Schema Markup */}
            <BreadcrumbSchema items={breadcrumbs} />
            <FAQSchema items={faqItems} />

            {/* Hero Section */}
            <section className={`relative py-20 bg-gradient-to-r ${seasonColors[guide.season] || "from-blue-600 to-teal-600"} text-white`}>
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                        {guide.season}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {guide.month} in Naples, FL
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        {guide.weatherSummary}
                    </p>
                </div>
            </section>

            {/* Weather Stats Bar */}
            <section className="bg-white shadow-md py-6 border-b">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-500">High</p>
                        <p className="text-2xl font-bold text-orange-500">{guide.avgHighTemp}°F</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Low</p>
                        <p className="text-2xl font-bold text-blue-500">{guide.avgLowTemp}°F</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Rain Days</p>
                        <p className="text-2xl font-bold text-gray-700">{guide.rainDays}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Water Temp</p>
                        <p className="text-2xl font-bold text-teal-500">{guide.waterTemp}°F</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Crowds</p>
                        <p className="text-lg font-bold text-gray-700">{guide.crowdLevel}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Prices</p>
                        <p className="text-lg font-bold text-gray-700">{guide.priceLevel}</p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Events */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                🎉 Events in {guide.month}
                            </h2>
                            <div className="space-y-4">
                                {guide.topEvents.map((event, i) => (
                                    <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-lg text-gray-900">{event.name}</h3>
                                            <span className="text-sm text-blue-600 font-medium">{event.date}</span>
                                        </div>
                                        <p className="text-gray-600">{event.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What to Expect */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                📋 What to Expect
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {guide.whatToExpect.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                                        <span className="text-xl">✓</span>
                                        <span className="text-gray-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Packing Tips */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                🧳 Packing Tips
                            </h2>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                                <ul className="space-y-3">
                                    {guide.packingTips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-blue-600">👕</span>
                                            <span className="text-gray-800">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Best For */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                            <h3 className="font-bold text-lg text-green-800 mb-4">✅ Best For</h3>
                            <ul className="space-y-2">
                                {guide.bestFor.map((item, i) => (
                                    <li key={i} className="text-green-700">• {item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Avoid If */}
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <h3 className="font-bold text-lg text-red-800 mb-4">⚠️ Consider Alternatives If</h3>
                            <ul className="space-y-2">
                                {guide.avoidIf.map((item, i) => (
                                    <li key={i} className="text-red-700">• {item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                            <h3 className="font-bold text-xl mb-3">Ready to Book?</h3>
                            <p className="text-white/90 mb-4">
                                Get personalized recommendations for your {guide.month} trip.
                            </p>
                            <Link
                                href="/plan"
                                className="block w-full text-center py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Plan Your Trip →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* All Months Grid */}
            <section className="bg-gray-100 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Explore Other Months
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {monthlyGuides.map((m) => (
                            <Link
                                key={m.slug}
                                href={`/visit/${m.slug}`}
                                className={`block p-4 rounded-xl text-center transition-all ${m.slug === guide.slug
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white hover:shadow-md hover:border-blue-300 border border-gray-200'
                                    }`}
                            >
                                <span className="font-semibold">{m.month.slice(0, 3)}</span>
                                <span className="block text-xs mt-1 opacity-75">{m.avgHighTemp}°F</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
