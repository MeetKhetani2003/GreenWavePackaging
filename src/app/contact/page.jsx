// components/Contact.jsx
"use client";

import React, { useRef, useEffect } from "react";
// Using local icon definitions for stability
const FaMapMarkerAlt = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const FaPhone = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h13a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm2 0h12v14H4V3zm1 11h10a1 1 0 100-2H5a1 1 0 000 2z" />
  </svg>
);
const FaEnvelope = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);
const FaPaperPlane = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 00.183.654A1 1 0 003 18h14a1 1 0 00.894-1.287l-7-14zM10 16a1 1 0 100-2 1 1 0 000 2z" />
  </svg>
);

// const gsap = window.gsap;

const Contact = () => {
  const sectionRef = useRef(null);

  // --- GSAP Entrance Animation ---
  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(
      ".animate-contact-block"
    );

    gsap.set(elements, { opacity: 0, y: 30 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      delay: 0.3,
    });
  }, []);

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Our Headquarters",
      detail: "456 Green Solutions Parkway, Eco City, 12345",
      color: "text-green-600",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      detail: "+1 (555) 123-4567 (Sales)",
      color: "text-yellow-600",
    },
    {
      icon: FaEnvelope,
      title: "Email Inquiry",
      detail: "inquire@greenwave.com",
      color: "text-blue-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 animate-contact-block">
          <h2 className="text-gray-900 font-extrabold text-center text-4xl sm:text-5xl lg:text-6xl mb-3">
            Let's Start a <span className="text-green-600">Conversation</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            Tell us about your project needs. We ensure a swift and informed
            response within 24 hours.
          </p>
          <span className="h-1.5 mt-4 w-28 bg-green-500 rounded-full py-0.2 mx-auto shadow-lg"></span>
        </div>

        {/* Main Contact Grid (Form and Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT SIDE: Contact Form (2/3 width) */}
          <div className="lg:col-span-2 animate-contact-block bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-green-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">
              Send Us a Quick Message
            </h3>

            <form className="space-y-6">
              {/* Input Group: Name and Email Side-by-Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 shadow-inner"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 shadow-inner"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label
                  htmlFor="inquiry"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Inquiry Type
                </label>
                <select
                  id="inquiry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 shadow-inner appearance-none bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Quote Request (Films)</option>
                  <option>Sample Request (Resins)</option>
                  <option>Partnership Opportunities</option>
                </select>
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Project Details
                </label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 resize-none shadow-inner"
                  placeholder="Describe your packaging needs, required materials, and quantities..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent 
                                           text-lg font-bold rounded-lg shadow-lg bg-green-600 text-white 
                                           hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.01] active:scale-95"
              >
                <FaPaperPlane className="w-4 h-4 mr-2" />
                Send Detailed Inquiry
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Contact Info & Map (1/3 width) */}
          <div className="lg:col-span-1 space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="animate-contact-block bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500"
                >
                  <item.icon className={`w-6 h-6 mb-3 ${item.color}`} />
                  <h4 className="text-lg font-bold text-gray-800">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Map Integration */}
            <div className="animate-contact-block h-80 w-full bg-gray-200 rounded-xl shadow-xl overflow-hidden border border-gray-300">
              <iframe
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Packaging%20Manufacturer&t=&z=13&ie=UTF8&iwloc=&output=embed"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
