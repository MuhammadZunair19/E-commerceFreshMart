"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/cart-store";
import { formatPkr } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <article className="group overflow-hidden rounded-lg border border-forest/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-cream">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw" />
        {discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-danger px-3 py-1 text-xs font-black text-white">{discount}% off</span>}
        {product.organic && <span className="absolute bottom-3 left-3 rounded-full bg-fresh px-3 py-1 text-xs font-black text-forest">Organic</span>}
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">{product.brand}</p>
            <Link href={`/products/${product.slug}`} className="mt-1 block text-lg font-black text-ink hover:text-forest">
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-muted">{product.weight}</p>
          </div>
          <button className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-forest/10 text-forest" aria-label={`Add ${product.name} to wishlist`}>
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="font-bold">{product.rating}</span>
          <span className="text-muted">({product.reviews})</span>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xl font-black text-forest">{formatPkr(product.salePrice ?? product.price)}</p>
            {product.salePrice && <p className="text-sm text-muted line-through">{formatPkr(product.price)}</p>}
          </div>
          <button
            disabled={product.stock === 0}
            onClick={() => {
              addItem(product);
              toast.success(`${product.name} added to cart`);
            }}
            className="grid h-11 w-11 place-items-center rounded-lg bg-forest text-white transition hover:bg-leaf disabled:cursor-not-allowed disabled:bg-muted/40"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
