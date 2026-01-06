'use client';

import { useState } from 'react';

const accommodationTiers = {
    budget: { label: 'Budget', dailyCost: 150, description: 'Motels, basic hotels' },
    moderate: { label: 'Moderate', dailyCost: 250, description: 'Nice hotels, vacation rentals' },
    upscale: { label: 'Upscale', dailyCost: 400, description: 'Boutique hotels, beachfront' },
    luxury: { label: 'Luxury', dailyCost: 650, description: 'Ritz-Carlton, 5-star resorts' },
};

const activityBudgets = {
    light: { label: 'Light Activities', dailyCost: 50, description: 'Beaches, free attractions' },
    moderate: { label: 'Moderate Activities', dailyCost: 100, description: 'Some tours, activities' },
    active: { label: 'Very Active', dailyCost: 175, description: 'Multiple tours, all attractions' },
};

const diningBudgets = {
    budget: { label: 'Budget Dining', dailyCost: 60, description: 'Casual, fast-casual' },
    moderate: { label: 'Moderate Dining', dailyCost: 100, description: 'Mix of casual & nice restaurants' },
    upscale: { label: 'Upscale Dining', dailyCost: 175, description: 'Fine dining experiences' },
};

export function TripCostCalculator() {
    const [days, setDays] = useState(5);
    const [travelers, setTravelers] = useState(2);
    const [accommodation, setAccommodation] = useState<keyof typeof accommodationTiers>('moderate');
    const [activities, setActivities] = useState<keyof typeof activityBudgets>('moderate');
    const [dining, setDining] = useState<keyof typeof diningBudgets>('moderate');
    const [includeFlights, setIncludeFlights] = useState(true);
    const [flightCost, setFlightCost] = useState(350);

    // Calculate totals
    const accommodationTotal = accommodationTiers[accommodation].dailyCost * days;
    const activitiesTotal = activityBudgets[activities].dailyCost * days * travelers;
    const diningTotal = diningBudgets[dining].dailyCost * days * travelers;
    const flightsTotal = includeFlights ? flightCost * travelers : 0;
    const transportTotal = days * 35; // Car rental / Uber estimate
    const miscTotal = days * 25 * travelers; // Tips, souvenirs, etc.

    const grandTotal = accommodationTotal + activitiesTotal + diningTotal + flightsTotal + transportTotal + miscTotal;
    const perPerson = grandTotal / travelers;
    const perDay = grandTotal / days;

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-5xl mb-4 block">💰</span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Naples Trip Cost Calculator
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Estimate your total vacation budget based on your preferences
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column - Inputs */}
                        <div className="space-y-6">
                            {/* Trip Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Trip Duration: {days} days
                                </label>
                                <input
                                    type="range"
                                    min="2"
                                    max="14"
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {/* Travelers */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Number of Travelers
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6].map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => setTravelers(n)}
                                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${travelers === n
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Accommodation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Accommodation
                                </label>
                                <div className="space-y-2">
                                    {Object.entries(accommodationTiers).map(([key, tier]) => (
                                        <label
                                            key={key}
                                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${accommodation === key
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="accommodation"
                                                    value={key}
                                                    checked={accommodation === key}
                                                    onChange={() => setAccommodation(key as keyof typeof accommodationTiers)}
                                                    className="sr-only"
                                                />
                                                <div>
                                                    <span className="font-medium text-gray-900 dark:text-white">{tier.label}</span>
                                                    <span className="block text-xs text-gray-500 dark:text-gray-400">{tier.description}</span>
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">${tier.dailyCost}/night</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Activities Level
                                </label>
                                <select
                                    value={activities}
                                    onChange={(e) => setActivities(e.target.value as keyof typeof activityBudgets)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.entries(activityBudgets).map(([key, budget]) => (
                                        <option key={key} value={key}>{budget.label} (${budget.dailyCost}/day/person)</option>
                                    ))}
                                </select>
                            </div>

                            {/* Dining */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Dining Style
                                </label>
                                <select
                                    value={dining}
                                    onChange={(e) => setDining(e.target.value as keyof typeof diningBudgets)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                >
                                    {Object.entries(diningBudgets).map(([key, budget]) => (
                                        <option key={key} value={key}>{budget.label} (${budget.dailyCost}/day/person)</option>
                                    ))}
                                </select>
                            </div>

                            {/* Flights */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="includeFlights"
                                        checked={includeFlights}
                                        onChange={(e) => setIncludeFlights(e.target.checked)}
                                        className="w-5 h-5 rounded text-blue-600"
                                    />
                                    <label htmlFor="includeFlights" className="font-medium text-gray-900 dark:text-white">
                                        Include Flights
                                    </label>
                                </div>
                                {includeFlights && (
                                    <input
                                        type="number"
                                        value={flightCost}
                                        onChange={(e) => setFlightCost(Number(e.target.value))}
                                        className="w-24 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-right"
                                        placeholder="$/person"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Right Column - Results */}
                        <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white">
                            <h3 className="text-lg font-semibold mb-6">Estimated Budget</h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-2 border-b border-white/20">
                                    <span className="text-white/80">🏨 Accommodation</span>
                                    <span className="font-semibold">${accommodationTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/20">
                                    <span className="text-white/80">🎯 Activities</span>
                                    <span className="font-semibold">${activitiesTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/20">
                                    <span className="text-white/80">🍽️ Dining</span>
                                    <span className="font-semibold">${diningTotal.toLocaleString()}</span>
                                </div>
                                {includeFlights && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/20">
                                        <span className="text-white/80">✈️ Flights</span>
                                        <span className="font-semibold">${flightsTotal.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center py-2 border-b border-white/20">
                                    <span className="text-white/80">🚗 Transport</span>
                                    <span className="font-semibold">${transportTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/20">
                                    <span className="text-white/80">🎁 Misc/Tips</span>
                                    <span className="font-semibold">${miscTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-white/10 rounded-xl p-4 mb-6">
                                <div className="text-center">
                                    <span className="text-white/80 text-sm block mb-1">Total Estimated Cost</span>
                                    <span className="text-4xl font-bold">${grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white/10 rounded-lg p-3">
                                    <span className="text-white/80 text-sm block">Per Person</span>
                                    <span className="text-xl font-bold">${Math.round(perPerson).toLocaleString()}</span>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3">
                                    <span className="text-white/80 text-sm block">Per Day</span>
                                    <span className="text-xl font-bold">${Math.round(perDay).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
