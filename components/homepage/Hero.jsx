"use client";

import { FaArrowRight, FaFacebook, FaInstagram } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";
import { MdArrowDownward } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./hero.css";
import { IoHomeOutline } from "react-icons/io5";
import { GoArrowDownRight } from "react-icons/go";
import { useState } from "react";
import Link from "next/link";

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileActiveSlide, setMobileActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    pauseOnHover: false,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const slides = [
    {
      image:
        "https://ik.imagekit.io/0lnr4mwox/eduden-lattest/hero/home-hero-1.png?updatedAt=1745415808970",
      title: "Where Learning Meets Imagination & Innovation!",
      paragraph:
        "We're your one-stop destination for unlocking your potential and conquering the digital realm with confidence.",
      button: "Discover More",
    },
    {
      image:
        "https://ik.imagekit.io/0lnr4mwox/eduden-lattest/hero/home-hero-3.png?updatedAt=1745415808669",
      title: "Where Learning Meets Imagination & Innovation!",
      paragraph:
        "We're your one-stop destination for unlocking your potential and conquering the digital realm with confidence.",
      button: "Discover More",
    },
    {
      image:
        "https://ik.imagekit.io/0lnr4mwox/eduden-lattest/hero/HomeBanner.png?updatedAt=1745415808960",
      title: "Where Learning Meets Imagination & Innovation!",
      paragraph:
        "We're your one-stop destination for unlocking your potential and conquering the digital realm with confidence.",
      button: "Discover More",
    },
  ];

  // Handle slide change with transition state
  const handleBeforeChange = (current, next) => {
    setIsTransitioning(true);
  };

  const handleAfterChange = (current) => {
    setActiveSlide(current);
    // Small delay to ensure smooth content fade-in
    setTimeout(() => {
      setIsTransitioning(false);
    }, 100);
  };

  const handleAfterChangeMobile = (current) => {
    setMobileActiveSlide(current);
  };

  return (
    <>
      {/* mobile screen */}
      <div className="w-full text-white pt-3 pb-[15px] lg:pt-10 lg:pb-16 block xl:hidden">
        <Slider {...mobileSettings} afterChange={handleAfterChangeMobile}>
          {slides.map((slide, index) => {
            const isMobileActive = index === mobileActiveSlide;
            return (
              <div
                key={index}
                className="overflow-hidden flex justify-center items-center px-5 md:px-9 lg:px-5"
              >
                <div
                  className="flex flex-col bg-cover bg-no-repeat bg-center justify-center rounded-lg h-[50vh] md:h-[50vh] lg:h-[60vh] w-full py-2 px-8 sm:px-[30px] lg:px-16 transition-all duration-700"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div
                    className={`transform transition-all duration-700 ease-out ${isMobileActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                      }`}
                  >
                    <h1 className="heroHead text-[#FFFFFF] mb-3">
                      {slide.title}
                    </h1>
                    <p className="w-[220px] sm:w-full HomeBannerPara text-[#FFFFFF]">
                      {slide.paragraph}
                    </p>
                    <button
                      className={` homeLargeAppoinMent flex gap-x-2 py-2 mb-2 mt-10 px-5 text-white hover:text-black font-medium  rounded-full border border-[#FFD300]  transition-colors duration-300 `}
                    >
                      {/* <span className='top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#ffd300] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#ffd300] after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full'></span> */}

                      <span className=' text-base font-semibold'>
                        <span className='flex items-center gap-x-3'>
                          {slide.button}{" "}
                          <span>
                            <FaArrowRight />
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* for large screens (xl only) */}
      <div className="w-full text-white pb-5 hidden xl:block 2xl:hidden relative">
        <Slider
          {...settings}
          beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <div key={index} className="h-[80vh] 2xl:h-[70vh] mt-[5vh] px-4">
                <div
                  className={`bg-cover bg-center rounded-lg px-10 h-full transition-all duration-700 ease-out ${isActive ? "scale-100" : "scale-95"
                    }`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="flex justify-between items-center h-full">
                    <div
                      className={`transform transition-all duration-700 ease-out ${isActive && !isTransitioning
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                        }`}
                    >
                      <button className="py-2 px-6 border border-[#FFD300] flex items-center gap-x-2 rounded-full mb-[5vh] cursor-default text-white font-semibold">
                        <span>
                          <IoHomeOutline />
                        </span>
                        Welcome to eduden
                      </button>
                      <h1 className="heroHead max-w-screen-lg mb-[5vh]">
                        {slide.title}
                      </h1>
                      <p className="md:max-w-md lg:max-w-screen-sm text-lg text-[#FFFFFF] mb-[5vh]">
                        {slide.paragraph}
                      </p>
                      <Link href="/about">
                        <button
                          className={`flex items-center text-white  border py-1.5 px-6 rounded-full border-[#FFD300] hover:bg-[#FFD300] hover:text-black transition-all duration-300 group `}
                        >
                          {/* <span className='top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#ffd300] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#ffd300] after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full'></span> */}

                          <span className=' text-base font-semibold'>
                            <span className='flex items-center gap-x-3'>
                              Discover More
                              <span>
                                <FaArrowRight />
                              </span>
                            </span>
                          </span>
                        </button>
                      </Link>
                    </div>

                    <div
                      className={`transform transition-all duration-700 ease-out delay-150 ${isActive && !isTransitioning
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                        }`}
                    >
                      <div className="border-2 border-[#FFD300] px-[30px] pt-[60px] pb-[20px] max-w-[46px] flex flex-col items-center space-y-[14px] rounded-full">
                        <span className="transform rotate-90 heroSecSubHead text-white mb-[30px] whitespace-nowrap">
                          follow now
                        </span>
                        <span className="transform rotate-[-90] text-white">
                          <MdArrowDownward size={20} />
                        </span>
                        <div className="flex flex-col space-y-[10px] items-center">
                          <div className="bg-[#FFD300] p-2 rounded-full text-black cursor-pointer hover:scale-110 duration-300 ease-in-out hover:bg-[#010101] hover:text-white">
                            <Link
                              href="https://www.facebook.com/profile.php?id=61557983775555"
                              target="_blank"
                            >
                              <FaFacebook size={20} />
                            </Link>
                          </div>
                          <div className="bg-[#FFD300] p-2 rounded-full text-black cursor-pointer hover:scale-110 duration-300 ease-in-out hover:bg-[#010101] hover:text-white">
                            <Link
                              href="https://www.instagram.com/at_eduden/"
                              target="_blank"
                            >
                              <FaInstagram size={20} />
                            </Link>
                          </div>
                          <div className="bg-[#FFD300] p-2 rounded-full text-black cursor-pointer hover:scale-110 duration-300 ease-in-out hover:bg-[#010101] hover:text-white">
                            <Link
                              href="https://www.linkedin.com/company/edu-den/"
                              target="_blank"
                            >
                              <LiaLinkedinIn size={20} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>

      {/* for 2xl screens */}
      <div className="w-full text-white pb-5 hidden 2xl:block relative">
        <Slider
          {...settings}
          beforeChange={handleBeforeChange}
          afterChange={handleAfterChange}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;

            return (
              <div key={index} className="h-[70vh] mt-[5vh] px-10">
                <div
                  className={`bg-cover bg-center rounded-lg px-10 h-full transition-all duration-500 ease-out ${isActive ? "mx-0 scale-100" : "mx-0 scale-95"
                    }`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="flex justify-between items-center h-full">
                    <div
                      className={`transform transition-all duration-500 ease-out ${isActive && !isTransitioning
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                        }`}
                    >
                      <button className="py-2 px-6 border border-[#FFD300] flex items-center gap-x-2 rounded-full mb-[5vh] cursor-default text-white font-semibold">
                        <span>
                          <IoHomeOutline />
                        </span>
                        Welcome to eduden
                      </button>
                      <h1 className="heroHead max-w-screen-lg mb-[5vh]">
                        {slide.title}
                      </h1>
                      <p className="md:max-w-md lg:max-w-screen-sm text-lg text-[#FFFFFF] mb-[5vh]">
                        {slide.paragraph}
                      </p>
                      <Link href="/about">
                        <button
                          className="flex items-center border py-1.5 px-6 rounded-full text-white border-[#FFD300] hover:bg-[#FFD300] hover:text-black transition-all duration-300 group "
                        >
                          {/* <span className='top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-[#ffd300] before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-[#ffd300] after:duration-500 hover:text-black group-hover:before:h-full group-hover:after:h-full'></span> */}

                          <span className=' text-base font-semibold'>
                            <span className='flex items-center gap-x-3'>
                              Discover More
                              <span>
                                <FaArrowRight />
                              </span>
                            </span>
                          </span>
                        </button>
                      </Link>
                    </div>

                    <div
                      className={`transform transition-all duration-700 ease-out delay-150 ${isActive && !isTransitioning
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                        }`}
                    >
                      <div className="border-2 border-[#FFD300] px-[30px] pt-[60px] pb-[20px] max-w-[46px] flex flex-col items-center space-y-[14px] rounded-full">
                        <span className="transform rotate-90 heroSecSubHead text-white mb-[30px] whitespace-nowrap">
                          follow now
                        </span>
                        <span className="transform rotate-[-90] text-white">
                          <MdArrowDownward size={20} />
                        </span>
                        <div className="flex flex-col space-y-[10px] items-center">
                          <div className="bg-[#FFD300] p-2 rounded-full text-black cursor-pointer hover:scale-110 duration-300 ease-in-out hover:bg-[#010101] hover:text-white">
                            <Link
                              href="https://www.facebook.com/profile.php?id=61557983775555"
                              target="_blank"
                            >
                              <FaFacebook size={20} />
                            </Link>
                          </div>
                          <div className="bg-[#FFD300] p-2 rounded-full text-black cursor-pointer hover:scale-110 duration-300 ease-in-out hover:bg-[#010101] hover:text-white">
                            <Link
                              href="https://www.instagram.com/at_eduden/"
                              target="_blank"
                            >
                              <FaInstagram size={20} />
                            </Link>
                          </div>
                          <div className="bg-[#FFD300] p-2 rounded-full text-black cursor-pointer hover:scale-110 duration-300 ease-in-out hover:bg-[#010101] hover:text-white">
                            <Link
                              href="https://www.linkedin.com/company/edu-den/"
                              target="_blank"
                            >
                              <LiaLinkedinIn size={20} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default Hero;
