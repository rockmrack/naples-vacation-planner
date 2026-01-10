"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = [
    {
        id: "FREE",
        name: "Free",
        price: 0,
        interval: "forever",
        description: "Perfect for trip planning",
        features: [
            "Full content access",
            "All itineraries & guides",
            "Events calendar",
            "Restaurant recommendations",
            "Basic trip planning",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        id: "TRAVELER",
        name: "Traveler",
        price: 9.99,
        interval: "month",
        description: "For serious trip planners",
        features: [
            "Everything in Free",
            "PDF Itinerary Downloads",
            "Ad-Free Experience",
            "Priority Email Support",
            "Early Event Access",
            "Exclusive Partner Deals",
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        id: "VIP",
        name: "VIP",
        price: 29.99,
        interval: "month",
        description: "Concierge-level service",
        features: [
            "Everything in Traveler",
            "Concierge Chat Access",
            "Custom Itinerary Builder",
            "Private Experience Booking",
            "Relocation Consultation",
            "24/7 Priority Support",
        ],
        cta: "Go VIP",
        popular: false,
    },
];

export default function MembershipPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const [email, setEmail] = useState("");

    const handleSubscribe = async (planId: string) => {
        if (planId === "FREE") {
            window.location.href = "/register";
            return;
        }

        setLoading(planId);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId, email }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Failed to start checkout. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <section className="py-20 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-ocean-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-6">
                        Premium Membership
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Unlock the{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-500 to-teal-500">
                            Ultimate Naples Experience
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get exclusive access to PDF downloads, concierge support, partner deals,
                        and personalized trip planning tools.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-105 ${plan.popular
                                        ? "border-ocean-500 shadow-ocean-100"
                                        : "border-gray-100"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-ocean-500 text-white text-sm font-bold rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {plan.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold text-gray-900">
                                            ${plan.price}
                                        </span>
                                        <span className="text-gray-500">/{plan.interval}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <svg
                                                className="w-5 h-5 text-green-500 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={loading === plan.id}
                                    className={`w-full py-3 px-6 rounded-xl font-bold text-center transition-all ${plan.popular
                                            ? "bg-ocean-600 text-white hover:bg-ocean-700 shadow-lg shadow-ocean-200"
                                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                                        } ${loading === plan.id ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    {loading === plan.id ? "Loading..." : plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h3>
                            <p className="text-gray-600">
                                Yes! You can cancel your subscription at any time. You'll continue
                                to have access until the end of your billing period.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">
                                What payment methods do you accept?
                            </h3>
                            <p className="text-gray-600">
                                We accept all major credit cards (Visa, Mastercard, American Express)
                                through our secure Stripe payment processor.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">
                                Is there a free trial?
                            </h3>
                            <p className="text-gray-600">
                                Yes! The Traveler plan includes a 7-day free trial. Cancel before
                                the trial ends and you won't be charged.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
