"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-xl font-bold uppercase">
          Wannn Store
        </Link>

        <Button
          variant="outline"
          onClick={openCart}
          aria-label={`Buka keranjang, ${totalItems} item`}
        >
          Keranjang ({totalItems})
        </Button>
      </div>
    </header>
  );
}
