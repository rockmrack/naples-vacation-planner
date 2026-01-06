'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';

// ============================================================================
// HOTEL COMPARISON TABLE
// ============================================================================
interface Hotel {
    name: string;
    slug: string;
    image: string;
    priceRange: string;
    starRating: number;
    location: string;
    highlights: string[];
    bookingUrl?: string;
    tripAdvisorRating?: number;
}

interface HotelComparisonProps {
    hotels: Hotel[];
    title?: string;
    showBookNow?: boolean;
}

export function HotelComparison({
    hotels,
    title = "Compare Top Hotels",
    showBookNow = true
}: HotelComparisonProps) {
    const [sortBy, setSortBy] = useState<'price' | 'rating'>('rating');

    const sortedHotels = [...hotels].sort((a, b) => {
        if (sortBy === 'rating') {
            return (b.tripAdvisorRating || b.starRating) - (a.tripAdvisorRating || a.starRating);
        }
        // Sort by price (extract first number from price range)
        const priceA = parseInt(a.priceRange.replace(/[^0-9]/g, '')) || 0;
        const priceB = parseInt(b.priceRange.replace(/[^0-9]/g, '')) || 0;
        return priceA - priceB;
    });

    return (
        <div className="my-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Sort by:</span>
                    <button
                        onClick={() => setSortBy('rating')}
                        className={`px-3 py-1 rounded-full transition-colors ${sortBy === 'rating' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Rating
                    </button>
                    <button
                        onClick={() => setSortBy('price')}
                        className={`px-3 py-1 rounded-full transition-colors ${sortBy === 'price' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Price
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                            <th className="text-left p-4 font-semibold text-gray-700">Hotel</th>
                            <th className="text-center p-4 font-semibold text-gray-700">Stars</th>
                            <th className="text-center p-4 font-semibold text-gray-700">Rating</th>
                            <th className="text-center p-4 font-semibold text-gray-700">Price</th>
                            <th className="text-left p-4 font-semibold text-gray-700">Highlights</th>
                            {showBookNow && <th className="text-center p-4 font-semibold text-gray-700">Book</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedHotels.map((hotel, index) => (
                            <tr
                                key={hotel.slug}
                                className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index === 0 ? 'bg-amber-50' : ''
                                    }`}
                            >
                                <td className="p-4">
                                    <Link href={`/hotels/${hotel.slug}`} className="flex items-center gap-3 group">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                            <SafeImage
                                                src={hotel.image}
                                                fallbackSrc="/images/placeholders/hotel.svg"
                                                alt={hotel.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {hotel.name}
                                            </span>
                                            <span className="block text-sm text-gray-500">{hotel.location}</span>
                                        </div>
                                        {index === 0 && (
                                            <span className="ml-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded">
                                                TOP PICK
                                            </span>
                                        )}
                                    </Link>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="text-amber-500">
                                        {'★'.repeat(hotel.starRating)}{'☆'.repeat(5 - hotel.starRating)}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    {hotel.tripAdvisorRating && (
                                        <span className="inline-flex items-center gap-1">
                                            <span className="text-green-600 font-bold">{hotel.tripAdvisorRating}</span>
                                            <span className="text-xs text-gray-500">/5</span>
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    <span className="font-semibold text-gray-900">{hotel.priceRange}</span>
                                    <span className="block text-xs text-gray-500">per night</span>
                                </td>
                                <td className="p-4">
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        {hotel.highlights.slice(0, 3).map((h, i) => (
                                            <li key={i} className="flex items-start gap-1">
                                                <span className="text-green-500">✓</span> {h}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                {showBookNow && (
                                    <td className="p-4 text-center">
                                        {hotel.bookingUrl ? (
                                            <a
                                                href={hotel.bookingUrl}
                                                target="_blank"
                                                rel="noopener noreferrer sponsored"
                                                data-affiliate-link-id={`hotel-${hotel.slug}`}
                                                data-affiliate-partner="booking"
                                                data-affiliate-placement="comparison-table"
                                                className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Book Now
                                            </a>
                                        ) : (
                                            <Link
                                                href={`/hotels/${hotel.slug}`}
                                                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                View Details
                                            </Link>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
                Prices are approximate and may vary. We may earn a commission when you book through our links.
            </p>
        </div>
    );
}

// ============================================================================
// INLINE BOOKING WIDGET
// ============================================================================
interface BookingWidgetProps {
    hotelName: string;
    hotelSlug: string;
    priceFrom: string;
    bookingUrl: string;
    variant?: 'compact' | 'full';
}

export function BookingWidget({
    hotelName,
    hotelSlug,
    priceFrom,
    bookingUrl,
    variant = 'compact'
}: BookingWidgetProps) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(2);

    const buildBookingUrl = () => {
        const params = new URLSearchParams();
        if (checkIn) params.set('checkin', checkIn);
        if (checkOut) params.set('checkout', checkOut);
        params.set('guests', guests.toString());

        const url = new URL(bookingUrl);
        params.forEach((value, key) => url.searchParams.set(key, value));
        return url.toString();
    };

    if (variant === 'compact') {
        return (
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                <p className="text-sm text-white/80 mb-1">BOOK THIS HOTEL</p>
                <h4 className="font-bold text-xl mb-2">{hotelName}</h4>
                <p className="text-white/90 mb-4">
                    From <span className="text-2xl font-bold">{priceFrom}</span> /night
                </p>
                <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    data-affiliate-link-id={`booking-widget-${hotelSlug}`}
                    data-affiliate-partner="booking"
                    data-affiliate-placement="inline-widget"
                    className="block w-full text-center py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Check Availability →
                </a>
                <p className="text-xs text-white/60 mt-3 text-center">
                    Best price guarantee
                </p>
            </div>
        );
    }

    // Full variant with date picker
    return (
        <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold text-xl text-gray-900 mb-4">{hotelName}</h4>
            <p className="text-gray-600 mb-4">
                From <span className="text-2xl font-bold text-blue-600">{priceFrom}</span> /night
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                    ))}
                </select>
            </div>

            <a
                href={buildBookingUrl()}
                target="_blank"
                rel="noopener noreferrer sponsored"
                data-affiliate-link-id={`booking-widget-full-${hotelSlug}`}
                data-affiliate-partner="booking"
                data-affiliate-placement="inline-widget-full"
                className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
                Check Availability →
            </a>

            <p className="text-xs text-gray-400 mt-3 text-center">
                Prices may vary. Clicking will redirect to our booking partner.
            </p>
        </div>
    );
}

// ============================================================================
// QUICK BOOKING CTA
// ============================================================================
interface QuickBookingCTAProps {
    type: 'hotel' | 'activity' | 'restaurant';
    name: string;
    priceFrom?: string;
    bookingUrl: string;
}

export function QuickBookingCTA({ type, name, priceFrom, bookingUrl }: QuickBookingCTAProps) {
    const icons = {
        hotel: '🏨',
        activity: '🎯',
        restaurant: '🍽️'
    };

    const actions = {
        hotel: 'Book Now',
        activity: 'Reserve Spot',
        restaurant: 'Make Reservation'
    };

    return (
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
            <span className="text-3xl">{icons[type]}</span>
            <div className="flex-1">
                <p className="font-semibold text-gray-900">{name}</p>
                {priceFrom && <p className="text-sm text-gray-600">From {priceFrom}</p>}
            </div>
            <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                data-affiliate-link-id={`quick-cta-${type}`}
                data-affiliate-partner={type}
                data-affiliate-placement="inline-cta"
                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors whitespace-nowrap"
            >
                {actions[type]} →
            </a>
        </div>
    );
}
