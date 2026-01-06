'use client';

import { useState, useEffect } from 'react';
import { LeadMagnetCTA } from './LeadMagnetCTA';

interface ExitIntentPopupProps {
    delay?: number;
    magnetType?: 'packing-list' | 'itinerary' | 'restaurant-guide' | 'beach-secrets' | 'general';
}

export function ExitIntentPopup({
    delay = 5000,
    magnetType = 'general'
}: ExitIntentPopupProps) {
    const [showPopup, setShowPopup] = useState(false);
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if already shown in this session
        const shown = sessionStorage.getItem('exitPopupShown');
        if (shown) {
            setHasShown(true);
            return;
        }

        // Wait for delay before enabling exit detection
        const timer = setTimeout(() => {
            const handleMouseLeave = (e: MouseEvent) => {
                if (e.clientY <= 0 && !hasShown) {
                    setShowPopup(true);
                    setHasShown(true);
                    sessionStorage.setItem('exitPopupShown', 'true');
                }
            };

            document.addEventListener('mouseleave', handleMouseLeave);
            return () => document.removeEventListener('mouseleave', handleMouseLeave);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, hasShown]);

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
                <button
                    onClick={() => setShowPopup(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    aria-label="Close popup"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-8">
                    <div className="text-center mb-6">
                        <span className="text-5xl mb-4 block">🌴</span>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Wait! Don't Miss Out
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Get our exclusive Naples travel guide before you go
                        </p>
                    </div>

                    <LeadMagnetCTA
                        variant="inline"
                        magnetType={magnetType}
                        buttonText="Get My Free Guide"
                    />
                </div>
            </div>
        </div>
    );
}
