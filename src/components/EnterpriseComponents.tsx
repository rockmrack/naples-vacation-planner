/**
 * Media Logos Component
 * Displays "As Featured In" media brand logos for credibility
 */

const mediaLogos = [
    {
        name: "Travel + Leisure",
        abbrev: "T+L",
    },
    {
        name: "Coastal Living",
        abbrev: "CL",
    },
    {
        name: "Naples Daily News",
        abbrev: "NDN",
    },
    {
        name: "Florida Travel",
        abbrev: "FT",
    },
    {
        name: "Gulf Shore Life",
        abbrev: "GSL",
    },
];

interface MediaLogosProps {
    variant?: "dark" | "light";
    showLabel?: boolean;
}

export function MediaLogos({ variant = "light", showLabel = true }: MediaLogosProps) {
    const textColor = variant === "dark" ? "text-white/60" : "text-gray-400";
    const logoTextColor = variant === "dark" ? "text-white/80" : "text-gray-500";
    const borderColor = variant === "dark" ? "border-white/10" : "border-gray-200";

    return (
        <div className="py-8">
            {showLabel && (
                <p className={`text-center text-sm font-medium uppercase tracking-wider ${textColor} mb-6`}>
                    Trusted by travelers • Featured in
                </p>
            )}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                {mediaLogos.map((logo) => (
                    <div
                        key={logo.name}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${borderColor} bg-white/5`}
                    >
                        <span className={`font-bold text-lg ${logoTextColor}`}>
                            {logo.abbrev}
                        </span>
                        <span className={`hidden sm:inline text-sm ${textColor}`}>
                            {logo.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Enterprise Stats Bar
 * Shows key trust statistics with prominent display
 */

interface EnterpriseStatsProps {
    variant?: "horizontal" | "compact";
}

const enterpriseStats = [
    { value: "12,500+", label: "Travelers Helped", icon: "👥" },
    { value: "47", label: "Expert Guides", icon: "📚" },
    { value: "8", label: "Years Experience", icon: "⭐" },
    { value: "4.9/5", label: "Average Rating", icon: "⭐" },
];

export function EnterpriseStats({ variant = "horizontal" }: EnterpriseStatsProps) {
    if (variant === "compact") {
        return (
            <div className="flex flex-wrap justify-center gap-6 text-sm">
                {enterpriseStats.map((stat, index) => (
                    <div key={stat.label} className="flex items-center gap-2">
                        <span className="font-bold text-white">{stat.value}</span>
                        <span className="text-white/70">{stat.label}</span>
                        {index < enterpriseStats.length - 1 && (
                            <span className="text-white/30 ml-4">|</span>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-6 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {enterpriseStats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl">{stat.icon}</span>
                                <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/**
 * Expert Verified Badge
 * Large, prominent verification badge for content pages
 */

interface ExpertVerifiedBadgeProps {
    size?: "sm" | "md" | "lg";
    showTooltip?: boolean;
}

export function ExpertVerifiedBadge({ size = "md", showTooltip = false }: ExpertVerifiedBadgeProps) {
    const sizeClasses = {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
    };

    return (
        <div className="group relative inline-flex">
            <span
                className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg shadow-green-500/25 ${sizeClasses[size]}`}
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Expert Verified
            </span>
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Reviewed by certified travel experts
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                </div>
            )}
        </div>
    );
}

/**
 * Security Badges Footer
 * Trust seals for site-wide credibility
 */

export function SecurityBadges() {
    return (
        <div className="flex flex-wrap justify-center items-center gap-6 py-6 text-sm text-gray-500">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-100">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-100">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Verified Content</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-100">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="font-medium">Editorial Standards</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 border border-gray-100">
                <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="font-medium">4.9★ Rating</span>
            </div>
        </div>
    );
}
