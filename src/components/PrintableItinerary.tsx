'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

interface PrintableItineraryProps {
    title: string;
    days?: number;
    items: {
        day?: number;
        time?: string;
        activity: string;
        location?: string;
        notes?: string;
    }[];
    tripDates?: string;
}

export function PrintableItinerary({ title, days, items, tripDates }: PrintableItineraryProps) {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        window.print();
    };

    const handleDownloadPDF = () => {
        // Use browser print dialog with "Save as PDF" option
        window.print();
    };

    return (
        <div className="relative">
            {/* Print/Download buttons */}
            <div className="flex gap-3 mb-6 print:hidden">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-5 py-3 bg-ocean-500 text-white font-semibold rounded-xl hover:bg-ocean-600 transition-colors shadow-lg"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print Itinerary
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-5 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Save as PDF
                </motion.button>
            </div>

            {/* Printable content */}
            <div ref={printRef} className="print-content bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:p-0">
                {/* Header */}
                <div className="border-b-2 border-ocean-500 pb-6 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">🌴</span>
                        <span className="text-sm font-semibold text-ocean-600 uppercase tracking-wider">Naples Vacation Planner</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {days && <span>📅 {days} Day{days > 1 ? 's' : ''}</span>}
                        {tripDates && <span>🗓️ {tripDates}</span>}
                    </div>
                </div>

                {/* Itinerary items */}
                <div className="space-y-6">
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-4 print:break-inside-avoid">
                            {/* Timeline indicator */}
                            <div className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full bg-ocean-100 text-ocean-600 flex items-center justify-center font-bold text-sm">
                                    {item.day || index + 1}
                                </div>
                                {index < items.length - 1 && (
                                    <div className="w-0.5 flex-1 bg-ocean-200 mt-2" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-6">
                                {item.time && (
                                    <span className="text-sm font-medium text-ocean-600">{item.time}</span>
                                )}
                                <h3 className="text-lg font-semibold text-gray-900">{item.activity}</h3>
                                {item.location && (
                                    <p className="text-gray-600 flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {item.location}
                                    </p>
                                )}
                                {item.notes && (
                                    <p className="text-sm text-gray-500 mt-2 italic">{item.notes}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500 print:mt-8">
                    <p>Generated by Naples Vacation Planner</p>
                    <p className="text-ocean-600">naplesvacationplanner.com</p>
                </div>
            </div>
        </div>
    );
}

// Simplified version for embedding in content pages
export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors print:hidden"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print This Guide
        </button>
    );
}
