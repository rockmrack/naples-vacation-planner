"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/src/components/SafeImage";

const privateExperiences = [
    {
        id: "yacht-keewaydin",
        title: "Private Yacht Charter to Keewaydin Island",
        description: "Secluded island paradise accessible only by boat. Includes gourmet picnic, champagne, and professional captain.",
        price: "From $2,500",
        duration: "Full Day",
        image: "/images/placeholders/naples_beach_aerial_4k.jpg",
        category: "Boating",
        exclusive: true,
    },
    {
        id: "private-chef",
        title: "In-Villa Private Chef Experience",
        description: "Michelin-trained chef prepares a 7-course tasting menu in your vacation home. Wine pairings included.",
        price: "From $1,200",
        duration: "Evening",
        image: "/images/placeholders/old_naples_5th_avenue_4k.jpg",
        category: "Culinary",
        exclusive: true,
    },
    {
        id: "helicopter-tour",
        title: "Sunset Helicopter Tour",
        description: "Soar over Naples, Marco Island, and the Ten Thousand Islands. Champagne toast at sunset.",
        price: "From $800",
        duration: "90 min",
        image: "/images/placeholders/naples_pier_sunset_4k.jpg",
        category: "Adventure",
        exclusive: true,
    },
    {
        id: "everglades-private",
        title: "Private Everglades Safari",
        description: "VIP airboat tour with wildlife biologist. No crowds, exclusive access areas, gourmet lunch.",
        price: "From $1,500",
        duration: "Half Day",
        image: "/images/placeholders/everglades_airboat_action_4k.jpg",
        category: "Nature",
        exclusive: true,
    },
    {
        id: "golf-experience",
        title: "Ultimate Golf Day at Tiburón",
        description: "Play both Greg Norman courses at The Ritz-Carlton. Includes caddie, lunch, and pro shop credit.",
        price: "From $750",
        duration: "Full Day",
        image: "/images/placeholders/naples-championship-golf-course.jpg",
        category: "Golf",
        exclusive: false,
    },
    {
        id: "spa-retreat",
        title: "Full-Day Spa Sanctuary",
        description: "8-hour wellness journey at Naples' top spa. Includes massage, facial, body treatment, and healthy cuisine.",
        price: "From $1,000",
        duration: "Full Day",
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        category: "Wellness",
        exclusive: false,
    },
];

export function PrivateExperienceMarketplace() {
    return (
        <section className="py-24 bg-gray-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 text-amber-300 text-sm font-bold uppercase tracking-wider mb-4">
                        <span>👑</span>
                        Exclusive Access
                    </span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Private Experiences
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Curated luxury experiences unavailable to the general public.
                        <span className="text-amber-400"> Privacy is the ultimate luxury.</span>
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {privateExperiences.map((exp, i) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all backdrop-blur-sm"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <SafeImage
                                    src={exp.image}
                                    alt={exp.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                                {exp.exclusive && (
                                    <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                        EXCLUSIVE
                                    </span>
                                )}
                                <span className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
                                    {exp.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                                    {exp.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {exp.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-amber-400 font-bold text-lg">{exp.price}</span>
                                        <span className="text-gray-500 text-sm ml-2">/ {exp.duration}</span>
                                    </div>
                                    <Link
                                        href="/contact"
                                        className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-colors border border-amber-500/30"
                                    >
                                        Inquire →
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400 mb-4">Looking for something not listed here?</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-amber-500/20 transition-all"
                    >
                        Request Custom Experience
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            →
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
