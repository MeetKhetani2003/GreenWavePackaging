"use client";

import React, { useRef, useState, useEffect } from "react";
// Using local icon definitions to resolve the compilation error
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
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V6z"
      clipRule="evenodd"
    ></path>
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
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6zM10 14a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    ></path>
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
    ></path>
  </svg>
);

// const gsap = window.gsap;
// const ScrollTrigger = window.ScrollTrigger;
// if (gsap && ScrollTrigger) {
//   gsap.registerPlugin(ScrollTrigger);
// }

// --- Simple Image component (for single-file constraints) ---
const Image = React.forwardRef(
  ({ src, alt, fill, className, style, onClick, innerRef }, ref) => (
    <img
      src={src}
      alt={alt}
      ref={ref || innerRef}
      onClick={onClick}
      style={{
        position: fill ? "absolute" : undefined,
        top: 0,
        left: 0,
        width: fill ? "100%" : "auto",
        height: fill ? "100%" : "auto",
        objectFit: "cover",
        transition: "transform 0.3s ease",
        ...style,
      }}
      className={className}
    />
  )
);
Image.displayName = "Image";

// --- Main Page Component ---
const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'terms', 'privacy'
  const sectionRef = useRef(null);

  // --- GSAP Entrance Animation for About Content ---
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Target elements inside the 'About Us' section only
    const elements = sectionRef.current.querySelectorAll(
      ".animate-about-block"
    );

    gsap.killTweensOf(elements);
    gsap.set(elements, { opacity: 0, y: 30 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current.querySelector(".about-content-wrapper"),
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "terms":
        return <TermsAndConditions />;
      case "privacy":
        return <PrivacyPolicy />;
      case "about":
      default:
        return <AboutUsContent />;
    }
  };

  return (
    <main ref={sectionRef} className="pb-20 bg-gray-50">
      {/* Header Banner */}
      <div className="bg-green-800 text-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
            {activeTab === "about"
              ? "Our Story & Values"
              : activeTab === "terms"
              ? "Terms & Conditions"
              : "Privacy Policy"}
          </h1>
          <p className="text-xl text-green-300">
            {activeTab === "about"
              ? "Committed to sustainable innovation since 2005."
              : activeTab === "terms"
              ? "Governing principles for using Greenwave Packaging services."
              : "How we handle and protect your data."}
          </p>
        </div>
      </div>

      {/* Main Content Area with Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        {/* Tab Navigation */}
        <div className="flex justify-center md:justify-start space-x-2 p-1 bg-white rounded-xl shadow-2xl mb-12">
          <TabButton
            icon={FaGlobe}
            title="About Us"
            isActive={activeTab === "about"}
            onClick={() => setActiveTab("about")}
          />
          <TabButton
            icon={FaBalanceScale}
            title="Terms & Conditions"
            isActive={activeTab === "terms"}
            onClick={() => setActiveTab("terms")}
          />
          <TabButton
            icon={FaShieldAlt}
            title="Privacy Policy"
            isActive={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
          />
        </div>

        {/* Content Block */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gray-200">
          {renderContent()}
        </div>
      </div>
    </main>
  );
};

// --- Helper Components ---

const TabButton = ({ icon: Icon, title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 py-3 px-4 md:px-6 rounded-lg transition-all duration-300 font-semibold text-base 
                    ${
                      isActive
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-transparent text-gray-700 hover:bg-green-50/50"
                    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{title}</span>
  </button>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-3xl font-extrabold text-green-700 mb-4 pb-2 border-b-2 border-green-100">
    {title}
  </h2>
);

// --- About Us Content (ENHANCED WITH IMAGE) ---
const AboutUsContent = () => (
  <div className="about-content-wrapper space-y-10">
    {/* Story Section: Image and Mission/Inception */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
      {/* Left Column: Image */}
      <div className="animate-about-block order-2 md:order-1">
        <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-2xl">
          <img
            src="/assets/Team.jpeg"
            alt="Greenwave Packaging team working on sustainable solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900/10 backdrop-blur-[1px]"></div>
        </div>
      </div>

      {/* Right Column: Mission and Inception Text */}
      <div className="order-1 md:order-2 space-y-8">
        <div className="animate-about-block">
          <SectionTitle title="Our Mission" />
          <p className="text-lg text-gray-700 leading-relaxed">
            At **Greenwave Packaging**, our mission is simple: to lead the
            packaging industry into a sustainable future. We are dedicated to
            providing innovative, high-performance films, resins, and containers
            that meet the rigorous demands of global commerce while
            significantly reducing environmental impact. We believe profit and
            planet can, and must, coexist.
          </p>
        </div>

        <div className="animate-about-block">
          <SectionTitle title="From Inception to Innovation" />
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2005, Greenwave began as a small distributor specializing
            in recycled plastics. Over the past two decades, we have evolved
            into a vertically integrated manufacturer, developing proprietary
            five-layer co-extrusion technologies for superior film performance.
          </p>
        </div>
      </div>
    </div>

    {/* Core Principles Section (Full Width) */}
    <div className="animate-about-block pt-6">
      <SectionTitle title="Our Core Principles" />
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-start">
          <FaAngleRight className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <strong className="text-gray-900">Sustainability First:</strong>{" "}
            Every product innovation starts with minimizing waste and maximizing
            recycled or renewable content.
          </div>
        </li>
        <li className="flex items-start">
          <FaAngleRight className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <strong className="text-gray-900">Quality Commitment:</strong> We
            maintain ISO 9001 standards across all manufacturing processes,
            guaranteeing consistent product quality.
          </div>
        </li>
        <li className="flex items-start">
          <FaAngleRight className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <strong className="text-gray-900">Customer Partnership:</strong> We
            view our clients not just as customers, but as partners in building
            a greener supply chain.
          </div>
        </li>
      </ul>
    </div>
  </div>
);

// --- Terms and Conditions Content ---
const TermsAndConditions = () => (
  <div className="space-y-6 text-gray-800">
    <SectionTitle title="1. Agreement to Terms" />
    <p>
      By accessing or using the services provided by Greenwave Packaging Ltd.
      ("Company," "we," "us," or "our"), you agree to be bound by these Terms
      and Conditions ("Terms"). If you disagree with any part of the terms, you
      may not access the service. These Terms apply to all visitors, users, and
      others who access or use the Service.
    </p>

    <SectionTitle title="2. Products and Services" />
    <p>
      All products listed on this site, including LD films, BOPP films, and
      plastic resins, are subject to availability. We reserve the right to limit
      the quantities of any products or services that we offer. All descriptions
      of products or product pricing are subject to change at any time without
      notice, at our sole discretion.
    </p>

    <SectionTitle title="3. Orders, Quotes, and Payment" />
    <p>
      All quote requests placed through the site are subject to acceptance by
      us. Pricing is based on material costs and market fluctuations and is
      valid only for the duration specified in the official quotation document.
      Title and risk of loss for all products pass to you upon our delivery to
      the carrier.
    </p>

    <SectionTitle title="4. Limitation of Liability" />
    <p>
      In no case shall Greenwave Packaging Ltd., our directors, officers,
      employees, affiliates, agents, contractors, interns, suppliers, service
      providers or licensors be liable for any injury, loss, claim, or any
      direct, indirect, incidental, punitive, special, or consequential damages
      of any kind.
    </p>
  </div>
);

// --- Privacy Policy Content ---
const PrivacyPolicy = () => (
  <div className="space-y-6 text-gray-800">
    <SectionTitle title="1. Information We Collect" />
    <p>
      We collect personal information that you voluntarily provide to us when
      registering on the site, expressing an interest in obtaining information
      about us or our products and services, or otherwise contacting us. The
      personal information we collect may include your name, email address,
      phone number, job title, and company name.
    </p>

    <SectionTitle title="2. How We Use Your Information" />
    <p>
      We use the information we collect or receive: to send you marketing and
      promotional communications; to send administrative information; to fulfill
      and manage your orders, quotes, and other transactions; and to enforce our
      terms, conditions, and policies. We do not sell or rent your personal
      information to third parties.
    </p>

    <SectionTitle title="3. Security of Your Information" />
    <p>
      We use administrative, technical, and physical security measures to help
      protect your personal information. While we have taken reasonable steps to
      secure the personal information you provide to us, please be aware that no
      security measures are perfect or impenetrable, and no method of data
      transmission can be guaranteed against any interception or other type of
      misuse.
    </p>

    <SectionTitle title="4. Data Retention" />
    <p>
      We will retain your personal information only for as long as is necessary
      for the purposes set out in this privacy policy. We will retain and use
      your information to the extent necessary to comply with our legal
      obligations (for example, if we are required to retain your data to comply
      with applicable laws).
    </p>
  </div>
);

export default AboutPage;
