import { Metadata } from "next";
import { LiveWebcams } from "@/src/components/LiveWebcams";

export const metadata: Metadata = {
    title: "Live Naples Webcams | Naples Vacation Planner",
    description: "Watch live views of Naples beaches, Naples Pier, Fifth Avenue South, and more. Check current weather and crowd conditions in real-time.",
};

export default function LiveWebcamsPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-bold mb-6 animate-pulse">
                        ● LIVE NOW
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Naples Live Webcams
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        See what's happening right now in Naples. Check beach conditions, sunset views, and downtown activity.
                    </p>
                </div>
            </section>

            {/* Webcams Grid */}
            <div className="bg-gray-50 min-h-screen">
                <LiveWebcams />
            </div>

            {/* Newsletter CTA */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Wish You Were Here?</h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Start planning your escape to paradise. Download our free travel guide and get weekly updates on the best of Naples.
                    </p>
                    <a
                        href="/plan"
                        className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30"
                    >
                        Start Planning Your Trip
                    </a>
                </div>
            </section>
        </>
    );
}
