"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();
        
        const shuffledProducts = data.sort(() => Math.random() - 0.5).slice(0, 4);
        setProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="sm:py-20 xs:py-16 py-8 bg-white dark:bg-dark-deep">
      <div className="container">
        <div className="">
          <h1 className="my-6 text-3xl font-bold dark:text-light" data-aos="fade-up">Featured Products</h1>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="relative group block cursor-pointer">
              <div className="bg-white block relative before:block before:pt-[100%] overflow-hidden image-zoom-effect image-holder border border-bordercolor" data-aos="fade-right">
                <Image
                  src={product.image}
                  alt={product.image}
                  // layout=""
                  width={200}
                  height={250}
                  objectFit="contain"
                  className="absolute top-0 bottom-0  left-0 right-0 m-auto max-w-full max-h-full p-3"
                  priority
                />
              </div>
              <div className="py-5" data-aos="fade-left">
                <h2 className="text-xl mb-2 truncate uppercase dark:text-light">{product.title}</h2>
                <p className="font-body dark:text-light/50">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
