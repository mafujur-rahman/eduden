"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Download } from "lucide-react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdWorkOutline, MdOutlineDateRange } from "react-icons/md";
import gsap from "gsap";

export default function VerifyCmp() {
    const [query, setQuery] = useState("");
    const [student, setStudent] = useState(null);

    const data = {
        id: "EDN-01",
        name: "Rasel Ahmmed",
        role: "Full Stack Web Developer",
        program: "Advanced Full Stack Engineering",
        issued: "December 2024",
        image: "/placement-1.jpg",
        certificate: "/certificate.png",
        description:
            "This digital credential certifies that Rasel Ahmmed has successfully completed an advanced full-stack engineering program, demonstrating professional competency in system architecture, scalable applications, and production-ready software development.",
    };

    const verify = () => {
        setStudent(query === data.id ? data : null);

        setTimeout(() => {
            gsap.fromTo(
                ".verify-sheet",
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
            );
        }, 80);
    };

    const handleDownloadCertificate = () => {
        if (!student?.certificate) return;

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = student.certificate;

        // Extract filename from the certificate path or use student name
        const fileName = `certificate-${student.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.download = fileName;

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="edn__lr__space py-20 bg-white text-gray-900">

            {/* Search */}
            <div className="max-w-6xl mx-auto ">
                <div className="relative bg-white rounded-2xl">

                    {/* Gradient stroke */}
                    <span className="absolute inset-0 p-[1px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                        <span className="block h-full w-full bg-white rounded-2xl" />
                    </span>

                    <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 px-4 sm:px-10 py-4 sm:py-6">

                        {/* Input Row */}
                        <div className="flex items-center gap-4 w-full">
                            <Search className="text-gray-400 shrink-0" size={20} />

                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter credential ID"
                                className="flex-1 bg-transparent outline-none text-base sm:text-lg tracking-wide"
                            />
                        </div>

                        {/* Button */}
                        <button
                            onClick={verify}
                            className="relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3 text-sm tracking-widest uppercase font-medium border border-transparent rounded-full shrink-0"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01]" />
                            <span className="relative text-black">Verify</span>
                        </button>

                    </div>
                </div>
            </div>



            {student && (
                <div className="verify-sheet max-w-6xl mx-auto mt-28">

                    {/* Identity Sheet */}
                    <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                        <div className="bg-white px-6 xl:px-16 py-7 xl:py-14 rounded-2xl">

                            {/* Header */}
                            <div className="flex justify-between items-end">
                                <div>
                                    <h2 className="text-4xl font-medium tracking-tight">
                                        {student.name}
                                    </h2>
                                    <p className="mt-2 text-sm tracking-widest text-gray-500 uppercase">
                                        Credential · {student.id}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01]" />
                                    <span className="text-sm tracking-widest uppercase">
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
                                    <p className="text-xl leading-relaxed max-w-xl">
                                        {student.description}
                                    </p>

                                    {/* Details */}
                                    <div className="mt-16 space-y-6">
                                        {[{
                                            icon: <HiOutlineAcademicCap />,
                                            label: "Program",
                                            value: student.program,
                                        }, {
                                            icon: <MdWorkOutline />,
                                            label: "Role",
                                            value: student.role,
                                        }, {
                                            icon: <MdOutlineDateRange />,
                                            label: "Issued",
                                            value: student.issued,
                                        }].map((item) => (
                                            <div key={item.label} className="relative p-[1px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                                                <div className="flex items-center gap-2  md:gap-6 px-2 md:px-6 py-2 md:py-4 bg-white rounded-2xl">
                                                    <div className="text-xl text-gray-500">{item.icon}</div>
                                                    <div className="flex justify-between items-center w-full">
                                                        <span className="text-gray-400 tracking-wide">{item.label}</span>
                                                        <span className="font-medium">{item.value}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Identity Image */}
                                <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                                    <div className="relative aspect-[4/4] lg:aspect-[4/5] xl:aspect-[4/4] bg-white rounded-2xl overflow-hidden">
                                        <Image
                                            src={student.image}
                                            alt={student.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Student Name below image */}
                                    <p className="my-2 text-center text-2xl font-bold">{student.name}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Header with Download Button */}
                    <div className="mt-20 flex justify-between items-center mb-6">
                        <p className="text-lg font-semibold text-gray-700">
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

                    {/* Certificate */}
                    <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl">
                        <div className="bg-white rounded-2xl p-6 relative">
                            <Image
                                src={student.certificate}
                                alt="Certificate"
                                width={1400}
                                height={900}
                                className="object-cover rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}