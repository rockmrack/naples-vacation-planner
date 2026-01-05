export const site = {
    name: "Naples Vacation Planner",
    domain: "naplesvacationplanner.com",
    url: "https://naplesvacationplanner.com",
    locale: "en_US",
    region: "US-FL",
    defaultTitle: "Naples Vacation Planner — Your Guide to Naples, Florida",
    defaultDescription:
        "Discover Naples, Florida with curated itineraries, neighborhood guides, day trips, and practical planning tips—designed for first-time visitors, families, couples, and nature lovers.",
    tagline: "Plan Your Perfect Naples Escape",
    keywords: [
        "Naples Florida",
        "Naples vacation",
        "Naples itinerary",
        "Naples travel guide",
        "where to stay Naples FL",
        "Naples day trips",
        "Marco Island",
        "Everglades",
        "Southwest Florida",
    ],
    social: {
        instagram: "",
        youtube: "",
        tiktok: "",
        pinterest: "",
    },
    author: {
        name: "Naples Vacation Planner",
        url: "https://naplesvacationplanner.com/about",
    },
    navLinks: [
        { href: "/itineraries", label: "Itineraries" },
        { href: "/where-to-stay", label: "Where to Stay" },
        { href: "/neighborhoods", label: "Neighborhood Map" },
        { href: "/restaurants", label: "Restaurants" },
        { href: "/events", label: "Events" },
        { href: "/day-trips", label: "Day Trips" },
        { href: "/travel-tips", label: "Travel Tips" },
    ],
} as const;

export type SiteConfig = typeof site;
