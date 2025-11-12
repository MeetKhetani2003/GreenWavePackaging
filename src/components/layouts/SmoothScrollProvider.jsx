// components/SmoothScrollProvider.jsx
"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

// Register ScrollTrigger globally once Lenis is running
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Integrate GSAP ScrollTrigger with Lenis
    const lenis = document.querySelector(".lenis-scroll-container")?.lenis;
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      // Ticker for GSAP updates (optional, but good practice)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      gsap.ticker.remove();
      if (lenis) lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <ReactLenis
      root
      className="lenis-scroll-container" // Add a class for easy selection
      options={{
        lerp: 0.1, // Lower value = smoother/slower scroll
        duration: 1.2, // Scroll animation duration
        smoothTouch: true, // Enable smooth scrolling on touch devices
      }}
    >
      {children}
    </ReactLenis>
  );
}
