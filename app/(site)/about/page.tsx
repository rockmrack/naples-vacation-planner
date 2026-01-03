import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Naples Vacation Planner—your trusted source for Naples, Florida travel guides, itineraries, and local insights.",
    alternates: {
        canonical: `${site.url}/about`,
    },
};

export default function AboutPage() {
    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "About" }]} />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-8">
                    About Naples Vacation Planner
                </h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-xl text-gray-600 mb-8">
                        We&apos;re passionate about helping travelers discover the magic of
                        Naples, Florida—from pristine Gulf beaches to the wild Everglades.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Our Mission
                    </h2>
                    <p>
                        Naples Vacation Planner was created with one goal: to help first-time
                        visitors, families, couples, and nature lovers plan the perfect
                        Southwest Florida getaway.
                    </p>
                    <p>
                        Unlike generic travel sites with endless lists, we focus on
                        actionable, day-by-day itineraries and honest, local insights. Every
                        guide is researched with care and updated regularly to reflect
                        seasonal changes and new experiences.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        What We Offer
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            <strong>Curated Itineraries:</strong> 2-day weekend escapes to
                            week-long adventures, tailored to different travel styles.
                        </li>
                        <li>
                            <strong>Neighborhood Guides:</strong> Honest breakdowns of where to
                            stay—from walkable Old Naples to beachfront Vanderbilt.
                        </li>
                        <li>
                            <strong>Day Trip Guides:</strong> Practical guides to Marco Island,
                            Everglades City, and beyond.
                        </li>
                        <li>
                            <strong>Seasonal Advice:</strong> When to visit, what to expect,
                            and how to make the most of Naples year-round.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        How We Make Money
                    </h2>
                    <p>
                        We use affiliate links to tours, hotels, and car rentals. When you
                        book through our links, we may earn a small commission at no extra
                        cost to you. This supports our work and allows us to keep creating
                        free travel content.
                    </p>
                    <p>
                        We only recommend experiences and accommodations we genuinely believe
                        in. Our editorial integrity is not for sale.
                    </p>
                    <p>
                        <a
                            href="/affiliate-disclosure"
                            className="text-ocean-600 hover:underline"
                        >
                            Read our full affiliate disclosure →
                        </a>
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Contact Us
                    </h2>
                    <p>
                        Have questions, feedback, or partnership inquiries? We&apos;d love to
                        hear from you.
                    </p>
                    <p>
                        <a href="/contact" className="text-ocean-600 hover:underline">
                            Get in touch →
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
