export interface Review {
    id: string;
    itinerarySlug: string;
    author: string;
    rating: number; // 1-5
    date: string; // ISO string
    title: string;
    content: string;
    verified: boolean;
    helpfulCount: number;
    avatar?: string;
}

export interface AggregateRating {
    ratingValue: number;
    reviewCount: number;
}

// Seed data for top itineraries
export const REVIEWS: Review[] = [
    // Naples 3-Day Itinerary
    {
        id: "r1",
        itinerarySlug: "naples-3-day-itinerary",
        author: "Sarah Jenkins",
        rating: 5,
        date: "2024-11-15",
        title: "Perfect weekend guide!",
        content: "Followed this itinerary for our girls trip and it was absolutely perfect. The timing for the pier sunset was spot on.",
        verified: true,
        helpfulCount: 12,
        avatar: "S"
    },
    {
        id: "r2",
        itinerarySlug: "naples-3-day-itinerary",
        author: "Mark D.",
        rating: 4,
        date: "2024-10-02",
        title: "Great suggestions, busy parking",
        content: "The restaurant picks were solid. Barbatella was a highlight. Just be warned that parking near 5th Ave is tough on weekends.",
        verified: true,
        helpfulCount: 5,
        avatar: "M"
    },

    // Naples 7-Day Itinerary
    {
        id: "r3",
        itinerarySlug: "naples-7-day-itinerary",
        author: "The Wilson Family",
        rating: 5,
        date: "2024-12-20",
        title: "A stress-free week",
        content: "We usually fight over what to do, but this plan kept everyone happy. The mix of beach days and active days was balanced.",
        verified: true,
        helpfulCount: 8,
        avatar: "W"
    },

    // Girlfriend Getaway
    {
        id: "r4",
        itinerarySlug: "naples-girlfriend-getaway",
        author: "Jessica M.",
        rating: 5,
        date: "2025-01-03",
        title: "Best. Trip. Ever.",
        content: "The spa recommendations were top notch. We essentially lived at the Ritz spa.",
        verified: true,
        helpfulCount: 3,
        avatar: "J"
    }
];

export function getReviewsBySlug(slug: string): Review[] {
    return REVIEWS.filter(review => review.itinerarySlug === slug).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAggregateRating(slug: string): AggregateRating | null {
    const reviews = getReviewsBySlug(slug);
    if (reviews.length === 0) return null;

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;

    return {
        ratingValue: Number(average.toFixed(1)),
        reviewCount: reviews.length
    };
}
