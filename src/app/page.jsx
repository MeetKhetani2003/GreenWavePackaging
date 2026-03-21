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
      <div className="relative max-w-7xl mx-auto h-24 md:h-64 ">
        <Image
          fill={true}
          src={"/assets/proudly-canadian-company-img.png"}
          alt="Proudly Canadian Company Banner - Green Wave Packaging"
          // object-cover ensures the image fills the container without stretching
          className="md:object-cover rounded-md"
          // Set priority to true if this image is above the fold
          priority
        />
      </div>
      <OurProducts />
      <CoreValues />
      <CTABanner />
    </div>
  );
}
