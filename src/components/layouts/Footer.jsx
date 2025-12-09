"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  // --- Footer Animation (No Change) ---
  useGSAP(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const columns = gsap.utils.toArray(".footer-column");
    const bottom = gsap.utils.toArray(".footer-bottom-element");

    gsap.set([columns, bottom], { opacity: 0, y: 30 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
      .to(columns, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.15,
      })
      .to(
        bottom,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.3"
      );
  });

  // Navigation
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/product" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  // Dynamic Product List (Optimized for Footer)
  const MAX_PRODUCT_LINKS = 6;
  const productsToDisplay = ALL_PRODUCTS_DATA.slice(0, MAX_PRODUCT_LINKS).map(
    (p) => ({
      title: p.title,
      path: p.link, // correct live route
    })
  );

  // Social Icons
  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      ref={footerRef}
      // Enhanced color scheme: Slightly darker background for better contrast and definition
      className="bg-gray-100 border-t border-t-2 border-green-700/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {" "}
        {/* Increased vertical padding */}
        {/* TOP CONTENT: 3-column layout (Brand, Links, Contact) */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-12 pb-10 border-b border-gray-300">
          {" "}
          {/* Changed to 4 columns on large screens for better link separation */}
          {/* 1. Brand/Mission Column (takes 1 or 2 columns based on screen size) */}
          <div className="footer-column md:col-span-2 lg:col-span-1 text-center md:text-left space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 max-w-xs mx-auto md:mx-0">
              Committed to a greener future with{" "}
              <strong>innovative and sustainable packaging solutions.</strong>{" "}
              We bridge material science with environmental responsibility.
            </p>
          </div>
          {/* 2. Quick Links Column */}
          <div className="footer-column col-span-1 text-center md:text-left">
            <h3 className="text-lg font-extrabold text-green-800 mb-5 border-b-2 border-green-400 inline-block pb-1">
              {" "}
              {/* Stronger heading style */}
              Quick Links
            </h3>
            <ul className="space-y-3">
              {" "}
              {/* Slightly increased spacing */}
              {navLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="text-gray-700 hover:text-green-600 font-medium transition duration-200 block" // Added block for better click area
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* 3. Products Column */}
          <div className="footer-column col-span-1 text-center md:text-left">
            <h3 className="text-lg font-extrabold text-green-800 mb-5 border-b-2 border-green-400 inline-block pb-1">
              Popular Products
            </h3>
            <ul className="space-y-3">
              {productsToDisplay.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="text-gray-700 hover:text-green-600 transition duration-200 block text-sm" // Smaller text for product list
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {/* Added View All Products Link */}
              {ALL_PRODUCTS_DATA.length > MAX_PRODUCT_LINKS && (
                <li>
                  <Link
                    href="/product" // Assuming /product is the 'View All' page
                    className="text-blue-600 hover:text-blue-800 font-bold mt-2 inline-block text-sm"
                  >
                    View All ({ALL_PRODUCTS_DATA.length}) &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* 4. Contact & Social Column */}
          <div className="footer-column col-span-1 text-center md:text-left space-y-4">
            <h3 className="text-lg font-extrabold text-green-800 mb-5 border-b-2 border-green-400 inline-block pb-1">
              Reach Out
            </h3>
            <address className="text-gray-600 text-base not-italic space-y-1">
              <p>
                Email: <strong>sales@greenwavepackaging.ca</strong>
              </p>
              <p>
                Phone: <strong>+1 (437) 556-8899</strong>
              </p>
              {/* Optional: Add location/address if relevant */}
              <p className="pt-2">Toronto, Ontario, Canada</p>
            </address>

            <div className="flex justify-center md:justify-start gap-5 text-3xl text-green-700 pt-2">
              {" "}
              {/* Larger icons and gap */}
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-green-500 transition transform hover:scale-110" // Added scale effect
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* BOTTOM SECTION: Copyright and Legal Links */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="footer-bottom-element order-2 md:order-1 pt-3 md:pt-0">
            © 2005 <strong>Greenwave Packaging</strong>. All rights reserved.
          </p>

          <div className="footer-bottom-element order-1 md:order-2 flex space-x-4">
            <Link
              href="/about"
              className="hover:text-green-600 font-medium transition"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/about"
              className="hover:text-green-600 font-medium transition"
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
