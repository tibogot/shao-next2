"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type FilterState = {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: string;
  vendor: string;
};

type SearchAndFilterProps = {
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  vendors: string[];
  maxPrice: number;
};

export default function SearchAndFilter({
  onFiltersChange,
  categories,
  vendors,
  maxPrice,
}: SearchAndFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: [0, maxPrice],
    sortBy: "newest",
    vendor: "",
  });

  // Update price range when maxPrice changes (after products are fetched)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [0, maxPrice],
    }));
  }, [maxPrice]);

  const [isExpanded, setIsExpanded] = useState(false);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, onFiltersChange]);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      priceRange: [0, maxPrice],
      sortBy: "newest",
      vendor: "",
    });
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 text-gray-900 placeholder-gray-500 focus:border-black focus:ring-2 focus:ring-black/20 focus:outline-none"
        />
        <svg
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400"
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
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-black"
      >
        <span>Filters & Sort</span>
        <svg
          className={`h-4 w-4 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Category Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vendor Filter */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <select
                  value={filters.vendor}
                  onChange={(e) => handleFilterChange("vendor", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                >
                  <option value="">All Brands</option>
                  {vendors.map((vendor) => (
                    <option key={vendor} value={vendor}>
                      {vendor}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price Range: €{filters.priceRange[0]} - €{filters.priceRange[1]}
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [
                      parseInt(e.target.value),
                      filters.priceRange[1],
                    ])
                  }
                  className="flex-1"
                />
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handleFilterChange("priceRange", [
                      filters.priceRange[0],
                      parseInt(e.target.value),
                    ])
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:border-black hover:text-black"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
