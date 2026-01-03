interface DisclosureProps {
    variant?: "default" | "minimal" | "detailed";
}

export function Disclosure({ variant = "default" }: DisclosureProps) {
    if (variant === "minimal") {
        return (
            <p className="text-xs text-gray-500 italic">
                This post may contain affiliate links. See our{" "}
                <a href="/affiliate-disclosure" className="underline hover:text-gray-700">
                    disclosure
                </a>
                .
            </p>
        );
    }

    if (variant === "detailed") {
        return (
            <div className="disclosure-banner">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <svg
                            className="w-5 h-5 text-amber-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="font-semibold text-amber-900">Affiliate Disclosure</p>
                        <p className="mt-1">
                            Some links on this page are affiliate links. If you book a tour,
                            hotel, or rental car through these links, we may earn a small
                            commission at no extra cost to you. This helps us keep creating
                            free travel guides.{" "}
                            <a
                                href="/affiliate-disclosure"
                                className="font-medium underline hover:text-amber-700"
                            >
                                Learn more →
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <div className="disclosure-banner">
            <div className="flex items-center gap-2">
                <svg
                    className="w-4 h-4 text-amber-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p>
                    <strong>Disclosure:</strong> Some links on this site are affiliate
                    links. If you book through them, we may earn a commission at no extra
                    cost to you.{" "}
                    <a
                        href="/affiliate-disclosure"
                        className="font-medium underline hover:text-amber-700"
                    >
                        More info
                    </a>
                </p>
            </div>
        </div>
    );
}
