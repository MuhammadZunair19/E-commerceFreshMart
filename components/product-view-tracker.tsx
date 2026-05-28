"use client";

import { useEffect } from "react";
import type { Product } from "@/lib/data";
import { useCustomerStore } from "@/lib/customer-store";

export function ProductViewTracker({ product }: { product: Product }) {
  const addRecentlyViewed = useCustomerStore((state) => state.addRecentlyViewed);

  useEffect(() => {
    addRecentlyViewed(product);
  }, [addRecentlyViewed, product]);

  return null;
}
