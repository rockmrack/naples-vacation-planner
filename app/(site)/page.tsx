import Link from "next/link";
import { site } from "@/src/config/site";
import { getFeaturedPosts } from "@/src/lib/content";
import { SafeImage } from "@/src/components/SafeImage";
import {
    AwardsBanner,
    TrustCertifications,
    MediaFeaturesSection,
    TrustGuarantee,
    LiveStatistics,
    ProfessionalTrustFooter,
    FactCheckedBadge
} from "@/src/components/UltimateTrust";
import { TestimonialsCarousel } from "@/src/components/TestimonialsCarousel";
import { getAllAuthors } from "@/src/lib/authors";
import { getFeaturedTestimonials, getAverageRating, getVerifiedReviewCount } from "@/src/lib/testimonials";

// --- 10x CONTENT DATA ---

const monthlyEdit = {
    month: "January",
    title: "The Peak Season Edit",
    description: "January is perfection in Naples. The humidity is gone, the stone crabs are fresh, and the art festivals are beginning. Here is what you need to know this month.",
    picks: [
        { label: "Eat", value: "Stone Crabs at Truluck's" },
        { label: "Do", value: "Naples New Year's Art Fair" },
        { label: "Wear", value: "Light layers for cool evenings" },
        { label: "Book", value: "Valentine's Day Dinner Now" },
    ]
};

const conciergePicks = [
    {
        title: "Waterfront Dining",
        image: "/images/placeholders/naples_finedining_waterfront_sunset_4k.png",
        path: "/travel-tips/best-waterfront-dining",
        tag: "Dining"
    },
    {
        title: "Free Things to Do",
        image: "/images/placeholders/naples_pier_sunny_winter_day_4k.jpg",
        path: "/travel-tips/free-things-to-do-naples",
        tag: "Budget"
    },
    {
        title: "Best Coffee Shops",
        image: "/images/placeholders/naples_artisan_coffee_pour.png",
        path: "/travel-tips/best-coffee-shops",
        tag: "Lifestyle"
    }
];

// --- COMPONENTS ---

export default function HomePage() {
    let featuredPosts: ReturnType<typeof getFeaturedPosts> = [];
    const authors = getAllAuthors().filter(a => a.slug !== "editorial-team").slice(0, 3);
    const testimonials = getFeaturedTestimonials(4);
    const avgRating = getAverageRating();
    const reviewCount = getVerifiedReviewCount();

    try {
        featuredPosts = getFeaturedPosts(3);
    } catch {
        // Content not yet created
    }

    return (
        <div className="bg-white">
            {/* Award Banner - Top of Page */}
            <AwardsBanner />

            {/* --- HERO SECTION: 10x VISUALS --- */}
            <section className="relative h-[95vh] w-full overflow-hidden">
                {/* 4K Background Image */}
                <div className="absolute inset-0 z-0">
                    <SafeImage
                        src="/images/placeholders/naples_pier_sunset_dramatic_4k.png"
                        alt="Naples Pier Dramatic Sunset"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20" />
                </div>

                <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">

                    {/* Trust Tablet */}
                    <div className="mb-8 animate-fade-in-up">
                        <Link href="/reviews" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all cursor-pointer group">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <svg key={s} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-white font-medium tracking-wide text-sm">{avgRating} Stars | {reviewCount} Verified Reviews</span>
                        </Link>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white tracking-tight mb-8 drop-shadow-lg max-w-5xl leading-[1.1]">
                        The Art of the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-200 to-white">
                            Naples Escape
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed mb-12 drop-shadow-md">
                        The only expert-verified guide to Southwest Florida's premier luxury destination.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg mx-auto">
                        <Link href="/itineraries" className="flex-1 py-4 px-8 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center">
                            Plan My Trip
                        </Link>
                        <Link href="/where-to-stay" className="flex-1 py-4 px-8 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all text-center">
                            Where to Stay
                        </Link>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* --- THE MONTHLY EDIT (NEW SECTION) --- */}
            <section className="py-20 bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <span className="uppercase tracking-widest text-ocean-600 font-bold text-sm mb-2 block">
                                The {monthlyEdit.month} Edit
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                                {monthlyEdit.title}
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                {monthlyEdit.description}
                            </p>
                            <Link href="/travel-tips/best-time-to-visit" className="text-ocean-600 font-bold underline decoration-2 underline-offset-4 hover:text-ocean-800">
                                See full monthly guide →
                            </Link>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-4 w-full">
                            {monthlyEdit.picks.map((pick, i) => (
                                <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                                    <span className="block text-xs uppercase text-gray-400 font-bold tracking-wider mb-2">{pick.label}</span>
                                    <span className="block font-display font-bold text-gray-900 text-lg">{pick.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VISUAL CATEGORIES (BENTO BOX) --- */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">Curated Collections</h2>
                    <p className="text-xl text-gray-600">Everything you need, organized by expert locals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto md:h-[600px]">
                    {/* Itineraries - Tall */}
                    <Link href="/itineraries" className="group relative rounded-3xl overflow-hidden md:col-span-2 md:row-span-2 shadow-sm hover:shadow-xl transition-all h-[400px] md:h-full">
                        <SafeImage
                            src="/images/placeholders/naples_pier_sunset_4k.jpg" // Fallback to previous 4K
                            alt="Naples Itinerary"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-3 inline-block">Most Popular</span>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">Expert Itineraries</h3>
                            <p className="text-white/80 line-clamp-2">Fact-checked day-by-day plans for every traveler type.</p>
                        </div>
                    </Link>

                    {/* Where to Stay - Wide */}
                    <Link href="/where-to-stay" className="group relative rounded-3xl overflow-hidden md:col-span-2 shadow-sm hover:shadow-xl transition-all h-[300px] md:h-auto">
                        <SafeImage
                            src="/images/placeholders/vanderbilt_beach_luxury_hotel_4k.jpg" // Using existing 4k
                            alt="Luxury Resorts"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-2xl font-display font-bold text-white mb-1">Where to Stay</h3>
                            <p className="text-white/80">Detailed neighborhood guides.</p>
                        </div>
                    </Link>

                    {/* Day Trips - Small */}
                    <Link href="/day-trips" className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[280px] md:h-auto">
                        <SafeImage
                            src="/images/placeholders/everglades_airboat_action_4k.jpg"
                            alt="Day Trips"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <span className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">🛥️</span>
                            <h3 className="text-xl font-display font-bold text-white">Day Trips</h3>
                        </div>
                    </Link>

                    {/* Travel Tips - Small */}
                    <Link href="/travel-tips" className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[280px] md:h-auto">
                        <SafeImage
                            src="/images/placeholders/naples_luxury_convertible_5th_avenue_4k.jpg"
                            alt="Travel Tips"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <span className="text-4xl mb-4 transform group-hover:-translate-y-2 transition-transform duration-300">💡</span>
                            <h3 className="text-xl font-display font-bold text-white">Travel Tips</h3>
                        </div>
                    </Link>
                </div>
            </section>

            {/* --- CONCIERGE PICKS (NEW) --- */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-ocean-400 font-bold tracking-widest uppercase text-sm mb-2 block">Inside Access</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-white">Concierge Picks</h2>
                        </div>
                        <p className="text-gray-400 max-w-md mt-4 md:mt-0">
                            Our editors' current obsessions. The places we actually go when we're off the clock.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {conciergePicks.map((pick, i) => (
                            <Link href={pick.path} key={i} className="group cursor-pointer">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                                    <SafeImage
                                        src={pick.image}
                                        alt={pick.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                                            {pick.tag}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-display font-bold group-hover:text-ocean-400 transition-colors">{pick.title}</h3>
                                <div className="h-0.5 w-12 bg-gray-700 mt-4 group-hover:w-full group-hover:bg-ocean-400 transition-all duration-500" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Statistics & Trust */}
            <LiveStatistics />
            <TrustCertifications />
            <MediaFeaturesSection />
            <TrustGuarantee />

            {/* --- FEATURED ARTICLES --- */}
            {featuredPosts.length > 0 && (
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
                            <div>
                                <span className="inline-block px-4 py-2 rounded-full bg-ocean-100 text-ocean-700 text-sm font-bold uppercase tracking-wider mb-4">
                                    Latest Expert Guides
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
                                    Fresh From The Press
                                </h2>
                            </div>
                            <Link
                                href="/itineraries"
                                className="px-6 py-3 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                View all guides
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {featuredPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/${post.frontmatter.type === 'itinerary' ? 'itineraries' : post.frontmatter.type === 'day-trip' ? 'day-trips' : post.frontmatter.type === 'where-to-stay' ? 'where-to-stay' : post.frontmatter.type === 'travel-tip' ? 'travel-tips' : 'maps'}/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                        <SafeImage
                                            src={post.frontmatter.featuredImage}
                                            fallbackSrc="/images/placeholders/travel-tip.svg"
                                            alt={post.frontmatter.featuredImageAlt || post.frontmatter.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <FactCheckedBadge variant="inline" />
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="font-bold font-display text-gray-900 text-xl group-hover:text-ocean-600 transition-colors line-clamp-2 mb-3">
                                            {post.frontmatter.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-6">
                                            {post.frontmatter.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-ocean-600 uppercase tracking-wide">Read Guide</span>
                                            <span className="text-xs text-gray-400">{post.readingTime}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Testimonials Section */}
            <section className="py-24 bg-ocean-50/30">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-6">
                            Trusted by 15,000+ Travelers
                        </h2>
                        <div className="flex justify-center gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <svg key={i} className="w-6 h-6 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p className="text-gray-600 max-w-2xl mx-auto">Real plans, real trips, real memories.</p>
                    </div>
                    <TestimonialsCarousel testimonials={testimonials} />
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-32 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
                <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-ocean-900 text-ocean-300 border border-ocean-700 text-sm font-bold mb-8">
                        The Inside Scoop
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold font-display text-white mb-6">
                        Unlock Naples' Best Secrets
                    </h2>
                    <p className="mt-4 text-xl text-gray-400 mb-10 leading-relaxed">
                        Join 8,000+ subscribers who get our "Hidden Naples" guide, seasonal alerts, and restaurant opening notifications.
                    </p>

                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-8 py-5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ocean-500 backdrop-blur-sm"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-5 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>

            <ProfessionalTrustFooter />
        </div>
    );
}

