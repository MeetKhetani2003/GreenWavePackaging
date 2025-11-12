// components/Hero.jsx
"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const heroRef = useRef();
  const videoRef = useRef(); // Ref for the video element

  // --- 1. Robust Loop Enforcement ---
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // (A) Force play on mount to ensure it starts
      videoElement.play().catch((error) => {
        // This catch handles instances where a browser might prevent immediate autoplay
        console.log("Initial autoplay attempt failed (Browser policy):", error);
      });

      // (B) Event listener to restart playback immediately if it ends
      const handleEnded = () => {
        // Reset to start and replay
        videoElement.currentTime = 0;
        videoElement.play().catch((error) => {
          console.log("Autoplay restart failed:", error);
        });
      };

      videoElement.addEventListener("ended", handleEnded);

      // Clean up the event listener
      return () => {
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, []); // Run only once on mount

  // --- GSAP Text Animation Logic (Kept as-is) ---
  useGSAP(
    () => {
      const title = heroRef.current.querySelector(".hero-title");
      const subtitle = heroRef.current.querySelector(".hero-subtitle");
      const button = heroRef.current.querySelector(".hero-button");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.2 },
      });

      tl.from(title, { y: 50, opacity: 0, delay: 0.2 })
        .from(subtitle, { y: 30, opacity: 0, duration: 1 }, "-=0.8")
        .from(button, { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.6");
    },
    { scope: heroRef, dependencies: [] }
  );

  return (
    <section
      ref={heroRef}
      className="relative h-[75vh] w-full overflow-hidden"
      aria-label="Background video showcasing sustainable materials"
    >
      {/* Background Video (Ensure attributes are correct) */}
      <video
        ref={videoRef} // Attached ref for JavaScript control
        className="absolute inset-0 w-full h-full object-cover"
        src="/bg.mp4"
        autoPlay
        loop // Keep HTML loop as backup
        muted
        playsInline // Required for iOS/mobile autoplay
        poster="https://placehold.co/1920x1080/004d40/ffffff?text=Video+Loading..."
      ></video>

      {/* Dark Overlay for Contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="hero-title text-4xl sm:text-6xl font-semibold tracking-tight drop-shadow-lg">
            Premium Packaging Solutions
          </h1>

          <p className="hero-subtitle text-md sm:text-xl font-semibold  drop-shadow-md">
            Leading manufacturer of high-quality LD films and trusted importer
            of premium packaging materials for industries worldwide.
          </p>
          <div className="space-x-3">
            <button className="hero-button mt-8 px-10 py-4 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-lg font-semibold rounded-md shadow-2xl transform hover:scale-105 active:scale-95">
              Explore Products
            </button>
            <button className="hero-button mt-8 px-10 py-4 bg-orange-500 hover:bg-orange-700 transition-colors duration-300 text-lg font-semibold rounded-md shadow-2xl transform hover:scale-105 active:scale-95">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
