import { Metadata } from "next";
import { MembershipPricing, ExclusiveBadge } from "@/src/components/Membership";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Naples Insider Membership: Exclusive Guides & Perks",
    description: "Unlock exclusive Naples travel guides, insider tips, downloadable resources, and premium concierge services with our membership plans.",
};

export default function MembershipPage() {
    const testimonials = [
        {
            quote: "The insider tips saved us hours of research. Worth every penny!",
            author: "Sarah M.",
            location: "Chicago, IL",
        },
        {
            quote: "The VIP concierge got us into restaurants we couldn't book ourselves.",
            author: "Michael & Lisa",
            location: "Boston, MA",
        },
        {
            quote: "Best investment for our Naples vacation planning.",
            author: "Jennifer P.",
            location: "New York, NY",
        },
    ];

    const exclusiveContent = [
        { title: "Secret Beach Parking Guide", badge: "premium" as const },
        { title: "Restaurant Reservation Insider Tips", badge: "premium" as const },
        { title: "Local-Only Experiences Map", badge: "premium" as const },
        { title: "Off-Season Deals Calendar", badge: "premium" as const },
        { title: "Personal Trip Planning Session", badge: "vip" as const },
        { title: "Priority Restaurant Reservations", badge: "vip" as const },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/patterns/waves.svg')] opacity-10" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Become a Naples Insider
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8">
                        Unlock exclusive guides, insider tips, and personalized trip planning
                    </p>
                    <a
                        href="#pricing"
                        className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        View Plans →
                    </a>
                </div>
            </section>

            {/* What You Get */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        What's Included
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {exclusiveContent.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl"
                            >
                                <span className="font-medium text-gray-900">{item.title}</span>
                                <ExclusiveBadge tier={item.badge} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <div id="pricing">
                <MembershipPricing />
            </div>

            {/* Testimonials */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">
                        What Our Members Say
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-6">
                                <p className="text-lg text-white/90 mb-4 italic">"{t.quote}"</p>
                                <p className="font-semibold">{t.author}</p>
                                <p className="text-sm text-white/60">{t.location}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
                            <p className="text-gray-600">Yes! All paid memberships can be cancelled at any time. You'll retain access until the end of your billing period.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-2">What's the refund policy?</h3>
                            <p className="text-gray-600">We offer a 7-day money-back guarantee. If you're not satisfied within the first 7 days, we'll refund your payment in full.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-2">Can I upgrade my plan later?</h3>
                            <p className="text-gray-600">Absolutely! You can upgrade from Insider to VIP at any time. We'll prorate your existing subscription.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Plan Like a Local?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of travelers who've unlocked the best of Naples.
                    </p>
                    <a
                        href="#pricing"
                        className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Get Started Today
                    </a>
                </div>
            </section>
        </>
    );
}
