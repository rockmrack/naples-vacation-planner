"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/src/components/SafeImage";

const familyActivities = [
    {
        ageGroup: "Toddlers (0-4)",
        emoji: "👶",
        activities: [
            { name: "Naples Zoo", desc: "Walk-through safari with animal encounters", link: "/day-trips/naples-zoo" },
            { name: "Clam Pass Beach", desc: "Calm, shallow waters perfect for little ones", link: "/itineraries/naples-clam-pass-guide" },
            { name: "Sun-n-Fun Lagoon", desc: "Water park with toddler splash zones", link: "/day-trips" },
        ],
    },
    {
        ageGroup: "Kids (5-12)",
        emoji: "🧒",
        activities: [
            { name: "Everglades Airboat", desc: "Thrilling wildlife adventure", link: "/day-trips/everglades-from-naples" },
            { name: "Kayaking Ten Thousand Islands", desc: "Paddle through mangrove tunnels", link: "/itineraries/naples-kayaking-guide" },
            { name: "Naples Pier Fishing", desc: "Catch-and-release fun for all ages", link: "/itineraries" },
        ],
    },
    {
        ageGroup: "Teens (13-17)",
        emoji: "🧑",
        activities: [
            { name: "Jet Ski Tours", desc: "High-speed adventure on the Gulf", link: "/day-trips" },
            { name: "Stand-Up Paddleboarding", desc: "Explore coastline independently", link: "/itineraries" },
            { name: "Tin City Shopping", desc: "Boutiques, art galleries, and treats", link: "/itineraries/naples-tin-city-guide" },
        ],
    },
    {
        ageGroup: "Adults",
        emoji: "👨‍👩‍👧‍👦",
        activities: [
            { name: "Golf at Tiburón", desc: "Championship courses at Ritz-Carlton", link: "/itineraries/naples-golf-guide" },
            { name: "Fine Dining on 5th Ave", desc: "World-class culinary experiences", link: "/restaurants" },
            { name: "Spa Day", desc: "Rejuvenation at Naples' top spas", link: "/travel-tips/naples-spa-guide" },
        ],
    },
    {
        ageGroup: "Grandparents",
        emoji: "👴👵",
        activities: [
            { name: "Naples Botanical Garden", desc: "Leisurely strolls through tropical beauty", link: "/day-trips/naples-botanical-garden" },
            { name: "Third Street South", desc: "Upscale shopping and cafes", link: "/itineraries" },
            { name: "Sunset Cruise", desc: "Relaxing evening on the water", link: "/day-trips" },
        ],
    },
];

const multiGenTips = [
    { icon: "🏠", title: "Book a Villa", desc: "Private vacation homes with 5+ bedrooms for the whole family" },
    { icon: "👨‍🍳", title: "Hire a Private Chef", desc: "No cooking, no cleanup—just quality family time" },
    { icon: "🚐", title: "Arrange Transportation", desc: "Luxury vans for group outings without the hassle" },
    { icon: "📅", title: "Mix & Match Activities", desc: "Split up for age-appropriate fun, reunite for meals" },
];

export function MultiGenTripPlanner() {
    return (
        <section className="py-24 bg-gradient-to-b from-purple-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">
                        👨‍👩‍👧‍👦 Multi-Generational Travel
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Perfect for Every Generation
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Plan a reunion, celebrate a milestone, or simply enjoy quality time.
                        Naples offers something special for every age.
                    </p>
                </motion.div>

                {/* Age group cards */}
                <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                    {familyActivities.map((group, i) => (
                        <motion.div
                            key={group.ageGroup}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                        >
                            <span className="text-4xl mb-3 block">{group.emoji}</span>
                            <h3 className="font-bold text-gray-900 mb-4">{group.ageGroup}</h3>
                            <ul className="space-y-3">
                                {group.activities.map((activity) => (
                                    <li key={activity.name}>
                                        <Link
                                            href={activity.link}
                                            className="block p-2 -mx-2 rounded-lg hover:bg-purple-50 transition-colors"
                                        >
                                            <p className="font-medium text-gray-900 text-sm">{activity.name}</p>
                                            <p className="text-gray-500 text-xs">{activity.desc}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Tips section */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">
                        Pro Tips for Multi-Gen Travel
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        {multiGenTips.map((tip, i) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <span className="text-4xl mb-3 block">{tip.icon}</span>
                                <h4 className="font-bold text-white mb-2">{tip.title}</h4>
                                <p className="text-white/80 text-sm">{tip.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:shadow-xl transition-all"
                        >
                            Plan Our Family Reunion →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
