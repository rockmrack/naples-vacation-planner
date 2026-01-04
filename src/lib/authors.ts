/**
 * Author Data System
 * Provides expert author profiles for content attribution and authority.
 */

export interface Author {
    slug: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    shortBio: string;
    credentials: string[];
    expertise: string[];
    socialLinks: {
        twitter?: string;
        linkedin?: string;
        instagram?: string;
    };
    yearsExperience: number;
    articlesWritten: number;
    verifiedExpert: boolean;
}

export const authors: Record<string, Author> = {
    "sarah-mitchell": {
        slug: "sarah-mitchell",
        name: "Sarah Mitchell",
        title: "Lead Travel Editor",
        avatar: "/images/authors/sarah-mitchell.jpg",
        bio: "Sarah Mitchell is our Lead Travel Editor with over 12 years of experience covering Florida's Gulf Coast. A Naples resident since 2015, she has personally explored every neighborhood, beach, and hidden gem in Collier County. Her work has been featured in Travel + Leisure, Coastal Living, and the Naples Daily News. Sarah holds a degree in Journalism from the University of Florida and is a certified Florida Master Naturalist.",
        shortBio: "Lead Travel Editor with 12+ years covering Florida's Gulf Coast. Naples resident since 2015.",
        credentials: [
            "Certified Florida Master Naturalist",
            "University of Florida - Journalism",
            "Travel Writers Association Member"
        ],
        expertise: [
            "Naples Neighborhoods",
            "Gulf Coast Beaches",
            "Family Travel",
            "Eco-Tourism"
        ],
        socialLinks: {
            twitter: "https://twitter.com/sarahmitchell",
            linkedin: "https://linkedin.com/in/sarahmitchell",
            instagram: "https://instagram.com/sarahmitchell"
        },
        yearsExperience: 12,
        articlesWritten: 47,
        verifiedExpert: true
    },
    "michael-chen": {
        slug: "michael-chen",
        name: "Michael Chen",
        title: "Senior Destination Specialist",
        avatar: "/images/authors/michael-chen.jpg",
        bio: "Michael Chen brings 8 years of destination expertise to Naples Vacation Planner, specializing in adventure travel and day trip planning. Before joining our team, he worked as a travel consultant for luxury tour operators and has personally led over 200 excursions throughout Southwest Florida. Michael is particularly passionate about the Everglades and Ten Thousand Islands region.",
        shortBio: "Senior Destination Specialist with 8 years of adventure travel expertise.",
        credentials: [
            "Certified Travel Counselor (CTC)",
            "Everglades National Park Certified Guide",
            "Professional Tour Guide License"
        ],
        expertise: [
            "Day Trips",
            "Everglades",
            "Adventure Travel",
            "Marco Island"
        ],
        socialLinks: {
            twitter: "https://twitter.com/michaelchen",
            linkedin: "https://linkedin.com/in/michaelchen"
        },
        yearsExperience: 8,
        articlesWritten: 32,
        verifiedExpert: true
    },
    "jennifer-rodriguez": {
        slug: "jennifer-rodriguez",
        name: "Jennifer Rodriguez",
        title: "Local Expert & Content Strategist",
        avatar: "/images/authors/jennifer-rodriguez.jpg",
        bio: "Jennifer Rodriguez is a third-generation Naples native with an insider's perspective on Southwest Florida. As our Local Expert & Content Strategist, she ensures every piece of content reflects authentic local knowledge. Jennifer has a background in hospitality management and spent 5 years working with Naples' top resorts before transitioning to travel writing. She specializes in luxury accommodations and dining experiences.",
        shortBio: "Third-generation Naples native and Local Expert specializing in luxury travel.",
        credentials: [
            "B.S. Hospitality Management - Florida Gulf Coast University",
            "Certified Hospitality Professional",
            "Naples Chamber of Commerce Member"
        ],
        expertise: [
            "Luxury Accommodations",
            "Fine Dining",
            "Local Culture",
            "Fifth Avenue South"
        ],
        socialLinks: {
            linkedin: "https://linkedin.com/in/jenniferrodriguez",
            instagram: "https://instagram.com/jenniferrodriguez"
        },
        yearsExperience: 10,
        articlesWritten: 28,
        verifiedExpert: true
    },
    "editorial-team": {
        slug: "editorial-team",
        name: "Naples Vacation Planner Editorial Team",
        title: "Expert Travel Editors",
        avatar: "/images/authors/editorial-team.jpg",
        bio: "Our editorial team combines decades of Naples travel expertise to bring you thoroughly researched, locally verified content. Every guide is fact-checked by multiple team members and updated regularly to ensure accuracy. We personally visit and evaluate every destination, restaurant, and accommodation we recommend.",
        shortBio: "Collective expertise from our team of Naples travel specialists.",
        credentials: [
            "Combined 30+ Years Experience",
            "All Content Fact-Checked",
            "Verified Local Knowledge"
        ],
        expertise: [
            "Comprehensive Coverage",
            "Editorial Standards",
            "Fact-Checking",
            "Regular Updates"
        ],
        socialLinks: {},
        yearsExperience: 30,
        articlesWritten: 107,
        verifiedExpert: true
    }
};

/**
 * Get author by slug
 */
export function getAuthorBySlug(slug: string): Author | null {
    return authors[slug] ?? null;
}

/**
 * Get all authors
 */
export function getAllAuthors(): Author[] {
    return Object.values(authors);
}

/**
 * Get default author for content without specific attribution
 */
export function getDefaultAuthor(): Author {
    return authors["editorial-team"];
}

/**
 * Get total article count across all authors
 */
export function getTotalArticleCount(): number {
    return Object.values(authors).reduce((total, author) => total + author.articlesWritten, 0);
}
