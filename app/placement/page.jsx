import PlacementCmp from "@/components/placementCmp/PlacementCmp";

export const metadata = {
  title: "eduden | Your Placement",
  description:
    "Discover Eduden’s placement support – connect with top recruiters, get career guidance, and land your dream job. Kolkata’s trusted online learning platform empowering students for successful careers.",
};

const Page = () => {
  return (
    <div>
      <div className="edn__hero__container text-center edn__lr__space">
          <h1 className="edn__title text-black mb-4">
            Career Opportunities
          </h1>
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            Discover your next career move with our curated job listings.
            Search by role, location, or company to find the perfect match.
          </p>
      </div>

      <PlacementCmp />
    </div>
  );
};

export default Page;
