// src/app/about/page.jsx

import AboutPage from "./AboutPageClient";

export const metadata = {
  title: "About Our Sustainable Packaging Mission | Green Wave Packaging",
  description:
    "Learn about Green Wave Packaging's commitment to eco-friendly innovation. From LDPE films to global supply chain solutions in Vancouver, BC.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Our Story & Values | Green Wave Packaging",
    description:
      "Discover how we are revolutionizing the packaging industry with sustainable materials and global distribution.",
    images: [{ url: "/assets/Team.jpeg" }],
  },
};

export default function Page() {
  return <AboutPage />;
}
