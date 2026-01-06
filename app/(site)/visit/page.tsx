import { Metadata } from "next";
import Link from "next/link";
import { monthlyGuides } from "@/src/data/monthly-guides";

export const metadata: Metadata = {
    title: "Best Time to Visit Naples, FL: Monthly Weather & Travel Guide (2026)",
    description: "Find the perfect time to visit Naples, Florida. Compare weather, crowds, prices, and events for every month of the year.",
};

export default function VisitPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-blue-900 to-teal-800 text-white">
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
                <div className="relative max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        When to Visit Naples, FL
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                        Compare weather, crowds, prices, and events to find your perfect travel month.
                    </p>
                </div>
            </section>

            {/* Season Overview */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Naples Seasons at a Glance
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                        <h3 className="font-bold text-xl text-amber-800 mb-2">🌴 Peak Season</h3>
                        <p className="text-amber-700 font-medium mb-2">December - March</p>
                        <p className="text-gray-600 text-sm">
                            Perfect weather, highest prices, most crowded. Snowbirds and tourists flock for warm sunshine.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                        <h3 className="font-bold text-xl text-teal-800 mb-2">🍃 Shoulder Season</h3>
                        <p className="text-teal-700 font-medium mb-2">April & October-November</p>
                        <p className="text-gray-600 text-sm">
                            Great value with good weather. Crowds thin out, prices drop, but conditions remain excellent.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="font-bold text-xl text-blue-800 mb-2">☀️ Off-Peak Season</h3>
                        <p className="text-blue-700 font-medium mb-2">May - September</p>
                        <p className="text-gray-600 text-sm">
                            Best deals, hottest weather, afternoon storms. Hurricane risk June-November.
                        </p>
                    </div>
                </div>
            </section>

            {/* Monthly Grid */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Monthly Guides
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {monthlyGuides.map((guide) => {
                            const seasonColors: Record<string, string> = {
                                "Peak Season": "from-amber-500 to-orange-500",
                                "Shoulder Season": "from-teal-500 to-cyan-500",
                                "Off-Peak Season": "from-blue-500 to-indigo-500",
                                "Season Begins": "from-green-500 to-emerald-500",
                            };
                            return (
                                <Link
                                    key={guide.slug}
                                    href={`/visit/${guide.slug}`}
                                    className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
                                >
                                    <div className={`h-24 bg-gradient-to-r ${seasonColors[guide.season] || "from-gray-500 to-gray-600"} flex items-center justify-center`}>
                                        <span className="text-4xl font-bold text-white">{guide.month}</span>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-500">{guide.season}</span>
                                            <span className="text-sm font-medium text-gray-700">{guide.priceLevel}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                                            <div>
                                                <p className="text-orange-500 font-bold">{guide.avgHighTemp}°F</p>
                                                <p className="text-gray-400 text-xs">High</p>
                                            </div>
                                            <div>
                                                <p className="text-teal-500 font-bold">{guide.waterTemp}°F</p>
                                                <p className="text-gray-400 text-xs">Water</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-700 font-bold">{guide.rainDays}</p>
                                                <p className="text-gray-400 text-xs">Rain Days</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {guide.weatherSummary}
                                        </p>
                                        <div className="mt-4">
                                            <span className="text-blue-600 font-medium group-hover:underline">
                                                View {guide.month} Guide →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quick Decision Guide */}
            <section className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Quick Decision Guide
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">✅ Best Weather</h3>
                        <p className="text-gray-600 mb-2">January - April</p>
                        <p className="text-sm text-gray-500">70s-80s°F, low humidity, minimal rain</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">💰 Best Value</h3>
                        <p className="text-gray-600 mb-2">May - September</p>
                        <p className="text-sm text-gray-500">50-70% off peak rates, fewer crowds</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">🏖️ Best for Swimming</h3>
                        <p className="text-gray-600 mb-2">June - October</p>
                        <p className="text-sm text-gray-500">Water temps 82-87°F</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">🎉 Best Events</h3>
                        <p className="text-gray-600 mb-2">January, February, December</p>
                        <p className="text-sm text-gray-500">Wine Festival, Art Festival, Holidays</p>
                    </div>
                </div>
            </section>
        </>
    );
}
