import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layouts/NavBar";
import SmoothScrollProvider from "@/components/layouts/SmoothScrollProvider";
import Footer from "@/components/layouts/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- GLOBAL ENTERPRISE-CLASS SEO OPTIMIZATION ---

const companyName = "Green Wave Packaging";
const baseUrl = "https://www.greenwavepackaging.ca/";

// src/app/layout.js
export const metadata = {
  metadataBase: new URL("https://www.greenwavepackaging.ca/"),
  title: {
    default: "Green Wave Packaging | Global Packaging Suppliers",
    template: "%s | Green Wave Packaging",
  },
  description:
    "Global packaging suppliers of LDPE films, PET resin, and FIBC bags based in Vancouver, Canada.",
  alternates: {
    canonical: "./",
  },
};

// --- END GLOBAL SEO ---

export default function RootLayout({ children }) {
  return (
    <html lang="en-CA">
      <meta
        name="google-site-verification"
        content="c5CgPzNXGZAVftqgB3uOZheZnkjYEfVxFEsNDK2WleI"
      />
      <body
        className={`${geistSans.variable} bg-[#f5f8f6] ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <NavBar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
