"use client";

import React, { useRef, useEffect } from "react";

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

  useEffect(() => {
    let gsap;
    let enterTween;
    let leaveTween;

    // Only attach hover handlers if running in browser
    if (typeof window === "undefined") return;

    // create handlers that use gsap if/when it becomes available
    const handleMouseEnter = () => {
      if (!gsap) return;
      // kill previous tweens (avoid stacking)
      gsap.killTweensOf(imageRef.current);
      gsap.killTweensOf(titleRef.current);

      enterTween = gsap.timeline();
      enterTween.to(imageRef.current, {
        scale: 1.15,
        duration: 0.5,
        ease: "power2.out",
      });
      enterTween.to(
        titleRef.current,
        { x: 5, duration: 0.3, ease: "power1.out", color: "#16a34a" },
        0
      );
    };

    const handleMouseLeave = () => {
      if (!gsap) return;
      gsap.killTweensOf(imageRef.current);
      gsap.killTweensOf(titleRef.current);
      leaveTween = gsap.timeline();
      leaveTween.to(imageRef.current, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
      leaveTween.to(
        titleRef.current,
        { x: 0, duration: 0.3, ease: "power1.out", color: "#111827" },
        0
      );
    };

    // lazy import gsap for hover (if not already)
    (async () => {
      try {
        const gsapMod = await import("gsap");
        gsap = gsapMod.gsap || gsapMod.default || gsapMod;
        // We do not need ScrollTrigger here; only simple hover tweens
        // Ensure initial scale is correct
        if (imageRef.current) {
          gsap.set(imageRef.current, { scale: 1.05 });
          // set will-change for smoother animation
          imageRef.current.style.willChange = "transform";
        }
      } catch (e) {
        // swallow import error — hover just won't animate
        // console.error("GSAP import failed (hover):", e);
      }
    })();

    const el = cardRef.current;
    if (el) {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
      // Also support touch: use touchstart/touchend to simulate hover
      el.addEventListener("touchstart", handleMouseEnter, { passive: true });
      el.addEventListener("touchend", handleMouseLeave, { passive: true });
    }

    return () => {
      if (el) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.removeEventListener("touchstart", handleMouseEnter);
        el.removeEventListener("touchend", handleMouseLeave);
      }
      if (gsap) {
        gsap.killTweensOf(imageRef.current);
        gsap.killTweensOf(titleRef.current);
      }
      if (enterTween) enterTween.kill && enterTween.kill();
      if (leaveTween) leaveTween.kill && leaveTween.kill();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="product-list-item bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200/50 flex flex-col h-full transform hover:-translate-y-2 hover:shadow-green-500/30"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="relative w-full h-96 overflow-hidden bg-gray-50">
        <Image
          ref={imageRef}
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

  const products = [
    {
      title: "LD Films Pro",
      description:
        "Ultra-durable film rolls for heavy-duty construction and agricultural use.",
      category: "Films",
      image: "/assets/products/LDFilms.webp",
      link: "/product/ld-films-pro",
    },
    {
      title: "PET Film Eco",
      description:
        "100% PCR content film with excellent clarity for food packaging.",
      category: "Films",
      image: "/assets/products/PetFilms.webp",
      link: "/product/pet-film-eco",
    },
    {
      title: "BOPP Film Clear",
      description:
        "Superior printability and moisture barrier for high-end retail packaging.",
      category: "Films",
      // PATH FIX: No spaces
      image: "/assets/products/BOPPFilm.jpeg",
      link: "/product/bopp-film-clear",
    },
    {
      title: "PVC Shrink Wrap",
      description:
        "High-shrink ratio film ideal for bundling and tamper-evident seals.",
      category: "Films",
      // PATH FIX: No spaces
      image: "/assets/products/PVCFilm.jpeg",
      link: "/product/pvc-shrink-wrap",
    },
    {
      title: "HDPE Bags V3",
      description:
        "Tear-resistant high-density bags for industrial waste and storage.",
      category: "Containers",
      // PATH FIX: No spaces
      image: "/assets/products/HDPEFilm.webp",
      link: "/product/hdpe-bags-v3",
    },
    {
      title: "FIBC Bulk Bags",
      description:
        "Woven polypropylene containers for transporting dry bulk goods safely.",
      category: "Containers",
      // PATH FIX: No spaces
      image: "/assets/products/FIBCBags.jpg",
      link: "/product/fibc-bulk-bags",
    },
    {
      title: "Plastic Resin PP",
      description:
        "High-melt-flow polypropylene resin for injection molding applications.",
      category: "Resins",
      image: "/assets/products/ResinPP.webp",
      link: "/product/plastic-resin-pp",
    },
    {
      title: "LLDPE Stretch Film",
      description:
        "Linear low-density polyethylene film for pallet wrapping and stabilization.",
      category: "Films",
      image: "/assets/products/StretchFilm.jpg",
      link: "/product/lldpe-stretch-film",
    },
    {
      title: "Biodegradable Pouches",
      description:
        "Compostable laminated pouches for snack foods and organic goods.",
      category: "Containers",
      image: "/assets/products/Pouches.jpg",
      link: "/product/biodegradable-pouches",
    },
    {
      title: "PET Resin Food Grade",
      description:
        "Virgin PET resin suitable for beverage bottles and food contact materials.",
      category: "Resins",
      image: "/assets/products/PETResin.jpg",
      link: "/product/pet-resin-food-grade",
    },
    {
      title: "Metallized BOPP",
      description:
        "Film with an aluminum layer for enhanced light and oxygen barrier.",
      category: "Films",
      image: "/assets/products/MetalizedBOPP.jpg",
      link: "/product/metallized-bopp",
    },
    {
      title: "Ventilated FIBC",
      description:
        "Bags designed to allow airflow, perfect for storing potatoes or logs.",
      category: "Containers",
      image: "/assets/products/VentilatedFIBC.JPG",
      link: "/product/ventilated-fibc",
    },
    {
      title: "HDPE Geomembrane",
      description:
        "Thick, impermeable liner for civil engineering and environmental containment.",
      category: "Films",
      image: "/assets/products/Geomembrane.jpg",
      link: "/product/hdpe-geomembrane",
    },
    {
      title: "LDPE Tubing Rolls",
      description:
        "Continuous tubing film used for making custom-length plastic bags.",
      category: "Films",
      image: "/assets/products/TubingRolls.jpg",
      link: "/product/ldpe-tubing-rolls",
    },
    {
      title: "Recycled ABS Resin",
      description:
        "Sustainable acrylonitrile butadiene styrene resin for durable consumer goods.",
      category: "Resins",
      image: "/assets/products/ABSResin.jpg",
      link: "/product/recycled-abs-resin",
    },
  ];

  /* GSAP + ScrollTrigger effect (one effect, robust) */
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
      // cleanup ScrollTriggers if they were created
      try {
        createdTriggers.forEach((t) => t && t.kill && t.kill());
        if (
          typeof window !== "undefined" &&
          window.ScrollTrigger &&
          window.gsap
        ) {
          // extra cleanup: kill ScrollTrigger instances
          // (not strictly necessary but safe)
          window.ScrollTrigger &&
            window.ScrollTrigger.getAll &&
            window.ScrollTrigger.getAll().forEach((t) => t.kill && t.kill());
        }
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, []); // run once on mount

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductListings;
