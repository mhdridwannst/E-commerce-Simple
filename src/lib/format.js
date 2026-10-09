const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const formatPrice = (idr) => rupiah.format(idr);

const CATEGORY_LABELS = {
  "mens-shoes": "Sepatu pria",
  "womens-shoes": "Sepatu wanita",
};

export function formatCategory(slug) {
  return CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " ");
}
