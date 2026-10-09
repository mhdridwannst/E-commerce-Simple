"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatCategory, formatPrice } from "@/lib/format";
import { getSizes } from "@/lib/sizes";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [picking, setPicking] = useState(false); // panel ukuran terbuka?
  const [addedSize, setAddedSize] = useState(null); // ukuran yang baru ditambahkan
  const timer = useRef(null);
  const sizes = getSizes(product.category);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleSelectSize(size) {
    addToCart(product, size);
    setPicking(false);
    setAddedSize(size);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAddedSize(null), 1500);
  }

  const imageSizes = "(min-width: 1024px) 25vw, 50vw";

  return (
    <article
      onKeyDown={(e) => e.key === "Escape" && setPicking(false)}
      className="group flex h-full flex-col border border-ink bg-white transition-shadow hover:shadow-[4px_4px_0_0_var(--color-ink)]"
    >
      <div className="relative aspect-square overflow-hidden border-b border-ink bg-neutral-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes={imageSizes}
          className={`object-contain p-3 transition-opacity duration-300 ${
            product.hoverImage
              ? "group-hover:opacity-0 group-focus-within:opacity-0"
              : ""
          }`}
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt=""
            fill
            sizes={imageSizes}
            className="object-contain p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
        )}
        {product.discount >= 5 && (
          <span className="absolute left-3 top-3 bg-accent px-2 py-1 font-mono text-xs text-white">
            -{product.discount}%
          </span>
        )}

        {/* Panel ukuran: menimpa bagian bawah foto, jadi tinggi kartu tidak berubah */}
        {picking && (
          <div className="absolute inset-x-0 bottom-0 border-t border-ink bg-white p-3">
            <p className="mb-2 font-mono text-xs text-muted">
              Pilih ukuran (EU)
            </p>
            <div
              role="group"
              aria-label={`Ukuran untuk ${product.title}`}
              className="grid grid-cols-4 gap-1"
            >
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  size="sm"
                  className="px-0"
                  onClick={() => handleSelectSize(size)}
                  aria-label={`Ukuran ${size}`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="font-mono text-xs text-muted">
          {formatCategory(product.category)}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {product.title}
        </h3>
      </div>

      <div className="mx-4 flex flex-col gap-3 border-t border-dashed border-ink/30 pb-4 pt-3">
        <span className="font-mono text-sm font-bold">
          {formatPrice(product.price)}
        </span>
        <Button
          size="sm"
          variant={picking ? "outline" : "solid"}
          className="w-full"
          aria-expanded={picking}
          onClick={() => setPicking((open) => !open)}
        >
          <span aria-live="polite">
            {picking
              ? "Batal"
              : addedSize
                ? `Ukuran ${addedSize} ditambahkan`
                : "+ Tambah"}
          </span>
        </Button>
      </div>
    </article>
  );
}
