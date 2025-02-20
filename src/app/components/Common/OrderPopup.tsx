"use client";
import React from "react";

interface OrderPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderPopup: React.FC<OrderPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96 dark:bg-dark-deep">
        <h2 className="text-2xl font-semibold mb-4 dark:text-light">Order Successful! 🎉</h2>
        <p className="text-gray-600 dark:text-gray">Thank you for your purchase.</p>
        <button
          className="mt-10 bg-dark duration-300 hover:bg-graydark text-white py-2 px-6 rounded-lg text-lg dark:bg-gray-dark dark:hover:bg-graydark"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderPopup;
