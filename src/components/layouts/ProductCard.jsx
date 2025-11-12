// components/ProductCard.jsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const cardRef = useRef(null);

  // --- Note: GSAP animation logic is handled by the parent component (OurProducts) ---

  return (
    <div
      ref={cardRef}
      // UI ENHANCEMENT & PERFORMANCE FIX: Added 'will-change: transform, opacity' for GPU rendering
      className="product-card-item bg-white rounded-2xl shadow-2xl transition-all duration-500 overflow-hidden 
                 border border-green-500/10 flex flex-col h-full transform 
                 hover:-translate-y-2 hover:shadow-green-500/40 will-change-transform-opacity"
      style={{ willChange: "transform, opacity" }} // Explicitly setting for better performance guarantee
    >
      {/* Product Image Area */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-50 border-b-4 border-green-600/30">
        {/* FIX: Replaced legacy layout/objectFit props with 'fill' and 'object-cover' */}
        <Image
          src={product.image}
          alt={product.title}
          fill={true}
          className="transition-transform duration-500 hover:scale-[1.05] object-cover"
        />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      <div className="p-7 flex flex-col flex-grow">
        {/* Product Title */}
        <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
          {product.title}
        </h3>

        {/* Brief Description */}
        <p className="text-gray-600 text-base mb-8 flex-grow">
          {product.description}
        </p>

        {/* Action Button */}
        <button
          className="mt-auto w-full px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-xl 
                     hover:bg-green-700 transition-colors duration-300 shadow-xl shadow-green-500/40 
                     transform hover:scale-[1.01] active:scale-95"
        >
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
