/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border border-black bg-white p-4 flex flex-col justify-between group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
      <div>
        <div className="w-full h-52 bg-neutral-100 border-b border-black mb-4 overflow-hidden flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 block mb-1">
          {product.category}
        </span>
        <h3 className="font-bold text-sm tracking-tight line-clamp-2 uppercase mb-2">
          {product.title}
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-neutral-300 flex items-center justify-between">
        <span className="font-mono text-base font-black">${product.price}</span>
        <button
          onClick={() => addToCart(product)}
          className="font-mono text-xs bg-black text-white px-3 py-1.5 uppercase tracking-wider hover:bg-neutral-800 transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
