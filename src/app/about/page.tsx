import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#FBFBFB]">
      {/* Hero Section */}
      <section className="flex min-h-screen">
        {/* Left side - Text content */}
        <div className="flex w-1/2 flex-col justify-end px-4 py-12 md:px-8 md:py-16">
          <h2 className="font-neue-montreal-mono mb-6 text-sm text-black/60 uppercase">
            Our Story
          </h2>
          <p className="font-neue-montreal max-w-lg text-lg md:text-xl">
            SHAO celebrates the power of nature's purest ingredients. We blend
            traditional botanical wisdom with cutting-edge sustainable practices
            to create cosmetics that honor both your skin and our planet.
          </p>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2">
          <Image
            src="/images/about-img1.webp"
            alt="About us hero image"
            width={1920}
            height={2400}
            className="h-screen w-full object-cover"
            sizes="50vw"
            priority
          />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 py-12 md:px-8 md:py-24">
        <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-3xl">
          “Advanced formulas for slow rituals, REOME's elevated skincare is
          powered by biotechnology.”
        </p>
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

      {/* Mission Section */}
      <section className="flex flex-col gap-6 px-4 py-12 md:flex-row md:gap-8 md:px-8 md:py-16">
        <div className="md:w-1/2">
          <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Our Mission
          </h2>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-xl">
            REOME's mission is to invigorate and balance skin with highly
            specialised, bio-fermented, and biotech-powered formulas, better for
            skin, better for planet. Offering unparalleled levels of innovation,
            efficacy, and visible results, REOME formulas are clinically proven
            to nourish, awaken, and restore skin – gently, but profoundly.
            Welcome to a new dawn in science-led skincare.
          </p>
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-base">
            REOME was founded in 2023 by Joanna Ellner, a multi award-winning
            beauty journalist and brand consultant. Feeling disillusioned with
            the lack of tangible skin results of even the most science-driven
            skincare, Joanna founded REOME upon 18 years of skincare expertise,
            and vowed to place efficacy of the very heart of the brand.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/side1.webp"
            alt="SHAO mission"
            width={800}
            height={650}
            className="h-[550px] w-full object-cover md:h-[750px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </section>

      {/* Text Only Section - 50/50 */}
      <section className="font-neue-montreal flex flex-col gap-6 px-4 py-12 md:flex-row md:gap-8 md:px-8 md:py-16">
        <div className="md:w-1/2">
          {/* <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Our Values
          </h2> */}
          <p className="mt-6 mb-4 max-w-xl text-lg md:mt-8 md:text-xl">
            “I've spent 20 years in pursuit of skincare that actually works.
            With results you can see and feel. Now, through the advancement of
            biotechnology, it finally does. REOME's potent formulas are the most
            effective I've ever tried.”
          </p>
          <p>Joanna Ellner, REOME founder and CEO</p>
        </div>
        <div className="md:w-1/2">
          {/* <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
            Our Promise
          </h2> */}
          <p className="font-neue-montreal mt-6 max-w-xl text-lg md:mt-8 md:text-base">
            From sourcing to packaging, we ensure every step of our process
            aligns with our vision of conscious beauty. Quality, sustainability,
            and efficacy are at the heart of everything we create.
          </p>
        </div>
      </section>

      {/* Images Section - 50/50 with two images */}
      <section className="flex flex-col gap-4 px-4 py-12 md:flex-row md:gap-4 md:px-8 md:py-16">
        <div className="p-0 md:w-1/2">
          <Image
            src="/images/image-4.jpg"
            alt="SHAO ingredients"
            width={600}
            height={400}
            className="h-[400px] w-full object-cover md:h-[800px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <div className="p-0 md:w-1/2">
          <Image
            src="/images/press-1.jpg"
            alt="SHAO process"
            width={600}
            height={400}
            className="h-[400px] w-full object-cover md:h-[800px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </section>
    </main>
  );
}
