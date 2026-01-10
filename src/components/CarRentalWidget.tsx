"use client";

import { useState } from "react";

interface CarRentalSearchProps {
    pickupLocation?: string;
}

export function CarRentalWidget({ pickupLocation = "Naples, FL" }: CarRentalSearchProps) {
    const [pickup, setPickup] = useState(pickupLocation);
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const [pickupTime, setPickupTime] = useState("10:00");
    const [dropoffTime, setDropoffTime] = useState("10:00");

    const buildSearchUrl = () => {
        const params = new URLSearchParams({
            pickup: pickup,
            pickupDate: pickupDate,
            dropoffDate: dropoffDate,
            pickupTime: pickupTime,
            dropoffTime: dropoffTime,
        });
        return `https://www.kayak.com/cars?${params.toString()}&a=naplesvacationplanner`;
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <section className="my-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
            <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
                    Compare Prices
                </span>
                <h3 className="text-2xl font-bold text-gray-900">Rent a Car in Naples</h3>
                <p className="text-gray-600 mt-1">Most visitors rent from RSW Airport (30 min to Naples)</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                        <select
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="RSW Airport">RSW Airport (Southwest Florida)</option>
                            <option value="Naples, FL">Downtown Naples</option>
                            <option value="Marco Island, FL">Marco Island</option>
                            <option value="Fort Myers, FL">Fort Myers</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
                        <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option>Same as pickup</option>
                            <option value="RSW Airport">RSW Airport</option>
                            <option value="Miami, FL">Miami Airport (one-way)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                        <input
                            type="date"
                            value={pickupDate}
                            onChange={(e) => setPickupDate(e.target.value)}
                            min={today}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                        <select
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                                <option key={t} value={t}>{t.replace(":00", ":00")}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Date</label>
                        <input
                            type="date"
                            value={dropoffDate}
                            onChange={(e) => setDropoffDate(e.target.value)}
                            min={pickupDate || today}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Time</label>
                        <select
                            value={dropoffTime}
                            onChange={(e) => setDropoffTime(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                                <option key={t} value={t}>{t.replace(":00", ":00")}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <a
                    href={buildSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full py-4 px-6 bg-blue-600 text-white text-center font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg"
                >
                    🚗 Compare Car Rental Prices
                </a>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl">
                    <span className="text-2xl mb-2 block">💰</span>
                    <span className="text-sm font-medium text-gray-900">Best Price Guarantee</span>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                    <span className="text-2xl mb-2 block">🚫</span>
                    <span className="text-sm font-medium text-gray-900">Free Cancellation</span>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                    <span className="text-2xl mb-2 block">⭐</span>
                    <span className="text-sm font-medium text-gray-900">All Major Brands</span>
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                Prices compared across Hertz, Enterprise, Avis, Budget, and more. We may earn a commission.
            </p>
        </section>
    );
}

export function CarRentalInlineCta() {
    return (
        <a
            href="https://www.kayak.com/cars/Naples,FL?a=naplesvacationplanner"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors my-4"
        >
            <span className="text-3xl">🚗</span>
            <div className="flex-1">
                <div className="text-xs text-blue-600 font-medium mb-1">NEED A CAR?</div>
                <h4 className="font-semibold text-gray-900">Compare Naples Car Rentals</h4>
                <p className="text-sm text-gray-500">From $25/day at RSW Airport</p>
            </div>
            <div className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm">
                Compare →
            </div>
        </a>
    );
}
