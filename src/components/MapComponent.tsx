"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// Fix Leaflet's default icon issue in Next.js
// We use a custom divIcon with Lucide-react for better styling anyway.

interface Location {
    lat: number;
    lng: number;
    title: string;
    description?: string;
}

interface MapComponentProps {
    locations: Location[];
    className?: string;
}

export default function MapComponent({ locations, className }: MapComponentProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className={`w-full h-[400px] bg-gray-100 animate-pulse rounded-xl ${className}`} />
        );
    }

    // Determine center of map (average of points or first point)
    const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;

    // Custom marker icon using simple div and Lucide icon
    const createCustomIcon = () => {
        const iconMarkup = renderToStaticMarkup(
            <div className="relative text-ocean-600 drop-shadow-md">
                <MapPin size={32} fill="currentColor" stroke="white" strokeWidth={2} />
            </div>
        );

        return divIcon({
            html: iconMarkup,
            className: "bg-transparent",
            iconSize: [32, 32],
            iconAnchor: [16, 32], // Tip of the pin
            popupAnchor: [0, -32],
        });
    };

    return (
        <div className={`w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-100 ${className}`}>
             <MapContainer
                center={[centerLat, centerLng]}
                zoom={12}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((loc, idx) => (
                    <Marker key={idx} position={[loc.lat, loc.lng]} icon={createCustomIcon()}>
                        <Popup>
                            <div className="font-sans">
                                <h3 className="font-bold text-sm text-gray-900">{loc.title}</h3>
                                {loc.description && (
                                    <p className="text-xs text-gray-600 mt-1">{loc.description}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
