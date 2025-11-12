import About from "@/components/Home/About";
import CoreValues from "@/components/Home/Corevalues";
import CTABanner from "@/components/Home/CTABanner";
import Hero from "@/components/Home/Hero";
import OurProducts from "@/components/Home/OurProducts";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <OurProducts />
      <CoreValues />
      <CTABanner />
    </div>
  );
}
