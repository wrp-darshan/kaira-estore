"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import OrderPopup from "@/app/components/Common/OrderPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeaturedProducts from "@/app/components/Pages/FeaturedProducts";
import { useCart } from "@/app/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function ProductDetail() {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState<{ rating: number }[]>([]);
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewSubmit = () => {
    if (!reviewText.trim() || reviewRating === 0) {
      toast.error("Please provide both a review and a rating.", {
        position: "bottom-center",
        autoClose: 3000,
        className: "text-body !text-base",
      });
      return;
    }
    setReviews([...reviews, { rating: reviewRating }]);
    setReviewText("");
    setReviewRating(0);
    toast.success("Your review has been submitted successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      className: "text-body !text-base",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
        image: product.image,
      });
      toast.success(`Added ${quantity} item(s) to the cart.`, {
        position: "bottom-center",
        autoClose: 3000,
        className: "!text-body !text-base",
      });
    }
  };

  const handleQuantityChange = (value: string | number) => {
    setQuantity((prev) => {
      if (value === "increment") return prev + 1;
      if (value === "decrement") return prev > 1 ? prev - 1 : 1;
      const numValue = parseInt(value as string, 10);
      return !isNaN(numValue) && numValue > 0 ? numValue : 1;
    });
  };
  

  const handleBuyNow = () => {
    setIsPopupOpen(true);
  };

  const totalReviews = product ? product.rating.count + reviews.length : 0;
  const totalRating = product && totalReviews > 0
    ? (product.rating.rate * product.rating.count + reviews.reduce((sum, r) => sum + r.rating, 0)) / totalReviews
    : (product ? product.rating.rate : 0);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="md:my-[120px] sm:my-20 my-14">
      <ToastContainer className={"text-body text-base"} />

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 md:pb-[120px] sm:pb-20 pb-12 ">
        <div
          className="relative overflow-hidden rounded-xl border border-bordercolor bg-white cursor-zoom-in"
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={handleMouseMove}
        >
          <div className="relative before:block before:pt-[60%] w-full h-full">
            <Image
              src={product.image}
              alt={product.title}
              height={300}
              width={300}
              objectFit="contain"
              className={`absolute top-0 bottom-0 left-0 right-0 m-auto transition-transform duration-300 md:max-w-[400px] sm:max-w-[250px] max-w-[200px] md:max-h-[400px] sm:max-h-[250px] max-h-[200px] w-auto h-auto p-5 ${zoom ? "scale-[2]" : "scale-100"}`}
              style={{
                transformOrigin: `${position.x}% ${position.y}%`,
              }}
              priority
            />
          </div>
        </div>

        <div className="pb-16 pt-3">
          <h1 className="sm:text-3xl text-2xl font-semibold dark:text-light">{product.title}</h1>
          <div className="flex items-center my-5 font-body">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-xl ${i < Math.round(totalRating) ? "text-dark dark:text-light" : "text-[#777] dark:text-[#777]/50"}`}>
                ★
              </span>
            ))}
            <span className="ml-2 dark:text-light">({totalRating.toFixed(1)} / 5) • {totalReviews} reviews</span>
          </div>
          <p className="font-body dark:text-light/50">Category: <span className="text-default dark:text-light">{product.category}</span></p>
          <p className="my-5 font-body text-default sm:text-base text-sm dark:text-light/50">{product.description}</p>
          <p className="pt-2 text-2xl font-semibold dark:text-light/50">price: <span className="text-default dark:text-light text-3xl">${product.price}</span></p>

          <div className="mt-6 space-x-2">
            <button
              className="text-xl border bg-white dark:bg-dark-deep dark:border-dark-border dark:text-light border-bordercolor hover:bg-gray-400 transition-all duration-200 py-3 w-9 rounded-full shadow-lg transform hover:scale-110"
              onClick={() => handleQuantityChange("decrement")}
            >
              -
            </button>

            <input
              type="number"
              className="w-14 text-center rounded-lg py-3 pl-3 focus:outline-none transition-all duration-200 mr-3 dark:bg-dark-deep dark:border-dark-border dark:text-light"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              min="1"
              readOnly
            />

            <button
              className="text-xl border dark:bg-dark-deep dark:border-dark-border dark:text-light bg-white border-bordercolor hover:bg-gray-400 transition-all duration-200 py-3 w-9  rounded-full shadow-lg transform hover:scale-110"
              onClick={() => handleQuantityChange("increment")}
            >
              +
            </button>
          </div>

          <div className="flex xs:gap-6 items-center gap-3">
            <button
              className="my-5 bg-dark duration-300 hover:bg-graydark text-white py-2 px-6 rounded-lg text-lg dark:bg-gray-dark dark:hover:bg-graydark"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <button
              className="bg-dark duration-300 hover:bg-graydark text-white py-2 px-6 rounded-lg text-lg dark:bg-gray-dark dark:hover:bg-graydark"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          <OrderPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
      </div>
      <FeaturedProducts />
      <div className="py-12 md:my-12 mb-12 m px-4 sm:px-8 text-center">
        <h2 className="md:text-[2.8rem] xs:text-4xl text-3xl uppercase text-center ms:py-6 xs:py-4 py-3 dark:text-light">
          Leave a Review
        </h2>
        <div className="flex flex-col items-center">
          <div className="mt-6">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl cursor-pointer ${i < reviewRating ? "text-dark dark:text-light" : "text-[#777] dark:text-[#777]/50"}`}
                  onClick={() => setReviewRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              className="w-full p-3 border-2 border-bordercolor rounded-lg text-gray-700 focus:outline-none focus:ring-primary-500"
              rows={3}
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              className="w-full bg-dark text-white hover:bg-[#424649] duration-300 px-4 py-2 mt-2 dark:bg-gray-dark dark:hover:bg-graydark"
              onClick={handleReviewSubmit}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
