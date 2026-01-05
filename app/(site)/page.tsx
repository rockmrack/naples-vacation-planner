"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/src/components/SafeImage";
import {
    AwardsBanner,
    TrustCertifications,
    MediaFeaturesSection,
    TrustGuarantee,
    ProfessionalTrustFooter,
} from "@/src/components/UltimateTrust";
import NewsletterSignup from "@/src/components/NewsletterSignup";

// --- ENHANCED CONTENT DATA ---

const heroRotatingWords = ["Perfect", "Unforgettable", "Dream", "Ultimate", "Luxury"];

const monthlyEdit = {
    month: "January",
    title: "The Peak Season Edit",
    description: "January is perfection in Naples. The humidity is gone, the stone crabs are fresh, and the art festivals are beginning.",
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
        stats: "60+ Guides",
        gradient: "from-ocean-500 to-teal-500"
    },
    {
        title: "Where to Stay",
        subtitle: "Neighborhood-by-neighborhood analysis",
        href: "/where-to-stay",
        image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg",
        badge: "Updated Weekly",
        stats: "25 Hotels",
        gradient: "from-purple-500 to-pink-500"
    },
    {
        title: "Day Trips",
        subtitle: "From Everglades to Key West",
        href: "/day-trips",
        image: "/images/placeholders/everglades_airboat_action_4k.jpg",
        badge: "Adventure",
        stats: "15+ Trips",
        gradient: "from-amber-500 to-orange-500"
    },
    {
        title: "Events 2026",
        subtitle: "Festivals, art fairs, and more",
        href: "/events",
        image: "/images/placeholders/naples-event-festival.jpg",
        badge: "Live Calendar",
        stats: "60 Events",
        gradient: "from-emerald-500 to-green-500"
    }
];

const trustStats = [
    { value: 127453, label: "Travelers Helped", suffix: "+", icon: "👥" },
    { value: 4.9, label: "Average Rating", suffix: "/5", icon: "⭐", decimals: 1 },
    { value: 60, label: "Expert Guides", suffix: "+", icon: "📚" },
    { value: 0, label: "Cost to You", prefix: "$", icon: "💰" }
];

const quickFeatures = [
    { icon: "🎯", title: "AI Trip Planner", desc: "Get personalized recommendations", link: "/plan" },
    { icon: "📅", title: "60+ Itineraries", desc: "For every travel style", link: "/itineraries" },
    { icon: "🏨", title: "Hotel Guides", desc: "Verified reviews & tips", link: "/where-to-stay" },
    { icon: "🎉", title: "Events 2026", desc: "Festivals & activities", link: "/events" },
];

const testimonials = [
    { name: "Jennifer M.", location: "Chicago, IL", text: "This guide saved our honeymoon! Every recommendation was spot-on.", rating: 5, image: "/images/testimonials/jennifer.jpg" },
    { name: "Robert K.", location: "New York, NY", text: "Finally, a travel site that's actually updated and accurate. Used it for our family trip.", rating: 5, image: "/images/testimonials/robert.jpg" },
    { name: "Amanda T.", location: "Boston, MA", text: "The restaurant recommendations were incredible. We felt like locals!", rating: 5, image: "/images/testimonials/amanda.jpg" },
];

// --- ANIMATED COMPONENTS ---

// Typing Effect Component
function TypingText({ words, className }: { words: string[]; className?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentWord.length) {
                    setDisplayText(currentWord.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentWord.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentIndex, words]);

    return (
        <span className={className}>
            {displayText}
            <span className="animate-pulse">|</span>
        </span>
    );
}

// Animated Counter
function AnimatedCounter({
    value, duration = 2000, prefix = "", suffix = "", decimals = 0
}: {
    value: number; duration?: number; prefix?: string; suffix?: string; decimals?: number;
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
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(easeProgress * value);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
        </span>
    );
}

// Morphing Blob Background
function MorphingBlobs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-ocean-400/20 to-teal-300/20 blur-3xl"
            />
            <motion.div
                animate={{
                    borderRadius: ["30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%"],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-purple-400/15 to-pink-300/15 blur-3xl"
            />
            <motion.div
                animate={{
                    borderRadius: ["40% 60% 60% 40%/60% 40% 60% 40%", "60% 40% 40% 60%/40% 60% 40% 60%", "40% 60% 60% 40%/60% 40% 60% 40%"],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-amber-400/10 to-orange-300/10 blur-3xl"
            />
        </div>
    );
}

// Glass Card Component
function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
    return (
        <motion.div
            whileHover={hover ? { y: -8, scale: 1.02 } : {}}
            className={`backdrop-blur-xl bg-white/70 border border-white/20 shadow-xl shadow-gray-200/20 rounded-3xl ${className}`}
        >
            {children}
        </motion.div>
    );
}

// Floating Badge
function FloatingBadge({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
        >
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

// --- MAIN COMPONENT ---
export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
            <AwardsBanner />

            {/* --- CINEMATIC HERO --- */}
            <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
                {/* Parallax Background */}
                <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/naples_pier_sunset_dramatic_4k.png"
                        alt="Naples Pier Sunset"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80" />
                </motion.div>

                {/* Animated Particles */}
                <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 100 + Math.random() * 200, x: Math.random() * 100 + "%", scale: Math.random() * 0.5 + 0.5 }}
                            animate={{ opacity: [0, 0.8, 0], y: -100 }}
                            transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }}
                            className="absolute w-1.5 h-1.5 bg-white rounded-full"
                        />
                    ))}
                </div>

                <motion.div style={{ opacity: heroOpacity, y: textY }} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-32">
                    <div className="max-w-4xl">
                        {/* Trust Badge */}
                        <FloatingBadge delay={0.2}>
                            <Link href="/reviews" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all mb-8">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <motion.svg key={s} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3 + s * 0.1, type: "spring" }} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </motion.svg>
                                    ))}
                                </div>
                                <span className="text-white font-semibold">4.9 Rating · 127,000+ Travelers</span>
                            </Link>
                        </FloatingBadge>

                        {/* Main Headline with Typing Effect */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-[1.05] mb-8"
                        >
                            Plan Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 via-teal-200 to-cyan-200">
                                <TypingText words={heroRotatingWords} />
                            </span>
                            <br />Naples Vacation
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed mb-10"
                        >
                            America's #1 expert-verified travel guide. Trusted by over 127,000 travelers for authentic, local recommendations.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href="/plan" className="group relative px-10 py-5 bg-gradient-to-r from-ocean-500 to-teal-500 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-ocean-500/30 hover:shadow-ocean-500/50 transition-all overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Planning Free
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                                </span>
                                <motion.div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-ocean-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/itineraries" className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                                Browse 60+ Guides
                            </Link>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-12 flex flex-wrap gap-6 text-sm text-white/70"
                        >
                            {["✓ Fact-Checked Daily", "✓ Local Expert Team", "✓ 100% Free Forever", "✓ No Sponsored Rankings"].map((text, i) => (
                                <motion.span key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.1 }} className="flex items-center gap-2">
                                    <span className="text-emerald-400">✓</span> {text.replace("✓ ", "")}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                    <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
                        <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Explore</span>
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* --- QUICK FEATURES BAR --- */}
            <section className="relative -mt-20 z-30 max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {quickFeatures.map((feature, i) => (
                        <Link key={feature.title} href={feature.link}>
                            <GlassCard className="p-6 cursor-pointer group">
                                <motion.span
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    className="text-3xl block mb-3"
                                >
                                    {feature.icon}
                                </motion.span>
                                <h3 className="font-bold text-gray-900 group-hover:text-ocean-600 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-gray-500">{feature.desc}</p>
                            </GlassCard>
                        </Link>
                    ))}
                </motion.div>
            </section>

            {/* --- ANIMATED STATS --- */}
            <section className="py-20 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-500 to-teal-500 text-3xl mb-4 shadow-lg shadow-ocean-500/20"
                                >
                                    {stat.icon}
                                </motion.div>
                                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals || 0} />
                                </div>
                                <div className="text-gray-500 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PREMIUM CATEGORIES --- */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-ocean-100 to-teal-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">
                        Explore Naples
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">Curated By Locals</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need, organized by people who actually live here.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {premiumCategories.map((cat, i) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={cat.href} className="group relative block rounded-3xl overflow-hidden h-[320px] shadow-lg hover:shadow-2xl transition-all">
                                <SafeImage src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                                <div className="absolute top-5 left-5 right-5 flex justify-between">
                                    <span className={`px-4 py-2 bg-gradient-to-r ${cat.gradient} rounded-full text-white text-sm font-bold shadow-lg`}>
                                        {cat.badge}
                                    </span>
                                    <span className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white text-sm font-bold border border-white/20">
                                        {cat.stats}
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-3xl font-display font-bold text-white mb-2">{cat.title}</h3>
                                    <p className="text-white/80 text-lg">{cat.subtitle}</p>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "3rem" }}
                                        className="h-1 bg-white/50 rounded-full mt-4 group-hover:w-full group-hover:bg-white transition-all duration-500"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- TESTIMONIAL SPOTLIGHT --- */}
            <section className="py-24 bg-gradient-to-br from-ocean-900 via-gray-900 to-ocean-900 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex justify-center gap-1 mb-6">
                            {[1, 2, 3, 4, 5].map(i => (
                                <motion.svg key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} className="w-8 h-8 text-amber-400 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </motion.svg>
                            ))}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">What Travelers Say</h2>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10"
                            >
                                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8 italic">
                                    "{testimonials[currentTestimonial].text}"
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ocean-400 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
                                        {testimonials[currentTestimonial].name[0]}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold">{testimonials[currentTestimonial].name}</div>
                                        <div className="text-white/60">{testimonials[currentTestimonial].location}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentTestimonial(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/50'}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- MONTHLY EDIT --- */}
            <section className="py-24 relative">
                <MorphingBlobs />
                <div className="relative max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard hover={false} className="p-10 md:p-16">
                            <div className="flex flex-col lg:flex-row gap-16 items-center">
                                <div className="lg:w-1/2">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ocean-500 to-teal-500 text-white text-sm font-bold mb-6">
                                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-white rounded-full" />
                                        {monthlyEdit.month} 2026
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">{monthlyEdit.title}</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed mb-8">{monthlyEdit.description}</p>
                                    <Link href="/travel-tips/best-time-to-visit" className="inline-flex items-center gap-2 text-ocean-600 font-bold text-lg hover:text-ocean-800 transition-colors group">
                                        Read the full guide
                                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                                    </Link>
                                </div>
                                <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                                    {monthlyEdit.picks.map((pick, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="p-6 bg-white rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all cursor-default"
                                        >
                                            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="text-4xl mb-3 block">{pick.icon}</motion.span>
                                            <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">{pick.label}</span>
                                            <span className="block font-display font-bold text-gray-900">{pick.value}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </section>

            {/* --- CTA SECTION --- */}
            <section className="py-32 bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block text-6xl mb-6"
                        >
                            ✨
                        </motion.span>
                        <h2 className="text-5xl md:text-7xl font-bold font-display text-white mb-6">Ready to Start?</h2>
                        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">
                            Get your personalized Naples itinerary in 60 seconds. Free, instant, no signup.
                        </p>
                        <Link href="/plan" className="inline-flex items-center gap-3 px-14 py-6 bg-white text-ocean-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/20 hover:-translate-y-2 transition-all">
                            Start Planning Now
                            <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* --- NEWSLETTER --- */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-900 text-ocean-300 border border-ocean-700 text-sm font-bold mb-8">📬 Join 8,000+ Subscribers</span>
                        <h2 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">Get Naples Secrets</h2>
                        <p className="mt-4 text-xl text-gray-400 mb-10">Weekly insider tips, restaurant openings, and hidden gems delivered to your inbox.</p>
                        <NewsletterSignup variant="hero" title="" description="" />
                        <p className="mt-6 text-sm text-gray-500">📖 Free "Ultimate Naples Vacation Planner" PDF included</p>
                    </motion.div>
                </div>
            </section>

            <TrustCertifications />
            <MediaFeaturesSection />
            <TrustGuarantee />
            <ProfessionalTrustFooter />
        </div>
    );
}
