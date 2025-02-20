"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import OrderPopup from "../components/Common/OrderPopup";

const Cart = () => {
  const { cart, removeFromCart, getTotalPrice, updateQuantity, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "FIRST10") {
      setDiscount(0.1);
      setIsDiscountApplied(true);
    } else {
      setDiscount(0);
      setIsDiscountApplied(false);
      alert("Invalid coupon code");
    }
  };

  const handleRemoveDiscount = () => {
    setDiscount(0);
    setIsDiscountApplied(false);
    setCouponCode("");
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsOrderSuccess(true);
    }, 2000);
  };

  const handleClosePopup = () => {
    setIsOrderSuccess(false);
    clearCart();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const discountedPrice = totalPrice - totalPrice * discount;

  return (
    <div className="container mx-auto px-4 xs:py-20 py-10">
      <h1 className="sm:text-5xl xs:text-4xl text-3xl font-semibold text-center mb-10 dark:text-light">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray text-lg">Your cart is empty.</p>
          <Link href="/product" className="text-dark mt-4 inline-block border-b border-b-bodycolor hover:text-opacity-70 duration-200 dark:text-light">
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex sm:flex-row flex-col items-center border-b pb-4 border-b-bordercolor bg-white dark:bg-dark-deep p-5 rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="object-cover rounded-lg"
                />
                <div className="flex justify-between w-full sm:flex-row flex-col">
                  <div className="ml-4 flex-grow sm:border-l border-l-bordercolor sm:pl-5 sm:pt-0 pt-3 sm:border-t-0 border-t border-t-bordercolor sm:mt-0 mt-5">
                    <Link href={`/product/${item.id}`} className="md:text-lg text-base font-semibold duration-200 hover:opacity-70 block text-center sm:text-start dark:text-light">
                      {item.title}
                    </Link>
                    <p className="text-gray mt-2 sm:text-start text-center font-body">Price: <span className="text-dark dark:text-light">${item.price}</span></p>

                    <div className="flex items-center sm:mt-2 font-body sm:justify-start justify-center mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 py-1 border rounded bg-gray-200 hover:bg-gray-300 dark:bg-dark dark:border-dark-border dark:text-light "
                      >
                        -
                      </button>
                      <span className="px-4 dark:bg-dark-deep dark:border-dark-border dark:text-light">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 py-1 border rounded bg-gray-200 hover:bg-gray-300 dark:bg-dark dark:border-dark-border dark:text-light"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xl ml-4 sm:pt-0 pt-5 sm:block flex justify-center gap-2 items-center"
                  >
                    <span className="sm:hidden inline-block w-fit text-base">Remove </span><RiDeleteBin6Line  className="sm:h-fit h-7"/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border border-primary rounded-lg shadow-lg bg-white dark:bg-dark-deep font-body h-fit">
            <h2 className="text-xl font-semibold mb-4 dark:text-light">Order Summary</h2>


            {!isDiscountApplied && (
              <>
                <p className="text-bodycolor text-sm mt-2">Use coupon code <strong>FIRST10</strong> for 10% off</p>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="border p-2 rounded-l w-full text-base dark:bg-dark dark:text-light"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="w-full mt-4 bg-primary duration-300 hover:bg-primary-dark text-white py-2 px-6 rounded-lg text-lg"
                  >
                    Apply
                  </button>
                </div>
              </>
            )}

            {isDiscountApplied && (
              <>
                <button
                  onClick={handleRemoveDiscount}
                  className="w-full mt-2 bg-red-500 text-white py-2 px-6 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Remove Discount
                </button>
              </>
            )}
            {isDiscountApplied && (
              <p className="text-[#777] mt-4">
                Total : <span className="font-bold text-dark text-base dark:text-light">${totalPrice.toFixed(2)} <span className="text-sm text-primary font-medium">(Without  Discount)</span></span>
              </p>
            )}
            {isDiscountApplied && (
              <p className="text-[#777] mt-2 text-sm">
                Discount Applied: <span className="font-bold text-red-500">-${(totalPrice * discount).toFixed(2)}</span>
              </p>
            )}
            <p className="text-[#777] mt-3 text-lg">
              Total: <span className="font-bold text-dark dark:text-light">${discountedPrice.toFixed(2)}</span>
            </p>


            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-dark duration-300 hover:bg-graydark dark:hover:bg-graydark dark:bg-gray-dark/50 text-white py-2 px-6 rounded-lg text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}

      <OrderPopup isOpen={isOrderSuccess} onClose={handleClosePopup} />
    </div>
  );
};

export default Cart;
