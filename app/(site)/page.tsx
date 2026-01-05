"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

// --- MEGA ENHANCED CONTENT DATA ---

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
    { title: "Expert Itineraries", subtitle: "Fact-checked day-by-day plans", href: "/itineraries", image: "/images/placeholders/naples_pier_sunset_4k.jpg", badge: "Most Popular", stats: "60+ Guides", gradient: "from-ocean-500 to-teal-500" },
    { title: "Where to Stay", subtitle: "Neighborhood-by-neighborhood analysis", href: "/where-to-stay", image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg", badge: "Updated Weekly", stats: "25 Hotels", gradient: "from-purple-500 to-pink-500" },
    { title: "Day Trips", subtitle: "From Everglades to Key West", href: "/day-trips", image: "/images/placeholders/everglades_airboat_action_4k.jpg", badge: "Adventure", stats: "15+ Trips", gradient: "from-amber-500 to-orange-500" },
    { title: "Events 2026", subtitle: "Festivals, art fairs, and more", href: "/events", image: "/images/placeholders/naples-event-festival.jpg", badge: "Live Calendar", stats: "60 Events", gradient: "from-emerald-500 to-green-500" }
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
    { name: "Jennifer M.", location: "Chicago, IL", text: "This guide saved our honeymoon! Every recommendation was spot-on.", rating: 5 },
    { name: "Robert K.", location: "New York, NY", text: "Finally, a travel site that's actually updated and accurate. Used it for our family trip.", rating: 5 },
    { name: "Amanda T.", location: "Boston, MA", text: "The restaurant recommendations were incredible. We felt like locals!", rating: 5 },
];

// NEW: Trending destinations
const trendingNow = [
    { name: "Naples Pier", image: "/images/placeholders/naples_pier_sunset_4k.jpg", searches: "2.4K searches today", hot: true },
    { name: "Everglades Tours", image: "/images/placeholders/everglades_airboat_action_4k.jpg", searches: "1.8K searches today", hot: true },
    { name: "5th Avenue", image: "/images/placeholders/naples_5th_avenue_dining.png", searches: "1.2K searches today", hot: false },
    { name: "Marco Island", image: "/images/placeholders/marco_island_wide_beach.png", searches: "980 searches today", hot: false },
];

// NEW: Expert team
const expertTeam = [
    { name: "Sarah Mitchell", role: "Lead Travel Writer", experience: "15 years in Naples", avatar: "SM", specialty: "Luxury & Fine Dining" },
    { name: "Michael Chen", role: "Adventure Editor", experience: "Published Author", avatar: "MC", specialty: "Outdoor & Wildlife" },
    { name: "Emily Rodriguez", role: "Local Expert", experience: "Naples Native", avatar: "ER", specialty: "Hidden Gems" },
];

// NEW: Weather data (simulated)
const weatherData = { temp: 78, condition: "Sunny", humidity: 45, wind: "8 mph NE", forecast: "Perfect beach weather" };

// NEW: Photo gallery
const photoGallery = [
    { src: "/images/placeholders/naples_pier_sunset_4k.jpg", alt: "Naples Pier at Sunset" },
    { src: "/images/placeholders/everglades_airboat_action_4k.jpg", alt: "Everglades Adventure" },
    { src: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg", alt: "Luxury Resort" },
    { src: "/images/placeholders/naples_5th_avenue_dining.png", alt: "5th Avenue Dining" },
    { src: "/images/placeholders/marco_island_wide_beach.png", alt: "Marco Island Beach" },
];

// NEW: Live activity
const recentActivity = [
    { action: "booked", item: "3-Day Romantic Getaway", time: "2 min ago", location: "Chicago, IL" },
    { action: "downloaded", item: "Ultimate Food Guide", time: "5 min ago", location: "New York, NY" },
    { action: "planned", item: "Family Beach Vacation", time: "8 min ago", location: "Boston, MA" },
];

// NEW: Quick tips
const quickTips = [
    { icon: "☀️", tip: "Best beach time: 7-10 AM", category: "Beach" },
    { icon: "🍽️", tip: "Reserve dinner 2 weeks ahead", category: "Dining" },
    { icon: "🚗", tip: "Free parking at Lowdermilk", category: "Parking" },
    { icon: "🦀", tip: "Stone crab season: Oct-May", category: "Food" },
];

// --- ANIMATED COMPONENTS ---

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

    return <span className={className}>{displayText}<span className="animate-pulse">|</span></span>;
}

function AnimatedCounter({ value, duration = 2000, prefix = "", suffix = "", decimals = 0 }: { value: number; duration?: number; prefix?: string; suffix?: string; decimals?: number; }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount((1 - Math.pow(1 - progress, 3)) * value);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>;
}

function MorphingBlobs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-ocean-400/20 to-teal-300/20 blur-3xl" />
            <motion.div animate={{ borderRadius: ["30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%"], scale: [1.1, 1, 1.1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-purple-400/15 to-pink-300/15 blur-3xl" />
        </div>
    );
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
    return <motion.div whileHover={hover ? { y: -8, scale: 1.02 } : {}} className={`backdrop-blur-xl bg-white/70 border border-white/20 shadow-xl shadow-gray-200/20 rounded-3xl ${className}`}>{children}</motion.div>;
}

function FloatingBadge({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}><motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>{children}</motion.div></motion.div>;
}

// NEW: Live notification toast
function LiveNotification() {
    const [current, setCurrent] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % recentActivity.length);
                setVisible(true);
            }, 500);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const activity = recentActivity[current];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="fixed bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs hidden md:block"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white text-sm">
                            {activity.action === "booked" ? "✓" : activity.action === "downloaded" ? "↓" : "📅"}
                        </div>
                        <div>
                            <p className="text-sm text-gray-900 font-medium">Someone {activity.action}</p>
                            <p className="text-xs text-gray-500">{activity.item} · {activity.time}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
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
    const [currentPhoto, setCurrentPhoto] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length), 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setCurrentPhoto((prev) => (prev + 1) % photoGallery.length), 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
            <LiveNotification />
            <AwardsBanner />

            {/* --- CINEMATIC HERO --- */}
            <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
                <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
                    <SafeImage src="/images/placeholders/naples_pier_sunset_dramatic_4k.png" alt="Naples Pier Sunset" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80" />
                </motion.div>

                <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 100 + Math.random() * 200, x: Math.random() * 100 + "%", scale: Math.random() * 0.5 + 0.5 }} animate={{ opacity: [0, 0.8, 0], y: -100 }} transition={{ duration: 6 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }} className="absolute w-1.5 h-1.5 bg-white rounded-full" />
                    ))}
                </div>

                <motion.div style={{ opacity: heroOpacity, y: textY }} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-32">
                    <div className="max-w-4xl">
                        <FloatingBadge delay={0.2}>
                            <Link href="/reviews" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all mb-8">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <motion.svg key={s} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3 + s * 0.1, type: "spring" }} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></motion.svg>)}
                                </div>
                                <span className="text-white font-semibold">4.9 Rating · 127,000+ Travelers</span>
                            </Link>
                        </FloatingBadge>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-[1.05] mb-8">
                            Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 via-teal-200 to-cyan-200"><TypingText words={heroRotatingWords} /></span><br />Naples Vacation
                        </motion.h1>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed mb-10">
                            America's #1 expert-verified travel guide. Trusted by over 127,000 travelers for authentic, local recommendations.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/plan" className="group relative px-10 py-5 bg-gradient-to-r from-ocean-500 to-teal-500 rounded-2xl font-bold text-lg text-white shadow-2xl shadow-ocean-500/30 hover:shadow-ocean-500/50 transition-all overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">Start Planning Free <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span></span>
                                <motion.div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-ocean-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/itineraries" className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                                Browse 60+ Guides
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-12 flex flex-wrap gap-6 text-sm text-white/70">
                            {["Fact-Checked Daily", "Local Expert Team", "100% Free Forever", "No Sponsored Rankings"].map((text, i) => (
                                <motion.span key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.1 }} className="flex items-center gap-2">
                                    <span className="text-emerald-400">✓</span> {text}
                                </motion.span>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2">
                        <span className="text-white/50 text-xs uppercase tracking-[0.2em]">Explore</span>
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                            <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* --- LIVE WEATHER WIDGET --- */}
            <section className="relative -mt-16 z-30 max-w-7xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-gradient-to-r from-ocean-500 to-teal-500 rounded-3xl p-6 text-white shadow-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/80 text-sm font-medium mb-1">Naples Weather Now</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-5xl font-bold">{weatherData.temp}°F</span>
                                    <div>
                                        <p className="font-semibold">{weatherData.condition}</p>
                                        <p className="text-white/70 text-sm">{weatherData.forecast}</p>
                                    </div>
                                </div>
                            </div>
                            <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl">☀️</motion.span>
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium mb-2">Quick Stats Today</p>
                        <div className="grid grid-cols-3 gap-4">
                            {[{ label: "Humidity", value: `${weatherData.humidity}%`, icon: "💧" }, { label: "Wind", value: weatherData.wind, icon: "🌬️" }, { label: "Best For", value: "Beach Day", icon: "🏖️" }].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <p className="font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-xs text-gray-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* --- QUICK FEATURES BAR --- */}
            <section className="max-w-6xl mx-auto px-4 py-12">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickFeatures.map((feature, i) => (
                        <Link key={feature.title} href={feature.link}>
                            <GlassCard className="p-6 cursor-pointer group">
                                <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="text-3xl block mb-3">{feature.icon}</motion.span>
                                <h3 className="font-bold text-gray-900 group-hover:text-ocean-600 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-gray-500">{feature.desc}</p>
                            </GlassCard>
                        </Link>
                    ))}
                </motion.div>
            </section>

            {/* --- TRENDING NOW --- */}
            <section className="py-16 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold mb-2">
                                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-red-500 rounded-full" />
                                LIVE
                            </span>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">Trending Right Now</h2>
                        </div>
                        <p className="text-gray-400 hidden md:block">What travelers are searching for today</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trendingNow.map((item, i) => (
                            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.03 }} className="relative rounded-2xl overflow-hidden h-48 group cursor-pointer">
                                <SafeImage src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                                {item.hot && <span className="absolute top-3 right-3 px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">🔥 HOT</span>}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                                    <p className="text-gray-300 text-sm">{item.searches}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PHOTO GALLERY CAROUSEL --- */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Discover Paradise</h2>
                        <p className="text-xl text-gray-600">Every corner of Naples tells a story</p>
                    </motion.div>
                    <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentPhoto} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }} className="absolute inset-0">
                                <SafeImage src={photoGallery[currentPhoto].src} alt={photoGallery[currentPhoto].alt} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                                <div className="absolute bottom-8 left-8">
                                    <h3 className="text-3xl font-display font-bold text-white">{photoGallery[currentPhoto].alt}</h3>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-8 right-8 flex gap-2">
                            {photoGallery.map((_, i) => (
                                <button key={i} onClick={() => setCurrentPhoto(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentPhoto ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ANIMATED STATS --- */}
            <section className="py-20 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {trustStats.map((stat, i) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-ocean-500 to-teal-500 text-4xl mb-4 shadow-xl shadow-ocean-500/30">{stat.icon}</motion.div>
                                <div className="text-4xl md:text-6xl font-bold text-gray-900 mb-2"><AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals || 0} /></div>
                                <div className="text-gray-500 font-semibold text-lg">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- QUICK TIPS BAR --- */}
            <section className="bg-ocean-50 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-6">
                        {quickTips.map((tip, i) => (
                            <motion.div key={tip.tip} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm">
                                <span className="text-2xl">{tip.icon}</span>
                                <span className="text-gray-700 font-medium">{tip.tip}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MEET OUR EXPERTS --- */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">The Team Behind the Guides</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Meet Our Local Experts</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real people who live in Naples, creating guides you can actually trust.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {expertTeam.map((expert, i) => (
                            <motion.div key={expert.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }} className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">{expert.avatar}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{expert.name}</h3>
                                <p className="text-ocean-600 font-medium mb-2">{expert.role}</p>
                                <p className="text-gray-500 text-sm mb-4">{expert.experience}</p>
                                <span className="inline-block px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium">{expert.specialty}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link href="/about" className="inline-flex items-center gap-2 text-ocean-600 font-bold text-lg hover:text-ocean-800 transition-colors">
                            Meet the full team <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- PREMIUM CATEGORIES --- */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-ocean-100 to-teal-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">Explore Naples</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">Curated By Locals</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Everything you need, organized by people who actually live here.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-6">
                    {premiumCategories.map((cat, i) => (
                        <motion.div key={cat.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <Link href={cat.href} className="group relative block rounded-3xl overflow-hidden h-[350px] shadow-xl hover:shadow-2xl transition-all">
                                <SafeImage src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                                <div className="absolute top-5 left-5 right-5 flex justify-between">
                                    <span className={`px-4 py-2 bg-gradient-to-r ${cat.gradient} rounded-full text-white text-sm font-bold shadow-lg`}>{cat.badge}</span>
                                    <span className="px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white text-sm font-bold border border-white/20">{cat.stats}</span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{cat.title}</h3>
                                    <p className="text-white/80 text-lg mb-4">{cat.subtitle}</p>
                                    <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">Explore Now <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span></div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- TESTIMONIALS --- */}
            <section className="py-24 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <div className="flex justify-center gap-1 mb-6">{[1, 2, 3, 4, 5].map(i => <motion.svg key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ delay: i * 0.1, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} className="w-8 h-8 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></motion.svg>)}</div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
                                <div className="flex gap-1 mb-4">{[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-400 to-teal-400 flex items-center justify-center text-white font-bold">{t.name[0]}</div>
                                    <div><div className="font-bold text-gray-900">{t.name}</div><div className="text-gray-500 text-sm">{t.location}</div></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- MONTHLY EDIT --- */}
            <section className="py-24 relative">
                <MorphingBlobs />
                <div className="relative max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <GlassCard hover={false} className="p-10 md:p-16">
                            <div className="flex flex-col lg:flex-row gap-16 items-center">
                                <div className="lg:w-1/2">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-ocean-500 to-teal-500 text-white text-sm font-bold mb-6">
                                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-white rounded-full" />
                                        {monthlyEdit.month} 2026
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">{monthlyEdit.title}</h2>
                                    <p className="text-xl text-gray-600 leading-relaxed mb-8">{monthlyEdit.description}</p>
                                    <Link href="/travel-tips/best-time-to-visit" className="inline-flex items-center gap-2 px-8 py-4 bg-ocean-600 text-white font-bold rounded-xl hover:bg-ocean-700 transition-colors shadow-lg shadow-ocean-600/30">
                                        Read Full Guide <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                                    </Link>
                                </div>
                                <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                                    {monthlyEdit.picks.map((pick, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="p-6 bg-white rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all">
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

            {/* --- FINAL CTA --- */}
            <section className="py-32 bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block text-7xl mb-8">🌴</motion.span>
                        <h2 className="text-5xl md:text-7xl font-bold font-display text-white mb-6">Your Naples Adventure Awaits</h2>
                        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto">Join 127,000+ travelers who planned their perfect trip with us. Free, instant, no signup.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/plan" className="inline-flex items-center gap-3 px-14 py-6 bg-white text-ocean-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/30 hover:-translate-y-2 transition-all">
                                Start Planning Free <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                            </Link>
                            <Link href="/itineraries" className="inline-flex items-center justify-center px-10 py-6 bg-white/10 border-2 border-white/30 text-white rounded-2xl font-bold text-xl hover:bg-white/20 transition-all">Browse Guides</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- NEWSLETTER --- */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block text-5xl mb-6">📬</motion.span>
                        <h2 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">Get Insider Secrets</h2>
                        <p className="mt-4 text-xl text-gray-400 mb-10">Join 8,000+ subscribers for weekly Naples tips, new restaurant alerts, and hidden gems.</p>
                        <NewsletterSignup variant="hero" title="" description="" />
                        <p className="mt-6 text-sm text-gray-500">📖 Free "Ultimate Naples Vacation Planner" PDF with signup</p>
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
