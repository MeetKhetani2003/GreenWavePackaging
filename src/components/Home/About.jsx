// components/About.jsx
"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../layouts/Heading";
import SubHeading from "../layouts/SubHeading";
import Paragraph from "../layouts/Paragraph";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  // --- GSAP Scroll-Triggered Animation Logic ---
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Select elements for the staggered reveal
      const heading = sectionRef.current.querySelector(".about-heading");
      const underline = sectionRef.current.querySelector(".about-underline");
      const imageElement = sectionRef.current.querySelector(".about-image");
      const textBlock = sectionRef.current.querySelector(".about-text-block");

      // Set initial hidden state (opacity and slight slide up)
      gsap.set([heading, underline, imageElement, textBlock], {
        opacity: 0,
        y: 50,
      });

      // Create a coordinated timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Start animation when 85% of the section is visible
          // Play when entering, reverse when leaving for the "repetitive" feel
          toggleActions: "play reverse play reverse",
        },
      });

      // Sequence the animations for a smooth entrance
      tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(
          underline,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "<0.2"
        ) // Start 0.2s after heading
        .to(
          imageElement,
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          "<0.4"
        ) // Start 0.4s after underline
        .to(
          textBlock,
          { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
          "<0"
        ); // Start simultaneously with the image
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Heading heading={"About Greenwave Packaging"} />

        {/* Content Layout: Dual Column on Desktop, Stacked on Mobile */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Left Column: Text Content (Animated Block) */}
          <div className="about-text-block space-y-6 md:w-1/2">
            <SubHeading title=" Your Trusted Sustainable Packaging Partner" />
            <Paragraph
              text="Greenwave Packaging Ltd. is a leading manufacturer of high-quality
              LD films and a trusted importer of premium packaging solutions.
              With a strong commitment to innovation, sustainability, and
              customer satisfaction, we provide a diverse range of products
              tailored to meet the evolving needs of industries worldwide."
            />
            <Paragraph
              text="Our expertise spans across various packaging materials and
              solutions, ensuring that we can meet the specific requirements of
              each client while maintaining the highest quality standards."
            />
            <Paragraph
              text="At Greenwave, we believe that sustainable packaging is not just an
              option but a responsibility. We continuously work towards
              developing eco-friendly solutions that reduce environmental impact
              without compromising on performance."
            />

            <button className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-lg font-semibold text-white rounded-lg shadow-xl transform hover:scale-[1.02] active:scale-95">
              Contact Us Today
            </button>
          </div>

          {/* Right Column: Image (Animated Block) */}
          <div className="about-image w-full md:w-1/2 relative rounded-xl overflow-hidden shadow-2xl transform hover:shadow-green-300/50 transition-shadow duration-500">
            <Image
              width={600}
              height={400}
              src="/aboutPkgHome.jpg"
              alt="Image of various green and sustainable packaging materials"
              layout="responsive"
              objectFit="cover"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
