import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { AuthorBio } from "@/src/components/AuthorBio";
import { getAllAuthors } from "@/src/lib/authors";
import { FactCheckedBadge } from "@/src/components/UltimateTrust";

export const metadata: Metadata = {
    title: "Our Travel Experts – Naples Vacation Planner",
    description:
        "Meet our verified team of Naples locals and certified travel writers. Expert, unbiased, and fact-checked Florida travel advice.",
    alternates: {
        canonical: `${site.url}/authors`,
    },
};

export default function AuthorsPage() {
    const authors = getAllAuthors();
    const individualAuthors = authors.filter(a => a.slug !== "editorial-team");
    const editorialTeam = authors.find(a => a.slug === "editorial-team");

    return (
        <>
            {/* Hero Section - Enterprise Grade */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "Our Experts" }]} className="text-white/60 mb-8 justify-center" />

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/10">
                        <span className="text-lg">✒️</span>
                        Certified Travel Writers
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto mb-6">
                        Meet Our<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                            Local Experts
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        Real locals. Real experience. Our team of certified travel writers brings you
                        thoroughly researched, personally verified travel advice.
                    </p>
                </div>
            </section>

            {/* Individual Authors */}
            <section className="section-container py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold font-display text-gray-900 mb-4">
                        Senior Travel Writers
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Get to know the experts dedicated to helping you plan the perfect trip.
                    </p>
                </div>

                <div className="grid gap-12 max-w-5xl mx-auto">
                    {individualAuthors.map((author) => (
                        <div key={author.slug} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg shadow-gray-200/50">
                            <AuthorBio author={author} variant="full" showCredentials={true} showSocial={true} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Editorial Team */}
            {editorialTeam && (
                <section className="py-20 bg-gray-50 border-t border-gray-200">
                    <div className="section-container">
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                            <div>
                                <h2 className="text-3xl font-bold font-display text-gray-900 mb-6">
                                    The Editorial Team
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Behind every article is our rigorous editorial process. Our editorial team ensures
                                    every piece of content is accurate, up-to-date, and meets our strict quality standards.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Triple-checked for accuracy</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Monthly fact-checking updates</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-700">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>Unbiased editorial independence</span>
                                    </li>
                                </ul>
                                <Link href="/editorial-standards" className="btn-secondary">
                                    Read Editorial Policy
                                </Link>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md">
                                <AuthorBio author={editorialTeam} variant="compact" showCredentials={false} showSocial={false} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Trust Us - Enterprise Level */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="section-container">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold font-display text-white mb-6">
                            Industry Recognition & Trust
                        </h2>
                        <p className="text-gray-400">
                            Our team's work has been featured in major travel publications and verified by industry leaders.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                            <span className="text-4xl mb-4 block">🏆</span>
                            <h3 className="font-bold text-white mb-2 text-lg">Award Winning</h3>
                            <p className="text-sm text-gray-400">
                                Recognized for excellence in travel writing and digital guide creation.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                            <span className="text-4xl mb-4 block">🛡️</span>
                            <h3 className="font-bold text-white mb-2 text-lg">Verified Experts</h3>
                            <p className="text-sm text-gray-400">
                                Our writers hold certifications from top tourism boards and organizations.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors">
                            <span className="text-4xl mb-4 block">🌟</span>
                            <h3 className="font-bold text-white mb-2 text-lg">Community Trusted</h3>
                            <p className="text-sm text-gray-400">
                                Trusted by over 12,000 yearly travelers to plan their Florida vacations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
