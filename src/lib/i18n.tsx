'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

// Supported languages
export type Language = 'en' | 'es' | 'de' | 'fr';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.itineraries': 'Itineraries',
        'nav.whereToStay': 'Where to Stay',
        'nav.dayTrips': 'Day Trips',
        'nav.restaurants': 'Restaurants',
        'nav.travelTips': 'Travel Tips',
        'nav.events': 'Events',
        // Hero
        'hero.title': 'Plan Your Perfect Naples Vacation',
        'hero.subtitle': 'Discover the best of Naples, Florida with expert-curated itineraries, insider tips, and local favorites.',
        'hero.cta': 'Start Planning',
        'hero.explore': 'Explore Guides',
        // Common
        'common.readMore': 'Read More',
        'common.viewAll': 'View All',
        'common.loading': 'Loading...',
        'common.search': 'Search...',
        'common.days': 'days',
        'common.minRead': 'min read',
        // User
        'user.login': 'Sign In',
        'user.register': 'Sign Up',
        'user.profile': 'My Profile',
        'user.logout': 'Sign Out',
        'user.savedTrips': 'Saved Trips',
        'user.favorites': 'Favorites',
        // Trip Builder
        'tripBuilder.title': 'Trip Builder',
        'tripBuilder.addActivity': 'Add Activity',
        'tripBuilder.saveTrip': 'Save Trip',
        'tripBuilder.day': 'Day',
        // Beach Guide
        'beach.title': 'Naples Beach Guide',
        'beach.crowdLow': 'Low Crowds',
        'beach.crowdModerate': 'Moderate',
        'beach.crowdHigh': 'Busy',
        'beach.parkingAvailable': 'Parking Available',
        'beach.parkingLimited': 'Limited Parking',
        'beach.parkingFull': 'Parking Full',
        // Footer
        'footer.about': 'About Us',
        'footer.contact': 'Contact',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.copyright': '© 2026 Naples Vacation Planner. All rights reserved.',
    },
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.itineraries': 'Itinerarios',
        'nav.whereToStay': 'Dónde Alojarse',
        'nav.dayTrips': 'Excursiones',
        'nav.restaurants': 'Restaurantes',
        'nav.travelTips': 'Consejos de Viaje',
        'nav.events': 'Eventos',
        // Hero
        'hero.title': 'Planifica tus Vacaciones Perfectas en Naples',
        'hero.subtitle': 'Descubre lo mejor de Naples, Florida con itinerarios curados, consejos locales y favoritos.',
        'hero.cta': 'Empezar a Planificar',
        'hero.explore': 'Explorar Guías',
        // Common
        'common.readMore': 'Leer Más',
        'common.viewAll': 'Ver Todo',
        'common.loading': 'Cargando...',
        'common.search': 'Buscar...',
        'common.days': 'días',
        'common.minRead': 'min de lectura',
        // User
        'user.login': 'Iniciar Sesión',
        'user.register': 'Registrarse',
        'user.profile': 'Mi Perfil',
        'user.logout': 'Cerrar Sesión',
        'user.savedTrips': 'Viajes Guardados',
        'user.favorites': 'Favoritos',
        // Trip Builder
        'tripBuilder.title': 'Planificador de Viaje',
        'tripBuilder.addActivity': 'Añadir Actividad',
        'tripBuilder.saveTrip': 'Guardar Viaje',
        'tripBuilder.day': 'Día',
        // Beach Guide
        'beach.title': 'Guía de Playas de Naples',
        'beach.crowdLow': 'Poca Gente',
        'beach.crowdModerate': 'Moderado',
        'beach.crowdHigh': 'Concurrido',
        'beach.parkingAvailable': 'Aparcamiento Disponible',
        'beach.parkingLimited': 'Aparcamiento Limitado',
        'beach.parkingFull': 'Aparcamiento Lleno',
        // Footer
        'footer.about': 'Sobre Nosotros',
        'footer.contact': 'Contacto',
        'footer.privacy': 'Política de Privacidad',
        'footer.terms': 'Términos de Servicio',
        'footer.copyright': '© 2026 Naples Vacation Planner. Todos los derechos reservados.',
    },
    de: {
        // Navigation
        'nav.home': 'Startseite',
        'nav.itineraries': 'Reiserouten',
        'nav.whereToStay': 'Unterkünfte',
        'nav.dayTrips': 'Tagesausflüge',
        'nav.restaurants': 'Restaurants',
        'nav.travelTips': 'Reisetipps',
        'nav.events': 'Veranstaltungen',
        // Hero
        'hero.title': 'Planen Sie Ihren Perfekten Naples Urlaub',
        'hero.subtitle': 'Entdecken Sie das Beste von Naples, Florida mit kuratierten Reiserouten und Insider-Tipps.',
        'hero.cta': 'Planung Starten',
        'hero.explore': 'Guides Entdecken',
        // Common
        'common.readMore': 'Mehr Lesen',
        'common.viewAll': 'Alle Anzeigen',
        'common.loading': 'Laden...',
        'common.search': 'Suchen...',
        'common.days': 'Tage',
        'common.minRead': 'Min. Lesezeit',
        // User
        'user.login': 'Anmelden',
        'user.register': 'Registrieren',
        'user.profile': 'Mein Profil',
        'user.logout': 'Abmelden',
        'user.savedTrips': 'Gespeicherte Reisen',
        'user.favorites': 'Favoriten',
        // Trip Builder
        'tripBuilder.title': 'Reiseplaner',
        'tripBuilder.addActivity': 'Aktivität Hinzufügen',
        'tripBuilder.saveTrip': 'Reise Speichern',
        'tripBuilder.day': 'Tag',
        // Beach Guide
        'beach.title': 'Naples Strandführer',
        'beach.crowdLow': 'Wenig los',
        'beach.crowdModerate': 'Moderat',
        'beach.crowdHigh': 'Voll',
        'beach.parkingAvailable': 'Parkplätze Verfügbar',
        'beach.parkingLimited': 'Begrenzte Parkplätze',
        'beach.parkingFull': 'Parkplätze Voll',
        // Footer
        'footer.about': 'Über Uns',
        'footer.contact': 'Kontakt',
        'footer.privacy': 'Datenschutz',
        'footer.terms': 'Nutzungsbedingungen',
        'footer.copyright': '© 2026 Naples Vacation Planner. Alle Rechte vorbehalten.',
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.itineraries': 'Itinéraires',
        'nav.whereToStay': 'Où Séjourner',
        'nav.dayTrips': 'Excursions',
        'nav.restaurants': 'Restaurants',
        'nav.travelTips': 'Conseils de Voyage',
        'nav.events': 'Événements',
        // Hero
        'hero.title': 'Planifiez Vos Vacances Parfaites à Naples',
        'hero.subtitle': 'Découvrez le meilleur de Naples, Floride avec des itinéraires sélectionnés et des conseils locaux.',
        'hero.cta': 'Commencer à Planifier',
        'hero.explore': 'Explorer les Guides',
        // Common
        'common.readMore': 'Lire Plus',
        'common.viewAll': 'Voir Tout',
        'common.loading': 'Chargement...',
        'common.search': 'Rechercher...',
        'common.days': 'jours',
        'common.minRead': 'min de lecture',
        // User
        'user.login': 'Connexion',
        'user.register': "S'inscrire",
        'user.profile': 'Mon Profil',
        'user.logout': 'Déconnexion',
        'user.savedTrips': 'Voyages Enregistrés',
        'user.favorites': 'Favoris',
        // Trip Builder
        'tripBuilder.title': 'Créateur de Voyage',
        'tripBuilder.addActivity': 'Ajouter une Activité',
        'tripBuilder.saveTrip': 'Enregistrer le Voyage',
        'tripBuilder.day': 'Jour',
        // Beach Guide
        'beach.title': 'Guide des Plages de Naples',
        'beach.crowdLow': 'Peu Fréquenté',
        'beach.crowdModerate': 'Modéré',
        'beach.crowdHigh': 'Bondé',
        'beach.parkingAvailable': 'Stationnement Disponible',
        'beach.parkingLimited': 'Stationnement Limité',
        'beach.parkingFull': 'Stationnement Complet',
        // Footer
        'footer.about': 'À Propos',
        'footer.contact': 'Contact',
        'footer.privacy': 'Politique de Confidentialité',
        'footer.terms': "Conditions d'Utilisation",
        'footer.copyright': '© 2026 Naples Vacation Planner. Tous droits réservés.',
    },
};

const LANGUAGE_STORAGE_KEY = 'naples_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load saved language preference
        const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
        if (saved && translations[saved]) {
            setLanguageState(saved);
        } else {
            // Try to detect browser language
            const browserLang = navigator.language.split('-')[0] as Language;
            if (translations[browserLang]) {
                setLanguageState(browserLang);
            }
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || translations['en'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Language Switcher Component
export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages: { code: Language; name: string; flag: string }[] = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === lang.code ? 'bg-ocean-50 text-ocean-700' : 'text-gray-700'
                                    }`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.name}</span>
                                {language === lang.code && (
                                    <svg className="w-4 h-4 ml-auto text-ocean-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
