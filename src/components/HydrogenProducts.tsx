"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchProductsByVendor } from "../lib/shopify";
import { useScrollTriggerRefresh } from "../hooks/useScrollTriggerRefresh";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  availableForSale: boolean;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

type ProductsByVendorProps = {
  vendor: string;
  title?: string;
  limit?: number;
};

function formatEuroPrice(amount: string) {
  return (
    "€" +
    Number(amount)
      .toLocaleString("fr-FR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(".", ",")
  );
}

// Skeleton component for consistent sizing
function ProductSkeleton() {
  return (
    <div className="block min-h-[450px] animate-pulse rounded-sm">
      <div className="mb-2 h-[450px] w-full rounded bg-gray-200"></div>
      <div className="mt-8 mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
    </div>
  );
}

export default function ProductsByVendor({
  vendor,
  title,
  limit = 4,
}: ProductsByVendorProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Refresh ScrollTrigger when loading state changes
  useScrollTriggerRefresh([loading, products.length]);

  useEffect(() => {
    console.log(
      `ProductsByVendor: Starting to fetch products for vendor: ${vendor}`,
    );
    setLoading(true);
    fetchProductsByVendor(vendor, limit)
      .then((data) => {
        console.log(`ProductsByVendor: Received data for ${vendor}:`, data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          `ProductsByVendor: Error fetching products for ${vendor}:`,
          error,
        );
        setLoading(false);
      });
  }, [vendor, limit]);

  return (
    <section className="px-4 py-8 md:px-8">
      <h2 className="font-neue-montreal-mono text-sm text-black/60 uppercase">
        {title || `${vendor} Collection`}
      </h2>

      {/* Responsive layout: Horizontal scroll on mobile, grid on desktop */}
      <div className="scrollbar-hide mt-8 grid grid-flow-col gap-4 overflow-x-auto pb-4 md:grid-flow-row md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          // Show skeleton items
          Array.from({ length: limit }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-[280px] flex-shrink-0 md:w-auto md:flex-shrink"
            >
              <ProductSkeleton />
            </div>
          ))
        ) : products.length > 0 ? (
          // Show actual products
          products.map((p) => {
            const imageUrl = p.images.edges[0]?.node.url;

            return (
              <Link
                key={p.id}
                href={`/product/${p.handle}`}
                className="block min-h-[380px] w-[280px] flex-shrink-0 rounded-sm sm:w-[320px] md:w-auto md:flex-shrink"
              >
                {imageUrl ? (
                  <div className="relative mb-2 h-[280px] w-full overflow-hidden rounded-sm sm:h-[300px] md:h-[320px] md:rounded">
                    <Image
                      src={imageUrl}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="mb-2 flex h-[280px] w-full items-center justify-center rounded-sm bg-gray-200 sm:h-[300px] md:h-[320px] md:rounded">
                    <span className="text-sm text-gray-500">No Image</span>
                  </div>
                )}
                <div className="font-neue-montreal-mono mt-4 text-sm uppercase md:mt-8">
                  {p.title}
                </div>
                <div className="mb-2 line-clamp-2 text-sm text-gray-600 md:mt-4 md:line-clamp-3">
                  {p.description}
                </div>
                <div className="font-neue-montreal-mono mb-2 text-sm text-gray-800 uppercase">
                  {formatEuroPrice(p.priceRange.minVariantPrice.amount)}
                </div>
              </Link>
            );
          })
        ) : (
          // Error state
          <div className="col-span-full flex min-h-[450px] w-full items-center justify-center py-4 text-center">
            No {vendor} products found. Check console for details.
          </div>
        )}
      </div>
    </section>
  );
}
