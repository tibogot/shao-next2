"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";

type WishlistItem = {
  id: string;
  title: string;
  handle: string;
  image: string;
  price: number;
  addedAt: number;
};

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCartStore();

  useEffect(() => {
    // Load wishlist from localStorage
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try {
        setWishlistItems(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing wishlist:", error);
      }
    }
  }, []);

  const saveWishlist = (items: WishlistItem[]) => {
    localStorage.setItem("wishlist", JSON.stringify(items));
    setWishlistItems(items);
  };

  const addToWishlist = (item: Omit<WishlistItem, "addedAt">) => {
    const newItem = { ...item, addedAt: Date.now() };
    const updated = [
      newItem,
      ...wishlistItems.filter((i) => i.id !== item.id),
    ].slice(0, 50); // Max 50 items
    saveWishlist(updated);
  };

  const removeFromWishlist = (id: string) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    saveWishlist(updated);
  };

  const moveToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    removeFromWishlist(item.id);
  };

  const clearWishlist = () => {
    saveWishlist([]);
  };

  // Expose functions globally
  useEffect(() => {
    (window as any).addToWishlist = addToWishlist;
    (window as any).isInWishlist = (id: string) =>
      wishlistItems.some((item) => item.id === id);
    (window as any).getWishlistItems = () => wishlistItems;
    (window as any).openWishlist = () => setIsOpen(true);
    (window as any).removeFromWishlist = removeFromWishlist;
  }, [wishlistItems]);

  // Handle scroll blocking when wishlist is open
  useEffect(() => {
    if (isOpen) {
      // Block scroll when wishlist is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when wishlist closes
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is restored
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Wishlist Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
        aria-label="Wishlist"
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
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        {wishlistItems.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {wishlistItems.length}
          </span>
        )}
      </button>

      {/* Wishlist Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-20"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-h-[75vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">
                    Wishlist ({wishlistItems.length})
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
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

                {/* Wishlist Items */}
                {wishlistItems.length === 0 ? (
                  <div className="text-center text-gray-500">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <p className="mt-4 text-lg">Your wishlist is empty</p>
                    <p className="text-sm">Start adding products you love!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlistItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4 rounded-lg border border-gray-200 p-4"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-gray-600">
                            €{item.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400">
                            Added {new Date(item.addedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => moveToCart(item)}
                            className="rounded bg-black px-3 py-2 text-sm text-white hover:bg-gray-800"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item.id)}
                            className="rounded bg-red-100 px-3 py-2 text-sm text-red-700 hover:bg-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                {wishlistItems.length > 0 && (
                  <div className="mt-6 flex justify-between border-t pt-4">
                    <button
                      onClick={clearWishlist}
                      className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:border-red-500 hover:text-red-700"
                    >
                      Clear Wishlist
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
