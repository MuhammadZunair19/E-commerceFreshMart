import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";
import { CategoryTile } from "@/components/category-tile";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/lib/data";

export default function HomePage() {
  const featured = products.filter((product) => product.featured);

  return (
    <>
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-forest text-white">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2200&q=85"
          alt="Fresh groceries in a market basket"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/78 to-forest/20" />
        <div className="container-x relative flex min-h-[calc(100vh-80px)] items-center py-12">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-fresh">Same-day grocery delivery</p>
            <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">FreshMart</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/88">
              Farm produce, pantry staples, dairy, bakery, snacks, and household goods delivered with live cart totals and cash on delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-5 font-black text-forest">
                Start shopping <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/admin" className="inline-flex h-12 items-center rounded-lg border border-white/30 px-5 font-black text-white">
                View admin demo
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { icon: Truck, label: "2-hour delivery" },
                { icon: ShieldCheck, label: "Freshness checked" },
                { icon: Clock, label: "COD checkout" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg bg-white/12 p-3 backdrop-blur">
                    <Icon className="h-5 w-5 text-fresh" />
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Browse</p>
            <h2 className="mt-2 text-3xl font-black text-forest md:text-4xl">Featured categories</h2>
          </div>
          <Link href="/products" className="font-black text-forest">View all categories</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="border-y border-forest/10 bg-white py-12">
        <div className="container-x grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-danger">Flash deals</p>
            <h2 className="mt-2 text-3xl font-black text-forest md:text-4xl">Today&apos;s fresh picks</h2>
          </div>
          <div className="grid grid-cols-4 gap-2 rounded-lg bg-cream p-3 text-center">
            {["07", "18", "42", "09"].map((value, index) => (
              <div key={index} className="rounded-lg bg-white p-3">
                <p className="text-2xl font-black text-forest">{value}</p>
                <p className="text-xs font-bold uppercase text-muted">{["hrs", "min", "sec", "left"][index]}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="container-x mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container-x grid gap-8 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-fresh">Newsletter</p>
          <h2 className="mt-2 text-3xl font-black text-forest md:text-4xl">Weekly deals without the noise</h2>
          <p className="mt-4 max-w-2xl text-muted">Get restock alerts, seasonal produce drops, and coupon codes before they hit the shelf.</p>
        </div>
        <form className="flex gap-3 rounded-lg border border-forest/10 bg-white p-3 shadow-sm">
          <input className="min-w-0 flex-1 rounded-lg bg-cream px-4 outline-none" placeholder="Email address" type="email" />
          <button className="h-12 rounded-lg bg-forest px-5 font-black text-white">Join</button>
        </form>
      </section>
    </>
  );
}
