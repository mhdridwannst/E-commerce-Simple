"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const STORAGE_KEY = "wannn-store:cart:v2";
const CartContext = createContext(null);

// Reducer murni (tidak memutasi state), aman untuk React Strict Mode
function cartReducer(items, action) {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const exists = items.some((i) => i.key === action.item.key);
      if (exists) {
        return items.map((i) =>
          i.key === action.item.key ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...items, { ...action.item, quantity: 1 }];
    }
    case "increase":
      return items.map((i) =>
        i.key === action.key ? { ...i, quantity: i.quantity + 1 } : i,
      );
    case "decrease":
      return items
        .map((i) =>
          i.key === action.key ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0);
    case "remove":
      return items.filter((i) => i.key !== action.key);
    case "clear":
      return [];
    default:
      return items;
  }
}

function isValidItem(i) {
  return (
    i &&
    typeof i.key === "string" &&
    typeof i.id === "number" &&
    typeof i.size === "number" &&
    typeof i.title === "string" &&
    typeof i.price === "number" &&
    typeof i.quantity === "number" &&
    i.quantity > 0
  );
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Muat keranjang dari localStorage sekali saat pertama render di browser
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved)) {
          dispatch({ type: "hydrate", items: saved.filter(isValidItem) });
        }
      }
    } catch {
      // data rusak atau storage diblokir: mulai dari keranjang kosong
    }
    setHydrated(true);
  }, []);

  // Simpan setiap perubahan (setelah proses muat selesai, supaya tidak menimpa data)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // abaikan jika storage penuh atau diblokir
    }
  }, [items, hydrated]);

  const addToCart = useCallback((product, size) => {
    dispatch({
      type: "add",
      item: {
        key: `${product.id}:${size}`,
        id: product.id,
        size,
        title: product.title,
        price: product.price,
        image: product.image,
      },
    });
  }, []);

  const increaseQty = useCallback(
    (key) => dispatch({ type: "increase", key }),
    [],
  );
  const decreaseQty = useCallback(
    (key) => dispatch({ type: "decrease", key }),
    [],
  );
  const removeFromCart = useCallback(
    (key) => dispatch({ type: "remove", key }),
    [],
  );
  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      isOpen,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items,
      isOpen,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}
