"use client";
import { useCartStore } from "../store/cartStore";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  } = useCartStore();

  const [savedItems, setSavedItems] = useState<typeof items>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  // Handle mount/unmount for animation
  useEffect(() => {
    if (isCartOpen) {
      setVisible(true);
      // Wait for next animation frame to trigger the slide-in
      requestAnimationFrame(() => setShouldShow(true));
    } else if (visible) {
      setShouldShow(false);
      // Wait for animation before unmounting
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isCartOpen]);

  // Focus trap for accessibility (optional)
  useEffect(() => {
    if (isCartOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isCartOpen]);

  // Handle scroll blocking when cart is open
  useEffect(() => {
    if (isCartOpen) {
      // Block scroll when cart is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll when cart closes
      document.body.style.overflow = "unset";
    }

    // Cleanup function to ensure scroll is restored
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Load saved items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("saved-for-later");
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing saved items:", error);
      }
    }
  }, []);

  const saveForLater = (item: (typeof items)[0]) => {
    setSavedItems((prev) => [...prev, item]);
    removeFromCart(item.id);
    // Save to localStorage
    localStorage.setItem(
      "saved-for-later",
      JSON.stringify([...savedItems, item]),
    );
  };

  const moveToCart = (item: (typeof savedItems)[0]) => {
    useCartStore.getState().addToCart(item);
    const updated = savedItems.filter((i) => i.id !== item.id);
    setSavedItems(updated);
    localStorage.setItem("saved-for-later", JSON.stringify(updated));
  };

  const removeSavedItem = (id: string) => {
    const updated = savedItems.filter((i) => i.id !== id);
    setSavedItems(updated);
    localStorage.setItem("saved-for-later", JSON.stringify(updated));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over €50
  const total = subtotal + shipping;

  if (!visible && !isCartOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/30"
      onClick={closeCart}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={`flex h-full w-full max-w-md flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out ${shouldShow ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold">
            Shopping Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
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

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500"
              >
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="mt-4 text-lg">Your cart is empty</p>
                <p className="text-sm">Start shopping to add items</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 rounded-lg border border-gray-200 p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">€{item.price}</p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <p className="font-medium">
                        €{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex gap-1">
                        <button
                          onClick={() => saveForLater(item)}
                          className="cursor-pointer rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cursor-pointer rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Saved for Later */}
          {savedItems.length > 0 && (
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-medium text-gray-700">
                Saved for Later
              </h3>
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-3 flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">€{item.price}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => moveToCart(item)}
                      className="cursor-pointer rounded bg-black px-2 py-1 text-xs text-white hover:bg-gray-800"
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeSavedItem(item.id)}
                      className="cursor-pointer rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-gray-500">
                  Free shipping on orders over €50
                </div>
              )}
              <div className="border-t pt-3 text-lg font-semibold">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full cursor-pointer rounded-lg bg-black py-3 text-white transition-colors hover:bg-gray-800">
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full cursor-pointer rounded-lg border border-gray-300 py-3 text-gray-700 transition-colors hover:border-black hover:text-black"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
