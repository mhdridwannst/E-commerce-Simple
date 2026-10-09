"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatCategory } from "@/lib/format";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";

const SORT_OPTIONS = [
  { value: "default", label: "Urutan awal" },
  { value: "price-asc", label: "Harga terendah" },
  { value: "price-desc", label: "Harga tertinggi" },
];

export default function ProductBrowser({ products }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const deferredQuery = useDeferredValue(query);

  // Kategori dibuat otomatis dari data, tidak perlu ditulis manual
  const categories = useMemo(() => {
    const slugs = [...new Set(products.map((p) => p.category))];
    return [
      { value: "all", label: "Semua" },
      ...slugs.map((slug) => ({ value: slug, label: formatCategory(slug) })),
    ];
  }, [products]);

  const visible = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        p.title.toLowerCase().includes(q),
    );
    if (sort === "price-asc")
      return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, category, deferredQuery, sort]);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setSort("default");
  }

  return (
    <>
      <section className="mb-8 flex flex-col justify-between gap-6 border-b-2 border-ink pb-8 md:flex-row md:items-end">
        <div>
          <h1 className="font-mono text-5xl font-bold uppercase md:text-4xl">
            Brand New Day
          </h1>
          <p className="mt-2 font-mono text-sm text-muted">
            Welcome to our store!
          </p>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </section>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CategoryFilter
          categories={categories}
          value={category}
          onChange={setCategory}
        />

        <div className="flex items-center gap-4 font-mono text-xs">
          <p aria-live="polite">{visible.length} produk</p>
          <label className="flex items-center gap-2">
            <span className="text-muted">Urutkan</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 border border-ink bg-transparent px-2"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="border border-dashed border-ink py-20 text-center font-mono text-sm">
          Produk gagal dimuat. Coba muat ulang halaman.
        </p>
      ) : visible.length === 0 ? (
        <div className="border border-dashed border-ink py-20 text-center">
          <p className="font-mono text-sm">Tidak ada produk yang cocok.</p>
          <Button className="mt-4" variant="outline" onClick={resetFilters}>
            Reset filter
          </Button>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          {visible.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
