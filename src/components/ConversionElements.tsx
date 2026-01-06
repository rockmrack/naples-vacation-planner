"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const activities = [
    { name: "Sarah M.", location: "Chicago, IL", action: "started planning a 5-day trip", time: "2 min ago" },
    { name: "The Hendersons", location: "Boston, MA", action: "booked a luxury itinerary", time: "5 min ago" },
    { name: "Michael R.", location: "New York, NY", action: "viewed The Ritz-Carlton Naples", time: "8 min ago" },
    { name: "Jennifer L.", location: "Toronto, CA", action: "downloaded the beaches guide", time: "12 min ago" },
    { name: "David & Lisa", location: "Atlanta, GA", action: "reserved a sunset cruise", time: "15 min ago" },
    { name: "The Williams Family", location: "Denver, CO", action: "planned a Marco Island day trip", time: "18 min ago" },
    { name: "Amanda K.", location: "Seattle, WA", action: "explored Everglades tours", time: "22 min ago" },
    { name: "Robert J.", location: "Miami, FL", action: "saved 3 restaurants to favorites", time: "25 min ago" },
];

export function LiveActivityTicker() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % activities.length);
                setIsVisible(true);
            }, 500);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const current = activities[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 left-4 z-40 max-w-sm"
        >
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex items-start gap-3"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                            {current.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900 font-medium truncate">
                                <span className="font-bold">{current.name}</span> from {current.location}
                            </p>
                            <p className="text-sm text-gray-600 truncate">{current.action}</p>
                            <p className="text-xs text-gray-400 mt-1">{current.time}</p>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-gray-600 text-xs"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FloatingBookingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 shadow-2xl"
        >
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Left side - Urgency message */}
                    <div className="hidden md:flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-white text-sm">
                            <span className="font-bold text-green-400">847 travelers</span> planning trips this week
                        </span>
                    </div>

                    {/* Center - Quick selectors */}
                    <div className="flex-1 flex items-center gap-3 justify-center">
                        <select className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-ocean-500 focus:border-transparent">
                            <option>When are you visiting?</option>
                            <option>January 2026</option>
                            <option>February 2026</option>
                            <option>March 2026</option>
                            <option>April 2026</option>
                            <option>Spring Break</option>
                        </select>
                        <select className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-ocean-500 focus:border-transparent hidden sm:block">
                            <option>Trip style?</option>
                            <option>🏖️ Beach Relaxation</option>
                            <option>🍽️ Foodie Experience</option>
                            <option>👨‍👩‍👧‍👦 Family Adventure</option>
                            <option>💑 Romantic Getaway</option>
                            <option>⛳ Golf Trip</option>
                        </select>
                    </div>

                    {/* Right side - CTA button */}
                    <Link
                        href="/plan"
                        className="group relative px-6 py-2.5 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-ocean-500/40 transition-all overflow-hidden whitespace-nowrap"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Start Free Planning
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export function UrgencyBanner() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

    useEffect(() => {
        const target = new Date("2026-01-31T23:59:59");
        const updateTime = () => {
            const now = new Date();
            const diff = target.getTime() - now.getTime();
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / (1000 * 60)) % 60),
                });
            }
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white py-2 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm font-medium">
                <span className="animate-pulse">🔥</span>
                <span>
                    <strong>Winter 2026 Special:</strong> Free premium itinerary with any booking
                </span>
                <span className="hidden sm:inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                    <span>Ends in</span>
                    <span className="font-mono font-bold">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
                </span>
                <Link href="/plan" className="underline hover:no-underline font-bold">
                    Claim Now →
                </Link>
            </div>
        </div>
    );
}

export function QuickStartWizard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 max-w-2xl"
        >
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Start Your Perfect Trip in 30 Seconds
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
                <select className="flex-1 bg-white/20 text-white rounded-xl px-4 py-3 border border-white/30 focus:ring-2 focus:ring-white/50 focus:border-transparent appearance-none cursor-pointer">
                    <option className="text-gray-900">When are you visiting?</option>
                    <option className="text-gray-900">January 2026</option>
                    <option className="text-gray-900">February 2026</option>
                    <option className="text-gray-900">March 2026</option>
                    <option className="text-gray-900">April 2026</option>
                    <option className="text-gray-900">May 2026</option>
                </select>
                <select className="flex-1 bg-white/20 text-white rounded-xl px-4 py-3 border border-white/30 focus:ring-2 focus:ring-white/50 focus:border-transparent appearance-none cursor-pointer">
                    <option className="text-gray-900">Trip style?</option>
                    <option className="text-gray-900">🏖️ Beach & Relax</option>
                    <option className="text-gray-900">🍽️ Food & Culture</option>
                    <option className="text-gray-900">👨‍👩‍👧‍👦 Family Fun</option>
                    <option className="text-gray-900">💑 Romance</option>
                </select>
                <Link
                    href="/plan"
                    className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl whitespace-nowrap text-center"
                >
                    Get Custom Itinerary →
                </Link>
            </div>
            <p className="text-white/60 text-xs mt-3 text-center">
                Free • No signup required • Personalized in seconds
            </p>
        </motion.div>
    );
}
