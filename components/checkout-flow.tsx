"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Home, Mail, MapPin, Tag, Truck } from "lucide-react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/cart-store";
import { formatPkr } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const steps = ["Address", "Delivery", "Review", "Confirmation"];

export function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const [deliverySlot, setDeliverySlot] = useState("09:00 - 12:00");
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const { items, clearCart } = useCartStore();
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0), [items]);
  const delivery = subtotal > 3000 || subtotal === 0 ? 0 : 199;
  const tax = Math.round(subtotal * 0.03);
  const total = Math.max(0, subtotal - couponDiscount + delivery + tax);

  function placeOrder() {
    clearCart();
    setStep(3);
    toast.success("Order FM-2026-00042 placed");
  }

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "FRESH10") {
      setCouponDiscount(Math.round(subtotal * 0.1));
      toast.success("FRESH10 applied");
      return;
    }
    toast.error("Use FRESH10 for this demo");
  }

  return (
    <div className="container-x py-8 lg:py-12">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Checkout</p>
        <h1 className="mt-2 text-4xl font-black text-forest md:text-5xl">Complete your order</h1>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Card>
          <CardContent className="p-6">
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
              {["09:00 - 12:00", "12:00 - 15:00", "18:00 - 21:00"].map((slot) => (
                <Button key={slot} variant={deliverySlot === slot ? "secondary" : "outline"} onClick={() => setDeliverySlot(slot)} className="h-auto justify-start p-5 text-left">
                  <span>
                  <Truck className="h-6 w-6 text-forest" />
                  <p className="mt-3 font-black text-forest">Tomorrow</p>
                  <p className="text-sm text-muted">{slot}</p>
                  </span>
                </Button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="flex justify-between bg-cream p-4 shadow-none">
                  <div>
                    <p className="font-black">{item.product.name}</p>
                    <p className="text-sm text-muted">{item.quantity} x {formatPkr(item.product.salePrice ?? item.product.price)}</p>
                  </div>
                  <p className="font-black text-forest">{formatPkr((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                </Card>
              ))}
            </div>
          )}

          {step === 3 && (
            <Card className="mt-8 bg-cream p-8 text-center shadow-none">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest text-white">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mt-4 text-2xl font-black text-forest">Order confirmed</h2>
              <p className="mt-2 text-muted">Your COD order FM-2026-00042 has been queued for confirmation.</p>
            </Card>
          )}

          {step < 3 && (
            <Button
              onClick={() => (step === 2 ? placeOrder() : setStep((value) => value + 1))}
              size="lg"
              className="mt-8"
            >
              {step === 2 ? "Place COD order" : "Continue"}
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>Cash on delivery checkout</CardDescription>
          </CardHeader>
          <CardContent>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-bold">{formatPkr(subtotal)}</span></div>
            {couponDiscount > 0 && <div className="flex justify-between"><span className="text-muted">Coupon</span><span className="font-bold text-forest">-{formatPkr(couponDiscount)}</span></div>}
            <div className="flex justify-between"><span className="text-muted">Tax estimate</span><span className="font-bold">{formatPkr(tax)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Delivery</span><span className="font-bold">{delivery === 0 ? "Free" : formatPkr(delivery)}</span></div>
            <Separator />
            <div className="flex justify-between pt-1 text-lg"><span className="font-black text-forest">Total</span><span className="font-black text-forest">{formatPkr(total)}</span></div>
          </div>
          <div className="mt-5 flex gap-2">
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input value={coupon} onChange={(event) => setCoupon(event.target.value)} className="pl-9" placeholder="FRESH10" />
            </div>
            <Button variant="outline" onClick={applyCoupon}>Apply</Button>
          </div>
          <Badge variant="secondary" className="mt-5 whitespace-normal rounded-md p-3 text-left leading-6">Free delivery applies above PKR 3,000. Payment method: Cash on Delivery.</Badge>
          </CardContent>
        </Card>
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
        <Input className="h-10 min-w-0 flex-1 border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder={placeholder} />
      </span>
    </label>
  );
}
