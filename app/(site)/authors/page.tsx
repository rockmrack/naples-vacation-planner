import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/src/config/site";
import { Breadcrumbs } from "@/src/components/Breadcrumbs";
import { AuthorBio } from "@/src/components/AuthorBio";
import { getAllAuthors } from "@/src/lib/authors";

export const metadata: Metadata = {
    title: "Meet Our Travel Experts - Naples Vacation Planner",
    description:
        "Meet the expert travel team behind Naples Vacation Planner. Our local experts and certified travel writers bring you thoroughly researched Naples travel guides.",
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
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-600 via-teal-500 to-palm-500" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative elements */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-palm-300/20 rounded-full blur-3xl" />

                <div className="relative section-container text-center">
                    <Breadcrumbs items={[{ label: "Our Experts" }]} className="text-white/80 mb-8 justify-center" />

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
                        <span className="text-lg">👥</span>
                        {authors.length} Expert Writers
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight max-w-4xl mx-auto">
                        Meet Our Travel Experts
                    </h1>

                    <p className="mt-6 text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                        Our team of Naples locals and certified travel professionals brings you
                        thoroughly researched, personally verified travel advice.
                    </p>
                </div>
            </section>

            {/* Individual Authors */}
            <section className="section-container py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl lg:text-3xl font-bold font-display text-gray-900">
                        Our Expert Writers
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Get to know the people behind our trusted travel guides
                    </p>
                </div>

                <div className="space-y-8">
                    {individualAuthors.map((author) => (
                        <AuthorBio key={author.slug} author={author} variant="full" showCredentials={true} showSocial={true} />
                    ))}
                </div>
            </section>

            {/* Editorial Team */}
            {editorialTeam && (
                <section className="py-16 bg-gradient-to-br from-gray-50 to-ocean-50/30">
                    <div className="section-container">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl lg:text-3xl font-bold font-display text-gray-900">
                                The Editorial Team
                            </h2>
                            <p className="mt-2 text-gray-600">
                                Collective expertise backing every guide we publish
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <AuthorBio author={editorialTeam} variant="full" showCredentials={true} showSocial={false} />
                        </div>
                    </div>
                </section>
            )}

            {/* Our Standards */}
            <section className="section-container py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold font-display text-gray-900 mb-6">
                        Why Trust Our Team?
                    </h2>

                    <div className="grid sm:grid-cols-3 gap-6 mt-8">
                        <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-100">
                            <span className="text-3xl mb-3 block">✅</span>
                            <h3 className="font-bold text-gray-900 mb-2">Verified Experts</h3>
                            <p className="text-sm text-gray-600">
                                All writers have verified credentials and demonstrated expertise in Florida travel.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-ocean-50 to-white border border-ocean-100">
                            <span className="text-3xl mb-3 block">📍</span>
                            <h3 className="font-bold text-gray-900 mb-2">Local Knowledge</h3>
                            <p className="text-sm text-gray-600">
                                Our team lives in Naples and personally visits every place we recommend.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                            <span className="text-3xl mb-3 block">🏆</span>
                            <h3 className="font-bold text-gray-900 mb-2">Years of Experience</h3>
                            <p className="text-sm text-gray-600">
                                Combined 30+ years of professional travel writing and destination expertise.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <Link href="/editorial-standards" className="text-ocean-600 hover:text-ocean-700 font-medium">
                            Read our editorial standards →
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="section-container text-center">
                    <h2 className="text-2xl lg:text-3xl font-bold font-display text-white mb-4">
                        Ready to Plan Your Naples Trip?
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                        Explore our expertly crafted itineraries and guides, written by locals who know Naples best.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/itineraries" className="btn-primary">
                            Browse Itineraries
                        </Link>
                        <Link href="/about" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
                            About Our Mission
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
