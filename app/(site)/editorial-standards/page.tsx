import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { FactCheckedBadge, AwardsBanner } from "@/src/components/UltimateTrust";

export const metadata: Metadata = {
    title: "Editorial Standards & Policies – Naples Vacation Planner",
    description:
        "Our rigorous commitment to accuracy, integrity, and transparency. How we fact-check, verify, and update our Naples travel guides.",
    alternates: {
        canonical: `${site.url}/editorial-standards`,
    },
};

export default function EditorialStandardsPage() {
    return (
        <>
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "Editorial Standards" }]} className="text-white/60 mb-8 justify-center" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Highest Quality Standards
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto mb-6">
                        Our Commitment to<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                            Accuracy & Integrity
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        In an era of generic content, we stand for proven expertise. Read about our rigorous
                        process for creating the web's most trusted Naples travel resources.
                    </p>
                </div>
            </section>

            {/* Quick Stats Grid */}
            <div className="bg-white border-b border-gray-200">
                <div className="section-container py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">✓</div>
                            <h3 className="font-bold text-gray-900">100% Verified</h3>
                            <p className="text-sm text-gray-500">Every location checked</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📅</div>
                            <h3 className="font-bold text-gray-900">Monthly Updates</h3>
                            <p className="text-sm text-gray-500">Always current info</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">👥</div>
                            <h3 className="font-bold text-gray-900">Human Written</h3>
                            <p className="text-sm text-gray-500">No AI-generated guides</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">🛡️</div>
                            <h3 className="font-bold text-gray-900">Unbiased</h3>
                            <p className="text-sm text-gray-500">Independent reviews</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <section className="section-container py-16">
                <div className="grid lg:grid-cols-[300px_1fr] gap-12 max-w-6xl mx-auto">

                    {/* Sidebar Nav */}
                    <div className="hidden lg:block sticky top-24 h-fit">
                        <nav className="space-y-1">
                            <a href="#verification" className="block px-4 py-3 rounded-lg bg-emerald-50 text-emerald-700 font-medium border border-emerald-100">
                                1. Verification Process
                            </a>
                            <a href="#updates" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                                2. Updates & Accuracy
                            </a>
                            <a href="#disclosure" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                                3. Affiliate Disclosure
                            </a>
                            <a href="#independence" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                                4. Editorial Independence
                            </a>
                            <a href="#corrections" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                                5. Corrections Policy
                            </a>
                        </nav>

                        <div className="mt-8 p-6 bg-gray-900 rounded-xl text-white">
                            <h4 className="font-bold mb-2">Have questions?</h4>
                            <p className="text-sm text-gray-400 mb-4">
                                Keep us accountable. If you see something wrong, let us know.
                            </p>
                            <Link href="/contact" className="text-sm font-bold text-emerald-400 hover:text-emerald-300">
                                Contact Editorial Team →
                            </Link>
                        </div>
                    </div>

                    {/* Main Text */}
                    <div className="prose prose-lg prose-slate max-w-none">
                        <section id="verification" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">1</span>
                                Research & Verification
                            </h2>
                            <p className="lead">
                                We believe travel advice should be verified in the real world, not scraped from the internet.
                            </p>
                            <h3>First-Hand Experience</h3>
                            <p>
                                Every restaurant, attraction, hotel, and experience we recommend has been personally visited
                                and evaluated by our team. We don't rely on press releases, marketing materials, or user-submitted
                                content without verification.
                            </p>
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-6 not-prose rounded-r-xl">
                                <h4 className="font-bold text-emerald-900 mb-2">Our "No Surprise" Guarantee</h4>
                                <p className="text-emerald-800 text-sm">
                                    We call venues to verify hours, check current prices, and confirm reservation policies so
                                    you don't show up to a closed door.
                                </p>
                            </div>
                        </section>

                        <hr className="my-12 border-gray-100" />

                        <section id="updates" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">2</span>
                                Updates & Maintenance
                            </h2>
                            <p>
                                Travel information changes fast. Our team operates on a strict monthly review cycle to ensure our
                                guides remain the most accurate on the web.
                            </p>
                            <ul>
                                <li><strong>Monthly Audits:</strong> We re-check operating hours and pricing for top attractions.</li>
                                <li><strong>Seasonal Refreshes:</strong> We update guides for "In-Season" (Winter) vs "Off-Season" (Summer) nuances.</li>
                                <li><strong>Real-time Alerts:</strong> We add alerts for temporary closures or renovation projects.</li>
                            </ul>
                        </section>

                        <hr className="my-12 border-gray-100" />

                        <section id="disclosure" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">3</span>
                                Transparency & Affiliates
                            </h2>
                            <p>
                                Naples Vacation Planner is a reader-supported publication. To keep our content free, we may earn
                                an affiliate commission when you book through our links.
                            </p>
                            <h3>How This Works</h3>
                            <p>
                                If you click a link to book a hotel on Booking.com or a tour on Viator, we may receive a small fee.
                                <strong>This comes at no extra cost to you</strong>—in fact, our partnerships often unlock special deals.
                            </p>
                            <p>
                                <Link href="/affiliate-disclosure" className="font-bold text-ocean-600 no-underline hover:underline">
                                    Read comprehensive affiliate disclosure →
                                </Link>
                            </p>
                        </section>

                        <hr className="my-12 border-gray-100" />

                        <section id="independence" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">4</span>
                                Editorial Independence
                            </h2>
                            <p>
                                <strong className="text-gray-900">We do not accept payment for positive reviews.</strong>
                            </p>
                            <p>
                                Businesses cannot pay to be featured in our "Best of" lists. If a place is in our guide, it's because
                                we genuinely believe it belongs there. We maintain a strict firewall between our editorial team
                                and any business partnerships.
                            </p>
                        </section>

                        <hr className="my-12 border-gray-100" />

                        <section id="corrections" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-sm">5</span>
                                Corrections Policy
                            </h2>
                            <p>
                                We are human, and sometimes we miss things. If you spot an error, we want to fix it immediately.
                            </p>
                            <p>
                                Please email <a href="mailto:corrections@naplesflvacationplanner.com" className="text-ocean-600 font-medium">corrections@naplesflvacationplanner.com</a>,
                                and our editor will verify and update the information, usually within 24 hours.
                            </p>
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}
