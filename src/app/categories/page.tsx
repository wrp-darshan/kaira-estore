"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Category() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryImages: { [key: string]: string } = {
    electronics: "/img/electronic.jpg",
    jewelery: "/img/jewelery.jpg",
    "men's clothing": "/img/mens.jpg",
    "women's clothing": "/img/womens.jpg",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="container sm:py-20 xs:py-16 py-8">
      <div className="flex flex-col items-center">
        <h1 className="my-6 md:text-7xl sm:text-6xl xs:txet-5xl text-4xl dark:text-light font-bold">New Collections</h1>
        <p className="md:max-w-[660px] text-center mb-6 text-[#777] sm:text-lg text-base">
          Discover our latest collections from top categories. Browse and shop the best products today!
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link href={`/categories/${category.toLowerCase()}`} key={index} className="relative group block cursor-pointer">
            <div className="w-full h-[350px] relative rounded-lg overflow-hidden image-zoom-effect image-holder">
              <Image
                src={categoryImages[category] || "/images/placeholder.jpg"}
                alt={category}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                priority
              />
            </div>
            <div className="py-5">
              <h2 className="text-xl font-semibold mb-2 capitalize dark:text-light">{category}</h2>
              <span className="border-b border-dark dark:text-dark-text/50 dark:border-dark-border">
                View Collection
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
