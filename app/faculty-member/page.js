import NeedHelp from "@/components/homepage/NeedHelp";
import FacultyMembers from "@/components/KonwFacultyCmp/FacultyMember";
import React from "react";

export const metadata = {
  title: "eduden | Know Your Faculty",
  description:
    "Discover Eduden’s expert faculty in Kolkata – experienced mentors and industry professionals committed to delivering top-quality online education and career-focused training.",
};

const KnowFaculty = () => {
  return (
    <div>
      <div className="edn__hero__container">
        <h2 className="edn__title text-black">Faculty Members</h2>
      </div>

      <div>
        <FacultyMembers />
      </div>

      <NeedHelp />
    </div>
  );
};

export default KnowFaculty;
