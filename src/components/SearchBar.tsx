'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchResult {
    title: string;
    slug: string;
    type: string;
    description: string;
}

function getRouteBase(type: string): string {
    const routes: Record<string, string> = {
        'itinerary': 'itineraries',
        'travel-tip': 'travel-tips',
        'day-trip': 'day-trips',
        'where-to-stay': 'where-to-stay',
        'hotel': 'hotels',
        'restaurant': 'restaurants',
        'event': 'events',
    };
    return routes[type] || type;
}

// Static search suggestions (can be enhanced with API in production)
const searchIndex: SearchResult[] = [
    { title: 'Naples 3-Day Itinerary', slug: 'naples-3-day-itinerary', type: 'itinerary', description: 'Perfect weekend getaway plan' },
    { title: 'Naples 5-Day Itinerary', slug: 'naples-5-day-itinerary', type: 'itinerary', description: 'Extended vacation with more activities' },
    { title: 'Naples 7-Day Itinerary', slug: 'naples-7-day-itinerary', type: 'itinerary', description: 'Complete week-long Naples experience' },
    { title: 'Romantic Naples Getaway', slug: 'romantic-naples-getaway', type: 'itinerary', description: 'Perfect couples retreat' },
    { title: 'Best Beaches in Naples', slug: 'best-beaches', type: 'travel-tip', description: 'Top-rated beaches for families and couples' },
    { title: 'Kayaking in Naples', slug: 'kayaking', type: 'travel-tip', description: 'Explore mangroves and wildlife' },
    { title: 'Where to Stay', slug: 'naples-accommodation-guide', type: 'where-to-stay', description: 'Hotels and resorts for every budget' },
    { title: 'Stone Crab Guide', slug: 'stone-crab-season', type: 'travel-tip', description: 'When and where to find the best stone crabs' },
    { title: 'Everglades Day Trip', slug: 'everglades-day-trip', type: 'day-trip', description: 'Visit the Everglades from Naples' },
    { title: 'Fifth Avenue Shopping', slug: 'best-shopping-naples', type: 'travel-tip', description: 'Best boutiques and galleries' },
    { title: 'Naples Pier Guide', slug: 'naples-pier-guide', type: 'travel-tip', description: 'Iconic sunset spot and fishing location' },
    { title: 'Ritz-Carlton Naples', slug: 'ritz-carlton-naples', type: 'hotel', description: 'Luxury beachfront resort' },
    { title: 'Naples Grande Beach Resort', slug: 'naples-grande', type: 'hotel', description: 'Full-service beach resort' },
    { title: 'Best Restaurants in Naples', slug: 'best-restaurants', type: 'restaurant', description: 'Top dining experiences' },
    { title: 'Marco Island Day Trip', slug: 'marco-island', type: 'day-trip', description: 'Explore beautiful Marco Island' },
    { title: 'Sanibel Island Day Trip', slug: 'sanibel-island', type: 'day-trip', description: 'World-class shelling destination' },
    { title: 'Golf in Naples', slug: 'golfing', type: 'travel-tip', description: 'Top golf courses and tee times' },
    { title: 'January in Naples', slug: 'january', type: 'event', description: 'Perfect winter escape' },
    { title: 'February in Naples', slug: 'february', type: 'event', description: 'Great weather before crowds' },
    { title: 'March in Naples', slug: 'march', type: 'event', description: 'Spring break season' },
];

function fuzzySearch(query: string, items: SearchResult[]): SearchResult[] {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const words = lowerQuery.split(/\s+/);

    return items
        .map(item => {
            const titleLower = item.title.toLowerCase();
            const descLower = item.description.toLowerCase();

            let score = 0;

            // Exact title match
            if (titleLower.includes(lowerQuery)) score += 10;

            // Word matches
            for (const word of words) {
                if (titleLower.includes(word)) score += 5;
                if (descLower.includes(word)) score += 2;
            }

            return { item, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(({ item }) => item);
}

export function SearchBar({ variant = 'navbar' }: { variant?: 'navbar' | 'modal' }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        // Keyboard shortcut: Cmd/Ctrl + K
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSearch = (value: string) => {
        setQuery(value);
        if (value.length >= 2) {
            setResults(fuzzySearch(value, searchIndex));
        } else {
            setResults([]);
        }
    };

    if (variant === 'navbar') {
        return (
            <div ref={containerRef} className="relative">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="hidden sm:inline">Search...</span>
                    <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">
                        ⌘K
                    </kbd>
                </button>

                {isOpen && (
                    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                        <div className="p-3 border-b border-gray-100">
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search itineraries, hotels, tips..."
                                className="w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {results.length > 0 ? (
                            <ul className="max-h-80 overflow-y-auto">
                                {results.map((result) => (
                                    <li key={`${result.type}-${result.slug}`}>
                                        <Link
                                            href={`/${getRouteBase(result.type)}/${result.slug}`}
                                            onClick={() => { setIsOpen(false); setQuery(''); }}
                                            className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                                                {result.type.replace('-', ' ')}
                                            </span>
                                            <p className="font-medium text-gray-900 truncate">
                                                {result.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate">
                                                {result.description}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : query.length >= 2 ? (
                            <div className="px-4 py-8 text-center text-gray-500">
                                No results found for "{query}"
                            </div>
                        ) : (
                            <div className="px-4 py-6 text-center text-gray-400 text-sm">
                                Start typing to search...
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return null;
}
