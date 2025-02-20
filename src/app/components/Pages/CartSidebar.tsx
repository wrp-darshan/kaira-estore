"use client";
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import { MdOutlineRemoveCircle } from "react-icons/md";
import Link from "next/link";
import OrderPopup from "../Common/OrderPopup";

function CartSidebar({ closeSidebar }: { closeSidebar: () => void }) {
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    clearCart();
    setIsPopupOpen(false);
  };

  return (
    <div className="font-body cart-sidebar bg-white dark:bg-dark-deep p-6 w-[300px] xs:w-[400px] md:w-[500px] h-full fixed right-0 top-0 z-50 text-body shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold dark:text-light">Your Cart</h2>
        <button onClick={closeSidebar} className="text-xl font-bold dark:text-light">
          X
        </button>
      </div>

      <div className="cart-items space-y-4 overflow-y-auto max-h-[65vh] pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index}>
              <div className="flex items-center py-3 gap-4 border-b border-b-bordercolor last:border-b-none">
                <div className="w-16 h-16 flex items-center justify-center bg-white">
                  <Link href={`/product/${item.id}`} passHref>
                    <Image
                      width={64}
                      height={64}
                      src={item.image}
                      alt={item.title || "Product Image"}
                      className="w-full h-full object-contain cursor-pointer"
                    />
                  </Link>
                </div>

                <div className="flex-grow text-sm dark:text-light">
                  <Link href={`/product/${item.id}`} passHref>
                    <p className="font-medium cursor-pointer">{item.title}</p>
                  </Link>
                  <p className="text-default mt-3 dark:text-light/50">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-default mt-1 dark:text-light/50">Quantity: {item.quantity}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xl"
                >
                  <MdOutlineRemoveCircle />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="absolute bottom-0 right-4 left-4 border-t border-bodycolor p-4 bg-white dark:bg-dark-deep">
          <div className="total-price text-right font-semibold">
            <p className="text-dark opacity-80 dark:text-light">Total: ${getTotalPrice()}</p>
          </div>
          <div className="flex justify-between mt-4">
            <Link
              href="/cart"
              className="bg-dark duration-300 hover:bg-graydark text-white py-2 px-6 rounded-lg text-lg dark:hover:bg-gray-dark dark:bg-dark-border"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      )}

      <OrderPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
}

export default CartSidebar;
