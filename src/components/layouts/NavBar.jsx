// components/NavBar.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Logo from "./Logo";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_HEIGHT = "69px";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();
  const navRef = useRef();
  const mobileMenuRef = useRef();
  const { contextSafe } = useGSAP({ scope: navRef });

  // --- 1. Enhanced Side Effect: Scroll Tracking & Body Lock ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Disable scrolling on the <body> when the mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset"; // Cleanup on unmount
    };
  }, [mobileMenuOpen]); // Dependency added for body lock

  // --- GSAP HOVER & MOBILE MENU LOGIC (Combined/Refined) ---
  useGSAP(
    () => {
      const lines = gsap.utils.toArray(".hover-line", navRef.current);

      // Desktop Hover Animation Setup
      lines.forEach((line) => {
        // ... (Existing hover logic remains) ...
        const hoverTween = gsap.to(line, {
          scaleX: 1,
          duration: 0.35,
          ease: "power2.out",
          paused: true,
          transformOrigin: "center right",
        });

        const link = line.closest("a");

        link.addEventListener("mouseenter", () => {
          gsap.set(line, { transformOrigin: "center left" });
          hoverTween.play();
        });

        link.addEventListener("mouseleave", () => {
          gsap.set(line, { transformOrigin: "center right" });
          hoverTween.reverse();
        });

        if (line.style.transform !== "scaleX(0)") {
          gsap.set(line, { scaleX: 1, transformOrigin: "center center" });
        }
      });
    },
    { scope: navRef, dependencies: [] }
  );

  // --- GSAP MOBILE MENU ANIMATION ---
  const animateMobileMenu = contextSafe(() => {
    const menuElement = mobileMenuRef.current;
    if (!menuElement) return;

    // Use a unique class for GSAP link targeting in the mobile menu
    const menuLinks = gsap.utils.toArray(".mobile-link-item", menuElement);

    if (mobileMenuOpen) {
      // OPENING: Animate to full height/opacity
      gsap.fromTo(
        menuElement,
        { height: 0, opacity: 0, pointerEvents: "none" },
        {
          height: "auto",
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          ease: "power2.inOut",
        }
      );
      // Stagger animation for links
      gsap.from(menuLinks, {
        opacity: 0,
        y: -15, // Increased vertical translation for emphasis
        stagger: 0.08,
        duration: 0.4,
        delay: 0.15,
      });
    } else {
      // CLOSING: Animate back to height 0/opacity 0
      gsap.to(menuElement, {
        height: 0,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  });

  useEffect(() => {
    animateMobileMenu();
  }, [mobileMenuOpen, animateMobileMenu]);

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // --- RENDERING ---
  const navbarContainerClasses = `
    w-full z-50 transition-all duration-300 ease-in-out border-b border-b-[0.01px] border-green-700
    ${
      scrolled
        ? "fixed top-0 bg-white shadow-xl"
        : "relative bg-transparent shadow-sm"
    }
  `;

  const navLinks = [
    { title: "Home", path: "/" },
    // Changed path to /product to match the base route for listings/details
    { title: "Products", path: "/product" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      {scrolled && <div style={{ height: NAV_HEIGHT }} aria-hidden="true" />}

      <nav className={navbarContainerClasses} ref={navRef}>
        <div className="flex max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 justify-between items-center">
          <Logo />

          {/* Enhanced Mobile Toggle Button */}
          <button
            className="sm:hidden text-2xl text-green-700 focus:outline-none z-50 p-2 rounded-full hover:bg-green-100 transition-colors"
            onClick={handleToggleMenu}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden sm:flex gap-8 items-center text-lg font-medium">
            {navLinks.map((item, idx) => {
              // 1. Determine if the path is active using a stricter check for Home and startsWith for sections
              const pathIsHome = item.path === "/";

              const isActive = pathIsHome
                ? currentPath === item.path // Exact match for home
                : currentPath.startsWith(item.path); // StartsWith check for dynamic routes like /product/{id}

              const baseStyles =
                "text-gray-800 transition-colors duration-300 relative inline-block py-1";
              // Enhanced active state: use subtle text color change on scroll
              const activeStyles = `font-bold ${
                scrolled ? "text-green-700" : "text-green-600"
              }`;

              const linkClasses = `${baseStyles} ${
                isActive ? activeStyles : "hover:text-green-500"
              }`;

              return (
                <li key={idx}>
                  <Link href={item.path} className={linkClasses}>
                    {item.title}
                    <span
                      className="hover-line absolute bottom-0 left-0 h-0.5 bg-orange-600 w-full"
                      style={{
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: isActive
                          ? "center center"
                          : "center right",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Enhanced Mobile Navigation Dropdown */}
        <div
          ref={mobileMenuRef}
          style={{ height: 0, opacity: 0 }}
          className={`
            sm:hidden absolute w-full left-0
            /* Ensures menu starts right below the fixed navbar */
            top-[${NAV_HEIGHT}] 
            
            /* Glassmorphism Classes */
            bg-white/90 backdrop-blur-md shadow-2xl overflow-hidden
          `}
        >
          <ul className="flex flex-col space-y-1 py-4 px-4">
            {navLinks.map((item, idx) => {
              // Re-use the StartsWith logic for mobile links too
              const pathIsHome = item.path === "/";
              const isActive = pathIsHome
                ? currentPath === item.path
                : currentPath.startsWith(item.path);

              const linkClasses = `mobile-link-item block py-3 text-xl font-medium transition-colors duration-200 rounded-lg px-4 ${
                isActive
                  ? "text-green-800 font-extrabold bg-green-100/70 border-l-4 border-green-700"
                  : "text-gray-700 hover:text-green-700 hover:bg-green-50/50"
              }`;

              return (
                <li key={idx}>
                  <Link
                    href={item.path}
                    className={linkClasses}
                    onClick={handleLinkClick}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
