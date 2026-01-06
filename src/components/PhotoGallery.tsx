'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
    id: string;
    src: string;
    alt: string;
    location?: string;
    author?: string;
    date?: string;
    likes?: number;
}

// Sample photos for demonstration
const SAMPLE_PHOTOS: Photo[] = [
    { id: '1', src: '/images/gallery/naples-pier-sunset.jpg', alt: 'Naples Pier at Sunset', location: 'Naples Pier', author: 'Sarah M.', date: '2024-12-15', likes: 124 },
    { id: '2', src: '/images/gallery/vanderbilt-beach.jpg', alt: 'Vanderbilt Beach', location: 'Vanderbilt Beach', author: 'John D.', date: '2024-12-10', likes: 98 },
    { id: '3', src: '/images/gallery/tin-city.jpg', alt: 'Tin City Shopping', location: 'Tin City', author: 'Mike R.', date: '2024-12-08', likes: 76 },
    { id: '4', src: '/images/gallery/botanical-garden.jpg', alt: 'Naples Botanical Garden', location: 'Naples Botanical Garden', author: 'Emily W.', date: '2024-12-05', likes: 145 },
    { id: '5', src: '/images/gallery/everglades.jpg', alt: 'Everglades Wildlife', location: 'Everglades', author: 'Chris P.', date: '2024-12-01', likes: 189 },
    { id: '6', src: '/images/gallery/fifth-avenue.jpg', alt: '5th Avenue South', location: '5th Avenue South', author: 'Lisa K.', date: '2024-11-28', likes: 112 },
];

export function PhotoGallery({ photos = SAMPLE_PHOTOS }: { photos?: Photo[] }) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [filter, setFilter] = useState<string>('all');

    const locations: string[] = ['all', ...Array.from(new Set(photos.map(p => p.location).filter((loc): loc is string => loc !== undefined)))];

    const filteredPhotos = filter === 'all'
        ? photos
        : photos.filter(p => p.location === filter);

    return (
        <section className="py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <span className="text-5xl mb-4 block">📸</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Photo Gallery</h2>
                <p className="text-gray-600">Beautiful moments captured by visitors to Naples</p>
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-2 flex-wrap mb-8">
                {locations.map((loc) => (
                    <button
                        key={loc}
                        onClick={() => setFilter(loc)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === loc
                            ? 'bg-ocean-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {loc === 'all' ? 'All Photos' : loc}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filteredPhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="break-inside-avoid"
                    >
                        <div
                            onClick={() => setSelectedPhoto(photo)}
                            className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200"
                        >
                            {/* Placeholder for image */}
                            <div
                                className="aspect-[4/3] bg-gradient-to-br from-ocean-200 to-teal-200 flex items-center justify-center"
                                style={{ minHeight: `${150 + (index % 3) * 50}px` }}
                            >
                                <span className="text-4xl">🏖️</span>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    <p className="font-semibold">{photo.alt}</p>
                                    {photo.location && (
                                        <p className="text-sm text-white/80 flex items-center gap-1">
                                            <span>📍</span> {photo.location}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Likes Badge */}
                            {photo.likes && (
                                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
                                    ❤️ {photo.likes}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
                        >
                            {/* Image */}
                            <div className="aspect-video bg-gradient-to-br from-ocean-300 to-teal-300 flex items-center justify-center">
                                <span className="text-8xl">🌅</span>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedPhoto.alt}</h3>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                            {selectedPhoto.location && (
                                                <span className="flex items-center gap-1">
                                                    📍 {selectedPhoto.location}
                                                </span>
                                            )}
                                            {selectedPhoto.author && (
                                                <span className="flex items-center gap-1">
                                                    👤 {selectedPhoto.author}
                                                </span>
                                            )}
                                            {selectedPhoto.date && (
                                                <span className="flex items-center gap-1">
                                                    📅 {selectedPhoto.date}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                            ❤️ {selectedPhoto.likes}
                                        </button>
                                        <button
                                            onClick={() => setSelectedPhoto(null)}
                                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upload CTA */}
            <div className="text-center mt-12">
                <div className="inline-block bg-gradient-to-br from-ocean-50 to-teal-50 rounded-2xl p-8 border border-ocean-200">
                    <span className="text-4xl mb-4 block">📷</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Photos</h3>
                    <p className="text-gray-600 mb-4">Have amazing Naples photos? Share them with our community!</p>
                    <button className="px-6 py-3 bg-gradient-to-r from-ocean-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                        Upload Photos
                    </button>
                </div>
            </div>
        </section>
    );
}
