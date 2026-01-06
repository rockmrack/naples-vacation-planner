'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface NotificationPreferences {
    events: boolean;
    deals: boolean;
    weather: boolean;
    reminders: boolean;
}

export function NotificationManager() {
    const [permission, setPermission] = useState<NotificationPermission>(
        typeof window !== 'undefined' && 'Notification' in window
            ? Notification.permission
            : 'default'
    );
    const [preferences, setPreferences] = useState<NotificationPreferences>({
        events: true,
        deals: true,
        weather: true,
        reminders: true,
    });
    const [isLoading, setIsLoading] = useState(false);

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            alert('This browser does not support notifications');
            return;
        }

        setIsLoading(true);

        try {
            const result = await Notification.requestPermission();
            setPermission(result);

            if (result === 'granted') {
                // Show a test notification
                new Notification('🌴 Naples Vacation Planner', {
                    body: 'Notifications are now enabled! You\'ll receive updates about events and deals.',
                    icon: '/images/icon-192.png',
                });
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }

        setIsLoading(false);
    };

    const togglePreference = (key: keyof NotificationPreferences) => {
        setPreferences(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
        // In production, save to server/localStorage
    };

    if (permission === 'denied') {
        return (
            <div className="bg-gray-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <span className="text-3xl">🔕</span>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Notifications Blocked</h3>
                        <p className="text-sm text-gray-600">
                            You&apos;ve blocked notifications. To enable them, click the lock icon in your browser&apos;s address bar and allow notifications.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (permission === 'default') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-ocean-50 to-teal-50 rounded-xl p-6 border border-ocean-200"
            >
                <div className="flex items-start gap-4">
                    <span className="text-3xl">🔔</span>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Stay Updated</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Get notified about events, exclusive deals, weather alerts, and trip reminders.
                        </p>
                        <button
                            onClick={requestPermission}
                            disabled={isLoading}
                            className="px-6 py-2 bg-ocean-500 text-white font-semibold rounded-lg hover:bg-ocean-600 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Requesting...' : 'Enable Notifications'}
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔔</span>
                <div>
                    <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
                    <p className="text-sm text-green-600">Notifications are enabled</p>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { key: 'events' as const, emoji: '📅', label: 'Upcoming Events', desc: 'Get notified about events in Naples' },
                    { key: 'deals' as const, emoji: '💰', label: 'Exclusive Deals', desc: 'Flash sales and limited-time offers' },
                    { key: 'weather' as const, emoji: '⛈️', label: 'Weather Alerts', desc: 'Storm warnings and beach conditions' },
                    { key: 'reminders' as const, emoji: '⏰', label: 'Trip Reminders', desc: 'Reminders for your saved activities' },
                ].map(({ key, emoji, label, desc }) => (
                    <div
                        key={key}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{emoji}</span>
                            <div>
                                <span className="font-medium text-gray-900">{label}</span>
                                <p className="text-sm text-gray-500">{desc}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => togglePreference(key)}
                            className={`relative w-12 h-7 rounded-full transition-colors ${preferences[key] ? 'bg-ocean-500' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${preferences[key] ? 'left-6' : 'left-1'
                                    }`}
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Notification Bell for Navbar
export function NotificationBell() {
    const [hasUnread, setHasUnread] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        { id: 1, type: 'event', title: 'Art Festival This Weekend', time: '2 hours ago' },
        { id: 2, type: 'deal', title: '20% off Sunset Cruises', time: '5 hours ago' },
        { id: 3, type: 'weather', title: 'Perfect Beach Weather Tomorrow', time: '1 day ago' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => { setIsOpen(!isOpen); setHasUnread(false); }}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {hasUnread && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                        <div className="px-4 py-2 border-b border-gray-100">
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>

                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                                    <p className="text-xs text-gray-500">{notif.time}</p>
                                </div>
                            ))}
                        </div>

                        <div className="px-4 py-2 border-t border-gray-100">
                            <button className="text-sm text-ocean-600 font-medium hover:text-ocean-700">
                                View All Notifications
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
}
