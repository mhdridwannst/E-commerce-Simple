"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { items, isOpen, closeCart, clearCart, totalItems, totalPrice } = useCart();
  const dialogRef = useRef(null);

  // Saat terbuka: Esc menutup, scroll halaman dikunci, fokus pindah ke drawer
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={closeCart} aria-hidden="true" />

      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        tabIndex={-1}
        className="animate-drawer relative flex h-full w-full max-w-md flex-col border-l border-ink bg-white outline-none"
      >
        <header className="flex items-center justify-between border-b border-ink p-6">
          <h2 id="cart-title" className="font-mono text-lg font-bold">
            Keranjang ({totalItems})
          </h2>
          <Button variant="outline" size="sm" onClick={closeCart}>
            Tutup
          </Button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 p-6">
            <p className="text-sm text-muted">
              Keranjangmu masih kosong. Produk yang kamu tambahkan akan muncul di sini.
            </p>
            <Button variant="outline" onClick={closeCart}>
              Lanjut belanja
            </Button>
          </div>
        ) : (
          <ul className="flex-1 space-y-3 overflow-y-auto p-6">
            {items.map((item) => (
              <CartItem key={item.key} item={item} />
            ))}
          </ul>
        )}

        <footer className="space-y-4 border-t border-ink p-6">
          <div className="flex items-center justify-between font-mono text-base font-bold">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Button size="lg" className="w-full" disabled={items.length === 0}>
            Checkout
          </Button>
          {items.length > 0 && (
            <Button variant="link" className="w-full" onClick={clearCart}>
              Kosongkan keranjang
            </Button>
          )}
        </footer>
      </aside>
    </div>
  );
}
