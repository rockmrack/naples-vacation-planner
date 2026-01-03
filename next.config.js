/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    images: {
        domains: [],
        formats: ["image/avif", "image/webp"],
    },
};

module.exports = nextConfig;
