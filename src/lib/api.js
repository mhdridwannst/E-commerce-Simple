const BASE_URL = "https://dummyjson.com/products/category";
const CATEGORIES = ["mens-shoes", "womens-shoes"];

// Harga dari API dalam USD. Konversi ke Rupiah HANYA di sini,
// sehingga seluruh aplikasi bekerja dengan satu satuan (IDR).
const USD_TO_IDR = 16000;
const toIdr = (usd) => Math.round((usd * USD_TO_IDR) / 1000) * 1000;

function normalize(p) {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    price: toIdr(p.price),
    discount: Math.round(p.discountPercentage ?? 0),
    image: p.thumbnail,
    // Foto kedua untuk efek hover (kalau ada dan berbeda dari thumbnail)
    hoverImage: p.images?.find((src) => src !== p.thumbnail) ?? null,
  };
}

export async function getProducts() {
  // allSettled: kalau satu kategori gagal, kategori lain tetap tampil
  const results = await Promise.allSettled(
    CATEGORIES.map(async (category) => {
      const res = await fetch(`${BASE_URL}/${category}?limit=0`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error(`${category}: HTTP ${res.status}`);
      const data = await res.json();
      return data.products ?? [];
    }),
  );

  return results
    .flatMap((result) => {
      if (result.status === "fulfilled") return result.value;
      console.warn("Gagal mengambil produk:", result.reason);
      return [];
    })
    .map(normalize);
}
