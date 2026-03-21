"use client";

import React, { useRef, useState, useEffect } from "react";

/* ---------------- Icons ---------------- */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Green Wave Packaging",
  url: "https://www.greenwavepackaging.ca",
  logo: "https://www.greenwavepackaging.ca/logo.png", // Ensure you have a logo path
  description:
    "Global packaging suppliers specializing in sustainable films and industrial containers.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7351 Vantage Way",
    addressLocality: "Delta",
    addressRegion: "BC",
    postalCode: "V4G 1M3",
    addressCountry: "CA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-437-556-8899",
    contactType: "sales",
    areaServed: "Global",
  },
};
const FaGlobe = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM11 6a1 1 0 10-2 0v4H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V6z"
      clipRule="evenodd"
    />
  </svg>
);

const FaShieldAlt = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6z"
      clipRule="evenodd"
    />
  </svg>
);

const FaBalanceScale = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M11 6a1 1 0 10-2 0v2H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V6z" />
  </svg>
);

const FaAngleRight = ({ className }) => (
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

/* ---------------- About Page ---------------- */

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const sectionRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = sectionRef.current.querySelectorAll(
      ".animate-about-block",
    );

    gsap.killTweensOf(elements);
    gsap.set(elements, { opacity: 0, y: 40 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "terms":
        return <TermsAndConditions />;
      case "privacy":
        return <PrivacyPolicy />;
      default:
        return <AboutUsContent />;
    }
  };

  return (
    <main
      ref={sectionRef}
      className="pb-24 bg-gradient-to-b from-[#f7faf8] to-white"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* Header */}
      <div className="bg-gradient-to-b from-green-900 to-green-800 text-white pt-20 pb-28">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            {activeTab === "about"
              ? "Our Story & Values"
              : activeTab === "terms"
                ? "Terms & Conditions"
                : "Privacy Policy"}
          </h1>

          <p className="text-lg text-green-200 max-w-xl">
            {activeTab === "about"
              ? "Committed to sustainable innovation and advanced packaging solutions."
              : activeTab === "terms"
                ? "Legal framework governing use of our services."
                : "How we collect, process and protect your data."}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-2 flex space-x-2 mb-10 overflow-x-auto">
          <TabButton
            icon={FaGlobe}
            title="About Us"
            isActive={activeTab === "about"}
            onClick={() => setActiveTab("about")}
          />
          <TabButton
            icon={FaBalanceScale}
            title="Terms"
            isActive={activeTab === "terms"}
            onClick={() => setActiveTab("terms")}
          />
          <TabButton
            icon={FaShieldAlt}
            title="Privacy"
            isActive={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
          />
        </div>

        {/* Content Card */}
        <div className="bg-white p-10 md:p-14 rounded-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

/* ---------------- Tab Button ---------------- */

const TabButton = ({ icon: Icon, title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
    ${
      isActive
        ? "bg-green-600 text-white"
        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
    }`}
  >
    <Icon className="w-4 h-4" />
    <span>{title}</span>
  </button>
);

/* ---------------- Section Title ---------------- */

const SectionTitle = ({ title }) => (
  <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-tight">
    {title}
  </h2>
);

/* ---------------- About Content ---------------- */

const AboutUsContent = () => (
  <div className="space-y-10">
    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div className="animate-about-block">
        <div className="rounded-xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
          <img
            src="/assets/Team.jpeg"
            alt="Greenwave Packaging Team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="animate-about-block">
          <SectionTitle title="Our Mission" />
          <p className="text-gray-600 leading-relaxed">
            Greenwave Packaging develops sustainable packaging materials
            engineered for modern global industries. Our goal is to combine
            innovation, performance and environmental responsibility.
          </p>
        </div>

        <div className="animate-about-block">
          <SectionTitle title="From Inception to Innovation" />
          <p className="text-gray-600 leading-relaxed">
            Founded with a focus on advanced plastics and packaging technology,
            we continue to invest in manufacturing innovation to deliver
            high-performance solutions across global markets.
          </p>
        </div>
      </div>
    </div>

    <div className="animate-about-block">
      <SectionTitle title="Our Core Principles" />

      <ul className="space-y-4 text-gray-600">
        <li className="flex items-start">
          <FaAngleRight className="w-5 h-5 text-green-600 mt-1 mr-3" />
          Sustainability first in every product design.
        </li>

        <li className="flex items-start">
          <FaAngleRight className="w-5 h-5 text-green-600 mt-1 mr-3" />
          Strict quality standards across all manufacturing processes.
        </li>

        <li className="flex items-start">
          <FaAngleRight className="w-5 h-5 text-green-600 mt-1 mr-3" />
          Long-term partnerships with global industry leaders.
        </li>
      </ul>
    </div>
  </div>
);

/* ---------------- Terms ---------------- */

const TermsAndConditions = () => (
  <div className="space-y-6 text-gray-600">
    <SectionTitle title="Agreement to Terms" />

    <p>
      By accessing our website or services you agree to be bound by these terms.
      If you disagree with any part of these terms you may not use the service.
    </p>

    <SectionTitle title="Products & Services" />

    <p>
      Product availability and pricing may change without notice. All orders
      remain subject to confirmation and official quotation.
    </p>
  </div>
);

/* ---------------- Privacy ---------------- */

const PrivacyPolicy = () => (
  <div className="space-y-6 text-gray-600">
    <SectionTitle title="Information We Collect" />

    <p>
      We collect personal information provided through forms, quote requests and
      communication with our company.
    </p>

    <SectionTitle title="Use of Information" />

    <p>
      Information is used to process inquiries, improve services and provide
      relevant communication regarding our products.
    </p>
  </div>
);

export default AboutPage;
