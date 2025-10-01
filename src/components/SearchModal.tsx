"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  title: string;
  handle: string;
  price: string;
  image: string;
  description?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape key and handle scroll blocking
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      // Block scroll when modal is open
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
        // Restore scroll when modal closes
        document.body.style.overflow = "unset";
      };
    } else {
      // Ensure scroll is restored when modal closes
      document.body.style.overflow = "unset";
    }
  }, [isOpen, onClose]);

  // Search function
  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Search through your products (you'll need to implement this)
      // For now, I'll show a placeholder - you'll need to connect to your Shopify API
      const searchResults = await searchProducts(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query);
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Search function using the search API
  const searchProducts = async (searchQuery: string): Promise<Product[]> => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`,
      );
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            className="fixed top-20 left-1/2 w-full max-w-lg -translate-x-1/2 rounded-lg bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center p-4">
              <div className="relative flex-1">
                <svg
                  className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 py-3 pr-4 pl-10 text-lg transition-colors focus:border-black focus:outline-none"
                />
              </div>
              <button
                onClick={handleClose}
                className="ml-3 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Search Results - Only show when there are results or loading */}
            {(isLoading ||
              (hasSearched && query.trim() && results.length > 0)) && (
              <div className="border-t border-gray-100">
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>
                    <span className="ml-3 text-gray-600">Searching...</span>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto">
                    <div className="space-y-3 p-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.handle}`}
                          onClick={handleClose}
                          className="flex items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
                        >
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                <svg
                                  className="h-6 w-6 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-medium text-gray-900">
                              {product.title}
                            </h3>
                            <p className="truncate text-xs text-gray-500">
                              {product.description}
                            </p>
                            <p className="text-base font-semibold text-black">
                              €{product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* No Results Message */}
            {hasSearched &&
              query.trim() &&
              results.length === 0 &&
              !isLoading && (
                <div className="border-t border-gray-100 p-4 text-center">
                  <svg
                    className="mx-auto h-8 w-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                    />
                  </svg>
                  <p className="mt-2 text-sm font-medium text-gray-900">
                    No products found
                  </p>
                  <p className="text-xs text-gray-500">
                    Try adjusting your search terms
                  </p>
                </div>
              )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
