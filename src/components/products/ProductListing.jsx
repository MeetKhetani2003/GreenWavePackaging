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

  // Hover Logic (Simplified imports remain)
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !cardRef.current) return;
    // ... hover logic remains ...
    const cardElement = cardRef.current;

    const handleMouseEnter = () => {
      gsap.to(imageRef.current, {
        scale: 1.15,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(titleRef.current, {
        x: 5,
        duration: 0.3,
        ease: "power1.out",
        color: "#16a34a",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(titleRef.current, {
        x: 0,
        duration: 0.3,
        ease: "power1.out",
        color: "#111827",
      });
    };

    cardElement.addEventListener("mouseenter", handleMouseEnter);
    cardElement.addEventListener("mouseleave", handleMouseLeave);
    cardElement.addEventListener("touchstart", handleMouseEnter, {
      passive: true,
    });
    cardElement.addEventListener("touchend", handleMouseLeave, {
      passive: true,
    });

    return () => {
      if (cardElement) {
        gsap.killTweensOf(imageRef.current);
        gsap.killTweensOf(titleRef.current);
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
        cardElement.removeEventListener("touchstart", handleMouseEnter);
        cardElement.removeEventListener("touchend", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="product-list-item bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden 
               border border-gray-200/50 flex flex-col h-full transform hover:-translate-y-2 hover:shadow-green-500/30"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="relative w-full h-96 overflow-hidden bg-gray-50">
        <Image
          innerRef={imageRef}
          src={product.image || "/assets/placeholder-pkg.jpg"}
          alt={product.title}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-5">
          <div className="w-full text-white">
            <h3
              ref={titleRef}
              className="text-2xl font-extrabold mb-1 leading-tight drop-shadow-md"
              style={{ transform: "translateX(0px)", willChange: "transform" }}
            >
              {product.title}
            </h3>
            <div className="text-sm font-semibold text-green-400">
              {product.category}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 text-base mb-6 flex-grow">
          {product.description}
        </p>

        <a href={product.link} className="mt-auto">
          <button className="w-full px-4 py-3 bg-green-600 text-white font-bold text-base rounded-xl hover:bg-green-700 transition-colors duration-300 shadow-md shadow-green-500/30 transform hover:scale-[1.01] active:scale-95">
            View Technical Details
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
      className="py-20 md:py-32 bg-gray-100 overflow-hidden"
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
          <h2 className="text-gray-900 font-extrabold text-center text-4xl sm:text-5xl mb-2">
            Explore All <span className="text-green-600">15 Solutions</span>
          </h2>
          <p className="text-lg text-gray-600">
            A comprehensive look at our specialized films, resins, and packaging
            containers.
          </p>
          <span className="h-1.5 mt-4 w-32 bg-green-500 rounded-full py-0.2 mx-auto shadow-lg"></span>
        </div>

        {/* Product Grid: 3 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListings;
