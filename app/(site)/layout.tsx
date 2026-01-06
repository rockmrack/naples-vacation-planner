import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { site } from "@/src/config/site";
import { getOrganizationSchema, getWebSiteSchema } from "@/src/lib/seo";
import { Navbar } from "@/src/components/Navbar";
import { Footer } from "@/src/components/Footer";
import { ConciergeChat } from "@/src/components/ConciergeChat";
import { TouristDestinationSchema, TravelAgencySchema } from "@/src/components/SchemaMarkup";
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
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const gaId = process.env.NEXT_PUBLIC_GA4_ID;

    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen bg-gray-50 text-gray-900 font-sans">
                {/* Schema.org structured data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getOrganizationSchema()),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(getWebSiteSchema()),
                    }}
                />

                {/* Tourist Destination & Travel Agency Schemas */}
                <TouristDestinationSchema />
                <TravelAgencySchema />

                <Navbar />

                {/* Main Content */}
                <main className="min-h-[calc(100vh-4rem)]">{children}</main>

                {/* Global Concierge Chat Widget */}
                <ConciergeChat />

                <Footer />

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
