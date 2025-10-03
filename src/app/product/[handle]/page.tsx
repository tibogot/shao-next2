"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  fetchProductByHandle,
  fetchRelatedProducts,
} from "../../../lib/shopify";
import { useCartStore } from "../../../store/cartStore";
import RecentlyViewed from "../../../components/RecentlyViewed";

interface ProductImage {
  id: string;
  url: string;
  altText: string;
  width: number;
  height: number;
}

interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
  image?: { id: string; url: string; altText: string };
}

interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

interface Metafield {
  key: string;
  value: string;
  type: string;
  namespace: string;
}

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  images: { edges: { node: ProductImage }[] };
  variants: { edges: { node: ProductVariant }[] };
  options: ProductOption[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  metafields: Metafield[];
  seo: { title: string; description: string };
}

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  // DISABLED: Wishlist feature temporarily disabled
  // const [isInWishlist, setIsInWishlist] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const openCart = useCartStore((s) => s.openCart);

  // DISABLED: Wishlist feature temporarily disabled
  // // Add/Remove from wishlist function
  // const toggleWishlist = () => {
  //   if (!product) return;

  //   if (isInWishlist) {
  //     // Remove from wishlist
  //     if ((window as any).removeFromWishlist) {
  //       (window as any).removeFromWishlist(product.id);
  //       setIsInWishlist(false);
  //     }
  //   } else {
  //     // Add to wishlist
  //     if ((window as any).addToWishlist) {
  //       (window as any).addToWishlist({
  //         id: product.id,
  //         title: product.title,
  //         handle: product.handle,
  //         image: product.images.edges[0]?.node.url || "",
  //         price: parseFloat(product.priceRange.minVariantPrice.amount),
  //       });
  //       setIsInWishlist(true);
  //     }
  //   }
  // };

  // // Check if product is in wishlist
  // useEffect(() => {
  //   if (product && (window as any).isInWishlist) {
  //     const checkWishlist = () => {
  //       const inWishlist = (window as any).isInWishlist(product.id);
  //       setIsInWishlist(inWishlist);
  //     };

  //     // Check immediately
  //     checkWishlist();

  //     // Set up interval to check for changes
  //     const interval = setInterval(checkWishlist, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [product]);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);

    Promise.all([fetchProductByHandle(handle)]).then(([productData]) => {
      if (productData) {
        setProduct(productData);

        // Add product to recently viewed (with retry mechanism)
        const addToRecentlyViewed = () => {
          if ((window as any).addToRecentlyViewed) {
            (window as any).addToRecentlyViewed({
              id: productData.id,
              title: productData.title,
              handle: productData.handle,
              image: productData.images.edges[0]?.node.url || "",
              price: parseFloat(productData.priceRange.minVariantPrice.amount),
            });
            return true;
          }
          return false;
        };

        // Try immediately, then retry after a short delay if needed
        if (!addToRecentlyViewed()) {
          setTimeout(addToRecentlyViewed, 100);
        }

        // Set default selected variant
        if (productData.variants.edges.length > 0) {
          setSelectedVariant(productData.variants.edges[0].node);

          // Set default selected options
          const defaultOptions: Record<string, string> = {};
          productData.variants.edges[0].node.selectedOptions.forEach(
            (option: { name: string; value: string }) => {
              defaultOptions[option.name] = option.value;
            },
          );
          setSelectedOptions(defaultOptions);
        }

        // Fetch related products
        fetchRelatedProducts(
          productData.id,
          productData.tags,
          productData.vendor,
        ).then(setRelatedProducts);
      }
      setLoading(false);
    });
  }, [handle]);

  // Find variant based on selected options
  useEffect(() => {
    if (!product) return;

    const variant = product.variants.edges.find(({ node }) =>
      node.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value,
      ),
    );

    if (variant) {
      setSelectedVariant(variant.node);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    addToCart({
      id: selectedVariant.id,
      title: `${product.title}${selectedVariant.title !== "Default Title" ? ` - ${selectedVariant.title}` : ""}`,
      price: parseFloat(selectedVariant.price.amount),
      image:
        selectedVariant.image?.url || product.images.edges[0]?.node.url || "",
      quantity,
    });
    openCart();
  };

  const getMetafieldValue = (key: string): string => {
    const metafield = product?.metafields?.find((m) => m && m.key === key);
    return metafield?.value || "";
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPrice =
    selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount;
  const isOnSale =
    compareAtPrice && parseFloat(compareAtPrice) > parseFloat(currentPrice);
  const savings = isOnSale
    ? parseFloat(compareAtPrice) - parseFloat(currentPrice)
    : 0;

  return (
    <div className="min-h-screen bg-[#FBFBFB]">
      <div className="mx-auto px-4 md:px-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Images - Exactly 100vh */}
          <div className="flex h-screen flex-col justify-center py-4">
            <div className="flex h-full flex-col gap-3">
              {/* Main Image - Takes most of the space */}
              <motion.div
                className="flex-1 overflow-hidden bg-white"
                layoutId="main-image"
              >
                {product.images.edges.length > 0 && (
                  <Image
                    src={product.images.edges[selectedImageIndex].node.url}
                    alt={
                      product.images.edges[selectedImageIndex].node.altText ||
                      product.title
                    }
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                    priority
                  />
                )}
              </motion.div>

              {/* Thumbnail Images - Fixed height at bottom */}
              {product.images.edges.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.edges.map((image, index) => (
                    <button
                      key={image.node.id}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all md:h-20 md:w-20 ${
                        selectedImageIndex === index
                          ? "border-black shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image.node.url}
                        alt={image.node.altText || product.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex min-h-screen flex-col justify-start space-y-6 py-30">
            {/* Header */}
            <div>
              {/* <p className="font-neue-montreal-mono mb-2 text-sm text-black/60 uppercase">
                {product.vendor}
              </p> */}
              <h1 className="font-neue-montreal mb-2 text-2xl font-light md:text-3xl lg:text-4xl">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="font-neue-montreal-mono text-xl md:text-base">
                  ${parseFloat(currentPrice).toFixed(2)}{" "}
                  {selectedVariant?.price.currencyCode || "USD"}
                </span>
                {isOnSale && compareAtPrice && (
                  <>
                    <span className="text-base text-gray-500 line-through md:text-lg">
                      ${parseFloat(compareAtPrice).toFixed(2)}
                    </span>
                    <span className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 md:text-sm">
                      Save ${savings.toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="font-neue-montreal mb-6">
                {getMetafieldValue("long_description") ? (
                  <div
                    className="prose prose-gray prose-sm md:prose-base max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: getMetafieldValue("long_description"),
                    }}
                  />
                ) : product.descriptionHtml.length > 500 ? (
                  <div
                    className="prose prose-gray prose-sm md:prose-base max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                ) : (
                  <div
                    className="prose prose-gray prose-sm md:prose-base max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                  />
                )}
              </div>

              {/* Availability */}
              {/* <div className="mb-6 flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${
                    selectedVariant?.availableForSale
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {selectedVariant?.availableForSale
                    ? `In stock${selectedVariant.quantityAvailable > 0 ? ` (${selectedVariant.quantityAvailable} available)` : ""}`
                    : "Out of stock"}
                </span>
              </div> */}
            </div>

            {/* Product Options */}
            {product.options
              .filter((option) => option.values.length > 1)
              .map((option) => (
                <div key={option.id} className="space-y-3">
                  <label className="font-neue-montreal-mono text-sm text-black/80 uppercase">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <motion.button
                        key={value}
                        onClick={() => handleOptionChange(option.name, value)}
                        className={`cursor-pointer rounded-lg border px-3 py-2 text-sm transition-all md:px-4 ${
                          selectedOptions[option.name] === value
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}

            {/* Quantity */}
            <div className="mb-2 flex items-center justify-between">
              <label className="font-neue-montreal-mono text-sm text-black/80 uppercase">
                Quantity
              </label>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`h-10 w-10 rounded-lg transition-colors ${
                    quantity <= 1
                      ? "cursor-not-allowed text-gray-300"
                      : "cursor-pointer hover:bg-gray-50"
                  }`}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="font-neue-montreal-mono w-12 text-center font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`h-10 w-10 rounded-lg transition-colors ${
                    selectedVariant &&
                    selectedVariant.quantityAvailable > 0 &&
                    quantity >= selectedVariant.quantityAvailable
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "cursor-pointer hover:bg-gray-50"
                  }`}
                  disabled={Boolean(
                    selectedVariant &&
                      selectedVariant.quantityAvailable > 0 &&
                      quantity >= selectedVariant.quantityAvailable,
                  )}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
              className={`font-neue-montreal-mono w-full py-4 text-sm uppercase transition-all ${
                selectedVariant?.availableForSale
                  ? "cursor-pointer bg-black text-white hover:bg-black/90"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
              whileHover={
                selectedVariant?.availableForSale ? { scale: 1.02 } : {}
              }
              whileTap={
                selectedVariant?.availableForSale ? { scale: 0.98 } : {}
              }
            >
              {selectedVariant?.availableForSale
                ? "Add to Cart"
                : "Out of Stock"}
            </motion.button>

            {/* DISABLED: Wishlist feature temporarily disabled */}
            {/* Action Buttons */}
            {/* <div className="mt-4 flex flex-col gap-3 md:flex-row">
              <motion.button
                onClick={toggleWishlist}
                className={`w-full rounded-lg border py-3 text-sm font-medium transition-all ${
                  isInWishlist
                    ? "border-red-300 bg-red-50 text-red-700 hover:border-red-400"
                    : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isInWishlist ? "❤️" : "🤍"}
                {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
              </motion.button>
            </div> */}

            {/* Product Details Accordion */}
            <div className="border-t pt-6">
              <div className="space-y-2">
                {[
                  { key: "description", label: "Description" },
                  { key: "ingredients", label: "Ingredients" },
                  { key: "howToUse", label: "How to Use" },
                  { key: "benefits", label: "Benefits" },
                ].map(({ key, label }) => {
                  const isOpen = openAccordions.has(key);

                  return (
                    <div key={key} className="border-b border-gray-200">
                      <button
                        onClick={() => toggleAccordion(key)}
                        className="font-neue-montreal-mono flex w-full items-center justify-between py-4 text-xs text-gray-700 uppercase md:text-sm"
                      >
                        <span>{label}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-gray-500"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </motion.div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="pb-4">
                          <div className="prose prose-gray prose-sm md:prose-base font-neue-montreal max-w-none">
                            {key === "description" && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: product.descriptionHtml,
                                }}
                              />
                            )}
                            {key === "ingredients" && (
                              <div>
                                {getMetafieldValue("ingredients") ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: getMetafieldValue("ingredients"),
                                    }}
                                  />
                                ) : (
                                  <p className="text-gray-500">
                                    Ingredients information not available.
                                  </p>
                                )}
                              </div>
                            )}
                            {key === "howToUse" && (
                              <div>
                                {getMetafieldValue("how_to_use") ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: getMetafieldValue("how_to_use"),
                                    }}
                                  />
                                ) : (
                                  <p className="text-gray-500">
                                    Usage instructions not available.
                                  </p>
                                )}
                              </div>
                            )}
                            {key === "benefits" && (
                              <div>
                                {getMetafieldValue("benefits") ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: getMetafieldValue("benefits"),
                                    }}
                                  />
                                ) : (
                                  <p className="text-gray-500">
                                    Benefits information not available.
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t pt-16">
            <h2 className="font-neue-montreal mb-8 text-xl font-light md:text-2xl lg:text-3xl">
              You might also like
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <motion.a
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.handle}`}
                  className="group cursor-pointer space-y-3"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-white">
                    {relatedProduct.images.edges[0] && (
                      <Image
                        src={relatedProduct.images.edges[0].node.url}
                        alt={relatedProduct.title}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-neue-montreal-mono text-xs text-black/60 uppercase">
                      {relatedProduct.vendor}
                    </p>
                    <h3 className="font-neue-montreal text-sm font-light transition-colors group-hover:text-black/70">
                      {relatedProduct.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      $
                      {parseFloat(
                        relatedProduct.priceRange.minVariantPrice.amount,
                      ).toFixed(2)}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* Recently Viewed Products */}
        <RecentlyViewed />
      </div>
    </div>
  );
}
