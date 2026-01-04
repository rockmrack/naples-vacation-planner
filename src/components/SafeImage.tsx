"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, 'src'> & {
    src?: string | null;
    fallbackSrc?: string;
};

export function SafeImage({ src, alt, fallbackSrc = "/images/placeholders/travel-tip.svg", ...props }: SafeImageProps) {
    const [currentSrc, setCurrentSrc] = React.useState<string>(src || fallbackSrc);

    React.useEffect(() => {
        if (src) setCurrentSrc(src);
    }, [src]);

    return (
        <Image
            {...props}
            src={currentSrc}
            alt={alt}
            onError={() => {
                if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
            }}
        />
    );
}
