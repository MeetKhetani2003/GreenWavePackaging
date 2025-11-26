"use client";

import React, { useRef } from "react";
import ProductCard from "../layouts/ProductCard";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lenis } from "@studio-freight/react-lenis";
import Heading from "../layouts/Heading";
import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";

gsap.registerPlugin(ScrollTrigger);

const OurProducts = () => {
  const sectionRef = useRef(null);

  // --- GSAP Row-by-Row Stagger Animation ---
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gsap.utils.toArray(
        ".product-card-item",
        sectionRef.current
      );

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
              scroller: Lenis ? Lenis.rootElement : undefined,
            },
          }
        );
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Note: The original products data and return statement remain the same...

  const products = ALL_PRODUCTS_DATA.map((p) => ({
    image: p.image,
    title: p.title,
    description: p.description,
    link: p.link,
    category: p.category,
  }));
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
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
