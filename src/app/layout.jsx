import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: "Wannn Store",
  description: "E-Commerce by Wannn Sion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${archivo.variable} ${spaceMono.variable} flex min-h-screen flex-col bg-paper font-sans text-ink antialiased selection:bg-ink selection:text-paper`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
