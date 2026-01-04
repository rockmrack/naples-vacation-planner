"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/src/lib/toc";

interface TableOfContentsProps {
    items: TocItem[];
    title?: string;
}

/**
 * Sticky Table of Contents with active section highlighting
 */
export function TableOfContents({ items, title = "On This Page" }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -80% 0px",
                threshold: 0,
            }
        );

        // Observe all headings
        items.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [items]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky header
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
        }
    };

    if (items.length === 0) return null;

    return (
        <nav className="toc-container" aria-label="Table of contents">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">{title}</h2>
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => handleClick(e, item.id)}
                            className={`toc-link ${activeId === item.id ? "active" : ""}`}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default TableOfContents;
