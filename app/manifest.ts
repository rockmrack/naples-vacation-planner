import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Naples Vacation Planner',
        short_name: 'Naples Guide',
        description: 'The definitive expert guide to Naples, Florida. Curated itineraries, luxury hotel reviews, and local secrets.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0f766e',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
