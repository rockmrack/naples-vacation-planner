"use client";

import Link from "next/link";
import { SafeImage } from "@/src/components/SafeImage";
import { NaplesPassesGrid } from "@/src/components/NaplesPasses";

export default function NaplesPassesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* Hero */}
            <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold uppercase tracking-wider mb-6">
                        🎟️ Exclusive Savings
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Naples Vacation Passes
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Save hundreds on dining, attractions, tours, and activities with our curated
                        discount passes. One purchase unlocks savings at 50+ partner locations.
                    </p>
                </div>
            </section>

            {/* Passes Grid */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <NaplesPassesGrid />
                </div>
            </section>

            {/* Partner Logos */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-8">
                        Savings at 50+ Partner Locations
                    </h3>
                    <div className="flex flex-wrap justify-center gap-8 text-gray-400">
                        <span className="text-lg font-medium">The Bay House</span>
                        <span className="text-lg font-medium">USS Nemo</span>
                        <span className="text-lg font-medium">Barbatella</span>
                        <span className="text-lg font-medium">Naples Zoo</span>
                        <span className="text-lg font-medium">Botanical Garden</span>
                        <span className="text-lg font-medium">Baker Museum</span>
                        <span className="text-lg font-medium">Pure Naples</span>
                        <span className="text-lg font-medium">+ Many More</span>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">How do I use my pass?</h3>
                            <p className="text-gray-600">
                                After purchase, you'll receive a digital pass via email with a QR code.
                                Simply show this QR code at participating locations to receive your discount.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">When does my pass expire?</h3>
                            <p className="text-gray-600">
                                Your pass is valid for the specified number of days from first use, not purchase date.
                                So you can buy now and activate when you arrive in Naples.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">Can I get a refund?</h3>
                            <p className="text-gray-600">
                                Yes! Unused passes can be refunded within 30 days of purchase.
                                Once activated, passes are non-refundable.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-2">Do I need reservations?</h3>
                            <p className="text-gray-600">
                                For restaurants and tours, we recommend making reservations in advance.
                                Mention you have a Naples Pass when booking to ensure smooth redemption.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
