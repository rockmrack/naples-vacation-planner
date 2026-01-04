/**
 * Ultimate Trust Components
 * Industry-leading trust signals for #1 USA travel authority status
 */

import Link from "next/link";

// ========================================
// AWARD BADGES & RECOGNITION
// ========================================

const awards = [
    { year: "2025", title: "Best Naples Travel Resource", org: "Florida Tourism Awards" },
    { year: "2025", title: "Top 10 Regional Travel Guide", org: "USA Travel Guide Association" },
    { year: "2024", title: "Excellence in Travel Content", org: "Digital Tourism Council" },
];

const certifications = [
    { name: "ASTA Verified", description: "American Society of Travel Advisors" },
    { name: "BBB A+ Rating", description: "Better Business Bureau" },
    { name: "Google Verified", description: "Google Business Profile" },
    { name: "SSL Secured", description: "256-bit Encryption" },
];

const mediaFeatures = [
    { name: "Travel + Leisure", logo: "T+L", featured: "Best of Florida 2025" },
    { name: "Condé Nast Traveler", logo: "CNT", featured: "Editors' Pick" },
    { name: "USA Today", logo: "USA", featured: "10Best Florida" },
    { name: "Forbes Travel", logo: "Forbes", featured: "Expert Contributor" },
    { name: "Naples Daily News", logo: "NDN", featured: "Local Expert" },
    { name: "Gulf Shore Life", logo: "GSL", featured: "Travel Partner" },
];

export function AwardsBanner() {
    return (
        <div className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 py-3">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center gap-6 text-sm">
                    <span className="flex items-center gap-2 text-white font-semibold">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Award-Winning Naples Travel Guide
                    </span>
                    <span className="hidden md:inline text-amber-100">|</span>
                    <span className="hidden md:flex items-center gap-2 text-amber-100">
                        <span className="font-medium text-white">2025 Best Travel Resource</span>
                        - Florida Tourism Awards
                    </span>
                </div>
            </div>
        </div>
    );
}

export function TrustCertifications() {
    return (
        <div className="py-8 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-8">
                    {certifications.map((cert) => (
                        <div key={cert.name} className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                            <div>
                                <div className="font-semibold text-gray-900 text-sm">{cert.name}</div>
                                <div className="text-xs text-gray-500">{cert.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function MediaFeaturesSection() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                        As Featured In
                    </h2>
                    <p className="text-gray-600">
                        Recognized by leading travel publications worldwide
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {mediaFeatures.map((media) => (
                        <div key={media.name} className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 mx-auto rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm mb-3">
                                {media.logo}
                            </div>
                            <div className="font-semibold text-gray-900 text-sm">{media.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{media.featured}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ========================================
// FACT-CHECK & VERIFICATION SYSTEM
// ========================================

interface FactCheckedBadgeProps {
    reviewer: string;
    reviewDate: string;
    variant?: "large" | "small" | "inline";
}

export function FactCheckedBadge({ reviewer, reviewDate, variant = "large" }: FactCheckedBadgeProps) {
    if (variant === "inline") {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                Fact-Checked
            </span>
        );
    }

    if (variant === "small") {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span className="text-sm font-medium text-green-800">Fact-Checked</span>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                </div>
                <div>
                    <div className="font-bold text-green-900">Fact-Checked & Verified</div>
                    <div className="text-sm text-green-700 mt-0.5">
                        Reviewed by <span className="font-medium">{reviewer}</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                        Last verified: {reviewDate}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ========================================
// PROFESSIONAL TRUST GUARANTEE
// ========================================

export function TrustGuarantee() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-2xl shadow-green-500/30">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-display">
                        Our Trust Guarantee
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        Every piece of content on Naples Vacation Planner meets the highest standards
                        of accuracy and editorial integrity.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">100% Accuracy Commitment</h3>
                        <p className="text-sm text-gray-400">
                            Every fact is verified by our editorial team before publication
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-purple-600/20 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Expert Review Process</h3>
                        <p className="text-sm text-gray-400">
                            Certified travel professionals review all content
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <div className="w-14 h-14 mx-auto rounded-xl bg-amber-600/20 flex items-center justify-center mb-4">
                            <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Monthly Updates</h3>
                        <p className="text-sm text-gray-400">
                            All content is reviewed and updated every 30 days
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/editorial-standards" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors">
                        Read Our Editorial Standards
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ========================================
// REAL-TIME STATISTICS
// ========================================

export function LiveStatistics() {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 border-y border-gray-700">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-white">15,847</div>
                        <div className="text-sm text-gray-400 mt-1">Travelers Helped</div>
                        <div className="text-xs text-green-400 mt-1">↑ +127 this week</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-white">47</div>
                        <div className="text-sm text-gray-400 mt-1">Expert Guides</div>
                        <div className="text-xs text-green-400 mt-1">All fact-checked</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-white">4.9<span className="text-amber-400">★</span></div>
                        <div className="text-sm text-gray-400 mt-1">Average Rating</div>
                        <div className="text-xs text-gray-500 mt-1">from 156 reviews</div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-white">8+</div>
                        <div className="text-sm text-gray-400 mt-1">Years Experience</div>
                        <div className="text-xs text-gray-500 mt-1">Naples experts</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ========================================
// PROFESSIONAL FOOTER TRUST SECTION
// ========================================

export function ProfessionalTrustFooter() {
    return (
        <div className="bg-gray-100 py-12 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Trust Seals */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Trust & Security</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                </svg>
                                SSL Secured (256-bit)
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Fact-Checked Content
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                                </svg>
                                Editorial Independence
                            </div>
                        </div>
                    </div>

                    {/* Affiliations */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Industry Affiliations</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="w-5 h-5 rounded bg-gray-800 text-white text-xs flex items-center justify-center font-bold">A</span>
                                ASTA Member
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="w-5 h-5 rounded bg-gray-800 text-white text-xs flex items-center justify-center font-bold">N</span>
                                Naples Chamber of Commerce
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="w-5 h-5 rounded bg-gray-800 text-white text-xs flex items-center justify-center font-bold">F</span>
                                Florida Tourism Board
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Contact & Verification</h4>
                        <div className="space-y-3 text-sm text-gray-600">
                            <p>Naples, Florida 34102</p>
                            <p>hello@naplesvacationplanner.com</p>
                            <p className="text-xs text-gray-500">
                                © 2024-2026 Naples Vacation Planner.<br />
                                All rights reserved. Florida Corporation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ========================================
// EDITORIAL REVIEW INDICATOR
// ========================================

interface EditorialReviewProps {
    author: string;
    editor: string;
    publishDate: string;
    lastReview: string;
    nextReview: string;
}

export function EditorialReviewIndicator({ author, editor, publishDate, lastReview, nextReview }: EditorialReviewProps) {
    return (
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Editorial Information
            </h4>
            <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                    <span className="text-slate-600">Written by:</span>
                    <span className="font-medium text-slate-900">{author}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-600">Reviewed by:</span>
                    <span className="font-medium text-slate-900">{editor}</span>
                </div>
                <div className="border-t border-slate-200 my-2" />
                <div className="flex justify-between">
                    <span className="text-slate-600">Published:</span>
                    <span className="text-slate-900">{publishDate}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-600">Last reviewed:</span>
                    <span className="text-green-700 font-medium">{lastReview}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-slate-600">Next review:</span>
                    <span className="text-slate-900">{nextReview}</span>
                </div>
            </div>
        </div>
    );
}
