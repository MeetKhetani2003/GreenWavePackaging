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
      // 1. Sync ScrollTrigger to Lenis's scroll event
      lenis.on("scroll", ScrollTrigger.update);

      // 2. Use GSAP's ticker to drive Lenis's RAF loop
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
        // REMOVED: Redundant setting of lenis.lerp = 0.1;
        // The value is already set in the <ReactLenis options> prop.
      });
      gsap.ticker.lagSmoothing(0);
    }

    // Cleanup function
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
        lerp: 0.06, // VALUE KEPT HERE: Lower value = smoother/slower scroll (e.g., 0.1 for very smooth)
        duration: 1.2, // Scroll animation duration
        smoothTouch: true, // Enable smooth scrolling on touch devices
        syncTouchLerp: true, // Sync touch lerp with main lerp
      }}
    >
      {children}
    </ReactLenis>
  );
}
