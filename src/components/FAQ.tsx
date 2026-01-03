"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Generate FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <section className="my-12">
            {/* FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                {title}
            </h2>

            <div className="space-y-3">
                {items.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                aria-expanded={isOpen}
                            >
                                <span className="font-semibold text-gray-900 pr-4">
                                    {item.question}
                                </span>
                                <span
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                            ? "bg-ocean-500 text-white rotate-180"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
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
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                    }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-4 pb-4 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                        {item.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
