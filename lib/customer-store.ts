"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data";

type CustomerState = {
  wishlistIds: string[];
  recentlyViewed: Product[];
  searchHistory: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addRecentlyViewed: (product: Product) => void;
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
};

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      wishlistIds: ["p1", "p3", "p5"],
      recentlyViewed: [],
      searchHistory: [],
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlistIds: state.wishlistIds.includes(productId)
            ? state.wishlistIds.filter((id) => id !== productId)
            : [...state.wishlistIds, productId]
        })),
      isWishlisted: (productId) => get().wishlistIds.includes(productId),
      addRecentlyViewed: (product) =>
        set((state) => ({
          recentlyViewed: [product, ...state.recentlyViewed.filter((item) => item.id !== product.id)].slice(0, 8)
        })),
      addSearchTerm: (term) => {
        const normalized = term.trim();
        if (!normalized) return;
        set((state) => ({
          searchHistory: [normalized, ...state.searchHistory.filter((item) => item.toLowerCase() !== normalized.toLowerCase())].slice(0, 8)
        }));
      },
      clearSearchHistory: () => set({ searchHistory: [] })
    }),
    { name: "freshmart-customer" }
  )
);
