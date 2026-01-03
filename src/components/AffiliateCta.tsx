import affiliateLinks from "@/src/data/affiliate-links.json";

type AffiliateLinkId = keyof typeof affiliateLinks;

interface AffiliateCtaProps {
    title: string;
    linkId: AffiliateLinkId;
    description?: string;
    placement?: string;
    variant?: "default" | "compact" | "hero";
}

export function AffiliateCta({
    title,
    linkId,
    description,
    placement = "inline",
    variant = "default",
}: AffiliateCtaProps) {
    const link = affiliateLinks[linkId];

    if (!link) {
        console.warn(`Affiliate link not found: ${String(linkId)}`);
        return null;
    }

    if (variant === "compact") {
        return (
            <div className="my-4 flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                <div className="flex-1">
                    <p className="font-medium text-gray-900">{title}</p>
                    {description && (
                        <p className="text-sm text-gray-600 mt-1">{description}</p>
                    )}
                </div>
                <a
                    href={link.url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="btn-primary text-sm px-4 py-2"
                    data-affiliate-link-id={String(linkId)}
                    data-affiliate-partner={link.partner}
                    data-affiliate-placement={placement}
                >
                    {link.label} →
                </a>
            </div>
        );
    }

    if (variant === "hero") {
        return (
            <div className="my-8 p-8 rounded-3xl bg-gradient-to-br from-ocean-500 via-ocean-600 to-ocean-700 text-white shadow-2xl shadow-ocean-500/30">
                <h3 className="text-2xl font-bold">{title}</h3>
                {description && (
                    <p className="mt-2 text-ocean-100 text-lg">{description}</p>
                )}
                <a
                    href={link.url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-xl bg-white text-ocean-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    data-affiliate-link-id={String(linkId)}
                    data-affiliate-partner={link.partner}
                    data-affiliate-placement={placement}
                >
                    {link.label}
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                </a>
                <p className="mt-4 text-xs text-ocean-200">
                    Affiliate link. We may earn a commission at no extra cost to you.
                </p>
            </div>
        );
    }

    // Default variant
    return (
        <div className="affiliate-cta">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-white"
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
                </div>
                <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
                    {description && (
                        <p className="text-gray-600 mt-1">{description}</p>
                    )}
                </div>
            </div>
            <a
                href={link.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                className="btn-primary mt-4 w-full"
                data-affiliate-link-id={String(linkId)}
                data-affiliate-partner={link.partner}
                data-affiliate-placement={placement}
            >
                {link.label}
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                </svg>
            </a>
            <p className="mt-3 text-xs text-gray-500 text-center">
                Affiliate link. We may earn a commission at no extra cost to you.
            </p>
        </div>
    );
}
