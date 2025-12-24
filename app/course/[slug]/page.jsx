import { CourseData } from "@/app/FakeDb/CourseData";
import CourseSinglePageCmp from "@/components/courseSinglePageCmp/CourseSinglePageCmp";
import MarketingPageCmp from "@/components/marketingPageCmp/MarketingPageCmp";

export default function CourseMarketingPage({ params }) {
  const { slug } = params;

  const course = CourseData.find((item) => String(item.slug) === String(slug));

  if (!course) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Course Not Found</h1>
        <p className="text-gray-500 mt-2 ">Please check the course URL.</p>
      </div>
    );
  }

  // return <CourseSinglePageCmp course={course} />;
    return <MarketingPageCmp />;
  //  return <p> course are here </p>;
}


