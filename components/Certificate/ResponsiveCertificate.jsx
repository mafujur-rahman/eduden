"use client";

import { useEffect, useRef, useState } from "react";

export default function ResponsiveCertificate({ children }) {
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    const BASE_WIDTH = 1400;
    const BASE_HEIGHT = 900;

    useEffect(() => {
        const resize = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const nextScale = Math.min(containerWidth / BASE_WIDTH, 1);

            setScale(nextScale);
        };

        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        <div ref={containerRef} className="w-full flex justify-center">
            {/* Layout-sized wrapper (THIS removes extra space) */}
            <div
                style={{
                    width: BASE_WIDTH * scale,
                    height: BASE_HEIGHT * scale,
                }}
            >
                {/* Visual scaling */}
                <div
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        width: BASE_WIDTH,
                        height: BASE_HEIGHT,
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
