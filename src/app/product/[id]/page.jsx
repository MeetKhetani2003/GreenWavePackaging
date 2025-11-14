"use client";

import { ALL_PRODUCTS_DATA } from "@/app/AllProducts";
import React, { useRef, useState, useEffect } from "react";

// Icons
const FaChevronRight = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

// ----- Simple Image Component -----
const Image = React.forwardRef(({ src, alt, fill, style, className }, ref) => (
  <img
    src={src}
    alt={alt}
    ref={ref}
    style={{
      position: fill ? "absolute" : "static",
      inset: 0,
      width: fill ? "100%" : "auto",
      height: fill ? "100%" : "auto",
      objectFit: "cover",
      ...style,
    }}
    className={className}
  />
));
Image.displayName = "Image";

// ----- Get Product from URL -----
const getProductDetail = (id) => ALL_PRODUCTS_DATA.find((p) => p.id === id);

const getMockProductIdFromUrl = () => {
  if (typeof window === "undefined") return "ld-films-pro";
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts.pop() || "ld-films-pro";
};

// =========================================================
//              PRODUCT DETAIL PAGE  — FINAL VERSION
// =========================================================

const ProductDetailPage = () => {
  const productId = getMockProductIdFromUrl();
  const product = getProductDetail(productId);

  const [mainImage, setMainImage] = useState(
    product?.detailImages?.[0] || null
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const detailRef = useRef(null);

  // ============= GSAP SETUP =============
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !detailRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate RIGHT SIDE content blocks
    const animatedBlocks = detailRef.current.querySelectorAll(
      ".animate-detail-content"
    );

    animatedBlocks.forEach((block) => {
      gsap.set(block, {
        opacity: 0,
        y: 40,
        scale: 0.96,
      });

      gsap.to(block, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: block,
          start: "top 85%",
          toggleActions: "play reverse play reverse", // D2 replay style
        },
      });
    });
  }, []);

  if (!product) {
    return (
      <div className="p-20 text-center text-red-500">Product Not Found!</div>
    );
  }

  return (
    <main ref={detailRef} className="bg-gray-50 pb-20">
      {/* ===========================
          HERO HEADER
      ============================ */}
      <div className="bg-green-800 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-sm mb-4 flex items-center space-x-2 text-gray-300">
            <a href="/" className="hover:text-green-300">
              Home
            </a>
            <FaChevronRight className="w-3 h-3 text-green-400" />
            <a href="/products" className="hover:text-green-300">
              Products
            </a>
            <FaChevronRight className="w-3 h-3 text-green-400" />
            <span className="font-semibold text-white">{product.title}</span>
          </nav>

          <h1 className="text-4xl font-extrabold">{product.title}</h1>
        </div>
      </div>

      {/* ===============================
          MAIN PRODUCT PAGE LAYOUT
      =============================== */}
      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* =================================================
              LEFT — FULL STICKY COLUMN (Thumbnails + Main Image)
          ================================================== */}
          <div className="sticky top-20 h-fit flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col space-y-3 w-20">
              {product.detailImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    mainImage === img
                      ? "border-green-600 shadow-md"
                      : "border-gray-300 hover:border-green-300"
                  }`}
                >
                  <Image src={img} alt="" fill />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative flex-grow h-[500px] bg-white rounded-xl shadow-xl overflow-hidden"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={mainImage}
                alt="Main"
                fill
                style={{
                  transform: isZoomed ? "scale(1.5)" : "scale(1)",
                  transition: "transform 0.4s ease-out",
                }}
              />

              <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                {isZoomed ? "Zoom Active" : "Hover to Zoom"}
              </div>
            </div>
          </div>

          {/* ===============================================
              RIGHT — PRODUCT DETAILS WITH CINEMATIC ANIMATIONS
          ================================================ */}
          <div className="space-y-10">
            {/* Full Description */}
            <div className="animate-detail-content">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="animate-detail-content">
              <h3 className="text-2xl font-bold text-green-700 mb-3">
                Key Features
              </h3>

              <ul className="space-y-2 text-gray-700">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <FaChevronRight className="w-4 h-4 text-green-500 mt-1 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquiry Button */}
            <div className="animate-detail-content">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Inquire About This Product
              </h3>

              <button className="px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-all shadow-md">
                Request Sample or Quote
              </button>
            </div>

            {/* Technical Specs */}
            <div className="animate-detail-content">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Technical Specifications
              </h3>

              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody>
                    {product.technicalSpecs.map((s, i) => (
                      <tr key={i} className={i % 2 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900 w-1/3">
                          {s.key}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {s.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
