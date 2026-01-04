/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    images: {
        domains: [],
        formats: ["image/avif", "image/webp"],
    },
    webpack: (config) => {
        config.watchOptions = {
            ...config.watchOptions,
            ignored: ['**/naples-vacation-planner/**', '**/node_modules/**'],
        };
        return config;
    },
};

module.exports = nextConfig;
