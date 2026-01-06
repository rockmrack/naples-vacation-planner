import { Metadata } from "next";
import Link from "next/link";
import { activities } from "@/src/data/activities";

export const metadata: Metadata = {
    title: "Things to Do in Naples, FL: Complete Activity Guide (2026)",
    description: "Discover the best things to do in Naples, Florida. From world-class golf and pristine beaches to kayaking, wildlife tours, and luxury shopping.",
};

export default function ThingsToDoPage() {
    // Group activities by category
    const categoryGroups = activities.reduce((acc, activity) => {
        if (!acc[activity.category]) {
            acc[activity.category] = [];
        }
        acc[activity.category].push(activity);
        return acc;
    }, {} as Record<string, typeof activities>);

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-900 to-teal-800 text-white">
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Things to Do in Naples, FL
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        From pristine beaches and world-class golf to wildlife adventures and luxury shopping—discover why Naples is Florida's premier destination.
                    </p>
                </div>
            </section>

            {/* Quick Links */}
            <section className="bg-white shadow-md py-6 sticky top-0 z-30 border-b">
                <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
                    <div className="flex gap-4 min-w-max">
                        {Object.keys(categoryGroups).map((category) => (
                            <a
                                key={category}
                                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors"
                            >
                                {category}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Activities by Category */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                {Object.entries(categoryGroups).map(([category, categoryActivities]) => (
                    <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                            <span className="text-3xl">
                                {category === "Water Sports" ? "🌊" :
                                    category === "Beach Activities" ? "🏖️" :
                                        category === "Sports" ? "⛳" :
                                            category === "Eco-Tourism" ? "🦎" :
                                                category === "Cruises" ? "🚢" :
                                                    category === "Lifestyle" ? "🛍️" :
                                                        category === "Wellness" ? "🧘" : "✨"}
                            </span>
                            {category}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryActivities.map((activity) => (
                                <Link
                                    key={activity.slug}
                                    href={`/things-to-do/${activity.slug}`}
                                    className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
                                >
                                    <div className="h-40 bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <span className="text-6xl opacity-50">{activity.category === "Water Sports" ? "🌊" : activity.category === "Beach Activities" ? "🏖️" : activity.category === "Sports" ? "⛳" : activity.category === "Eco-Tourism" ? "🦎" : "✨"}</span>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                                            {activity.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {activity.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-xs">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                                {activity.priceRange}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">
                                                {activity.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-900 to-teal-800 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Not Sure Where to Start?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Take our quick trip planner quiz and get personalized recommendations based on your interests.
                    </p>
                    <Link
                        href="/plan"
                        className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Plan Your Perfect Trip →
                    </Link>
                </div>
            </section>
        </>
    );
}
