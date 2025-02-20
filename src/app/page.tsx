"use client"; 
import { useEffect } from "react";
import Home from './components/Home';
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return <Home />;
};

export default HomePage;
