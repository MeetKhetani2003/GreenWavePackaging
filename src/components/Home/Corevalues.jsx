// components/CoreValues.jsx
"use client";
import React, { useRef } from "react";
import { FaLightbulb, FaLeaf, FaHandshake, FaAward } from "react-icons/fa"; // Icons for visual appeal
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../layouts/Heading";

gsap.registerPlugin(ScrollTrigger);

const CoreValues = () => {
  const sectionRef = useRef(null);

  const values = [
    {
      title: "Innovation",
      description:
        "We continuously invest in research and development to bring cutting-edge packaging solutions to our clients.",
      icon: FaLightbulb,
      color: "text-blue-500",
    },
    {
      title: "Sustainability",
      description:
        "Environmental responsibility is at the core of our operations, driving us to develop eco-friendly packaging alternatives.",
      icon: FaLeaf,
      color: "text-green-600",
    },
    {
      title: "Customer Satisfaction",
      description:
        "We build lasting relationships by understanding our clients' needs and delivering exceptional value.",
      icon: FaHandshake,
      color: "text-yellow-600",
    },
    {
      title: "Quality",
      description:
        "We maintain the highest standards in all our products and processes to ensure consistent performance.",
      icon: FaAward,
      color: "text-red-500",
    },
  ];

  // --- GSAP Liquid Stagger Animation for the value cards ---
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Select all individual value cards
      const cards = gsap.utils.toArray(".value-card-item", sectionRef.current);

      // 1. Initial State: Hide all cards (Liquid Style: slight scale, y displacement)
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });

      // 2. Animate cards with a stagger effect
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out", // Smooth, liquid easing
        stagger: 0.1, // Staggered delay for the wave effect
        scrollTrigger: {
          trigger: sectionRef.current,
          // FIX 1: Animation should start when the section enters from the bottom
          start: "top bottom",
          // FIX 2 (The Solution): The animation reverses ONLY when the bottom of the section hits the top (0%) of the viewport.
          end: "bottom top",
          // FIX 3: Changed toggleActions to control reversal based on the end point.
          // play (on enter) - reverse (on exit) - play (on re-enter) - reverse (on scroll past start)
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <Heading heading={"Our Core Values"} />
          <p className="text-lg text-gray-600 max-w-2xl text-center -mt-12">
            These principles guide every decision we make, ensuring we deliver
            value and responsibility in every product.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card-item p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-[1.03] border-t-4 border-green-600/50"
            >
              <div className={`text-4xl mb-4 ${value.color}`}>
                <value.icon />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-base">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
