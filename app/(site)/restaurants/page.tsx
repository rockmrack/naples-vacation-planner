import { Metadata } from "next";
import { getAllDocsByType } from "@/src/lib/content";
import { site } from "@/src/config/site";
import RestaurantGrid from "@/src/components/RestaurantGrid";

export const metadata: Metadata = {
    title: `Where to Eat in Naples, Florida | ${site.name}`,
    description:
        "Discover the best restaurants in Naples, FL—from award-winning fine dining and fresh seafood to cozy Italian trattorias and waterfront spots.",
    openGraph: {
        title: `Where to Eat in Naples, Florida | ${site.name}`,
        description:
            "Curated guide to Naples' best restaurants: fine dining, seafood, Italian, steakhouses, and more.",
        url: `${site.url}/restaurants`,
        type: "website",
    },
};

export default function RestaurantsPage() {
    const restaurants = getAllDocsByType("restaurant");

    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 bg-gradient-to-r from-amber-600 to-orange-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Where to Eat in Naples
                    </h1>
                    <p className="text-xl text-amber-100 max-w-2xl mx-auto">
                        From award-winning fine dining to hidden local gems—our curated guide to
                        Naples' best restaurants.
                    </p>
                </div>
            </section>

            {/* Restaurant Grid */}
            <section className="container mx-auto px-4 py-12 md:py-16">
                {restaurants.length > 0 ? (
                    <RestaurantGrid restaurants={restaurants as any} />
                ) : (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                            Coming Soon!
                        </h2>
                        <p className="text-gray-500">
                            We're curating the best restaurants in Naples. Check back soon!
                        </p>
                    </div>
                )}
            </section>

            {/* SEO Content */}
            <section className="container mx-auto px-4 py-12 border-t border-gray-200">
                <div className="max-w-3xl mx-auto prose prose-amber">
                    <h2>Naples Dining Guide</h2>
                    <p>
                        Naples, Florida is renowned for its exceptional dining scene, offering
                        everything from world-class seafood to authentic Italian cuisine. Whether
                        you're looking for a romantic waterfront dinner, a casual family meal, or
                        the freshest stone crab in Southwest Florida, our curated restaurant guides
                        help you find the perfect spot.
                    </p>
                    <p>
                        <strong>Popular dining neighborhoods:</strong> 5th Avenue South, 3rd Street
                        South, Crayton Cove, The Village on Venetian Bay, and Mercato.
                    </p>
                </div>
            </section>
        </main>
    );
}
