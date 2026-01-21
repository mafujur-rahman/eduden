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
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      const img = card.querySelector(".img-3d");

      card.addEventListener("mouseenter", () => {
        gsap.to(img, {
          rotateY: 18,
          rotateX: -12,
          scale: 1.08,
          z: 60,
          duration: 0.6,
          ease: "power3.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(img, {
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          z: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    });
  }, []);

  return (
    <section className="px-[5vw] py-24 bg-white">

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-12">
        {placements.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group perspective-[1200px]"
          >
            {/* Card */}
            <div
              className="relative rounded-3xl bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01]
                         p-[2px] shadow-xl"
            >
              <div className="rounded-3xl bg-white px-6 pb-10 pt-14 text-center">
                {/* Triangle Image */}
                <div
                  className="img-3d relative mx-auto h-44 w-44 
                             transform-style-preserve-3d"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#fab80A] via-[#fcc405] to-[#fecf01] p-[3px]">
                    <div
                      className="relative h-full w-full bg-white overflow-hidden"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 100% 35%, 80% 100%, 20% 100%, 0% 35%)",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <h3 className="mt-8 text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm font-medium text-[#fab80A]">
                  {item.role}
                </p>
                <p className="text-sm text-gray-500">
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
