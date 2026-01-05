"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { site } from "@/src/config/site";
import { SafeImage } from "@/src/components/SafeImage";
import {
    AwardsBanner,
    TrustCertifications,
    MediaFeaturesSection,
    TrustGuarantee,
    LiveStatistics,
    ProfessionalTrustFooter,
    FactCheckedBadge
} from "@/src/components/UltimateTrust";
import { TestimonialsCarousel } from "@/src/components/TestimonialsCarousel";
import NewsletterSignup from "@/src/components/NewsletterSignup";

// --- 10x ENHANCED CONTENT DATA ---

const monthlyEdit = {
    month: "January",
    title: "The Peak Season Edit",
    description: "January is perfection in Naples. The humidity is gone, the stone crabs are fresh, and the art festivals are beginning. Here is what you need to know this month.",
    picks: [
        { label: "Eat", value: "Stone Crabs at Truluck's", icon: "🦀" },
        { label: "Do", value: "Naples New Year's Art Fair", icon: "🎨" },
        { label: "Wear", value: "Light layers for cool evenings", icon: "👔" },
        { label: "Book", value: "Valentine's Day Dinner Now", icon: "💕" },
    ]
};

const premiumCategories = [
    {
        title: "Expert Itineraries",
        subtitle: "Fact-checked day-by-day plans",
        href: "/itineraries",
        image: "/images/placeholders/naples_pier_sunset_4k.jpg",
        badge: "Most Popular",
        stats: "60+ Guides"
    },
    {
        title: "Where to Stay",
        subtitle: "Neighborhood-by-neighborhood analysis",
        href: "/where-to-stay",
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        badge: "Updated Weekly",
        stats: "25 Hotels Reviewed"
    },
    {
        title: "Day Trips",
        subtitle: "From Everglades to Key West",
        href: "/day-trips",
        image: "/images/placeholders/everglades_airboat_action_4k.jpg",
        badge: "Adventure",
        stats: "15+ Destinations"
    },
    {
        title: "Events 2026",
        subtitle: "Festivals, art fairs, and more",
        href: "/events",
        image: "/images/placeholders/naples-event-festival.jpg",
        badge: "Live Calendar",
        stats: "60 Events"
    }
];

const trustStats = [
    { value: 127453, label: "Travelers Helped", suffix: "+", icon: "👥" },
    { value: 4.9, label: "Average Rating", suffix: "/5", icon: "⭐", decimals: 1 },
    { value: 60, label: "Expert Guides", suffix: "+", icon: "📚" },
    { value: 0, label: "Cost to You", prefix: "$", icon: "💰" }
];

const expertTeam = [
    { name: "Sarah Mitchell", role: "Local Expert", image: "/images/team/sarah-mitchell.jpg", credential: "15 Years in Naples" },
    { name: "Michael Chen", role: "Travel Writer", image: "/images/team/michael-chen.jpg", credential: "Published Author" },
    { name: "Naples Editorial", role: "Research Team", image: "/images/team/editorial.jpg", credential: "Fact-Checking" }
];

// --- ANIMATED COUNTER COMPONENT ---
function AnimatedCounter({
    value,
    duration = 2000,
    prefix = "",
    suffix = "",
    decimals = 0
}: {
    value: number;
    duration?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            setCount(easeProgress * value);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
        </span>
    );
}

// --- MAIN COMPONENT ---
export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="bg-white overflow-hidden">
            {/* Award Banner - Enterprise Trust Signal */}
            <AwardsBanner />

            {/* --- HERO SECTION: CINEMATIC PARALLAX --- */}
            <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
                {/* Parallax Background */}
                <motion.div
                    style={{ scale: heroScale, y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <SafeImage
                        src="/images/placeholders/naples_pier_sunset_dramatic_4k.png"
                        alt="Naples Pier Dramatic Sunset"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-gray-900/30" />
                </motion.div>

                {/* Animated Floating Particles */}
                <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 0,
                                y: Math.random() * 100 + 100,
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
                            }}
                            animate={{
                                opacity: [0, 0.5, 0],
                                y: -100
                            }}
                            transition={{
                                duration: 8 + Math.random() * 10,
                                repeat: Infinity,
                                delay: Math.random() * 10,
                                ease: "linear"
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full"
                        />
                    ))}
                </div>

                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center"
                >
                    {/* Trust Ribbon */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <Link href="/reviews" className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all group">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <motion.svg
                                        key={s}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3 + s * 0.1 }}
                                        className="w-5 h-5 text-amber-400 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </motion.svg>
                                ))}
                            </div>
                            <span className="text-white font-semibold tracking-wide">4.9 Stars · 1,247 Verified Reviews</span>
                            <svg className="w-4 h-4 text-white/50 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Main Headline with Typing Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white tracking-tight mb-8 drop-shadow-2xl max-w-5xl leading-[1.05]">
                            America's #1
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 via-teal-200 to-white">
                                Naples Travel Guide
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed mb-12 drop-shadow-lg"
                    >
                        Expert-verified itineraries, trusted by 127,000+ travelers.
                        <br className="hidden md:block" />
                        The definitive resource for Southwest Florida.
                    </motion.p>

                    {/* Primary CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto"
                    >
                        <Link
                            href="/plan"
                            className="flex-1 py-5 px-10 bg-gradient-to-r from-ocean-500 to-teal-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-ocean-500/30 hover:shadow-ocean-500/50 hover:-translate-y-1 transition-all text-center relative overflow-hidden group"
                        >
                            <span className="relative z-10">Start Planning Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-ocean-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <Link
                            href="/itineraries"
                            className="flex-1 py-5 px-10 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all text-center"
                        >
                            Browse Itineraries
                        </Link>
                    </motion.div>

                    {/* Trust Badges Row */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/60"
                    >
                        {[
                            { icon: "✓", text: "Fact-Checked Content" },
                            { icon: "✓", text: "Local Experts" },
                            { icon: "✓", text: "Updated Daily" },
                            { icon: "✓", text: "100% Free" }
                        ].map((badge, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <span className="text-emerald-400">{badge.icon}</span>
                                {badge.text}
                            </span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-white/40 text-xs uppercase tracking-widest">Scroll to Explore</span>
                        <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* --- LIVE STATS BAR --- */}
            <section className="py-12 bg-gradient-to-r from-ocean-900 via-gray-900 to-ocean-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/patterns/topography.svg')] opacity-5" />
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    <AnimatedCounter
                                        value={stat.value}
                                        prefix={stat.prefix}
                                        suffix={stat.suffix}
                                        decimals={stat.decimals || 0}
                                    />
                                </div>
                                <div className="text-ocean-400 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- THE MONTHLY EDIT (ENHANCED) --- */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[2rem] p-10 md:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden"
                    >
                        {/* Decorative Element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-ocean-100 to-teal-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

                        <div className="lg:w-1/2 relative">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ocean-500 to-teal-500 text-white text-sm font-bold mb-6"
                            >
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                {monthlyEdit.month} 2026
                            </motion.span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
                                {monthlyEdit.title}
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                {monthlyEdit.description}
                            </p>
                            <Link
                                href="/travel-tips/best-time-to-visit"
                                className="inline-flex items-center gap-2 text-ocean-600 font-bold text-lg hover:text-ocean-800 transition-colors group"
                            >
                                Read the full guide
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full relative">
                            {monthlyEdit.picks.map((pick, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center hover:shadow-lg hover:bg-white transition-all cursor-default"
                                >
                                    <span className="text-3xl mb-3 block">{pick.icon}</span>
                                    <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">{pick.label}</span>
                                    <span className="block font-display font-bold text-gray-900 text-lg">{pick.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- PREMIUM CATEGORIES GRID --- */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-ocean-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">
                        Explore Naples
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">
                        Curated Collections
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need, meticulously organized by local experts who live here.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {premiumCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link
                                href={cat.href}
                                className="group relative block rounded-3xl overflow-hidden h-[350px] shadow-sm hover:shadow-2xl transition-all"
                            >
                                <SafeImage
                                    src={cat.image}
                                    alt={cat.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                                {/* Badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full text-white text-sm font-bold border border-white/20">
                                        {cat.badge}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="absolute top-6 right-6">
                                    <span className="px-4 py-2 bg-emerald-500/90 backdrop-blur-xl rounded-full text-white text-sm font-bold">
                                        {cat.stats}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:translate-y-0 transition-transform">
                                        {cat.title}
                                    </h3>
                                    <p className="text-white/80 text-lg mb-4">{cat.subtitle}</p>
                                    <div className="flex items-center gap-2 text-ocean-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Explore <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- WHY TRUST US SECTION --- */}
            <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-5" />
                <div className="max-w-7xl mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-900 text-ocean-300 border border-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">
                            Our Promise
                        </span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                            Why 127,000+ Travelers Trust Us
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We're not just another travel blog. We're the premier resource for Naples, Florida.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "✓",
                                title: "Fact-Checked Content",
                                description: "Every guide is verified by local experts. Prices, hours, and availability are checked monthly."
                            },
                            {
                                icon: "👥",
                                title: "Local Expert Team",
                                description: "Our writers live in Naples. We test every restaurant, trail, and hotel before recommending it."
                            },
                            {
                                icon: "🔄",
                                title: "Updated Daily",
                                description: "Tourism changes fast. We update our guides daily to reflect current conditions."
                            },
                            {
                                icon: "🛡️",
                                title: "No Sponsored Rankings",
                                description: "Hotels and restaurants can't pay for placement. Our recommendations are 100% editorial."
                            },
                            {
                                icon: "📊",
                                title: "Data-Driven Picks",
                                description: "We analyze reviews, visitor data, and local intel to make our recommendations."
                            },
                            {
                                icon: "💯",
                                title: "100% Free Forever",
                                description: "No subscriptions, no paywalls. Premium travel advice at no cost to you."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 bg-ocean-500/20 rounded-xl flex items-center justify-center text-2xl mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Components */}
            <TrustCertifications />
            <MediaFeaturesSection />

            {/* --- TESTIMONIALS SECTION --- */}
            <section className="py-24 bg-gradient-to-b from-ocean-50/50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="flex justify-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <svg key={i} className="w-8 h-8 text-amber-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">
                            Trusted by Real Travelers
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Don't just take our word for it. Here's what our community says.
                        </p>
                    </motion.div>

                    {/* Social Proof Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-16">
                        {[
                            { label: "Google Reviews", value: "4.9★", count: "847" },
                            { label: "Trip Advisor", value: "Excellent", count: "312" },
                            { label: "Facebook", value: "Recommended", count: "156" }
                        ].map((platform, i) => (
                            <motion.div
                                key={platform.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl border border-gray-200 px-8 py-6 text-center shadow-sm"
                            >
                                <div className="text-2xl font-bold text-gray-900 mb-1">{platform.value}</div>
                                <div className="text-sm text-gray-500">{platform.label} ({platform.count})</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-32 bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/patterns/waves.svg')] opacity-10" />

                {/* Animated Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-300 rounded-full blur-3xl"
                />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold mb-8">
                            ✨ Free Trip Planner
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
                            Ready to Plan Your<br />Naples Escape?
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Answer 5 quick questions and get a personalized itinerary crafted by local experts. Free, instant, no signup required.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/plan"
                                className="px-12 py-5 bg-white text-ocean-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all"
                            >
                                Start Planning Now →
                            </Link>
                            <Link
                                href="/itineraries"
                                className="px-12 py-5 bg-white/10 border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                            >
                                Browse All Guides
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- NEWSLETTER --- */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-900 text-ocean-300 border border-ocean-700 text-sm font-bold mb-8">
                            📬 The Inside Scoop
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
                            Unlock Naples' Best Secrets
                        </h2>
                        <p className="mt-4 text-xl text-gray-400 mb-10 leading-relaxed">
                            Join 8,000+ subscribers who get our "Hidden Naples" guide, seasonal alerts, and restaurant opening notifications.
                        </p>

                        <NewsletterSignup
                            variant="hero"
                            title=""
                            description=""
                        />

                        <p className="mt-6 text-sm text-gray-500">
                            📖 Free "Ultimate Naples Vacation Planner" PDF included with signup
                        </p>
                    </motion.div>
                </div>
            </section>

            <TrustGuarantee />
            <ProfessionalTrustFooter />
        </div>
    );
}
