'use client';

import { usePathname } from 'next/navigation';

// ============================================================================
// FAQ SCHEMA
// ============================================================================
interface FAQItem {
    question: string;
    answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
    if (!items || items.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// TOURIST DESTINATION SCHEMA (Naples, Florida)
// ============================================================================
export function TouristDestinationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "TouristDestination",
        "name": "Naples, Florida",
        "description": "Naples, Florida is a premier luxury travel destination on Florida's Gulf Coast, known for pristine beaches, world-class golf, fine dining, and upscale shopping along Fifth Avenue South.",
        "url": "https://naplesvacationplanner.com",
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.1420358,
            "longitude": -81.7948103
        },
        "touristType": [
            "Beach Lover",
            "Golfer",
            "Foodie",
            "Luxury Traveler",
            "Family Vacationer",
            "Wellness Seeker"
        ],
        "includesAttraction": [
            {
                "@type": "TouristAttraction",
                "name": "Naples Pier",
                "description": "Historic fishing pier with stunning Gulf sunset views"
            },
            {
                "@type": "TouristAttraction",
                "name": "Fifth Avenue South",
                "description": "Premier shopping and dining district"
            },
            {
                "@type": "TouristAttraction",
                "name": "Naples Botanical Garden",
                "description": "170-acre garden showcasing plants from around the world"
            },
            {
                "@type": "TouristAttraction",
                "name": "Everglades National Park",
                "description": "UNESCO World Heritage Site with unique ecosystem"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// LOCAL BUSINESS / TRAVEL AGENCY SCHEMA
// ============================================================================
export function TravelAgencySchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Naples Vacation Planner",
        "description": "Your definitive guide to Naples, Florida - expert-curated itineraries, luxury hotel recommendations, and insider tips for the perfect Gulf Coast vacation.",
        "url": "https://naplesvacationplanner.com",
        "logo": "https://naplesvacationplanner.com/images/logo.png",
        "sameAs": [
            "https://instagram.com/naplesvacationplanner",
            "https://facebook.com/naplesvacationplanner",
            "https://twitter.com/naplesvacation"
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Naples",
            "addressRegion": "FL",
            "addressCountry": "US"
        },
        "areaServed": {
            "@type": "City",
            "name": "Naples",
            "containedInPlace": {
                "@type": "State",
                "name": "Florida"
            }
        },
        "priceRange": "$$$",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "847",
            "bestRating": "5"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================
interface BreadcrumbItem {
    name: string;
    url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
    if (!items || items.length === 0) return null;

    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// EVENT SCHEMA
// ============================================================================
interface EventSchemaProps {
    name: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    image?: string;
    url?: string;
    price?: string;
    organizer?: string;
}

export function EventSchema({
    name,
    description,
    startDate,
    endDate,
    location,
    image,
    url,
    price,
    organizer
}: EventSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": name,
        "description": description,
        "startDate": startDate,
        "location": {
            "@type": "Place",
            "name": location,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Naples",
                "addressRegion": "FL",
                "addressCountry": "US"
            }
        }
    };

    if (endDate) schema.endDate = endDate;
    if (image) schema.image = image;
    if (url) schema.url = url;
    if (organizer) {
        schema.organizer = {
            "@type": "Organization",
            "name": organizer
        };
    }
    if (price) {
        schema.offers = {
            "@type": "Offer",
            "price": price === "Free" ? "0" : price.replace(/[^0-9.]/g, ''),
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        };
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// ARTICLE SCHEMA
// ============================================================================
interface ArticleSchemaProps {
    headline: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified: string;
    image?: string;
    url: string;
}

export function ArticleSchema({
    headline,
    description,
    author,
    datePublished,
    dateModified,
    image,
    url
}: ArticleSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": headline,
        "description": description,
        "author": {
            "@type": "Person",
            "name": author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Naples Vacation Planner",
            "logo": {
                "@type": "ImageObject",
                "url": "https://naplesvacationplanner.com/images/logo.png"
            }
        },
        "datePublished": datePublished,
        "dateModified": dateModified,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        ...(image && { image: image })
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// HOTEL SCHEMA
// ============================================================================
interface HotelSchemaProps {
    name: string;
    description: string;
    address: string;
    priceRange: string;
    rating?: number;
    reviewCount?: number;
    image?: string;
    amenities?: string[];
}

export function HotelSchema({
    name,
    description,
    address,
    priceRange,
    rating,
    reviewCount,
    image,
    amenities
}: HotelSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": name,
        "description": description,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address,
            "addressLocality": "Naples",
            "addressRegion": "FL",
            "addressCountry": "US"
        },
        "priceRange": priceRange
    };

    if (rating && reviewCount) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": rating.toString(),
            "reviewCount": reviewCount.toString(),
            "bestRating": "5"
        };
    }

    if (image) schema.image = image;
    if (amenities && amenities.length > 0) {
        schema.amenityFeature = amenities.map(amenity => ({
            "@type": "LocationFeatureSpecification",
            "name": amenity
        }));
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// ============================================================================
// RESTAURANT SCHEMA
// ============================================================================
interface RestaurantSchemaProps {
    name: string;
    description: string;
    cuisine: string;
    priceRange: string;
    address?: string;
    rating?: number;
    reviewCount?: number;
    image?: string;
}

export function RestaurantSchema({
    name,
    description,
    cuisine,
    priceRange,
    address,
    rating,
    reviewCount,
    image
}: RestaurantSchemaProps) {
    const schema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": name,
        "description": description,
        "servesCuisine": cuisine,
        "priceRange": priceRange,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address || "",
            "addressLocality": "Naples",
            "addressRegion": "FL",
            "addressCountry": "US"
        }
    };

    if (rating && reviewCount) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": rating.toString(),
            "reviewCount": reviewCount.toString(),
            "bestRating": "5"
        };
    }

    if (image) schema.image = image;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
