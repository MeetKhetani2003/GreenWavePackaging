"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { FaBars, FaTimes } from "react-icons/fa";
import { gsap } from "gsap";

const NavBar = () => {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const navContainerRef = useRef(null);

  const links = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/product" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  // Mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    const items = gsap.utils.toArray(".mobile-item", menu);

    if (mobileOpen) {
      gsap.fromTo(
        menu,
        { height: 0, opacity: 0 },
        {
          height: menu.scrollHeight,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        },
      );

      gsap.from(items, {
        opacity: 0,
        y: -8,
        stagger: 0.05,
        delay: 0.1,
        duration: 0.3,
      });

      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });

      document.body.style.overflow = "auto";
    }
  }, [mobileOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target)
      ) {
        setMobileOpen(false);
      }
    }

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen]);

  return (
    <div ref={navContainerRef}>
      {/* Background overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden" />
      )}

      {/* Navbar */}
      <nav className="fixed top-3 left-0 w-full flex justify-center z-50">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md border border-gray-100 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.06)] px-8 h-[68px] flex items-center justify-between">
          <Logo />

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-700">
            {links.map((link, i) => {
              const active =
                link.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.path);

              return (
                <li key={i}>
                  <Link
                    href={link.path}
                    className={`transition-colors duration-200 ${
                      active ? "text-green-700" : "hover:text-green-600"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}

            <li>
              <Link
                href="/contact"
                className="ml-2 px-5 py-2 bg-green-600 text-white rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-700 hover:-translate-y-[1px]"
              >
                Request Quote
              </Link>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden text-xl text-gray-800 transition-transform duration-300 ${
              mobileOpen ? "rotate-90" : ""
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-[85px] left-1/2 -translate-x-1/2 w-[92%] max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden md:hidden z-[60]"
        style={{ height: 0, opacity: 0 }}
      >
        <ul className="flex flex-col px-8 py-6 space-y-5">
          {links.map((link, i) => {
            const active =
              link.path === "/"
                ? pathname === "/"
                : pathname.startsWith(link.path);

            return (
              <li key={i}>
                <Link
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`mobile-item text-lg ${
                    active
                      ? "text-green-700 font-medium"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mobile-item mt-2 px-6 py-3 bg-green-600 text-white rounded-lg text-center text-sm font-medium"
          >
            Request Quote
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
