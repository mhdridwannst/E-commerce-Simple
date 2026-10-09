import { getProducts } from "@/lib/api";
import ProductBrowser from "@/components/product/ProductBrowser";

// Server component: data diambil di server, jadi tidak ada flash "loading"
export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <ProductBrowser products={products} />
    </main>
  );
}
