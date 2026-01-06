'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';

// ============================================================================
// USER PREFERENCES (Stored in localStorage)
// ============================================================================
interface UserPreferences {
    interests: string[];
    travelStyle: 'luxury' | 'budget' | 'family' | 'adventure' | null;
    visitedPages: string[];
    lastVisit: string;
    tripDates?: { start: string; end: string };
}

const STORAGE_KEY = 'naples_user_prefs';

function getUserPreferences(): UserPreferences {
    if (typeof window === 'undefined') {
        return { interests: [], travelStyle: null, visitedPages: [], lastVisit: '' };
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading user preferences:', e);
    }

    return { interests: [], travelStyle: null, visitedPages: [], lastVisit: '' };
}

function saveUserPreferences(prefs: UserPreferences): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
        console.error('Error saving user preferences:', e);
    }
}

// Track page visit and extract interests from content
export function usePersonalization() {
    const [preferences, setPreferences] = useState<UserPreferences>({
        interests: [],
        travelStyle: null,
        visitedPages: [],
        lastVisit: ''
    });

    useEffect(() => {
        const prefs = getUserPreferences();
        prefs.lastVisit = new Date().toISOString();

        // Track current page
        const currentPath = window.location.pathname;
        if (!prefs.visitedPages.includes(currentPath)) {
            prefs.visitedPages = [...prefs.visitedPages.slice(-19), currentPath];
        }

        // Extract interests from URL patterns
        const pathParts = currentPath.split('/');
        if (pathParts.includes('itineraries')) {
            if (!prefs.interests.includes('itineraries')) {
                prefs.interests.push('itineraries');
            }
        }
        if (pathParts.includes('things-to-do')) {
            const activity = pathParts[pathParts.indexOf('things-to-do') + 1];
            if (activity && !prefs.interests.includes(activity)) {
                prefs.interests = [...prefs.interests.slice(-9), activity];
            }
        }
        if (pathParts.includes('hotels') || pathParts.includes('where-to-stay')) {
            if (!prefs.interests.includes('accommodation')) {
                prefs.interests.push('accommodation');
            }
        }
        if (pathParts.includes('restaurants')) {
            if (!prefs.interests.includes('dining')) {
                prefs.interests.push('dining');
            }
        }

        saveUserPreferences(prefs);
        setPreferences(prefs);
    }, []);

    const updateTravelStyle = useCallback((style: UserPreferences['travelStyle']) => {
        const prefs = getUserPreferences();
        prefs.travelStyle = style;
        saveUserPreferences(prefs);
        setPreferences(prefs);
    }, []);

    const updateTripDates = useCallback((start: string, end: string) => {
        const prefs = getUserPreferences();
        prefs.tripDates = { start, end };
        saveUserPreferences(prefs);
        setPreferences(prefs);
    }, []);

    return { preferences, updateTravelStyle, updateTripDates };
}

// ============================================================================
// PERSONALIZED HERO COMPONENT
// ============================================================================
interface PersonalizedHeroProps {
    defaultTitle?: string;
    defaultSubtitle?: string;
}

export function PersonalizedHero({
    defaultTitle = "Plan Your Perfect Naples Escape",
    defaultSubtitle = "Expert-curated guides for Florida's Gulf Coast paradise"
}: PersonalizedHeroProps) {
    const { preferences } = usePersonalization();
    const [greeting, setGreeting] = useState('');
    const [personalMessage, setPersonalMessage] = useState('');

    useEffect(() => {
        // Time-based greeting
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 17) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        // Personalized message based on visit history
        if (preferences.visitedPages.length > 5) {
            setPersonalMessage('Welcome back! Continue planning your Naples vacation.');
        } else if (preferences.interests.includes('golfing')) {
            setPersonalMessage('Explore world-class golf courses in the Golf Capital of the World.');
        } else if (preferences.interests.includes('beach')) {
            setPersonalMessage('Discover pristine beaches and stunning Gulf sunsets.');
        } else if (preferences.interests.includes('dining')) {
            setPersonalMessage('Indulge in Naples\' exceptional culinary scene.');
        } else if (preferences.travelStyle === 'luxury') {
            setPersonalMessage('Experience the finest luxury accommodations and experiences.');
        } else if (preferences.travelStyle === 'family') {
            setPersonalMessage('Plan an unforgettable family vacation in Naples.');
        }
    }, [preferences]);

    return (
        <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/patterns/waves.svg')] opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <div className="relative max-w-6xl mx-auto px-4 text-center">
                {greeting && (
                    <p className="text-blue-200 text-lg mb-2">{greeting}!</p>
                )}
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    {personalMessage ? personalMessage : defaultTitle}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                    {defaultSubtitle}
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/plan"
                        className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-lg"
                    >
                        Plan Your Trip →
                    </Link>
                    <Link
                        href="/itineraries"
                        className="px-8 py-4 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
                    >
                        Browse Itineraries
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// RECOMMENDED FOR YOU COMPONENT
// ============================================================================
interface RecommendedItem {
    title: string;
    slug: string;
    type: string;
    description: string;
    image?: string;
}

const defaultRecommendations: RecommendedItem[] = [
    { title: "3-Day Naples Itinerary", slug: "naples-3-day-itinerary", type: "itinerary", description: "The perfect introduction to Naples" },
    { title: "Best Beaches in Naples", slug: "beach", type: "things-to-do", description: "White sand and calm Gulf waters" },
    { title: "Where to Stay Guide", slug: "port-royal", type: "where-to-stay", description: "Naples' most exclusive neighborhood" },
];

const interestBasedRecommendations: Record<string, RecommendedItem[]> = {
    'golfing': [
        { title: "80+ Golf Courses", slug: "golfing", type: "things-to-do", description: "Play world-class courses" },
        { title: "Golf Resort Hotels", slug: "tiburon-golf-resort", type: "hotel", description: "Stay where you play" },
    ],
    'beach': [
        { title: "Best Beaches Guide", slug: "beach", type: "things-to-do", description: "Find your perfect beach" },
        { title: "Shelling in Naples", slug: "shelling", type: "things-to-do", description: "Hunt for beautiful shells" },
    ],
    'dining': [
        { title: "Food Tours", slug: "naples-food-tour", type: "itinerary", description: "Taste the best of Naples" },
        { title: "Stone Crab Season", slug: "naples-stone-crab-season", type: "itinerary", description: "Don't miss this delicacy" },
    ],
    'kayaking': [
        { title: "Kayaking Guide", slug: "kayaking", type: "things-to-do", description: "Paddle through mangroves" },
        { title: "Wildlife Tours", slug: "wildlife-tours", type: "things-to-do", description: "See dolphins and manatees" },
    ],
};

function getRouteBase(type: string): string {
    const routes: Record<string, string> = {
        'itinerary': 'itineraries',
        'things-to-do': 'things-to-do',
        'where-to-stay': 'where-to-stay',
        'hotel': 'hotels',
    };
    return routes[type] || type;
}

export function RecommendedForYou() {
    const { preferences } = usePersonalization();
    const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);

    useEffect(() => {
        const recs: RecommendedItem[] = [];

        // Add interest-based recommendations
        for (const interest of preferences.interests.slice(-3)) {
            const interestRecs = interestBasedRecommendations[interest];
            if (interestRecs) {
                recs.push(...interestRecs.slice(0, 2));
            }
        }

        // Fill with defaults if needed
        if (recs.length < 3) {
            recs.push(...defaultRecommendations.slice(0, 3 - recs.length));
        }

        // Deduplicate
        const unique = recs.filter((rec, index, self) =>
            index === self.findIndex(r => r.slug === rec.slug)
        );

        setRecommendations(unique.slice(0, 6));
    }, [preferences]);

    if (recommendations.length === 0) return null;

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    ✨ Recommended For You
                </h2>
                <p className="text-gray-600 mb-8">
                    Based on your interests and browsing history
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendations.map((rec) => (
                        <Link
                            key={rec.slug}
                            href={`/${getRouteBase(rec.type)}/${rec.slug}`}
                            className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all"
                        >
                            <div className="h-40 bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                                <span className="text-6xl opacity-50">
                                    {rec.type === 'itinerary' ? '📅' :
                                        rec.type === 'things-to-do' ? '🏖️' :
                                            rec.type === 'hotel' ? '🏨' : '📍'}
                                </span>
                            </div>
                            <div className="p-5">
                                <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                                    {rec.type.replace('-', ' ')}
                                </span>
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mt-1">
                                    {rec.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-2">{rec.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// TRAVEL STYLE QUIZ COMPONENT
// ============================================================================
export function TravelStyleQuiz() {
    const { updateTravelStyle } = usePersonalization();
    const [showQuiz, setShowQuiz] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const styles = [
        { id: 'luxury', label: '💎 Luxury', description: 'Five-star hotels, fine dining, exclusive experiences' },
        { id: 'family', label: '👨‍👩‍👧‍👦 Family', description: 'Kid-friendly attractions, beach resorts, easy logistics' },
        { id: 'adventure', label: '🚣 Adventure', description: 'Kayaking, wildlife tours, outdoor activities' },
        { id: 'budget', label: '💰 Budget-Friendly', description: 'Great value, local favorites, smart spending' },
    ];

    const handleSelect = (style: string) => {
        setSelected(style);
        updateTravelStyle(style as UserPreferences['travelStyle']);
        setTimeout(() => setShowQuiz(false), 1000);
    };

    if (!showQuiz) {
        return (
            <button
                onClick={() => setShowQuiz(true)}
                className="fixed bottom-20 right-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
            >
                🎯 Personalize My Trip
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">What's Your Travel Style?</h3>
                <p className="text-gray-600 text-sm mb-6">Help us personalize your experience</p>

                <div className="space-y-3">
                    {styles.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => handleSelect(style.id)}
                            className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selected === style.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                        >
                            <span className="font-semibold text-gray-900">{style.label}</span>
                            <span className="block text-sm text-gray-500 mt-1">{style.description}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setShowQuiz(false)}
                    className="mt-4 text-gray-500 text-sm hover:text-gray-700"
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
}
