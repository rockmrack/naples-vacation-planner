"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MapPin } from "lucide-react";

// Dynamically import Leaflet with no SSR
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);
const ZoomControl = dynamic(
    () => import("react-leaflet").then((mod) => mod.ZoomControl),
    { ssr: false }
);

interface NeighborhoodLocation {
    title: string;
    slug: string;
    description: string;
    lat: number;
    lng: number;
}

const NEIGHBORHOODS: NeighborhoodLocation[] = [
    {
        title: "Old Naples",
        slug: "old-naples",
        description: "Historic charm, fine dining on 5th Ave, and the iconic pier.",
        lat: 26.1420,
        lng: -81.7948
    },
    {
        title: "Pelican Bay",
        slug: "pelican-bay",
        description: "Exclusive luxury with private beach access and tram system.",
        lat: 26.2163,
        lng: -81.8085
    },
    {
        title: "Park Shore",
        slug: "park-shore",
        description: "Upscale waterfront living with Venetian Village shopping.",
        lat: 26.1956,
        lng: -81.8109
    },
    {
        title: "Vanderbilt Beach",
        slug: "vanderbilt-beach",
        description: "Laid-back beach vibe near The Ritz-Carlton.",
        lat: 26.2555,
        lng: -81.8234
    },
    {
        title: "Marco Island",
        slug: "marco-island",
        description: "Largest barrier island with wide beaches and resort vibes.",
        lat: 25.9406,
        lng: -81.7148
    },
    {
        title: "North Naples",
        slug: "north-naples",
        description: "Rapidly growing area with family-friendly amenities and Mercato.",
        lat: 26.2692,
        lng: -81.7675
    },
    {
        title: "East Naples",
        slug: "east-naples",
        description: "Emerging arts district, Botanical Garden, and pickleball capital.",
        lat: 26.1287,
        lng: -81.7648
    },
    {
        title: "Bonita Springs",
        slug: "bonita-springs",
        description: "Friendly community with beautiful beaches between Naples and Ft. Myers.",
        lat: 26.3398,
        lng: -81.7787
    },
    {
        title: "Port Royal",
        slug: "port-royal",
        description: "Ultra-luxury waterfront estates and deep-water canals.",
        lat: 26.1092,
        lng: -81.7984
    },
    {
        title: "Aqualane Shores",
        slug: "aqualane-shores",
        description: "Deep-water canals blending Old Naples charm with waterfront living.",
        lat: 26.1245,
        lng: -81.8021
    }
];

export default function NeighborhoodMap() {
    const [isMounted, setIsMounted] = useState(false);

    // Custom icon fix requires importing leaflet on client side only
    useEffect(() => {
        setIsMounted(true);
        // Fix Leaflet's default icon path issues in Next.js
        const L = require("leaflet");
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
    }, []);

    if (!isMounted) {
        return (
            <div className="w-full h-[500px] bg-gray-100 rounded-xl animate-pulse flex items-center justify-center text-gray-400">
                Loading Map...
            </div>
        );
    }

    return (
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200 z-0 relative">
            <MapContainer
                center={[26.1420, -81.7948]} // Centered on Old Naples
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <ZoomControl position="bottomright" />

                {NEIGHBORHOODS.map((hood) => (
                    <Marker
                        key={hood.slug}
                        position={[hood.lat, hood.lng]}
                    >
                        <Popup className="custom-popup">
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{hood.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{hood.description}</p>
                                <Link
                                    href={`/where-to-stay/${hood.slug}`}
                                    className="inline-block px-4 py-2 bg-ocean-600 text-white text-xs font-bold rounded-lg hover:bg-ocean-700 transition-colors w-full text-center"
                                >
                                    Explore Guide →
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
