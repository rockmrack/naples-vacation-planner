import { Metadata } from "next";
import { ContributorApplication, AmbassadorPerks, UGCGallery } from "@/src/components/Influencer";

export const metadata: Metadata = {
    title: "Become a Naples Contributor: Ambassador Program",
    description: "Join our ambassador program and share your Naples experiences. Earn perks, get featured, and help travelers discover paradise.",
};

export default function ContributorsPage() {
    // Sample UGC photos (would be dynamically loaded in production)
    const samplePhotos = [
        { id: '1', src: '/images/ugc/beach-sunset.jpg', alt: 'Naples beach sunset', username: 'traveler_jane', location: 'Naples Pier', likes: 234 },
        { id: '2', src: '/images/ugc/kayaking.jpg', alt: 'Kayaking in mangroves', username: 'adventure_mike', location: 'Rookery Bay', likes: 189 },
        { id: '3', src: '/images/ugc/dining.jpg', alt: 'Fine dining in Naples', username: 'foodie_lisa', location: 'Fifth Avenue', likes: 312 },
        { id: '4', src: '/images/ugc/golf.jpg', alt: 'Golf course view', username: 'golf_pro_tom', location: 'Tiburón', likes: 156 },
        { id: '5', src: '/images/ugc/shells.jpg', alt: 'Shelling finds', username: 'beachcomber_sue', location: 'Keewaydin Island', likes: 278 },
        { id: '6', src: '/images/ugc/boat.jpg', alt: 'Sunset boat cruise', username: 'sailing_couple', location: 'Naples Bay', likes: 445 },
        { id: '7', src: '/images/ugc/wildlife.jpg', alt: 'Dolphin sighting', username: 'nature_lover', location: 'Marco Island', likes: 523 },
        { id: '8', src: '/images/ugc/shopping.jpg', alt: 'Third Street shopping', username: 'shop_style', location: 'Third Street South', likes: 198 },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/patterns/grid.svg')] opacity-10" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-medium mb-4">
                        🌴 Ambassador Program
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Share Your Naples Story
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Join our community of travel creators and help visitors discover the magic of Southwest Florida
                    </p>
                    <a
                        href="#apply"
                        className="inline-block px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Apply to Join →
                    </a>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="bg-white py-8 border-b shadow-sm">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                        <p className="text-3xl font-bold text-gray-900">50+</p>
                        <p className="text-sm text-gray-500">Active Ambassadors</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-gray-900">1M+</p>
                        <p className="text-sm text-gray-500">Combined Reach</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-gray-900">500+</p>
                        <p className="text-sm text-gray-500">UGC Posts</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-gray-900">$50K+</p>
                        <p className="text-sm text-gray-500">In Perks Distributed</p>
                    </div>
                </div>
            </section>

            {/* UGC Gallery */}
            <UGCGallery photos={samplePhotos} />

            {/* Perks */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <AmbassadorPerks />
            </section>

            {/* Who We're Looking For */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Who We're Looking For
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                            <span className="text-4xl mb-4 block">📸</span>
                            <h3 className="font-bold text-gray-900 mb-2">Travel Photographers</h3>
                            <p className="text-gray-600 text-sm">Capture the beauty of Naples' beaches, sunsets, and hidden gems</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                            <span className="text-4xl mb-4 block">✍️</span>
                            <h3 className="font-bold text-gray-900 mb-2">Content Creators</h3>
                            <p className="text-gray-600 text-sm">Share your Naples experiences through blogs, videos, or social media</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                            <span className="text-4xl mb-4 block">🏖️</span>
                            <h3 className="font-bold text-gray-900 mb-2">Naples Locals</h3>
                            <p className="text-gray-600 text-sm">Know the insider secrets? Help visitors experience Naples like a local</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" className="py-16">
                <div className="max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                        Apply to Join
                    </h2>
                    <p className="text-gray-600 text-center mb-8">
                        We review applications weekly and respond within 5 business days
                    </p>

                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                        <ContributorApplication />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Ambassador FAQ
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-2">How many followers do I need?</h3>
                            <p className="text-gray-600">We welcome creators of all sizes! Engagement matters more than follower count.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-2">Do I need to live in Naples?</h3>
                            <p className="text-gray-600">No! We welcome both locals and frequent visitors who love Naples.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl">
                            <h3 className="font-bold text-gray-900 mb-2">What content commitments are required?</h3>
                            <p className="text-gray-600">We ask for 2-4 Naples-focused posts per month. Quality over quantity!</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
