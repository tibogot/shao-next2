"use client";
import { useState, useEffect } from "react";
import SmoothInfiniteScroll from "../../components/SmoothInfiniteScroll";
import SearchAndFilter from "../../components/SearchAndFilter";
import RecentlyViewed from "../../components/RecentlyViewed";
import ProductQuickView from "../../components/ProductQuickView";
import { fetchAllProducts } from "../../lib/shopify";

type FilterState = {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: string;
  vendor: string;
};

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: [0, 1000], // Start with a higher default to show more products initially
    sortBy: "newest",
    vendor: "",
  });

  const [vendors, setVendors] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [isLoading, setIsLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Fetch all products to get unique vendors, categories, and max price
  useEffect(() => {
    fetchAllProducts(100)
      .then((data) => {
        const products = data.edges.map((edge: any) => edge.node);

        // Extract unique vendors
        const uniqueVendors = Array.from(
          new Set(products.map((product: any) => product.vendor)),
        )
          .filter(Boolean)
          .sort() as string[];
        setVendors(uniqueVendors);

        // Extract unique categories (product types)
        const uniqueCategories = Array.from(
          new Set(products.map((product: any) => product.productType)),
        )
          .filter(Boolean)
          .sort() as string[];
        setCategories(uniqueCategories);

        // Find max price
        const prices = products.map((product: any) =>
          parseFloat(product.priceRange?.minVariantPrice?.amount || "0"),
        );
        const maxProductPrice = Math.max(...prices, 0);
        setMaxPrice(Math.ceil(maxProductPrice));
        setFilters((prev) => ({
          ...prev,
          priceRange: [0, Math.ceil(maxProductPrice)],
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      });
  }, []);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="mx-auto px-4 py-40 md:px-8">
      <div className="mb-8">
        <h1 className="font-neue-montreal-mono mb-2 text-xl uppercase">
          Tous les produits
        </h1>
        <p className="text-gray-600">
          Discover our complete collection of sustainable beauty products
        </p>
      </div>

      {/* Main Content Container - Always rendered with min-height to prevent layout shift */}
      <div className="min-h-[800px]">
        {/* Loading State */}
        {isLoading && (
          <div className="mb-8 flex items-center justify-center py-8">
            <div className="text-gray-500">Loading filters...</div>
          </div>
        )}

        {/* Advanced Search & Filtering */}
        {!isLoading && (
          <SearchAndFilter
            onFiltersChange={handleFiltersChange}
            categories={categories}
            vendors={vendors}
            maxPrice={maxPrice}
          />
        )}

        {/* Products Grid with Enhanced Features */}
        {!isLoading && (
          <SmoothInfiniteScroll
            search={filters.search}
            minPrice={filters.priceRange[0].toString()}
            maxPrice={filters.priceRange[1].toString()}
            vendor={filters.vendor}
            availability="all"
            sortBy={filters.sortBy}
            onQuickView={handleQuickView}
          />
        )}

        {/* Loading Products - Enhanced skeleton */}
        {isLoading && (
          <div className="flex min-h-[600px] items-center justify-center py-16">
            <div className="text-gray-500">Loading products...</div>
          </div>
        )}

        {/* Recently Viewed Products */}
        {/* <RecentlyViewed isLoading={isLoading} /> */}
      </div>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}
