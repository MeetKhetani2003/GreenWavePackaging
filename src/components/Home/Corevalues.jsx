"use client";

import React, { useRef } from "react";
import { FaLightbulb, FaLeaf, FaHandshake, FaAward } from "react-icons/fa";
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
        "We build long-term partnerships by understanding client needs and delivering consistent value.",
      icon: FaHandshake,
      color: "text-yellow-500",
    },
    {
      title: "Quality",
      description:
        "We maintain strict standards across all products and processes to ensure reliable performance.",
      icon: FaAward,
      color: "text-red-500",
    },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = gsap.utils.toArray(".value-card-item");

      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-gradient-to-b from-white to-[#f7faf8]"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Heading heading="Our Core Values" />

          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            The principles that guide every decision we make and define how we
            serve our partners worldwide.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="value-card-item bg-white border border-gray-100 rounded-xl p-7
              shadow-[0_6px_20px_rgba(0,0,0,0.05)]
              transition-all duration-300
              hover:-translate-y-[4px]
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              {/* Icon */}
              <div className={`text-3xl mb-4 ${value.color}`}>
                <value.icon />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
