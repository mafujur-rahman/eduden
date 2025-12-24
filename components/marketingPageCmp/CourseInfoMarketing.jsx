/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { LuDownload } from "react-icons/lu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const CourseInfoMarketing = ({ course }) => {
  console.log(course.img, "chekc");
  const [activeButton, setActiveButton] = useState("Admission");
  const [isSameNumber, setIsSameNumber] = useState(true);
  const [startType, setStartType] = useState("Immediately");
  const [admission, setAdmission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    candidate_type: "",
    selected_course: course?.title || "",
    query: "",
  });

  const [marketData, setMarketData] = useState({
    full_name: "",
    whatsapp: "",
    calling_number: "",
    email: "",
    start_status: "",
    course_name: course?.title || "",
  });

  const isFormValid =
    marketData.full_name.trim() !== "" &&
    marketData.whatsapp.trim() !== "" &&
    marketData.email.trim() !== "" &&
    isAgreed;

  const handleToogleButton = (updatedBtn) => {
    setAdmission(updatedBtn === "Admission");
    setActiveButton(updatedBtn);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFD300",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
      customClass: {
        confirmButton: "custom-confirm-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingAlert = Swal.fire({
          title: "Submitting...",
          text: "Please wait while we submit your form.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await axios.post(
            "https://api.eduden.io/api/inquery/",
            formData
          );
          setAdmission(false);
          console.log("Form submitted successfully:", response.data);

          loadingAlert.close();
          Swal.fire({
            title: "Success!",
            text: "Your form has been submitted successfully.",
            icon: "success",
            confirmButtonText: "Got it!",
            customClass: {
              confirmButton: "custom-ok-btn",
            },
          });
        } catch (error) {
          console.error("Error submitting form message:", error);

          let errorMessage = "Failed to submit the form.";

          loadingAlert.close();
          Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
          });
        }
      }
    });
  };

  // downlod brochure file

  const handleDownload = async (fileUrl, fileName) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      // console.log(blob)

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleMarketChange = (e) => {
    const { name, value } = e.target;
    setMarketData((prev) => ({ ...prev, [name]: value }));
  };

  // recaptcha function
  const onSucess = (value) => {
    console.log("check user ", value);
    setIsCaptchaVerified(true);
  };

  const handleMarketSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...marketData,
      start_status:
        startType === "Immediately"
          ? new Date().toISOString().split("T")[0]
          : marketData.start_status,
      calling_number: isSameNumber
        ? marketData.whatsapp
        : marketData.calling_number,
    };

    try {
      const res = await axios.post(
        "https://api.eduden.io/api/course-start-query/",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Submitted!",
          text: "Your course enrollment request has been sent successfully.",
          confirmButtonColor: "#FFD300",
        }).then(() => {
          router.push(`/course/${course?.slug}/thanks`);
        });

        setMarketData({
          full_name: "",
          whatsapp: "",
          calling_number: "",
          email: "",
          start_status: "",
          course_name: course?.title || "",
        });

        setIsSameNumber(true);
        setStartType("Immediately");
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission failed",
          text: "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to the server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="edn__lr__space  edn__space__top bg-[#010101] grid  xl:grid-cols-2 gap-[80px] items-start ">
      <div className="order-2 xl:order-1">
        <h1 className="text-[#FFFFFF] edn__title pb-8">{course.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] pb-[20px]">
          <div className="flex flex-col justify-center items-center py-[8px] border border-white rounded-[16px]">
            <p className="text-[#FFFFFFCC] edn__small__title ">Duration</p>
            <p className="text-[#FFFFFFCC] courseDetailsPara ">
              {course.duration}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center py-[8px] border border-white rounded-[16px]">
            <p className="text-[#FFFFFFCC] edn__small__title">Lecture</p>
            <p className="text-[#FFFFFFCC] courseDetailsPara ">
              {course.lecture}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center py-[8px] border border-white rounded-[16px]">
            <p className="text-[#FFFFFFCC] edn__small__title ">Projects</p>
            <p className="text-[#FFFFFFCC] courseDetailsPara ">
              {course.projects}
            </p>
          </div>
        </div>
        <p className="text-[#FFFFFFCC] edn__base__text pb-[30px] py-3">
          {course.crsDetails}
        </p>

        {course?.eligibility?.length > 0 && (
          <div className="border border-white rounded-xl  text-white p-5 lg:p-10 mb-16">
            <h2 className="text-2xl font-bold mb-5 text-[#FFD300]">
              Eligibility
            </h2>
            <ul className="space-y-3">
              {course.eligibility.map((item, index) => (
                <li key={index} className="edn__base__text">
                  • {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {course?.join?.length > 0 && (
          <div className="border border-white rounded-xl  text-white p-5 lg:p-10 mb-16">
            <h2 className="text-2xl font-bold mb-5 text-[#FFD300]">
              Who Can Join
            </h2>
            <ul className="space-y-3">
              {course?.join.map((item, index) => (
                <li key={index} className="text-base">
                  • {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="lg:flex space-y-5 lg:space-y-0 flex-row gap-[16px]">
          <button
            onClick={() => handleToogleButton("Admission")}
            className={`px-4 py-2 lg:py-3 lg:px-6  2xl:py-3 2xl:px-14 rounded-[50px] text-lg CourseUi text-black ${
              activeButton === "Admission"
                ? "bg-[#FFD300] text-black"
                : "bg-[#1A1A1A] text-white"
            }`}
          >
            Admission Inquiry
          </button>
          {/* <button
            // onClick={() => handleToogleButton('Seminar')}
            className={`px-4 py-2 hover:bg-[#FFD300] hover:text-[#010101] bg-[#1A1A1A] text-white rounded-[50px] lg:py-3 lg:px-6  2xl:py-3 2xl:px-14  text-lg CourseUi  flex gap-2 items-center`}
          >
            Download Brochure{' '}
            <span>
              <LuDownload />
            </span>
          </button> */}

          {/* <a
            href="https://pub-67d26340d4ea42ecaf64e12090b2ba05.r2.dev/AI/Natural%20Language%20Processing%20(NLP).pdf"
            download
            // target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 hover:bg-[#FFD300] hover:text-[#010101] bg-[#1A1A1A] text-white rounded-[50px] lg:py-3 lg:px-6 2xl:py-3 2xl:px-14 text-lg CourseUi flex gap-2 items-center"
          >
            Download Brochure{" "}
            <span>
              <LuDownload />
            </span>
          </a> */}

          <button
            onClick={() =>
              handleDownload(course?.download, `${course?.title}.pdf`)
            }
            className="mt-3 sm:mt-0 px-4 py-2 hover:bg-[#FFD300] hover:text-[#010101] bg-[#1A1A1A] text-white rounded-[50px] lg:py-3 lg:px-6 2xl:py-3 2xl:px-14 text-lg CourseUi flex gap-2 items-center"
          >
            Download Brochure{" "}
            <span>
              <LuDownload />
            </span>
          </button>
        </div>
      </div>

      <div className="order-1 border border-white/10 rounded-2xl p-6 2xl:p-10 shadow-lg">
        <form className="  grid lg:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-base text-white/90 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={marketData.full_name}
              onChange={handleMarketChange}
              required
              className="w-full bg-[#111] border border-white/10 rounded-md outline-none p-2"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-base text-white/90 font-medium mb-1">
              WhatsApp Number
            </label>
            <input
              type="number"
              name="whatsapp"
              value={marketData.whatsapp}
              onChange={handleMarketChange}
              required
              className="w-full bg-[#111] border border-white/10 rounded-md outline-none p-2"
            />
          </div>

          {/* Is your calling number same? */}
          <div>
            <label className="block text-base text-white/90 font-medium mb-1">
              Is your calling number same?
            </label>
            <select
              value={isSameNumber ? "Yes" : "No"}
              onChange={(e) => setIsSameNumber(e.target.value === "Yes")}
              className="w-full bg-[#111] border border-white/10 rounded-md outline-none p-2"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Calling Number */}
          {!isSameNumber && (
            <div>
              <label className="block text-base text-white/90 font-medium mb-1">
                Calling Number
              </label>
              <input
                type="number"
                name="calling_number"
                value={marketData.calling_number}
                onChange={handleMarketChange}
                className="w-full bg-[#111] border border-white/10 rounded-md outline-none p-2"
              />
            </div>
          )}

          {/* Email ID */}
          <div>
            <label className="block text-base text-white/90 font-medium mb-1">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              value={marketData.email}
              onChange={handleMarketChange}
              required
              className="w-full bg-[#111] border border-white/10 rounded-md outline-none p-2"
            />
          </div>

          {/* Start Date Type */}
          <div>
            <label className="block text-base text-white/90 font-medium mb-1">
              When would you like to start the course?
            </label>
            <select
              value={startType}
              onChange={(e) => setStartType(e.target.value)}
              className="w-full bg-[#111] border border-white/10 rounded-md outline-none p-2"
            >
              <option value="Immediately">Immediately</option>
              <option value="Later">Later</option>
            </select>
          </div>

          {/* Date Field */}
          {startType === "Later" && (
            <div>
              <label
                htmlFor="date-input"
                className="block text-base text-white/90 font-medium mb-1 cursor-pointer"
              >
                Select Date
              </label>
              <input
                id="date-input"
                type="date"
                name="start_status"
                value={marketData.start_status}
                onChange={handleMarketChange}
                onFocus={(e) => e.target.showPicker?.()}
                required
                className="w-full bg-[#111] border text-white border-white/10 rounded-md outline-none p-2 cursor-pointer"
              />
            </div>
          )}

          {/* Agreement */}
          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1"
            />
            <p className="text-base text-gray-600">
              I agree to receive updates and communications from Eduden.
            </p>
          </div>

          <div>
            <ReCAPTCHA
              sitekey="6LfuxR4sAAAAAMbeUIETozUwyAmVC-C4HCA6P_K5"
              onChange={onSucess}
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={handleMarketSubmit}
          disabled={isLoading || !isFormValid || !isCaptchaVerified}
          className={`py-3 rounded-lg text-black font-medium transition
  ${
    isLoading || !isFormValid || !isCaptchaVerified
      ? "bg-gray-400 cursor-not-allowed px-6 py-2 mt-10 rounded-full transition"
      : "bg-[#fdd300] text-black cursor-pointer px-6 py-2 mt-10 rounded-full transition"
  }
`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Admission Form */}
      {admission && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-[#1A1A1A] rounded-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg w-[90%] xl:w-[40%] mx-auto "
          >
            {/* Close Button */}
            <button
              onClick={() => setAdmission(false)}
              className="absolute top-2 right-4 text-white text-2xl font-bold hover:text-gray-400"
            >
              &times;
            </button>

            <div className="flex justify-center items-center">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 text-center">
                  Admission Inquiry
                </h2>

                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5 rounded bg-[#222] text-white"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5 rounded bg-[#222] text-white"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5 rounded bg-[#222] text-white"
                  required
                />

                <select
                  name="candidate_type"
                  value={formData.candidate_type}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5 rounded bg-[#222] text-white"
                  required
                >
                  <option value="">Select Candidate Type</option>
                  <option value="Student">Student</option>
                  <option value="Job Holder">Job Holder</option>
                  <option value="Other">Other</option>
                </select>

                {/* Select Course */}
                <select
                  name="selected_course"
                  value={formData.selected_course}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5  rounded bg-[#222] text-white"
                  required
                >
                  {/* <option value='' className='text-white/80'>
                    Select Course
                  </option>
                  <option value='Data Science and Machine Learning'>
                    Data Science and Machine Learning
                  </option>
                  <option value='Graphic Design'>Graphic Design</option>
                  <option value='Introduction to Python Programming'>
                    Introduction to Python Programming
                  </option>
                  <option value='UI/UX Design'>UI/UX Design</option>
                  <option value='Ethical Hacking and Penetration Testing'>
                    Ethical Hacking and Penetration Testing
                  </option>
                  <option value='Network Administration (CCNA)'>
                    Network Administration (CCNA)
                  </option>
                  <option value='Mastering Web Development'>
                    Mastering Web Development
                  </option>
                  <option value='DevOps and Continuous Integration'>
                    DevOps and Continuous Integration
                  </option> */}
                  <option value={course?.title}>{course?.title}</option>
                </select>

                <textarea
                  name="query"
                  placeholder="Your Query"
                  value={formData.query}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5 rounded bg-[#222] text-white"
                ></textarea>

                <button
                  type="submit"
                  className="w-full py-2 my-5 bg-[#FFD300] text-black rounded font-bold hover:bg-yellow-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseInfoMarketing;
