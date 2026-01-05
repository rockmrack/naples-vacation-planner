"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced planning questions with rich visuals
const planningSteps = [
    {
        id: "duration",
        question: "How long will you be in paradise?",
        subtitle: "This helps us tailor the perfect experience",
        options: [
            { value: "1", label: "Quick Escape", description: "Perfect day trip", icon: "☀️", gradient: "from-amber-400 to-orange-500" },
            { value: "2-3", label: "Long Weekend", description: "2-3 magical days", icon: "🌴", gradient: "from-emerald-400 to-teal-500" },
            { value: "5", label: "Full Vacation", description: "5 days of bliss", icon: "🏖️", gradient: "from-cyan-400 to-blue-500" },
            { value: "7+", label: "Extended Stay", description: "Week or more", icon: "🌅", gradient: "from-purple-400 to-pink-500" },
        ],
    },
    {
        id: "travelers",
        question: "Who's joining the adventure?",
        subtitle: "We'll customize recommendations for your group",
        options: [
            { value: "solo", label: "Solo Explorer", description: "Me, myself & I", icon: "🧳", gradient: "from-indigo-400 to-purple-500" },
            { value: "couple", label: "Romantic Duo", description: "Love is in the air", icon: "💑", gradient: "from-rose-400 to-pink-500" },
            { value: "family", label: "Family Fun", description: "Kids in tow", icon: "👨‍👩‍👧‍👦", gradient: "from-green-400 to-emerald-500" },
            { value: "friends", label: "Friend Squad", description: "The whole crew", icon: "👯", gradient: "from-orange-400 to-red-500" },
        ],
    },
    {
        id: "interests",
        question: "What makes your heart sing?",
        subtitle: "Select your top interest",
        options: [
            { value: "beach", label: "Beach Bliss", description: "Sun, sand, repeat", icon: "🏝️", gradient: "from-cyan-400 to-blue-500" },
            { value: "nature", label: "Nature & Wildlife", description: "Dolphins & mangroves", icon: "🦅", gradient: "from-green-400 to-teal-500" },
            { value: "food", label: "Culinary Journey", description: "Taste of Naples", icon: "🍽️", gradient: "from-amber-400 to-orange-500" },
            { value: "culture", label: "Arts & Culture", description: "Museums & galleries", icon: "🎭", gradient: "from-purple-400 to-indigo-500" },
            { value: "adventure", label: "Thrill Seeker", description: "Action & excitement", icon: "🚤", gradient: "from-red-400 to-rose-500" },
            { value: "luxury", label: "Luxury Living", description: "Only the finest", icon: "✨", gradient: "from-yellow-400 to-amber-500" },
        ],
    },
    {
        id: "pace",
        question: "What's your vacation vibe?",
        subtitle: "Fast-paced adventure or lazy beach days?",
        options: [
            { value: "relaxed", label: "Zen Mode", description: "Slow & peaceful", icon: "🧘", gradient: "from-teal-400 to-cyan-500" },
            { value: "balanced", label: "Best of Both", description: "Mix it up", icon: "⚖️", gradient: "from-blue-400 to-indigo-500" },
            { value: "active", label: "Go Go Go!", description: "Pack it all in", icon: "🏃", gradient: "from-orange-400 to-red-500" },
        ],
    },
    {
        id: "budget",
        question: "What's your comfort zone?",
        subtitle: "This helps us match the right experiences",
        options: [
            { value: "budget", label: "Budget Smart", description: "Best value finds", icon: "💰", gradient: "from-green-400 to-emerald-500" },
            { value: "moderate", label: "Comfortable", description: "Nice & balanced", icon: "💵", gradient: "from-blue-400 to-cyan-500" },
            { value: "luxury", label: "Splurge Mode", description: "No limits", icon: "💎", gradient: "from-purple-400 to-pink-500" },
        ],
    },
];

// Enhanced recommendation engine
const getRecommendations = (answers: Record<string, string>) => {
    const recs: { slug: string; title: string; match: number; description: string; duration: string; highlights: string[] }[] = [];

    // Duration-based core recommendations
    if (answers.duration === "1") {
        recs.push({
            slug: "naples-pier-beach-day",
            title: "Naples Pier Beach Day",
            match: 90,
            description: "The perfect introduction to Naples' iconic beach and pier",
            duration: "1 Day",
            highlights: ["Naples Pier", "Beach Time", "Sunset Views"]
        });
        recs.push({
            slug: "naples-food-tour-guide",
            title: "Ultimate Food Tour",
            match: 85,
            description: "Taste your way through Naples' best restaurants",
            duration: "1 Day",
            highlights: ["5th Avenue Dining", "Local Favorites", "Stone Crabs"]
        });
    } else if (answers.duration === "2-3") {
        recs.push({
            slug: "naples-3-day-itinerary",
            title: "Perfect 3-Day Naples Escape",
            match: 95,
            description: "The ultimate long weekend in paradise",
            duration: "3 Days",
            highlights: ["Beach", "Dining", "Nature", "Shopping"]
        });
        recs.push({
            slug: "naples-girlfriend-getaway",
            title: "Girlfriend Getaway",
            match: 80,
            description: "Spa, shopping, and sunset cocktails",
            duration: "3 Days",
            highlights: ["Spa Day", "Shopping", "Fine Dining"]
        });
    } else if (answers.duration === "5") {
        recs.push({
            slug: "naples-5-day-beach-vacation",
            title: "5-Day Beach Vacation",
            match: 95,
            description: "The complete Naples beach experience",
            duration: "5 Days",
            highlights: ["Multiple Beaches", "Day Trips", "Local Life"]
        });
    } else if (answers.duration === "7+") {
        recs.push({
            slug: "naples-7-day-ultimate-guide",
            title: "Ultimate 7-Day Naples Guide",
            match: 95,
            description: "The definitive Naples experience",
            duration: "7 Days",
            highlights: ["Complete Coverage", "Day Trips", "Hidden Gems"]
        });
        recs.push({
            slug: "naples-winter-escape",
            title: "Winter Escape",
            match: 85,
            description: "Escape the cold in sunny Naples",
            duration: "7+ Days",
            highlights: ["Perfect Weather", "Snowbird Life", "Extended Stay"]
        });
    }

    // Interest-based additions
    if (answers.interests === "nature") {
        recs.push({
            slug: "naples-wildlife-photography-tour",
            title: "Wildlife Photography Tour",
            match: 90,
            description: "Capture dolphins, manatees, and exotic birds",
            duration: "1-2 Days",
            highlights: ["Dolphins", "Wildlife", "Photography"]
        });
        recs.push({
            slug: "naples-kayaking-mangrove-guide",
            title: "Kayaking Mangrove Adventure",
            match: 85,
            description: "Paddle through pristine mangrove tunnels",
            duration: "Half Day",
            highlights: ["Kayaking", "Mangroves", "Nature"]
        });
    } else if (answers.interests === "food") {
        recs.push({
            slug: "naples-ultimate-foodie-tour",
            title: "Ultimate Foodie Experience",
            match: 92,
            description: "From stone crabs to fine dining",
            duration: "Multi-Day",
            highlights: ["Stone Crabs", "5th Ave Dining", "Hidden Gems"]
        });
        recs.push({
            slug: "naples-brunch-guide",
            title: "Best Brunch Spots",
            match: 80,
            description: "Start your day the Naples way",
            duration: "1 Day",
            highlights: ["Brunch", "Coffee", "Ocean Views"]
        });
    } else if (answers.interests === "luxury") {
        recs.push({
            slug: "naples-ultra-luxury-weekend",
            title: "Ultra Luxury Weekend",
            match: 95,
            description: "Private jets, yachts, and Michelin-star dining",
            duration: "3 Days",
            highlights: ["Yacht Charter", "VIP Dining", "Private Beach"]
        });
        recs.push({
            slug: "naples-luxury-concierge",
            title: "VIP Concierge Experience",
            match: 90,
            description: "White-glove service from arrival to departure",
            duration: "Any",
            highlights: ["Private Tours", "Exclusive Access", "Personal Shopper"]
        });
    } else if (answers.interests === "adventure") {
        recs.push({
            slug: "ten-thousand-islands-tours",
            title: "Ten Thousand Islands Adventure",
            match: 90,
            description: "Explore the wild backcountry of the Everglades",
            duration: "Full Day",
            highlights: ["Boat Tour", "Wildlife", "Remote Islands"]
        });
        recs.push({
            slug: "naples-fishing-charter-guide",
            title: "Deep Sea Fishing Charter",
            match: 85,
            description: "Battle the big ones offshore",
            duration: "Half/Full Day",
            highlights: ["Offshore Fishing", "Captain & Crew", "Fresh Catch"]
        });
    } else if (answers.interests === "culture") {
        recs.push({
            slug: "naples-art-design-lovers-guide",
            title: "Art & Design Lovers Guide",
            match: 90,
            description: "Discover Naples' thriving art scene",
            duration: "2 Days",
            highlights: ["Galleries", "Museums", "Art Walk"]
        });
        recs.push({
            slug: "naples-history-buff-guide",
            title: "History & Heritage Tour",
            match: 85,
            description: "From pioneers to Palm Cottage",
            duration: "1 Day",
            highlights: ["Historic Sites", "Museums", "Walking Tours"]
        });
    }

    // Traveler type additions
    if (answers.travelers === "family") {
        recs.push({
            slug: "naples-family-toddler-guide",
            title: "Family with Kids Guide",
            match: 88,
            description: "Kid-approved Naples adventures",
            duration: "Multi-Day",
            highlights: ["Zoo", "Beach", "Water Park"]
        });
        recs.push({
            slug: "naples-rainy-day-kids-guide",
            title: "Rainy Day with Kids",
            match: 75,
            description: "Indoor fun when the weather doesn't cooperate",
            duration: "1 Day",
            highlights: ["Museums", "Arcade", "Movies"]
        });
    } else if (answers.travelers === "couple") {
        recs.push({
            slug: "naples-honeymoon-guide",
            title: "Romantic Honeymoon Guide",
            match: 90,
            description: "Fall in love with Naples together",
            duration: "3-5 Days",
            highlights: ["Private Dinners", "Couples Spa", "Sunset Cruise"]
        });
        recs.push({
            slug: "naples-sunset-lovers-guide",
            title: "Sunset Lovers Guide",
            match: 88,
            description: "Chase the golden hour every evening",
            duration: "3 Days",
            highlights: ["Best Sunset Spots", "Cocktails", "Photography"]
        });
    } else if (answers.travelers === "solo") {
        recs.push({
            slug: "naples-solo-traveler-guide",
            title: "Solo Traveler's Paradise",
            match: 92,
            description: "Your personal Naples adventure",
            duration: "Any",
            highlights: ["Safety Tips", "Social Spots", "Self-Care"]
        });
    }

    // Budget adjustments
    if (answers.budget === "budget") {
        recs.push({
            slug: "naples-free-activities",
            title: "Free & Cheap Naples",
            match: 85,
            description: "Amazing experiences that won't break the bank",
            duration: "Any",
            highlights: ["Free Beaches", "Sunset Walks", "Happy Hours"]
        });
    }

    // Sort by match and deduplicate
    const uniqueRecs = recs.reduce((acc, curr) => {
        if (!acc.find(r => r.slug === curr.slug)) {
            acc.push(curr);
        }
        return acc;
    }, [] as typeof recs);

    return uniqueRecs.sort((a, b) => b.match - a.match).slice(0, 5);
};

// Animated counter component
const AnimatedCounter = ({ value, duration = 1500 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [value, duration]);

    return <span>{count}</span>;
};

export default function StartPlanningPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleSelect = useCallback((stepId: string, value: string) => {
        if (isAnimating) return;

        setIsAnimating(true);
        const newAnswers = { ...answers, [stepId]: value };
        setAnswers(newAnswers);

        setTimeout(() => {
            if (currentStep < planningSteps.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                setShowConfetti(true);
                setTimeout(() => setShowResults(true), 800);
            }
            setIsAnimating(false);
        }, 400);
    }, [answers, currentStep, isAnimating]);

    const recommendations = getRecommendations(answers);
    const progress = ((currentStep + 1) / planningSteps.length) * 100;

    const resetPlanner = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResults(false);
        setShowConfetti(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-ocean-50">
            {/* Confetti Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
                    >
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: -20,
                                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                    rotate: 0,
                                    opacity: 1
                                }}
                                animate={{
                                    y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                                    rotate: Math.random() * 720 - 360,
                                    opacity: 0
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    delay: Math.random() * 0.5
                                }}
                                className={`absolute w-3 h-3 rounded-sm ${['bg-ocean-500', 'bg-teal-500', 'bg-amber-500', 'bg-rose-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
                                    }`}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-teal-800 to-ocean-900" />

                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute top-10 left-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-ocean-500 rounded-full blur-3xl"
                    />
                </div>

                <div className="relative section-container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-6">
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-2 h-2 bg-emerald-400 rounded-full"
                            />
                            AI-Powered Trip Planner
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                            Your Dream Naples Trip<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-ocean-300">
                                Starts Here
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                            Answer 5 quick questions and our AI will craft<br className="hidden sm:block" />
                            your personalized Naples itinerary in seconds.
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                60+ Curated Itineraries
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Expert Verified
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                100% Free
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Planning Wizard */}
            <section className="section-container py-12 -mt-8">
                <div className="max-w-4xl mx-auto">
                    <AnimatePresence mode="wait">
                        {!showResults ? (
                            <motion.div
                                key="wizard"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white rounded-3xl shadow-2xl shadow-ocean-500/10 p-8 md:p-12 border border-gray-100 relative overflow-hidden"
                            >
                                {/* Decorative gradient */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-500 via-teal-500 to-cyan-500" />

                                {/* Progress Section */}
                                <div className="mb-10">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{planningSteps[currentStep].options[0].icon.split("")[0]}</span>
                                            <span className="text-sm font-medium text-gray-500">
                                                Step {currentStep + 1} of {planningSteps.length}
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-ocean-600">
                                            <AnimatedCounter value={Math.round(progress)} />% complete
                                        </span>
                                    </div>

                                    {/* Animated Progress Bar */}
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-ocean-500 via-teal-500 to-cyan-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    </div>

                                    {/* Step Indicators */}
                                    <div className="flex justify-between mt-4">
                                        {planningSteps.map((step, idx) => (
                                            <motion.div
                                                key={step.id}
                                                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all ${idx < currentStep
                                                        ? 'bg-ocean-500 text-white'
                                                        : idx === currentStep
                                                            ? 'bg-ocean-100 text-ocean-600 ring-2 ring-ocean-500 ring-offset-2'
                                                            : 'bg-gray-100 text-gray-400'
                                                    }`}
                                                animate={idx === currentStep ? { scale: [1, 1.1, 1] } : {}}
                                                transition={{ duration: 0.5 }}
                                            >
                                                {idx < currentStep ? (
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                    </svg>
                                                ) : (
                                                    idx + 1
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Current Question */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center mb-10"
                                    >
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                            {planningSteps[currentStep].question}
                                        </h2>
                                        <p className="text-gray-500 text-lg">{planningSteps[currentStep].subtitle}</p>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Options Grid */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className={`grid gap-4 ${planningSteps[currentStep].options.length > 4 ? 'grid-cols-2 md:grid-cols-3' : planningSteps[currentStep].options.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-2'}`}
                                    >
                                        {planningSteps[currentStep].options.map((option, idx) => (
                                            <motion.button
                                                key={option.value}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                                whileHover={{ scale: 1.03, y: -4 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSelect(planningSteps[currentStep].id, option.value)}
                                                disabled={isAnimating}
                                                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${answers[planningSteps[currentStep].id] === option.value
                                                        ? 'border-ocean-500 bg-ocean-50 shadow-lg shadow-ocean-500/20'
                                                        : 'border-gray-200 bg-white hover:border-ocean-300 hover:shadow-lg'
                                                    }`}
                                            >
                                                {/* Gradient Background on Hover */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />

                                                <div className="relative">
                                                    <span className="text-4xl mb-3 block">{option.icon}</span>
                                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{option.label}</h3>
                                                    <p className="text-sm text-gray-500">{option.description}</p>
                                                </div>

                                                {/* Selection Indicator */}
                                                {answers[planningSteps[currentStep].id] === option.value && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute top-3 right-3 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center"
                                                    >
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                                        </svg>
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Back Button */}
                                {currentStep > 0 && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={() => setCurrentStep(currentStep - 1)}
                                        className="mt-8 text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-2 mx-auto group"
                                    >
                                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Go Back
                                    </motion.button>
                                )}
                            </motion.div>
                        ) : (
                            /* Results Section */
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-3xl shadow-2xl shadow-ocean-500/10 p-8 md:p-12 border border-gray-100 relative overflow-hidden"
                            >
                                {/* Decorative gradient */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-ocean-500" />

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center mb-10"
                                >
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.3 }}
                                        className="text-6xl mb-4 block"
                                    >
                                        🎉
                                    </motion.span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                        Your Perfect Itineraries
                                    </h2>
                                    <p className="text-gray-500 text-lg">
                                        Based on your preferences, here are our top picks for you:
                                    </p>
                                </motion.div>

                                {/* Recommendations List */}
                                <div className="space-y-4 mb-10">
                                    {recommendations.map((rec, index) => (
                                        <motion.div
                                            key={rec.slug}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            <Link
                                                href={`/itineraries/${rec.slug}`}
                                                className="group flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-ocean-500 hover:shadow-xl transition-all bg-white"
                                            >
                                                {/* Rank Badge */}
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0 ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500' :
                                                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                                                            index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700' :
                                                                'bg-gradient-to-br from-ocean-500 to-teal-500'
                                                    }`}>
                                                    #{index + 1}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-ocean-600 transition-colors">
                                                            {rec.title}
                                                        </h3>
                                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold shrink-0 ml-2">
                                                            {rec.match}% Match
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-500 mb-3">{rec.description}</p>

                                                    {/* Tags */}
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="px-2 py-1 bg-ocean-100 text-ocean-700 rounded-lg text-xs font-medium">
                                                            {rec.duration}
                                                        </span>
                                                        {rec.highlights.slice(0, 3).map(h => (
                                                            <span key={h} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                                                {h}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Arrow */}
                                                <svg className="w-6 h-6 text-gray-400 group-hover:text-ocean-500 group-hover:translate-x-2 transition-all shrink-0 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                >
                                    <button
                                        onClick={resetPlanner}
                                        className="px-8 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Start Over
                                    </button>
                                    <Link
                                        href="/itineraries"
                                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-semibold shadow-lg shadow-ocean-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                                    >
                                        Browse All Itineraries
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-container py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "60+", label: "Expert Guides", icon: "📚" },
                            { value: "100K+", label: "Happy Travelers", icon: "😊" },
                            { value: "4.9", label: "Average Rating", icon: "⭐" },
                            { value: "0", label: "Cost to You", icon: "💰" },
                        ].map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-6"
                            >
                                <span className="text-3xl mb-2 block">{stat.icon}</span>
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="section-container py-16 bg-gradient-to-br from-gray-50 to-ocean-50/30">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Or Explore by Category</h2>
                    <p className="text-gray-500">Jump straight to what interests you most</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    {[
                        { href: "/itineraries", label: "All Itineraries", icon: "📅", color: "from-ocean-500 to-blue-500" },
                        { href: "/day-trips", label: "Day Trips", icon: "🚗", color: "from-emerald-500 to-teal-500" },
                        { href: "/where-to-stay", label: "Where to Stay", icon: "🏨", color: "from-purple-500 to-pink-500" },
                        { href: "/events", label: "Events 2026", icon: "🎉", color: "from-amber-500 to-orange-500" },
                    ].map((link, idx) => (
                        <motion.div
                            key={link.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link
                                href={link.href}
                                className="group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all text-center border border-gray-100 hover:border-transparent relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                                <span className="text-4xl mb-3 block relative">{link.icon}</span>
                                <span className="font-semibold text-gray-900 group-hover:text-ocean-600 transition-colors relative">{link.label}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
