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

  useGSAP(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const columns = gsap.utils.toArray(".footer-column");
    const bottom = gsap.utils.toArray(".footer-bottom-element");

    gsap.set([...columns, ...bottom], { opacity: 0, y: 30 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        },
      })
      .to(columns, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      })
      .to(
        bottom,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        "-=0.3",
      );
  });

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/product" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  const MAX_PRODUCT_LINKS = 6;

  const productsToDisplay = ALL_PRODUCTS_DATA.slice(0, MAX_PRODUCT_LINKS).map(
    (p) => ({
      title: p.title,
      path: p.link,
    }),
  );

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-b from-[#f7faf8] to-white border-t border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-gray-200">
          {/* BRAND */}
          <div className="footer-column space-y-4">
            <Logo />

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Greenwave Packaging develops sustainable and high-performance
              packaging materials engineered for global industries.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide uppercase">
              Company
            </h3>

            <ul className="space-y-3 text-gray-600 text-sm">
              {navLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="hover:text-green-600 transition"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PRODUCTS */}
          <div className="footer-column">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide uppercase">
              Products
            </h3>

            <ul className="space-y-3 text-gray-600 text-sm">
              {productsToDisplay.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="hover:text-green-600 transition"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}

              {ALL_PRODUCTS_DATA.length > MAX_PRODUCT_LINKS && (
                <li>
                  <Link
                    href="/product"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    View All →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="footer-column space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
              Contact
            </h3>

            <p className="text-gray-600 text-sm">sales@greenwavepackaging.ca</p>

            <p className="text-gray-600 text-sm">+1 (437) 556-8899</p>

            <p className="text-gray-500 text-sm">
              British Columbia, Alberta, Ontario
            </p>

            <div className="flex space-x-4 pt-2 text-gray-600">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-green-600 transition"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="footer-bottom-element">
            © {new Date().getFullYear()} Greenwave Packaging. All rights
            reserved.
          </p>

          <div className="footer-bottom-element flex space-x-6 pt-3 md:pt-0">
            <Link href="/about" className="hover:text-green-600 transition">
              Privacy Policy
            </Link>

            <Link href="/about" className="hover:text-green-600 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
