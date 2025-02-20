"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("none");
  const [priceRange, setPriceRange] = useState<string>("0");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    };

    fetchProducts();

  }, []);

  const sortProducts = (order: string) => {
    let sortedProducts = [...filteredProducts];
    if (order === "aToZ") {
      sortedProducts = sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "zToA") {
      sortedProducts = sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredProducts(sortedProducts);
  };

  const filterByPrice = (range: string) => {
    let filtered: Product[] = [];
    if (range === "50") {
      filtered = products.filter((product) => product.price <= 50);
    } else if (range === "100") {
      filtered = products.filter((product) => product.price <= 100);
    } else if (range === "200") {
      filtered = products.filter((product) => product.price <= 200);
    } else if (range === "500") {
      filtered = products.filter((product) => product.price <= 500);
    } else if (range === "500+") {
      filtered = products.filter((product) => product.price > 500);
    } else {
      filtered = products;
    }
    setFilteredProducts(filtered);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOrder(value);
    sortProducts(value);
  };

  const handlePriceFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setPriceRange(value);
    filterByPrice(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark">
      <div className="container md:py-20 py-10">
        <div className="text-right font-body text-base">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border p-2 rounded focus:outline-none border-[#d6d5d5] dark:border-dark-border dark:bg-dark dark:text-light/50"
          >
            <option value="none">Sort By</option>
            <option value="aToZ">Name (A to Z)</option>
            <option value="zToA">Name (Z to A)</option>
          </select>

          <select
            value={priceRange}
            onChange={handlePriceFilter}
            className="ml-4 border p-2 rounded focus:outline-none border-[#d6d5d5] dark:border-dark-border dark:bg-dark dark:text-light/50"
          >
            <option value="0">Price Range</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
            <option value="500">Up to $500</option>
            <option value="500+">Above $500</option>
          </select>
        </div>

        <div className="pt-8 md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false} className="relative group block cursor-pointer">
              <div className="bg-white block relative before:block before:pt-[100%] overflow-hidden image-zoom-effect image-holder border border-bordercolor">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={250}
                  objectFit="contain"
                  className="absolute top-0 bottom-0 left-0 right-0 m-auto max-w-full max-h-full p-3"
                  priority
                />
              </div>
              <div className="py-5">
                <h2 className="text-xl mb-2 truncate uppercase dark:text-light">{product.title}</h2>
                <p className="font-body dark:text-[#777]">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

ProductListing.layout = {
  title: "Product Listings - Kaira",
};

export default ProductListing;
