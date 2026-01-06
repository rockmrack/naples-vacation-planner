'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';

// ============================================================================
// PAYWALL GATE COMPONENT
// ============================================================================
interface PaywallGateProps {
    children: React.ReactNode;
    previewContent?: React.ReactNode;
    title?: string;
    description?: string;
    membershipTier?: 'free' | 'premium' | 'vip';
    requiredTier?: 'premium' | 'vip';
}

// Simulated auth check (would connect to actual auth in production)
function useAuth() {
    // In production, this would check actual session/JWT
    const [user] = useState<{ tier: string } | null>(null);
    return { user, isLoading: false };
}

export function PaywallGate({
    children,
    previewContent,
    title = "Premium Content",
    description = "Unlock this exclusive guide with a Naples Insider membership",
    requiredTier = 'premium'
}: PaywallGateProps) {
    const { user, isLoading } = useAuth();

    // Check if user has access
    const hasAccess = user && (
        user.tier === 'vip' ||
        (requiredTier === 'premium' && (user.tier === 'premium' || user.tier === 'vip'))
    );

    if (isLoading) {
        return <div className="animate-pulse bg-gray-200 h-64 rounded-xl" />;
    }

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            {/* Preview content with blur */}
            {previewContent && (
                <div className="relative">
                    <div className="blur-sm pointer-events-none">
                        {previewContent}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
                </div>
            )}

            {/* Paywall message */}
            <div className="bg-gradient-to-br from-blue-900 to-teal-800 rounded-2xl p-8 text-center text-white">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-white/90 mb-6 max-w-md mx-auto">{description}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/membership"
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        Become an Insider →
                    </Link>
                    <Link
                        href="/membership#pricing"
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
                    >
                        View Plans
                    </Link>
                </div>

                <p className="text-sm text-white/60 mt-6">
                    Already a member? <Link href="/login" className="underline hover:text-white">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

// ============================================================================
// MEMBERSHIP BENEFITS COMPONENT
// ============================================================================
interface MembershipTier {
    name: string;
    price: string;
    features: string[];
    cta: string;
    popular?: boolean;
}

const membershipTiers: Record<string, MembershipTier> = {
    free: {
        name: 'Explorer',
        price: 'Free',
        features: [
            'Browse all public guides',
            'Save favorite destinations',
            'Basic itinerary access',
            'Weekly newsletter',
        ],
        cta: 'Get Started',
    },
    premium: {
        name: 'Insider',
        price: '$9.99/month',
        features: [
            'All Explorer benefits',
            'Premium itineraries with insider tips',
            'Downloadable packing lists & guides',
            'Restaurant reservation tips',
            'Exclusive deals & discounts',
            'Priority email support',
        ],
        cta: 'Upgrade Now',
        popular: true,
    },
    vip: {
        name: 'VIP Concierge',
        price: '$29.99/month',
        features: [
            'All Insider benefits',
            'Personal trip planning consultation',
            'Exclusive hotel rate access',
            'Priority restaurant reservations',
            'Concierge chat support',
            'Custom itinerary creation',
        ],
        cta: 'Go VIP',
    },
};

export function MembershipPricing() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Choose Your Naples Experience
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Unlock exclusive guides, insider tips, and personalized planning assistance
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {Object.entries(membershipTiers).map(([key, tier]) => (
                        <div
                            key={key}
                            className={`relative bg-white rounded-2xl p-8 shadow-lg ${tier.popular ? 'ring-2 ring-blue-500 transform md:-translate-y-4' : ''
                                }`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                            <p className="text-3xl font-bold text-blue-600 mb-6">{tier.price}</p>

                            <ul className="space-y-3 mb-8">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-600">
                                        <span className="text-green-500 font-bold">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/membership/checkout?tier=${key}`}
                                className={`block w-full text-center py-3 rounded-xl font-bold transition-colors ${tier.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                    }`}
                            >
                                {tier.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Cancel anytime. 7-day money-back guarantee on all paid plans.
                </p>
            </div>
        </section>
    );
}

// ============================================================================
// EXCLUSIVE CONTENT BADGE
// ============================================================================
export function ExclusiveBadge({ tier = 'premium' }: { tier?: 'premium' | 'vip' }) {
    const colors = {
        premium: 'from-blue-500 to-indigo-600',
        vip: 'from-amber-500 to-orange-600',
    };

    const labels = {
        premium: 'Insider Exclusive',
        vip: 'VIP Only',
    };

    return (
        <span className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r ${colors[tier]} text-white text-xs font-bold rounded-full`}>
            <span>🔒</span>
            {labels[tier]}
        </span>
    );
}

// ============================================================================
// MEMBER WELCOME BANNER
// ============================================================================
export function MemberWelcome() {
    const { user } = useAuth();

    if (!user) return null;

    const tierInfo = membershipTiers[user.tier as keyof typeof membershipTiers];
    if (!tierInfo) return null;

    return (
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <p className="font-medium">
                    👋 Welcome back, {tierInfo.name} member!
                </p>
                <Link
                    href="/dashboard"
                    className="text-sm px-4 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                >
                    My Dashboard
                </Link>
            </div>
        </div>
    );
}
