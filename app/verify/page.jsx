import VerifyCmp from "@/components/VerifyCmp/VerifyCmp";

export const metadata = {
  title: "eduden | verify",
  description:
    "Verify courses, certifications, and student credentials on Eduden – Kolkata’s trusted online learning platform offering authentic, expert-led education and career-focused training.",
};

export default function page() {
  return (
    <div>
      <div className="edn__hero__container">
        <h2 className="edn__title text-black">Verify</h2>
      </div>
      <VerifyCmp />
    </div>
  );
}
