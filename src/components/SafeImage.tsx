"use client";

import * as React from "react";

type SafeImageProps = {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc: string;
};

export function SafeImage({ src, alt, className, fallbackSrc }: SafeImageProps) {
    const [currentSrc, setCurrentSrc] = React.useState(src);

    React.useEffect(() => {
        setCurrentSrc(src);
    }, [src]);

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => {
                if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
            }}
        />
    );
}
