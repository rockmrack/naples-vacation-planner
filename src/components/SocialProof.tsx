'use client';

import { useState, useEffect } from 'react';

interface Notification {
    id: string;
    name: string;
    action: string;
    item: string;
    time: string;
    location: string;
}

const notifications: Notification[] = [
    { id: '1', name: 'Sarah', action: 'saved', item: '3-Day Naples Itinerary', time: '2 minutes ago', location: 'Chicago' },
    { id: '2', name: 'Michael', action: 'booked', item: 'Ritz-Carlton Naples', time: '5 minutes ago', location: 'New York' },
    { id: '3', name: 'Jennifer', action: 'downloaded', item: 'Packing List PDF', time: '8 minutes ago', location: 'Boston' },
    { id: '4', name: 'David', action: 'saved', item: 'Kayaking Guide', time: '12 minutes ago', location: 'Austin' },
    { id: '5', name: 'Emily', action: 'booked', item: 'Sunset Cruise', time: '15 minutes ago', location: 'Seattle' },
    { id: '6', name: 'Chris', action: 'saved', item: 'Stone Crab Season Guide', time: '18 minutes ago', location: 'Denver' },
    { id: '7', name: 'Ashley', action: 'downloaded', item: 'Restaurant Guide', time: '22 minutes ago', location: 'Miami' },
    { id: '8', name: 'Matthew', action: 'booked', item: 'Golf Tee Time', time: '25 minutes ago', location: 'Phoenix' },
];

export function SocialProofNotifications() {
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Don't show on mobile
        if (window.innerWidth < 768) return;

        // Initial delay before first notification
        const initialDelay = setTimeout(() => {
            showRandomNotification();
        }, 15000);

        return () => clearTimeout(initialDelay);
    }, []);

    const showRandomNotification = () => {
        const randomIndex = Math.floor(Math.random() * notifications.length);
        setCurrentNotification(notifications[randomIndex]);
        setIsVisible(true);

        // Hide after 5 seconds
        setTimeout(() => {
            setIsVisible(false);

            // Show next notification after 30-60 seconds
            const nextDelay = 30000 + Math.random() * 30000;
            setTimeout(showRandomNotification, nextDelay);
        }, 5000);
    };

    if (!currentNotification || !isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 z-40 hidden md:block animate-in slide-in-from-left duration-500">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {currentNotification.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">
                            <strong>{currentNotification.name}</strong> from {currentNotification.location}{' '}
                            {currentNotification.action} <strong>{currentNotification.item}</strong>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {currentNotification.time}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
