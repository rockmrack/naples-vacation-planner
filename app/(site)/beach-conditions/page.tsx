"use client";

import { BeachConditionsWidget } from "@/src/components/BeachConditions";

export default function BeachConditionsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Naples Beach Conditions
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real-time conditions at Naples area beaches including wave height,
                            crowds, parking, and water temperature.
                        </p>
                    </div>
                    <BeachConditionsWidget />
                </div>
            </section>
        </div>
    );
}
