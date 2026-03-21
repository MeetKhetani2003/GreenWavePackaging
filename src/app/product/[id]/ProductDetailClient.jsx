"use client";

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";

/* ---------- Icon ---------- */

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
    />
  </svg>
);

/* ---------- Simple Image ---------- */

const Image = React.forwardRef(({ src, alt, fill, className, style }, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={className}
    style={{
      position: fill ? "absolute" : "static",
      inset: 0,
      width: fill ? "100%" : "auto",
      height: fill ? "100%" : "auto",
      objectFit: "cover",
      ...style,
    }}
  />
));
Image.displayName = "Image";

/* ================================================= */

const ProductDetailPage = ({ product }) => {
  const [mainImage, setMainImage] = useState(
    product?.detailImages?.[0] || null,
  );
  const [isZoomed, setIsZoomed] = useState(false);

  const pageRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !pageRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const blocks = pageRef.current.querySelectorAll(".animate-block");

    gsap.set(blocks, { opacity: 0, y: 40 });

    gsap.to(blocks, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top 80%",
      },
    });
  }, []);

  if (!product) {
    return (
      <div className="p-20 text-center text-red-500">Product Not Found</div>
    );
  }

  return (
    <main
      ref={pageRef}
      className="bg-gradient-to-b from-[#f7faf8] to-white pb-24"
    >
      {/* ---------- HEADER ---------- */}

      <div className="bg-gradient-to-b from-green-900 to-green-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-sm flex items-center space-x-2 text-green-200 mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>

            <FaChevronRight className="w-3 h-3" />

            <Link href="/product" className="hover:text-white">
              Products
            </Link>

            <FaChevronRight className="w-3 h-3" />

            <span className="text-white">{product.title}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {product.title}
          </h1>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}

      <div className="max-w-6xl mx-auto px-6 pt-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* ---------- IMAGE GALLERY ---------- */}

          <div className="flex gap-4">
            <div className="hidden sm:flex flex-col space-y-3 w-20">
              {product.detailImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer border ${
                    mainImage === img ? "border-green-600" : "border-gray-200"
                  }`}
                >
                  <Image src={img} alt="" fill />
                </div>
              ))}
            </div>

            <div
              className="relative flex-grow aspect-[4/3] bg-white rounded-xl border border-gray-100 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <Image
                src={mainImage}
                alt={product.title}
                fill
                style={{
                  transform: isZoomed ? "scale(1.4)" : "scale(1)",
                  transition: "transform 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* ---------- DETAILS ---------- */}

          <div className="space-y-10">
            <div className="animate-block">
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="animate-block">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Key Features
              </h3>

              <ul className="space-y-2 text-gray-600">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <FaChevronRight className="w-4 h-4 text-green-600 mt-1 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-block">
              <Link
                href={`/contact?product=${encodeURIComponent(product.title)}`}
                className="group inline-flex items-center px-7 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
              >
                Request Sample or Quote
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>

            <div className="animate-block">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Technical Specifications
              </h3>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <tbody>
                    {product.technicalSpecs.map((s, i) => (
                      <tr key={i} className={i % 2 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 w-1/3">
                          {s.key}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
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
