import { Metadata } from "next";
import { getAllDocsByType } from "@/src/lib/content";
import { site } from "@/src/config/site";
import EventGrid from "@/src/components/EventGrid";

export const metadata: Metadata = {
    title: `Naples Events Calendar 2026 | Festivals, Art Shows & More | ${site.name}`,
    description:
        "Discover Naples, Florida events including art shows, festivals, farmers markets, concerts, and holiday celebrations. Your complete guide to what's happening in Naples.",
    openGraph: {
        title: `Naples Events Calendar 2026 | ${site.name}`,
        description: "Your complete calendar of Naples festivals, art shows, farmers markets, and special events.",
        type: "website",
        url: `${site.url}/events`,
    },
};

export default function EventsPage() {
    const allEvents = getAllDocsByType("event");
    // Filter and cast events that have event-specific properties
    const events = allEvents.filter(e =>
        'eventName' in e.frontmatter &&
        'category' in e.frontmatter &&
        'startDate' in e.frontmatter
    ) as unknown as Parameters<typeof EventGrid>[0]['events'];

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-ocean-700 to-ocean-900 text-white py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Naples Events Calendar
                    </h1>
                    <p className="text-xl text-ocean-100 max-w-2xl mx-auto">
                        Art shows, festivals, farmers markets, concerts, and more.
                        Discover what's happening during your Naples vacation.
                    </p>
                </div>
            </section>

            {/* Event Grid */}
            <section className="container mx-auto px-4 py-12">
                {events.length > 0 ? (
                    <EventGrid events={events} />
                ) : (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Events Coming Soon!
                        </h2>
                        <p className="text-gray-600 max-w-lg mx-auto">
                            We're curating the best Naples events for you. Check back soon for
                            art shows, festivals, farmers markets, and seasonal celebrations.
                        </p>
                    </div>
                )}
            </section>

            {/* SEO Content */}
            <section className="bg-white py-12 border-t">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Naples Festival & Events Guide
                    </h2>
                    <div className="prose prose-lg">
                        <p>
                            Naples, Florida hosts a vibrant calendar of events throughout the year.
                            From world-class art shows in Cambier Park to the legendary Third Street
                            South Farmers Market, there's always something happening in Paradise.
                        </p>

                        <h3>Popular Annual Events</h3>
                        <ul>
                            <li><strong>Naples New Year's Art Fair</strong> - Kicks off the year with 200+ artists in Cambier Park</li>
                            <li><strong>Naples International Film Festival</strong> - October showcase of independent films</li>
                            <li><strong>Naples Craft Beer Fest</strong> - March celebration at Bayfront</li>
                            <li><strong>Cars on 5th</strong> - World-class car show on 5th Avenue South</li>
                            <li><strong>Holiday Tree Lighting</strong> - Annual downtown celebration with snowfall</li>
                        </ul>

                        <h3>Weekly Markets</h3>
                        <p>
                            The Third Street South Farmers Market runs every Saturday morning year-round,
                            featuring local produce, artisan foods, and handcrafted goods. The Vanderbilt
                            Farmers Market is the area's largest, open seasonally with 70+ vendors.
                        </p>

                        <h3>Plan Your Visit</h3>
                        <p>
                            Peak season for Naples events runs from November through April, when the
                            weather is ideal and snowbirds return. Book accommodations early for major
                            events like the art fairs and film festival.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
