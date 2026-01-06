'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface BookingWidgetProps {
    type: 'hotel' | 'tour' | 'car';
    destination?: string;
    affiliateId?: string;
}

export function BookingWidget({ type, destination = 'Naples, FL', affiliateId }: BookingWidgetProps) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);

        // Construct affiliate URL based on type
        let url = '';
        const params = new URLSearchParams();

        if (type === 'hotel') {
            params.set('destination', destination);
            params.set('checkin', checkIn);
            params.set('checkout', checkOut);
            params.set('guests', guests.toString());
            if (affiliateId) params.set('aid', affiliateId);
            // This would be the actual affiliate URL
            url = `https://www.booking.com/searchresults.html?${params.toString()}`;
        } else if (type === 'tour') {
            params.set('q', destination);
            if (affiliateId) params.set('partner', affiliateId);
            url = `https://www.viator.com/searchResults/all?${params.toString()}`;
        } else if (type === 'car') {
            params.set('pickup_location', 'Naples, FL (RSW)');
            if (affiliateId) params.set('affiliate', affiliateId);
            url = `https://www.discovercars.com/?${params.toString()}`;
        }

        // Open in new tab (in production)
        setTimeout(() => {
            setIsSearching(false);
            // window.open(url, '_blank', 'noopener,noreferrer');
            console.log('Would open:', url);
        }, 1000);
    };

    if (type === 'hotel') {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">🏨</span>
                    <div>
                        <h3 className="font-bold text-gray-900">Find Hotels in Naples</h3>
                        <p className="text-sm text-gray-600">Compare prices from 100+ booking sites</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-ocean-500"
                    >
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={handleSearch}
                    disabled={isSearching || !checkIn || !checkOut}
                    className="w-full py-4 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                    {isSearching ? 'Searching...' : 'Search Hotels'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    Affiliate link. We may earn a commission at no extra cost to you.
                </p>
            </div>
        );
    }

    if (type === 'tour') {
        return (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🚤</span>
                    <div>
                        <h3 className="font-bold text-gray-900">Book Tours & Activities</h3>
                        <p className="text-sm text-gray-600">Sunset cruises, Everglades tours & more</p>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    {[
                        { name: 'Sunset Cruise', price: 'from $65', emoji: '🌅' },
                        { name: 'Everglades Airboat', price: 'from $45', emoji: '🐊' },
                        { name: 'Dolphin Watch', price: 'from $55', emoji: '🐬' },
                        { name: 'Kayak Tour', price: 'from $40', emoji: '🛶' },
                    ].map((tour) => (
                        <div key={tour.name} className="flex items-center justify-between p-3 bg-white rounded-xl">
                            <div className="flex items-center gap-2">
                                <span>{tour.emoji}</span>
                                <span className="font-medium text-gray-900">{tour.name}</span>
                            </div>
                            <span className="text-sm text-orange-600 font-semibold">{tour.price}</span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSearch}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                >
                    View All Tours →
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    Affiliate link. We may earn a commission at no extra cost to you.
                </p>
            </div>
        );
    }

    // Car rental widget
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🚗</span>
                <div>
                    <h3 className="font-bold text-gray-900">Rent a Car</h3>
                    <p className="text-sm text-gray-600">Compare prices from top rental companies</p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                    <span>📍</span>
                    <span className="font-medium">Naples / Southwest Florida (RSW)</span>
                </div>
            </div>

            <button
                onClick={handleSearch}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
            >
                Compare Rental Cars →
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Affiliate link. We may earn a commission at no extra cost to you.
            </p>
        </div>
    );
}

// Package Deals Component
export function PackageDeals() {
    const deals = [
        {
            id: 1,
            title: 'Beach Lover Package',
            description: '3 nights beachfront + sunset cruise + spa treatment',
            originalPrice: 899,
            dealPrice: 699,
            savings: 22,
            expires: '2 days',
            emoji: '🏖️',
        },
        {
            id: 2,
            title: 'Adventure Explorer',
            description: '3 nights + Everglades tour + kayak adventure + bike rental',
            originalPrice: 749,
            dealPrice: 599,
            savings: 20,
            expires: '5 days',
            emoji: '🌿',
        },
        {
            id: 3,
            title: 'Golf Getaway',
            description: '2 nights at golf resort + 2 rounds + cart included',
            originalPrice: 1199,
            dealPrice: 899,
            savings: 25,
            expires: '3 days',
            emoji: '⛳',
        },
    ];

    return (
        <section className="py-12">
            <div className="text-center mb-10">
                <span className="text-4xl mb-4 block">💎</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Exclusive Package Deals</h2>
                <p className="text-gray-600">Save more when you bundle accommodations with activities</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {deals.map((deal) => (
                    <motion.div
                        key={deal.id}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                    >
                        {/* Badge */}
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-center py-2 text-sm font-bold">
                            🔥 Save {deal.savings}% - Ends in {deal.expires}
                        </div>

                        <div className="p-6">
                            <div className="text-4xl mb-4">{deal.emoji}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{deal.description}</p>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-3xl font-bold text-green-600">${deal.dealPrice}</span>
                                <span className="text-lg text-gray-400 line-through">${deal.originalPrice}</span>
                                <span className="text-sm text-gray-500">per person</span>
                            </div>

                            <button className="w-full py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                                View Deal →
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
