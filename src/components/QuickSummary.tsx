interface QuickSummaryProps {
    whoFor: string;
    pace?: "relaxed" | "balanced" | "fast";
    bestSeason: string;
    mustBook?: string[];
    duration?: string;
    budget?: string;
}

const paceLabels = {
    relaxed: { label: "Relaxed", icon: "🌴", color: "text-green-600" },
    balanced: { label: "Balanced", icon: "⚖️", color: "text-blue-600" },
    fast: { label: "Fast-paced", icon: "⚡", color: "text-orange-600" },
};

export function QuickSummary({
    whoFor,
    pace = "balanced",
    bestSeason,
    mustBook = [],
    duration,
    budget,
}: QuickSummaryProps) {
    const paceInfo = paceLabels[pace];

    return (
        <div className="quick-summary">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-ocean-500 flex items-center justify-center">
                    <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                    </svg>
                </div>
                <h2 className="text-lg font-bold text-gray-900">Quick Summary</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Best For */}
                <div className="flex items-start gap-3">
                    <span className="text-xl">👥</span>
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Best For
                        </p>
                        <p className="font-semibold text-gray-900">{whoFor}</p>
                    </div>
                </div>

                {/* Pace */}
                <div className="flex items-start gap-3">
                    <span className="text-xl">{paceInfo.icon}</span>
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Pace
                        </p>
                        <p className={`font-semibold ${paceInfo.color}`}>{paceInfo.label}</p>
                    </div>
                </div>

                {/* Best Season */}
                <div className="flex items-start gap-3">
                    <span className="text-xl">☀️</span>
                    <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Best Season
                        </p>
                        <p className="font-semibold text-gray-900">{bestSeason}</p>
                    </div>
                </div>

                {/* Duration */}
                {duration && (
                    <div className="flex items-start gap-3">
                        <span className="text-xl">⏱️</span>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Duration
                            </p>
                            <p className="font-semibold text-gray-900">{duration}</p>
                        </div>
                    </div>
                )}

                {/* Budget */}
                {budget && (
                    <div className="flex items-start gap-3">
                        <span className="text-xl">💰</span>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                Budget
                            </p>
                            <p className="font-semibold text-gray-900">{budget}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Must Book Ahead */}
            {mustBook.length > 0 && (
                <div className="mt-4 pt-4 border-t border-ocean-200">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        🎟️ Book Ahead (Jan–Apr)
                    </p>
                    <ul className="space-y-1">
                        {mustBook.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <svg
                                    className="w-4 h-4 text-ocean-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
