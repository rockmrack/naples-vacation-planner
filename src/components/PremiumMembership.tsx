"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const membershipTiers = [
    {
        name: "Insider",
        price: "Free",
        period: "",
        description: "Essential Naples travel intelligence",
        features: [
            "60+ curated itineraries",
            "Restaurant & hotel guides",
            "Weekly Naples Insider newsletter",
            "Basic trip planning tools",
        ],
        cta: "Get Started",
        ctaLink: "/plan",
        featured: false,
    },
    {
        name: "Premium",
        price: "$49",
        period: "/month",
        description: "For the discerning traveler",
        features: [
            "Everything in Insider",
            "Priority restaurant reservations",
            "Exclusive partner discounts",
            "Concierge chat support",
            "Personalized trip planning",
            "Ad-free experience",
        ],
        cta: "Start Free Trial",
        ctaLink: "/contact",
        featured: true,
        badge: "MOST POPULAR",
    },
    {
        name: "Concierge",
        price: "$299",
        period: "/trip",
        description: "White-glove planning service",
        features: [
            "Everything in Premium",
            "Dedicated travel advisor",
            "Full itinerary creation",
            "All bookings handled",
            "On-trip 24/7 support",
            "VIP upgrades & access",
        ],
        cta: "Contact Us",
        ctaLink: "/contact",
        featured: false,
    },
];

const benefits = [
    { icon: "🎫", title: "Exclusive Access", desc: "Hard-to-book restaurants & experiences" },
    { icon: "💬", title: "Concierge Support", desc: "Real humans, real-time help" },
    { icon: "🏷️", title: "Member Discounts", desc: "Up to 20% at partner properties" },
    { icon: "📱", title: "Priority Service", desc: "Skip the lines, get the upgrades" },
];

export function PremiumMembership() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 text-amber-300 text-sm font-bold uppercase tracking-wider mb-4">
                        <span>✨</span>
                        Membership
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Elevate Your Naples Experience
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From free planning tools to white-glove concierge service.
                        Choose the level that matches your travel style.
                    </p>
                </motion.div>

                {/* Benefits bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-4"
                        >
                            <span className="text-3xl mb-2 block">{benefit.icon}</span>
                            <h3 className="font-bold text-white text-sm">{benefit.title}</h3>
                            <p className="text-gray-500 text-xs">{benefit.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {membershipTiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-3xl p-8 ${tier.featured
                                    ? "bg-gradient-to-b from-amber-500/10 to-amber-600/5 border-2 border-amber-500/50"
                                    : "bg-gray-800/50 border border-gray-700/50"
                                }`}
                        >
                            {tier.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                    {tier.badge}
                                </span>
                            )}
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                                    <span className="text-gray-400">{tier.period}</span>
                                </div>
                                <p className="text-gray-400 text-sm">{tier.description}</p>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <span className="text-emerald-400 mt-0.5">✓</span>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={tier.ctaLink}
                                className={`block w-full py-3 rounded-xl font-bold text-center transition-all ${tier.featured
                                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/20"
                                        : "bg-gray-700 text-white hover:bg-gray-600"
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-gray-500 text-sm mt-8"
                >
                    All memberships include our satisfaction guarantee. Cancel anytime.
                </motion.p>
            </div>
        </section>
    );
}
