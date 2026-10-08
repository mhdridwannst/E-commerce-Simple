"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetching Data
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.warn("Gagal fetch API, menggunakan dummy data:", error);
        setProducts(DUMMY_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filtering / Searching
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12">
        {/* Header Section */}
        <section className="mb-12 border-b-2 border-black pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-mono text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Welcome
            </h1>
            <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-2">
              Habiskan uangmu di sini sobat ^_^
            </p>
          </div>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </section>

        {/* Product Grid */}
        {loading ? (
          <div className="font-mono text-sm tracking-widest uppercase py-20 text-center animate-pulse">
            LOADING_DATA...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="font-mono text-sm tracking-widest uppercase py-20 text-center text-neutral-500">
            PRODUK TIDAK DITEMUKAN.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-black py-6 text-center font-mono text-xs text-neutral-500 uppercase tracking-widest">
        WANNN STORE 2026
      </footer>
    </div>
  );
}
