"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart, totalItems, totalPrice, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#f9f9f9]/90 backdrop-blur-md border-b border-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-xl font-black tracking-tighter uppercase">
          Wannn Store
        </span>

        <button
          onClick={() => setIsOpen(true)}
          className="font-mono text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          CART ({totalItems})
        </button>
      </div>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white border-l-2 border-black h-screen p-6 flex flex-col z-10">
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-4 border-b-2 border-black">
              <h2 className="font-mono text-lg font-black uppercase tracking-tight">
                SHOPPING CART ({totalItems})
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="font-mono text-xs uppercase border border-black px-2 py-1 hover:bg-black hover:text-white"
              >
                CLOSE
              </button>
            </div>

            {/* List Barang */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
              {cart.length === 0 ? (
                <p className="font-mono text-xs text-neutral-500 uppercase">
                  KERANJANG MASIH KOSONG.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="border border-black p-3 bg-[#fcfcfc]"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-xs uppercase leading-tight">
                        {item.title}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="font-mono text-[10px] text-red-600 uppercase underline"
                      >
                        HAPUS
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-2 pt-2 border-t border-dashed border-neutral-300 font-mono text-xs">
                      <span>QTY: {item.quantity}</span>
                      <span className="font-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Footer */}
            <div className="border-t-2 border-black pt-4 bg-white">
              <div className="flex justify-between font-mono font-black text-base mb-4">
                <span>TOTAL:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                className="w-full bg-black text-white py-3 font-mono text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
