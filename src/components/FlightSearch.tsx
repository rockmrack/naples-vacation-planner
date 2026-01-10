"use client";

import { useState } from "react";

export function FlightSearchWidget() {
    const [origin, setOrigin] = useState("");
    const [departDate, setDepartDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState(1);

    const buildSearchUrl = () => {
        const params = new URLSearchParams({
            origin: origin,
            destination: "RSW",
            depart: departDate,
            return: returnDate,
            adults: passengers.toString(),
        });
        return `https://www.kayak.com/flights?${params.toString()}&a=naplesvacationplanner`;
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <section className="my-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
            <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">
                    ✈️ Compare Prices
                </span>
                <h3 className="text-2xl font-bold text-gray-900">Flights to Naples</h3>
                <p className="text-gray-600 mt-1">Fly into RSW Airport (Southwest Florida International)</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="City or airport code (e.g., JFK)"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                        <input
                            type="text"
                            value="RSW - Southwest Florida Int'l"
                            disabled
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Depart</label>
                        <input
                            type="date"
                            value={departDate}
                            onChange={(e) => setDepartDate(e.target.value)}
                            min={today}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={departDate || today}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                        <select
                            value={passengers}
                            onChange={(e) => setPassengers(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <a
                    href={buildSearchUrl()}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="block w-full py-4 px-6 bg-indigo-600 text-white text-center font-bold rounded-xl hover:bg-indigo-700 transition-colors text-lg"
                >
                    ✈️ Search Flights
                </a>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-xl">
                    <span className="text-2xl mb-2 block">🏆</span>
                    <span className="text-sm font-medium text-gray-900">Compare 100+ Airlines</span>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                    <span className="text-2xl mb-2 block">💰</span>
                    <span className="text-sm font-medium text-gray-900">Find Cheapest Fares</span>
                </div>
                <div className="text-center p-4 bg-white rounded-xl">
                    <span className="text-2xl mb-2 block">📊</span>
                    <span className="text-sm font-medium text-gray-900">Price Predictions</span>
                </div>
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                Flights compared across major airlines. We may earn a commission.
            </p>
        </section>
    );
}

export function FlightInlineCta() {
    return (
        <a
            href="https://www.kayak.com/flights/RSW?a=naplesvacationplanner"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-colors my-4"
        >
            <span className="text-3xl">✈️</span>
            <div className="flex-1">
                <div className="text-xs text-indigo-600 font-medium mb-1">FLY INTO RSW</div>
                <h4 className="font-semibold text-gray-900">Search Flights to Naples</h4>
                <p className="text-sm text-gray-500">Compare prices across 100+ airlines</p>
            </div>
            <div className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg text-sm">
                Search →
            </div>
        </a>
    );
}
