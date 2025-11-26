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

  // --- Footer Animation ---
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
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  // Dynamic Product List
  const products = ALL_PRODUCTS_DATA.map((p) => ({
    title: p.title,
    path: p.link, // correct live route
  }));

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
      className="bg-gray-50 border-t border-t-[0.01px] border-green-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TOP CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-8 border-b border-gray-200">
          {/* Brand */}
          <div className="footer-column col-span-1 text-center md:text-left space-y-4">
            <Logo />
            <p className="text-sm text-gray-600 max-w-xs">
              Committed to a greener future with innovative and sustainable
              packaging solutions.
            </p>
          </div>

          {/* Links */}
          <div className="footer-column col-span-1 flex justify-center md:justify-start gap-12">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-green-700 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navLinks.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-green-700 mb-4">
                Products
              </h3>
              <ul className="space-y-2">
                {products.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-gray-600 hover:text-green-600 transition"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="footer-column col-span-1 text-center md:text-left space-y-4">
            <h3 className="text-lg font-bold text-green-700">Get in Touch</h3>
            <p className="text-gray-600 text-base">
              Email: sales@greenwavepackaging.ca <br />
              Phone: (437) 556-8899
            </p>

            <div className="flex justify-center md:justify-start gap-4 text-2xl text-green-700">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-green-500 transition"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="footer-bottom-element">
            © {new Date().getFullYear()} Greenwave Packaging. All rights
            reserved.
          </p>

          <div className="footer-bottom-element flex space-x-4 pt-3 md:pt-0">
            <Link href="/privacy" className="hover:text-green-600 transition">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-green-600 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
