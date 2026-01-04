#!/usr/bin/env node
/**
 * Internal Link Checker for Naples Vacation Planner
 * 
 * Usage: node scripts/check-links.mjs
 * 
 * Checks all MDX content files for broken internal links.
 * Reports any links that point to non-existent pages.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = path.join(__dirname, '..', 'content');

// Content type to directory mapping
const TYPE_DIRS = {
    itinerary: 'itineraries',
    'where-to-stay': 'where-to-stay',
    'day-trip': 'day-trips',
    'travel-tip': 'travel-tips',
    map: 'maps',
};

// Static pages that always exist
const STATIC_PAGES = [
    '/',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/affiliate-disclosure',
    '/itineraries',
    '/where-to-stay',
    '/day-trips',
    '/travel-tips',
    '/maps',
];

/**
 * Get all content slugs from MDX files
 */
function getAllContentSlugs() {
    const slugs = new Set(STATIC_PAGES);

    Object.entries(TYPE_DIRS).forEach(([type, dir]) => {
        const folder = path.join(CONTENT_ROOT, dir);
        if (!fs.existsSync(folder)) return;

        const files = fs.readdirSync(folder).filter(f => f.endsWith('.mdx'));

        files.forEach(file => {
            const content = fs.readFileSync(path.join(folder, file), 'utf8');
            const slugMatch = content.match(/^slug:\s*(.+)$/m);

            if (slugMatch) {
                const slug = slugMatch[1].trim();
                // Map type to URL path
                const urlPath = `/${TYPE_DIRS[type]}/${slug}`;
                slugs.add(urlPath);
            }
        });
    });

    return slugs;
}

/**
 * Extract internal links from MDX content
 */
function extractInternalLinks(content, filePath) {
    const links = [];

    // Match markdown links: [text](/path)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
        const href = match[2];

        // Only check internal links (starting with /)
        if (href.startsWith('/') && !href.startsWith('//')) {
            // Remove anchor fragments
            const pathOnly = href.split('#')[0];
            links.push({
                href: pathOnly,
                text: match[1],
                filePath,
            });
        }
    }

    // Match href attributes in JSX: href="/path"
    const jsxHrefRegex = /href=["']([^"']+)["']/g;

    while ((match = jsxHrefRegex.exec(content)) !== null) {
        const href = match[1];

        if (href.startsWith('/') && !href.startsWith('//')) {
            const pathOnly = href.split('#')[0];
            links.push({
                href: pathOnly,
                text: '(JSX link)',
                filePath,
            });
        }
    }

    return links;
}

/**
 * Check all content files for broken links
 */
function checkLinks() {
    console.log('🔍 Checking internal links...\n');

    const validSlugs = getAllContentSlugs();
    const brokenLinks = [];
    let totalLinks = 0;

    Object.values(TYPE_DIRS).forEach(dir => {
        const folder = path.join(CONTENT_ROOT, dir);
        if (!fs.existsSync(folder)) return;

        const files = fs.readdirSync(folder).filter(f => f.endsWith('.mdx'));

        files.forEach(file => {
            const filePath = path.join(folder, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const links = extractInternalLinks(content, filePath);

            totalLinks += links.length;

            links.forEach(link => {
                if (!validSlugs.has(link.href)) {
                    brokenLinks.push(link);
                }
            });
        });
    });

    // Report results
    console.log(`📊 Scanned ${totalLinks} internal links\n`);

    if (brokenLinks.length === 0) {
        console.log('✅ No broken links found!\n');
        process.exit(0);
    } else {
        console.log(`❌ Found ${brokenLinks.length} broken links:\n`);

        brokenLinks.forEach(link => {
            const relativePath = path.relative(process.cwd(), link.filePath);
            console.log(`  ${relativePath}`);
            console.log(`    → ${link.href}`);
            console.log('');
        });

        process.exit(1);
    }
}

// Run the checker
checkLinks();
