"use client";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full md:max-w-sm">
      <label htmlFor="product-search" className="sr-only">
        Cari produk
      </label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari produk..."
        autoComplete="off"
        className="w-full border-b-2 border-ink bg-transparent py-2 font-mono text-sm placeholder:text-muted focus-visible:outline-offset-4"
      />
    </div>
  );
}
