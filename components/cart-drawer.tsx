"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { cn, formatPkr } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);
  const delivery = subtotal > 3000 || subtotal === 0 ? 0 : 199;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + delivery + tax;

  return (
    <div className={cn("fixed inset-0 z-50 transition", isOpen ? "pointer-events-auto" : "pointer-events-none")}>
      <button
        className={cn("absolute inset-0 bg-ink/40 transition-opacity", isOpen ? "opacity-100" : "opacity-0")}
        onClick={closeCart}
        aria-label="Close cart overlay"
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-soft transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-forest/10 px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-fresh">Basket</p>
            <h2 className="text-xl font-black text-forest">Shopping Cart</h2>
          </div>
          <button onClick={closeCart} className="grid h-10 w-10 place-items-center rounded-lg border border-forest/10 text-forest" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="text-lg font-black text-forest">Your cart is fresh and empty.</p>
                <p className="mt-2 text-sm text-muted">Add a few groceries to start checkout.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="grid grid-cols-[76px_1fr] gap-4 rounded-lg border border-forest/10 p-3">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="76px" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink">{item.product.name}</h3>
                        <p className="text-xs text-muted">{item.product.weight}</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-danger" aria-label={`Remove ${item.product.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-forest/10">
                        <button className="grid h-8 w-8 place-items-center" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="grid h-8 w-9 place-items-center text-sm font-black">{item.quantity}</span>
                        <button className="grid h-8 w-8 place-items-center" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-black text-forest">{formatPkr((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-forest/10 p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-bold">{formatPkr(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Estimated tax</span><span className="font-bold">{formatPkr(tax)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="font-bold">{delivery === 0 ? "Free" : formatPkr(delivery)}</span></div>
            <div className="flex justify-between border-t border-forest/10 pt-3 text-lg"><span className="font-black text-forest">Total</span><span className="font-black text-forest">{formatPkr(total)}</span></div>
          </div>
          <Link
            href="/checkout"
            onClick={closeCart}
            className={cn("mt-5 grid h-12 place-items-center rounded-lg bg-forest font-black text-white", items.length === 0 && "pointer-events-none opacity-50")}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
