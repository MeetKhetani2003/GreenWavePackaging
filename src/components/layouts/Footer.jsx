// Footer.jsx
"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: footerRef });

  // --- GSAP Animation Logic: Staggered Entrance for all elements ---
  useGSAP(
    () => {
      const footerContainer = footerRef.current;
      if (!footerContainer) return;

      // Select all primary content blocks
      const columns = gsap.utils.toArray(".footer-column");

      // Select all links and text blocks within the copyright area
      const bottomElements = gsap.utils.toArray(".footer-bottom-element");

      // 1. Initial State: Hide all elements
      gsap.set([columns, bottomElements], { opacity: 0, y: 30 });

      // 2. Create the scroll-triggered reveal animation for the whole footer
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerContainer,
          start: "top 90%",
          // Play when entering, reverse when leaving
          toggleActions: "play reverse play reverse",
        },
      });

      // 3. Animation Sequence:
      tl.to(footerContainer, { opacity: 1, duration: 0.01 }) // Ensure container is visible

        // Animate the three main columns with a small stagger
        .to(
          columns,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.15, // Staggered delay between the three columns
          },
          0
        ) // Start immediately (at time 0 of the timeline)

        // Animate the copyright elements after the columns finish
        .to(
          bottomElements,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          },
          ">-0.5"
        ); // Start 0.5 seconds before the previous animation ends
    },
    { scope: footerRef, dependencies: [] }
  );

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const products = [
    { title: "LD Films", path: "/products/ld-films" },
    { title: "PET Films", path: "/products/pet-films" },
    { title: "BOPP Film", path: "/products/bopp-film" },
    { title: "PVC Film", path: "/products/pvc-film" },
    { title: "HDPE Film", path: "/products/hdpe-film" },
    { title: "FIBC Bags", path: "/products/fibc-bags" },
    { title: "Plastic Resins", path: "/products/plastic-resins" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      className="bg-gray-50 border-t border-t-[0.01px] border-green-700/50"
      ref={footerRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section: Logo and Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-8 border-b border-gray-200">
          {/* 1. Brand Identity (Column 1) - Added class: footer-column */}
          <div className="footer-column col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 max-w-xs">
              Committed to a greener future with innovative and sustainable
              packaging solutions.
            </p>
          </div>

          {/* 2. Quick Links and Products (Column 2) - Added class: footer-column */}
          <div className="footer-column col-span-1 flex gap-16 justify-start">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((item, idx) => (
                  // Link items are animated implicitly as part of the column animation
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition-colors text-base"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products List */}
            <div>
              <h3 className="text-lg font-bold text-green-700 mb-4">
                Products
              </h3>
              <ul className="space-y-3">
                {products.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition-colors text-base"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Contact and Social Media (Column 3) - Added class: footer-column */}
          <div className="footer-column col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-green-700 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 text-base">
              Email: info@greenwave.com
              <br />
              Phone: (555) 123-4567
            </p>

            {/* Social Icons are the main animated block here */}
            <div className="flex space-x-4 text-2xl text-green-700 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-green-500 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="footer-bottom-element">
            &copy; {new Date().getFullYear()} Greenwave Packaging. All rights
            reserved.
          </p>
          <div className="pt-2 md:pt-0 flex space-x-4 footer-bottom-element">
            <Link
              href="/privacy"
              className="hover:text-green-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/terms"
              className="hover:text-green-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
