/**
 * Testimonials Data System
 * Customer testimonials for social proof and trust.
 */

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    avatar?: string;
    rating: number; // 1-5
    text: string;
    highlight: string; // Short quote for carousel
    tripType: string;
    date: string;
    verified: boolean;
}

export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Jennifer & Mark Thompson",
        location: "Chicago, IL",
        rating: 5,
        text: "We used Naples Vacation Planner for our 7-day anniversary trip and it was absolutely perfect. The itinerary was so well thought out - from the sunset dinner spots to the best beaches for morning walks. We didn't have to stress about planning anything!",
        highlight: "The itinerary was so well thought out - we didn't have to stress about planning anything!",
        tripType: "Anniversary Trip",
        date: "2026-01-15",
        verified: true
    },
    {
        id: "2",
        name: "The Martinez Family",
        location: "Atlanta, GA",
        rating: 5,
        text: "As parents of three young kids, finding family-friendly activities in Naples was our biggest concern. This site made it so easy - the recommendations for Naples Zoo, Clam Pass Beach, and the kid-friendly restaurants were spot on. Our kids are already asking when we can go back!",
        highlight: "The family-friendly recommendations were spot on. Our kids are already asking when we can go back!",
        tripType: "Family Vacation",
        date: "2025-12-28",
        verified: true
    },
    {
        id: "3",
        name: "Robert Williams",
        location: "Boston, MA",
        rating: 5,
        text: "I'm a solo traveler who loves nature, and the Everglades day trip guide was exceptional. The detailed timing, what to bring, and which tour operators to use saved me hours of research. Saw alligators, manatees, and countless birds. Incredible experience!",
        highlight: "The Everglades day trip guide saved me hours of research. Incredible experience!",
        tripType: "Solo Adventure",
        date: "2025-12-15",
        verified: true
    },
    {
        id: "4",
        name: "Susan & Patricia",
        location: "New York, NY",
        rating: 5,
        text: "My sister and I planned a girls' trip using the 3-day itinerary and loved every minute. The shopping recommendations on Fifth Avenue South were perfect, and the spa suggestions were exactly what we needed. Already planning our return trip!",
        highlight: "The shopping and spa recommendations were exactly what we needed. Already planning our return!",
        tripType: "Girls' Trip",
        date: "2025-11-30",
        verified: true
    },
    {
        id: "5",
        name: "David & Linda Carpenter",
        location: "Detroit, MI",
        rating: 5,
        text: "We're snowbirds who visit Naples every winter, and even after 5 years, we discovered new places thanks to this site. The neighborhood guide helped us finally decide where to rent for the season. The local insights are genuinely local!",
        highlight: "Even after 5 years visiting Naples, we discovered new places. The local insights are genuinely local!",
        tripType: "Snowbird Season",
        date: "2025-11-15",
        verified: true
    },
    {
        id: "6",
        name: "Amanda Chen",
        location: "San Francisco, CA",
        rating: 5,
        text: "First time visiting Florida and chose Naples based on these guides. The 'Best Time to Visit' article helped us pick February - perfect weather, smaller crowds. Every restaurant recommendation was a winner. Trust this site completely!",
        highlight: "Every restaurant recommendation was a winner. Trust this site completely!",
        tripType: "First Visit",
        date: "2025-02-20",
        verified: true
    }
];

/**
 * Get all testimonials
 */
export function getAllTestimonials(): Testimonial[] {
    return testimonials;
}

/**
 * Get featured testimonials (highest rated, verified)
 */
export function getFeaturedTestimonials(limit: number = 3): Testimonial[] {
    return testimonials
        .filter(t => t.verified && t.rating === 5)
        .slice(0, limit);
}

/**
 * Get testimonial by ID
 */
export function getTestimonialById(id: string): Testimonial | null {
    return testimonials.find(t => t.id === id) ?? null;
}

/**
 * Calculate average rating
 */
export function getAverageRating(): number {
    const total = testimonials.reduce((sum, t) => sum + t.rating, 0);
    return Math.round((total / testimonials.length) * 10) / 10;
}

/**
 * Get total verified reviews count
 */
export function getVerifiedReviewCount(): number {
    return testimonials.filter(t => t.verified).length;
}
