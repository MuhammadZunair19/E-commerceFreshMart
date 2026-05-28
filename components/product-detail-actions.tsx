"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/cart-store";
import { useCustomerStore } from "@/lib/customer-store";
import { Button } from "@/components/ui/button";

export function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCustomerStore((state) => state.toggleWishlist);
  const isWishlisted = useCustomerStore((state) => state.isWishlisted(product.id));
  const max = Math.max(product.stock, 1);

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <div className="flex h-12 items-center rounded-lg border border-forest/10 bg-white">
        <Button onClick={() => setQuantity((value) => Math.max(1, value - 1))} variant="ghost" size="icon" className="h-12 w-12" aria-label="Decrease quantity">
          <Minus className="h-5 w-5" />
        </Button>
        <span className="grid h-12 w-12 place-items-center font-black">{quantity}</span>
        <Button onClick={() => setQuantity((value) => Math.min(max, value + 1))} variant="ghost" size="icon" className="h-12 w-12" aria-label="Increase quantity">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <Button
        disabled={product.stock === 0}
        onClick={() => {
          addItem(product, quantity);
          toast.success(`${quantity} x ${product.name} added`);
        }}
        size="lg"
      >
        <ShoppingCart className="h-5 w-5" />
        Add to cart
      </Button>
      <Button
        variant={isWishlisted ? "secondary" : "outline"}
        size="icon"
        className="h-12 w-12"
        onClick={() => {
          toggleWishlist(product.id);
          toast.success(isWishlisted ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`);
        }}
        aria-label={`${isWishlisted ? "Remove" : "Add"} wishlist`}
      >
        <Heart className={isWishlisted ? "h-5 w-5 fill-danger text-danger" : "h-5 w-5"} />
      </Button>
    </div>
  );
}
