'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SafeImage } from './SafeImage';

// ============================================================================
// UGC GALLERY (User Generated Content)
// ============================================================================
interface GalleryPhoto {
    id: string;
    src: string;
    alt: string;
    username: string;
    location?: string;
    likes?: number;
}

interface UGCGalleryProps {
    photos: GalleryPhoto[];
    title?: string;
    instagramHandle?: string;
}

export function UGCGallery({
    photos,
    title = "📸 #NaplesVacation",
    instagramHandle = "naplesvacationplanner"
}: UGCGalleryProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600">
                        Share your Naples moments! Tag us{' '}
                        <a
                            href={`https://instagram.com/${instagramHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            @{instagramHandle}
                        </a>
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.slice(0, 8).map((photo) => (
                        <div
                            key={photo.id}
                            className="relative group aspect-square rounded-xl overflow-hidden"
                        >
                            <SafeImage
                                src={photo.src}
                                fallbackSrc="/images/placeholders/ugc.jpg"
                                alt={photo.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                                <p className="font-medium">@{photo.username}</p>
                                {photo.location && (
                                    <p className="text-sm text-white/80">📍 {photo.location}</p>
                                )}
                                {photo.likes && (
                                    <p className="text-sm text-white/80 mt-1">❤️ {photo.likes}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <a
                        href={`https://instagram.com/${instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Follow Us on Instagram
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// CONTRIBUTOR APPLICATION FORM
// ============================================================================
export function ContributorApplication() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        instagram: '',
        website: '',
        followers: '',
        about: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would submit to an API
        console.log('Contributor application:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center py-12">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-600">
                    We'll review your application and get back to you within 5 business days.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Handle</label>
                    <input
                        type="text"
                        placeholder="@yourhandle"
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follower Count</label>
                    <select
                        value={formData.followers}
                        onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select range</option>
                        <option value="1k-10k">1,000 - 10,000</option>
                        <option value="10k-50k">10,000 - 50,000</option>
                        <option value="50k-100k">50,000 - 100,000</option>
                        <option value="100k+">100,000+</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website / Portfolio</label>
                <input
                    type="url"
                    placeholder="https://yoursite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about yourself *</label>
                <textarea
                    required
                    rows={4}
                    placeholder="Why do you want to be a Naples Vacation Planner contributor? What's your connection to Naples?"
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
                Submit Application
            </button>
        </form>
    );
}

// ============================================================================
// AMBASSADOR PERKS SECTION
// ============================================================================
export function AmbassadorPerks() {
    const perks = [
        { icon: '🏨', title: 'Complimentary Stays', description: 'Free hotel nights at partner properties' },
        { icon: '🍽️', title: 'Dining Credits', description: 'Restaurant gift cards for content creation' },
        { icon: '📸', title: 'Exclusive Access', description: 'VIP tours and behind-the-scenes experiences' },
        { icon: '💰', title: 'Revenue Share', description: 'Earn commission on bookings you drive' },
        { icon: '🎁', title: 'Welcome Kit', description: 'Branded gear and Naples essentials' },
        { icon: '📣', title: 'Amplification', description: 'We feature your content to 100K+ audience' },
    ];

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Ambassador Benefits
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perks.map((perk, i) => (
                    <div
                        key={i}
                        className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                    >
                        <span className="text-4xl mb-4 block">{perk.icon}</span>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{perk.title}</h3>
                        <p className="text-gray-600">{perk.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
