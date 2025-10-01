"use client";
import { useCartStore } from "../../store/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <button
              onClick={clearCart}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Subtotal</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="flex items-center gap-3 p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <Link
                        href={`/product/${item.id}`}
                        className="font-semibold hover:underline"
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td className="p-2">{item.price.toFixed(2)}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">
                      {(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded bg-red-400 px-3 py-1 text-white hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-end">
            <div className="text-xl font-bold">Total: {total.toFixed(2)}</div>
          </div>
        </>
      )}
    </div>
  );
}
