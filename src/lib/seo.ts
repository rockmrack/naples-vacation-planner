import { site } from "@/src/config/site";

/**
 * Organization Schema for Naples Vacation Planner
 * https://schema.org/Organization
 */
export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        url: site.url,
        logo: `${site.url}/og/logo.png`,
        description: site.defaultDescription,
        sameAs: [
            // Add social media URLs when available
            // site.social?.instagram,
            // site.social?.youtube,
        ].filter(Boolean),
        address: {
            "@type": "PostalAddress",
            addressLocality: "Naples",
            addressRegion: "FL",
            addressCountry: "US",
        },
        areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: {
                "@type": "GeoCoordinates",
                latitude: 26.142,
                longitude: -81.795,
            },
            geoRadius: "50 mi",
        },
    };
}

/**
 * WebSite Schema for Naples Vacation Planner
 * https://schema.org/WebSite
 */
export function getWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        description: site.defaultDescription,
        publisher: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
        },
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${site.url}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
}

/**
 * Article Schema for content pages
 * https://schema.org/Article
 */
export function getArticleSchema(options: {
    title: string;
    description: string;
    url: string;
    image: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: options.title,
        description: options.description,
        url: options.url,
        image: options.image.startsWith("http")
            ? options.image
            : `${site.url}${options.image}`,
        datePublished: options.publishedAt,
        dateModified: options.updatedAt,
        author: {
            "@type": "Person",
            name: options.author,
        },
        publisher: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: {
                "@type": "ImageObject",
                url: `${site.url}/og/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": options.url,
        },
    };
}

/**
 * TravelAction Schema for itineraries (helps with travel-related SEO)
 * https://schema.org/TravelAction
 */
export function getTravelGuideSchema(options: {
    title: string;
    description: string;
    url: string;
    image: string;
    destination?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: options.title,
        description: options.description,
        url: options.url,
        image: options.image.startsWith("http")
            ? options.image
            : `${site.url}${options.image}`,
        touristType: ["Leisure", "Family", "Couples"],
        itinerary: {
            "@type": "ItemList",
            numberOfItems: 0, // Would be populated with actual day count
        },
        provider: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
        },
    };
}
