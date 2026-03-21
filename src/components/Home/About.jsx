"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "../layouts/Heading";
import SubHeading from "../layouts/SubHeading";
import Paragraph from "../layouts/Paragraph";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const heading = sectionRef.current.querySelector(".about-heading");
      const image = sectionRef.current.querySelector(".about-image");
      const textBlock = sectionRef.current.querySelector(".about-text");

      gsap.set([heading, image, textBlock], { opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(heading, { opacity: 1, y: 0, duration: 0.7 })
        .to(image, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(textBlock, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6");
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-gradient-to-b from-white to-[#f7faf8]"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="about-heading mb-16">
          <Heading heading="About Greenwave Packaging" />
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="about-image relative rounded-2xl overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.08)]">
            <Image
              src="/aboutPkgHome.jpg"
              alt="Sustainable packaging materials"
              width={700}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </div>

          {/* Text */}
          <div className="about-text space-y-6">
            <SubHeading title="Your Trusted Sustainable Packaging Partner" />

            <Paragraph text="Greenwave Packaging Ltd. is a leading manufacturer of high-quality LD films and a trusted importer of premium packaging solutions. We focus on innovation, sustainability, and long-term partnerships with industries worldwide." />

            <Paragraph text="Our expertise spans across advanced packaging materials and custom solutions designed to meet the unique needs of modern supply chains." />

            <Paragraph text="We believe sustainable packaging is not just a trend but a responsibility. Our mission is to deliver eco-friendly solutions that reduce environmental impact without compromising performance." />

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-7 py-3.5 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg hover:-translate-y-[2px]"
              >
                Contact Us Today
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
