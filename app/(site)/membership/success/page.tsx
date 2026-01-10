"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
            <div className="max-w-lg mx-auto text-center px-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to the Family! 🎉
                </h1>

                <p className="text-xl text-gray-600 mb-8">
                    Your premium membership is now active. You have full access to all exclusive
                    features, PDF downloads, and concierge support.
                </p>

                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">What's Next?</h3>
                    <ul className="text-left space-y-3">
                        <li className="flex items-center gap-3 text-gray-700">
                            <span className="w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            Download your first PDF itinerary
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <span className="w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            Explore exclusive partner deals
                        </li>
                        <li className="flex items-center gap-3 text-gray-700">
                            <span className="w-6 h-6 bg-ocean-100 text-ocean-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            Start building your custom itinerary
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/itineraries"
                        className="px-8 py-3 bg-ocean-600 text-white font-bold rounded-xl hover:bg-ocean-700 transition-colors"
                    >
                        Browse Itineraries
                    </Link>
                    <Link
                        href="/profile"
                        className="px-8 py-3 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Go to Profile
                    </Link>
                </div>

                {sessionId && (
                    <p className="text-xs text-gray-400 mt-8">
                        Order ID: {sessionId.slice(0, 20)}...
                    </p>
                )}
            </div>
        </div>
    );
}

export default function MembershipSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
