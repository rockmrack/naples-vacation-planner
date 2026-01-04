import { site } from "@/src/config/site";

interface TrustBadgesProps {
    variant?: "horizontal" | "vertical" | "compact";
    showAll?: boolean;
}

// Trust statistics - these would ideally come from a database/CMS
const trustStats = {
    travelersHelped: 12500,
    guidesPublished: 47,
    yearsExperience: 8,
    averageRating: 4.9,
    reviewCount: 127,
    lastUpdated: "January 2026"
};

export function TrustBadges({ variant = "horizontal", showAll = true }: TrustBadgesProps) {
    const badges = [
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            label: "Verified Content",
            sublabel: "Fact-checked",
            color: "green"
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: "Local Experts",
            sublabel: "Naples residents",
            color: "ocean"
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            ),
            label: "Updated Monthly",
            sublabel: trustStats.lastUpdated,
            color: "purple"
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            label: "Secure & Private",
            sublabel: "SSL Protected",
            color: "gray"
        }
    ];

    const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
        green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-100" },
        ocean: { bg: "bg-ocean-50", text: "text-ocean-700", border: "border-ocean-100" },
        purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
        gray: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" }
    };

    if (variant === "compact") {
        return (
            <div className="flex flex-wrap items-center gap-3">
                {badges.slice(0, 3).map((badge) => (
                    <span
                        key={badge.label}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${colorClasses[badge.color].bg} ${colorClasses[badge.color].text} border ${colorClasses[badge.color].border}`}
                    >
                        {badge.icon}
                        {badge.label}
                    </span>
                ))}
            </div>
        );
    }

    if (variant === "vertical") {
        return (
            <div className="space-y-3">
                {(showAll ? badges : badges.slice(0, 3)).map((badge) => (
                    <div
                        key={badge.label}
                        className={`flex items-center gap-3 p-3 rounded-xl ${colorClasses[badge.color].bg} border ${colorClasses[badge.color].border}`}
                    >
                        <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${colorClasses[badge.color].text} shadow-sm`}>
                            {badge.icon}
                        </div>
                        <div>
                            <p className={`font-semibold text-sm ${colorClasses[badge.color].text}`}>{badge.label}</p>
                            <p className="text-xs text-gray-500">{badge.sublabel}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Horizontal variant (default)
    return (
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
            {(showAll ? badges : badges.slice(0, 3)).map((badge) => (
                <div
                    key={badge.label}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl ${colorClasses[badge.color].bg} border ${colorClasses[badge.color].border}`}
                >
                    <div className={`${colorClasses[badge.color].text}`}>
                        {badge.icon}
                    </div>
                    <div>
                        <p className={`font-semibold text-sm leading-tight ${colorClasses[badge.color].text}`}>{badge.label}</p>
                        <p className="text-xs text-gray-500 leading-tight">{badge.sublabel}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

interface TrustStatsProps {
    variant?: "cards" | "inline";
}

export function TrustStats({ variant = "cards" }: TrustStatsProps) {
    const stats = [
        {
            value: trustStats.travelersHelped.toLocaleString() + "+",
            label: "Travelers Helped",
            icon: "👥"
        },
        {
            value: trustStats.guidesPublished + "+",
            label: "Expert Guides",
            icon: "📖"
        },
        {
            value: trustStats.averageRating.toString(),
            label: "Average Rating",
            icon: "⭐"
        },
        {
            value: trustStats.yearsExperience + "+",
            label: "Years Experience",
            icon: "🏆"
        }
    ];

    if (variant === "inline") {
        return (
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10 text-center">
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <span className="text-3xl mb-2 block">{stat.icon}</span>
                    <p className="text-2xl lg:text-3xl font-bold text-gray-900 font-display">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

export function VerifiedBadge() {
    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified Content
        </span>
    );
}

export function LastVerifiedBadge({ date }: { date: string }) {
    return (
        <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Last verified: {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
    );
}
