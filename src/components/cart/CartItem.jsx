"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart();

  return (
    <li className="flex gap-4 border border-ink bg-paper p-3">
      <div className="relative size-20 shrink-0 border border-ink bg-white">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="80px"
          className="object-contain p-1"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold leading-tight">{item.title}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              Ukuran {item.size}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.key)}
            aria-label={`Hapus ${item.title} ukuran ${item.size} dari keranjang`}
            className="shrink-0 text-xs text-accent underline underline-offset-2"
          >
            Hapus
          </button>
        </div>

        <div className="flex items-center justify-between font-mono text-xs">
          <div className="flex items-center border border-ink">
            <button
              type="button"
              onClick={() => decreaseQty(item.key)}
              aria-label="Kurangi jumlah"
              className="size-7 hover:bg-ink hover:text-paper"
            >
              -
            </button>
            <span className="w-8 text-center" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => increaseQty(item.key)}
              aria-label="Tambah jumlah"
              className="size-7 hover:bg-ink hover:text-paper"
            >
              +
            </button>
          </div>
          <span className="font-bold">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
