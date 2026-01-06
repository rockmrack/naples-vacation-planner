"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/src/components/SafeImage";

const wellnessCategories = [
    {
        title: "World-Class Spas",
        description: "Award-winning spa experiences at Naples' finest resorts",
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        items: [
            { name: "The Spa at The Ritz-Carlton", highlight: "Forbes 5-Star" },
            { name: "Spa at Naples Grande", highlight: "AAA Diamond" },
            { name: "The Spa at LaPlaya", highlight: "Beach Access" },
        ],
        link: "/travel-tips/naples-spa-guide",
    },
    {
        title: "Medical Wellness",
        description: "Longevity clinics and regenerative medicine",
        image: "/images/placeholders/naples_clam_pass_boardwalk_4k.jpg",
        items: [
            { name: "Age Management Institute", highlight: "Anti-Aging" },
            { name: "Naples Wellness Center", highlight: "IV Therapy" },
            { name: "Functional Medicine Specialists", highlight: "Holistic" },
        ],
        link: "/travel-tips/wellness-retreats",
    },
    {
        title: "Fitness & Yoga",
        description: "Beach yoga, personal training, and fitness retreats",
        image: "/images/placeholders/naples-beach-yoga-morning.jpg",
        items: [
            { name: "Sunrise Beach Yoga", highlight: "Daily Classes" },
            { name: "Private Beachfront Training", highlight: "1-on-1" },
            { name: "Naples Fitness Retreats", highlight: "Multi-Day" },
        ],
        link: "/itineraries/naples-beach-yoga-fitness",
    },
    {
        title: "Healthy Dining",
        description: "Farm-to-table and organic culinary experiences",
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
        items: [
            { name: "True Food Kitchen", highlight: "Anti-Inflammatory" },
            { name: "Seed to Table", highlight: "Organic Market" },
            { name: "Private Chef (Wellness Menu)", highlight: "Customized" },
        ],
        link: "/restaurants",
    },
];

const wellnessFeatures = [
    { icon: "🧘", title: "Daily Yoga", desc: "Beach & studio sessions" },
    { icon: "💆", title: "Spa Treatments", desc: "5-star wellness centers" },
    { icon: "🥗", title: "Clean Eating", desc: "Organic & farm-to-table" },
    { icon: "🏃", title: "Active Adventures", desc: "Kayaking, cycling, hiking" },
    { icon: "🧬", title: "Longevity", desc: "Anti-aging protocols" },
    { icon: "🌿", title: "Nature Therapy", desc: "Forest bathing & preserves" },
];

export function WellnessHub() {
    return (
        <section className="py-24 bg-gradient-to-b from-teal-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-bold uppercase tracking-wider mb-4">
                        🧘 Wellness & Longevity
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        Rejuvenate in Paradise
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Naples has emerged as a premier wellness destination. Experience world-class spas,
                        medical wellness, and holistic healing in a serene coastal setting.
                    </p>
                </motion.div>

                {/* Wellness Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-16">
                    {wellnessFeatures.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                        >
                            <span className="text-3xl mb-2 block">{feature.icon}</span>
                            <h3 className="font-bold text-gray-900 text-sm">{feature.title}</h3>
                            <p className="text-gray-500 text-xs">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Wellness Categories */}
                <div className="grid md:grid-cols-2 gap-8">
                    {wellnessCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100"
                        >
                            <div className="relative h-52 overflow-hidden">
                                <SafeImage
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                            </div>
                            <div className="p-8 -mt-8 relative">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                                <p className="text-gray-600 mb-4">{cat.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {cat.items.map((item) => (
                                        <li key={item.name} className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700">{item.name}</span>
                                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">
                                                {item.highlight}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={cat.link}
                                    className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                                >
                                    Explore More →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-12"
                >
                    <h3 className="text-3xl font-bold text-white mb-4">
                        Create Your Wellness Retreat
                    </h3>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Our wellness concierge can design a personalized retreat combining spa, fitness,
                        nutrition, and nature for your ultimate rejuvenation.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 font-bold rounded-xl hover:shadow-xl transition-all"
                    >
                        Design My Wellness Retreat →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
