"use client";

import { forwardRef } from "react";

const CertificateCanvas = forwardRef(({ student }, ref) => {
    if (!student) return null;

    return (
        <div
            ref={ref}
            id="certificate"
            className="relative w-[1400px] h-[900px] "
            style={{
                backgroundImage: "url('/certificate.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Student Name */}
            <div
                style={{
                    position: "absolute",
                    top: 325,
                    left: 95,
                    fontSize: 46,
                    fontWeight: 600,
                    color: "#000",
                }}
            >
                {student.name}
            </div>

            {/* Course */}
            <div
                style={{
                    position: "absolute",
                    top: 465,
                    left: 95,
                    fontSize: 30,
                    color: "#000",
                }}
            >
                {student.program}
            </div>

            {/* Issue Date */}
            <div
                style={{
                    position: "absolute",
                    bottom: 265,
                    left: 560,
                    fontSize: 18,
                    color: "#555",
                }}
            >
                {student.issued}
            </div>

            {/* Credential ID */}
            <div
                style={{
                    position: "absolute",
                    bottom: 265,
                    right: 470,
                    fontSize: 18,
                    color: "#555",
                }}
            >
                {student.id}
            </div>
        </div>
    );
});

CertificateCanvas.displayName = "CertificateCanvas";
export default CertificateCanvas;
