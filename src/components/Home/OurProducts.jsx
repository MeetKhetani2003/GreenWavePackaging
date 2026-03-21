"use client";

import React, { useRef } from "react";
import ProductCard from "../layouts/ProductCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../layouts/Heading";
import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const OurProducts = () => {
  const sectionRef = useRef(null);

  const MAX_PRODUCTS_DISPLAY = 6;
  const products = ALL_PRODUCTS_DATA.slice(0, MAX_PRODUCTS_DISPLAY);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".product-card");

      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-[#f7faf8] to-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <Heading heading="Our Products" />

          <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our advanced packaging materials engineered for modern
            global supply chains.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-20">
          <Link
            href="/product"
            className="group inline-flex items-center px-7 py-3.5 text-sm font-medium text-white bg-green-600 rounded-lg transition-all duration-300 hover:bg-green-700 hover:-translate-y-[2px]"
          >
            View All Products
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
