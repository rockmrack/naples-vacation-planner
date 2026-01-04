"use client";

import { useState } from "react";

interface FilterChipsProps {
    options: { value: string; label: string; count?: number }[];
    selected: string | null;
    onChange: (value: string | null) => void;
    allowAll?: boolean;
    allLabel?: string;
}

/**
 * Filter chips for hub pages
 */
export function FilterChips({
    options,
    selected,
    onChange,
    allowAll = true,
    allLabel = "All",
}: FilterChipsProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {allowAll && (
                <button
                    onClick={() => onChange(null)}
                    className={`filter-chip ${selected === null ? "active" : ""}`}
                >
                    {allLabel}
                </button>
            )}
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value === selected ? null : option.value)}
                    className={`filter-chip ${selected === option.value ? "active" : ""}`}
                >
                    {option.label}
                    {option.count !== undefined && (
                        <span className="ml-1 opacity-70">({option.count})</span>
                    )}
                </button>
            ))}
        </div>
    );
}

/**
 * Static filter chips for SSR (no interactivity, just display)
 */
export function FilterChipsStatic({
    labels,
}: {
    labels: string[];
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
                <span key={label} className="badge badge-ocean">
                    {label}
                </span>
            ))}
        </div>
    );
}

export default FilterChips;
