"use client";
import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";
import React, { useRef, useEffect } from "react";
const getProductListingData = () =>
  ALL_PRODUCTS_DATA.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    image: p.image,
    link: p.link,
  }));

/**
 * NOTE:
 * - We dynamically import GSAP inside useEffect so this runs only in the browser.
 * - We use plain <img> elements with refs (no Next/Image) to keep this single-file safe.
 * - The scroll animations trigger per-card and the hover tweens are debounced and cleaned up.
 */

/* Simple Image component that forwards a ref (so GSAP gets the DOM node) */
const Image = React.forwardRef(({ src, alt, style, className }, ref) => (
  <img
    src={src}
    alt={alt}
    ref={ref}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "scale(1.05)",
      willChange: "transform",
      ...style,
    }}
    className={className}
  />
));
Image.displayName = "Image";

/* Product Card */
const ProductCard = ({ product }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="product-list-item group bg-white rounded-2xl border border-gray-100
      shadow-[0_8px_30px_rgba(0,0,0,0.05)]
      overflow-hidden transition-all duration-300
      hover:-translate-y-[6px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          ref={imageRef}
          src={product.image || "/assets/placeholder-pkg.jpg"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
          <div className="text-white">
            <span className="text-xs uppercase tracking-wider text-green-300">
              {product.category}
            </span>

            <h3 ref={titleRef} className="text-xl font-semibold leading-snug">
              {product.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col">
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {product.description}
        </p>

        <a href={product.link}>
          <button
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium
            bg-green-600 text-white rounded-lg
            transition-all duration-300 hover:bg-green-700"
          >
            View Details →
          </button>
        </a>
      </div>
    </div>
  );
};

const ProductListings = () => {
  const sectionRef = useRef(null);
  const products = getProductListingData(); // Use accessor function

  // --- GSAP Liquid Stagger Animation (Row-by-Row) ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current) return;

    let gsap, ScrollTrigger;
    let createdTriggers = [];

    (async () => {
      try {
        const gsapMod = await import("gsap");
        gsap = gsapMod.gsap || gsapMod.default || gsapMod;
        const stMod = await import("gsap/ScrollTrigger");
        ScrollTrigger = stMod.ScrollTrigger || stMod.default || stMod;
        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }
      } catch (e) {
        // importing failed — exit gracefully
        // console.error("GSAP import failed (scroll):", e);
        return;
      }

      // select cards inside the section
      const cardNodeList =
        sectionRef.current.querySelectorAll(".product-list-item");
      const cards = Array.from(cardNodeList);

      if (!cards.length) return;

      // initial state
      gsap.set(cards, {
        opacity: 0,
        y: 60,
        scale: 0.98,
        transformOrigin: "center center",
      });

      // simple per-card ScrollTrigger animation
      cards.forEach((card) => {
        const tl = gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          paused: true,
        });

        const trigger = ScrollTrigger.create({
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => tl.play(),
          onEnterBack: () => tl.play(),
          onLeave: () => tl.reverse(),
          onLeaveBack: () => tl.reverse(),
        });

        createdTriggers.push(trigger);
      });
    })();

    return () => {
      try {
        createdTriggers.forEach((t) => t && t.kill && t.kill());
        if (
          typeof window !== "undefined" &&
          window.ScrollTrigger &&
          window.gsap
        ) {
          window.ScrollTrigger &&
            window.ScrollTrigger.getAll &&
            window.ScrollTrigger.getAll().forEach((t) => t.kill && t.kill());
        }
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-gradient-to-b from-[#f7faf8] to-white overflow-hidden"
      style={{
        backgroundColor: "#f3f4f6",
        backgroundImage:
          "radial-gradient(ellipse at center, #ffffff 0%, #f3f4f6 100%)",
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 50%",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-gray-900 font-semibold text-center text-4xl md:text-5xl tracking-tight">
            Explore All <span className="text-green-600"> Solutions</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl text-center leading-relaxed">
            A comprehensive look at our specialized films, resins, and packaging
            containers.
          </p>
          <span className="h-1.5 mt-4 w-32 bg-green-500 rounded-full py-0.2 mx-auto shadow-lg"></span>
        </div>

        {/* Product Grid: 3 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListings;
