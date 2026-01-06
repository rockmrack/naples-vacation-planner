'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/src/lib/auth-context';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function ProfilePage() {
    const { user, isLoading, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean-500"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-ocean-500 to-teal-500 rounded-3xl p-8 mb-8 text-white"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                            {user.avatar || '👤'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-1">Welcome, {user.name}!</h1>
                            <p className="text-white/80">{user.email}</p>
                            <p className="text-sm text-white/60 mt-1">
                                Member since {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Saved Trips */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">My Saved Trips</h2>
                                <Link
                                    href="/trip-builder"
                                    className="px-4 py-2 bg-ocean-500 text-white font-semibold rounded-lg hover:bg-ocean-600 transition-colors text-sm"
                                >
                                    + New Trip
                                </Link>
                            </div>

                            {(!user.savedTrips || user.savedTrips.length === 0) ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <span className="text-5xl mb-4 block">🗺️</span>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h3>
                                    <p className="text-gray-600 mb-4">Start planning your perfect Naples vacation!</p>
                                    <Link
                                        href="/trip-builder"
                                        className="inline-block px-6 py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                                    >
                                        Create Your First Trip
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {user.savedTrips.map((trip) => (
                                        <div
                                            key={trip.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{trip.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {trip.items.length} activities • Updated {new Date(trip.updatedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Link
                                                href={`/trip-builder?id=${trip.id}`}
                                                className="px-4 py-2 text-ocean-600 font-medium hover:bg-ocean-50 rounded-lg transition-colors"
                                            >
                                                Edit →
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.section>

                        {/* Favorites */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">My Favorites</h2>

                            {(!user.favorites || user.favorites.length === 0) ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <span className="text-5xl mb-4 block">❤️</span>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
                                    <p className="text-gray-600 mb-4">Save your favorite places to find them easily later</p>
                                    <Link
                                        href="/itineraries"
                                        className="inline-block px-6 py-3 border-2 border-ocean-500 text-ocean-600 font-bold rounded-xl hover:bg-ocean-50 transition-all"
                                    >
                                        Explore Itineraries
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {user.favorites.map((slug) => (
                                        <Link
                                            key={slug}
                                            href={`/itineraries/${slug}`}
                                            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                        >
                                            <p className="font-medium text-gray-900 truncate">{slug.replace(/-/g, ' ')}</p>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/trip-builder"
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-xl">🗓️</span>
                                    <span className="font-medium text-gray-700">Plan a Trip</span>
                                </Link>
                                <Link
                                    href="/itineraries"
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-xl">📖</span>
                                    <span className="font-medium text-gray-700">Browse Itineraries</span>
                                </Link>
                                <Link
                                    href="/restaurants"
                                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <span className="text-xl">🍽️</span>
                                    <span className="font-medium text-gray-700">Find Restaurants</span>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Account Settings */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h3 className="font-bold text-gray-900 mb-4">Account</h3>
                            <div className="space-y-3">
                                <button className="flex items-center gap-3 p-3 w-full bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                                    <span className="text-xl">⚙️</span>
                                    <span className="font-medium text-gray-700">Settings</span>
                                </button>
                                <button className="flex items-center gap-3 p-3 w-full bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left">
                                    <span className="text-xl">🔔</span>
                                    <span className="font-medium text-gray-700">Notifications</span>
                                </button>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 p-3 w-full bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-left"
                                >
                                    <span className="text-xl">🚪</span>
                                    <span className="font-medium text-red-700">Sign Out</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Upgrade CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white"
                        >
                            <span className="text-3xl mb-3 block">👑</span>
                            <h3 className="font-bold text-lg mb-2">Upgrade to Premium</h3>
                            <p className="text-sm text-white/90 mb-4">
                                Get exclusive access to VIP itineraries, concierge support, and member discounts.
                            </p>
                            <Link
                                href="/membership"
                                className="inline-block w-full text-center py-3 bg-white text-orange-600 font-bold rounded-xl hover:shadow-lg transition-all"
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
