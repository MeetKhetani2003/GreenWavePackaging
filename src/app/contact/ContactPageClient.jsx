"use client";

import React, { useRef, useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const captchaRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(
      ".animate-contact-block",
    );

    gsap.set(elements, { opacity: 0, y: 40 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.15,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify the reCAPTCHA.");
      return;
    }

    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      inquiryType: e.target.inquiry.value,
      message: e.target.message.value,
      token: captchaToken,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully");
        e.target.reset();
        captchaRef.current.reset();
        setCaptchaToken(null);
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("Server error");
    }

    setLoading(false);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Head Office",
      detail: "23394 fisherman road maple ridge, BC V2W 1B9",
    },
    {
      icon: FaPhone,
      title: "Call Us",
      detail: "+1 (437) 556-8899",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      detail: "sales@greenwavepackaging.ca",
    },
  ];

  return (
    <>
      <ToastContainer position="bottom-right" theme="colored" />

      <section
        ref={sectionRef}
        className="py-28 bg-gradient-to-b from-[#f7faf8] to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-20 animate-contact-block">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              Let's Start a <span className="text-green-600">Conversation</span>
            </h2>

            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Tell us about your requirements and our team will respond shortly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-14">
            {/* FORM */}
            <div className="lg:col-span-2 animate-contact-block bg-white p-10 rounded-xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input label="Full Name" name="name" placeholder="John Doe" />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>

                <Input
                  label="Phone Number"
                  name="phone"
                  placeholder="+1 234 567 890"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>

                  <select
                    name="inquiry"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  >
                    <option>General Inquiry</option>
                    <option>Quote Request</option>
                    <option>Sample Request</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows="5"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Tell us more about your project..."
                  />
                </div>

                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full py-3 bg-green-600 text-white rounded-lg font-medium transition hover:bg-green-700"
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6 animate-contact-block">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
                >
                  <item.icon className="w-6 h-6 text-green-600 mb-3" />

                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h4>

                  <p className="text-gray-600 text-sm">{item.detail}</p>
                </div>
              ))}

              {/* MAP */}
              <div className="h-80 rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  className="w-full h-full"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.3399147366667!2d-123.022045!3d49.1371703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485df87994665d1%3A0x7c5a017ca8f460ae!2sGreenwave%20Packaging%20Ltd.!5e0!3m2!1sen!2sin!4v1764168577677!5m2!1sen!2sin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ---------- Input Component ---------- */

const Input = ({ label, name, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>

    <input
      name={name}
      type={type}
      required
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
    />
  </div>
);

export default Contact;
