"use client";

import React, { useRef } from "react";
import ProductCard from "../layouts/ProductCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lenis } from "@studio-freight/react-lenis";
import Heading from "../layouts/Heading";
import { ALL_PRODUCTS_DATA } from "@/app/AllProducts"; // Assuming this is correct
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const OurProducts = () => {
  const sectionRef = useRef(null);

  // Define the maximum number of products to show on the homepage
  const MAX_PRODUCTS_DISPLAY = 6;
  const showViewAllButton = ALL_PRODUCTS_DATA.length > MAX_PRODUCTS_DISPLAY;

  // 1. Filter ALL_PRODUCTS_DATA to get only the first 6 items
  const productsToDisplay = ALL_PRODUCTS_DATA.slice(0, MAX_PRODUCTS_DISPLAY);

  // 2. Map the filtered data to the simplified product object structure
  const products = productsToDisplay.map((p) => ({
    image: p.image,
    title: p.title,
    description: p.description,
    link: p.link,
    category: p.category,
  }));

  // --- GSAP Row-by-Row Stagger Animation (unchanged) ---
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gsap.utils.toArray(
        ".product-card-item",
        sectionRef.current
      );

      // ... GSAP logic remains the same ...
      const cardsPerRow =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

      // 1. Initial State: Hide all cards
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.8 });

      cards.forEach((card, index) => {
        // Determine the row index (0, 1, 2, ...)
        const rowIndex = Math.floor(index / cardsPerRow);

        // Define a base start position (e.g., top 80%)
        let startPosition = "top 80%";

        // For subsequent rows, trigger starts slightly lower in the viewport
        if (rowIndex > 0) {
          startPosition = "center bottom";
        }

        gsap.fromTo(
          card,
          // FROM STATE
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
            transformPerspective: 500,
            z: 0.01,
            immediateRender: false,
          },
          // TO STATE
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3, // Quick animation for responsiveness
            ease: "power3.out",
            // Note: The stagger is removed here because we are triggering individual cards

            scrollTrigger: {
              trigger: card, // Each card is its own trigger
              // Start animation when the card's top hits 60% of the viewport height.
              start: "top 100%",
              end: "bottom center",
              toggleActions: "play reverse play reverse",
              // Optional: Remove scroller if this causes issues with Lenis
              // scroller: Lenis ? Lenis.rootElement : undefined, // Lenis might be undefined outside the Lenis component
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <Heading heading={"Our Products"} />
          <p className="text-lg text-gray-500 -mt-12">
            Explore our sustainable and high-performance packaging films.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Renders only the first 6 products */}
          {products.map((product, index) => (
            <div key={index} className="product-card-item">
              {/* Added class for GSAP targeting */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Conditional View All Button */}
        {showViewAllButton && (
          <div className="flex justify-center mt-12 w-fit items-center mx-auto">
            {/* Replace '/all-products' with the actual link to your full product page */}
            <Link
              href={"/product"}
              className="mt-auto w-full px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-xl 
                     hover:bg-green-700 transition-colors duration-300 shadow-xl shadow-green-500/40 
                     transform hover:scale-[1.01] active:scale-95"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default OurProducts;
