'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LeadMagnetCTAProps {
    variant?: 'inline' | 'sidebar' | 'fullwidth' | 'popup';
    title?: string;
    description?: string;
    magnetType?: 'packing-list' | 'itinerary' | 'restaurant-guide' | 'beach-secrets' | 'general';
    buttonText?: string;
}

const magnetInfo = {
    'packing-list': {
        title: '📦 Ultimate Naples Packing List',
        description: "Don't forget a thing! Our comprehensive packing list covers every season and activity.",
        icon: '🧳',
    },
    'itinerary': {
        title: '📋 7-Day Perfect Naples Itinerary',
        description: 'Get our complete day-by-day guide with insider tips and exact timing.',
        icon: '📅',
    },
    'restaurant-guide': {
        title: '🍽️ Naples Restaurant Insider Guide',
        description: 'Our curated list of the best restaurants locals actually love.',
        icon: '🥘',
    },
    'beach-secrets': {
        title: '🏖️ Best Beach Parking Secrets',
        description: 'Save money and find the best spots with our parking guide.',
        icon: '🚗',
    },
    'general': {
        title: '🌴 Free Naples Travel Guide',
        description: 'Get our comprehensive Naples guide delivered to your inbox.',
        icon: '✈️',
    },
};

export function LeadMagnetCTA({
    variant = 'inline',
    title,
    description,
    magnetType = 'general',
    buttonText = 'Get Free Guide',
}: LeadMagnetCTAProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const magnet = magnetInfo[magnetType];
    const displayTitle = title || magnet.title;
    const displayDescription = description || magnet.description;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In production, this would call an actual API
        setStatus('success');
    };

    if (status === 'success') {
        return (
            <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${variant === 'fullwidth' ? 'py-12' : ''
                }`}>
                <span className="text-4xl mb-4 block">🎉</span>
                <h3 className="font-bold text-green-800 text-xl mb-2">Check Your Email!</h3>
                <p className="text-green-700">
                    Your guide is on its way. Check your inbox (and spam folder just in case).
                </p>
            </div>
        );
    }

    // Inline variant - fits within content
    if (variant === 'inline') {
        return (
            <div className="my-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                    <span className="text-4xl">{magnet.icon}</span>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{displayTitle}</h3>
                        <p className="text-gray-600 text-sm mb-4">{displayDescription}</p>
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                required
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {status === 'loading' ? '...' : buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // Sidebar variant - compact vertical layout
    if (variant === 'sidebar') {
        return (
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                <span className="text-4xl mb-3 block">{magnet.icon}</span>
                <h3 className="font-bold text-xl mb-2">{displayTitle}</h3>
                <p className="text-white/90 text-sm mb-4">{displayDescription}</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/30 rounded-lg text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none"
                        required
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        {status === 'loading' ? 'Sending...' : buttonText}
                    </button>
                </form>
                <p className="text-xs text-white/70 mt-3 text-center">
                    No spam. Unsubscribe anytime.
                </p>
            </div>
        );
    }

    // Fullwidth variant - banner style
    if (variant === 'fullwidth') {
        return (
            <section className="bg-gradient-to-r from-blue-900 to-teal-800 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-5xl mb-4 block">{magnet.icon}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{displayTitle}</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{displayDescription}</p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-300 outline-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-4 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors shadow-lg disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Sending...' : buttonText}
                        </button>
                    </form>
                    <p className="text-sm text-white/70 mt-4">
                        Join 10,000+ travelers planning their Naples vacation
                    </p>
                </div>
            </section>
        );
    }

    // Default fallback
    return null;
}

// Quick Download Links Component
export function DownloadLinks() {
    const downloads = [
        { name: 'Naples Packing List', type: 'packing-list', format: 'PDF' },
        { name: '7-Day Itinerary', type: 'itinerary', format: 'PDF' },
        { name: 'Restaurant Guide', type: 'restaurant-guide', format: 'PDF' },
        { name: 'Beach Parking Map', type: 'beach-secrets', format: 'PDF' },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📥 Free Downloads</h3>
            <div className="space-y-3">
                {downloads.map((download) => (
                    <Link
                        key={download.type}
                        href={`/downloads?type=${download.type}`}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
                    >
                        <span className="text-gray-700 group-hover:text-blue-700">{download.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{download.format}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
