import "./globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Wannn Store",
  description: "E-Commerce by Wannn Sion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#f9f9f9] text-[#111111] antialiased selection:bg-black selection:text-white">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
