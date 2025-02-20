import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewsLetter() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address!",{
        position: "bottom-center",
        autoClose: 3000,
        className: "text-body !text-base",});
    } else {
      console.log("Subscribed with email:", email);
      setEmail("");
      toast.success("Your review has been submitted successfully!",{
      position: "bottom-center",
      autoClose: 3000,
      className: "text-body !text-base",
    });
    }
  };

  return (
    <div className="bg-[url('/img/pattern-bg.png')] relative ">
      <div className="dark:absolute dark:inset-0 dark:bg-dark  dark:bg-opacity-90"></div>
      <div className="container mx-auto md:py-24 py-12 px-4 sm:px-8 text-center relative ">
        <h2 className="md:text-[2.8rem] xs:text-4xl text-3xl uppercase text-center ms:py-6 xs:py-4 py-3 dark:text-light" data-aos="fade-up">
          Sign Up for our newsletter
        </h2>
        <div className="flex flex-col items-center">
          <form className="mt-8 lg:w-[800px] w-full" onSubmit={handleSubmit}>
            <input
              className="w-full p-3 border-2 border-bordercolor rounded-lg text-gray-700 focus:outline-none focus:ring-primary-500 dark:bg-dark/50 dark:border-dark-text"
              type="email"
              placeholder="Your Email Address"
              value={email}
              data-aos="fade-right"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
            data-aos="fade-left"
              type="submit"
              className="w-full bg-dark text-white hover:bg-[#424649] duration-300 px-4 py-2 mt-2 dark:bg-dark-border dark:hover:bg-gray-dark"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default NewsLetter;
