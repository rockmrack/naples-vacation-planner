import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: `Terms of Service for ${site.name}. Please read these terms carefully before using our website.`,
    alternates: {
        canonical: `${site.url}/terms`,
    },
};

export default function TermsPage() {
    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Terms of Service" }]} />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-8">
                    Terms of Service
                </h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-gray-600 mb-8">
                        By using {site.name}, you agree to these terms. Please read them
                        carefully.
                    </p>

                    <p className="text-sm text-gray-500 mb-8">
                        Effective Date: {new Date().toLocaleDateString()}
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        1. Acceptance of Terms
                    </h2>
                    <p>
                        By accessing and using this website, you accept and agree to be bound
                        by these Terms of Service. If you do not agree to these terms, please
                        do not use our website.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        2. Use of Content
                    </h2>
                    <p>
                        All content on this website—including text, images, graphics, and
                        other materials—is owned by {site.name} or its content suppliers and
                        is protected by copyright laws.
                    </p>
                    <p>You may:</p>
                    <ul>
                        <li>View and print content for personal, non-commercial use</li>
                        <li>Share links to our content</li>
                    </ul>
                    <p>You may not:</p>
                    <ul>
                        <li>Reproduce, distribute, or republish content without permission</li>
                        <li>Use content for commercial purposes without authorization</li>
                        <li>Remove copyright or proprietary notices</li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        3. Travel Information Disclaimer
                    </h2>
                    <p>
                        The travel information provided on this website is for general
                        informational purposes only. While we strive for accuracy:
                    </p>
                    <ul>
                        <li>
                            We are not a travel agency and do not guarantee availability,
                            pricing, or service quality of third-party providers
                        </li>
                        <li>
                            Hours, prices, and availability of attractions, restaurants, and
                            accommodations may change without notice
                        </li>
                        <li>
                            Seasonal conditions, weather, and local events may affect your
                            travel plans
                        </li>
                        <li>
                            Always verify critical information directly with service providers
                            before booking
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        4. Affiliate Links
                    </h2>
                    <p>
                        This website contains affiliate links to third-party products and
                        services. When you click these links and make a purchase, we may earn
                        a commission. This does not affect the price you pay.
                    </p>
                    <p>
                        See our{" "}
                        <a
                            href="/affiliate-disclosure"
                            className="text-ocean-600 hover:underline"
                        >
                            Affiliate Disclosure
                        </a>{" "}
                        for more details.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        5. Third-Party Websites
                    </h2>
                    <p>
                        Our website contains links to external sites that are not operated by
                        us. We have no control over the content and practices of these sites
                        and cannot accept responsibility for their privacy policies or
                        practices.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        6. Limitation of Liability
                    </h2>
                    <p>
                        To the fullest extent permitted by law, {site.name} shall not be
                        liable for any indirect, incidental, special, consequential, or
                        punitive damages arising from your use of this website or reliance on
                        any information provided.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        7. Changes to Terms
                    </h2>
                    <p>
                        We reserve the right to modify these terms at any time. Continued use
                        of the website after changes constitutes acceptance of the new terms.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        8. Contact Us
                    </h2>
                    <p>
                        If you have questions about these terms, please{" "}
                        <a href="/contact" className="text-ocean-600 hover:underline">
                            contact us
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
