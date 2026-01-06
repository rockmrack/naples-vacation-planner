'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MegaMenuCategory {
    title: string;
    items: { label: string; href: string; icon?: string; badge?: string }[];
}

const megaMenuData: Record<string, MegaMenuCategory[]> = {
    itineraries: [
        {
            title: 'By Duration',
            items: [
                { label: '3-Day Itineraries', href: '/itineraries?duration=3', icon: '📅' },
                { label: '5-Day Itineraries', href: '/itineraries?duration=5', icon: '📅' },
                { label: '7-Day Itineraries', href: '/itineraries?duration=7', icon: '📅' },
                { label: 'Weekend Getaways', href: '/itineraries?duration=2', icon: '⚡' },
            ],
        },
        {
            title: 'By Style',
            items: [
                { label: 'Romantic Getaways', href: '/itineraries?style=romantic', icon: '💕' },
                { label: 'Family Vacations', href: '/itineraries?style=family', icon: '👨‍👩‍👧' },
                { label: 'Luxury Escapes', href: '/itineraries?style=luxury', icon: '💎' },
                { label: 'Adventure Trips', href: '/itineraries?style=adventure', icon: '🚣' },
            ],
        },
        {
            title: 'Featured',
            items: [
                { label: 'Most Popular', href: '/itineraries', icon: '🔥', badge: 'Top Pick' },
                { label: 'Staff Favorites', href: '/itineraries?filter=staff-picks', icon: '⭐' },
                { label: 'New This Month', href: '/itineraries?filter=new', icon: '✨', badge: 'New' },
            ],
        },
    ],
    'where-to-stay': [
        {
            title: 'By Budget',
            items: [
                { label: 'Budget-Friendly', href: '/where-to-stay?budget=budget', icon: '💰' },
                { label: 'Mid-Range', href: '/where-to-stay?budget=moderate', icon: '💵' },
                { label: 'Luxury Hotels', href: '/where-to-stay?budget=luxury', icon: '💎' },
                { label: 'All-Inclusive', href: '/where-to-stay?type=all-inclusive', icon: '🏖️' },
            ],
        },
        {
            title: 'By Neighborhood',
            items: [
                { label: 'Old Naples', href: '/where-to-stay/old-naples', icon: '🏛️' },
                { label: 'Pelican Bay', href: '/where-to-stay/pelican-bay', icon: '🌴' },
                { label: 'Marco Island', href: '/where-to-stay/marco-island', icon: '🏝️' },
                { label: 'Vanderbilt Beach', href: '/where-to-stay/vanderbilt-beach', icon: '🏖️' },
            ],
        },
        {
            title: 'Special Features',
            items: [
                { label: 'Beachfront Hotels', href: '/hotels?feature=beachfront', icon: '🌊' },
                { label: 'Golf Resorts', href: '/hotels?feature=golf', icon: '⛳' },
                { label: 'Pet-Friendly', href: '/hotels?feature=pets', icon: '🐕' },
            ],
        },
    ],
    'things-to-do': [
        {
            title: 'Water Activities',
            items: [
                { label: 'Beaches', href: '/things-to-do/beach', icon: '🏖️' },
                { label: 'Kayaking', href: '/things-to-do/kayaking', icon: '🛶' },
                { label: 'Fishing', href: '/things-to-do/fishing', icon: '🎣' },
                { label: 'Boat Tours', href: '/things-to-do/sunset-tours', icon: '⛵' },
            ],
        },
        {
            title: 'Land Activities',
            items: [
                { label: 'Golf', href: '/things-to-do/golfing', icon: '⛳' },
                { label: 'Shopping', href: '/things-to-do/shopping', icon: '🛍️' },
                { label: 'Spa & Wellness', href: '/things-to-do/spa', icon: '💆' },
                { label: 'Wildlife Tours', href: '/things-to-do/wildlife-tours', icon: '🐬' },
            ],
        },
        {
            title: 'Browse More',
            items: [
                { label: 'All Activities →', href: '/things-to-do', icon: '📋' },
                { label: 'Day Trips', href: '/day-trips', icon: '🚗' },
                { label: 'Events Calendar', href: '/events', icon: '📅' },
            ],
        },
    ],
};

export function MegaMenu({ activeItem }: { activeItem: string | null }) {
    if (!activeItem || !megaMenuData[activeItem]) return null;

    const categories = megaMenuData[activeItem];

    return (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-xl z-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div key={category.title}>
                            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                                {category.title}
                            </h3>
                            <ul className="space-y-3">
                                {category.items.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                                        >
                                            {item.icon && <span className="text-lg">{item.icon}</span>}
                                            <span className="font-medium">{item.label}</span>
                                            {item.badge && (
                                                <span className="px-2 py-0.5 text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface NavLinkWithMegaMenuProps {
    href: string;
    label: string;
    onHover: (key: string | null) => void;
    menuKey: string;
}

export function NavLinkWithMegaMenu({ href, label, onHover, menuKey }: NavLinkWithMegaMenuProps) {
    return (
        <Link
            href={href}
            onMouseEnter={() => onHover(menuKey)}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-full hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 transition-all duration-200"
        >
            {label}
        </Link>
    );
}
