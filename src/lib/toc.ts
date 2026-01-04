/**
 * Table of Contents Generator for MDX Content
 * 
 * Extracts headings from MDX content to generate a table of contents.
 * Works with the rehype-slug plugin to create linkable headings.
 */

export interface TocItem {
    id: string;
    text: string;
    level: number;
}

/**
 * Extract headings from MDX/Markdown content
 * 
 * @param content - The MDX/Markdown content string
 * @param maxLevel - Maximum heading level to include (default: 3 for h2 and h3)
 * @returns Array of table of contents items
 */
export function extractToc(content: string, maxLevel: number = 3): TocItem[] {
    const headingRegex = /^(#{2,6})\s+(.+)$/gm;
    const toc: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length; // Number of # characters
        const text = match[2].trim();

        // Only include headings up to the specified max level
        if (level <= maxLevel) {
            // Generate slug ID (matching rehype-slug behavior)
            const id = slugify(text);

            toc.push({
                id,
                text,
                level,
            });
        }
    }

    return toc;
}

/**
 * Generate a URL-friendly slug from text
 * Matches rehype-slug's default behavior
 */
function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-')       // Replace multiple hyphens with single
        .replace(/^-|-$/g, '');    // Remove leading/trailing hyphens
}

/**
 * Generate a nested TOC structure (for multi-level rendering)
 */
export interface NestedTocItem extends TocItem {
    children: NestedTocItem[];
}

export function nestToc(items: TocItem[]): NestedTocItem[] {
    const result: NestedTocItem[] = [];
    const stack: NestedTocItem[] = [];

    for (const item of items) {
        const nestedItem: NestedTocItem = { ...item, children: [] };

        // Pop items from stack that are at the same or higher level
        while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
            stack.pop();
        }

        if (stack.length === 0) {
            result.push(nestedItem);
        } else {
            stack[stack.length - 1].children.push(nestedItem);
        }

        stack.push(nestedItem);
    }

    return result;
}

export default extractToc;
