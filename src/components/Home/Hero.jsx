"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Ensure video keeps playing
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.play().catch(() => {});

      const handleEnded = () => {
        videoElement.currentTime = 0;
        videoElement.play().catch(() => {});
      };

      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      });

      tl.from(".hero-badge", { y: 20, opacity: 0 })
        .from(".hero-title", { y: 50, opacity: 0 }, "-=0.4")
        .from(".hero-subtitle", { y: 30, opacity: 0 }, "-=0.5")
        .from(".hero-buttons", { y: 20, opacity: 0 }, "-=0.5")
        .from(".hero-trust", { opacity: 0 }, "-=0.4");
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative h-[100vh] w-full overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Elegant Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-white">
          {/* Badge */}
          <div className="hero-badge text-sm uppercase tracking-[0.2em] text-green-400 font-medium mb-6">
            Sustainable Packaging Manufacturer
          </div>

          {/* Title */}
          <h1 className="hero-title text-4xl md:text-6xl font-semibold leading-[1.15] tracking-tight">
            High-Performance
            <span className="block text-green-400">Packaging Solutions</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle mt-6 text-lg md:text-xl font-normal text-gray-200 leading-relaxed">
            We manufacture premium LD films and supply advanced packaging
            materials engineered for global industries and modern supply chains.
          </p>

          {/* Buttons */}
          <div className="hero-buttons mt-10 flex flex-wrap gap-5">
            <Link
              href="/product"
              className="group relative inline-flex items-center justify-center px-7 py-3.5 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:-translate-y-[2px]"
            >
              Explore Products
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-lg border border-white/40 text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-[2px]"
            >
              Request Quote
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="hero-trust mt-12 flex flex-wrap gap-8 text-sm text-gray-300">
            <div>ISO Certified</div>
            <div>Global Supply Chain</div>
            <div>Eco-Friendly Materials</div>
            <div>Industrial Manufacturing</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
