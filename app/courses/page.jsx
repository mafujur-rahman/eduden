import AllCourses from "@/components/homepage/AllCourses";


export const metadata = {
  title: "eduden | courses",
  description:
    "Explore Eduden’s wide range of online courses – from professional skill development to academic programs. Learn from expert instructors and boost your career with Kolkata’s trusted learning platform.",
};

function Courses() {
  return (
    <section>
      <div className="edn__hero__container">
        <h2 className="edn__title text-black">Course </h2>
      </div>
      {/*All Courses */}
      <AllCourses />
    </section>
  );
}

export default Courses;
