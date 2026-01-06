"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface QuizAnswer {
    travelStyle: string;
    budget: string;
    groupType: string;
    duration: string;
    interests: string[];
}

const TRAVEL_STYLES = [
    { id: "beach", emoji: "🏖️", label: "Beach & Relaxation", desc: "Sun, sand, and serenity" },
    { id: "culinary", emoji: "🍽️", label: "Culinary & Wine", desc: "World-class dining experiences" },
    { id: "golf", emoji: "⛳", label: "Golf & Country Club", desc: "Championship courses" },
    { id: "wellness", emoji: "🧘", label: "Wellness & Spa", desc: "Rejuvenation and self-care" },
    { id: "adventure", emoji: "🚤", label: "Adventure & Nature", desc: "Everglades, kayaking, wildlife" },
    { id: "culture", emoji: "🎭", label: "Arts & Culture", desc: "Galleries, theater, history" },
];

const BUDGETS = [
    { id: "luxury", emoji: "💎", label: "Luxury", desc: "$500-1,000/night", range: "$$$" },
    { id: "ultra", emoji: "👑", label: "Ultra-Luxury", desc: "$1,000+/night", range: "$$$$" },
    { id: "custom", emoji: "✨", label: "Money No Object", desc: "Bespoke experiences only", range: "$$$$$" },
];

const GROUP_TYPES = [
    { id: "couple", emoji: "💑", label: "Romantic Getaway" },
    { id: "family", emoji: "👨‍👩‍👧‍👦", label: "Family Vacation" },
    { id: "multigenerational", emoji: "👨‍👩‍👧‍👦👴👵", label: "Multi-Generational" },
    { id: "friends", emoji: "👯", label: "Friends Trip" },
    { id: "solo", emoji: "🧳", label: "Solo Traveler" },
    { id: "corporate", emoji: "💼", label: "Corporate/Golf Group" },
];

const DURATIONS = [
    { id: "weekend", label: "Long Weekend", days: "3-4 days" },
    { id: "week", label: "Full Week", days: "5-7 days" },
    { id: "extended", label: "Extended Stay", days: "10+ days" },
    { id: "seasonal", label: "Seasonal Residence", days: "1+ month" },
];

const INTERESTS = [
    { id: "fine-dining", label: "Fine Dining" },
    { id: "private-beach", label: "Private Beach Access" },
    { id: "spa", label: "Spa & Wellness" },
    { id: "golf", label: "Golf" },
    { id: "boating", label: "Yachting & Boating" },
    { id: "shopping", label: "Luxury Shopping" },
    { id: "wildlife", label: "Wildlife & Nature" },
    { id: "art", label: "Art & Galleries" },
    { id: "wine", label: "Wine & Spirits" },
    { id: "fitness", label: "Fitness & Yoga" },
];

export function TripPlannerQuiz() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer>({
        travelStyle: "",
        budget: "",
        groupType: "",
        duration: "",
        interests: [],
    });
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (field: keyof QuizAnswer, value: string) => {
        if (field === "interests") {
            const current = answers.interests;
            const updated = current.includes(value)
                ? current.filter((i) => i !== value)
                : [...current, value];
            setAnswers({ ...answers, interests: updated });
        } else {
            setAnswers({ ...answers, [field]: value });
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const handleComplete = () => {
        setShowResults(true);
    };

    const getRecommendation = () => {
        const recs: { title: string; link: string; desc: string }[] = [];

        if (answers.travelStyle === "beach") {
            recs.push({ title: "Ultimate Beach Day Itinerary", link: "/itineraries/naples-beach-day", desc: "Sun, sand, and luxury" });
        }
        if (answers.travelStyle === "culinary") {
            recs.push({ title: "Naples Food & Wine Trail", link: "/itineraries/naples-food-lovers", desc: "Michelin-quality dining" });
        }
        if (answers.travelStyle === "golf") {
            recs.push({ title: "Championship Golf Experience", link: "/itineraries/naples-golf-guide", desc: "Tiburon, Naples Grande & more" });
        }
        if (answers.budget === "ultra" || answers.budget === "custom") {
            recs.push({ title: "The Ritz-Carlton Naples", link: "/hotels/ritz-carlton-naples", desc: "Beachfront ultra-luxury" });
        }
        if (answers.groupType === "family" || answers.groupType === "multigenerational") {
            recs.push({ title: "Multi-Gen Family Guide", link: "/itineraries/naples-family-vacation", desc: "Activities for all ages" });
        }

        return recs.length > 0 ? recs : [
            { title: "Explore All Itineraries", link: "/itineraries", desc: "60+ curated guides" },
            { title: "Where to Stay", link: "/where-to-stay", desc: "Luxury accommodations" },
        ];
    };

    const steps = [
        {
            title: "What's your travel style?",
            subtitle: "Select your primary focus",
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {TRAVEL_STYLES.map((style) => (
                        <motion.button
                            key={style.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect("travelStyle", style.id)}
                            className={`p-6 rounded-2xl border-2 text-left transition-all ${answers.travelStyle === style.id
                                    ? "border-ocean-500 bg-ocean-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <span className="text-3xl mb-3 block">{style.emoji}</span>
                            <h3 className="font-bold text-gray-900">{style.label}</h3>
                            <p className="text-sm text-gray-500">{style.desc}</p>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            title: "What's your budget level?",
            subtitle: "We'll tailor recommendations accordingly",
            content: (
                <div className="grid md:grid-cols-3 gap-4">
                    {BUDGETS.map((budget) => (
                        <motion.button
                            key={budget.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect("budget", budget.id)}
                            className={`p-8 rounded-2xl border-2 text-center transition-all ${answers.budget === budget.id
                                    ? "border-amber-500 bg-amber-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <span className="text-4xl mb-3 block">{budget.emoji}</span>
                            <h3 className="font-bold text-gray-900 text-lg">{budget.label}</h3>
                            <p className="text-sm text-gray-500">{budget.desc}</p>
                            <span className="inline-block mt-2 text-amber-600 font-bold">{budget.range}</span>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            title: "Who's traveling?",
            subtitle: "Tell us about your group",
            content: (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {GROUP_TYPES.map((group) => (
                        <motion.button
                            key={group.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect("groupType", group.id)}
                            className={`p-6 rounded-2xl border-2 text-center transition-all ${answers.groupType === group.id
                                    ? "border-purple-500 bg-purple-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <span className="text-3xl mb-2 block">{group.emoji}</span>
                            <h3 className="font-bold text-gray-900">{group.label}</h3>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            title: "How long is your trip?",
            subtitle: "Duration helps us plan perfectly",
            content: (
                <div className="grid grid-cols-2 gap-4">
                    {DURATIONS.map((duration) => (
                        <motion.button
                            key={duration.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect("duration", duration.id)}
                            className={`p-6 rounded-2xl border-2 text-center transition-all ${answers.duration === duration.id
                                    ? "border-teal-500 bg-teal-50"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                        >
                            <h3 className="font-bold text-gray-900 text-lg">{duration.label}</h3>
                            <p className="text-gray-500">{duration.days}</p>
                        </motion.button>
                    ))}
                </div>
            ),
        },
        {
            title: "Select your interests",
            subtitle: "Choose all that apply",
            content: (
                <div>
                    <div className="flex flex-wrap gap-3 mb-8">
                        {INTERESTS.map((interest) => (
                            <motion.button
                                key={interest.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelect("interests", interest.id)}
                                className={`px-5 py-3 rounded-full border-2 font-medium transition-all ${answers.interests.includes(interest.id)
                                        ? "border-ocean-500 bg-ocean-500 text-white"
                                        : "border-gray-200 hover:border-gray-300 bg-white text-gray-700"
                                    }`}
                            >
                                {interest.label}
                            </motion.button>
                        ))}
                    </div>
                    <button
                        onClick={handleComplete}
                        className="w-full py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold text-lg rounded-xl hover:shadow-xl transition-all"
                    >
                        Get My Personalized Itinerary →
                    </button>
                </div>
            ),
        },
    ];

    if (showResults) {
        const recommendations = getRecommendation();
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto p-8"
            >
                <div className="text-center mb-8">
                    <span className="text-5xl mb-4 block">✨</span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Naples Trip</h2>
                    <p className="text-gray-600">Based on your preferences, here are our top recommendations:</p>
                </div>
                <div className="space-y-4 mb-8">
                    {recommendations.map((rec, i) => (
                        <Link
                            key={i}
                            href={rec.link}
                            className="block p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-ocean-300 hover:shadow-lg transition-all"
                        >
                            <h3 className="font-bold text-gray-900 text-lg">{rec.title}</h3>
                            <p className="text-gray-600">{rec.desc}</p>
                        </Link>
                    ))}
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                    <h3 className="font-bold text-gray-900 mb-2">🎯 Want a Fully Personalized Itinerary?</h3>
                    <p className="text-gray-600 mb-4">Our concierge team can create a bespoke trip plan just for you.</p>
                    <Link
                        href="/contact"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                    >
                        Request Concierge Planning →
                    </Link>
                </div>
            </motion.div>
        );
    }

    const currentStep = steps[step];

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Step {step + 1} of {steps.length}</span>
                    <span>{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-ocean-500 to-teal-500"
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStep.title}</h2>
                        <p className="text-gray-600">{currentStep.subtitle}</p>
                    </div>
                    {currentStep.content}
                </motion.div>
            </AnimatePresence>

            {step > 0 && (
                <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 text-gray-500 hover:text-gray-700 font-medium"
                >
                    ← Back
                </button>
            )}
        </div>
    );
}
