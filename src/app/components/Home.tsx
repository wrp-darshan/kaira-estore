"use client"
import { useState, useEffect } from "react";
import Collections from "./Pages/Collections";
import FeaturedProducts from "./Pages/FeaturedProducts";
import Slider from "./Pages/Slider";
import FullWidthbanner from "./Pages/FullWidthbanner";
import NewsLetter from "./Pages/NewsLetter";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Slider />
      <Collections />
      <FeaturedProducts />
      <FullWidthbanner />
      <NewsLetter />
    </>
  );
}

export default Home;
