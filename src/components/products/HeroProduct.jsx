// components/HeroProduct.jsx
"use client";

import React, { useRef } from "react";
import { FaLeaf, FaChevronRight } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// NOTE: Image component is assumed to be available or handled via the single-file context setup.
const Image = ({ src, alt, fill, className, style, innerRef }) => (
  <img
    src={src}
    alt={alt}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      ...style,
    }}
    className={className}
    ref={innerRef} // Ref attached here for GSAP targeting
  />
);

// Helper function to create the clean text reveal animation (clipPath)
const useSplitTextReveal = (ref, delay = 0) => {
  React.useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        y: 10,
        opacity: 0,
        clipPath: "inset(100% 0 0 0)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        duration: 0.8,
        ease: "power3.out",
        delay: delay,
      }
    );
  }, [ref, delay]);
};

const HeroProduct = ({
  title = "Our Product Catalog",
  subtitle = "High-performance films, resins, and flexible containers designed for modern industrial and consumer use.",
  // FIX: Updated button text
  buttonText = "Explore Products",
  // FIX: Updated button link
  buttonLink = "#products",
  backgroundImage = "/assets/packageBg.jpg",
}) => {
  const heroRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const bgImageRef = useRef(null); // Ref for the background image

  // Apply custom reveal animation timing
  useSplitTextReveal(breadcrumbRef, 0.1);
  useSplitTextReveal(titleRef, 0.4);
  useSplitTextReveal(subtitleRef, 0.6);

  // GSAP for button entrance and Background Parallax
  React.useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !heroRef.current) return;

    // --- Button Entrance ---
    gsap.from(buttonRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.7,
      ease: "power2.out",
      delay: 1.0,
    });

    // --- Background Parallax Effect ---
    if (bgImageRef.current) {
      gsap.to(bgImageRef.current, {
        y: (i, target) => window.innerHeight * 0.15, // Move 15% of the viewport height upwards
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", // Start tracking when hero hits the top
          end: "bottom top", // End tracking when hero leaves the top
          scrub: true, // Tie movement directly to scroll
        },
      });
    }
  }, []);

  return (
    <div
      ref={heroRef}
      // Deep Forest Green background
      className="relative bg-green-900 text-white flex items-center py-16 md:py-20 lg:py-24 overflow-hidden border-b border-green-700"
    >
      {/* Background Image with Filter/Overlay */}
      <div className="absolute inset-0 z-0 h-[130%] -top-[15%]">
        <Image
          src={backgroundImage}
          alt="Packaging products background"
          fill={true}
          className="object-cover object-center"
          style={{ willChange: "transform" }}
          innerRef={bgImageRef} // Attach ref here
        />
        {/* Deep Green/Black Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xs"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-4 text-center lg:text-left">
          {/* Breadcrumb Navigation */}
          <nav
            ref={breadcrumbRef}
            className="text-sm tracking-wide flex items-center justify-center lg:justify-start space-x-2 text-gray-400 mb-4"
            aria-label="Breadcrumb"
            style={{ overflow: "hidden" }}
          >
            <Link href="/" className="hover:text-green-300 transition-colors">
              Home
            </Link>
            <FaChevronRight className="w-3 h-3 text-green-400" />
            <span className="font-semibold text-green-300">Products</span>
          </nav>

          {/* Subtle Leaf Icon for branding */}
          <div className="flex items-center justify-center lg:justify-start space-x-2 text-green-300 mb-2">
            <FaLeaf className="w-6 h-6" />
            <span className="text-sm uppercase tracking-widest font-semibold text-gray-300">
              Greenwave
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight leading-snug drop-shadow-md"
            style={{
              overflow: "hidden",
              textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {title}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl font-light text-gray-200 max-w-4xl mx-auto lg:mx-0 pt-2"
            style={{ overflow: "hidden" }}
          >
            {subtitle}
          </p>

          <div ref={buttonRef} className="pt-6">
            <Link href={buttonLink}>
              <button
                className="px-8 py-3 border-2 border-yellow-500 text-base font-semibold rounded-full 
                           shadow-md bg-yellow-500 text-gray-900 hover:bg-yellow-400 
                           transition-all duration-300 transform hover:scale-[1.03] 
                           focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50"
              >
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Abstract background light effect remains subtle */}
      {/* <div className="absolute top-0 right-0 w-1/4 h-full bg-green-500/10 filter blur-3xl pointer-events-none"></div> */}
    </div>
  );
};

export default HeroProduct;
