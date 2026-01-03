import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Affiliate Disclosure",
    description:
        "Learn how Naples Vacation Planner uses affiliate links and how we maintain editorial integrity.",
    alternates: {
        canonical: `${site.url}/affiliate-disclosure`,
    },
};

export default function AffiliateDisclosurePage() {
    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Affiliate Disclosure" }]} />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-8">
                    Affiliate Disclosure
                </h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-xl text-gray-600 mb-8">
                        Transparency matters to us. Here&apos;s how we use affiliate links and
                        maintain our editorial integrity.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        What Are Affiliate Links?
                    </h2>
                    <p>
                        Some links on {site.name} are "affiliate links." This means if you
                        click on a link and make a purchase or booking, we may receive a
                        small commission from the company at no additional cost to you.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Our Affiliate Partners
                    </h2>
                    <p>We currently partner with the following affiliate programs:</p>
                    <ul>
                        <li>
                            <strong>Viator</strong> – Tours, activities, and experiences
                        </li>
                        <li>
                            <strong>Booking.com</strong> – Hotel reservations
                        </li>
                        <li>
                            <strong>GetYourGuide</strong> – Tours and activities
                        </li>
                        <li>
                            <strong>Car rental comparison sites</strong> – Vehicle rentals
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Our Editorial Standards
                    </h2>
                    <p>
                        Our recommendations are based on genuine research and, where
                        possible, personal experience. We only recommend products, services,
                        and experiences we believe will provide value to our readers.
                    </p>
                    <p>
                        <strong>Important:</strong> Affiliate relationships never influence
                        our editorial content or recommendations. We will never:
                    </p>
                    <ul>
                        <li>Recommend a product or service solely because it offers a commission</li>
                        <li>Publish misleading content to drive affiliate sales</li>
                        <li>Hide the fact that a link is an affiliate link</li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        How to Identify Affiliate Links
                    </h2>
                    <p>
                        Affiliate links on our site are typically accompanied by a disclosure
                        note. We also mark affiliate links with attributes that indicate
                        their sponsored nature.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Why We Use Affiliate Links
                    </h2>
                    <p>
                        Creating high-quality travel content takes time and resources.
                        Affiliate commissions help us:
                    </p>
                    <ul>
                        <li>Keep all our guides free to read</li>
                        <li>Research and update content regularly</li>
                        <li>Avoid intrusive advertising that degrades user experience</li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Questions?
                    </h2>
                    <p>
                        If you have any questions about our affiliate relationships, please{" "}
                        <a href="/contact" className="text-ocean-600 hover:underline">
                            contact us
                        </a>
                        .
                    </p>

                    <p className="mt-12 text-sm text-gray-500">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
