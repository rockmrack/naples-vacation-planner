import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { site } from "@/src/config/site";
import "@/src/styles/globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: site.defaultTitle,
        template: `%s | ${site.name}`,
    },
    description: site.defaultDescription,
    keywords: [...site.keywords],
    authors: [{ name: site.author.name, url: site.author.url }],
    creator: site.name,
    openGraph: {
        type: "website",
        url: site.url,
        title: site.defaultTitle,
        description: site.defaultDescription,
        siteName: site.name,
        locale: site.locale,
        images: [
            {
                url: "/og/default.jpg",
                width: 1200,
                height: 630,
                alt: site.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: site.defaultTitle,
        description: site.defaultDescription,
    },
    alternates: {
        canonical: site.url,
    },
    robots: {
        index: true,
        follow: true,
    },
};

const navLinks = [
    { href: "/itineraries", label: "Itineraries" },
    { href: "/where-to-stay", label: "Where to Stay" },
    { href: "/day-trips", label: "Day Trips" },
    { href: "/travel-tips", label: "Travel Tips" },
    { href: "/maps", label: "Maps" },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;

    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
                    <div className="section-container">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/30 group-hover:shadow-xl group-hover:shadow-ocean-500/40 transition-all duration-300">
                                    <span className="text-white text-xl">🌴</span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="font-bold text-gray-900">{site.name}</span>
                                </div>
                            </Link>

                            {/* Navigation */}
                            <nav className="hidden md:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-ocean-600 hover:bg-ocean-50 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                                aria-label="Open menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="min-h-[calc(100vh-4rem)]">{children}</main>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300">
                    <div className="section-container py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Brand */}
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center">
                                        <span className="text-white text-xl">🌴</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">
                                        {site.name}
                                    </span>
                                </div>
                                <p className="text-gray-400 max-w-md leading-relaxed">
                                    Your trusted guide to Naples, Florida. We create detailed
                                    itineraries, neighborhood guides, and practical tips to help
                                    you plan the perfect Gulf Coast getaway.
                                </p>
                            </div>

                            {/* Explore */}
                            <div>
                                <h4 className="font-semibold text-white mb-4">Explore</h4>
                                <ul className="space-y-2">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-400 hover:text-ocean-400 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h4 className="font-semibold text-white mb-4">Legal</h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            href="/about"
                                            className="text-gray-400 hover:text-ocean-400 transition-colors"
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/contact"
                                            className="text-gray-400 hover:text-ocean-400 transition-colors"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/affiliate-disclosure"
                                            className="text-gray-400 hover:text-ocean-400 transition-colors"
                                        >
                                            Affiliate Disclosure
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/privacy"
                                            className="text-gray-400 hover:text-ocean-400 transition-colors"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/terms"
                                            className="text-gray-400 hover:text-ocean-400 transition-colors"
                                        >
                                            Terms of Service
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="mt-12 pt-8 border-t border-gray-800">
                            <p className="text-gray-500 text-sm text-center">
                                © {new Date().getFullYear()} {site.name}. All rights reserved.
                                Naples, Florida 🌴
                            </p>
                        </div>
                    </div>
                </footer>

                {/* GA4 Analytics (optional) */}
                {gaId && (
                    <>
                        <Script
                            strategy="afterInteractive"
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        />
                        <Script id="ga4-init" strategy="afterInteractive">
                            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
                        </Script>

                        {/* Affiliate Click Tracking (event delegation) */}
                        <Script id="affiliate-click-tracking" strategy="afterInteractive">
                            {`
                document.addEventListener('click', function(e) {
                  var a = e.target && e.target.closest ? e.target.closest('a[data-affiliate-link-id]') : null;
                  if (!a) return;
                  if (!window.gtag) return;
                  
                  var linkId = a.getAttribute('data-affiliate-link-id') || '';
                  var partner = a.getAttribute('data-affiliate-partner') || '';
                  var placement = a.getAttribute('data-affiliate-placement') || '';
                  var pagePath = window.location.pathname;
                  
                  window.gtag('event', 'affiliate_click', {
                    partner: partner,
                    link_id: linkId,
                    placement: placement,
                    page_path: pagePath
                  });
                }, { capture: true });
              `}
                        </Script>
                    </>
                )}
            </body>
        </html>
    );
}
