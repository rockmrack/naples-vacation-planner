'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User interface
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    preferences?: {
        travelStyle?: string;
        budget?: string;
        interests?: string[];
    };
    savedTrips?: SavedTrip[];
    favorites?: string[];
    createdAt: string;
}

export interface SavedTrip {
    id: string;
    name: string;
    startDate?: string;
    endDate?: string;
    items: TripItem[];
    createdAt: string;
    updatedAt: string;
}

export interface TripItem {
    id: string;
    day: number;
    time?: string;
    type: 'activity' | 'restaurant' | 'hotel' | 'transport';
    title: string;
    location?: string;
    notes?: string;
    contentSlug?: string;
}

// Auth context interface
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
    addFavorite: (slug: string) => void;
    removeFavorite: (slug: string) => void;
    isFavorite: (slug: string) => boolean;
    saveTrip: (trip: Omit<SavedTrip, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTrip: (tripId: string, updates: Partial<SavedTrip>) => void;
    deleteTrip: (tripId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

// Local storage keys
const STORAGE_KEYS = {
    USER: 'naples_user',
    USERS_DB: 'naples_users_db',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem(STORAGE_KEYS.USER);
            }
        }
        setIsLoading(false);
    }, []);

    // Persist user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
            // Also update in "database"
            const usersDb = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '{}');
            usersDb[user.email] = { ...usersDb[user.email], ...user };
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(usersDb));
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const usersDb = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '{}');
        const userData = usersDb[email.toLowerCase()];

        if (!userData) {
            return { success: false, error: 'No account found with this email' };
        }

        if (userData.password !== password) {
            return { success: false, error: 'Incorrect password' };
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = userData;
        setUser(userWithoutPassword);
        return { success: true };
    };

    const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const usersDb = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS_DB) || '{}');

        if (usersDb[email.toLowerCase()]) {
            return { success: false, error: 'An account with this email already exists' };
        }

        const newUser: User & { password: string } = {
            id: generateId(),
            email: email.toLowerCase(),
            name,
            password,
            savedTrips: [],
            favorites: [],
            createdAt: new Date().toISOString(),
        };

        usersDb[email.toLowerCase()] = newUser;
        localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(usersDb));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.USER);
    };

    const updateProfile = (updates: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...updates });
        }
    };

    const addFavorite = (slug: string) => {
        if (user) {
            const favorites = user.favorites || [];
            if (!favorites.includes(slug)) {
                setUser({ ...user, favorites: [...favorites, slug] });
            }
        }
    };

    const removeFavorite = (slug: string) => {
        if (user) {
            setUser({
                ...user,
                favorites: (user.favorites || []).filter(f => f !== slug),
            });
        }
    };

    const isFavorite = (slug: string) => {
        return user?.favorites?.includes(slug) || false;
    };

    const saveTrip = (trip: Omit<SavedTrip, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (user) {
            const newTrip: SavedTrip = {
                ...trip,
                id: generateId(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setUser({
                ...user,
                savedTrips: [...(user.savedTrips || []), newTrip],
            });
        }
    };

    const updateTrip = (tripId: string, updates: Partial<SavedTrip>) => {
        if (user) {
            setUser({
                ...user,
                savedTrips: (user.savedTrips || []).map(trip =>
                    trip.id === tripId
                        ? { ...trip, ...updates, updatedAt: new Date().toISOString() }
                        : trip
                ),
            });
        }
    };

    const deleteTrip = (tripId: string) => {
        if (user) {
            setUser({
                ...user,
                savedTrips: (user.savedTrips || []).filter(trip => trip.id !== tripId),
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                updateProfile,
                addFavorite,
                removeFavorite,
                isFavorite,
                saveTrip,
                updateTrip,
                deleteTrip,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
