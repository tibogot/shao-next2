"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export default function Press() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const articles = [
    {
      src: "/images/press-1.jpg",
      alt: "SHAO Featured in Beauty Magazine",
      title: "Beauty Magazine Feature",
      description:
        "SHAO's innovative approach to sustainable beauty has caught the attention of industry leaders, highlighting our commitment to natural ingredients and eco-friendly practices.",
    },
    {
      src: "/images/press-2.jpg",
      alt: "Sustainable Beauty Awards 2024",
      title: "Sustainability Award Winner",
      description:
        "Recognized at the 2024 Sustainable Beauty Awards for our groundbreaking bio-fermentation technology and commitment to environmental responsibility in cosmetics.",
    },
    {
      src: "/images/press-3.jpg",
      alt: "Botanical Innovation in Skincare",
      title: "Innovation Spotlight",
      description:
        "Featured in Tech Beauty Review for our unique blend of traditional botanical wisdom with cutting-edge biotechnology, setting new standards in natural skincare.",
    },
    {
      src: "/images/press-4.jpg",
      alt: "SHAO in Vogue Sustainability Issue",
      title: "Vogue Sustainability Feature",
      description:
        "SHAO's commitment to eco-conscious beauty practices has earned us a feature in Vogue's annual sustainability issue, showcasing how luxury and environmental responsibility can coexist.",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth =
        container.querySelector("article")?.getBoundingClientRect().width || 0;
      const gap = 16; // gap-4 = 16px
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : articles.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < articles.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  // Reusable article component for mobile carousel
  const MobileArticleCard = ({
    article,
    index,
  }: {
    article: (typeof articles)[0];
    index: number;
  }) => (
    <article className="w-[280px] flex-shrink-0 snap-start sm:w-[320px]">
      <div className="relative mb-4 h-[320px] w-full overflow-hidden rounded-sm sm:h-[360px]">
        <Image
          src={article.src}
          alt={article.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 320px"
          loading="lazy"
        />
      </div>
      <h3 className="font-neue-montreal-mono text-lg uppercase">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-base text-gray-600">
        {article.description}
      </p>
    </article>
  );

  // Reusable article component for desktop grid
  const DesktopArticleCard = ({
    article,
    index,
  }: {
    article: (typeof articles)[0];
    index: number;
  }) => (
    <article className="block">
      <div className="relative mb-4 h-[280px] w-full overflow-hidden rounded-sm md:h-[320px] lg:h-[360px]">
        <Image
          src={article.src}
          alt={article.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
      </div>
      <h3 className="font-neue-montreal-mono text-lg uppercase">
        {article.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-base text-gray-600">
        {article.description}
      </p>
    </article>
  );
  return (
    <section className="press px-4 py-12 md:px-8 md:py-16">
      <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
        Press
      </h2>

      {/* Mobile: Horizontal scroll carousel */}
      <div className="mt-8 md:hidden">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
          >
            {articles.map((article, index) => (
              <MobileArticleCard key={index} article={article} index={index} />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-start gap-4">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:border-black hover:bg-black hover:text-white"
              aria-label="Previous article"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:border-black hover:bg-black hover:text-white"
              aria-label="Next article"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: Responsive grid that fills screen width */}
      <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article, index) => (
          <DesktopArticleCard key={index} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}
