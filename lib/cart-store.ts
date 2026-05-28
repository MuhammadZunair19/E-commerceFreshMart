"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.min(product.stock || 1, item.quantity + quantity) }
                  : item
              ),
              isOpen: true
            };
          }

          return {
            items: [...state.items, { product, quantity: Math.min(product.stock || 1, quantity) }],
            isOpen: true
          };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(1, Math.min(item.product.stock || 1, quantity)) }
              : item
          )
        })),
      clearCart: () => set({ items: [] })
    }),
    { name: "freshmart-cart" }
  )
);
