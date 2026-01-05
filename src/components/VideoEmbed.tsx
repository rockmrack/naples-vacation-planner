"use client";

import { useState, useEffect } from "react";

interface VideoEmbedProps {
    url: string;
    title?: string;
}

export default function VideoEmbed({ url, title = "Video content" }: VideoEmbedProps) {
    const [embedUrl, setEmbedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!url) {
            console.warn("VideoEmbed: No URL provided");
            return;
        }

        console.log("VideoEmbed processing URL:", url);
        let finalUrl = "";

        // YouTube
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.includes("v=")
                ? url.split("v=")[1].split("&")[0]
                : url.split("/").pop();
            finalUrl = `https://www.youtube.com/embed/${videoId}`;
        }
        // Vimeo
        else if (url.includes("vimeo.com")) {
            const videoId = url.split("/").pop();
            finalUrl = `https://player.vimeo.com/video/${videoId}`;
        }

        setEmbedUrl(finalUrl);
    }, [url]);

    if (!embedUrl) return null;

    return (
        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-black aspect-video relative">
            <iframe
                src={embedUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}
