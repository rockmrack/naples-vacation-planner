"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/src/config/site";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="section-container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Enhanced with subtle animation */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-500/30 group-hover:shadow-xl group-hover:shadow-ocean-500/40 group-hover:scale-105 transition-all duration-300">
                            <span className="text-white text-xl">🌴</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-gray-900 tracking-tight group-hover:text-ocean-700 transition-colors">
                                {site.name}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {site.navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-full hover:text-ocean-600 hover:bg-ocean-50/80 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="w-px h-6 bg-gray-200 mx-2" />
                        <Link
                            href="/plan"
                            className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-full shadow-lg shadow-ocean-500/20 hover:shadow-ocean-500/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Start Planning
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <nav className="flex flex-col p-4 space-y-2">
                        {site.navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-ocean-50 hover:text-ocean-600 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-2 mt-2 border-t border-gray-100">
                            <Link
                                href="/plan"
                                className="flex items-center justify-center w-full px-4 py-3 text-base font-bold text-white bg-ocean-600 rounded-lg shadow-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Start Planning Trip
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
