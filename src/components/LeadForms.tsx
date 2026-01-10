"use client";

import { useState } from "react";

type LeadType = "wedding" | "relocation" | "vacation-rental" | "corporate" | "concierge";

interface FormData {
    name: string;
    email: string;
    phone: string;
    leadType: LeadType;
    details: string;
    budget?: string;
    timeline?: string;
}

const leadTypeLabels: Record<LeadType, { title: string; description: string }> = {
    wedding: {
        title: "Wedding & Events",
        description: "Venue tours, vendor recommendations, planning assistance",
    },
    relocation: {
        title: "Relocating to Naples",
        description: "Real estate tours, neighborhood guides, moving assistance",
    },
    "vacation-rental": {
        title: "Vacation Rental Inquiry",
        description: "Long-term rentals, seasonal stays, property recommendations",
    },
    corporate: {
        title: "Corporate Retreats",
        description: "Team events, conference venues, group activities",
    },
    concierge: {
        title: "Concierge Services",
        description: "Custom trip planning, reservations, VIP access",
    },
};

export function QuoteRequestForm({ defaultType }: { defaultType?: LeadType }) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        leadType: defaultType || "concierge",
        details: "",
        budget: "",
        timeline: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call - replace with real endpoint
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In production, send to your CRM or email service
        console.log("Lead captured:", formData);

        setSubmitted(true);
        setLoading(false);
    };

    if (submitted) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600">
                    Our team will contact you within 24 hours to discuss your needs.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lead Type Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    What can we help you with?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(Object.keys(leadTypeLabels) as LeadType[]).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, leadType: type })}
                            className={`p-4 rounded-xl text-left border-2 transition-all ${formData.leadType === type
                                    ? "border-ocean-500 bg-ocean-50"
                                    : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className="font-semibold text-gray-900 text-sm">
                                {leadTypeLabels[type].title}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="John Smith"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="john@example.com"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                    </label>
                    <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
                    >
                        <option value="">Select timeline</option>
                        <option value="asap">As soon as possible</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="3-months">Within 3 months</option>
                        <option value="6-months">Within 6 months</option>
                        <option value="1-year">Within 1 year</option>
                        <option value="exploring">Just exploring</option>
                    </select>
                </div>
            </div>

            {/* Details */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us more about your needs
                </label>
                <textarea
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-ocean-500 focus:border-transparent resize-none"
                    placeholder="Share any details that will help us assist you better..."
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 bg-ocean-600 text-white font-bold rounded-xl hover:bg-ocean-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {loading ? "Sending..." : "Request Quote"}
            </button>

            <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our privacy policy. We'll never share your information.
            </p>
        </form>
    );
}

export function WeddingLeadForm() {
    return (
        <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🎉 Planning a Naples Wedding?
            </h3>
            <p className="text-gray-600 mb-6">
                Get personalized venue recommendations, vendor contacts, and planning assistance.
            </p>
            <QuoteRequestForm defaultType="wedding" />
        </div>
    );
}

export function RelocationLeadForm() {
    return (
        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🏠 Thinking of Moving to Naples?
            </h3>
            <p className="text-gray-600 mb-6">
                Connect with trusted realtors and get insider neighborhood recommendations.
            </p>
            <QuoteRequestForm defaultType="relocation" />
        </div>
    );
}
