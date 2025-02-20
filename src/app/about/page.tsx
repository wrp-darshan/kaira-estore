"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { BsHandbag, BsGift } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";

function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "auto";
    }, 1500);
  }, []);

  const categories: string[] = ["women's clothing", "jewelery", "men's clothing"];

  const categoryImages: Record<string, string> = {
    "women's clothing": "/img/about.jpg",
    "jewelery": "/img/about2.jpg",
    "men's clothing": "/img/about3.jpg",
  };

  const companyconditions = [
    {
      icon: <CiCalendar className="text-graydark dark:text-light/50 text-[40px]" />,
      title: "Book An Appointment",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
      fade: "fade-right",
    },
    {
      icon: <BsHandbag className="text-graydark dark:text-light/50 text-[40px]" />,
      title: "Pick up in store",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
      fade: "fade-up",
    },
    {
      icon: <BsGift className="text-graydark dark:text-light/50 text-[40px]" />,
      title: "Special packaging",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
      fade: "fade-down",
    },
    {
      icon: <GrPowerCycle className="text-graydark dark:text-light/50 text-[40px]" />,
      title: "Free Global Returns",
      description: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
      fade: "fade-left",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light dark:bg-dark">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="container sm:py-20 xs:py-16 py-8 !overflow-hidden">
        <div className="flex flex-col items-center">
          <h1
            className="my-6 md:text-7xl sm:text-6xl xs:text-5xl text-4xl text-dark dark:text-light"
            data-aos="fade-up"
          >
            New Collections
          </h1>
          <p
            className="md:max-w-[660px] text-center mb-6 text-gray dark:text-light/50"
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            Discover our latest collections from top categories. Browse and shop the best products today!
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:pb-10">
          {categories.map((category, index) => (
            <Link
              href={`/categories/${category.toLowerCase()}`}
              key={index}
              className="relative group block cursor-pointer"
              data-aos={index === 0 ? "fade-right" : index === 1 ? "fade-up" : "fade-left"}
              data-aos-delay={index * 200}
            >
              <div className="w-full h-[500px] relative rounded-lg overflow-hidden image-zoom-effect image-holder">
                <Image
                  src={categoryImages[category] || "/img/about.jpg"}
                  alt={category}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority
                />
              </div>
              <div className="py-5">
                <h2 className="text-xl text-dark dark:text-light mb-2 uppercase">{category}</h2>
                <p className="text-gray dark:text-light/50 text-body sm:text-lg text-base">
                  Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-dark-deep">
        <div className="container sm:py-20 xs:py-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:gap-8 gap-y-20 gap-x-8">
            {companyconditions.map((condition, index) => (
              <div key={index} className="text-center" data-aos={condition.fade}>
                <div className="flex justify-center mb-4">{condition.icon}</div>
                <h3 className="capitalize text-[28px] mb-4 mt-5 text-dark dark:text-light">{condition.title}</h3>
                <p className="text-gray dark:text-light/40 text-base font-body">{condition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container md:py-40 sm:py-20 xs:py-16 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-white dark:bg-dark-deep">
          <div className="h-auto w-full">
            <Image
              src="/img/single-image.jpg"
              className="w-full h-auto object-cover"
              height={600}
              width={600}
              alt="About single image"
              data-aos="zoom-in-right"
            />
          </div>

          <div className="xl:p-20 lg:p-5 sm:p-14 xs:p-10 p-5" data-aos="zoom-in-left">
            <h3 className="mb-10 text-5xl text-dark dark:text-light">Classic Collection</h3>
            <p
              className="text-gray dark:text-light/50 sm:mb-8 md:mb-12 mb-5 font-body sm:text-lg text-base"
              data-aos="fade-up"
            >
              Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a. Ac sed eu
              fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero. Ultricies quam
              nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo mollis
              diam sed facilisis at cursus imperdiet cursus ac faucibus sit faucibus sit libero.
            </p>
            <Link
              data-aos="fade-up"
              href="/categories"
              className="uppercase text-base font-body bg-dark dark:bg-graydark text-light dark:text-light py-2 px-6 duration-300 hover:bg-graydark dark:hover:bg-gray"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
