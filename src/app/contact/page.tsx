"use client";
import Image from "next/image";
// import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";


function Contact() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(false);
    };

    fetchProducts();

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address!", {
        position: "bottom-center",
        autoClose: 3000,
        className: "text-body !text-base",
      });
    } else {
      console.log("Subscribed with email:", email);
      setEmail("");
      toast.success("Your review has been submitted successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        className: "text-body !text-base",
      });
    }
  };

  const contectdetails = [
    {
      icon: <IoIosCall size={25} className="text-dark" />,
      title: "Call Us",
      detail: "+1 (123) 456-7890",
      fade: "fade-down",
    },
    {
      icon: <FaLocationDot size={20} className="text-dark" />,
      title: "Address",
      detail: "245 Quigley Blvd, Ste K",
      fade: "fade-up",
    },
    {
      icon: <CiMail size={25} className="text-dark" />,
      title: "Email",
      detail: "support@bestlooker.pro",
      fade: "fade-down",
    },
  ]

  const img = [
    {
      img: "/img/contactus1.png",
    },
    {
      img: "/img/contactus2.png",
    },
    {
      img: "/img/contactus3.png",
    },
    {
      img: "/img/contactus4.png",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="sm:py-20 xs:py-16 py-8 bg-white dark:bg-dark overflow-hidden">
      <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4 relative">
            <div className="relative xl:col-span-5 sm:col-span-6 col-span-12 xs:h-56 h-40 xl:h-[325px] lg:h-[225px] md:h-[200px] sm:h-[150px] ">
              <Image src={img[0].img} alt="Contact 1" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="relative xl:col-span-7 sm:col-span-6 col-span-6 xs:h-56 h-40 xl:h-[900px] lg:h-[600px] md:h-[400px] sm:h-[300px]">
              <Image src={img[1].img} alt="Contact 2" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="relative xl:col-span-5 sm:col-span-6 col-span-6 xs:h-56 h-40 xl:h-[560px] xl:-mt-[575px] lg:-mt-[375px] md:-mt-[200px] sm:-mt-[150px] lg:h-[360px] md:h-[360px] sm:h-[250px]">
              <Image src={img[3].img} alt="Contact 4" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
            <div className="relative lg:col-span-12 sm:col-span-6 col-span-12 h-36 lg:h-[400px] md:h-[160px] sm:h-[100px]">
              <Image src={img[2].img} alt="Contact 4" layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </div>
      </div>

      <div className="relative bg-[url('/img/section-bg-3.jpg')] bg-cover bg-center sm:my-20 my-10">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto md:py-24 py-12 px-4 sm:px-8 text-center">
          <h2 className="md:text-[2.8rem] xs:text-3xl text-2xl uppercase text-center ms:py-6 xs:py-4 py-3 text-white" data-aos="zoom-out-up">
            Stay informed with our newsletter
          </h2>
          <div className="flex flex-col items-center">
            <form className="sm:mt-8 mt-5 lg:w-[800px] w-full" onSubmit={handleSubmit}>
              <input
                className="w-full p-3 border-2 border-bordercolor rounded-lg text-gray-700 focus:outline-none focus:ring-primary-500"
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-aos="zoom-out-left"
              />
              <button
                type="submit"
                className="w-full bg-dark text-white hover:bg-[#424649] duration-300 px-4 py-2 mt-2 mb-3" data-aos="zoom-out-right"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>

      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="my-6 md:text-7xl sm:text-6xl xs:text-5xl text-4xl dark:text-light">Contact</h2>
          <p className=" text-center mb-6 text-[#777]">
            We’re available for the new projects
          </p>
        </div>
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-20">
            {contectdetails.map((detail) => (
              <div key={detail.title} className="flex items-center gap-8 lg:justify-center" data-aos={detail.fade}>
                <div className="mb-2 bg-[#f1f1f0] dark:bg-[#777] w-14 h-14 flex justify-center items-center rounded-full">
                  {detail.icon}
                </div>
                <div>
                  <h3 className="text-xl mb-2 font-semibold dark:text-light">{detail.title}</h3>
                  <p className=" text-[#777] font-body">{detail.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contact;
