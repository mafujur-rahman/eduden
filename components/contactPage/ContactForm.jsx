"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import Tooltip from "../utilities/Tooltip";
import CommonBtn from "../utilities/CommonBtn";
import { MdOutlineFileDownloadDone } from "react-icons/md";

const ContactForm = () => {
  const [result, setResult] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult("Sending...");

    // Collect form data
    const formData = new FormData(e.target);
    const formObject = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    console.log(" Form Data:", formObject);

    try {
      const response = await fetch("https://api.eduden.io/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formObject),
      });

      const data = await response.json();
      console.log("📤 Response:", data);

      if (data) {
        setResult("Form Submitted Successfully");
        Swal.fire({
          title: "Your Message Submitted Successfully!",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
      } else {
        console.error(" Error:", data);
        setResult(data.message || "Something went wrong");
        Swal.fire({
          title: "Error!",
          text: data.message || "Something went wrong!",
          icon: "error",
          draggable: false,
        });
      }
    } catch (error) {
      console.error(" Fetch Error:", error);
      setResult("Network Error");
      Swal.fire({
        title: "Network Error!",
        text: "Please check your connection and try again.",
        icon: "error",
      });
    }
  };

  console.log(result);

  return (
    <div>
      <div className="lg:grid grid-cols-2 gap-x-[10vw] mx-0 justify-between items-center text-white">
        <div className="h-[530px] w-full">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src="https://ik.imagekit.io/0lnr4mwox/eduden-lattest/contact%20page/contactUsImg.jpg?updatedAt=1745496329639"
            alt=""
          />
        </div>

        <div className="mt-[35px]  w-full">
          <Tooltip btnText="Contact Us" />

          <h3 className="pb-[2vh] edn__card__title">
            Have a Question? Contact Us Today
          </h3>

          <form className="bg-[#010101]" onSubmit={handleSubmit}>
            <div className="mb-[30px]">
              <input
                className="py-[10px] pl-[20px] rounded-[8px] w-full bg-[#010101] border border-[#FFFFFF33]/[.2]"
                type="text"
                placeholder="Name"
                name="name"
                required
              />
            </div>

            <div className="mb-[30px]">
              <input
                className="py-[10px] pl-[20px] rounded-[8px] w-full bg-[#010101] border border-[#FFFFFF33]/[.2]"
                type="email"
                placeholder="Email"
                name="email"
                required
              />
            </div>

            <div className="mb-[30px]">
              <input
                className="py-[10px] pl-[20px] rounded-[8px] w-full bg-[#010101] border border-[#FFFFFF33]/[.2]"
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
            </div>

            <div className="mb-[30px]">
              <input
                className="py-[10px] pl-[20px] rounded-[8px] w-full bg-[#010101] border border-[#FFFFFF33]/[.2]"
                type="text"
                placeholder="Phone Number"
                name="number"
                required
              />
            </div>

            <div className="mb-[50px]">
              <input
                className="pt-[10px] pl-[20px] pb-[70px] rounded-[8px] w-full bg-[#010101] border border-[#FFFFFF33]/[.2]"
                type="text"
                placeholder="Message"
                name="message"
                required
              />
            </div>

            <div>
              <CommonBtn
                text="Submit"
                icon={<MdOutlineFileDownloadDone />}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
