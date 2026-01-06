// Programmatic SEO Data: Activities in Naples
// Used to generate "Things to Do in {Activity} in Naples" pages

export interface Activity {
    slug: string;
    name: string;
    category: string;
    description: string;
    bestTime: string;
    duration: string;
    priceRange: string;
    difficulty: string;
    highlights: string[];
    topSpots: { name: string; description: string }[];
    tips: string[];
    relatedActivities: string[];
    metaTitle: string;
    metaDescription: string;
}

export const activities: Activity[] = [
    {
        slug: "kayaking",
        name: "Kayaking",
        category: "Water Sports",
        description: "Paddle through mangrove tunnels, explore the Ten Thousand Islands, and discover Naples' pristine waterways.",
        bestTime: "November - April (dry season)",
        duration: "2-4 hours",
        priceRange: "$40-$80 per person",
        difficulty: "Easy to Moderate",
        highlights: [
            "Mangrove tunnel adventures",
            "Wildlife spotting (dolphins, manatees)",
            "Sunset paddles",
            "Eco-tours with guides"
        ],
        topSpots: [
            { name: "Rookery Bay", description: "110,000-acre estuary with incredible biodiversity" },
            { name: "Clam Pass", description: "Easy paddle through mangrove tunnels to the beach" },
            { name: "Naples Bay", description: "Urban kayaking with views of historic Naples" },
            { name: "Marco Island", description: "Access to Ten Thousand Islands" }
        ],
        tips: [
            "Book morning tours for calmer waters",
            "Bring waterproof sunscreen and a hat",
            "Guided tours are best for beginners",
            "Winter months offer best weather"
        ],
        relatedActivities: ["paddleboarding", "fishing", "wildlife-tours"],
        metaTitle: "Kayaking in Naples, FL: Best Spots, Tours & Tips (2026)",
        metaDescription: "Discover the best kayaking in Naples, Florida. Explore mangrove tunnels, spot dolphins, and find top kayak rentals and guided tours."
    },
    {
        slug: "golfing",
        name: "Golfing",
        category: "Sports",
        description: "Experience world-class golf in the 'Golf Capital of the World' with 80+ courses designed by legends.",
        bestTime: "October - April (peak season)",
        duration: "4-5 hours per round",
        priceRange: "$75-$350+ per round",
        difficulty: "All skill levels",
        highlights: [
            "80+ championship courses",
            "PGA Tour-quality conditions",
            "Designs by Nicklaus, Fazio, Palmer",
            "Year-round playability"
        ],
        topSpots: [
            { name: "Tiburón Golf Club", description: "Home of the QBE Shootout, two Greg Norman designs" },
            { name: "Naples Beach Hotel Golf Course", description: "Only beachfront course in Naples" },
            { name: "Lely Resort", description: "Two public courses with resort amenities" },
            { name: "TPC Treviso Bay", description: "Private club with limited public access" }
        ],
        tips: [
            "Book tee times 2-3 weeks in advance during season",
            "Summer rates are 50-70% lower",
            "Many courses require collared shirts",
            "GPS carts are standard at most courses"
        ],
        relatedActivities: ["tennis", "spa", "dining"],
        metaTitle: "Golfing in Naples, FL: 80+ Courses, Best Deals & Tee Times (2026)",
        metaDescription: "Play the best golf courses in Naples, Florida - the Golf Capital of the World. Find top courses, tee times, and insider tips."
    },
    {
        slug: "fishing",
        name: "Fishing",
        category: "Water Sports",
        description: "Cast your line in some of Florida's most productive waters for snook, redfish, tarpon, and offshore species.",
        bestTime: "Year-round (species vary)",
        duration: "4-8 hours",
        priceRange: "$300-$1,200 per charter",
        difficulty: "All skill levels",
        highlights: [
            "World-class tarpon fishing",
            "Backwater redfish and snook",
            "Offshore grouper and snapper",
            "Naples Pier fishing (free)"
        ],
        topSpots: [
            { name: "Naples Pier", description: "Free pier fishing, great for families" },
            { name: "Gordon Pass", description: "Prime inshore fishing spot" },
            { name: "Marco Island", description: "Access to Ten Thousand Islands" },
            { name: "Offshore Reefs", description: "20-60 miles out for big game" }
        ],
        tips: [
            "Hire a guide for best results",
            "Tarpon season is April-July",
            "Stone crab season is Oct 15 - May 1",
            "Fishing license required (guides provide)"
        ],
        relatedActivities: ["kayaking", "boating", "wildlife-tours"],
        metaTitle: "Fishing in Naples, FL: Charters, Spots & What's Biting (2026)",
        metaDescription: "Find the best fishing in Naples, Florida. Book charters, discover top spots, and learn what fish are biting each season."
    },
    {
        slug: "shelling",
        name: "Shelling",
        category: "Beach Activities",
        description: "Hunt for beautiful seashells along Naples' Gulf beaches and nearby barrier islands.",
        bestTime: "After storms & low tide",
        duration: "1-3 hours",
        priceRange: "Free",
        difficulty: "Easy",
        highlights: [
            "Lightning whelks and conchs",
            "Sand dollars and sea urchins",
            "Junonia (rare find)",
            "Sunrise shelling walks"
        ],
        topSpots: [
            { name: "Keewaydin Island", description: "Boat-access only, pristine shells" },
            { name: "Barefoot Beach", description: "Less crowded, great variety" },
            { name: "Vanderbilt Beach", description: "Easy access, good after storms" },
            { name: "Marco Island", description: "Crescent Beach has excellent finds" }
        ],
        tips: [
            "Go at low tide for best finds",
            "Check after storms for fresh shells",
            "Leave live shells in the water",
            "Bring a mesh bag and water shoes"
        ],
        relatedActivities: ["beach", "kayaking", "wildlife-tours"],
        metaTitle: "Shelling in Naples, FL: Best Beaches, Tips & What to Find (2026)",
        metaDescription: "Discover the best shelling beaches in Naples, Florida. Learn when to go, what shells to find, and insider tips for collectors."
    },
    {
        slug: "beach",
        name: "Beach",
        category: "Beach Activities",
        description: "Relax on Naples' award-winning white sand beaches with calm Gulf waters and stunning sunsets.",
        bestTime: "Year-round (Nov-Apr is peak)",
        duration: "Half day to full day",
        priceRange: "Free (parking varies)",
        difficulty: "Easy",
        highlights: [
            "Pristine white sand",
            "Calm, warm Gulf waters",
            "Spectacular sunsets",
            "Clean, well-maintained beaches"
        ],
        topSpots: [
            { name: "Naples Beach", description: "Classic Naples experience at the pier" },
            { name: "Vanderbilt Beach", description: "Resort atmosphere, great facilities" },
            { name: "Lowdermilk Park", description: "Family-friendly with playground" },
            { name: "Clam Pass", description: "Natural setting via boardwalk" }
        ],
        tips: [
            "Arrive early for parking at popular spots",
            "Bring an umbrella - little natural shade",
            "Stay for sunset - don't miss it",
            "Beach chairs and umbrellas rentable at most beaches"
        ],
        relatedActivities: ["shelling", "paddleboarding", "sunset-tours"],
        metaTitle: "Naples, FL Beaches: Complete Guide to the Best Beaches (2026)",
        metaDescription: "Explore the best beaches in Naples, Florida. Find parking, amenities, and insider tips for Naples' stunning Gulf Coast beaches."
    },
    {
        slug: "paddleboarding",
        name: "Paddleboarding",
        category: "Water Sports",
        description: "Stand-up paddleboard through calm waters, mangrove estuaries, and along beautiful beach shorelines.",
        bestTime: "Year-round, mornings best",
        duration: "1-3 hours",
        priceRange: "$30-$60 per hour",
        difficulty: "Easy to Moderate",
        highlights: [
            "Calm Gulf waters ideal for beginners",
            "Mangrove paddling adventures",
            "Sunrise and sunset SUP",
            "SUP yoga classes available"
        ],
        topSpots: [
            { name: "Clam Pass", description: "Calm bay perfect for beginners" },
            { name: "Naples Bay", description: "Urban paddling with great views" },
            { name: "Vanderbilt Beach", description: "Ocean paddling when calm" },
            { name: "Rookery Bay", description: "Eco-paddling through nature preserve" }
        ],
        tips: [
            "Morning sessions have calmest water",
            "Start on knees if you're a beginner",
            "Use a leash for safety",
            "Apply sunscreen before getting on water"
        ],
        relatedActivities: ["kayaking", "beach", "yoga"],
        metaTitle: "Paddleboarding in Naples, FL: Rentals, Spots & Tips (2026)",
        metaDescription: "Find the best paddleboarding in Naples, Florida. Discover calm spots, rental locations, and SUP tours for all skill levels."
    },
    {
        slug: "wildlife-tours",
        name: "Wildlife Tours",
        category: "Eco-Tourism",
        description: "Encounter dolphins, manatees, sea turtles, and hundreds of bird species in their natural habitats.",
        bestTime: "November - April",
        duration: "2-4 hours",
        priceRange: "$50-$150 per person",
        difficulty: "Easy",
        highlights: [
            "Dolphin watching cruises",
            "Manatee encounters",
            "Everglades airboat tours",
            "Bird watching expeditions"
        ],
        topSpots: [
            { name: "Everglades National Park", description: "World-famous ecosystem" },
            { name: "Rookery Bay", description: "Bird watching paradise" },
            { name: "Naples Bay", description: "Frequent dolphin sightings" },
            { name: "Corkscrew Swamp", description: "Ancient bald cypress forest" }
        ],
        tips: [
            "Bring binoculars for bird watching",
            "Winter months have best manatee sightings",
            "Book small-group tours for better experience",
            "Mornings are best for wildlife activity"
        ],
        relatedActivities: ["kayaking", "everglades", "nature-photography"],
        metaTitle: "Wildlife Tours in Naples, FL: Dolphins, Manatees & More (2026)",
        metaDescription: "Experience amazing wildlife in Naples, Florida. Find the best tours for dolphins, manatees, Everglades adventures, and bird watching."
    },
    {
        slug: "sunset-tours",
        name: "Sunset Tours",
        category: "Cruises",
        description: "Experience Naples' legendary Gulf Coast sunsets from the water on a scenic cruise.",
        bestTime: "Year-round",
        duration: "1.5-2.5 hours",
        priceRange: "$40-$100 per person",
        difficulty: "Easy",
        highlights: [
            "Spectacular Gulf sunsets",
            "Champagne and wine options",
            "Private charter available",
            "Dolphin sightings common"
        ],
        topSpots: [
            { name: "Naples Bay", description: "Departures from Tin City" },
            { name: "Marco Island", description: "Views of the Ten Thousand Islands" },
            { name: "Keewaydin Island", description: "Uninhabited barrier island backdrop" },
            { name: "Naples Pier", description: "Land-based sunset watching" }
        ],
        tips: [
            "Book catamaran for most stable ride",
            "Bring a light jacket for water breezes",
            "Arrive 15-20 minutes early",
            "Winter sunsets are earlier but often more colorful"
        ],
        relatedActivities: ["dining", "beach", "boating"],
        metaTitle: "Sunset Cruises in Naples, FL: Best Tours & Romantic Options (2026)",
        metaDescription: "Watch the sunset from the water in Naples, Florida. Find the best sunset cruises, champagne tours, and romantic options."
    },
    {
        slug: "shopping",
        name: "Shopping",
        category: "Lifestyle",
        description: "Browse upscale boutiques, designer stores, and charming shops along Fifth Avenue and Third Street.",
        bestTime: "Year-round, weekdays less crowded",
        duration: "2-4 hours",
        priceRange: "$$$ - $$$$",
        difficulty: "Easy",
        highlights: [
            "Fifth Avenue South boutiques",
            "Third Street South galleries",
            "Waterside Shops luxury",
            "Tin City waterfront shops"
        ],
        topSpots: [
            { name: "Fifth Avenue South", description: "Premier shopping and dining district" },
            { name: "Third Street South", description: "Art galleries and upscale boutiques" },
            { name: "Waterside Shops", description: "Saks, Nordstrom, designer stores" },
            { name: "Mercato", description: "Lifestyle center with dining" }
        ],
        tips: [
            "Many shops close by 9 PM",
            "Valet parking available on Fifth Avenue",
            "Third Street has First Friday art walks",
            "Summer sales offer great deals"
        ],
        relatedActivities: ["dining", "art-galleries", "spa"],
        metaTitle: "Shopping in Naples, FL: Fifth Avenue, Third Street & More (2026)",
        metaDescription: "Discover the best shopping in Naples, Florida. From Fifth Avenue boutiques to Waterside Shops luxury, find great stores and deals."
    },
    {
        slug: "spa",
        name: "Spa & Wellness",
        category: "Wellness",
        description: "Indulge in world-class spa treatments, wellness retreats, and rejuvenating experiences.",
        bestTime: "Year-round",
        duration: "2-6 hours",
        priceRange: "$100-$500+",
        difficulty: "Easy",
        highlights: [
            "Forbes 5-Star rated spas",
            "Beach-side treatments",
            "Medical wellness options",
            "Yoga and meditation retreats"
        ],
        topSpots: [
            { name: "Ritz-Carlton Spa", description: "Forbes 5-Star rated" },
            { name: "Naples Grande Spa", description: "Full-service resort spa" },
            { name: "Woodhouse Day Spa", description: "Popular local favorite" },
            { name: "LaPlaya Beach Resort Spa", description: "Beachfront treatments" }
        ],
        tips: [
            "Book 1-2 weeks in advance during season",
            "Arrive 30-60 minutes early to use amenities",
            "Many spas offer couples packages",
            "Ask about spa-dining packages"
        ],
        relatedActivities: ["yoga", "beach", "golfing"],
        metaTitle: "Spas in Naples, FL: Best Day Spas & Wellness Retreats (2026)",
        metaDescription: "Relax at the best spas in Naples, Florida. Find Forbes-rated spas, wellness retreats, and rejuvenating treatments."
    }
];

export function getActivityBySlug(slug: string): Activity | undefined {
    return activities.find(a => a.slug === slug);
}

export function getAllActivitySlugs(): string[] {
    return activities.map(a => a.slug);
}
