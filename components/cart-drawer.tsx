"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { formatPkr } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<"FRESH10" | "FREEDEL" | null>(null);
  const subtotal = items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);
  const couponDiscount = appliedCoupon === "FRESH10" ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 3000 || subtotal === 0 || appliedCoupon === "FREEDEL" ? 0 : 199;
  const tax = Math.round(subtotal * 0.03);
  const total = Math.max(0, subtotal - couponDiscount + delivery + tax);

  function applyCoupon() {
    const normalized = coupon.trim().toUpperCase();
    if (normalized === "FRESH10" || normalized === "FREEDEL") {
      setAppliedCoupon(normalized);
      toast.success(`${normalized} applied`);
      return;
    }
    toast.error("Try FRESH10 or FREEDEL");
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="border-b border-forest/10 px-6 py-5">
          <SheetDescription className="text-xs font-bold uppercase tracking-[0.18em] text-fresh">Basket</SheetDescription>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

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
                <Card key={item.product.id} className="grid grid-cols-[76px_1fr] gap-4 p-3 shadow-none">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-cream">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="76px" />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-ink">{item.product.name}</h3>
                        <p className="text-xs text-muted">{item.product.weight}</p>
                      </div>
                      <Button onClick={() => removeItem(item.product.id)} variant="ghost" size="icon" className="h-8 w-8 text-danger" aria-label={`Remove ${item.product.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-forest/10">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="grid h-8 w-9 place-items-center text-sm font-black">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Increase quantity">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-black text-forest">{formatPkr((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-forest/10 p-6">
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input value={coupon} onChange={(event) => setCoupon(event.target.value)} className="pl-9" placeholder="FRESH10 or FREEDEL" />
            </div>
            <Button variant="outline" onClick={applyCoupon}>Apply</Button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-bold">{formatPkr(subtotal)}</span></div>
            {couponDiscount > 0 && <div className="flex justify-between"><span className="text-muted">Coupon</span><span className="font-bold text-forest">-{formatPkr(couponDiscount)}</span></div>}
            <div className="flex justify-between"><span className="text-muted">Estimated tax</span><span className="font-bold">{formatPkr(tax)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="font-bold">{delivery === 0 ? "Free" : formatPkr(delivery)}</span></div>
            <Separator />
            <div className="flex justify-between pt-1 text-lg"><span className="font-black text-forest">Total</span><span className="font-black text-forest">{formatPkr(total)}</span></div>
          </div>
          <Button
            asChild
            size="lg"
            className={items.length === 0 ? "mt-5 w-full pointer-events-none opacity-50" : "mt-5 w-full"}
          >
            <Link href="/checkout" onClick={closeCart}>Checkout</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
