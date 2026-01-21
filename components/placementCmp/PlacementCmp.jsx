"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const placements = [
  {
    name: "Rasel Ahmmed",
    role: "Full Stack Developer",
    company: "Fu Info Tech Ltd.",
    image: "/placement-1.jpg",
  },
  {
    name: "Shahadat Robin",
    role: "Software Developer",
    company: "Lemon Hive",
    image: "/placement-1.jpg",
  },
  {
    name: "Md. Rahim Uddin",
    role: "Software Engineer",
    company: "Softmax Online School",
    image: "/placement-1.jpg",
  },
  {
    name: "Abu Sayeef Shehjad",
    role: "Software Engineer",
    company: "Zolo Inc",
    image: "/placement-1.jpg",
  },
  {
    name: "Tamal Mallick",
    role: "Software Developer",
    company: "Innoweb Limited",
    image: "/placement-1.jpg",
  },
  {
    name: "H.M. Nizum",
    role: "Python Developer",
    company: "IONIC Corporation",
    image: "/placement-1.jpg",
  },
  {
    name: "Morshed Alam",
    role: "Full Stack Developer",
    company: "TunicaLabs Media Pvt. Ltd",
    image: "/placement-1.jpg",
  },
  {
    name: "Arup Debnath",
    role: "Software Engineer",
    company: "Synesis IT",
    image: "/placement-1.jpg",
  },
  {
    name: "Sabbir Hossain",
    role: "Frontend Developer",
    company: "Brain Station 23",
    image: "/placement-1.jpg",
  },
  {
    name: "Mehedi Hasan",
    role: "Backend Developer",
    company: "BJIT",
    image: "/placement-1.jpg",
  },
  {
    name: "Fahim Rahman",
    role: "React Developer",
    company: "Vivasoft",
    image: "/placement-1.jpg",
  },
  {
    name: "Nayeem Islam",
    role: "Software Engineer",
    company: "TigerIT",
    image: "/placement-1.jpg",
  },
];

export default function PlacementCmp() {
  return (
    <section className="px-[5vw] py-24 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {placements.map((item, i) => (
          <div key={i}>
            {/* Gradient Border */}
            <div className="relative p-[2px] bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] rounded-2xl shadow-xl">
              {/* Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden text-center px-5 pb-6 pt-10">

                {/* Image */}
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mx-auto w-60 h-60">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <h3 className="mt-4 text-lg lg:text-2xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm lg:text-xl font-medium text-[#fab80A]">
                  {item.role}
                </p>
                <p className="text-sm lg:text-xl text-gray-500">
                  {item.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
