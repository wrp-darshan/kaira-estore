"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/img/slide1.jpg",
      title: "Exclusive Summer Sale!",
      description: "Up to 50% off on selected items.",
      ctaText: "Shop Now",
      ctaLink: "/product"
    },
    {
      image: "/img/slide2.jpg",
      title: "New Arrivals in Electronics",
      description: "Latest tech gadgets are waiting for you.",
      ctaText: "Explore Categories",
      ctaLink: "/product"
    },
    {
      image: "/img/slide3.jpg",
      title: "Fashion Deals for You",
      description: "Shop the best fashion deals now.",
      ctaText: "Shop Now",
      ctaLink: "/product"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full md:h-[550px] h-[300px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`w-full h-full absolute transition-opacity duration-1000 ${currentIndex === index ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-dark to-graydark" />
          <Image
            src={slide.image}
            alt={"Offer"}
            layout="fill"
            objectFit="cover"
            className="absolute top-0 left-0 dark:opacity-30"
          />
          <div className="absolute top-0 bottom-0 sm:left-16 sm:right-16 right-2 flex justify-center items-start flex-col transform text-white px-6 md:px-12 w-full">
            <h2 className="text-4xl font-bold mb-4 text-dark dark:text-light" data-aos="fade-up"  data-aos-delay="100">{slide.title}</h2>
            <p className="text-base xs:text-xl mb-6 text-dark dark:text-light" data-aos="fade-up"  data-aos-delay="250">{slide.description}</p>
            <Link href={slide.ctaLink} className="bg-dark duration-300 hover:bg-graydark text-white py-2 px-6 rounded-full text-lg" data-aos="fade-up"  data-aos-delay="400">
              {slide.ctaText}
            </Link>
          </div>
        </div>
      ))}

      {/* Slider controls */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1))}
        className="hidden absolute top-[40%] left-3 z-30 group p-4 w-20 h-20 sm:flex items-center justify-center rounded-full border border-[#d9d9d9]"
      >
        <FaArrowLeft size={25} className='text-bodycolor opacity-45 group-hover:opacity-100 dark:text-dark-text' />
      </button>
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)}
        className="hidden absolute top-[40%] right-3 z-30 p-4 group w-20 h-20 sm:flex items-center justify-center rounded-full border border-[#d9d9d9]"
      >
        <FaArrowRight size={25} className='text-bodycolor opacity-45 group-hover:opacity-100 dark:text-dark-text' />
      </button>

      {/* Slider Dots & Pagination */}
      <div className="absolute xs:bottom-5 bottom-0 left-0 right-0 flex flex-col items-center">
        <div className="flex justify-center space-x-2 mb-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full bg-[#d9d9d9] transition-all duration-300 ${currentIndex === index ? '!bg-primary w-5' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;