'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function FloatingCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('floatingCtaDismissed');
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        const handleScroll = () => {
            // Show after scrolling 30% of the page
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            setIsVisible(scrollPercent > 30);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const dismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('floatingCtaDismissed', 'true');
    };

    if (isDismissed || !isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4 shadow-lg safe-area-pb">
            <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">Ready to plan your Naples trip?</p>
                </div>
                <Link
                    href="/plan"
                    className="flex-shrink-0 px-4 py-2 bg-white text-blue-600 font-bold text-sm rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Start Planning
                </Link>
                <button
                    onClick={dismiss}
                    className="flex-shrink-0 p-1 text-white/70 hover:text-white"
                    aria-label="Dismiss"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
