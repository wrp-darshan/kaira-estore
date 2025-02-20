"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { use } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { category } = use(params);
  const decodedCategory = decodeURIComponent(category);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); 
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="container sm:py-20 xs:py-16 py-8">
        <div className="flex flex-col items-center">
          <h1 className="my-6 text-3xl font-bold capitalize dark:text-light">{decodedCategory}</h1>
          <p className="md:max-w-[660px] text-center mb-6 text-[#777]">
            Browse the best products in the {decodedCategory} category.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="relative group block cursor-pointer">
              <div className="bg-white block relative before:block before:pt-[100%] overflow-hidden image-zoom-effect image-holder border border-bordercolor">
                <Image
                  src={product.image}
                  alt={product.image}
                  width={200}
                  height={250}
                  objectFit="contain"
                  className="absolute top-0 bottom-0 left-0 right-0 m-auto max-w-full max-h-full p-3"
                  priority
                />
              </div>
              <div className="py-5">
                <h2 className="text-xl mb-2 truncate uppercase dark:text-light">{product.title}</h2>
                <p className="font-body dark:text-light/50">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
