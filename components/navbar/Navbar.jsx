"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { CourseData } from "@/app/FakeDb/CourseData";
import Swal from "sweetalert2";
import axios from "axios";

// Menu items config
const menuItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Know Your Faculty", path: "/faculty-member" },
  { name: "What's New", path: "/whats-new" },
  { name: "Verify", path: "/verify" },
  { name: "Contact Us", path: "/contact" },
  { name: "Placement", path: "/placement" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [admission, setAdmission] = useState(false);

  const isActive = (path) => pathname === path;
  // send email for enroll

  console.log(admission, "check it");
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    candidate_type: "",
    selected_course: "",
    query: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData, "chekc console");

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
            "https://api.eduden.io/api/enroll/",
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

  {CourseData?.forEach(course => console.log(course?.title))}

  // console.log(CourseData, "data");
  return (
    <div>
      {/* Mobile Navbar */}
      <nav className="xl:hidden  w-full z-50 bg-black  py-5">
        <div className="edn__lr__space flex justify-between items-center  font-helvetica font-normal">
          {/* Logo */}
          <div className="headerLogo">
            <Link href="/">
              <img
                className="h-8 w-full object-cover"
                src="/logo.png"
                alt="brand logo"
              />
            </Link>
          </div>
          {/* Menu Icon */}
          <IoMenu
            className="text-[#FFD300] text-3xl cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul className="px-5 py-5 absolute top-0 right-0  w-full h-[100vh] z-50 transition-transform duration-500 ease-in-out bg-black">
            {/* Top Section */}
            <div className=" flex justify-between items-center pb-2 ">
              <div>
                <Link href="/">
                  <img
                    className="h-8 object-cover"
                    src="/logo.png"
                    alt="brand logo"
                  />
                </Link>
              </div>
              <div>
                <MdClose
                  className="text-3xl cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
            {/* Menu Items */}
            {menuItems.map((item) => (
              <li key={item.path} className="py-3">
                <Link
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`${
                    isActive(item.path)
                      ? "text-[#fdd300]  font-semibold"
                      : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <button
              onClick={() => setAdmission(true)}
              className="bg-[#FFD300] text-black font-semibold mt-5 hover:bg-transparent hover:text-[#FFD300] border border-[#FFD300] transition-all duration-300 px-6 py-2 rounded-[50px]"
            >
              Enroll Now
            </button>
          </ul>
        )}
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden xl:block 2xl:hidden  z-50 bg-black py-8  ">
        <div className="edn__lr__space flex justify-between items-center font-helvetica font-normal  ">
          {/* Logo */}
          <div className="headerLogo">
            <Link href="/">
              <img
                className="h-full w-full object-cover"
                src="/logo.png"
                alt="brand logo"
              />
            </Link>
          </div>
          {/* Menu Items */}
          <ul className="flex gap-5 font-medium">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={` ${
                    isActive(item.path)
                      ? "text-[#ffd300] font-semibold border-2 border-[#ffd300] py-1 px-4 rounded-full"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setAdmission(true)}
            className="bg-[#FFD300] text-black font-semibold  hover:bg-transparent hover:text-[#FFD300] border border-[#FFD300] transition-all duration-300 px-[20px] py-[10px] rounded-[50px]"
          >
            Enroll Now
          </button>
        </div>
      </nav>

      <nav className="hidden 2xl:block  z-50 bg-black py-8  ">
        <div className="edn__lr__space flex justify-between items-center font-helvetica font-normal  ">
          {/* Logo */}
          <div className="headerLogo">
            <Link href="/">
              <img
                className="h-full w-full object-cover"
                src="/logo.png"
                alt="brand logo"
              />
            </Link>
          </div>
          {/* Menu Items */}
          <ul className="flex gap-10 font-medium">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={` ${
                    isActive(item.path)
                      ? "text-[#ffd300] font-semibold border-2 border-[#ffd300] py-1 px-4 rounded-full"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setAdmission(true)}
            className="bg-[#FFD300] text-black font-semibold  hover:bg-transparent hover:text-[#FFD300] border border-[#FFD300] transition-all duration-300 px-[20px] py-[10px] rounded-[50px]"
          >
            Enroll Now
          </button>
        </div>
      </nav>

      {/* enroll form  */}

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
                <h2 className="text-xl font-bold text-white mb-4 ">
                  Enroll Inquiry
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
                  id="selected_course"
                  name="selected_course"
                  value={formData.selected_course}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 lg:mb-5 rounded bg-[#222] text-white"
                  required
                >
                  <option value="">-- Choose a course --</option>
                  {CourseData?.map((course, index) => (
                    <option key={index} value={course?.title}>
                      {course?.title}
                    </option>
                  ))}
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

export default Navbar;
