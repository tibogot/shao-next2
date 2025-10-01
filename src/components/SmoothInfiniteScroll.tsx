"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { fetchAllProducts } from "../lib/shopify";
import { useScrollTriggerRefresh } from "../hooks/useScrollTriggerRefresh";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor: string;
  availableForSale: boolean;
  images: { edges: { node: { url: string } }[] };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}

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

// Enhanced Product Skeleton with smooth animation
function ProductSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div className="block min-h-[450px] animate-pulse rounded-sm">
      <div className="mb-2 h-[450px] w-full rounded bg-gray-200"></div>
      <div className="mt-4 mb-2 h-5 w-3/4 rounded bg-gray-200"></div>
      <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
      <div className="h-4 w-1/2 rounded bg-gray-200"></div>
    </div>
  );
}

// Enhanced Product Component with smooth entrance
function ProductCard({
  product,
  delay = 0,
  onQuickView,
}: {
  product: Product;
  delay?: number;
  onQuickView?: (product: Product) => void;
}) {
  // DISABLED: Wishlist feature temporarily disabled
  // const [isInWishlist, setIsInWishlist] = useState(false);

  // // Check if product is in wishlist on mount and when wishlist changes
  // useEffect(() => {
  //   const checkWishlistStatus = () => {
  //     if ((window as any).isInWishlist) {
  //       setIsInWishlist((window as any).isInWishlist(product.id));
  //     }
  //   };

  //   checkWishlistStatus();

  //   // Listen for wishlist changes
  //   const handleWishlistChange = () => {
  //     checkWishlistStatus();
  //   };

  //   window.addEventListener("storage", handleWishlistChange);
  //   return () => window.removeEventListener("storage", handleWishlistChange);
  // }, [product.id]);

  // const handleWishlist = () => {
  //   if ((window as any).addToWishlist) {
  //     (window as any).addToWishlist({
  //       id: product.id,
  //       title: product.title,
  //       handle: product.handle,
  //       image: product.images.edges[0]?.node.url || "",
  //       price: parseFloat(product.priceRange.minVariantPrice.amount),
  //     });
  //     // Update local state immediately
  //     setIsInWishlist(!isInWishlist);
  //   }
  // };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleProductView = () => {
    if ((window as any).addToRecentlyViewed) {
      (window as any).addToRecentlyViewed({
        id: product.id,
        title: product.title,
        handle: product.handle,
        image: product.images.edges[0]?.node.url || "",
        price: parseFloat(product.priceRange.minVariantPrice.amount),
      });
    }
  };

  return (
    <div className="group relative block min-h-[450px] rounded-sm">
      <Link
        href={`/product/${product.handle}`}
        className="block"
        onClick={handleProductView}
      >
        <div className="mb-2 h-[450px] w-full overflow-hidden rounded">
          <img
            src={product.images.edges[0]?.node.url}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="font-neue-montreal-mono mt-4 text-sm uppercase md:mt-4">
          {product.title}
        </div>
        <div className="mb-2 line-clamp-2 text-sm text-gray-600 md:line-clamp-3">
          {product.description}
        </div>
        <div className="font-neue-montreal-mono mb-2 text-sm text-gray-800 uppercase">
          {formatEuroPrice(product.priceRange.minVariantPrice.amount)}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        {/* DISABLED: Wishlist feature temporarily disabled */}
        {/* <button
          onClick={handleWishlist}
          className={`cursor-pointer rounded-full p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 ${
            isInWishlist
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-700 hover:bg-white"
          }`}
          title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <svg
            className="h-5 w-5"
            fill={isInWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isInWishlist ? 0 : 2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button> */}
        {onQuickView && (
          <button
            onClick={handleQuickView}
            className="cursor-pointer rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
            title="Quick View"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

interface SmoothInfiniteScrollProps {
  search: string;
  minPrice: string;
  maxPrice: string;
  vendor: string;
  availability: string;
  sortBy: string;
  onQuickView?: (product: Product) => void;
}

export default function SmoothInfiniteScroll({
  search,
  minPrice,
  maxPrice,
  vendor,
  availability,
  sortBy,
  onQuickView,
}: SmoothInfiniteScrollProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    endCursor: string | null;
  }>({ hasNextPage: false, endCursor: null });
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const pageSize = 12;
  const bufferSize = 24; // Load more items in advance

  // Refresh ScrollTrigger when content changes
  useScrollTriggerRefresh([products.length, filtered.length]);

  // Smooth loading with buffer approach
  const loadMore = useCallback(async () => {
    if (!pageInfo.hasNextPage || loadingMore) return;

    setLoadingMore(true);

    try {
      const data = await fetchAllProducts(
        bufferSize, // Load more at once for smoother experience
        pageInfo.endCursor ?? undefined,
      );

      // Smooth state updates using RAF
      requestAnimationFrame(() => {
        setProducts((prev) => [...prev, ...data.edges.map((e: any) => e.node)]);
        setPageInfo(data.pageInfo);

        // Gradually reveal items for smooth appearance
        setTimeout(() => {
          setLoadingMore(false);
        }, 200);
      });
    } catch (err) {
      console.error("Failed to load more products:", err);
      setLoadingMore(false);
    }
  }, [pageInfo.hasNextPage, pageInfo.endCursor, loadingMore]);

  // Initial load
  useEffect(() => {
    setInitialLoading(true);
    fetchAllProducts(bufferSize)
      .then((data) => {
        if (data.edges.length === 0 && !data.pageInfo.hasNextPage) {
          setError("No products available.");
        } else {
          setProducts(data.edges.map((e: any) => e.node));
          setPageInfo(data.pageInfo);
        }
        setInitialLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products.");
        setInitialLoading(false);
      });
  }, []);

  // Filtering with smooth transitions
  useEffect(() => {
    let filteredList = products;

    // Search filter
    if (search) {
      filteredList = filteredList.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Price filters
    if (minPrice) {
      filteredList = filteredList.filter(
        (p) =>
          parseFloat(p.priceRange.minVariantPrice.amount) >=
          parseFloat(minPrice),
      );
    }
    if (maxPrice) {
      filteredList = filteredList.filter(
        (p) =>
          parseFloat(p.priceRange.minVariantPrice.amount) <=
          parseFloat(maxPrice),
      );
    }

    // Vendor filter
    if (vendor && vendor !== "all") {
      filteredList = filteredList.filter(
        (p) => p.vendor.toLowerCase() === vendor.toLowerCase(),
      );
    }

    // Availability filter
    if (availability === "available") {
      filteredList = filteredList.filter((p) => p.availableForSale);
    } else if (availability === "unavailable") {
      filteredList = filteredList.filter((p) => !p.availableForSale);
    }

    // Sorting
    if (sortBy === "price-low-high") {
      filteredList.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount),
      );
    } else if (sortBy === "price-high-low") {
      filteredList.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount),
      );
    } else if (sortBy === "name-a-z") {
      filteredList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "name-z-a") {
      filteredList.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFiltered(filteredList);
    setVisibleCount(Math.min(12, filteredList.length)); // Reset visible count
  }, [search, minPrice, maxPrice, vendor, availability, sortBy, products]);

  // Smooth reveal of more items
  const revealMore = useCallback(() => {
    if (visibleCount < filtered.length) {
      setVisibleCount((prev) => Math.min(prev + 6, filtered.length));
    } else if (pageInfo.hasNextPage && !loadingMore) {
      loadMore();
    }
  }, [
    visibleCount,
    filtered.length,
    pageInfo.hasNextPage,
    loadingMore,
    loadMore,
  ]);

  // Intersection Observer for smooth loading
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          revealMore();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [revealMore]);

  if (initialLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: pageSize }).map((_, index) => (
          <ProductSkeleton
            key={`skeleton-initial-${index}`}
            delay={index * 50}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex min-h-[450px] items-center justify-center py-4 text-center">
        <div>
          <p className="mb-4 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded bg-black px-4 py-2 text-white hover:bg-black/80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMoreToReveal = visibleCount < filtered.length;
  const needsApiLoad = !hasMoreToReveal && pageInfo.hasNextPage;

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            delay={index < 12 ? 0 : (index - 12) * 30} // Stagger new items
            onQuickView={onQuickView}
          />
        ))}

        {/* Show skeletons for upcoming content */}
        {(hasMoreToReveal || needsApiLoad) &&
          Array.from({
            length: Math.min(6, hasMoreToReveal ? 6 : pageSize),
          }).map((_, index) => (
            <ProductSkeleton
              key={`skeleton-more-${index}`}
              delay={index * 50}
            />
          ))}
      </div>

      {/* Smooth trigger element */}
      <div className="mt-12 flex justify-center">
        <div ref={observerRef} className="h-2 w-2">
          {loadingMore && (
            <div className="flex items-center justify-center py-8">
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>
              <span className="ml-3 text-sm text-gray-600">
                Loading more products...
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
