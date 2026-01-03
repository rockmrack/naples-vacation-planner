import { site } from "@/src/config/site";

export default function robots() {
    const isProd =
        process.env.VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production";

    // Block crawling in non-production environments
    if (!isProd) {
        return {
            rules: [
                {
                    userAgent: "*",
                    disallow: "/",
                },
            ],
        };
    }

    // Production: Allow all crawling
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: `${site.url}/sitemap.xml`,
        host: site.url,
    };
}
