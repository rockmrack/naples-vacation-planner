'use client';

import { AuthProvider } from '@/src/lib/auth-context';
import { LanguageProvider } from '@/src/lib/i18n';
import { ReactNode, useEffect } from 'react';

// Service Worker Registration Component
function ServiceWorkerRegistration() {
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('Service Worker registered:', registration.scope);
                })
                .catch((error) => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }, []);

    return null;
}

// PWA Install Prompt Component
function PWAInstallPrompt() {
    useEffect(() => {
        let deferredPrompt: BeforeInstallPromptEvent | null = null;

        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            deferredPrompt = e as BeforeInstallPromptEvent;

            // Store for later use (could show custom install button)
            (window as WindowWithInstallPrompt).deferredPrompt = deferredPrompt;
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    return null;
}

// Type definitions for PWA
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface WindowWithInstallPrompt extends Window {
    deferredPrompt?: BeforeInstallPromptEvent;
}

export function Providers({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <AuthProvider>
                <ServiceWorkerRegistration />
                <PWAInstallPrompt />
                {children}
            </AuthProvider>
        </LanguageProvider>
    );
}

// Export a hook to trigger PWA install
export function usePWAInstall() {
    const install = async () => {
        const windowWithPrompt = window as WindowWithInstallPrompt;
        if (windowWithPrompt.deferredPrompt) {
            await windowWithPrompt.deferredPrompt.prompt();
            const { outcome } = await windowWithPrompt.deferredPrompt.userChoice;
            console.log(`User ${outcome} the install prompt`);
            windowWithPrompt.deferredPrompt = undefined;
            return outcome === 'accepted';
        }
        return false;
    };

    const isInstallable = () => {
        return !!(window as WindowWithInstallPrompt).deferredPrompt;
    };

    return { install, isInstallable };
}
