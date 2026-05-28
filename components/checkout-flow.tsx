"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Home, Mail, MapPin, Truck } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { formatPkr } from "@/lib/utils";

const steps = ["Address", "Delivery", "Review", "Confirmation"];

export function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const { items, clearCart } = useCartStore();
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0), [items]);
  const delivery = subtotal > 3000 || subtotal === 0 ? 0 : 199;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + delivery + tax;

  function placeOrder() {
    clearCart();
    setStep(3);
    toast.success("Order FM-2026-00042 placed");
  }

  return (
    <div className="container-x py-8 lg:py-12">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Checkout</p>
        <h1 className="mt-2 text-4xl font-black text-forest md:text-5xl">Complete your order</h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-forest/10 bg-white p-6 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-4">
            {steps.map((label, index) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`grid h-8 w-8 place-items-center rounded-full text-sm font-black ${index <= step ? "bg-forest text-white" : "bg-cream text-muted"}`}>
                  {index < step ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                <span className="text-sm font-bold">{label}</span>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="mt-8 grid gap-4">
              <CheckoutInput icon={Mail} label="Email" placeholder="you@example.com" />
              <CheckoutInput icon={Home} label="Full name" placeholder="Customer name" />
              <CheckoutInput icon={MapPin} label="Delivery address" placeholder="House, street, area, city" />
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["09:00 - 12:00", "12:00 - 15:00", "18:00 - 21:00"].map((slot, index) => (
                <button key={slot} className={`rounded-lg border p-5 text-left ${index === 0 ? "border-forest bg-cream" : "border-forest/10"}`}>
                  <Truck className="h-6 w-6 text-forest" />
                  <p className="mt-3 font-black text-forest">Tomorrow</p>
                  <p className="text-sm text-muted">{slot}</p>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between rounded-lg bg-cream p-4">
                  <div>
                    <p className="font-black">{item.product.name}</p>
                    <p className="text-sm text-muted">{item.quantity} x {formatPkr(item.product.salePrice ?? item.product.price)}</p>
                  </div>
                  <p className="font-black text-forest">{formatPkr((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 rounded-lg bg-cream p-8 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest text-white">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-2xl font-black text-forest">Order confirmed</h2>
              <p className="mt-2 text-muted">Your COD order FM-2026-00042 has been queued for confirmation.</p>
            </div>
          )}

          {step < 3 && (
            <button
              onClick={() => (step === 2 ? placeOrder() : setStep((value) => value + 1))}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-lg bg-forest px-6 font-black text-white"
            >
              {step === 2 ? "Place COD order" : "Continue"}
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </section>

        <aside className="h-fit rounded-lg border border-forest/10 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-forest">Order summary</h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-bold">{formatPkr(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Tax estimate</span><span className="font-bold">{formatPkr(tax)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="font-bold">{delivery === 0 ? "Free" : formatPkr(delivery)}</span></div>
            <div className="flex justify-between border-t border-forest/10 pt-4 text-lg"><span className="font-black text-forest">Total</span><span className="font-black text-forest">{formatPkr(total)}</span></div>
          </div>
          <div className="mt-5 rounded-lg bg-cream p-4 text-sm text-muted">Free delivery applies above PKR 3,000. Payment method: Cash on Delivery.</div>
        </aside>
      </div>
    </div>
  );
}

function CheckoutInput({ icon: Icon, label, placeholder }: { icon: typeof Mail; label: string; placeholder: string }) {
  return (
    <label className="block text-sm font-bold text-ink">
      {label}
      <span className="mt-2 flex h-12 items-center gap-3 rounded-lg border border-forest/10 px-4">
        <Icon className="h-5 w-5 text-muted" />
        <input className="min-w-0 flex-1 outline-none" placeholder={placeholder} />
      </span>
    </label>
  );
}
