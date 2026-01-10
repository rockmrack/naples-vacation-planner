"use client";

import { useState } from "react";

interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    priceRange: string;
    neighborhood: string;
    rating: number;
    openTableUrl: string;
}

const featuredRestaurants: Restaurant[] = [
    {
        id: "1",
        name: "The Bay House",
        cuisine: "Seafood, American",
        priceRange: "$$$$",
        neighborhood: "Naples Bay",
        rating: 4.8,
        openTableUrl: "https://www.opentable.com/r/the-bay-house-naples",
    },
    {
        id: "2",
        name: "USS Nemo",
        cuisine: "Seafood, Sushi",
        priceRange: "$$$",
        neighborhood: "East Naples",
        rating: 4.7,
        openTableUrl: "https://www.opentable.com/r/uss-nemo-naples",
    },
    {
        id: "3",
        name: "Barbatella",
        cuisine: "Italian",
        priceRange: "$$$",
        neighborhood: "3rd Street South",
        rating: 4.6,
        openTableUrl: "https://www.opentable.com/r/barbatella-naples",
    },
    {
        id: "4",
        name: "The Turtle Club",
        cuisine: "Seafood, American",
        priceRange: "$$$$",
        neighborhood: "Vanderbilt Beach",
        rating: 4.9,
        openTableUrl: "https://www.opentable.com/r/turtle-club-naples",
    },
    {
        id: "5",
        name: "Campiello",
        cuisine: "Italian",
        priceRange: "$$$$",
        neighborhood: "3rd Street South",
        rating: 4.7,
        openTableUrl: "https://www.opentable.com/r/campiello-naples",
    },
    {
        id: "6",
        name: "Sale e Pepe",
        cuisine: "Italian",
        priceRange: "$$$$",
        neighborhood: "Marco Island",
        rating: 4.8,
        openTableUrl: "https://www.opentable.com/r/sale-e-pepe-marco-island",
    },
];

interface RestaurantReservationWidgetProps {
    maxRestaurants?: number;
    neighborhood?: string;
}

export function RestaurantReservationWidget({
    maxRestaurants = 6,
    neighborhood
}: RestaurantReservationWidgetProps) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("19:00");
    const [guests, setGuests] = useState(2);

    const filteredRestaurants = neighborhood
        ? featuredRestaurants.filter(r => r.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()))
        : featuredRestaurants;

    const displayRestaurants = filteredRestaurants.slice(0, maxRestaurants);

    const buildReservationUrl = (restaurant: Restaurant) => {
        const params = new URLSearchParams({
            covers: guests.toString(),
            dateTime: `${date}T${time}`,
        });
        return `${restaurant.openTableUrl}?${params.toString()}`;
    };

    return (
        <section className="my-12 bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 border border-rose-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2 block">
                        Powered by OpenTable
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">Book a Table</h3>
                </div>
            </div>

            {/* Reservation Filters */}
            <div className="grid grid-cols-3 gap-4 mb-6 bg-white rounded-2xl p-4 shadow-sm">
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        min={new Date().toISOString().split("T")[0]}
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        <option value="17:00">5:00 PM</option>
                        <option value="17:30">5:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="18:30">6:30 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
                    <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Restaurant List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayRestaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
                                <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                            </div>
                            <span className="text-sm font-bold text-gray-700">{restaurant.priceRange}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <span className="flex items-center gap-1">
                                <span className="text-amber-400">★</span>
                                {restaurant.rating}
                            </span>
                            <span>•</span>
                            <span>{restaurant.neighborhood}</span>
                        </div>
                        <a
                            href={date ? buildReservationUrl(restaurant) : restaurant.openTableUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="block w-full py-2 px-4 bg-rose-600 text-white text-center font-medium rounded-lg hover:bg-rose-700 transition-colors"
                        >
                            Reserve Now
                        </a>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
                Reservations powered by OpenTable. We may earn a commission.
            </p>
        </section>
    );
}

export function QuickReservationSearch() {
    return (
        <div className="bg-rose-600 text-white rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Find Your Table</h3>
            <a
                href="https://www.opentable.com/promo.aspx?m=5&ref=naplesvacationplanner"
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full py-3 px-6 bg-white text-rose-600 text-center font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
                Search Naples Restaurants →
            </a>
        </div>
    );
}
