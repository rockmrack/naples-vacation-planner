"use client";

import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/src/config/site";

// Trip planning questions
const planningSteps = [
    {
        id: "duration",
        question: "How long is your trip?",
        options: [
            { value: "1", label: "Day Trip", icon: "☀️" },
            { value: "2-3", label: "2-3 Days", icon: "🌴" },
            { value: "5", label: "5 Days", icon: "🏖️" },
            { value: "7+", label: "Week+", icon: "🌅" },
        ],
    },
    {
        id: "travelers",
        question: "Who are you traveling with?",
        options: [
            { value: "solo", label: "Solo", icon: "🧳" },
            { value: "couple", label: "Couple", icon: "💑" },
            { value: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
            { value: "friends", label: "Friends", icon: "👯" },
        ],
    },
    {
        id: "interests",
        question: "What interests you most?",
        options: [
            { value: "beach", label: "Beach & Relaxation", icon: "🏝️" },
            { value: "nature", label: "Nature & Wildlife", icon: "🦅" },
            { value: "food", label: "Food & Dining", icon: "🍽️" },
            { value: "culture", label: "Art & Culture", icon: "🎭" },
            { value: "adventure", label: "Adventure", icon: "🚤" },
            { value: "luxury", label: "Luxury", icon: "✨" },
        ],
    },
    {
        id: "pace",
        question: "What's your pace?",
        options: [
            { value: "relaxed", label: "Relaxed", icon: "🧘" },
            { value: "balanced", label: "Balanced", icon: "⚖️" },
            { value: "active", label: "Active", icon: "🏃" },
        ],
    },
];

// Mapping of selections to recommended itineraries
const getRecommendations = (answers: Record<string, string>) => {
    const recs: { slug: string; title: string; match: number }[] = [];

    // Duration-based recommendations
    if (answers.duration === "1") {
        recs.push({ slug: "naples-pier-beach-day", title: "Naples Pier Beach Day", match: 90 });
        recs.push({ slug: "naples-food-tour-guide", title: "Naples Food Tour", match: 85 });
    } else if (answers.duration === "2-3") {
        recs.push({ slug: "naples-3-day-itinerary", title: "Perfect 3-Day Naples Itinerary", match: 95 });
        recs.push({ slug: "naples-girlfriend-getaway", title: "Girlfriend Getaway", match: 80 });
    } else if (answers.duration === "5") {
        recs.push({ slug: "naples-5-day-beach-vacation", title: "5-Day Beach Vacation", match: 95 });
    } else if (answers.duration === "7+") {
        recs.push({ slug: "naples-7-day-ultimate-guide", title: "Ultimate 7-Day Naples Guide", match: 95 });
        recs.push({ slug: "naples-winter-escape", title: "Winter Escape", match: 85 });
    }

    // Interest-based additions
    if (answers.interests === "nature") {
        recs.push({ slug: "naples-wildlife-photography-tour", title: "Wildlife Photography Tour", match: 90 });
        recs.push({ slug: "naples-kayaking-mangrove-guide", title: "Kayaking Mangrove Guide", match: 85 });
    } else if (answers.interests === "food") {
        recs.push({ slug: "naples-ultimate-foodie-tour", title: "Ultimate Foodie Tour", match: 92 });
        recs.push({ slug: "naples-brunch-guide", title: "Best Brunch Spots", match: 80 });
    } else if (answers.interests === "luxury") {
        recs.push({ slug: "naples-ultra-luxury-weekend", title: "Ultra Luxury Weekend", match: 95 });
        recs.push({ slug: "naples-luxury-concierge", title: "VIP Concierge Experience", match: 90 });
    } else if (answers.interests === "adventure") {
        recs.push({ slug: "ten-thousand-islands-tours", title: "Ten Thousand Islands Adventure", match: 90 });
        recs.push({ slug: "naples-fishing-charter-guide", title: "Fishing Charter Guide", match: 85 });
    } else if (answers.interests === "culture") {
        recs.push({ slug: "naples-art-design-lovers-guide", title: "Art & Design Lovers Guide", match: 90 });
        recs.push({ slug: "naples-history-buff-guide", title: "History Buff Guide", match: 85 });
    }

    // Traveler type additions
    if (answers.travelers === "family") {
        recs.push({ slug: "naples-family-toddler-guide", title: "Family with Toddlers Guide", match: 88 });
        recs.push({ slug: "naples-rainy-day-kids-guide", title: "Rainy Day with Kids", match: 75 });
    } else if (answers.travelers === "couple") {
        recs.push({ slug: "naples-honeymoon-guide", title: "Romantic Honeymoon Guide", match: 90 });
        recs.push({ slug: "naples-sunset-lovers-guide", title: "Sunset Lovers Guide", match: 88 });
    } else if (answers.travelers === "solo") {
        recs.push({ slug: "naples-solo-traveler-guide", title: "Solo Traveler Guide", match: 92 });
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

export default function StartPlanningPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (stepId: string, value: string) => {
        const newAnswers = { ...answers, [stepId]: value };
        setAnswers(newAnswers);

        if (currentStep < planningSteps.length - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        } else {
            setTimeout(() => setShowResults(true), 300);
        }
    };

    const recommendations = getRecommendations(answers);

    const resetPlanner = () => {
        setCurrentStep(0);
        setAnswers({});
        setShowResults(false);
    };

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-900 via-teal-800 to-ocean-900" />
                <div className="absolute inset-0 hero-pattern opacity-20" />

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse-soft" />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-ocean-500/10 rounded-full blur-3xl animate-float" />

                <div className="relative section-container text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        Free Trip Planner
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white leading-tight mb-6">
                        Plan Your Perfect<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-ocean-300">
                            Naples Vacation
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        Answer a few quick questions and we'll recommend the perfect itinerary for your trip.
                    </p>
                </div>
            </section>

            {/* Planning Wizard */}
            <section className="section-container py-16 -mt-10">
                <div className="max-w-3xl mx-auto">
                    {!showResults ? (
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-sm text-gray-500 mb-2">
                                    <span>Question {currentStep + 1} of {planningSteps.length}</span>
                                    <span>{Math.round(((currentStep + 1) / planningSteps.length) * 100)}% complete</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-ocean-500 to-teal-500 transition-all duration-500"
                                        style={{ width: `${((currentStep + 1) / planningSteps.length) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Current Question */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    {planningSteps[currentStep].question}
                                </h2>
                                <p className="text-gray-500">Select one option to continue</p>
                            </div>

                            {/* Options Grid */}
                            <div className={`grid gap-4 ${planningSteps[currentStep].options.length > 4 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'}`}>
                                {planningSteps[currentStep].options.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(planningSteps[currentStep].id, option.value)}
                                        className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:border-ocean-500 hover:shadow-lg hover:-translate-y-1 ${answers[planningSteps[currentStep].id] === option.value
                                            ? 'border-ocean-500 bg-ocean-50'
                                            : 'border-gray-200 bg-white'
                                            }`}
                                    >
                                        <span className="text-4xl mb-3 block">{option.icon}</span>
                                        <span className="font-semibold text-gray-900">{option.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Back Button */}
                            {currentStep > 0 && (
                                <button
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="mt-6 text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center gap-1 mx-auto"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Go Back
                                </button>
                            )}
                        </div>
                    ) : (
                        /* Results Section */
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                            <div className="text-center mb-8">
                                <span className="text-5xl mb-4 block">🎉</span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Your Personalized Itineraries
                                </h2>
                                <p className="text-gray-500">
                                    Based on your preferences, here are our top recommendations:
                                </p>
                            </div>

                            {/* Recommendations List */}
                            <div className="space-y-4 mb-8">
                                {recommendations.map((rec, index) => (
                                    <Link
                                        key={rec.slug}
                                        href={`/itineraries/${rec.slug}`}
                                        className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-ocean-500 hover:shadow-md transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 group-hover:text-ocean-600 transition-colors">
                                                {rec.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="text-emerald-500 font-medium">{rec.match}% match</span>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-ocean-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={resetPlanner}
                                    className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:border-gray-300 transition-colors"
                                >
                                    Start Over
                                </button>
                                <Link
                                    href="/itineraries"
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                                >
                                    Browse All Itineraries
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="section-container py-16 bg-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Or Jump to Popular Categories</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                    <Link href="/itineraries" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
                        <span className="text-3xl mb-2 block">📅</span>
                        <span className="font-semibold text-gray-900 group-hover:text-ocean-600">Itineraries</span>
                    </Link>
                    <Link href="/day-trips" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
                        <span className="text-3xl mb-2 block">🚗</span>
                        <span className="font-semibold text-gray-900 group-hover:text-ocean-600">Day Trips</span>
                    </Link>
                    <Link href="/where-to-stay" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
                        <span className="text-3xl mb-2 block">🏨</span>
                        <span className="font-semibold text-gray-900 group-hover:text-ocean-600">Where to Stay</span>
                    </Link>
                    <Link href="/events" className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
                        <span className="text-3xl mb-2 block">🎉</span>
                        <span className="font-semibold text-gray-900 group-hover:text-ocean-600">Events</span>
                    </Link>
                </div>
            </section>
        </>
    );
}
