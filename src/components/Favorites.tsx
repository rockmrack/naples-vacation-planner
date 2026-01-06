'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import Link from 'next/link';

interface FavoriteItem {
    id: string;
    title: string;
    slug: string;
    type: string;
    addedAt: string;
}

interface FavoritesContextType {
    favorites: FavoriteItem[];
    addFavorite: (item: Omit<FavoriteItem, 'id' | 'addedAt'>) => void;
    removeFavorite: (slug: string) => void;
    isFavorite: (slug: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
}

const STORAGE_KEY = 'naples_favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Error loading favorites:', e);
        }
    }, []);

    const saveFavorites = useCallback((items: FavoriteItem[]) => {
        setFavorites(items);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, []);

    const addFavorite = useCallback((item: Omit<FavoriteItem, 'id' | 'addedAt'>) => {
        const newItem: FavoriteItem = {
            ...item,
            id: `${item.type}-${item.slug}`,
            addedAt: new Date().toISOString(),
        };
        saveFavorites([...favorites, newItem]);
    }, [favorites, saveFavorites]);

    const removeFavorite = useCallback((slug: string) => {
        saveFavorites(favorites.filter(f => f.slug !== slug));
    }, [favorites, saveFavorites]);

    const isFavorite = useCallback((slug: string) => {
        return favorites.some(f => f.slug === slug);
    }, [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

interface FavoriteButtonProps {
    title: string;
    slug: string;
    type: string;
    variant?: 'icon' | 'button';
}

export function FavoriteButton({ title, slug, type, variant = 'icon' }: FavoriteButtonProps) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const saved = isFavorite(slug);

    const handleClick = () => {
        if (saved) {
            removeFavorite(slug);
        } else {
            addFavorite({ title, slug, type });
        }
    };

    if (variant === 'button') {
        return (
            <button
                onClick={handleClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${saved
                        ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                    }`}
            >
                <svg
                    className={`w-5 h-5 ${saved ? 'fill-current' : 'stroke-current fill-none'}`}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
                {saved ? 'Saved' : 'Save'}
            </button>
        );
    }

    return (
        <button
            onClick={handleClick}
            className={`p-2 rounded-full transition-colors ${saved
                    ? 'text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30'
                    : 'text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
            aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
        >
            <svg
                className={`w-6 h-6 ${saved ? 'fill-current' : 'stroke-current fill-none'}`}
                viewBox="0 0 24 24"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </button>
    );
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

export function FavoritesList() {
    const { favorites, removeFavorite } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="text-center py-12">
                <span className="text-5xl mb-4 block">💾</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No saved items yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Click the heart icon on any guide to save it for later
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {favorites.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                            {item.type.replace('-', ' ')}
                        </span>
                        <Link
                            href={`/${getRouteBase(item.type)}/${item.slug}`}
                            className="block font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate"
                        >
                            {item.title}
                        </Link>
                    </div>
                    <button
                        onClick={() => removeFavorite(item.slug)}
                        className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove from favorites"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
}

export function FavoritesCounter() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) return null;

    return (
        <Link
            href="/favorites"
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {favorites.length}
            </span>
        </Link>
    );
}
