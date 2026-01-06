import { Metadata } from "next";
import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";

export const metadata: Metadata = {
    title: "Naples vs Marco Island: Which Should You Visit?",
    description: "Compare Naples and Marco Island to decide which Florida destination is right for your vacation. Compare beaches, hotels, dining, activities, and more.",
};

export default function NaplesVsMarcoIsland() {
    const comparisons = [
        {
            category: "Beaches",
            naples: { rating: 5, text: "Multiple pristine beaches including Naples Beach and Vanderbilt Beach. Soft white sand, calm waters." },
            marco: { rating: 4, text: "Beautiful Tigertail Beach and South Marco Beach. More secluded, natural feel." },
            winner: "naples",
        },
        {
            category: "Dining",
            naples: { rating: 5, text: "World-class dining on Fifth Avenue South. 200+ restaurants from casual to fine dining." },
            marco: { rating: 3, text: "Good options but more limited. A few excellent waterfront restaurants." },
            winner: "naples",
        },
        {
            category: "Shopping",
            naples: { rating: 5, text: "Fifth Avenue, Third Street South, Waterside Shops. Designer boutiques to local finds." },
            marco: { rating: 2, text: "Limited shopping. Esplanade has some options." },
            winner: "naples",
        },
        {
            category: "Wildlife & Nature",
            naples: { rating: 4, text: "Everglades access, Corkscrew Swamp, Naples Zoo. Great variety." },
            marco: { rating: 5, text: "10,000 Islands access, exceptional shelling, dolphin tours, more natural setting." },
            winner: "marco",
        },
        {
            category: "Nightlife",
            naples: { rating: 4, text: "Downtown bars, live music venues, wine bars. Active but sophisticated." },
            marco: { rating: 2, text: "Very quiet at night. A few bars and restaurants." },
            winner: "naples",
        },
        {
            category: "Family Activities",
            naples: { rating: 4, text: "Naples Zoo, museums, kayaking, mini golf. Great for all ages." },
            marco: { rating: 4, text: "Beaches, boat tours, wildlife. More natural activities." },
            winner: "tie",
        },
        {
            category: "Crowds",
            naples: { rating: 3, text: "Popular destination, especially in season. Can be crowded." },
            marco: { rating: 5, text: "More relaxed, less crowded. Quieter atmosphere." },
            winner: "marco",
        },
        {
            category: "Accommodation",
            naples: { rating: 5, text: "Ritz-Carlton, LaPlaya, Inn on Fifth. Wide range from budget to luxury." },
            marco: { rating: 4, text: "Marriott, Hilton, JW Marriott. Good options but fewer choices." },
            winner: "naples",
        },
    ];

    const naplesWins = comparisons.filter(c => c.winner === "naples").length;
    const marcoWins = comparisons.filter(c => c.winner === "marco").length;

    return (
        <>
            {/* Hero */}
            <section className="relative py-24 bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900 text-white overflow-hidden">
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 text-sm font-semibold mb-6">
                        Destination Comparison
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Naples vs Marco Island
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Two stunning Southwest Florida destinations. Which one is right for your perfect vacation?
                    </p>
                </div>
            </section>

            {/* Quick Verdict */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-500">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Choose Naples If You Want:</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>✅ World-class dining and shopping</li>
                                <li>✅ Vibrant downtown atmosphere</li>
                                <li>✅ Luxury hotel options</li>
                                <li>✅ More nightlife and entertainment</li>
                                <li>✅ Cultural attractions and museums</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-teal-500">
                            <h3 className="font-bold text-xl text-gray-900 mb-2">Choose Marco If You Want:</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li>✅ Quieter, more relaxed vibe</li>
                                <li>✅ Better wildlife and nature access</li>
                                <li>✅ Less crowded beaches</li>
                                <li>✅ 10,000 Islands exploration</li>
                                <li>✅ True island getaway feeling</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Comparison */}
            <section className="py-16">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Detailed Comparison
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                                    <th className="text-center p-4 font-semibold text-blue-700 w-1/3">Naples</th>
                                    <th className="text-center p-4 font-semibold text-teal-700 w-1/3">Marco Island</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisons.map((c, i) => (
                                    <tr key={c.category} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="p-4 font-semibold text-gray-900">{c.category}</td>
                                        <td className={`p-4 text-sm ${c.winner === "naples" ? "bg-blue-50" : ""}`}>
                                            <div className="flex items-center gap-1 mb-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className={i < c.naples.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                                                ))}
                                                {c.winner === "naples" && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Winner</span>}
                                            </div>
                                            <p className="text-gray-600">{c.naples.text}</p>
                                        </td>
                                        <td className={`p-4 text-sm ${c.winner === "marco" ? "bg-teal-50" : ""}`}>
                                            <div className="flex items-center gap-1 mb-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i} className={i < c.marco.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                                                ))}
                                                {c.winner === "marco" && <span className="ml-2 text-xs bg-teal-500 text-white px-2 py-0.5 rounded-full">Winner</span>}
                                            </div>
                                            <p className="text-gray-600">{c.marco.text}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xl text-gray-700">
                            <strong>Final Score:</strong> Naples wins <span className="text-blue-600 font-bold">{naplesWins}</span> categories,
                            Marco Island wins <span className="text-teal-600 font-bold">{marcoWins}</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Why Not Both?</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Naples and Marco Island are just 20 minutes apart. Many visitors split their trip between both!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/itineraries"
                            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            View Combined Itineraries
                        </Link>
                        <Link
                            href="/day-trips"
                            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
                        >
                            Day Trip from Naples
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
