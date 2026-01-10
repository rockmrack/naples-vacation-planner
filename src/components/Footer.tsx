import Link from "next/link";
import { site } from "@/src/config/site";



export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            {/* Top Trust Section */}
            <div className="border-b border-gray-800 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center shadow-lg shadow-ocean-900/20">
                                    <span className="text-white text-xl">🌴</span>
                                </div>
                                <span className="font-bold text-white text-lg tracking-tight">
                                    {site.name}
                                </span>
                            </div>
                            The #1 most trusted travel guide for Naples, Florida.
                            Fact-checked, unbiased, and written by verified local experts.
                        </p>

                        <div className="mb-6 text-sm text-gray-400 space-y-1">
                            <p>780 5th Ave S, Suite 200</p>
                            <p>Naples, FL 34102</p>
                            <p>hello@naplesvacationplanner.com</p>
                        </div>
                        <div className="flex gap-4">
                            {/* Social placeholders or trust icons */}
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-ocean-600 hover:text-white transition-colors cursor-pointer">
                                <span className="sr-only">Facebook</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-ocean-600 hover:text-white transition-colors cursor-pointer">
                                <span className="sr-only">Twitter</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-ocean-600 hover:text-white transition-colors cursor-pointer">
                                <span className="sr-only">Instagram</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </div>
                        </div>
                    </div>

                    {/* Trust & Security */}
                    <div>
                        <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Trust & Security</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Fact-Checked Content<br /><span className="text-xs text-gray-500">Verified monthly</span></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span>SSL Secured (256-bit)<br /><span className="text-xs text-gray-500">Safe browsing</span></span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-400">
                                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                                <span>Editorial Independence<br /><span className="text-xs text-gray-500">No paid reviews</span></span>
                            </li>
                        </ul>
                    </ul>

                    <h4 className="font-bold text-white mt-8 mb-6 uppercase text-xs tracking-wider">Official Stats</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-5 h-5 rounded bg-gray-800 text-white text-xs flex items-center justify-center font-bold">A</span>
                            <span>ASTA Verified Member</span>
                        </li>
                        <li className="flex items-center gap-3 text-sm text-gray-400">
                            <span className="w-5 h-5 rounded bg-gray-800 text-white text-xs flex items-center justify-center font-bold">N</span>
                            <span>Naples Chamber of Commerce</span>
                        </li>
                    </ul>
                </div>

                {/* Explore */}
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Explore Naples</h4>
                    <ul className="space-y-3">
                        {site.navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-ocean-500 transition-colors"></span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/authors"
                                className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-ocean-500 transition-colors"></span>
                                Meet Our Experts
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">Company</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/editorial-standards" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Editorial Standards
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Contact Support
                            </Link>
                        </li>
                        <li>
                            <Link href="/reviews" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Verified Reviews
                            </Link>
                        </li>
                        <li>
                            <Link href="/affiliate-disclosure" className="text-gray-400 hover:text-white transition-colors text-sm">
                                Affiliate Disclosure
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div >

        {/* Bottom Bar */ }
        < div className = "bg-black/20 py-8" >
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-gray-500 text-xs">
                    © {new Date().getFullYear()} {site.name}. All rights reserved.
                    <span className="hidden md:inline mx-2 text-gray-700">|</span>
                    <br className="md:hidden" />
                    Made with 🌴 in Naples, Florida.
                </div>

                <div className="flex items-center gap-6 text-xs text-gray-500">
                    <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                    <Link href="/sitemap" className="hover:text-gray-300 transition-colors">Sitemap</Link>
                </div>
            </div>
    </div >
        </footer >
    );
}
