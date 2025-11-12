// components/CTABanner.jsx
"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTABanner = () => {
  const bannerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(
    () => {
      if (!bannerRef.current) return;

      const elements = [
        headlineRef.current,
        subheadlineRef.current,
        buttonRef.current,
      ];

      // Initial state: hidden and slightly offset
      gsap.set(elements, { opacity: 0, y: 30 });

      // Create a timeline for the entrance animation
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out", // Smooth, quick ease
        stagger: 0.15, // Staggered entrance for the elements
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 85%", // Animation starts when 85% of the banner is visible
          end: "bottom center",
          toggleActions: "play reverse play reverse", // Play on entry, reverse on exit
        },
      });
    },
    { scope: bannerRef, dependencies: [] }
  );

  return (
    <section
      ref={bannerRef}
      // Enhanced styling: Gradient background, generous padding, strong shadow
      className="relative bg-gradient-to-r from-green-700 to-green-900 py-12 
                 text-white text-center overflow-hidden shadow-2xl"
    >
      {/* Optional: Subtle background pattern for texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zm1 5v1H5z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          ref={headlineRef}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 tracking-tight leading-tight"
        >
          Ready to Elevate Your Packaging?
        </h2>
        <p
          ref={subheadlineRef}
          className="text-sm sm:text-md md:text-lg font-light mb-10 max-w-3xl mx-auto opacity-90"
        >
          Partner with Greenwave for innovative, sustainable, and
          high-performance solutions designed for your success.
        </p>
        <button
          ref={buttonRef}
          // Button styles: Vibrant, elevated, clear hover effect
          className="inline-flex items-center justify-center px-10 py-4 border border-transparent 
                     text-base font-semibold rounded-full shadow-lg bg-orange-400 hover:bg-orange-500 
                     text-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 
                     focus:outline-none focus:ring-4 focus:ring-orange-200 focus:ring-opacity-75"
        >
          Get in Touch Today
        </button>
      </div>
    </section>
  );
};

export default CTABanner;
