'use client';

export function LiveWebcams() {
    const webcams = [
        {
            id: 'naples-pier',
            name: 'Naples Pier',
            description: 'Live view from the iconic Naples Pier',
            embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCNaplesWebcam', // Placeholder
            fallbackImage: '/images/webcams/naples-pier.jpg',
        },
        {
            id: 'vanderbilt-beach',
            name: 'Vanderbilt Beach',
            description: 'Live beach conditions at Vanderbilt Beach',
            embedUrl: null,
            fallbackImage: '/images/webcams/vanderbilt-beach.jpg',
        },
        {
            id: 'fifth-avenue',
            name: 'Fifth Avenue South',
            description: 'Downtown Naples shopping district',
            embedUrl: null,
            fallbackImage: '/images/webcams/fifth-avenue.jpg',
        },
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-5xl mb-4 block">📹</span>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Live Naples Webcams
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        See real-time conditions before your visit
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {webcams.map((cam) => (
                        <div
                            key={cam.id}
                            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                        >
                            <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                                {cam.embedUrl ? (
                                    <iframe
                                        src={cam.embedUrl}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">Webcam offline</span>
                                        <span className="text-xs mt-1">Check back later</span>
                                    </div>
                                )}

                                {/* Live indicator */}
                                <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur rounded-full">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-white text-xs font-bold">LIVE</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white">{cam.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{cam.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8">
                    Webcams update in real-time. Some feeds may be temporarily unavailable.
                </p>
            </div>
        </section>
    );
}
