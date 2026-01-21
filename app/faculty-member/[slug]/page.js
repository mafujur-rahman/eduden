"use client";

import { faculty } from "../../FakeDb/faculty";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PortfolioPage() {
  const params = useParams();
  const { slug } = params;
  const [person, setPerson] = useState(null);

  useEffect(() => {
    if (person) {
      document.title = `${person.name} - ${person.title} | eduden`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content',
          person.about || `Learn more about ${person.name}, ${person.title} at eduden.`
        );
      }
    }
  }, [person]);

  useEffect(() => {
    if (slug) {
      const foundPerson = faculty.find((p) => p.slug === slug);
      setPerson(foundPerson);
    }
  }, [slug]);

  if (!person) {
    return <div className="p-10 text-center">Loading or profile not found.</div>;
  }

  return (
    <div className="">
      <div className="edn__hero__container">
        <h1 className="edn__title text-black">{person.name}</h1>
      </div>

      <div className="space-y-10 edn__lr__space edn__space__top">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:items-start xl:items-center">
          <img
            src={person.image}
            alt={`${person.name} - ${person.title}`}
            className="w-full h-64 md:h-[85vh] rounded-xl object-cover object-top shadow-lg"
          />

          <div>
            <h2 className="text-3xl md:text-4xl font-gucina font-bold text-[#ffd300]">
              {person.name}
            </h2>
            <p className="text-gray-400 font-medium mt-1 font-lexend">{person.title}</p>
            <p className="mt-4 text-gray-300 leading-relaxed font-lexend">{person.about}</p>

            {person.expertise?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl md:text-3xl mb-4 font-gucina font-semibold text-white">
                  Expertise Area
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {person.expertise.map((exp, i) => (
                    <span
                      key={i}
                      className="bg-[#ffd300] px-3 py-1 text-black rounded-lg text-sm md:text-base"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {person.des?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl md:text-3xl mb-4 font-semibold text-white">
                  See More Insights
                </h3>
                <div className="space-y-5">
                  {person.des.map((item, index) => (
                    <div key={index}>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}