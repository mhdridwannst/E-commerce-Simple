const SIZES_BY_CATEGORY = {
  "mens-shoes": [39, 40, 41, 42, 43, 44, 45],
  "womens-shoes": [36, 37, 38, 39, 40, 41],
};

const DEFAULT_SIZES = [38, 39, 40, 41, 42, 43];

export function getSizes(category) {
  return SIZES_BY_CATEGORY[category] ?? DEFAULT_SIZES;
}
