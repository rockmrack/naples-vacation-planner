import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";

export const metadata: Metadata = {
    title: "Editorial Standards - Naples Vacation Planner",
    description:
        "Learn about our commitment to accuracy, transparency, and quality. Our editorial standards ensure every Naples travel guide is thoroughly researched and verified.",
    alternates: {
        canonical: `${site.url}/editorial-standards`,
    },
};

export default function EditorialStandardsPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-teal-500" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "Editorial Standards" }]} className="text-white/80 mb-8 justify-center" />

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Our Commitment to Quality
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto">
                        Editorial Standards
                    </h1>

                    <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        Transparency, accuracy, and honest recommendations are the foundation of everything we publish.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-container py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg prose-slate max-w-none">

                        {/* Mission Statement */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100 mb-12 not-prose">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Editorial Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Naples Vacation Planner is committed to providing <strong>the most accurate, helpful,
                                    and trustworthy travel information</strong> for visitors to Naples, Florida. We believe
                                travelers deserve honest, expert advice—not generic content designed to maximize ad revenue.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold font-display mt-12 mb-6">1. Content Research & Verification</h2>

                        <h3>First-Hand Experience</h3>
                        <p>
                            Every restaurant, attraction, hotel, and experience we recommend has been personally visited
                            and evaluated by our team. We don't rely on press releases, marketing materials, or user-submitted
                            content without verification.
                        </p>

                        <h3>Multiple Source Verification</h3>
                        <p>
                            For facts like operating hours, pricing, and seasonal availability, we verify information
                            through multiple sources: official websites, direct phone calls, and in-person visits
                            when possible.
                        </p>

                        <h3>Local Expert Review</h3>
                        <p>
                            All content is reviewed by at least one Naples-based team member to ensure local accuracy
                            and relevance. Our writers have combined 30+ years of Naples travel expertise.
                        </p>

                        <hr className="my-12" />

                        <h2 className="text-2xl font-bold font-display mb-6">2. Update & Accuracy Policy</h2>

                        <h3>Monthly Reviews</h3>
                        <p>
                            All published content undergoes a monthly review cycle. We check for:
                        </p>
                        <ul>
                            <li>Changed operating hours or seasonal closures</li>
                            <li>Updated pricing and fees</li>
                            <li>New ownership or significant changes</li>
                            <li>Temporary or permanent closures</li>
                        </ul>

                        <h3>Last Verified Dates</h3>
                        <p>
                            Every article displays a "Last Verified" date showing when the content was last reviewed
                            for accuracy. This helps you know how recent our information is.
                        </p>

                        <h3>Rapid Corrections</h3>
                        <p>
                            When we discover an error or receive a correction from readers, we update the content
                            within 24-48 hours. Significant corrections are noted at the top of the article.
                        </p>

                        <hr className="my-12" />

                        <h2 className="text-2xl font-bold font-display mb-6">3. Affiliate & Advertising Disclosure</h2>

                        <h3>Transparent Partnerships</h3>
                        <p>
                            Naples Vacation Planner earns revenue through affiliate partnerships with hotels, tour
                            operators, and travel services. When you book through our links, we may receive a
                            commission at no extra cost to you.
                        </p>

                        <div className="p-6 rounded-xl bg-amber-50 border border-amber-100 my-8 not-prose">
                            <h4 className="font-bold text-amber-800 mb-2">⚠️ Our Commitment</h4>
                            <p className="text-amber-700">
                                <strong>Affiliate relationships never influence our recommendations.</strong> We decide
                                what to recommend first, then check if affiliate options exist. If a non-affiliate
                                option is better, we recommend that instead.
                            </p>
                        </div>

                        <h3>Clear Disclosure</h3>
                        <p>
                            All articles containing affiliate links include a disclosure notice. Individual affiliate
                            links are marked with appropriate disclosures as required by FTC guidelines.
                        </p>

                        <p>
                            <Link href="/affiliate-disclosure" className="text-ocean-600 hover:underline">
                                Read our full affiliate disclosure →
                            </Link>
                        </p>

                        <hr className="my-12" />

                        <h2 className="text-2xl font-bold font-display mb-6">4. Independence & Objectivity</h2>

                        <h3>No Pay-for-Play</h3>
                        <p>
                            We do not accept payment in exchange for positive reviews or inclusion in our guides.
                            Businesses cannot pay to be featured or to have negative information removed.
                        </p>

                        <h3>Press Trips & Comped Visits</h3>
                        <p>
                            If a writer receives complimentary access, meals, or accommodations, this is disclosed
                            in the article. Acceptance of such hospitality does not guarantee positive coverage.
                        </p>

                        <h3>Editorial Independence</h3>
                        <p>
                            Our editorial team operates independently from our business partnerships. Advertisers
                            and affiliate partners have no input on our content recommendations.
                        </p>

                        <hr className="my-12" />

                        <h2 className="text-2xl font-bold font-display mb-6">5. Corrections & Feedback</h2>

                        <h3>Requesting Corrections</h3>
                        <p>
                            If you find an error in our content, please let us know immediately. We take accuracy
                            seriously and will investigate and correct verified errors promptly.
                        </p>

                        <h3>How to Contact Us</h3>
                        <p>
                            For corrections, feedback, or questions about our editorial policies:
                        </p>
                        <ul>
                            <li>
                                <Link href="/contact" className="text-ocean-600 hover:underline">
                                    Use our contact form
                                </Link>
                            </li>
                            <li>Email: editorial@{site.url.replace("https://", "").replace("http://", "")}</li>
                        </ul>

                        <hr className="my-12" />

                        <h2 className="text-2xl font-bold font-display mb-6">6. Author Qualifications</h2>

                        <p>
                            All Naples Vacation Planner writers meet the following criteria:
                        </p>
                        <ul>
                            <li>Demonstrated expertise in Florida/Gulf Coast travel</li>
                            <li>Personal experience visiting Naples and surrounding areas</li>
                            <li>Professional writing experience or relevant certifications</li>
                            <li>Commitment to our editorial standards</li>
                        </ul>

                        <p>
                            <Link href="/authors" className="text-ocean-600 hover:underline">
                                Meet our team of travel experts →
                            </Link>
                        </p>
                    </div>

                    {/* Questions Section */}
                    <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-ocean-50/30 border border-gray-100 text-center">
                        <span className="text-4xl mb-4 block">💬</span>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Questions About Our Standards?</h2>
                        <p className="text-gray-600 mb-6">
                            We're happy to discuss our editorial policies with readers, journalists, or industry partners.
                        </p>
                        <Link href="/contact" className="btn-primary">
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
