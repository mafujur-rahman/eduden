import WhatsNewCmp from "@/components/whatsNewCmp/WhatsNewCmp";
import React from "react";

export const metadata = {
  title: "eduden | Whats New",
  description:
    "Stay updated with the latest courses, news, and updates at Eduden – Kolkata’s trusted online learning platform, helping students and professionals advance their skills and careers.",
};

export default function page() {
  return (
    <section>
      <div className="edn__hero__container">
        <h2 className="edn__title text-black">What's New </h2>
      </div>

      {/* what new componets  */}
      <WhatsNewCmp />
    </section>
  );
}
