"use client";

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div
      className="product-card group relative bg-white rounded-2xl border border-gray-100 
      shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden 
      transition-all duration-500 hover:-translate-y-[6px] hover:shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />

        {/* category tag */}
        {product.category && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-white/90 rounded-full shadow-sm">
            {product.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {product.description}
        </p>

        <Link
          href={product.link}
          className="inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-700"
        >
          View Details
          <span className="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
