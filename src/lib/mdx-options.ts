import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

/**
 * MDX processing options for next-mdx-remote
 * 
 * These plugins enhance the MDX rendering:
 * - remarkGfm: GitHub Flavored Markdown (tables, strikethrough, etc.)
 * - rehypeSlug: Adds IDs to headings
 * - rehypeAutolinkHeadings: Adds anchor links to headings
 */
export const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
        rehypeSlug,
        [
            rehypeAutolinkHeadings,
            {
                behavior: 'wrap',
                properties: {
                    className: ['anchor-link'],
                    ariaLabel: 'Link to section',
                },
            },
        ],
    ],
};

export default mdxOptions;
