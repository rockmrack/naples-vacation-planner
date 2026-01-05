"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const cuisineLabels: Record<string, string> = {
    all: "All",
    "fine-dining": "Fine Dining",
    seafood: "Seafood",
    italian: "Italian",
    steakhouse: "Steakhouse",
    american: "American",
    asian: "Asian",
    french: "French",
    mediterranean: "Mediterranean",
    "breakfast-brunch": "Breakfast & Brunch",
    casual: "Casual",
    mexican: "Mexican",
};

const priceLabels: Record<string, string> = {
    all: "All Prices",
    $: "$",
    $$: "$$",
    $$$: "$$$",
    $$$$: "$$$$",
};

interface RestaurantDoc {
    frontmatter: {
        title: string;
        slug: string;
        restaurantName: string;
        cuisine: string;
        priceLevel: string;
        neighborhood: string;
        featuredImage: string;
        featuredImageAlt?: string;
        bestFor: string[];
        waterfront?: boolean;
    };
}

interface RestaurantGridProps {
    restaurants: RestaurantDoc[];
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
    const [selectedCuisine, setSelectedCuisine] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");

    const cuisines = ["all", ...Array.from(new Set(restaurants.map((r) => r.frontmatter.cuisine)))];

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesCuisine =
            selectedCuisine === "all" || restaurant.frontmatter.cuisine === selectedCuisine;
        const matchesPrice =
            selectedPrice === "all" || restaurant.frontmatter.priceLevel === selectedPrice;
        return matchesCuisine && matchesPrice;
    });

    return (
        <div>
            {/* Cuisine Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {cuisines.map((cuisine) => (
                    <button
                        key={cuisine}
                        onClick={() => setSelectedCuisine(cuisine)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCuisine === cuisine
                            ? "bg-amber-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {cuisineLabels[cuisine] || cuisine}
                    </button>
                ))}
            </div>

            {/* Price Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
                {["all", "$", "$$", "$$$", "$$$$"].map((price) => (
                    <button
                        key={price}
                        onClick={() => setSelectedPrice(price)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedPrice === price
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {priceLabels[price] || price}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <p className="text-gray-600 mb-6">
                Showing {filteredRestaurants.length} of {restaurants.length} restaurants
            </p>

            {/* Restaurant Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRestaurants.map((restaurant) => (
                    <Link
                        key={restaurant.frontmatter.slug}
                        href={`/restaurants/${restaurant.frontmatter.slug}`}
                        className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={restaurant.frontmatter.featuredImage}
                                alt={restaurant.frontmatter.featuredImageAlt || restaurant.frontmatter.restaurantName}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {restaurant.frontmatter.waterfront && (
                                <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    Waterfront
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                                    {cuisineLabels[restaurant.frontmatter.cuisine] || restaurant.frontmatter.cuisine}
                                </span>
                                <span className="text-green-600 font-bold">
                                    {restaurant.frontmatter.priceLevel}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                                {restaurant.frontmatter.restaurantName}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {restaurant.frontmatter.neighborhood}
                            </p>
                            {restaurant.frontmatter.bestFor.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {restaurant.frontmatter.bestFor.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {filteredRestaurants.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No restaurants match your filters. Try adjusting your selection.
                </div>
            )}
        </div>
    );
}
