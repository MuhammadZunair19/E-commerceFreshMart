"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/cart-store";

export function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const max = Math.max(product.stock, 1);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <div className="flex h-12 items-center rounded-lg border border-forest/10 bg-white">
        <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid h-12 w-12 place-items-center" aria-label="Decrease quantity">
          <Minus className="h-5 w-5" />
        </button>
        <span className="grid h-12 w-12 place-items-center font-black">{quantity}</span>
        <button onClick={() => setQuantity((value) => Math.min(max, value + 1))} className="grid h-12 w-12 place-items-center" aria-label="Increase quantity">
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <button
        disabled={product.stock === 0}
        onClick={() => {
          addItem(product, quantity);
          toast.success(`${quantity} x ${product.name} added`);
        }}
        className="inline-flex h-12 items-center gap-2 rounded-lg bg-forest px-6 font-black text-white transition hover:bg-leaf disabled:cursor-not-allowed disabled:bg-muted/40"
      >
        <ShoppingCart className="h-5 w-5" />
        Add to cart
      </button>
      <button className="grid h-12 w-12 place-items-center rounded-lg border border-forest/10 bg-white text-forest" aria-label="Add to wishlist">
        <Heart className="h-5 w-5" />
      </button>
    </div>
  );
}
