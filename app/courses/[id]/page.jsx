
import { CourseData } from "@/app/FakeDb/CourseData";
import CourseSinglePageCmp from "@/components/courseSinglePageCmp/CourseSinglePageCmp";

export async function generateMetadata({ params }) {
  const course = CourseData.find(
    (item) => String(item.id) === String(params.id)
  );

  if (!course) {
    return {
      title: "Course Not Found | Eduden",
      description: "The course you are looking for does not exist on Eduden.",
    };
  }

  return {
    title: `${course.title} | Eduden`,
    description: `Learn about "${course.title}" on Eduden – Kolkata’s trusted online learning platform offering expert-led courses, practical training, and career-focused education.`,
  };
}

export default function CoursePage() {
  return <CourseSinglePageCmp />;
}
