import PlacementCmp from "@/components/placementCmp/PlacementCmp";

export const metadata = {
  title: "eduden | Your Placement",
  description:
    "Discover Eduden’s placement support – connect with top recruiters, get career guidance, and land your dream job. Kolkata’s trusted online learning platform empowering students for successful careers.",
};

const Page = () => {
  return (
    <div>
      <div
        className="relative h-[35vh] xl:h-[70vh] flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/placement-banner.jpg')",
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 px-4">
          <h2 className="text-4xl font-bold text-white">
            Placement Success
          </h2>
          <p className="mt-3 text-gray-200">
            Our developers working in leading tech companies
          </p>
        </div>
      </div>

      <PlacementCmp />
    </div>
  );
};

export default Page;
