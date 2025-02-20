"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

function FullWidthBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white w-full px-3 relative pb-20 dark:bg-dark-deep">
      <div>
        <Image
          src="/img/video-image.jpg"
          width={1900}
          height={700}
          alt="Banner Image"
          className="h-full w-full"
        />
      </div>

      <div className="absolute sm:top-[40%] xs:top-[35%] top-[30%] xl:top-0 xl:bottom-0 left-0 right-0 flex justify-center items-center">
        <div
          className="flex justify-center items-center relative p-5 rounded-full cursor-pointer z-10"
          onClick={() => setIsOpen(true)}
        >
          <FaPlay className="text-white text-2xl" />
        </div>

        <div className="absolute animate-rotation z-0">
          <Image
            src="/img/text-pattern.png"
            width={248}
            height={248}
            alt="Text Pattern"
            className="md:w-full md:h-full sm:w-[150px] sm:h-[150px] w-[100px] h-[100px]"
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <div className="relative w-[80%] max-w-3xl">
            <button
              className="absolute -top-5 -right-5 bg-white text-black rounded-full p-2 w-12 h-12"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <iframe
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg"
              src="https://www.youtube.com/embed/6h6b4LPq1Vw"
              title="YouTube video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FullWidthBanner;
