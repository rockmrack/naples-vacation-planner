import type { Metadata } from "next";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: `Privacy Policy for ${site.name}. Learn how we collect, use, and protect your personal information.`,
    alternates: {
        canonical: `${site.url}/privacy`,
    },
};

export default function PrivacyPage() {
    return (
        <div className="section-container py-12">
            <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-8">
                    Privacy Policy
                </h1>

                <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-gray-600 mb-8">
                        Your privacy is important to us. This policy explains what
                        information we collect and how we use it.
                    </p>

                    <p className="text-sm text-gray-500 mb-8">
                        Effective Date: {new Date().toLocaleDateString()}
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Information We Collect
                    </h2>

                    <h3 className="text-xl font-semibold mt-8 mb-3">
                        Automatically Collected Information
                    </h3>
                    <p>
                        When you visit our website, we may automatically collect certain
                        information about your device and browsing behavior, including:
                    </p>
                    <ul>
                        <li>IP address (anonymized)</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website</li>
                        <li>Device type and screen size</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-8 mb-3">
                        Information You Provide
                    </h3>
                    <p>
                        If you contact us through our contact form, we collect:
                    </p>
                    <ul>
                        <li>Your name</li>
                        <li>Email address</li>
                        <li>Message content</li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        How We Use Your Information
                    </h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li>Improve our website and content</li>
                        <li>Analyze traffic and user behavior</li>
                        <li>Respond to your inquiries</li>
                        <li>Ensure security and prevent fraud</li>
                    </ul>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Cookies and Tracking
                    </h2>
                    <p>
                        We use cookies and similar technologies to enhance your browsing
                        experience and analyze site traffic. This may include:
                    </p>
                    <ul>
                        <li>
                            <strong>Analytics cookies:</strong> Google Analytics (with IP
                            anonymization enabled)
                        </li>
                        <li>
                            <strong>Affiliate tracking:</strong> To attribute bookings made
                            through our affiliate links
                        </li>
                    </ul>
                    <p>
                        You can control cookies through your browser settings. Disabling
                        cookies may affect some site functionality.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Third-Party Links
                    </h2>
                    <p>
                        Our site contains links to third-party websites, including affiliate
                        partners. We are not responsible for the privacy practices of these
                        external sites. Please review their privacy policies before providing
                        any personal information.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Data Security
                    </h2>
                    <p>
                        We implement reasonable security measures to protect your
                        information. However, no method of transmission over the internet is
                        100% secure.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Your Rights
                    </h2>
                    <p>Depending on your location, you may have the right to:</p>
                    <ul>
                        <li>Access the personal data we hold about you</li>
                        <li>Request correction or deletion of your data</li>
                        <li>Object to or restrict processing</li>
                        <li>Data portability</li>
                    </ul>
                    <p>
                        To exercise these rights, please{" "}
                        <a href="/contact" className="text-ocean-600 hover:underline">
                            contact us
                        </a>
                        .
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Changes to This Policy
                    </h2>
                    <p>
                        We may update this privacy policy from time to time. The effective
                        date at the top of this page indicates when it was last revised.
                    </p>

                    <h2 className="text-2xl font-bold font-display mt-12 mb-4">
                        Contact Us
                    </h2>
                    <p>
                        If you have questions about this privacy policy, please{" "}
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
