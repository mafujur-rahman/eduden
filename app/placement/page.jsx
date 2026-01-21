import PlacementCmp from "@/components/placementCmp/PlacementCmp";

export const metadata = {
  title: "eduden | Your Placement",
  description:
    "Discover Eduden’s placement support – connect with top recruiters, get career guidance, and land your dream job. Kolkata’s trusted online learning platform empowering students for successful careers.",
};

const Page = () => {
  return (
    <div>
      <div className="edn__hero__container"> 
        <h2 className="edn__title text-black"> Placement </h2> 
        {/* <p className="mt-3 text-gray-600"> Our developers working in leading tech companies </p>  */}
        </div>

      <PlacementCmp />
    </div>
  );
};

export default Page;
