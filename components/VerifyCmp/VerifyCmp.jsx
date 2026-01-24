"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Download } from "lucide-react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdWorkOutline, MdOutlineDateRange } from "react-icons/md";
import gsap from "gsap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import CertificateCanvas from "../Certificate/CertificateCanvas";
import ResponsiveCertificate from "../Certificate/ResponsiveCertificate";

export default function VerifyCmp() {
    const [query, setQuery] = useState("");
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const certificateRef = useRef(null);

    const verify = async () => {
        if (!query.trim()) {
            setError("Please enter a credential ID or student batch ID");
            return;
        }

        setLoading(true);
        setError("");
        setStudent(null);

        try {
            let requestBody = {};

            if (query.startsWith("CNO")) {
                requestBody = { credential_id: query.trim() };
            } else if (query.startsWith("EDU-STU")) {
                requestBody = { student_batch_id: query.trim() };
            } else {
                requestBody = { credential_id: query.trim() };
            }

            const response = await fetch("https://lmsapi.eduden.io/api/certificate/verify/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (data.success) {
                setStudent({
                    id: data.data.credential_id,
                    studentBatchId: data.data.admitted_course.student_batch_id,
                    name: data.data.admitted_course.student_name,
                    program: data.data.admitted_course.course_name,
                    batch: data.data.admitted_course.batch_name,
                    issued: data.data.issued_date,
                    admissionDate: data.data.admitted_course.admission_date,
                    image: data.data.admitted_course.picture,
                    certificate: "/certificate.png",
                    description: `This digital credential certifies that ${data.data.admitted_course.student_name} has successfully completed the ${data.data.admitted_course.course_name} program, demonstrating competency and knowledge in the subject matter.`,
                });

                setTimeout(() => {
                    gsap.fromTo(
                        ".verify-sheet",
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
                    );
                }, 80);
            } else {
                setError(data.message || "Verification failed. Please check the ID and try again.");
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Failed to verify. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            verify();
        }
    };

    const handleDownloadCertificate = async () => {
        if (!certificateRef.current) return;

        const canvas = await html2canvas(certificateRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "px", [1400, 900]);
        pdf.addImage(imgData, "PNG", 0, 0, 1400, 900);

        pdf.save(
            `certificate-${student.name.replace(/\s+/g, "-").toLowerCase()}.pdf`
        );
    };

    return (
        <section className="edn__lr__space py-20 text-white">
            {/* Search */}
            <div className="max-w-6xl mx-auto">
                <div className="relative rounded-2xl">
                    {/* Gradient stroke */}
                    <span className="absolute inset-0 p-[1px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                        <span className="block h-full w-full bg-black rounded-2xl" /> 
                    </span>

                    <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 px-4 sm:px-10 py-4 sm:py-6">
                        {/* Input Row */}
                        <div className="flex items-center gap-4 w-full">
                            <Search className="text-gray-300 shrink-0" size={20} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter credential ID or student batch ID"
                                className="flex-1 bg-transparent outline-none text-base sm:text-lg tracking-wide text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={verify}
                            disabled={loading}
                            className="relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3 text-sm tracking-widest uppercase font-medium border border-transparent rounded-full shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01]" />
                            <span className="relative text-black">
                                {loading ? "Verifying..." : "Verify"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
                        <p className="text-red-300 text-center">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="mt-4 flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fcc405]"></div>
                    </div>
                )}
            </div>

            {student && (
                <div className="verify-sheet max-w-6xl mx-auto mt-28">
                    {/* Identity Sheet */}
                    <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                        <div className="px-6 xl:px-16 py-7 xl:py-14 rounded-2xl bg-black">
                            {/* Header */}
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-4xl font-medium tracking-tight text-white">
                                        {student.name}
                                    </h2>
                                    <p className="mt-2 text-sm tracking-widest text-gray-300 uppercase">
                                        Credential · {student.id}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-400">
                                        Student Batch ID: {student.studentBatchId}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01]" />
                                    <span className="text-sm tracking-widest uppercase text-white">
                                        Verified
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#fcc405] to-transparent" />

                            {/* Content */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-24 mt-16">
                                {/* Description */}
                                <div>
                                    <p className="text-xl leading-relaxed max-w-xl text-white">
                                        {student.description}
                                    </p>

                                    {/* Details */}
                                    <div className="mt-16 space-y-6">
                                        {[
                                            {
                                                icon: <HiOutlineAcademicCap className="text-gray-300" />,
                                                label: "Program",
                                                value: student.program,
                                            },
                                            {
                                                icon: <HiOutlineAcademicCap className="text-gray-300" />,
                                                label: "Batch",
                                                value: student.batch,
                                            },
                                            {
                                                icon: <MdOutlineDateRange className="text-gray-300" />,
                                                label: "Issued Date",
                                                value: student.issued,
                                            },
                                            {
                                                icon: <MdOutlineDateRange className="text-gray-300" />,
                                                label: "Admission Date",
                                                value: student.admissionDate,
                                            },
                                        ].map((item) => (
                                            <div key={item.label} className="relative p-[1px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                                                <div className="flex items-center gap-2 md:gap-6 px-2 md:px-6 py-2 md:py-4 rounded-2xl bg-black">
                                                    <div className="text-xl">{item.icon}</div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <span className="text-gray-400 tracking-wide">{item.label}</span>
                                                        <span className="font-medium text-white">{item.value}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Identity Image */}
                                <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                                    <div className="relative aspect-[4/4] lg:aspect-[4/5] xl:aspect-[4/4] rounded-2xl overflow-hidden bg-black">
                                        <Image
                                            src={student.image}
                                            alt={student.name}
                                            fill
                                            className="object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "/default-avatar.jpg";
                                            }}
                                        />
                                    </div>
                                    {/* Student Name below image */}
                                    <p className="my-2 xl:py-4 text-center text-2xl font-bold text-black">
                                        {student.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Header with Download Button */}
                    <div className="mt-20 flex justify-between items-center mb-6">
                        <p className="text-lg font-semibold text-white">
                            Official Certificate of Completion
                        </p>

                        <button
                            onClick={handleDownloadCertificate}
                            className="flex items-center md:gap-2 px-3 md:px-6 py-1.5 md:py-3 text-sm md:text-lg bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] text-black rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                            <Download size={18} />
                            Download Certificate
                        </button>
                    </div>

                    {/* Certificate Preview */}
                    <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                        <div className="bg-black rounded-2xl overflow-hidden">
                            <ResponsiveCertificate>
                                <CertificateCanvas student={student} />
                            </ResponsiveCertificate>
                        </div>
                    </div>

                    {/* Hidden Certificate for PDF */}
                    <div className="absolute -left-[9999px] -top-[9999px]">
                        <CertificateCanvas ref={certificateRef} student={student} />
                    </div>
                </div>
            )}
        </section>
    );
}