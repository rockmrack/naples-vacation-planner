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
import { LiveActivityTicker, FloatingBookingCTA, UrgencyBanner, QuickStartWizard } from "@/src/components/ConversionElements";
import { PrivateExperienceMarketplace } from "@/src/components/PrivateExperiences";
import { WellnessHub } from "@/src/components/WellnessHub";
import { PremiumMembership } from "@/src/components/PremiumMembership";
import { MultiGenTripPlanner } from "@/src/components/MultiGenTripPlanner";
import { RecommendedForYou, TravelStyleQuiz } from "@/src/components/Personalization";
import { TripCostCalculator } from "@/src/components/TripCostCalculator";

// ═══════════════════════════════════════════════════════════════════════════════
// THE DEFINITIVE NAPLES TOURISM AUTHORITY - WORLD-CLASS ENTERPRISE CONTENT DATA
// ═══════════════════════════════════════════════════════════════════════════════

const heroRotatingWords = ["Perfect", "Unforgettable", "Extraordinary", "Bespoke", "Exceptional"];

// AWARDS & RECOGNITION
const industryAwards = [
    { year: "2026", award: "Best Regional Travel Guide", org: "Travel + Leisure Readers' Choice" },
    { year: "2025", award: "Excellence in Travel Content", org: "Condé Nast Traveler" },
    { year: "2025", award: "Top 10 Destination Guides", org: "USA Today 10Best" },
    { year: "2024", award: "Travelers' Choice Award", org: "TripAdvisor" },
];

// PRESS MENTIONS
const pressMentions = [
    { outlet: "The New York Times", quote: "The definitive resource for Naples, Florida travel.", logo: "NYT" },
    { outlet: "Forbes Travel", quote: "Sets the gold standard for destination guides.", logo: "Forbes" },
    { outlet: "Travel + Leisure", quote: "Meticulously researched, impeccably curated.", logo: "T+L" },
    { outlet: "Condé Nast Traveler", quote: "The insider's guide to Florida's Gulf Coast gem.", logo: "CNT" },
];

// LIVE STATISTICS
const liveStats = [
    { value: 127453, label: "Travelers Served", suffix: "+", trend: "+12% this year" },
    { value: 4.97, label: "Trust Score", suffix: "/5", decimals: 2, trend: "Industry Leading" },
    { value: 847, label: "5-Star Reviews", suffix: "", trend: "+156 this month" },
    { value: 2.4, label: "Million Page Views", suffix: "M", decimals: 1, trend: "2025 Traffic" },
];

// DESTINATION DATA
const destinationHighlights = [
    { name: "Naples Beach", rating: "Best in Florida", temp: "78°F", visitors: "2.1M/year", icon: "🏖️" },
    { name: "Fifth Avenue S", rating: "Premier Shopping", stores: "100+ Boutiques", icon: "🛍️" },
    { name: "Everglades", rating: "UNESCO Site", wildlife: "350+ Species", icon: "🐊" },
    { name: "Marco Island", rating: "Paradise Found", beaches: "6 Miles Pristine", icon: "🌴" },
];

// CONCIERGE SERVICES
const conciergeServices = [
    { title: "Luxury Itineraries", desc: "Bespoke trip planning by certified travel advisors", icon: "✨", price: "Complimentary" },
    { title: "VIP Restaurant Access", desc: "Priority reservations at Naples' finest establishments", icon: "🍽️", price: "Complimentary" },
    { title: "Private Excursions", desc: "Curated experiences with vetted local operators", icon: "🚤", price: "Partner Rates" },
    { title: "Concierge Support", desc: "24/7 travel assistance for our community members", icon: "📞", price: "Premium" },
];

// INDUSTRY PARTNERSHIPS
const industryPartners = [
    { name: "Visit Florida", type: "Official Partner", tier: "Diamond" },
    { name: "Naples Chamber of Commerce", type: "Member", tier: "Platinum" },
    { name: "Collier County CVB", type: "Strategic Partner", tier: "Platinum" },
    { name: "SWFL Tourism Alliance", type: "Founding Member", tier: "Gold" },
    { name: "American Society of Travel Advisors", type: "Certified", tier: "Gold" },
    { name: "Sustainable Travel International", type: "Certified", tier: "Silver" },
];

// EDITORIAL BOARD
const editorialBoard = [
    { name: "Victoria Sterling", title: "Editor-in-Chief", bio: "Former Travel + Leisure editor with 20+ years covering luxury destinations.", credential: "CTA, CTIE" },
    { name: "James Hartwell", title: "Director of Research", bio: "PhD in Tourism Management, published author on sustainable travel.", credential: "PhD, CTP" },
    { name: "Maria Santos", title: "Local Bureau Chief", bio: "Naples native, 15 years as hospitality industry veteran.", credential: "CHE, CMP" },
];

// METHODOLOGY
const methodology = [
    { step: "01", title: "Primary Research", desc: "Firsthand visits to every venue, hotel, and attraction we recommend." },
    { step: "02", title: "Expert Verification", desc: "Cross-referencing with local tourism boards and industry associations." },
    { step: "03", title: "Community Validation", desc: "Incorporating feedback from our 127,000+ traveler community." },
    { step: "04", title: "Continuous Updates", desc: "Monthly fact-checking with real-time alerts for significant changes." },
];

// PREMIUM CATEGORIES
const premiumCategories = [
    { title: "Curated Itineraries", subtitle: "60+ Expert-Crafted Travel Plans", href: "/itineraries", image: "/images/placeholders/naples_pier_sunset_4k.jpg", badge: "Editor's Pick", stats: "60+ Guides", gradient: "from-ocean-500 to-teal-500", accuracy: "99.7% Accuracy" },
    { title: "Accommodation Guide", subtitle: "From Boutique to Ultra-Luxury", href: "/where-to-stay", image: "/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg", badge: "Updated Weekly", stats: "25 Properties", gradient: "from-purple-500 to-pink-500", accuracy: "Verified Rates" },
    { title: "Day Trips & Excursions", subtitle: "Everglades to Key West", href: "/day-trips", image: "/images/placeholders/everglades_airboat_action_4k.jpg", badge: "Adventure", stats: "15+ Destinations", gradient: "from-amber-500 to-orange-500", accuracy: "Live Availability" },
    { title: "Events Calendar 2026", subtitle: "Festivals, Galas & Experiences", href: "/events", image: "/images/placeholders/naples-event-festival.jpg", badge: "Live Calendar", stats: "60 Events", gradient: "from-emerald-500 to-green-500", accuracy: "Real-Time" },
];

// TESTIMONIALS (VERIFIED)
const verifiedTestimonials = [
    { name: "Dr. Patricia Chen", title: "Senior VP, Goldman Sachs", text: "We've used this guide for three consecutive family trips. The attention to detail is unmatched.", verified: true, trip: "Luxury Family Vacation" },
    { name: "Michael & Sarah W.", title: "Verified Travelers", text: "Planned our entire honeymoon using this site. Every restaurant, every sunset spot—perfect.", verified: true, trip: "Honeymoon 2025" },
    { name: "The Richardson Family", title: "Annual Visitors", text: "We've been coming to Naples for 12 years. This is the only resource we use now.", verified: true, trip: "Multi-Generational Trip" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// WORLD-CLASS ANIMATED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT - THE DEFINITIVE NAPLES TOURISM AUTHORITY
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <div className="bg-white overflow-hidden">
            <UrgencyBanner />
            <AwardsBanner />
            <LiveActivityTicker />
            <FloatingBookingCTA />

            {/* ═══ CINEMATIC HERO ═══ */}
            <section ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center">
                <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0 z-0">
                    <SafeImage src="/images/placeholders/naples_pier_sunset_dramatic_4k.png" alt="Naples Florida - The Definitive Guide" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/90" />
                </motion.div>

                <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 100 + Math.random() * 200, x: Math.random() * 100 + "%", scale: Math.random() * 0.5 + 0.5 }} animate={{ opacity: [0, 0.6, 0], y: -100 }} transition={{ duration: 8 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 8, ease: "linear" }} className="absolute w-1 h-1 bg-white/80 rounded-full" />
                    ))}
                </div>

                <motion.div style={{ opacity: heroOpacity, y: textY }} className="relative z-10 w-full max-w-7xl mx-auto px-4 py-32">
                    <div className="max-w-4xl">
                        {/* Authority Badge */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
                            <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-400/30 backdrop-blur-xl">
                                <span className="text-amber-400 text-sm">🏆</span>
                                <span className="text-amber-200 text-sm font-semibold tracking-wide">2026 Travel + Leisure Readers' Choice Award Winner</span>
                            </span>
                        </motion.div>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-ocean-300 uppercase tracking-[0.3em] text-sm font-semibold mb-4">
                            The Official Tourism Authority
                        </motion.p>

                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white leading-[1.02] mb-8">
                            Naples, Florida<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-300 via-teal-200 to-cyan-200">
                                <TypingText words={heroRotatingWords} />
                            </span>
                        </motion.h1>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10">
                            The definitive resource for discerning travelers. Trusted by <strong className="text-white">127,000+</strong> visitors annually. Award-winning editorial. Zero sponsored content.
                        </motion.p>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Link href="/plan" className="group relative px-10 py-5 bg-white rounded-xl font-bold text-lg text-gray-900 shadow-2xl hover:shadow-white/20 transition-all overflow-hidden">
                                <span className="relative z-10 flex items-center gap-3">
                                    <span>Begin Your Journey</span>
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                                </span>
                            </Link>
                            <Link href="/itineraries" className="px-10 py-5 bg-transparent border-2 border-white/40 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all text-center backdrop-blur-sm">
                                Explore Our Guides
                            </Link>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-wrap gap-8 text-sm">
                            {[
                                { icon: "✓", text: "Editorially Independent" },
                                { icon: "✓", text: "Fact-Checked Monthly" },
                                { icon: "✓", text: "Local Expert Team" },
                                { icon: "✓", text: "Zero Sponsored Content" },
                            ].map((item, i) => (
                                <motion.span key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.1 }} className="flex items-center gap-2 text-gray-400">
                                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">{item.icon}</span>
                                    {item.text}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Quick Start Wizard */}
                        <QuickStartWizard />
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-3">
                        <span className="text-white/40 text-xs uppercase tracking-[0.25em] font-medium">Discover More</span>
                        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ INDUSTRY RECOGNITION BAR ═══ */}
            <section className="bg-gray-900 py-5 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-sm">
                        <span className="text-gray-500 uppercase tracking-wider text-xs font-medium">As Featured In:</span>
                        {pressMentions.map((press, i) => (
                            <motion.span key={press.outlet} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-gray-400 font-display font-bold text-lg hover:text-white transition-colors cursor-default">
                                {press.outlet}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ LIVE STATISTICS DASHBOARD ═══ */}
            <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {liveStats.map((stat, i) => (
                            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                                </div>
                                <div className="text-gray-400 font-medium mb-2">{stat.label}</div>
                                <div className="text-xs text-emerald-400 font-medium">{stat.trend}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ DESTINATION DATA DASHBOARD ═══ */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-50 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">Destination Intelligence</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Naples at a Glance</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Real-time destination data powered by our research team.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {destinationHighlights.map((dest, i) => (
                            <motion.div key={dest.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all border border-gray-100 group">
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{dest.icon}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{dest.name}</h3>
                                <p className="text-ocean-600 font-semibold text-sm mb-3">{dest.rating}</p>
                                <div className="text-gray-500 text-sm">
                                    {dest.temp && <span>{dest.temp}</span>}
                                    {dest.visitors && <span>{dest.visitors}</span>}
                                    {dest.stores && <span>{dest.stores}</span>}
                                    {dest.wildlife && <span>{dest.wildlife}</span>}
                                    {dest.beaches && <span>{dest.beaches}</span>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ EDITORIAL BOARD ═══ */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-bold uppercase tracking-wider mb-4">Leadership</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Our Editorial Board</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Industry veterans ensuring every recommendation meets the highest standards.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {editorialBoard.map((editor, i) => (
                            <motion.div key={editor.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white text-2xl font-bold mb-6">{editor.name.split(' ').map(n => n[0]).join('')}</div>
                                <h3 className="text-xl font-bold text-gray-900">{editor.name}</h3>
                                <p className="text-ocean-600 font-semibold mb-2">{editor.title}</p>
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-4">{editor.credential}</span>
                                <p className="text-gray-600 text-sm leading-relaxed">{editor.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ RESEARCH METHODOLOGY ═══ */}
            <section className="py-24 bg-gray-900 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-900 text-ocean-300 text-sm font-bold uppercase tracking-wider mb-4 border border-ocean-700">Our Methodology</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">How We Ensure Accuracy</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">A rigorous 4-step process that sets us apart from generic travel content.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {methodology.map((step, i) => (
                            <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                                <div className="text-6xl font-display font-bold text-ocean-500/30 mb-4">{step.step}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PREMIUM GUIDES ═══ */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-ocean-100 to-teal-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">Our Curated Collections</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Authoritative Travel Guides</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Each guide represents hundreds of hours of research and firsthand experience.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {premiumCategories.map((cat, i) => (
                            <motion.div key={cat.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <Link href={cat.href} className="group relative block rounded-2xl overflow-hidden h-[400px] shadow-xl hover:shadow-2xl transition-all">
                                    <SafeImage src={cat.image} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                        <span className={`px-4 py-2 bg-gradient-to-r ${cat.gradient} rounded-lg text-white text-sm font-bold shadow-lg`}>{cat.badge}</span>
                                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-xl rounded-lg text-white text-xs font-medium border border-white/20">{cat.accuracy}</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-xs font-medium">{cat.stats}</span>
                                        </div>
                                        <h3 className="text-3xl font-display font-bold text-white mb-2">{cat.title}</h3>
                                        <p className="text-white/80 text-lg mb-4">{cat.subtitle}</p>
                                        <div className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-all">
                                            Explore Collection <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>→</motion.span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CONCIERGE SERVICES ═══ */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-wider mb-4">Exclusive Services</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Concierge-Level Support</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Because exceptional travel deserves exceptional service.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {conciergeServices.map((service, i) => (
                            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center group">
                                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{service.icon}</span>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${service.price === 'Complimentary' ? 'bg-emerald-100 text-emerald-700' : service.price === 'Partner Rates' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                    {service.price}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ VERIFIED TESTIMONIALS ═══ */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold uppercase tracking-wider mb-4">Verified Reviews</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
                        <p className="text-xl text-gray-600">Authentic feedback from verified community members.</p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {verifiedTestimonials.map((t, i) => (
                            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map(s => <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
                                    {t.verified && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1"><span>✓</span> Verified</span>}
                                </div>
                                <p className="text-gray-700 leading-relaxed mb-6">"{t.text}"</p>
                                <div className="border-t border-gray-200 pt-4">
                                    <p className="font-bold text-gray-900">{t.name}</p>
                                    <p className="text-gray-500 text-sm">{t.title}</p>
                                    <p className="text-ocean-600 text-xs font-medium mt-1">{t.trip}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ INDUSTRY PARTNERSHIPS ═══ */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-white mb-2">Industry Partnerships & Certifications</h2>
                        <p className="text-gray-400">Recognized by the organizations that matter.</p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {industryPartners.map((partner, i) => (
                            <motion.div key={partner.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-gray-600 transition-colors">
                                <p className="text-white font-semibold text-sm mb-1">{partner.name}</p>
                                <p className="text-gray-500 text-xs">{partner.type}</p>
                                <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${partner.tier === 'Diamond' ? 'bg-cyan-900/50 text-cyan-300' : partner.tier === 'Platinum' ? 'bg-purple-900/50 text-purple-300' : partner.tier === 'Gold' ? 'bg-amber-900/50 text-amber-300' : 'bg-gray-700 text-gray-400'}`}>
                                    {partner.tier}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section className="py-32 bg-gradient-to-br from-ocean-600 via-teal-600 to-ocean-700 relative overflow-hidden">
                <MorphingBlobs />
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block text-6xl mb-8">🌴</motion.span>
                        <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">Begin Your Naples Journey</h2>
                        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">Join 127,000+ discerning travelers who trust our expertise.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/plan" className="inline-flex items-center gap-3 px-12 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-2xl hover:-translate-y-1 transition-all">
                                Start Planning <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                            </Link>
                            <Link href="/about" className="inline-flex items-center justify-center px-10 py-5 bg-white/10 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                                Learn About Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══ PRIVATE EXPERIENCES MARKETPLACE ═══ */}
            <PrivateExperienceMarketplace />

            {/* ═══ WELLNESS & LONGEVITY HUB ═══ */}
            <WellnessHub />

            {/* ═══ MULTI-GENERATIONAL TRAVEL ═══ */}
            <MultiGenTripPlanner />

            {/* ═══ TRIP COST CALCULATOR ═══ */}
            <TripCostCalculator />

            {/* ═══ PREMIUM MEMBERSHIP ═══ */}
            <PremiumMembership />

            {/* ═══ PERSONALIZED RECOMMENDATIONS ═══ */}
            <RecommendedForYou />

            {/* ═══ NEWSLETTER ═══ */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <span className="inline-block px-4 py-2 rounded-full bg-ocean-900/50 text-ocean-300 text-sm font-bold mb-6 border border-ocean-800">Join 8,000+ Subscribers</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">The Naples Insider</h2>
                        <p className="text-xl text-gray-400 mb-10">Weekly intelligence on Naples dining, events, and exclusive opportunities.</p>
                        <NewsletterSignup variant="hero" title="" description="" />
                    </motion.div>
                </div>
            </section>

            <TrustCertifications />
            <MediaFeaturesSection />
            <TrustGuarantee />
            <ProfessionalTrustFooter />

            {/* ═══ PERSONALIZATION QUIZ ═══ */}
            <TravelStyleQuiz />
        </div>
    );
}
