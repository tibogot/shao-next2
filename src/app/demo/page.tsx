"use client";
import { useState } from "react";
import SearchAndFilter from "../../components/SearchAndFilter";
import RecentlyViewed from "../../components/RecentlyViewed";
import ProductQuickView from "../../components/ProductQuickView";
import EnhancedCart from "../../components/EnhancedCart";
import Wishlist from "../../components/Wishlist";

// Mock data for demo
const mockCategories = ["Skincare", "Makeup", "Haircare", "Fragrance", "Tools"];
const mockVendors = [
  "SHAO",
  "REOME",
  "Natural Beauty",
  "Organic Care",
  "Luxury Brands",
];
const mockMaxPrice = 200;

type FilterState = {
  search: string;
  category: string;
  priceRange: [number, number];
  sortBy: string;
  vendor: string;
};

export default function DemoPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    priceRange: [0, mockMaxPrice],
    sortBy: "newest",
    vendor: "",
  });

  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log("Filters changed:", newFilters);
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  // Mock product for demo
  const mockProduct = {
    id: "demo-product-1",
    title: "Demo Product",
    handle: "demo-product",
    description: "This is a demo product to showcase the e-commerce features.",
    price: 49.99,
    images: [{ url: "/hero-1.webp" }],
    variants: [
      { id: "variant-1", title: "Small", price: 39.99 },
      { id: "variant-2", title: "Medium", price: 49.99 },
      { id: "variant-3", title: "Large", price: 59.99 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-neue-montreal-mono mb-4 text-4xl uppercase">
            E-Commerce Features Demo
          </h1>
          <p className="text-lg text-gray-600">
            Explore all the new features we've built for your online store
          </p>
        </div>

        {/* Feature Showcase */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Search & Filtering */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">
              🔍 Search & Filtering
            </h3>
            <p className="mb-4 text-gray-600">
              Advanced search with real-time filtering, categories, price
              ranges, and sorting options.
            </p>
            <SearchAndFilter
              onFiltersChange={handleFiltersChange}
              categories={mockCategories}
              vendors={mockVendors}
              maxPrice={mockMaxPrice}
            />
          </div>

          {/* Wishlist */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">💝 Wishlist System</h3>
            <p className="mb-4 text-gray-600">
              Save products for later with persistent storage and easy
              management.
            </p>
            <div className="flex justify-center">
              <Wishlist />
            </div>
          </div>

          {/* Recently Viewed */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">👁️ Recently Viewed</h3>
            <p className="mb-4 text-gray-600">
              Automatic tracking of viewed products with persistent storage.
            </p>
            <RecentlyViewed />
          </div>

          {/* Quick View */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">⚡ Quick View</h3>
            <p className="mb-4 text-gray-600">
              View product details and add to cart without leaving the page.
            </p>
            <button
              onClick={() => handleQuickView(mockProduct)}
              className="w-full rounded-lg bg-black py-3 text-white transition-colors hover:bg-gray-800"
            >
              Try Quick View
            </button>
          </div>

          {/* Enhanced Cart */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">🛒 Enhanced Cart</h3>
            <p className="mb-4 text-gray-600">
              Advanced cart with quantity controls, save for later, and
              persistent storage. Click the cart button in the navbar to see it
              in action!
            </p>
            <div className="text-center text-sm text-gray-500">
              The enhanced cart is now integrated into your main layout and
              accessible from the navbar.
            </div>
          </div>

          {/* Global Functions */}
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">🌐 Global Functions</h3>
            <p className="mb-4 text-gray-600">
              Test the global functions for wishlist and recently viewed.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  if ((window as any).addToWishlist) {
                    (window as any).addToWishlist({
                      id: "demo-wishlist",
                      title: "Demo Wishlist Item",
                      handle: "demo-wishlist",
                      image: "/hero-1.webp",
                      price: 49.99,
                    });
                  }
                }}
                className="w-full rounded-lg border border-gray-300 py-2 text-sm transition-colors hover:border-black hover:text-black"
              >
                Add to Wishlist
              </button>
              <button
                onClick={() => {
                  if ((window as any).addToRecentlyViewed) {
                    (window as any).addToRecentlyViewed({
                      id: "demo-recent",
                      title: "Demo Recent Item",
                      handle: "demo-recent",
                      image: "/hero-1.webp",
                      price: 49.99,
                    });
                  }
                }}
                className="w-full rounded-lg border border-gray-300 py-2 text-sm transition-colors hover:border-black hover:text-black"
              >
                Add to Recently Viewed
              </button>
            </div>
          </div>
        </div>

        {/* Current Filters Display */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Current Filters</h3>
          <pre className="rounded bg-gray-100 p-4 text-sm">
            {JSON.stringify(filters, null, 2)}
          </pre>
        </div>

        {/* Instructions */}
        <div className="rounded-lg bg-blue-50 p-6">
          <h3 className="mb-4 text-xl font-semibold text-blue-900">
            How to Test
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>
              • Use the search and filter controls above to see real-time
              updates
            </li>
            <li>
              • Click the wishlist heart icon to add items to your wishlist
            </li>
            <li>
              • Use the "Add Demo Item to Cart" button to test the enhanced cart
            </li>
            <li>• Try the "Quick View" button to see the modal in action</li>
            <li>• Check that items persist across page refreshes</li>
            <li>• Test on mobile to see responsive design</li>
          </ul>
        </div>
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
