"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

type Product = {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: number;
};

interface RecentlyViewedProps {
  isLoading?: boolean; // Loading state from parent component
}

export default function RecentlyViewed({
  isLoading = false,
}: RecentlyViewedProps) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load recently viewed products from localStorage
    const saved = localStorage.getItem("recently-viewed");
    if (saved) {
      try {
        setRecentProducts(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing recently viewed products:", error);
      }
    }
  }, []);

  // Function to add a product to recently viewed
  const addToRecentlyViewed = (product: Product) => {
    setRecentProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8); // Keep only 8 most recent
      localStorage.setItem("recently-viewed", JSON.stringify(updated));
      return updated;
    });
  };

  // Expose this function globally so other components can use it
  useEffect(() => {
    (window as any).addToRecentlyViewed = addToRecentlyViewed;
  }, []);

  // Don't show recently viewed while main content is loading to prevent layout shift
  if (isLoading || recentProducts.length === 0) return null;

  return (
    <section className="py-8">
      <h2 className="font-neue-montreal-mono mb-6 text-sm text-black/60 uppercase">
        Recently Viewed
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {recentProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/product/${product.handle}`}
              className="group block"
              onClick={() => addToRecentlyViewed(product)}
            >
              <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-black">
                {product.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                €{product.price.toFixed(2)}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
