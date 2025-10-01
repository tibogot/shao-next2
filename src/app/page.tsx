"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState, useRef } from "react";
import LatestProducts from "../components/LatestProducts";
import ProductsByVendor from "../components/HydrogenProducts";
import FAQ from "@/components/FAQ";
import Press from "@/components/Press";
import RecentlyViewed from "../components/RecentlyViewed";
import { CaretDownIcon } from "@phosphor-icons/react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll position for navbar
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Use the EXACT same logic as navbar component
    const heroHeight = typeof window !== "undefined" ? window.innerHeight : 800;
    setIsScrolled(latest > heroHeight * 0.8); // Trigger at 80% of hero height
  });

  // Logo animation will be handled in the Navbar component

  return (
    <main className="bg-[#FBFBFB]">
      <div
        ref={heroRef}
        className="hero relative flex h-svh w-full items-center justify-center overflow-visible px-4 py-16 md:px-8 md:py-8"
      >
        <Image
          src="/hero-1.webp"
          alt="Hero"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
          quality={85}
        />

        {/* Small text at bottom for LCP detection */}
        <div className="absolute bottom-8 z-10 mx-auto flex flex-col items-center text-white">
          <p className="font-neue-montreal text-base">Scroll</p>
          <CaretDownIcon size={24} weight="bold" />
        </div>
      </div>
      <section className="px-4 py-12 md:px-8 md:py-16">
        <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
          Rooted in Nature, Born to Glow
        </h2>
        <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
          SHAO celebrates the power of nature's purest ingredients. We blend
          traditional botanical wisdom with cutting-edge sustainable practices
          to create cosmetics that honor both your skin and our planet. Every
          product tells a story of heritage, purity, and conscious beauty.
        </p>
      </section>
      <LatestProducts />
      {/* <RecentlyViewed /> */}
      <section className="flex flex-col gap-6 px-4 py-12 md:flex-row md:gap-8 md:px-8 md:py-16">
        <div className="md:w-1/2">
          <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Sustainability Promise
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>

          <button className="mt-8 cursor-pointer underline">Shop now </button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/side1.webp"
            alt="Future skincare"
            width={800}
            height={650}
            className="h-[550px] w-full object-cover md:h-[750px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </section>
      {/* <ProductsByVendor vendor="Hydrogen Vendor" title="Hydrogen Collection" /> */}

      {/* Example of how to use with shao-next vendor */}
      <ProductsByVendor
        vendor="Shao Beauty"
        title="SHAO Collection"
        limit={6}
      />

      <section className="px-4 py-12 md:px-8 md:py-16">
        <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
          Pure Ingredients, Pure Results
        </h2>
        <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
          SHAO celebrates the power of nature's purest ingredients. We blend
          traditional botanical wisdom with cutting-edge sustainable practices
          to create cosmetics that honor both your skin and our planet. Every
          product tells a story of heritage, purity, and conscious beauty.
        </p>
      </section>

      <section className="flex flex-col gap-6 px-4 py-12 md:flex-row-reverse md:gap-8 md:px-8 md:py-16">
        <div className="md:w-1/2">
          <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Sustainability Promise
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/image-4.jpg"
            alt="Future skincare"
            width={800}
            height={600}
            className="w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            style={{ height: "auto" }}
          />
        </div>
      </section>

      <section className="relative flex h-[60vh] items-end px-4 py-12 md:h-svh md:px-8 md:py-16">
        {/* <div className="relative z-10 text-white">
          <h2 className="font-neue-montreal-mono text-sm text-white/70 uppercase">
            Active Recovery
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>
        </div> */}
        <Image
          src="/lastimg.webp"
          alt="Future skincare"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
          quality={85}
        />
      </section>

      {/* Removed duplicate hero image section */}
      <Press />
      <FAQ />

      <section className="relative flex h-[60vh] items-end px-4 py-12 md:h-svh md:px-8 md:py-16">
        <div className="relative z-10 text-white">
          <h2 className="font-neue-montreal-mono text-sm text-white/70 uppercase">
            Active Recovery
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            Advanced formulas for slow rituals, REOME's elevated skincare is
            powered by biotechnology and bio-fermentation, with one singular
            intention: to heal and restore skin.
          </p>
        </div>
        <Image
          src="/lastimg.webp"
          alt="Future skincare"
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
          quality={85}
        />
      </section>
    </main>
  );
}
