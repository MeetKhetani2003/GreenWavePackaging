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

// --- SEO OPTIMIZATION START ---

// Define the core company name and key phrases
const companyName = "Green Wave Packaging";
const coreDescription =
  "Sustainable, innovative, and high-performance plastic films and packaging solutions.";

export const metadata = {
  // 1. Title: Primary keyword + Brand Name (Highly influential)
  title: {
    default: companyName,
    template: `%s | ${companyName}`,
  },
  // 2. Description: Compelling, keyword-rich summary (Highly influential)
  description:
    coreDescription +
    " We offer LDPE, LLDPE, HDPE films, PET resins, and FIBC bulk containers for industrial, agricultural, and food-grade applications.",

  // 3. Keywords: Target specific search terms (Important for context)
  keywords: [
    // 1. Geographic Targeting (Critical for local/national search)
    "Packaging Suppliers Canada",
    "Plastic Film Manufacturer Toronto",
    "Sustainable Packaging Ontario",
    "Industrial Films Canada",

    // 2. High-Value Material Grades & Applications
    "Food Grade PET Resin",
    "High Barrier Packaging Film",
    "BOPP Lamination Film",
    "Recycled ABS Resin Supplier",
    "Woven Polypropylene Bags",

    // 3. Technical & Certifications (Premium Search Terms)
    "ASTM Certified Film",
    "ISO 9001 Plastics",
    "PCR Content Film", // Post-Consumer Recycled
    "Compostable Packaging EN 13432",
    "Vapor Deposited Barrier Film",

    // 4. Core Products (Reinforced)
    "LDPE Tubing",
    "HDPE Liners",
    "Ventilated FIBC",
    "Stretch Wrap Wholesale",

    // 5. Brand & Core Identity
    "Green Wave Packaging",
    "Sustainable Packaging Solutions",
  ],

  // 4. Canonical URL: Prevents content duplication issues
  metadataBase: new URL("https://www.greenwavepackaging.ca/"), // *** IMPORTANT: Replace with your actual domain ***
  alternates: {
    canonical: "/",
  },

  // 5. Open Graph (Social Media Sharing)
  openGraph: {
    title: `${companyName} | Innovative & Sustainable Packaging Solutions`,
    description: coreDescription,
    url: "https://www.greenwavepackaging.ca/", // *** IMPORTANT: Replace with your actual domain ***
    siteName: companyName,
    images: [
      {
        url: "/og-image.jpg", // Path to your social sharing image (1200x630 recommended)
        width: 1200,
        height: 630,
        alt: `${companyName} sustainable packaging solutions`,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // 6. Twitter Card (for X/Twitter sharing)
  twitter: {
    card: "summary_large_image",
    title: `${companyName} | Leaders in Sustainable Films`,
    description: coreDescription,
    creator: "@Greenwavepackaging", // Optional: Your company's Twitter handle
    images: ["/og-image.jpg"], // Same image as Open Graph
  },

  // 7. Robots: Instructions for search engine crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 8. Viewport: Ensures mobile responsiveness
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

// --- SEO OPTIMIZATION END ---

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} bg-[#f5f8f6] ${geistMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          <nav>
            <NavBar />
          </nav>

          {children}
          <footer>
            <Footer />
          </footer>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
