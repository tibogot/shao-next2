"use client";
import { useCartStore } from "../store/cartStore";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function EnhancedCart() {
  const {
    items,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart,
    updateQuantity,
  } = useCartStore();
  const [savedItems, setSavedItems] = useState<typeof items>([]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const saveForLater = (item: (typeof items)[0]) => {
    setSavedItems((prev) => [...prev, item]);
    removeFromCart(item.id);
  };

  const moveToCart = (item: (typeof savedItems)[0]) => {
    useCartStore.getState().addToCart(item);
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const removeSavedItem = (id: string) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over €50
  const total = subtotal + shipping;

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

  if (!isCartOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50"
      onClick={closeCart}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold">
              Shopping Cart ({totalItems})
            </h2>
            <button
              onClick={closeCart}
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
                  <p className="text-sm">Add some products to get started</p>
                </motion.div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-4 flex items-center gap-4 rounded-lg border border-gray-200 p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 rounded object-cover"
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
                          className="cursor-pointer rounded p-1 text-xs text-blue-600 hover:bg-blue-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cursor-pointer rounded p-1 text-xs text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Saved Items */}
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
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-gray-600">€{item.price}</p>
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
                        className="cursor-pointer rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-2 text-sm">
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
                <div className="border-t border-gray-200 pt-2 text-lg font-semibold">
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
      </motion.div>
    </motion.div>
  );
}
