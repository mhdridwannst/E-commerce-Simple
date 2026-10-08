"use client";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="CARI PRODUK..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-transparent border-b-2 border-black py-2 pr-4 font-mono text-sm uppercase tracking-wide focus:outline-none focus:border-neutral-500 placeholder:text-neutral-400 placeholder:font-sans"
      />
    </div>
  );
}
